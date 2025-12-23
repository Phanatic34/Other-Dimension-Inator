// Vercel serverless function handler
// Complete API implementation with all endpoints

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary from CLOUDINARY_URL
if (process.env.CLOUDINARY_URL) {
  // CLOUDINARY_URL format: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  const matches = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
  if (matches) {
    cloudinary.config({
      cloud_name: matches[3],
      api_key: matches[1],
      api_secret: matches[2]
    });
    console.log('Cloudinary configured with cloud:', matches[3]);
  }
}

const app = express();

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
// Increase body size limit for image uploads (base64 images can be large)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Disable caching for all API responses to prevent 304
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  // Disable ETag to prevent conditional requests
  app.disable('etag');
  next();
});

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

// POST /api/posts/review - Create a review post
app.post('/api/posts/review', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
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
      visibility,
      images
    } = req.body;
    
    if (!restaurantName || !boardId || !rating || !priceLevel) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const postId = uuidv4();
    
    await db.query(
      `INSERT INTO review_posts (
        id, author_id, restaurant_name, restaurant_address, restaurant_lat, restaurant_lng,
        location_area, board_id, style_type, food_type, title, content, rating, price_level, visibility
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [postId, userId, restaurantName, restaurantAddress || '', restaurantLat || null, restaurantLng || null,
       locationArea || '', boardId, styleType || '', foodType || '', title || '', content || '',
       rating, priceLevel, visibility || 'PUBLIC']
    );
    
    // Insert images if provided
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i];
        if (imageUrl && !imageUrl.startsWith('blob:')) {
          const imageId = uuidv4();
          await db.query(
            'INSERT INTO post_images (id, post_id, image_url, image_order) VALUES ($1, $2, $3, $4)',
            [imageId, postId, imageUrl, i]
          );
        }
      }
    }
    
    // Get the created post with author info
    const result = await db.query(`
      SELECT rp.*, u.display_name, u.handle, u.avatar_url
      FROM review_posts rp
      LEFT JOIN users u ON rp.author_id = u.id
      WHERE rp.id = $1
    `, [postId]);
    
    const row = result.rows[0];
    
    res.status(201).json({
      id: row.id,
      type: 'review',
      authorId: row.author_id,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        handle: row.handle,
        avatarUrl: row.avatar_url
      },
      restaurantName: row.restaurant_name,
      restaurantAddress: row.restaurant_address,
      restaurantLat: row.restaurant_lat,
      restaurantLng: row.restaurant_lng,
      locationArea: row.location_area,
      boardId: row.board_id,
      styleType: row.style_type,
      foodType: row.food_type,
      title: row.title,
      content: row.content,
      rating: row.rating,
      priceLevel: row.price_level,
      images: images || [],
      visibility: row.visibility,
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  } catch (error) {
    console.error('Error creating review post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// POST /api/posts/meetup - Create a meetup post
app.post('/api/posts/meetup', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
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
      visibility,
      imageUrl,
      boardId,
      locationArea
    } = req.body;
    
    if (!restaurantName || !locationText || !meetupTime || !maxHeadcount || !budgetDescription) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const postId = uuidv4();
    
    await db.query(
      `INSERT INTO meetup_posts (
        id, author_id, restaurant_name, location_text, address, meetup_time,
        food_tags, max_headcount, budget_description, has_reservation, description,
        visibility, image_url, board_id, location_area
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [postId, userId, restaurantName, locationText, address || '', meetupTime,
       foodTags || [], maxHeadcount, budgetDescription, hasReservation || false, description || '',
       visibility || 'PUBLIC', imageUrl || null, boardId || null, locationArea || '']
    );
    
    // Get the created post with author info
    const result = await db.query(`
      SELECT mp.*, u.display_name, u.handle, u.avatar_url
      FROM meetup_posts mp
      LEFT JOIN users u ON mp.author_id = u.id
      WHERE mp.id = $1
    `, [postId]);
    
    const row = result.rows[0];
    
    res.status(201).json({
      id: row.id,
      type: 'meetup',
      authorId: row.author_id,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        handle: row.handle,
        avatarUrl: row.avatar_url
      },
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
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    });
  } catch (error) {
    console.error('Error creating meetup post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// DELETE /api/posts/review/:id - Delete a review post
app.delete('/api/posts/review/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Verify the post belongs to the user
    const postResult = await db.query('SELECT author_id FROM review_posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (postResult.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }
    
    // Delete related data first (foreign key constraints)
    await db.query('DELETE FROM post_images WHERE post_id = $1', [id]);
    await db.query('DELETE FROM comments WHERE post_id = $1', [id]);
    await db.query('DELETE FROM likes WHERE post_id = $1', [id]);
    await db.query('DELETE FROM review_posts WHERE id = $1', [id]);
    
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting review post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// DELETE /api/posts/meetup/:id - Delete a meetup post
app.delete('/api/posts/meetup/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Verify the post belongs to the user
    const postResult = await db.query('SELECT author_id FROM meetup_posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (postResult.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }
    
    // Delete related data first
    await db.query('DELETE FROM comments WHERE post_id = $1', [id]);
    await db.query('DELETE FROM meetup_likes WHERE post_id = $1', [id]);
    await db.query('DELETE FROM meetup_posts WHERE id = $1', [id]);
    
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting meetup post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

// ==================== IMAGE UPLOAD ====================
// POST /api/upload/images - Upload images to Cloudinary
// Accepts: { images: [base64_string, ...] } or { image: base64_string }
app.post('/api/upload/images', async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_URL) {
      return res.status(501).json({ 
        error: 'Cloudinary not configured',
        suggestion: 'Please set CLOUDINARY_URL environment variable'
      });
    }
    
    const { images, image } = req.body;
    
    // Handle single image or array of images
    const imagesToUpload = images || (image ? [image] : []);
    
    if (imagesToUpload.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }
    
    const uploadedUrls = [];
    
    for (const img of imagesToUpload) {
      try {
        // Check if it's a base64 string or already a URL
        if (img.startsWith('http://') || img.startsWith('https://')) {
          // Already a URL, just add it
          uploadedUrls.push(img);
        } else if (img.startsWith('data:image') || img.startsWith('/9j/') || img.startsWith('iVBOR')) {
          // Base64 image - upload to Cloudinary
          const base64Data = img.startsWith('data:') ? img : `data:image/jpeg;base64,${img}`;
          
          const result = await cloudinary.uploader.upload(base64Data, {
            folder: 'rendezvous',
            resource_type: 'image',
            transformation: [
              { width: 1200, height: 1200, crop: 'limit' },
              { quality: 'auto', fetch_format: 'auto' }
            ]
          });
          
          uploadedUrls.push(result.secure_url);
        } else {
          console.log('Skipping invalid image format');
        }
      } catch (uploadError) {
        console.error('Error uploading single image:', uploadError);
        // Continue with other images
      }
    }
    
    if (uploadedUrls.length === 0) {
      return res.status(400).json({ error: 'Failed to upload any images' });
    }
    
    res.json({ 
      success: true, 
      urls: uploadedUrls,
      url: uploadedUrls[0] // For single image uploads
    });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Failed to upload images' });
  }
});

// POST /api/upload/image - Single image upload (alternative endpoint)
app.post('/api/upload/image', async (req, res) => {
  try {
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (!process.env.CLOUDINARY_URL) {
      return res.status(501).json({ error: 'Cloudinary not configured' });
    }
    
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }
    
    // Check if it's already a URL
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return res.json({ success: true, url: image });
    }
    
    // Upload to Cloudinary
    const base64Data = image.startsWith('data:') ? image : `data:image/jpeg;base64,${image}`;
    
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: 'rendezvous',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    });
    
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

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

// DELETE /api/posts/:id/like - Unlike a post
app.delete('/api/posts/:id/like', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    const { type } = req.query;
    const postType = type || 'review';
    
    if (postType === 'meetup') {
      await db.query('DELETE FROM meetup_likes WHERE post_id = $1 AND user_id = $2', [id, userId]);
      await db.query('UPDATE meetup_posts SET like_count = GREATEST(like_count - 1, 0) WHERE id = $1', [id]);
    } else {
      await db.query('DELETE FROM likes WHERE post_id = $1 AND user_id = $2', [id, userId]);
      await db.query('UPDATE review_posts SET like_count = GREATEST(like_count - 1, 0) WHERE id = $1', [id]);
    }
    
    res.json({ liked: false });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ error: 'Failed to unlike post' });
  }
});

