// Database migration script
// Run this to initialize your database schema
import { query, closePool } from './database';
import fs from 'fs';
import path from 'path';

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf-8');

async function migrate() {
  console.log('Running database migrations...');

  try {
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await query(statement);
          console.log('✓ Executed:', statement.substring(0, 50) + '...');
        } catch (error: any) {
          // Ignore "already exists" errors
          if (error.message && error.message.includes('already exists')) {
            console.log('⊘ Skipped (already exists):', statement.substring(0, 50) + '...');
          } else {
            console.error('✗ Error executing statement:', statement.substring(0, 100));
            console.error(error);
            throw error;
          }
        }
      }
    }

    console.log('✅ Database migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

// Run if called directly
if (require.main === module) {
  migrate();
}

export default migrate;



