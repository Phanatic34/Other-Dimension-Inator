import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { query, isDatabaseAvailable } from '../db/database';
import { ReviewPost, MeetupPost } from '../types/models';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to check if database is available
const requireDatabase = (req: Request, res: Response, next: Function) => {
  if (!isDatabaseAvailable()) {
    return res.status(503).json({ 
      error: 'Database not configured',
      hint: 'Please set DATABASE_URL in backend/.env file.'
    });
  }
  next();
};

// Middleware to get user from token (optional - returns null if no token)
const getUserFromToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  try {
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
};

// Middleware to require authentication
const requireAuth = (req: Request, res: Response, next: Function) => {
  const userId = getUserFromToken(req);
  if (!userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  (req as any).userId = userId;
  next();
};

// Helper function to get board by id
async function getBoard(boardId: string) {
  const result = await query('SELECT * FROM boards WHERE id = $1', [boardId]);
  return result.rows[0];
}

// Helper function to get user by id
async function getUser(userId: string) {
  const result = await query(
    'SELECT id, display_name, handle, avatar_url, created_at FROM users WHERE id = $1',
    [userId]
  );
  const user = result.rows[0];
  if (user) {
    return {
      id: user.id,
      displayName: user.display_name,
      handle: user.handle,
      avatarUrl: user.avatar_url,
      createdAt: user.created_at,
    };
  }
  return null;
}

// Helper function to populate review post
async function populateReviewPost(post: any, currentUserId?: string): Promise<ReviewPost> {
  const author = await getUser(post.author_id);
  const board = await getBoard(post.board_id);

  // Get images
  const imagesResult = await query(
    'SELECT image_url FROM post_images WHERE post_id = $1 ORDER BY image_order',
    [post.id]
  );
  const imageUrls = imagesResult.rows.map((img: any) => img.image_url);

  // Check if user follows author
  let isFromFollowedUser = false;
  if (currentUserId && author) {
    const followResult = await query(
      'SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2',
      [currentUserId, post.author_id]
    );
    isFromFollowedUser = followResult.rows.length > 0;
  }

  return {
    id: post.id,
    type: 'review',
    authorId: post.author_id,
    author,
    restaurantName: post.restaurant_name,
    restaurantAddress: post.restaurant_address,
    lat: post.restaurant_lat,
    lng: post.restaurant_lng,
    locationArea: post.location_area,
    boardId: post.board_id,
    board: board
      ? {
          id: board.id,
          name: board.name,
          label: board.label,
          category: board.category,
        }
      : undefined,
    styleType: post.style_type,
    foodType: post.food_type,
    title: post.title || '',
    content: post.content || '',
    contentSnippet: post.content && post.content.length > 100 ? post.content.substring(0, 100) + '...' : (post.content || ''),
    rating: post.rating,
    priceLevel: post.price_level,
    priceMin: post.price_min,
    priceMax: post.price_max,
    images: imageUrls.length > 0 ? imageUrls : undefined,
    visibility: post.visibility,
    likeCount: post.like_count,
    commentCount: post.comment_count,
    shareCount: post.share_count,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    isFromFollowedUser,
  };
}

// Helper function to populate meetup post
async function populateMeetupPost(post: any, currentUserId?: string): Promise<MeetupPost> {
  const author = await getUser(post.author_id);
  const board = post.board_id ? await getBoard(post.board_id) : null;

  // Check if user follows author
  let isFromFollowedUser = false;
  if (currentUserId && author) {
    const followResult = await query(
      'SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2',
      [currentUserId, post.author_id]
    );
    isFromFollowedUser = followResult.rows.length > 0;
  }

  return {
    id: post.id,
    type: 'meetup',
    authorId: post.author_id,
    author,
    restaurantName: post.restaurant_name,
    locationText: post.location_text,
    address: post.address,
    meetupTime: post.meetup_time,
    foodTags: post.food_tags,
    maxHeadcount: post.max_headcount,
    currentHeadcount: post.current_headcount,
    budgetDescription: post.budget_description,
    hasReservation: post.has_reservation,
    description: post.description,
    visibility: post.visibility,
    imageUrl: post.image_url,
    status: post.status,
    boardId: post.board_id,
    board: board
      ? {
          id: board.id,
          name: board.name,
          label: board.label,
          category: board.category,
        }
      : undefined,
    locationArea: post.location_area,
    likeCount: post.like_count,
    commentCount: post.comment_count,
    shareCount: post.share_count,
    createdAt: post.created_at,
    updatedAt: post.updated_at,
    isFromFollowedUser,
  };
}

// GET /api/posts - Get all posts with optional filters
router.get('/', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { type, boardId, feedFilter } = req.query;
    const currentUserId = req.headers['x-user-id'] as string | undefined;

    if (type === 'review') {
      let sql = 'SELECT * FROM review_posts WHERE 1=1';
      const params: any[] = [];
      let paramIndex = 1;

      if (boardId) {
        sql += ` AND board_id = $${paramIndex}`;
        params.push(boardId);
        paramIndex++;
      }

      if (feedFilter === 'following' && currentUserId) {
        sql = `
          SELECT rp.* FROM review_posts rp
          INNER JOIN follows f ON rp.author_id = f.following_id
          WHERE f.follower_id = $${paramIndex}
        `;
        params.push(currentUserId);
        paramIndex++;
        if (boardId) {
          sql += ` AND rp.board_id = $${paramIndex}`;
          params.push(boardId);
        }
      }

      sql += ' ORDER BY created_at DESC';

      const result = await query(sql, params);
      const posts = await Promise.all(
        result.rows.map((post) => populateReviewPost(post, currentUserId))
      );
      return res.json(posts);
    } else if (type === 'meetup') {
      let sql = 'SELECT * FROM meetup_posts WHERE 1=1';
      const params: any[] = [];
      let paramIndex = 1;

      if (boardId) {
        sql += ` AND board_id = $${paramIndex}`;
        params.push(boardId);
        paramIndex++;
      }

      if (feedFilter === 'following' && currentUserId) {
        sql = `
          SELECT mp.* FROM meetup_posts mp
          INNER JOIN follows f ON mp.author_id = f.following_id
          WHERE f.follower_id = $${paramIndex}
        `;
        params.push(currentUserId);
        paramIndex++;
        if (boardId) {
          sql += ` AND mp.board_id = $${paramIndex}`;
          params.push(boardId);
        }
      }

      sql += ' ORDER BY created_at DESC';

      const result = await query(sql, params);
      const posts = await Promise.all(
        result.rows.map((post) => populateMeetupPost(post, currentUserId))
      );
      return res.json(posts);
    } else {
      // Get both types
      const reviewResult = await query('SELECT * FROM review_posts ORDER BY created_at DESC');
      const meetupResult = await query('SELECT * FROM meetup_posts ORDER BY created_at DESC');

      const reviewPosts = await Promise.all(
        reviewResult.rows.map((post) => populateReviewPost(post, currentUserId))
      );
      const meetupPosts = await Promise.all(
        meetupResult.rows.map((post) => populateMeetupPost(post, currentUserId))
      );

      const allPosts = [...reviewPosts, ...meetupPosts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return res.json(allPosts);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST /api/posts/review - Create a review post
router.post('/review', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    console.log('[POST /api/posts/review] Creating post for user:', userId);
    console.log('[POST /api/posts/review] Request body:', req.body);
    
    const {
      restaurantName,
      restaurantAddress,
      restaurantLat,
      restaurantLng,
      locationArea,
      boardId,
      styleType,
      foodType,
      title,
      content,
      rating,
      priceLevel,
      priceMin,
      priceMax,
      images,
    } = req.body;

    // Validate required fields
    if (!restaurantName || !boardId || !title || !content || rating === undefined || !priceLevel) {
      console.log('[POST /api/posts/review] Missing fields:', { restaurantName, boardId, title, content, rating, priceLevel });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const postId = uuidv4();

    await query(
      `INSERT INTO review_posts (
        id, author_id, restaurant_name, restaurant_address, restaurant_lat, restaurant_lng,
        location_area, board_id, style_type, food_type, title, content, rating, price_level,
        price_min, price_max, visibility, like_count, comment_count, share_count
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 'PUBLIC', 0, 0, 0)`,
      [
        postId, userId, restaurantName, restaurantAddress, restaurantLat, restaurantLng,
        locationArea, boardId, styleType, foodType, title, content, rating, priceLevel,
        priceMin, priceMax
      ]
    );

    // Insert images if provided
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await query(
          'INSERT INTO post_images (id, post_id, image_url, image_order) VALUES ($1, $2, $3, $4)',
          [uuidv4(), postId, images[i], i]
        );
      }
    }

    // Fetch the created post
    const result = await query('SELECT * FROM review_posts WHERE id = $1', [postId]);
    const post = await populateReviewPost(result.rows[0], userId);

    console.log('[POST /api/posts/review] Created post:', post.id);
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating review post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// POST /api/posts/meetup - Create a meetup post
router.post('/meetup', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const {
      restaurantName,
      locationText,
      address,
      meetupTime,
      foodTags,
      maxHeadcount,
      budgetDescription,
      hasReservation,
      description,
      imageUrl,
      boardId,
      locationArea,
    } = req.body;

    // Validate required fields
    if (!restaurantName || !locationText || !meetupTime || !foodTags || !maxHeadcount || !budgetDescription || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const postId = uuidv4();

    await query(
      `INSERT INTO meetup_posts (
        id, author_id, restaurant_name, location_text, address, meetup_time, food_tags,
        max_headcount, current_headcount, budget_description, has_reservation, description,
        visibility, image_url, status, board_id, location_area, like_count, comment_count, share_count
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 1, $9, $10, $11, 'PUBLIC', $12, 'OPEN', $13, $14, 0, 0, 0)`,
      [
        postId, userId, restaurantName, locationText, address, meetupTime, foodTags,
        maxHeadcount, budgetDescription, hasReservation || false, description,
        imageUrl, boardId, locationArea
      ]
    );

    // Fetch the created post
    const result = await query('SELECT * FROM meetup_posts WHERE id = $1', [postId]);
    const post = await populateMeetupPost(result.rows[0], userId);

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating meetup post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// GET /api/posts/:id - Get single post
router.get('/:id', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUserId = getUserFromToken(req);

    // Try review post first
    let result = await query('SELECT * FROM review_posts WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      const post = await populateReviewPost(result.rows[0], currentUserId || undefined);
      return res.json(post);
    }

    // Try meetup post
    result = await query('SELECT * FROM meetup_posts WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      const post = await populateMeetupPost(result.rows[0], currentUserId || undefined);
      return res.json(post);
    }

    res.status(404).json({ error: 'Post not found' });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST /api/posts/:id/like - Like a post
router.post('/:id/like', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.query; // 'review' or 'meetup'
    const userId = (req as any).userId;

    if (type === 'meetup') {
      // Check if already liked
      const existingLike = await query(
        'SELECT id FROM meetup_likes WHERE post_id = $1 AND user_id = $2',
        [id, userId]
      );

      if (existingLike.rows.length > 0) {
        return res.status(400).json({ error: 'Already liked this post' });
      }

      // Create like
      await query(
        'INSERT INTO meetup_likes (id, post_id, user_id) VALUES ($1, $2, $3)',
        [uuidv4(), id, userId]
      );

      // Increment like count
      await query(
        'UPDATE meetup_posts SET like_count = like_count + 1 WHERE id = $1',
        [id]
      );
    } else {
      // Default to review post
      const existingLike = await query(
        'SELECT id FROM likes WHERE post_id = $1 AND user_id = $2',
        [id, userId]
      );

      if (existingLike.rows.length > 0) {
        return res.status(400).json({ error: 'Already liked this post' });
      }

      // Create like
      await query(
        'INSERT INTO likes (id, post_id, user_id) VALUES ($1, $2, $3)',
        [uuidv4(), id, userId]
      );

      // Increment like count
      await query(
        'UPDATE review_posts SET like_count = like_count + 1 WHERE id = $1',
        [id]
      );
    }

    res.status(201).json({ success: true, message: 'Post liked' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// DELETE /api/posts/:id/like - Unlike a post
router.delete('/:id/like', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.query; // 'review' or 'meetup'
    const userId = (req as any).userId;

    if (type === 'meetup') {
      const result = await query(
        'DELETE FROM meetup_likes WHERE post_id = $1 AND user_id = $2',
        [id, userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Like not found' });
      }

      // Decrement like count
      await query(
        'UPDATE meetup_posts SET like_count = GREATEST(0, like_count - 1) WHERE id = $1',
        [id]
      );
    } else {
      const result = await query(
        'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
        [id, userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Like not found' });
      }

      // Decrement like count
      await query(
        'UPDATE review_posts SET like_count = GREATEST(0, like_count - 1) WHERE id = $1',
        [id]
      );
    }

    res.json({ success: true, message: 'Post unliked' });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ error: 'Failed to unlike post' });
  }
});

// PUT /api/posts/review/:id - Update a review post
router.put('/review/:id', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Check if user owns this post
    const existingPost = await query('SELECT * FROM review_posts WHERE id = $1', [id]);
    if (existingPost.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (existingPost.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to edit this post' });
    }

    const {
      restaurantName,
      restaurantAddress,
      restaurantLat,
      restaurantLng,
      locationArea,
      boardId,
      styleType,
      foodType,
      title,
      content,
      rating,
      priceLevel,
      priceMin,
      priceMax,
      images,
    } = req.body;

    await query(
      `UPDATE review_posts SET 
        restaurant_name = COALESCE($1, restaurant_name),
        restaurant_address = COALESCE($2, restaurant_address),
        restaurant_lat = COALESCE($3, restaurant_lat),
        restaurant_lng = COALESCE($4, restaurant_lng),
        location_area = COALESCE($5, location_area),
        board_id = COALESCE($6, board_id),
        style_type = COALESCE($7, style_type),
        food_type = COALESCE($8, food_type),
        title = COALESCE($9, title),
        content = COALESCE($10, content),
        rating = COALESCE($11, rating),
        price_level = COALESCE($12, price_level),
        price_min = COALESCE($13, price_min),
        price_max = COALESCE($14, price_max),
        updated_at = NOW()
      WHERE id = $15`,
      [
        restaurantName, restaurantAddress, restaurantLat, restaurantLng,
        locationArea, boardId, styleType, foodType, title, content,
        rating, priceLevel, priceMin, priceMax, id
      ]
    );

    // Update images if provided
    if (images && Array.isArray(images)) {
      // Delete existing images
      await query('DELETE FROM post_images WHERE post_id = $1', [id]);
      // Insert new images
      for (let i = 0; i < images.length; i++) {
        await query(
          'INSERT INTO post_images (id, post_id, image_url, image_order) VALUES ($1, $2, $3, $4)',
          [uuidv4(), id, images[i], i]
        );
      }
    }

    // Fetch updated post
    const result = await query('SELECT * FROM review_posts WHERE id = $1', [id]);
    const post = await populateReviewPost(result.rows[0], userId);

    res.json(post);
  } catch (error) {
    console.error('Error updating review post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// PUT /api/posts/meetup/:id - Update a meetup post
router.put('/meetup/:id', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Check if user owns this post
    const existingPost = await query('SELECT * FROM meetup_posts WHERE id = $1', [id]);
    if (existingPost.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (existingPost.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to edit this post' });
    }

    const {
      restaurantName,
      locationText,
      address,
      meetupTime,
      foodTags,
      maxHeadcount,
      budgetDescription,
      hasReservation,
      description,
      imageUrl,
      boardId,
      locationArea,
    } = req.body;

    await query(
      `UPDATE meetup_posts SET 
        restaurant_name = COALESCE($1, restaurant_name),
        location_text = COALESCE($2, location_text),
        address = COALESCE($3, address),
        meetup_time = COALESCE($4, meetup_time),
        food_tags = COALESCE($5, food_tags),
        max_headcount = COALESCE($6, max_headcount),
        budget_description = COALESCE($7, budget_description),
        has_reservation = COALESCE($8, has_reservation),
        description = COALESCE($9, description),
        image_url = COALESCE($10, image_url),
        board_id = COALESCE($11, board_id),
        location_area = COALESCE($12, location_area),
        updated_at = NOW()
      WHERE id = $13`,
      [
        restaurantName, locationText, address, meetupTime, foodTags,
        maxHeadcount, budgetDescription, hasReservation, description,
        imageUrl, boardId, locationArea, id
      ]
    );

    // Fetch updated post
    const result = await query('SELECT * FROM meetup_posts WHERE id = $1', [id]);
    const post = await populateMeetupPost(result.rows[0], userId);

    res.json(post);
  } catch (error) {
    console.error('Error updating meetup post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE /api/posts/review/:id - Delete a review post
router.delete('/review/:id', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Check if user owns this post
    const existingPost = await query('SELECT * FROM review_posts WHERE id = $1', [id]);
    if (existingPost.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (existingPost.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    // Delete associated data first (images, likes, comments)
    await query('DELETE FROM post_images WHERE post_id = $1', [id]);
    await query('DELETE FROM likes WHERE post_id = $1', [id]);
    await query('DELETE FROM comments WHERE post_id = $1', [id]);
    
    // Delete the post
    await query('DELETE FROM review_posts WHERE id = $1', [id]);

    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting review post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// DELETE /api/posts/meetup/:id - Delete a meetup post
router.delete('/meetup/:id', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Check if user owns this post
    const existingPost = await query('SELECT * FROM meetup_posts WHERE id = $1', [id]);
    if (existingPost.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (existingPost.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    // Delete associated data first (likes, comments)
    await query('DELETE FROM meetup_likes WHERE post_id = $1', [id]);
    await query('DELETE FROM comments WHERE post_id = $1', [id]);
    
    // Delete the post
    await query('DELETE FROM meetup_posts WHERE id = $1', [id]);

    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting meetup post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// ================== SAVE/BOOKMARK POSTS ==================

// POST /api/posts/:id/save - Save/bookmark a post
router.post('/:id/save', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.query; // 'review' or 'meetup'
    const userId = (req as any).userId;
    const postType = type === 'meetup' ? 'meetup' : 'review';

    // Ensure saved_posts table exists
    await query(`
      CREATE TABLE IF NOT EXISTS saved_posts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        post_type TEXT NOT NULL CHECK(post_type IN ('review', 'meetup')),
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        UNIQUE(user_id, post_id, post_type),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Check if post exists
    const table = postType === 'meetup' ? 'meetup_posts' : 'review_posts';
    const postExists = await query(`SELECT id FROM ${table} WHERE id = $1`, [id]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if already saved
    const existingSave = await query(
      'SELECT id FROM saved_posts WHERE user_id = $1 AND post_id = $2 AND post_type = $3',
      [userId, id, postType]
    );
    if (existingSave.rows.length > 0) {
      return res.status(400).json({ error: 'Post already saved' });
    }

    // Save the post
    await query(
      'INSERT INTO saved_posts (id, user_id, post_id, post_type) VALUES ($1, $2, $3, $4)',
      [uuidv4(), userId, id, postType]
    );

    res.status(201).json({ success: true, message: 'Post saved' });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
});

// DELETE /api/posts/:id/save - Unsave/unbookmark a post
router.delete('/:id/save', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.query;
    const userId = (req as any).userId;
    const postType = type === 'meetup' ? 'meetup' : 'review';

    const result = await query(
      'DELETE FROM saved_posts WHERE user_id = $1 AND post_id = $2 AND post_type = $3',
      [userId, id, postType]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Saved post not found' });
    }

    res.json({ success: true, message: 'Post unsaved' });
  } catch (error) {
    console.error('Error unsaving post:', error);
    res.status(500).json({ error: 'Failed to unsave post' });
  }
});

// GET /api/posts/saved - Get user's saved posts
router.get('/saved/list', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const savedPosts = await query(
      'SELECT post_id, post_type, created_at FROM saved_posts WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    // Fetch full post data for each saved post
    const posts = [];
    for (const saved of savedPosts.rows) {
      if (saved.post_type === 'review') {
        const result = await query('SELECT * FROM review_posts WHERE id = $1', [saved.post_id]);
        if (result.rows.length > 0) {
          const post = await populateReviewPost(result.rows[0], userId);
          posts.push({ ...post, savedAt: saved.created_at });
        }
      } else {
        const result = await query('SELECT * FROM meetup_posts WHERE id = $1', [saved.post_id]);
        if (result.rows.length > 0) {
          const post = await populateMeetupPost(result.rows[0], userId);
          posts.push({ ...post, savedAt: saved.created_at });
        }
      }
    }

    res.json(posts);
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    res.status(500).json({ error: 'Failed to fetch saved posts' });
  }
});

// ================== REPORT POSTS ==================

// POST /api/posts/:id/report - Report a post
router.post('/:id/report', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, reason, description } = req.body;
    const userId = (req as any).userId;
    const postType = type === 'meetup' ? 'meetup' : 'review';

    // Validate reason
    const validReasons = ['spam', 'harassment', 'inappropriate', 'misinformation', 'other'];
    if (!reason || !validReasons.includes(reason)) {
      return res.status(400).json({ error: 'Invalid reason. Must be one of: ' + validReasons.join(', ') });
    }

    // Ensure reported_posts table exists
    await query(`
      CREATE TABLE IF NOT EXISTS reported_posts (
        id TEXT PRIMARY KEY,
        reporter_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        post_type TEXT NOT NULL CHECK(post_type IN ('review', 'meetup')),
        reason TEXT NOT NULL CHECK(reason IN ('spam', 'harassment', 'inappropriate', 'misinformation', 'other')),
        description TEXT,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        reviewed_at TIMESTAMP WITH TIME ZONE,
        FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    // Check if post exists
    const table = postType === 'meetup' ? 'meetup_posts' : 'review_posts';
    const postExists = await query(`SELECT id, author_id FROM ${table} WHERE id = $1`, [id]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Can't report own post
    if (postExists.rows[0].author_id === userId) {
      return res.status(400).json({ error: 'Cannot report your own post' });
    }

    // Check if already reported by this user
    const existingReport = await query(
      'SELECT id FROM reported_posts WHERE reporter_id = $1 AND post_id = $2',
      [userId, id]
    );
    if (existingReport.rows.length > 0) {
      return res.status(400).json({ error: 'You have already reported this post' });
    }

    // Create report
    await query(
      'INSERT INTO reported_posts (id, reporter_id, post_id, post_type, reason, description) VALUES ($1, $2, $3, $4, $5, $6)',
      [uuidv4(), userId, id, postType, reason, description || null]
    );

    res.status(201).json({ success: true, message: 'Report submitted. Thank you for helping keep our community safe.' });
  } catch (error) {
    console.error('Error reporting post:', error);
    res.status(500).json({ error: 'Failed to report post' });
  }
});

// ================== ARCHIVE POSTS ==================

// POST /api/posts/review/:id/archive - Archive a review post
router.post('/review/:id/archive', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Ensure is_archived column exists
    try {
      await query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='review_posts' AND column_name='is_archived') THEN
            ALTER TABLE review_posts ADD COLUMN is_archived BOOLEAN NOT NULL DEFAULT FALSE;
          END IF;
        END
        $$;
      `);
    } catch (migrationError) {
      console.log('Migration check completed');
    }

    // Check if user owns this post
    const existingPost = await query('SELECT * FROM review_posts WHERE id = $1', [id]);
    if (existingPost.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (existingPost.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to archive this post' });
    }

    // Toggle archive status
    const currentStatus = existingPost.rows[0].is_archived || false;
    const newArchivedStatus = !currentStatus;
    await query(
      'UPDATE review_posts SET is_archived = $1, updated_at = NOW() WHERE id = $2',
      [newArchivedStatus, id]
    );

    res.json({ 
      success: true, 
      message: newArchivedStatus ? 'Post archived' : 'Post unarchived',
      isArchived: newArchivedStatus 
    });
  } catch (error) {
    console.error('Error archiving review post:', error);
    res.status(500).json({ error: 'Failed to archive post' });
  }
});

// POST /api/posts/meetup/:id/archive - Archive a meetup post
router.post('/meetup/:id/archive', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Ensure is_archived column exists
    try {
      await query(`
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetup_posts' AND column_name='is_archived') THEN
            ALTER TABLE meetup_posts ADD COLUMN is_archived BOOLEAN NOT NULL DEFAULT FALSE;
          END IF;
        END
        $$;
      `);
    } catch (migrationError) {
      console.log('Migration check completed');
    }

    // Check if user owns this post
    const existingPost = await query('SELECT * FROM meetup_posts WHERE id = $1', [id]);
    if (existingPost.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (existingPost.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to archive this post' });
    }

    // Toggle archive status
    const currentStatus = existingPost.rows[0].is_archived || false;
    const newArchivedStatus = !currentStatus;
    await query(
      'UPDATE meetup_posts SET is_archived = $1, updated_at = NOW() WHERE id = $2',
      [newArchivedStatus, id]
    );

    res.json({ 
      success: true, 
      message: newArchivedStatus ? 'Post archived' : 'Post unarchived',
      isArchived: newArchivedStatus 
    });
  } catch (error) {
    console.error('Error archiving meetup post:', error);
    res.status(500).json({ error: 'Failed to archive post' });
  }
});

// ================== SHARE POSTS ==================

// POST /api/posts/:id/share - Record a share (increment share count)
router.post('/:id/share', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type } = req.query;
    const postType = type === 'meetup' ? 'meetup' : 'review';

    const table = postType === 'meetup' ? 'meetup_posts' : 'review_posts';
    
    // Check if post exists
    const postExists = await query(`SELECT id FROM ${table} WHERE id = $1`, [id]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment share count
    await query(
      `UPDATE ${table} SET share_count = share_count + 1 WHERE id = $1`,
      [id]
    );

    // Get updated share count
    const result = await query(`SELECT share_count FROM ${table} WHERE id = $1`, [id]);

    res.json({ success: true, shareCount: result.rows[0].share_count });
  } catch (error) {
    console.error('Error recording share:', error);
    res.status(500).json({ error: 'Failed to record share' });
  }
});

export default router;

