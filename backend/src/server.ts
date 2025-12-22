// Local development server entry point
// For Vercel serverless, use backend/src/app.ts instead
import app from './app';

const PORT = Number(process.env.PORT ?? 5000);

// Only start server in local development (not in Vercel)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

