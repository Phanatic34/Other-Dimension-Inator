import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query, isDatabaseAvailable } from '../db/database';
import { UserProfile, RecommendedUser } from '../types/models';

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

// Helper function to get user by id
async function getUser(userId: string) {
  const result = await query(
    'SELECT id, display_name, handle, email, avatar_url, created_at FROM users WHERE id = $1',
    [userId]
  );
  const user = result.rows[0];
  if (user) {
    return {
      id: user.id,
      displayName: user.display_name,
      handle: user.handle,
      email: user.email,
      avatarUrl: user.avatar_url,
      createdAt: user.created_at,
    };
  }
  return null;
}

// GET /api/users/recommended - Get recommended users (must be before /:id routes)
router.get('/recommended', requireDatabase, async (req: Request, res: Response) => {
  try {
    const currentUserId = getUserFromToken(req);
    
    // Exclude current user from recommendations
    let sql = `SELECT id, display_name, handle, avatar_url, bio FROM users`;
    const params: any[] = [];
    
    if (currentUserId) {
      sql += ` WHERE id != $1`;
      params.push(currentUserId);
    }
    
    sql += ` ORDER BY RANDOM() LIMIT 5`;
    
    const result = await query(sql, params);

    // Check if current user follows each recommended user
    const recommended: RecommendedUser[] = await Promise.all(result.rows.map(async (user: any) => {
      let isFollowing = false;
      if (currentUserId) {
        const followCheck = await query(
          'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
          [currentUserId, user.id]
        );
        isFollowing = followCheck.rows.length > 0;
      }
      
      return {
        id: user.id,
        displayName: user.display_name,
        handle: user.handle,
        username: user.handle,
        avatarUrl: user.avatar_url,
        bio: user.bio,
        isFollowing,
      };
    }));

    res.json(recommended);
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    res.status(500).json({ error: 'Failed to fetch recommended users' });
  }
});