// ==================== USERS ENDPOINTS ====================
// GET /api/users/recommended
app.get('/api/users/recommended', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const currentUserId = getUserFromToken(req);
    
    // Get recommended users (excluding current user if logged in)
    let query = `
      SELECT id, display_name, handle, avatar_url, bio 
      FROM users
    `;
    let params = [];
    
    if (currentUserId) {
      query += ` WHERE id != $1`;
      params.push(currentUserId);
    }
    
    query += ` ORDER BY RANDOM() LIMIT 10`;
    
    const result = await db.query(query, params);
    
    // Check which users the current user is following
    let followingSet = new Set();
    if (currentUserId) {
      const followingResult = await db.query(
        'SELECT following_id FROM follows WHERE follower_id = $1',
        [currentUserId]
      );
      followingSet = new Set(followingResult.rows.map(row => row.following_id));
    }
    
    const users = result.rows.map(user => ({
      id: user.id,
      displayName: user.display_name,
      handle: user.handle,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      isFollowedByCurrentUser: followingSet.has(user.id)
    }));
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    res.status(500).json({ error: 'Failed to fetch recommended users' });
  }
});

// GET /api/users/handle/:handle - Get user by handle
app.get('/api/users/handle/:handle', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { handle } = req.params;
    const result = await db.query(
      'SELECT id, display_name, handle, avatar_url, bio, cover_image_url, favorite_styles, favorite_categories, joined_date, created_at FROM users WHERE handle = $1',
      [handle]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = result.rows[0];
    
    // Get follower count
    const followerResult = await db.query('SELECT COUNT(*) FROM follows WHERE following_id = $1', [user.id]);
    const followingResult = await db.query('SELECT COUNT(*) FROM follows WHERE follower_id = $1', [user.id]);
    
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
    console.error('Error fetching user by handle:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
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

// PATCH /api/users/:id/profile - Update user profile
app.patch('/api/users/:id/profile', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const currentUserId = getUserFromToken(req);
    if (!currentUserId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Verify user is updating their own profile
    if (currentUserId !== id) {
      return res.status(403).json({ error: 'Cannot update another user\'s profile' });
    }
    
    const { displayName, bio, avatarUrl, coverImageUrl, favoriteStyles, favoriteCategories } = req.body;
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (displayName !== undefined) {
      updates.push(`display_name = $${paramCount++}`);
      values.push(displayName);
    }
    if (bio !== undefined) {
      updates.push(`bio = $${paramCount++}`);
      values.push(bio);
    }
    if (avatarUrl !== undefined) {
      updates.push(`avatar_url = $${paramCount++}`);
      values.push(avatarUrl);
    }
    if (coverImageUrl !== undefined) {
      updates.push(`cover_image_url = $${paramCount++}`);
      values.push(coverImageUrl);
    }
    if (favoriteStyles !== undefined) {
      updates.push(`favorite_styles = $${paramCount++}`);
      values.push(favoriteStyles);
    }
    if (favoriteCategories !== undefined) {
      updates.push(`favorite_categories = $${paramCount++}`);
      values.push(favoriteCategories);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    updates.push(`updated_at = NOW()`);
    values.push(id);
    
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await db.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const user = result.rows[0];
    res.json({
      success: true,
      user: {
        id: user.id,
        displayName: user.display_name,
        handle: user.handle,
        avatarUrl: user.avatar_url,
        coverImageUrl: user.cover_image_url,
        bio: user.bio,
        favoriteStyles: user.favorite_styles || [],
        favoriteCategories: user.favorite_categories || []
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// PUT /api/users/:id/profile - Update user profile (alternative)
app.put('/api/users/:id/profile', async (req, res) => {
  // Forward to PATCH handler
  req.method = 'PATCH';
  return app._router.handle(req, res, () => {});
});

// GET /api/users/:id/posts - Get posts by user (supports both ID and handle)
app.get('/api/users/:id/posts', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { id } = req.params;
    
    // Resolve the user ID (could be handle or UUID)
    const userId = await resolveUserId(id);
    if (!userId) {
      return res.json([]); // Return empty array if user not found
    }
    
    // Get review posts by this user
    const reviewResult = await db.query(`
      SELECT rp.*, u.display_name, u.handle, u.avatar_url, 'review' as type
      FROM review_posts rp
      LEFT JOIN users u ON rp.author_id = u.id
      WHERE rp.author_id = $1
      ORDER BY rp.created_at DESC
    `, [userId]);
    
    // Get meetup posts by this user
    const meetupResult = await db.query(`
      SELECT mp.*, u.display_name, u.handle, u.avatar_url, 'meetup' as type
      FROM meetup_posts mp
      LEFT JOIN users u ON mp.author_id = u.id
      WHERE mp.author_id = $1
      ORDER BY mp.created_at DESC
    `, [userId]);
    
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
    console.error('Error fetching user posts:', error);
    res.status(500).json({ error: 'Failed to fetch user posts' });
  }
});

// Helper function to get user ID from either ID or handle
const resolveUserId = async (idOrHandle) => {
  // First, check if this ID exists directly in the users table
  const directResult = await db.query('SELECT id FROM users WHERE id = $1', [idOrHandle]);
  if (directResult.rows.length > 0) {
    return directResult.rows[0].id;
  }
  
  // If not found by ID, try looking up by handle
  const handleResult = await db.query('SELECT id FROM users WHERE handle = $1', [idOrHandle]);
  if (handleResult.rows.length > 0) {
    return handleResult.rows[0].id;
  }
  
  return null;
};

// POST /api/users/:id/follow
app.post('/api/users/:id/follow', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const currentUserId = getUserFromToken(req);
    if (!currentUserId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Resolve the target user ID (could be handle or UUID)
    const targetUserId = await resolveUserId(id);
    if (!targetUserId) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    if (currentUserId === targetUserId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }
    
    const followId = uuidv4();
    
    await db.query(
      'INSERT INTO follows (id, follower_id, following_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [followId, currentUserId, targetUserId]
    );
    
    res.json({ success: true, followed: true });
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
});

// DELETE /api/users/:id/follow
app.delete('/api/users/:id/follow', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const currentUserId = getUserFromToken(req);
    if (!currentUserId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Resolve the target user ID (could be handle or UUID)
    const targetUserId = await resolveUserId(id);
    if (!targetUserId) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    await db.query(
      'DELETE FROM follows WHERE follower_id = $1 AND following_id = $2',
      [currentUserId, targetUserId]
    );
    
    res.json({ success: true, followed: false });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
});

// GET /api/users/:id/following-check - Check if current user is following target user
app.get('/api/users/:id/following-check', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const currentUserId = getUserFromToken(req);
    if (!currentUserId) {
      return res.json({ isFollowing: false });
    }
    
    const { id } = req.params;
    const targetUserId = await resolveUserId(id);
    if (!targetUserId) {
      return res.json({ isFollowing: false });
    }
    
    const result = await db.query(
      'SELECT id FROM follows WHERE follower_id = $1 AND following_id = $2',
      [currentUserId, targetUserId]
    );
    
    res.json({ isFollowing: result.rows.length > 0 });
  } catch (error) {
    console.error('Error checking follow status:', error);
    res.json({ isFollowing: false });
  }
});

// GET /api/users/:id/likes - Get posts liked by user
app.get('/api/users/:id/likes', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { id } = req.params;
    const userId = await resolveUserId(id);
    if (!userId) {
      return res.json([]);
    }
    
    // Get liked review posts
    const reviewResult = await db.query(`
      SELECT rp.*, u.display_name, u.handle, u.avatar_url, 'review' as type
      FROM likes l
      JOIN review_posts rp ON l.post_id = rp.id
      LEFT JOIN users u ON rp.author_id = u.id
      WHERE l.user_id = $1
      ORDER BY l.created_at DESC
    `, [userId]);
    
    // Get liked meetup posts
    const meetupResult = await db.query(`
      SELECT mp.*, u.display_name, u.handle, u.avatar_url, 'meetup' as type
      FROM meetup_likes ml
      JOIN meetup_posts mp ON ml.post_id = mp.id
      LEFT JOIN users u ON mp.author_id = u.id
      WHERE ml.user_id = $1
      ORDER BY ml.created_at DESC
    `, [userId]);
    
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
        locationArea: row.location_area,
        boardId: row.board_id,
        title: row.title || '',
        content: row.content || '',
        rating: row.rating,
        priceLevel: row.price_level,
        images: images.length > 0 ? images : undefined,
        likeCount: row.like_count || 0,
        commentCount: row.comment_count || 0,
        createdAt: row.created_at
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
      meetupTime: row.meetup_time,
      maxHeadcount: row.max_headcount,
      currentHeadcount: row.current_headcount,
      budgetDescription: row.budget_description,
      description: row.description,
      likeCount: row.like_count || 0,
      commentCount: row.comment_count || 0,
      createdAt: row.created_at
    }));
    
    const allPosts = [...reviewPosts, ...meetupPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    
    res.json(allPosts);
  } catch (error) {
    console.error('Error fetching user likes:', error);
    res.status(500).json({ error: 'Failed to fetch likes' });
  }
});

// GET /api/users/:id/bookmarks - Get posts bookmarked/saved by user
app.get('/api/users/:id/bookmarks', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { id } = req.params;
    const userId = await resolveUserId(id);
    if (!userId) {
      return res.json([]);
    }
    
    // Get saved review posts
    const savedReviewResult = await db.query(`
      SELECT sp.*, rp.*, u.display_name, u.handle, u.avatar_url, 'review' as type
      FROM saved_posts sp
      JOIN review_posts rp ON sp.post_id = rp.id
      LEFT JOIN users u ON rp.author_id = u.id
      WHERE sp.user_id = $1 AND sp.post_type = 'review'
      ORDER BY sp.created_at DESC
    `, [userId]);
    
    // Get saved meetup posts
    const savedMeetupResult = await db.query(`
      SELECT sp.*, mp.*, u.display_name, u.handle, u.avatar_url, 'meetup' as type
      FROM saved_posts sp
      JOIN meetup_posts mp ON sp.post_id = mp.id
      LEFT JOIN users u ON mp.author_id = u.id
      WHERE sp.user_id = $1 AND sp.post_type = 'meetup'
      ORDER BY sp.created_at DESC
    `, [userId]);
    
    // Process saved posts
    const reviewPosts = await Promise.all(savedReviewResult.rows.map(async (row) => {
      const imagesResult = await db.query(
        'SELECT image_url FROM post_images WHERE post_id = $1 ORDER BY image_order',
        [row.post_id]
      );
      const images = imagesResult.rows.map(img => img.image_url).filter(url => url && !url.startsWith('blob:'));
      
      return {
        id: row.post_id,
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
        locationArea: row.location_area,
        boardId: row.board_id,
        title: row.title || '',
        content: row.content || '',
        rating: row.rating,
        priceLevel: row.price_level,
        images: images.length > 0 ? images : undefined,
        likeCount: row.like_count || 0,
        commentCount: row.comment_count || 0,
        createdAt: row.created_at
      };
    }));
    
    const meetupPosts = savedMeetupResult.rows.map(row => ({
      id: row.post_id,
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
      meetupTime: row.meetup_time,
      maxHeadcount: row.max_headcount,
      currentHeadcount: row.current_headcount,
      budgetDescription: row.budget_description,
      description: row.description,
      likeCount: row.like_count || 0,
      commentCount: row.comment_count || 0,
      createdAt: row.created_at
    }));
    
    res.json([...reviewPosts, ...meetupPosts]);
  } catch (error) {
    console.error('Error fetching user bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

// GET /api/users/:id/reposts - Get posts reposted by user
app.get('/api/users/:id/reposts', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { id } = req.params;
    const userId = await resolveUserId(id);
    if (!userId) {
      return res.json([]);
    }
    
    // Get reposted review posts
    const repostReviewResult = await db.query(`
      SELECT rp.*, r.created_at as reposted_at, u.display_name, u.handle, u.avatar_url, 'review' as type
      FROM reposts r
      JOIN review_posts rp ON r.post_id = rp.id
      LEFT JOIN users u ON rp.author_id = u.id
      WHERE r.user_id = $1 AND r.post_type = 'review'
      ORDER BY r.created_at DESC
    `, [userId]);
    
    // Get reposted meetup posts
    const repostMeetupResult = await db.query(`
      SELECT mp.*, r.created_at as reposted_at, u.display_name, u.handle, u.avatar_url, 'meetup' as type
      FROM reposts r
      JOIN meetup_posts mp ON r.post_id = mp.id
      LEFT JOIN users u ON mp.author_id = u.id
      WHERE r.user_id = $1 AND r.post_type = 'meetup'
      ORDER BY r.created_at DESC
    `, [userId]);
    
    // Process posts
    const reviewPosts = await Promise.all(repostReviewResult.rows.map(async (row) => {
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
        title: row.title || '',
        content: row.content || '',
        rating: row.rating,
        priceLevel: row.price_level,
        images: images.length > 0 ? images : undefined,
        likeCount: row.like_count || 0,
        commentCount: row.comment_count || 0,
        createdAt: row.created_at,
        repostedAt: row.reposted_at
      };
    }));
    
    const meetupPosts = repostMeetupResult.rows.map(row => ({
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
      meetupTime: row.meetup_time,
      description: row.description,
      likeCount: row.like_count || 0,
      commentCount: row.comment_count || 0,
      createdAt: row.created_at,
      repostedAt: row.reposted_at
    }));
    
    res.json([...reviewPosts, ...meetupPosts]);
  } catch (error) {
    console.error('Error fetching user reposts:', error);
    res.status(500).json({ error: 'Failed to fetch reposts' });
  }
});

