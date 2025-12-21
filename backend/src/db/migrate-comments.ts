// Migration script to update comments table
import dotenv from 'dotenv';
dotenv.config();

import { query, closePool } from './database';

async function migrate() {
  console.log('Running comments migration...');

  try {
    // Add post_type column if not exists
    await query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name = 'comments' AND column_name = 'post_type') THEN
          ALTER TABLE comments ADD COLUMN post_type TEXT NOT NULL DEFAULT 'review';
        END IF;
      END $$;
    `);
    console.log('✓ Added post_type column');

    // Add parent_id column if not exists
    await query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name = 'comments' AND column_name = 'parent_id') THEN
          ALTER TABLE comments ADD COLUMN parent_id TEXT;
        END IF;
      END $$;
    `);
    console.log('✓ Added parent_id column');

    // Add like_count column if not exists
    await query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                       WHERE table_name = 'comments' AND column_name = 'like_count') THEN
          ALTER TABLE comments ADD COLUMN like_count INTEGER NOT NULL DEFAULT 0;
        END IF;
      END $$;
    `);
    console.log('✓ Added like_count column');

    // Create comment_likes table if not exists
    await query(`
      CREATE TABLE IF NOT EXISTS comment_likes (
        id TEXT PRIMARY KEY,
        comment_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        UNIQUE(comment_id, user_id),
        FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('✓ Created comment_likes table');

    // Create index on comments
    await query('CREATE INDEX IF NOT EXISTS idx_comments_post_type ON comments(post_id, post_type)');
    await query('CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_comment_likes_comment ON comment_likes(comment_id)');
    console.log('✓ Created indexes');

    console.log('✅ Migration completed!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

migrate();

