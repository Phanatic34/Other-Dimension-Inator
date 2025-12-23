import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { query, isDatabaseAvailable } from '../db/database';

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

// Normalize restaurant payload
const buildRestaurantRecord = (row: any) => ({
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
});

// GET /api/favorites - Get current user's favorites
router.get('/', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    const result = await query(
      `SELECT id, user_id, restaurant_id, name, address, lat, lng, styles, categories, rating, price_level, saved_from_post_id, saved_at
       FROM saved_restaurants
       WHERE user_id = $1
       ORDER BY saved_at DESC`,
      [userId]
    );

    res.json(result.rows.map(buildRestaurantRecord));
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// POST /api/favorites/:restaurantId - Add favorite (idempotent)
router.post('/:restaurantId', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { restaurantId } = req.params;
    const { name, address, lat, lng, styles, categories, rating, priceLevel, savedFromPostId } = req.body || {};

    if (!restaurantId || !name || !address || lat == null || lng == null) {
      return res.status(400).json({ error: 'restaurantId, name, address, lat, and lng are required' });
    }

    // Idempotent check
    const existing = await query(
      'SELECT id, restaurant_id FROM saved_restaurants WHERE user_id = $1 AND restaurant_id = $2',
      [userId, restaurantId]
    );

    if (existing.rows.length > 0) {
      return res.json({ message: 'Restaurant already favorited', id: existing.rows[0].restaurant_id });
    }

    const id = uuidv4();

    await query(
      `INSERT INTO saved_restaurants (
        id, user_id, restaurant_id, name, address, lat, lng, styles, categories, rating, price_level, saved_from_post_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [id, userId, restaurantId, name, address, lat, lng, styles || [], categories || [], rating, priceLevel, savedFromPostId]
    );

    res.status(201).json({ message: 'Restaurant favorited', id: restaurantId });
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

// DELETE /api/favorites/:restaurantId - Remove favorite (idempotent)
router.delete('/:restaurantId', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { restaurantId } = req.params;

    const result = await query(
      'DELETE FROM saved_restaurants WHERE user_id = $1 AND restaurant_id = $2',
      [userId, restaurantId]
    );

    if (result.rowCount === 0) {
      return res.json({ message: 'Already removed or not found' });
    }

    res.json({ message: 'Restaurant unfavorited' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

export default router;

