import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export interface AuthRequest extends Request {
  userId?: string;
}

/**
 * Middleware to require authentication
 * Extracts user ID from JWT token and adds it to request
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization required' });
    }

    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      (req as any).userId = decoded.userId;
      next();
    } catch (jwtError) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Authentication error' });
  }
};

/**
 * Optional auth middleware - extracts user ID if token is present but doesn't require it
 */
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        (req as any).userId = decoded.userId;
      } catch (jwtError) {
        // Token invalid, but that's okay for optional auth
        console.log('Optional auth: invalid token, continuing without user');
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};

/**
 * Extract user ID from request headers (x-user-id) or JWT token
 * Used for endpoints that accept both header-based and token-based auth
 */
export const extractUserId = (req: Request, res: Response, next: NextFunction) => {
  // First check x-user-id header (for internal/testing)
  const headerUserId = req.headers['x-user-id'] as string;
  if (headerUserId) {
    (req as any).userId = headerUserId;
    return next();
  }

  // Then check JWT token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      (req as any).userId = decoded.userId;
    } catch (jwtError) {
      // Invalid token, continue without user
    }
  }
  
  next();
};



