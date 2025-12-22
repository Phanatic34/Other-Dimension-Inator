// Vercel serverless function handler with catch-all route
// This handles all /api/* routes through the Express app
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../backend/src/app';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Vercel passes the full request/response objects
  // Express app can handle them directly
  return app(req, res);
}

