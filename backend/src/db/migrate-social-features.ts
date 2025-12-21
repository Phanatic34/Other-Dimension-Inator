// Migration script to add social features: saved posts, reports, archive
import { query, closePool, isDatabaseAvailable } from './database';

async function runMigration() {
  if (!isDatabaseAvailable()) {
    console.error('❌ Database not configured. Please set DATABASE_URL in .env file.');
    process.exit(1);
  }

  console.log('Running social features migration...');
  
  try {
    // Add is_archived column to review_posts
    await query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='review_posts' AND column_name='is_archived') THEN
          ALTER TABLE review_posts ADD COLUMN is_archived BOOLEAN NOT NULL DEFAULT FALSE;
        END IF;
      END
      $$;
    `);
    console.log('✓ Added is_archived column to review_posts');

    // Add is_archived column to meetup_posts
    await query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='meetup_posts' AND column_name='is_archived') THEN
          ALTER TABLE meetup_posts ADD COLUMN is_archived BOOLEAN NOT NULL DEFAULT FALSE;
        END IF;
      END
      $$;
    `);
    console.log('✓ Added is_archived column to meetup_posts');

    // Create saved_posts table
    await query(`
      CREATE TABLE IF NOT EXISTS saved_posts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        post_type TEXT NOT NULL CHECK(post_type IN ('review', 'meetup')),
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        UNIQUE(user_id, post_id, post_type),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('✓ Created saved_posts table');

    // Create reported_posts table
    await query(`
      CREATE TABLE IF NOT EXISTS reported_posts (
        id TEXT PRIMARY KEY,
        reporter_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        post_type TEXT NOT NULL CHECK(post_type IN ('review', 'meetup')),
        reason TEXT NOT NULL CHECK(reason IN ('spam', 'harassment', 'inappropriate', 'misinformation', 'other')),
        description TEXT,
        status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        reviewed_at TIMESTAMP WITH TIME ZONE,
        FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('✓ Created reported_posts table');

    // Create indexes
    await query('CREATE INDEX IF NOT EXISTS idx_saved_posts_user ON saved_posts(user_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_saved_posts_post ON saved_posts(post_id, post_type)');
    await query('CREATE INDEX IF NOT EXISTS idx_reported_posts_status ON reported_posts(status)');
    await query('CREATE INDEX IF NOT EXISTS idx_review_posts_archived ON review_posts(is_archived)');
    await query('CREATE INDEX IF NOT EXISTS idx_meetup_posts_archived ON meetup_posts(is_archived)');
    console.log('✓ Created indexes');

    console.log('✅ Social features migration completed!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

// Run if called directly
if (require.main === module) {
  runMigration();
}

export { runMigration };


