-- =====================================================
-- NeonDB Setup Script for Rendezvous
-- Copy and paste this entire script into NeonDB SQL Editor
-- =====================================================

-- 1. Boards table
CREATE TABLE IF NOT EXISTS boards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('cuisine', 'type')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 2. Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  handle TEXT NOT NULL UNIQUE,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  password_hash TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  bio TEXT,
  favorite_styles TEXT[],
  favorite_categories TEXT[],
  joined_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 3. Review Posts table (THIS IS THE MAIN POSTS TABLE)
CREATE TABLE IF NOT EXISTS review_posts (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL,
  restaurant_name TEXT NOT NULL,
  restaurant_address TEXT,
  restaurant_lat DOUBLE PRECISION,
  restaurant_lng DOUBLE PRECISION,
  location_area TEXT,
  board_id TEXT NOT NULL,
  style_type TEXT,
  food_type TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating DOUBLE PRECISION NOT NULL CHECK(rating >= 0 AND rating <= 5),
  price_level TEXT NOT NULL CHECK(price_level IN ('$', '$$', '$$$')),
  price_min INTEGER,
  price_max INTEGER,
  visibility TEXT NOT NULL DEFAULT 'PUBLIC' CHECK(visibility IN ('PUBLIC', 'FOLLOWERS')),
  like_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  share_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES boards(id)
);

-- 4. Meetup Posts table
CREATE TABLE IF NOT EXISTS meetup_posts (
  id TEXT PRIMARY KEY,
  author_id TEXT NOT NULL,
  restaurant_name TEXT NOT NULL,
  location_text TEXT NOT NULL,
  address TEXT,
  meetup_time TIMESTAMP WITH TIME ZONE NOT NULL,
  food_tags TEXT[] NOT NULL,
  max_headcount INTEGER NOT NULL,
  current_headcount INTEGER NOT NULL DEFAULT 1,
  budget_description TEXT NOT NULL,
  has_reservation BOOLEAN NOT NULL DEFAULT FALSE,
  description TEXT NOT NULL,
  visibility TEXT NOT NULL DEFAULT 'PUBLIC' CHECK(visibility IN ('PUBLIC', 'FOLLOWERS')),
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'OPEN' CHECK(status IN ('OPEN', 'CLOSED')),
  board_id TEXT,
  location_area TEXT,
  like_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (board_id) REFERENCES boards(id)
);

-- 5. Post Images table
CREATE TABLE IF NOT EXISTS post_images (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 6. Comments table
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'review' CHECK(post_type IN ('review', 'meetup')),
  author_id TEXT NOT NULL,
  parent_id TEXT,
  content TEXT NOT NULL,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- 7. Comment likes table
CREATE TABLE IF NOT EXISTS comment_likes (
  id TEXT PRIMARY KEY,
  comment_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(comment_id, user_id),
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 8. Likes table (for review posts)
CREATE TABLE IF NOT EXISTS likes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES review_posts(id) ON DELETE CASCADE
);

-- 9. Meetup Likes table
CREATE TABLE IF NOT EXISTS meetup_likes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES meetup_posts(id) ON DELETE CASCADE
);