// POST /api/posts/:id/repost - Repost a post
app.post('/api/posts/:id/repost', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    const { type } = req.query;
    const postType = type || 'review';
    
    // Check if already reposted
    const existing = await db.query(
      'SELECT id FROM reposts WHERE user_id = $1 AND post_id = $2 AND post_type = $3',
      [userId, id, postType]
    );
    
    if (existing.rows.length > 0) {
      return res.json({ reposted: true, message: 'Already reposted' });
    }
    
    const repostId = uuidv4();
    await db.query(
      'INSERT INTO reposts (id, user_id, post_id, post_type) VALUES ($1, $2, $3, $4)',
      [repostId, userId, id, postType]
    );
    
    // Update share count
    if (postType === 'meetup') {
      await db.query('UPDATE meetup_posts SET share_count = COALESCE(share_count, 0) + 1 WHERE id = $1', [id]);
    } else {
      await db.query('UPDATE review_posts SET share_count = COALESCE(share_count, 0) + 1 WHERE id = $1', [id]);
    }
    
    res.json({ reposted: true });
  } catch (error) {
    console.error('Error reposting:', error);
    res.status(500).json({ error: 'Failed to repost' });
  }
});

// DELETE /api/posts/:id/repost - Un-repost a post
app.delete('/api/posts/:id/repost', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    const { type } = req.query;
    const postType = type || 'review';
    
    await db.query(
      'DELETE FROM reposts WHERE user_id = $1 AND post_id = $2 AND post_type = $3',
      [userId, id, postType]
    );
    
    res.json({ reposted: false });
  } catch (error) {
    console.error('Error un-reposting:', error);
    res.status(500).json({ error: 'Failed to un-repost' });
  }
});

