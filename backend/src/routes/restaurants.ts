import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { query, isDatabaseAvailable } from '../db/database';
import { SavedRestaurant } from '../types/models';

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

// GET /api/restaurants - Get user's saved restaurants
router.get('/', requireDatabase, async (req: Request, res: Response) => {
  try {
    const userId = getUserFromToken(req);

    if (!userId) {
      return res.json([]);
    }

    // Get user's saved restaurants
    const result = await query(
      `SELECT 
        id, user_id, restaurant_id, name, address, lat, lng, styles, categories,
        rating, price_level, saved_from_post_id, saved_at
      FROM saved_restaurants
      WHERE user_id = $1
      ORDER BY saved_at DESC`,
      [userId]
    );

    const restaurants: SavedRestaurant[] = result.rows.map((row: any) => ({
      id: row.restaurant_id || row.id,
      userId: row.user_id,
      name: row.name,
      address: row.address,
      lat: row.lat,
      lng: row.lng,
      styles: row.styles || [],
      categories: row.categories || [],
      rating: row.rating,
      priceLevel: row.price_level,
      savedAt: row.saved_at,
      savedFromPostId: row.saved_from_post_id,
      isSaved: true,
    }));

    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// POST /api/restaurants/save - Save a restaurant (legacy path, now uses restaurant_id for idempotency)
router.post('/save', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { restaurantId, name, address, lat, lng, styles, categories, rating, priceLevel, savedFromPostId, id: legacyId } = req.body;

    const stableRestaurantId = restaurantId || legacyId || name;

    if (!name || !address || !stableRestaurantId) {
      return res.status(400).json({ error: 'restaurantId, name, and address are required' });
    }

    // Check if already saved by this user with same restaurant_id
    const existing = await query(
      'SELECT id, restaurant_id FROM saved_restaurants WHERE user_id = $1 AND restaurant_id = $2',
      [userId, stableRestaurantId]
    );

    if (existing.rows.length > 0) {
      return res.json({ message: 'Restaurant already saved', id: existing.rows[0].restaurant_id });
    }

    const id = uuidv4();

    await query(
      `INSERT INTO saved_restaurants (
        id, user_id, restaurant_id, name, address, lat, lng, styles, categories, rating, price_level, saved_from_post_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [id, userId, stableRestaurantId, name, address, lat, lng, styles || [], categories || [], rating, priceLevel, savedFromPostId]
    );

    res.status(201).json({ message: 'Restaurant saved successfully', id: stableRestaurantId });
  } catch (error) {
    console.error('Error saving restaurant:', error);
    res.status(500).json({ error: 'Failed to save restaurant' });
  }
});

// DELETE /api/restaurants/:restaurantId - Unsave a restaurant
router.delete('/:restaurantId', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { restaurantId } = req.params;

    const result = await query(
      'DELETE FROM saved_restaurants WHERE restaurant_id = $1 AND user_id = $2',
      [restaurantId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Restaurant not found or not owned by user' });
    }

    res.json({ message: 'Restaurant unsaved successfully' });
  } catch (error) {
    console.error('Error unsaving restaurant:', error);
    res.status(500).json({ error: 'Failed to unsave restaurant' });
  }
});

export default router;
