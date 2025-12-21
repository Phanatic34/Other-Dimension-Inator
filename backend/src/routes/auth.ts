import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { query, isDatabaseAvailable } from '../db/database';

const router = Router();

// Middleware to check if database is available
const requireDatabase = (req: Request, res: Response, next: Function) => {
  if (!isDatabaseAvailable()) {
    return res.status(503).json({ 
      error: 'Database not configured. Please set DATABASE_URL in backend/.env file.',
      hint: 'See docs/NEONDB_SETUP_GUIDE.md for setup instructions.'
    });
  }
  next();
};

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Generate JWT token
const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Verify JWT token
const verifyToken = (token: string): { userId: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch {
    return null;
  }
};

// Register new user
router.post('/register', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { email, password, displayName, handle } = req.body;

    // Validate input
    if (!email || !password || !displayName || !handle) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if email already exists
    const existingEmail = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existingEmail.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Check if handle already exists
    const existingHandle = await query('SELECT id FROM users WHERE handle = $1', [handle.toLowerCase()]);
    if (existingHandle.rows.length > 0) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const userId = uuidv4();
    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=722F37&color=fff`;
    
    await query(
      `INSERT INTO users (id, email, password_hash, display_name, handle, avatar_url, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [userId, email.toLowerCase(), passwordHash, displayName, handle.toLowerCase(), defaultAvatar]
    );

    // Generate token
    const token = generateToken(userId);

    // Return user data (without password)
    res.status(201).json({
      token,
      user: {
        id: userId,
        email: email.toLowerCase(),
        displayName,
        handle: handle.toLowerCase(),
        avatarUrl: defaultAvatar,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const result = await query(
      'SELECT id, email, password_hash, display_name, handle, avatar_url FROM users WHERE email = $1',
      [email.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user.id);

    // Return user data
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        handle: user.handle,
        avatarUrl: user.avatar_url,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user (verify token)
router.get('/me', requireDatabase, async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Get user data
    const result = await query(
      'SELECT id, email, display_name, handle, avatar_url FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    res.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.display_name,
        handle: user.handle,
        avatarUrl: user.avatar_url,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user' });
  }
});

export default router;