// GET /api/users/:id/replies - Get replies (comments) by user
app.get('/api/users/:id/replies', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { id } = req.params;
    const userId = await resolveUserId(id);
    if (!userId) {
      return res.json([]);
    }
    
    // Get user's comments with post info
    const result = await db.query(`
      SELECT c.*, u.display_name, u.handle, u.avatar_url,
             rp.restaurant_name as review_restaurant_name, rp.title as review_title,
             mp.restaurant_name as meetup_restaurant_name, mp.description as meetup_description
      FROM comments c
      LEFT JOIN users u ON c.author_id = u.id
      LEFT JOIN review_posts rp ON c.post_id = rp.id AND c.post_type = 'review'
      LEFT JOIN meetup_posts mp ON c.post_id = mp.id AND c.post_type = 'meetup'
      WHERE c.author_id = $1
      ORDER BY c.created_at DESC
    `, [userId]);
    
    const replies = result.rows.map(row => ({
      id: row.id,
      postId: row.post_id,
      postType: row.post_type,
      content: row.content,
      likeCount: row.like_count || 0,
      createdAt: row.created_at,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        handle: row.handle,
        avatarUrl: row.avatar_url
      },
      post: {
        restaurantName: row.review_restaurant_name || row.meetup_restaurant_name,
        title: row.review_title || row.meetup_description
      }
    }));
    
    res.json(replies);
  } catch (error) {
    console.error('Error fetching user replies:', error);
    res.status(500).json({ error: 'Failed to fetch replies' });
  }
});

