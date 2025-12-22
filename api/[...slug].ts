// Vercel serverless function handler with catch-all route
// This handles all /api/* routes through the Express app
import app from '../backend/src/server';

export default function handler(req: any, res: any) {
  // Vercel passes the full request/response objects
  // Express app can handle them directly
  return app(req, res);
}