-- 10. Follows table
CREATE TABLE IF NOT EXISTS follows (
  id TEXT PRIMARY KEY,
  follower_id TEXT NOT NULL,
  following_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(follower_id, following_id),
  CHECK(follower_id != following_id),
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 11. Saved Restaurants table
CREATE TABLE IF NOT EXISTS saved_restaurants (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  styles TEXT[],
  categories TEXT[],
  rating DOUBLE PRECISION,
  price_level TEXT CHECK(price_level IN ('$', '$$', '$$$')),
  saved_from_post_id TEXT,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 12. Saved Posts table
CREATE TABLE IF NOT EXISTS saved_posts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  post_type TEXT NOT NULL CHECK(post_type IN ('review', 'meetup')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, post_id, post_type),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 13. Reported Posts table
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

-- =====================================================
-- INDEXES for better performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_review_posts_author ON review_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_review_posts_board ON review_posts(board_id);
CREATE INDEX IF NOT EXISTS idx_review_posts_created ON review_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_meetup_posts_author ON meetup_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_meetup_posts_board ON meetup_posts(board_id);
CREATE INDEX IF NOT EXISTS idx_meetup_posts_created ON meetup_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_images_post ON post_images(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_post ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_meetup_likes_post ON meetup_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_meetup_likes_user ON meetup_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_saved_restaurants_user ON saved_restaurants(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_posts_user ON saved_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_reported_posts_status ON reported_posts(status);

-- =====================================================
-- SEED DATA - Initial boards and test user
-- =====================================================

-- Insert default boards (if not exists)
INSERT INTO boards (id, name, label, category) VALUES
  ('board-japanese', 'japanese', '日式料理', 'cuisine'),
  ('board-taiwanese', 'taiwanese', '台灣小吃', 'cuisine'),
  ('board-western', 'western', '西式料理', 'cuisine'),
  ('board-korean', 'korean', '韓式料理', 'cuisine'),
  ('board-chinese', 'chinese', '中式料理', 'cuisine'),
  ('board-thai', 'thai', '泰式料理', 'cuisine'),
  ('board-italian', 'italian', '義式料理', 'cuisine'),
  ('board-fastfood', 'fastfood', '速食', 'type'),
  ('board-dessert', 'dessert', '甜點', 'type'),
  ('board-cafe', 'cafe', '咖啡廳', 'type'),
  ('board-brunch', 'brunch', '早午餐', 'type'),
  ('board-hotpot', 'hotpot', '火鍋', 'type'),
  ('board-bbq', 'bbq', '燒烤', 'type'),
  ('board-seafood', 'seafood', '海鮮', 'type'),
  ('board-vegetarian', 'vegetarian', '素食', 'type')
ON CONFLICT (id) DO NOTHING;

-- Insert a test user (password: password123)
INSERT INTO users (id, display_name, handle, username, email, password_hash, avatar_url, bio) VALUES
  ('user-test-1', 'Test User', 'testuser', 'testuser', 'test@example.com', '$2a$10$rBV2JM5VnJgY6s6kG5lXz.q5Z5F5Z5F5Z5F5Z5F5Z5F5Z5F5Z5F5Z', 'https://api.dicebear.com/7.x/avataaars/svg?seed=testuser', 'This is a test user account')
ON CONFLICT (id) DO NOTHING;

-- Insert sample review posts (with realistic counts starting at 0)
INSERT INTO review_posts (id, author_id, restaurant_name, restaurant_address, restaurant_lat, restaurant_lng, location_area, board_id, style_type, food_type, title, content, rating, price_level, visibility, like_count, comment_count, share_count) VALUES
  ('post-sample-1', 'user-test-1', '鼎泰豐', '台北市信義區信義路二段194號', 25.0330, 121.5654, 'Xinyi', 'board-taiwanese', 'taiwanese', 'dumplings', '小籠包超好吃！', '來台北一定要吃的小籠包，皮薄餡多汁，太好吃了！ #鼎泰豐 #小籠包 #台北美食', 4.8, '$$', 'PUBLIC', 0, 0, 0),
  ('post-sample-2', 'user-test-1', '一蘭拉麵', '台北市信義區松壽路12號', 25.0360, 121.5680, 'Xinyi', 'board-japanese', 'japanese', 'ramen', '一個人吃拉麵的好地方', '湯頭濃郁，麵條Q彈，調味可以自己選，超推薦！ #一蘭拉麵 #日式拉麵 #台北', 4.5, '$$', 'PUBLIC', 0, 0, 0),
  ('post-sample-3', 'user-test-1', 'Starbucks Reserve', '台北市大安區敦化南路一段187號', 25.0420, 121.5490, 'Da''an', 'board-cafe', 'western', 'coffee', '超美的星巴克臻選', '環境超美，咖啡也很好喝，適合約會或工作 #星巴克 #咖啡廳 #大安區', 4.3, '$$', 'PUBLIC', 0, 0, 0)
ON CONFLICT (id) DO NOTHING;

-- Insert sample post images
INSERT INTO post_images (id, post_id, image_url, image_order) VALUES
  ('img-1', 'post-sample-1', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800', 0),
  ('img-2', 'post-sample-2', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', 0),
  ('img-3', 'post-sample-3', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', 0)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- RESET ALL COUNTS TO REAL VALUES
-- This ensures like_count and comment_count match actual data
-- =====================================================

-- Reset review posts like counts to actual values
UPDATE review_posts SET like_count = (
  SELECT COUNT(*) FROM likes WHERE likes.post_id = review_posts.id
);

-- Reset review posts comment counts to actual values
UPDATE review_posts SET comment_count = (
  SELECT COUNT(*) FROM comments WHERE comments.post_id = review_posts.id AND comments.post_type = 'review'
);

-- Reset meetup posts like counts to actual values
UPDATE meetup_posts SET like_count = (
  SELECT COUNT(*) FROM meetup_likes WHERE meetup_likes.post_id = meetup_posts.id
);

-- Reset meetup posts comment counts to actual values
UPDATE meetup_posts SET comment_count = (
  SELECT COUNT(*) FROM comments WHERE comments.post_id = meetup_posts.id AND comments.post_type = 'meetup'
);

-- =====================================================
-- DONE! Your database is now set up.
-- =====================================================
SELECT 'Database setup completed successfully!' as status;