// POST /api/users/:id/follow - Follow a user
router.post('/:id/follow', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const followingId = req.params.id;
    const followerId = (req as any).userId;

    // Can't follow yourself
    if (followerId === followingId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    // Check if target user exists
    const userCheck = await query('SELECT id FROM users WHERE id = $1', [followingId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if already following
    const existingFollow = await query(
      'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
      [followerId, followingId]
    );

    if (existingFollow.rows.length > 0) {
      return res.status(400).json({ error: 'Already following this user' });
    }

    // Create follow relationship
    await query(
      'INSERT INTO follows (id, follower_id, following_id) VALUES ($1, $2, $3)',
      [uuidv4(), followerId, followingId]
    );

    res.status(201).json({ success: true, message: 'Now following user' });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
});

// DELETE /api/users/:id/follow - Unfollow a user
router.delete('/:id/follow', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const followingId = req.params.id;
    const followerId = (req as any).userId;

    // Delete follow relationship
    const result = await query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
      [followerId, followingId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Not following this user' });
    }

    res.json({ success: true, message: 'Unfollowed user' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
});

// GET /api/users/handle/:handle - Get user by handle
router.get('/handle/:handle', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { handle } = req.params;
    const currentUserId = getUserFromToken(req);
    
    // Remove @ if present
    const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;

    const result = await query(
      `SELECT 
        id, email, display_name, handle, avatar_url, cover_image_url, bio,
        favorite_styles, favorite_categories, joined_date, created_at
      FROM users 
      WHERE handle = $1`,
      [cleanHandle.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Get follower and following counts
    const followerResult = await query(
      'SELECT COUNT(*) as count FROM follows WHERE following_id = $1',
      [user.id]
    );
    const followingResult = await query(
      'SELECT COUNT(*) as count FROM follows WHERE follower_id = $1',
      [user.id]
    );

    // Check if current user follows this user
    let isFollowedByCurrentUser = false;
    if (currentUserId && currentUserId !== user.id) {
      const followCheck = await query(
        'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
        [currentUserId, user.id]
      );
      isFollowedByCurrentUser = followCheck.rows.length > 0;
    }

    const profile: UserProfile = {
      id: user.id,
      displayName: user.display_name,
      handle: user.handle,
      bio: user.bio || '',
      avatarUrl: user.avatar_url,
      coverImageUrl: user.cover_image_url,
      followerCount: parseInt(followerResult.rows[0].count),
      followingCount: parseInt(followingResult.rows[0].count),
      isFollowedByCurrentUser,
      favoriteStyles: user.favorite_styles || [],
      favoriteCategories: user.favorite_categories || [],
      joinedDate: user.joined_date || user.created_at,
    };

    res.json(profile);
  } catch (error) {
    console.error('Error fetching user by handle:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// PATCH /api/users/:id/profile - Update user profile
router.patch('/:id/profile', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    
    // Can only update your own profile
    if (id !== userId) {
      return res.status(403).json({ error: 'Cannot update another user\'s profile' });
    }

    const { displayName, avatarUrl, coverImageUrl, bio, favoriteStyles, favoriteCategories } = req.body;

    // Build update query dynamically
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (displayName !== undefined) {
      updates.push(`display_name = $${paramIndex++}`);
      values.push(displayName);
    }
    if (avatarUrl !== undefined) {
      updates.push(`avatar_url = $${paramIndex++}`);
      values.push(avatarUrl);
    }
    if (coverImageUrl !== undefined) {
      updates.push(`cover_image_url = $${paramIndex++}`);
      values.push(coverImageUrl);
    }
    if (bio !== undefined) {
      updates.push(`bio = $${paramIndex++}`);
      values.push(bio);
    }
    if (favoriteStyles !== undefined) {
      updates.push(`favorite_styles = $${paramIndex++}`);
      values.push(favoriteStyles);
    }
    if (favoriteCategories !== undefined) {
      updates.push(`favorite_categories = $${paramIndex++}`);
      values.push(favoriteCategories);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    const result = await query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      id: user.id,
      displayName: user.display_name,
      handle: user.handle,
      avatarUrl: user.avatar_url,
      coverImageUrl: user.cover_image_url,
      bio: user.bio,
      favoriteStyles: user.favorite_styles,
      favoriteCategories: user.favorite_categories,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// GET /api/users/:id/posts - Get user's posts
router.get('/:id/posts', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Get review posts
    const reviewResult = await query(
      `SELECT 
        rp.*,
        u.display_name as author_display_name,
        u.handle as author_handle,
        u.avatar_url as author_avatar_url,
        b.name as board_name,
        b.label as board_label
      FROM review_posts rp
      JOIN users u ON rp.author_id = u.id
      LEFT JOIN boards b ON rp.board_id = b.id
      WHERE rp.author_id = $1
      ORDER BY rp.created_at DESC`,
      [id]
    );

    // Get meetup posts
    const meetupResult = await query(
      `SELECT 
        mp.*,
        u.display_name as author_display_name,
        u.handle as author_handle,
        u.avatar_url as author_avatar_url
      FROM meetup_posts mp
      JOIN users u ON mp.author_id = u.id
      WHERE mp.author_id = $1
      ORDER BY mp.created_at DESC`,
      [id]
    );

    // Format review posts
    const reviewPosts = await Promise.all(reviewResult.rows.map(async (post: any) => {
      // Get images
      const imagesResult = await query(
        'SELECT image_url FROM post_images WHERE post_id = $1 ORDER BY image_order',
        [post.id]
      );

      return {
        id: post.id,
        type: 'review' as const,
        author: {
          id: post.author_id,
          displayName: post.author_display_name,
          handle: post.author_handle,
          avatarUrl: post.author_avatar_url,
        },
        restaurantName: post.restaurant_name,
        restaurant: {
          name: post.restaurant_name,
          area: post.location_area,
        },
        board: post.board_name ? {
          id: post.board_id,
          name: post.board_name,
          label: post.board_label,
        } : undefined,
        styleType: post.style_type,
        foodType: post.food_type,
        title: post.title,
        content: post.content,
        contentSnippet: post.content?.length > 100 ? post.content.substring(0, 100) + '...' : post.content,
        rating: post.rating,
        priceLevel: post.price_level,
        locationArea: post.location_area,
        priceRange: post.price_min && post.price_max 
          ? { min: post.price_min, max: post.price_max }
          : undefined,
        images: imagesResult.rows.map((img: any) => img.image_url),
        likeCount: post.like_count,
        commentCount: post.comment_count,
        shareCount: post.share_count,
        createdAt: post.created_at,
      };
    }));

    // Format meetup posts
    const meetupPosts = meetupResult.rows.map((post: any) => ({
      id: post.id,
      type: 'meetup' as const,
      author: {
        id: post.author_id,
        displayName: post.author_display_name,
        handle: post.author_handle,
        avatarUrl: post.author_avatar_url,
      },
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
      imageUrl: post.image_url,
      status: post.status,
      likeCount: post.like_count,
      commentCount: post.comment_count,
      createdAt: post.created_at,
    }));

    // Combine and sort by date
    const allPosts = [...reviewPosts, ...meetupPosts].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.json(allPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

export default router;
