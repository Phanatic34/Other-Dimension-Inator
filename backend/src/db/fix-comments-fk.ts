// Fix comments foreign key constraint
import dotenv from 'dotenv';
dotenv.config();

import { query, closePool } from './database';

async function fix() {
  console.log('Fixing comments foreign key constraint...');

  try {
    // Drop the foreign key constraint that only allows review posts
    await query('ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_post_id_fkey');
    console.log('✓ Dropped old constraint');

    console.log('✅ Fix completed!');
  } catch (error) {
    console.error('❌ Fix failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

fix();