// ==================== COMMENTS ENDPOINTS ====================
// POST /api/comments - Create a comment (frontend uses this path)
app.post('/api/comments', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { postId, postType, parentId, content } = req.body;
    
    if (!postId || !content) {
      return res.status(400).json({ error: 'postId and content are required' });
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
    res.status(201).json({
      id: row.id,
      postId: row.post_id,
      postType: row.post_type,
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
      isLikedByUser: false,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      replies: []
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// POST /api/comments/:id/like - Like a comment
app.post('/api/comments/:id/like', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Check if already liked
    const existing = await db.query(
      'SELECT id FROM comment_likes WHERE comment_id = $1 AND user_id = $2',
      [id, userId]
    );
    
    if (existing.rows.length > 0) {
      return res.json({ liked: true, message: 'Already liked' });
    }
    
    const likeId = uuidv4();
    
    await db.query(
      'INSERT INTO comment_likes (id, comment_id, user_id) VALUES ($1, $2, $3)',
      [likeId, id, userId]
    );
    
    await db.query('UPDATE comments SET like_count = like_count + 1 WHERE id = $1', [id]);
    
    res.json({ liked: true });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ error: 'Failed to like comment' });
  }
});

// DELETE /api/comments/:id/like - Unlike a comment
app.delete('/api/comments/:id/like', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    await db.query('DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2', [id, userId]);
    await db.query('UPDATE comments SET like_count = GREATEST(like_count - 1, 0) WHERE id = $1', [id]);
    
    res.json({ liked: false });
  } catch (error) {
    console.error('Error unliking comment:', error);
    res.status(500).json({ error: 'Failed to unlike comment' });
  }
});

