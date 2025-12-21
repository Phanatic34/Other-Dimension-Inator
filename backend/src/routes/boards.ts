import { Router, Request, Response } from 'express';
import { query, isDatabaseAvailable } from '../db/database';
import { Board } from '../types/models';

const router = Router();

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

// GET /api/boards - Get all boards
router.get('/', requireDatabase, async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM boards ORDER BY name');
    // Format the response to match frontend expectations
    const boards: Board[] = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      label: row.label,
      category: row.category,
    }));
    res.json(boards);
  } catch (error) {
    console.error('Error fetching boards:', error);
    res.status(500).json({ error: 'Failed to fetch boards' });
  }
});

// GET /api/boards/:id - Get single board
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM boards WHERE id = $1', [req.params.id]);
    const board = result.rows[0] as Board | undefined;
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }
    res.json(board);
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ error: 'Failed to fetch board' });
  }
});

export default router;

