// PostgreSQL database connection using NeonDB
import { Pool } from 'pg';

// Check if DATABASE_URL is configured
const isDatabaseConfigured = !!process.env.DATABASE_URL;

if (!isDatabaseConfigured) {
  console.warn('⚠️  DATABASE_URL not configured. Database features will be disabled.');
  console.warn('   Please set DATABASE_URL in backend/.env file.');
  console.warn('   See docs/NEONDB_SETUP_GUIDE.md for setup instructions.');
}

// Create connection pool only if DATABASE_URL is configured
const pool = isDatabaseConfigured
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes('neon.tech')
        ? { rejectUnauthorized: false }
        : false, // Disable SSL for local PostgreSQL
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  : null;

// Test connection only if pool exists
if (pool) {
  pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
  });

  pool.on('error', (err) => {
    console.error('❌ PostgreSQL connection error:', err);
  });
}

// Helper function to execute queries
export async function query(text: string, params?: any[]) {
  if (!pool) {
    throw new Error('Database not configured. Please set DATABASE_URL in .env file.');
  }
  
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('Executed query', { text: text.substring(0, 50), duration, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

// Helper function to get a client from the pool
export function getClient() {
  if (!pool) {
    throw new Error('Database not configured. Please set DATABASE_URL in .env file.');
  }
  return pool.connect();
}

// Check if database is available
export function isDatabaseAvailable(): boolean {
  return isDatabaseConfigured && pool !== null;
}

// Close pool (for cleanup)
export async function closePool() {
  if (pool) {
    await pool.end();
  }
}

export default pool;