// DELETE /api/comments/:id - Delete a comment
app.delete('/api/comments/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Verify the comment belongs to the user
    const commentResult = await db.query('SELECT author_id, post_id, post_type FROM comments WHERE id = $1', [id]);
    if (commentResult.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    if (commentResult.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this comment' });
    }
    
    const { post_id, post_type } = commentResult.rows[0];
    
    // Delete comment likes first
    await db.query('DELETE FROM comment_likes WHERE comment_id = $1', [id]);
    
    // Delete the comment
    await db.query('DELETE FROM comments WHERE id = $1', [id]);
    
    // Update comment count
    if (post_type === 'meetup') {
      await db.query('UPDATE meetup_posts SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = $1', [post_id]);
    } else {
      await db.query('UPDATE review_posts SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = $1', [post_id]);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

// GET /api/comments/:postId - Fetch comments for a post (frontend uses this path)
app.get('/api/comments/:postId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { postId } = req.params;
    const { postType } = req.query;
    
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

// POST /api/comments/:postId - Create a comment (frontend uses this path)
app.post('/api/comments/:postId', async (req, res) => {
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
    res.status(201).json({
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

// GET /api/posts/:postId/comments (alternative path)
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
// GET /api/favorites - Get saved restaurants (primary endpoint used by frontend)
app.get('/api/favorites', async (req, res) => {
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
      restaurantId: row.restaurant_id || row.id,
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

// POST /api/favorites/:restaurantId - Save a restaurant
app.post('/api/favorites/:restaurantId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { restaurantId } = req.params;
    const { name, address, lat, lng, styles, categories, rating, priceLevel, savedFromPostId } = req.body;
    
    if (!name || !address || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Name, address, lat, and lng are required' });
    }
    
    // Check if already saved
    const existing = await db.query(
      'SELECT id FROM saved_restaurants WHERE user_id = $1 AND restaurant_id = $2',
      [userId, restaurantId]
    );
    
    if (existing.rows.length > 0) {
      return res.json({ success: true, message: 'Already saved', id: existing.rows[0].id });
    }
    
    const id = uuidv4();
    
    await db.query(
      `INSERT INTO saved_restaurants (id, user_id, restaurant_id, name, address, lat, lng, styles, categories, rating, price_level, saved_from_post_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [id, userId, restaurantId, name, address, lat, lng, styles || [], categories || [], rating || null, priceLevel || null, savedFromPostId || null]
    );
    
    res.status(201).json({
      success: true,
      id,
      restaurantId,
      userId,
      name,
      address,
      lat,
      lng,
      styles: styles || [],
      categories: categories || [],
      rating,
      priceLevel,
      savedFromPostId,
      savedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving restaurant:', error);
    res.status(500).json({ error: 'Failed to save restaurant' });
  }
});

// DELETE /api/favorites/:restaurantId - Unsave a restaurant
app.delete('/api/favorites/:restaurantId', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { restaurantId } = req.params;
    
    // Try to delete by restaurant_id first, then by id
    const result = await db.query(
      'DELETE FROM saved_restaurants WHERE user_id = $1 AND (restaurant_id = $2 OR id = $2)',
      [userId, restaurantId]
    );
    
    res.json({ success: true, deleted: result.rowCount > 0 });
  } catch (error) {
    console.error('Error unsaving restaurant:', error);
    res.status(500).json({ error: 'Failed to unsave restaurant' });
  }
});

// Legacy endpoint aliases
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
      restaurantId: row.restaurant_id || row.id,
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

// POST /api/restaurants/save - Save a restaurant (legacy)
app.post('/api/restaurants/save', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { restaurantId, name, address, lat, lng, styles, categories, rating, priceLevel, savedFromPostId } = req.body;
    
    if (!name || !address || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Name, address, lat, and lng are required' });
    }
    
    const rid = restaurantId || uuidv4();
    const id = uuidv4();
    
    // Check if already saved
    const existing = await db.query(
      'SELECT id FROM saved_restaurants WHERE user_id = $1 AND restaurant_id = $2',
      [userId, rid]
    );
    
    if (existing.rows.length > 0) {
      return res.json({ success: true, message: 'Already saved', id: existing.rows[0].id });
    }
    
    await db.query(
      `INSERT INTO saved_restaurants (id, user_id, restaurant_id, name, address, lat, lng, styles, categories, rating, price_level, saved_from_post_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [id, userId, rid, name, address, lat, lng, styles || [], categories || [], rating || null, priceLevel || null, savedFromPostId || null]
    );
    
    res.status(201).json({
      success: true,
      id,
      restaurantId: rid,
      userId,
      name,
      address,
      lat,
      lng,
      styles: styles || [],
      categories: categories || [],
      rating,
      priceLevel,
      savedFromPostId,
      savedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving restaurant:', error);
    res.status(500).json({ error: 'Failed to save restaurant' });
  }
});

// DELETE /api/restaurants/:id - Unsave a restaurant (legacy)
app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    await db.query(
      'DELETE FROM saved_restaurants WHERE (id = $1 OR restaurant_id = $1) AND user_id = $2',
      [id, userId]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error unsaving restaurant:', error);
    res.status(500).json({ error: 'Failed to unsave restaurant' });
  }
});

// ==================== SAVED POSTS ====================
// GET /api/posts/saved/list - Get saved posts
app.get('/api/posts/saved/list', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Get saved review posts
    const savedReviewResult = await db.query(`
      SELECT sp.*, rp.*, u.display_name, u.handle, u.avatar_url, 'review' as type
      FROM saved_posts sp
      JOIN review_posts rp ON sp.post_id = rp.id
      LEFT JOIN users u ON rp.author_id = u.id
      WHERE sp.user_id = $1 AND sp.post_type = 'review'
      ORDER BY sp.created_at DESC
    `, [userId]);
    
    // Get saved meetup posts
    const savedMeetupResult = await db.query(`
      SELECT sp.*, mp.*, u.display_name, u.handle, u.avatar_url, 'meetup' as type
      FROM saved_posts sp
      JOIN meetup_posts mp ON sp.post_id = mp.id
      LEFT JOIN users u ON mp.author_id = u.id
      WHERE sp.user_id = $1 AND sp.post_type = 'meetup'
      ORDER BY sp.created_at DESC
    `, [userId]);
    
    // Process saved posts
    const reviewPosts = await Promise.all(savedReviewResult.rows.map(async (row) => {
      const imagesResult = await db.query(
        'SELECT image_url FROM post_images WHERE post_id = $1 ORDER BY image_order',
        [row.post_id]
      );
      const images = imagesResult.rows.map(img => img.image_url).filter(url => url && !url.startsWith('blob:'));
      
      return {
        id: row.post_id,
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
        locationArea: row.location_area,
        boardId: row.board_id,
        title: row.title || '',
        content: row.content || '',
        rating: row.rating,
        priceLevel: row.price_level,
        images: images.length > 0 ? images : undefined,
        likeCount: row.like_count || 0,
        commentCount: row.comment_count || 0,
        createdAt: row.created_at
      };
    }));
    
    const meetupPosts = savedMeetupResult.rows.map(row => ({
      id: row.post_id,
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
      meetupTime: row.meetup_time,
      maxHeadcount: row.max_headcount,
      currentHeadcount: row.current_headcount,
      budgetDescription: row.budget_description,
      description: row.description,
      likeCount: row.like_count || 0,
      commentCount: row.comment_count || 0,
      createdAt: row.created_at
    }));
    
    res.json([...reviewPosts, ...meetupPosts]);
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    res.status(500).json({ error: 'Failed to fetch saved posts' });
  }
});

// POST /api/posts/:id/save - Save a post
app.post('/api/posts/:id/save', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    const { type } = req.query;
    const postType = type || 'review';
    
    const saveId = uuidv4();
    
    // Check if already saved
    const existing = await db.query(
      'SELECT id FROM saved_posts WHERE user_id = $1 AND post_id = $2 AND post_type = $3',
      [userId, id, postType]
    );
    
    if (existing.rows.length > 0) {
      return res.json({ saved: true, message: 'Already saved' });
    }
    
    await db.query(
      'INSERT INTO saved_posts (id, user_id, post_id, post_type) VALUES ($1, $2, $3, $4)',
      [saveId, userId, id, postType]
    );
    
    res.json({ saved: true });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ error: 'Failed to save post' });
  }
});

// DELETE /api/posts/:id/save - Unsave a post
app.delete('/api/posts/:id/save', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    const { type } = req.query;
    const postType = type || 'review';
    
    await db.query(
      'DELETE FROM saved_posts WHERE user_id = $1 AND post_id = $2 AND post_type = $3',
      [userId, id, postType]
    );
    
    res.json({ saved: false });
  } catch (error) {
    console.error('Error unsaving post:', error);
    res.status(500).json({ error: 'Failed to unsave post' });
  }
});

// ==================== REPORT POSTS ====================
// POST /api/posts/:id/report - Report a post
app.post('/api/posts/:id/report', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    const { type, reason, description } = req.body;
    const postType = type || 'review';
    
    // Check if reported_posts table exists, create if not
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS reported_posts (
          id TEXT PRIMARY KEY,
          post_id TEXT NOT NULL,
          post_type TEXT NOT NULL,
          reporter_id TEXT NOT NULL,
          reason TEXT NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
        )
      `);
    } catch (e) {
      // Table might already exist
    }
    
    const reportId = uuidv4();
    
    await db.query(
      'INSERT INTO reported_posts (id, post_id, post_type, reporter_id, reason, description) VALUES ($1, $2, $3, $4, $5, $6)',
      [reportId, id, postType, userId, reason, description || null]
    );
    
    res.json({ success: true, message: 'Post reported successfully' });
  } catch (error) {
    console.error('Error reporting post:', error);
    res.status(500).json({ error: 'Failed to report post' });
  }
});

// ==================== SHARE POSTS ====================
// POST /api/posts/:id/share - Record a share
app.post('/api/posts/:id/share', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { id } = req.params;
    const { type } = req.query;
    const postType = type || 'review';
    
    // Increment share count
    if (postType === 'meetup') {
      await db.query('UPDATE meetup_posts SET share_count = COALESCE(share_count, 0) + 1 WHERE id = $1', [id]);
    } else {
      await db.query('UPDATE review_posts SET share_count = COALESCE(share_count, 0) + 1 WHERE id = $1', [id]);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error recording share:', error);
    res.status(500).json({ error: 'Failed to record share' });
  }
});

// ==================== UPDATE POSTS ====================
// PUT /api/posts/review/:id - Update a review post
app.put('/api/posts/review/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Verify the post belongs to the user
    const postResult = await db.query('SELECT author_id FROM review_posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (postResult.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }
    
    const {
      restaurantName, restaurantAddress, restaurantLat, restaurantLng,
      locationArea, boardId, styleType, foodType, title, content,
      rating, priceLevel, images
    } = req.body;
    
    // Build update query
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (restaurantName !== undefined) { updates.push(`restaurant_name = $${paramCount++}`); values.push(restaurantName); }
    if (restaurantAddress !== undefined) { updates.push(`restaurant_address = $${paramCount++}`); values.push(restaurantAddress); }
    if (restaurantLat !== undefined) { updates.push(`restaurant_lat = $${paramCount++}`); values.push(restaurantLat); }
    if (restaurantLng !== undefined) { updates.push(`restaurant_lng = $${paramCount++}`); values.push(restaurantLng); }
    if (locationArea !== undefined) { updates.push(`location_area = $${paramCount++}`); values.push(locationArea); }
    if (boardId !== undefined) { updates.push(`board_id = $${paramCount++}`); values.push(boardId); }
    if (styleType !== undefined) { updates.push(`style_type = $${paramCount++}`); values.push(styleType); }
    if (foodType !== undefined) { updates.push(`food_type = $${paramCount++}`); values.push(foodType); }
    if (title !== undefined) { updates.push(`title = $${paramCount++}`); values.push(title); }
    if (content !== undefined) { updates.push(`content = $${paramCount++}`); values.push(content); }
    if (rating !== undefined) { updates.push(`rating = $${paramCount++}`); values.push(rating); }
    if (priceLevel !== undefined) { updates.push(`price_level = $${paramCount++}`); values.push(priceLevel); }
    
    updates.push(`updated_at = NOW()`);
    values.push(id);
    
    const query = `UPDATE review_posts SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await db.query(query, values);
    
    // Update images if provided
    if (images && images.length > 0) {
      await db.query('DELETE FROM post_images WHERE post_id = $1', [id]);
      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i];
        if (imageUrl && !imageUrl.startsWith('blob:')) {
          const imageId = uuidv4();
          await db.query(
            'INSERT INTO post_images (id, post_id, image_url, image_order) VALUES ($1, $2, $3, $4)',
            [imageId, id, imageUrl, i]
          );
        }
      }
    }
    
    const row = result.rows[0];
    res.json({
      id: row.id,
      type: 'review',
      restaurantName: row.restaurant_name,
      title: row.title,
      content: row.content,
      rating: row.rating,
      priceLevel: row.price_level,
      updatedAt: row.updated_at
    });
  } catch (error) {
    console.error('Error updating review post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// PUT /api/posts/meetup/:id - Update a meetup post
app.put('/api/posts/meetup/:id', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Verify the post belongs to the user
    const postResult = await db.query('SELECT author_id FROM meetup_posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (postResult.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }
    
    const {
      restaurantName, locationText, address, meetupTime,
      foodTags, maxHeadcount, budgetDescription, hasReservation,
      description, imageUrl, boardId, locationArea
    } = req.body;
    
    // Build update query
    const updates = [];
    const values = [];
    let paramCount = 1;
    
    if (restaurantName !== undefined) { updates.push(`restaurant_name = $${paramCount++}`); values.push(restaurantName); }
    if (locationText !== undefined) { updates.push(`location_text = $${paramCount++}`); values.push(locationText); }
    if (address !== undefined) { updates.push(`address = $${paramCount++}`); values.push(address); }
    if (meetupTime !== undefined) { updates.push(`meetup_time = $${paramCount++}`); values.push(meetupTime); }
    if (foodTags !== undefined) { updates.push(`food_tags = $${paramCount++}`); values.push(foodTags); }
    if (maxHeadcount !== undefined) { updates.push(`max_headcount = $${paramCount++}`); values.push(maxHeadcount); }
    if (budgetDescription !== undefined) { updates.push(`budget_description = $${paramCount++}`); values.push(budgetDescription); }
    if (hasReservation !== undefined) { updates.push(`has_reservation = $${paramCount++}`); values.push(hasReservation); }
    if (description !== undefined) { updates.push(`description = $${paramCount++}`); values.push(description); }
    if (imageUrl !== undefined) { updates.push(`image_url = $${paramCount++}`); values.push(imageUrl); }
    if (boardId !== undefined) { updates.push(`board_id = $${paramCount++}`); values.push(boardId); }
    if (locationArea !== undefined) { updates.push(`location_area = $${paramCount++}`); values.push(locationArea); }
    
    updates.push(`updated_at = NOW()`);
    values.push(id);
    
    const query = `UPDATE meetup_posts SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    const result = await db.query(query, values);
    
    const row = result.rows[0];
    res.json({
      id: row.id,
      type: 'meetup',
      restaurantName: row.restaurant_name,
      locationText: row.location_text,
      meetupTime: row.meetup_time,
      description: row.description,
      updatedAt: row.updated_at
    });
  } catch (error) {
    console.error('Error updating meetup post:', error);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// ==================== MEETUP ENROLLMENT ====================
// GET /api/posts/:id/enrollment - Get enrollment info for a meetup post
app.get('/api/posts/:id/enrollment', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const { id } = req.params;
    const currentUserId = getUserFromToken(req);
    
    // Get the meetup post
    const postResult = await db.query(`
      SELECT mp.*, u.display_name, u.handle, u.avatar_url
      FROM meetup_posts mp
      LEFT JOIN users u ON mp.author_id = u.id
      WHERE mp.id = $1
    `, [id]);
    
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Meetup post not found' });
    }
    
    const post = postResult.rows[0];
    
    // Get enrolled members
    const enrollmentResult = await db.query(`
      SELECT me.*, u.id as user_id, u.display_name, u.handle, u.avatar_url
      FROM meetup_enrollments me
      JOIN users u ON me.user_id = u.id
      WHERE me.post_id = $1
      ORDER BY me.created_at ASC
    `, [id]);
    
    const enrolledMembers = enrollmentResult.rows.map(row => ({
      id: row.user_id,
      displayName: row.display_name,
      handle: row.handle,
      avatarUrl: row.avatar_url
    }));
    
    // Check if current user is enrolled
    const isEnrolled = currentUserId ? enrolledMembers.some(m => m.id === currentUserId) : false;
    
    // Calculate enrollment status
    const enrolledCount = enrolledMembers.length + 1; // +1 for the host
    const capacity = post.max_headcount;
    const isFull = enrolledCount >= capacity;
    const eventTime = post.meetup_time;
    const eventStarted = new Date(eventTime) < new Date();
    
    // Can cancel if enrolled and event hasn't started
    const canCancel = isEnrolled && !eventStarted;
    
    res.json({
      postId: id,
      capacity,
      enrolledCount,
      isEnrolled,
      canCancel,
      isFull,
      eventStarted,
      eventTime,
      host: {
        id: post.author_id,
        displayName: post.display_name,
        handle: post.handle,
        avatarUrl: post.avatar_url
      },
      enrolledMembers
    });
  } catch (error) {
    console.error('Error fetching enrollment info:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment info' });
  }
});

// POST /api/posts/:id/enroll - Enroll in a meetup
app.post('/api/posts/:id/enroll', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Get the meetup post
    const postResult = await db.query('SELECT * FROM meetup_posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Meetup post not found' });
    }
    
    const post = postResult.rows[0];
    
    // Check if user is the host
    if (post.author_id === userId) {
      return res.status(400).json({ error: 'Host cannot enroll in their own meetup' });
    }
    
    // Check if event has started
    if (new Date(post.meetup_time) < new Date()) {
      return res.status(400).json({ error: 'Event has already started' });
    }
    
    // Check if already enrolled
    const existing = await db.query(
      'SELECT id FROM meetup_enrollments WHERE post_id = $1 AND user_id = $2',
      [id, userId]
    );
    
    if (existing.rows.length > 0) {
      return res.json({ success: true, isEnrolled: true, message: 'Already enrolled' });
    }
    
    // Check capacity
    const countResult = await db.query(
      'SELECT COUNT(*) FROM meetup_enrollments WHERE post_id = $1',
      [id]
    );
    const currentCount = parseInt(countResult.rows[0].count) + 1; // +1 for host
    
    if (currentCount >= post.max_headcount) {
      return res.status(400).json({ error: 'Meetup is full' });
    }
    
    // Enroll user
    const enrollmentId = uuidv4();
    await db.query(
      'INSERT INTO meetup_enrollments (id, post_id, user_id) VALUES ($1, $2, $3)',
      [enrollmentId, id, userId]
    );
    
    // Update current headcount
    await db.query(
      'UPDATE meetup_posts SET current_headcount = current_headcount + 1 WHERE id = $1',
      [id]
    );
    
    // Get updated enrollment info
    const enrollmentResult = await db.query(`
      SELECT u.id, u.display_name, u.handle, u.avatar_url
      FROM meetup_enrollments me
      JOIN users u ON me.user_id = u.id
      WHERE me.post_id = $1
    `, [id]);
    
    const enrolledMembers = enrollmentResult.rows.map(row => ({
      id: row.id,
      displayName: row.display_name,
      handle: row.handle,
      avatarUrl: row.avatar_url
    }));
    
    res.json({
      success: true,
      isEnrolled: true,
      enrolledCount: enrolledMembers.length + 1,
      capacity: post.max_headcount,
      isFull: enrolledMembers.length + 1 >= post.max_headcount,
      enrolledMembers
    });
  } catch (error) {
    console.error('Error enrolling in meetup:', error);
    res.status(500).json({ error: 'Failed to enroll' });
  }
});

// DELETE /api/posts/:id/enroll - Cancel enrollment
app.delete('/api/posts/:id/enroll', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Get the meetup post
    const postResult = await db.query('SELECT * FROM meetup_posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Meetup post not found' });
    }
    
    const post = postResult.rows[0];
    
    // Check if event has started
    if (new Date(post.meetup_time) < new Date()) {
      return res.status(400).json({ error: 'Cannot cancel after event has started' });
    }
    
    // Delete enrollment
    const deleteResult = await db.query(
      'DELETE FROM meetup_enrollments WHERE post_id = $1 AND user_id = $2',
      [id, userId]
    );
    
    if (deleteResult.rowCount > 0) {
      // Update current headcount
      await db.query(
        'UPDATE meetup_posts SET current_headcount = GREATEST(current_headcount - 1, 1) WHERE id = $1',
        [id]
      );
    }
    
    // Get updated enrollment info
    const enrollmentResult = await db.query(`
      SELECT u.id, u.display_name, u.handle, u.avatar_url
      FROM meetup_enrollments me
      JOIN users u ON me.user_id = u.id
      WHERE me.post_id = $1
    `, [id]);
    
    const enrolledMembers = enrollmentResult.rows.map(row => ({
      id: row.id,
      displayName: row.display_name,
      handle: row.handle,
      avatarUrl: row.avatar_url
    }));
    
    res.json({
      success: true,
      isEnrolled: false,
      enrolledCount: enrolledMembers.length + 1,
      capacity: post.max_headcount,
      isFull: false,
      enrolledMembers
    });
  } catch (error) {
    console.error('Error canceling enrollment:', error);
    res.status(500).json({ error: 'Failed to cancel enrollment' });
  }
});

// ==================== FOLLOWING POSTS ====================
// GET /api/posts/following - Get posts from followed users
app.get('/api/posts/following', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    // Get users that current user follows
    const followingResult = await db.query(
      'SELECT following_id FROM follows WHERE follower_id = $1',
      [userId]
    );
    
    if (followingResult.rows.length === 0) {
      return res.json([]);
    }
    
    const followingIds = followingResult.rows.map(row => row.following_id);
    
    // Get review posts from followed users
    const reviewResult = await db.query(`
      SELECT rp.*, u.display_name, u.handle, u.avatar_url, 'review' as type
      FROM review_posts rp
      LEFT JOIN users u ON rp.author_id = u.id
      WHERE rp.author_id = ANY($1)
      ORDER BY rp.created_at DESC
      LIMIT 50
    `, [followingIds]);
    
    // Get meetup posts from followed users
    const meetupResult = await db.query(`
      SELECT mp.*, u.display_name, u.handle, u.avatar_url, 'meetup' as type
      FROM meetup_posts mp
      LEFT JOIN users u ON mp.author_id = u.id
      WHERE mp.author_id = ANY($1)
      ORDER BY mp.created_at DESC
      LIMIT 50
    `, [followingIds]);
    
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
    console.error('Error fetching following posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// ==================== ARCHIVE POSTS ====================
// POST /api/posts/review/:id/archive - Archive a review post
app.post('/api/posts/review/:id/archive', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Verify the post belongs to the user
    const postResult = await db.query('SELECT author_id FROM review_posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (postResult.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to archive this post' });
    }
    
    // For now, we'll just change visibility to FOLLOWERS as a form of "archive"
    await db.query('UPDATE review_posts SET visibility = $1 WHERE id = $2', ['FOLLOWERS', id]);
    
    res.json({ success: true, message: 'Post archived' });
  } catch (error) {
    console.error('Error archiving review post:', error);
    res.status(500).json({ error: 'Failed to archive post' });
  }
});

// POST /api/posts/meetup/:id/archive - Archive a meetup post
app.post('/api/posts/meetup/:id/archive', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'Database not configured' });
    
    const userId = getUserFromToken(req);
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { id } = req.params;
    
    // Verify the post belongs to the user
    const postResult = await db.query('SELECT author_id FROM meetup_posts WHERE id = $1', [id]);
    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (postResult.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Not authorized to archive this post' });
    }
    
    // For meetups, set status to CLOSED
    await db.query('UPDATE meetup_posts SET status = $1 WHERE id = $2', ['CLOSED', id]);
    
    res.json({ success: true, message: 'Post archived' });
  } catch (error) {
    console.error('Error archiving meetup post:', error);
    res.status(500).json({ error: 'Failed to archive post' });
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
