// Vercel serverless function handler
// Using CommonJS syntax for Node.js compatibility

// We need to compile the backend TypeScript first
// For now, let's create a simple inline Express app
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import database connection
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: db ? 'configured' : 'not configured'
  });
});

// GET /api/boards
app.get('/api/boards', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not configured' });
    }
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

// GET /api/posts
app.get('/api/posts', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not configured' });
    }
    const result = await db.query(`
      SELECT p.*, u.display_name, u.handle, u.avatar_url
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `);
    
    const posts = await Promise.all(result.rows.map(async (row) => {
      // Get images for this post
      const imagesResult = await db.query(
        'SELECT image_url FROM post_images WHERE post_id = $1 ORDER BY image_order',
        [row.id]
      );
      const images = imagesResult.rows.map(img => img.image_url).filter(url => url && !url.startsWith('blob:'));
      
      return {
        id: row.id,
        type: row.type || 'review',
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
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/users/recommended
app.get('/api/users/recommended', async (req, res) => {
  try {
    if (!db) {
      return res.status(503).json({ error: 'Database not configured' });
    }
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

// Catch-all for other API routes
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.path });
});

// Export handler for Vercel
module.exports = (req, res) => {
  return app(req, res);
};

