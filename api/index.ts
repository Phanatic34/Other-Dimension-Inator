// Vercel serverless function handler
// This handles all /api/* routes through the Express app
// Vercel automatically provides @vercel/node types at runtime
import app from '../backend/src/server';

export default function handler(req: any, res: any) {
  // Vercel passes the full request/response objects
  // Express app can handle them directly
  return app(req, res);
}

