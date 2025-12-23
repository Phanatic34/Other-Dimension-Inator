// Vercel serverless function handler
// Complete API implementation with all endpoints

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
let db;
try {
  const { Pool } = require('pg');
  if (process.env.DATABASE_URL) {
    db = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }
} catch (e) {
  console.error('Database connection error:', e);
}

// Helper: Get user from token
const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  try {
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
};

// ==================== HEALTH CHECK ====================
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: db ? 'configured' : 'not configured'
  });
});

// ==================== AUTH ENDPOINTS ====================
// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { email, password, displayName, handle } = req.body;
    
    if (!email || !password || !displayName || !handle) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1 OR handle = $2',
      [email, handle]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email or handle already in use' });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    
    await db.query(
      `INSERT INTO users (id, email, password_hash, display_name, handle, username)
       VALUES ($1, $2, $3, $4, $5, $5)`,
      [userId, email, passwordHash, displayName, handle]
    );
    
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: userId,
        email,
        displayName,
        handle
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to register' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    const result = await db.query(
      'SELECT id, email, password_hash, display_name, handle, avatar_url FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        handle: user.handle,
        avatarUrl: user.avatar_url
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// GET /api/auth/me
app.get('/api/auth/me', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const result = await db.query(
      'SELECT id, email, display_name, handle, avatar_url, bio FROM users WHERE id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = result.rows[0];
    res.json({
      id: user.id,
      email: user.email,
      displayName: user.display_name,
      handle: user.handle,
      avatarUrl: user.avatar_url,
      bio: user.bio
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

// ==================== BOARDS ENDPOINTS ====================
app.get('/api/boards', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const result = await db.query('SELECT * FROM boards ORDER BY name');
    const boards = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      label: row.label,
      category: row.category
    }));
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// ==================== POSTS ENDPOINTS ====================
// GET /api/posts - Get all posts (review + meetup)
app.get('/api/posts', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    // Get review posts
    const reviewResult = await db.query(`
      SELECT rp.*, u.display_name, u.handle, u.avatar_url, 'review' as type
      FROM review_posts rp
      LEFT JOIN users u ON rp.author_id = u.id
      ORDER BY rp.created_at DESC
      LIMIT 50
    `);
    
    // Get meetup posts
    const meetupResult = await db.query(`
      SELECT mp.*, u.display_name, u.handle, u.avatar_url, 'meetup' as type
      FROM meetup_posts mp
      LEFT JOIN users u ON mp.author_id = u.id
      ORDER BY mp.created_at DESC
      LIMIT 50
    `);
    
    // Process review posts
    const reviewPosts = await Promise.all(reviewResult.rows.map(async (row) => {
      const imagesResult = await db.query(
        'SELECT image_url FROM post_images WHERE post_id = $1 ORDER BY image_order',
        [row.id]
      );
      const images = imagesResult.rows.map(img => img.image_url).filter(url => url && !url.startsWith('blob:'));
      
      return {
        id: row.id,
        type: 'review',
        authorId: row.author_id,
        author: row.author_id ? {
          id: row.author_id,
          displayName: row.display_name,
          handle: row.handle,
          avatarUrl: row.avatar_url
        } : undefined,
        restaurantName: row.restaurant_name,
        restaurantAddress: row.restaurant_address,
        restaurantLat: row.restaurant_lat,
        restaurantLng: row.restaurant_lng,
        locationArea: row.location_area,
        boardId: row.board_id,
        styleType: row.style_type,
        foodType: row.food_type,
        title: row.title || '',
        content: row.content || '',
        rating: row.rating,
        priceLevel: row.price_level,
        images: images.length > 0 ? images : undefined,
        visibility: row.visibility,
        likeCount: row.like_count || 0,
        commentCount: row.comment_count || 0,
        shareCount: row.share_count || 0,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    }));
    
    // Process meetup posts
    const meetupPosts = meetupResult.rows.map(row => ({
      id: row.id,
      type: 'meetup',
      authorId: row.author_id,
      author: row.author_id ? {
        id: row.author_id,
        displayName: row.display_name,
        handle: row.handle,
        avatarUrl: row.avatar_url
      } : undefined,
      restaurantName: row.restaurant_name,
      locationText: row.location_text,
      address: row.address,
      meetupTime: row.meetup_time,
      foodTags: row.food_tags || [],
      maxHeadcount: row.max_headcount,
      currentHeadcount: row.current_headcount,
      budgetDescription: row.budget_description,
      hasReservation: row.has_reservation,
      description: row.description,
      visibility: row.visibility,
      imageUrl: row.image_url,
      status: row.status,
      boardId: row.board_id,
      locationArea: row.location_area,
      likeCount: row.like_count || 0,
      commentCount: row.comment_count || 0,
      shareCount: row.share_count || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
    
    // Combine and sort by created_at
    const allPosts = [...reviewPosts, ...meetupPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    res.json(allPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// POST /api/posts/:id/like - Like a post
app.post('/api/posts/:id/like', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    const { type } = req.query;
    const postType = type || 'review';
    
    const likeId = uuidv4();
    
    if (postType === 'meetup') {
      // Check if already liked
      const existing = await db.query(
        'SELECT id FROM meetup_likes WHERE post_id = $1 AND user_id = $2',
        [id, userId]
      );
      
      if (existing.rows.length > 0) {
        // Unlike
        await db.query('DELETE FROM meetup_likes WHERE post_id = $1 AND user_id = $2', [id, userId]);
        await db.query('UPDATE meetup_posts SET like_count = like_count - 1 WHERE id = $1', [id]);
        return res.json({ liked: false });
      } else {
        // Like
        await db.query(
          'INSERT INTO meetup_likes (id, post_id, user_id) VALUES ($1, $2, $3)',
          [likeId, id, userId]
        );
        await db.query('UPDATE meetup_posts SET like_count = like_count + 1 WHERE id = $1', [id]);
        return res.json({ liked: true });
      }
    } else {
      // Review post
      const existing = await db.query(
        'SELECT id FROM likes WHERE post_id = $1 AND user_id = $2',
        [id, userId]
      );
      
      if (existing.rows.length > 0) {
        // Unlike
        await db.query('DELETE FROM likes WHERE post_id = $1 AND user_id = $2', [id, userId]);
        await db.query('UPDATE review_posts SET like_count = like_count - 1 WHERE id = $1', [id]);
        return res.json({ liked: false });
      } else {
        // Like
        await db.query(
          'INSERT INTO likes (id, post_id, user_id) VALUES ($1, $2, $3)',
          [likeId, id, userId]
        );
        await db.query('UPDATE review_posts SET like_count = like_count + 1 WHERE id = $1', [id]);
        return res.json({ liked: true });
      }
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Failed to toggle like' });
  }
});

// ==================== USERS ENDPOINTS ====================
// GET /api/users/recommended
app.get('/api/users/recommended', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const result = await db.query(`
      SELECT id, display_name, handle, avatar_url, bio 
      FROM users 
      ORDER BY RANDOM() 
      LIMIT 5
    `);
    
    const users = result.rows.map(user => ({
      id: user.id,
      displayName: user.display_name,
      handle: user.handle,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      isFollowedByCurrentUser: false
    }));
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    res.status(500).json({ error: 'Failed to fetch recommended users' });
  }
});

// GET /api/users/:id
app.get('/api/users/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { id } = req.params;
    const result = await db.query(
      'SELECT id, display_name, handle, avatar_url, bio, cover_image_url, favorite_styles, favorite_categories, joined_date, created_at FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = result.rows[0];
    
    // Get follower count
    const followerResult = await db.query('SELECT COUNT(*) FROM follows WHERE following_id = $1', [id]);
    const followingResult = await db.query('SELECT COUNT(*) FROM follows WHERE follower_id = $1', [id]);
    
    res.json({
      id: user.id,
      displayName: user.display_name,
      handle: user.handle,
      username: user.handle,
      avatarUrl: user.avatar_url,
      coverImageUrl: user.cover_image_url,
      bio: user.bio,
      followerCount: parseInt(followerResult.rows[0].count),
      followingCount: parseInt(followingResult.rows[0].count),
      favoriteStyles: user.favorite_styles || [],
      favoriteCategories: user.favorite_categories || [],
      joinedDate: user.joined_date || user.created_at
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST /api/users/:id/follow
app.post('/api/users/:id/follow', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    if (userId === id) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }
    
    const followId = uuidv4();
    
    await db.query(
      'INSERT INTO follows (id, follower_id, following_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [followId, userId, id]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
});

// DELETE /api/users/:id/follow
app.delete('/api/users/:id/follow', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    await db.query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
      [userId, id]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
});

// ==================== COMMENTS ENDPOINTS ====================
// GET /api/posts/:postId/comments
app.get('/api/posts/:postId/comments', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { postId } = req.params;
    
    const result = await db.query(`
      SELECT c.*, u.display_name, u.handle, u.avatar_url
      FROM comments c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `, [postId]);
    
    const comments = result.rows.map(row => ({
      id: row.id,
      postId: row.post_id,
      authorId: row.author_id,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        handle: row.handle,
        avatarUrl: row.avatar_url
      },
      parentId: row.parent_id,
      content: row.content,
      likeCount: row.like_count || 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }));
    
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /api/posts/:postId/comments
app.post('/api/posts/:postId/comments', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { postId } = req.params;
    const { content, parentId, postType } = req.body;
    
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    
    const commentId = uuidv4();
    
    await db.query(
      `INSERT INTO comments (id, post_id, post_type, author_id, parent_id, content)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [commentId, postId, postType || 'review', userId, parentId || null, content]
    );
    
    // Update comment count
    if (postType === 'meetup') {
      await db.query('UPDATE meetup_posts SET comment_count = comment_count + 1 WHERE id = $1', [postId]);
    } else {
      await db.query('UPDATE review_posts SET comment_count = comment_count + 1 WHERE id = $1', [postId]);
    }
    
    // Get the created comment with author info
    const result = await db.query(`
      SELECT c.*, u.display_name, u.handle, u.avatar_url
      FROM comments c
      LEFT JOIN users u ON c.author_id = u.id
      WHERE c.id = $1
    `, [commentId]);
    
    const row = result.rows[0];
    res.json({
      id: row.id,
      postId: row.post_id,
      authorId: row.author_id,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        handle: row.handle,
        avatarUrl: row.avatar_url
      },
      parentId: row.parent_id,
      content: row.content,
      likeCount: 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// ==================== SAVED RESTAURANTS ====================
app.get('/api/restaurants/saved', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const result = await db.query(
      'SELECT * FROM saved_restaurants WHERE user_id = $1 ORDER BY saved_at DESC',
      [userId]
    );
    
    const restaurants = result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      address: row.address,
      lat: row.lat,
      lng: row.lng,
      styles: row.styles || [],
      categories: row.categories || [],
      rating: row.rating,
      priceLevel: row.price_level,
      savedFromPostId: row.saved_from_post_id,
      savedAt: row.saved_at
    }));
    
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching saved restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch saved restaurants' });
  }
});

// ==================== CATCH-ALL ====================
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.path, method: req.method });
});

// Export handler for Vercel
module.exports = (req, res) => {
  return app(req, res);
};
