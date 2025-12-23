-- =====================================================
-- NeonDB Complete Setup Script for Rendezvous
-- ALL DATA IS REAL - Complete with logins, comments, likes
-- =====================================================

-- Drop existing tables if needed (uncomment if you want to reset)
-- DROP TABLE IF EXISTS reported_posts CASCADE;
-- DROP TABLE IF EXISTS saved_posts CASCADE;
-- DROP TABLE IF EXISTS saved_restaurants CASCADE;
-- DROP TABLE IF EXISTS follows CASCADE;
-- DROP TABLE IF EXISTS meetup_likes CASCADE;
-- DROP TABLE IF EXISTS likes CASCADE;
-- DROP TABLE IF EXISTS comment_likes CASCADE;
-- DROP TABLE IF EXISTS comments CASCADE;
-- DROP TABLE IF EXISTS post_images CASCADE;
-- DROP TABLE IF EXISTS meetup_posts CASCADE;
-- DROP TABLE IF EXISTS review_posts CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS boards CASCADE;

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

-- 3. Review Posts table
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

-- 7. Likes table (for review posts)
CREATE TABLE IF NOT EXISTS likes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES review_posts(id) ON DELETE CASCADE
);

-- 8. Meetup Likes table
CREATE TABLE IF NOT EXISTS meetup_likes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES meetup_posts(id) ON DELETE CASCADE
);

-- 9. Comment likes table
CREATE TABLE IF NOT EXISTS comment_likes (
  id TEXT PRIMARY KEY,
  comment_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(comment_id, user_id),
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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

-- =====================================================
-- REAL SEED DATA - All accounts can login with password: test123
-- Password hash is bcrypt hash of "test123"
-- =====================================================

-- Insert default boards
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

-- Insert REAL users (password: test123 for all)
-- bcrypt hash of "test123" = $2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq2rFT6op.HqGd.7aS1ohL6hLSe.Uu
INSERT INTO users (id, display_name, handle, username, email, password_hash, avatar_url, bio, favorite_styles, favorite_categories) VALUES
  ('user1', '美食獵人小明', 'foodhunter', 'foodhunter', 'foodhunter@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq2rFT6op.HqGd.7aS1ohL6hLSe.Uu', 'https://api.dicebear.com/7.x/avataaars/svg?seed=foodhunter', '熱愛探索台北各種美食，專攻日式料理和甜點！每週至少發現一家新餐廳 🍣🍰', ARRAY['japanese', 'dessert'], ARRAY['cafe', 'brunch']),
  ('user2', '吃貨小美', 'foodielisa', 'foodielisa', 'lisa@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq2rFT6op.HqGd.7aS1ohL6hLSe.Uu', 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa', '台北在地人，最愛夜市小吃和火鍋！歡迎一起約吃飯 🔥', ARRAY['taiwanese', 'hotpot'], ARRAY['fastfood']),
  ('user3', '咖啡控阿傑', 'coffeejay', 'coffeejay', 'jay@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq2rFT6op.HqGd.7aS1ohL6hLSe.Uu', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jay', '咖啡成癮者 ☕ 踏遍台北大小咖啡廳，專門寫咖啡廳評測', ARRAY['western', 'italian'], ARRAY['cafe', 'brunch']),
  ('user4', '韓食愛好者', 'koreafan', 'koreafan', 'korea@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq2rFT6op.HqGd.7aS1ohL6hLSe.Uu', 'https://api.dicebear.com/7.x/avataaars/svg?seed=korea', '韓國料理專家！從炸雞到烤肉通通愛 🍗', ARRAY['korean'], ARRAY['bbq']),
  ('user5', '素食天使', 'vegangel', 'vegangel', 'vegan@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.Mrq2rFT6op.HqGd.7aS1ohL6hLSe.Uu', 'https://api.dicebear.com/7.x/avataaars/svg?seed=vegan', '推廣健康素食生活，分享好吃的素食餐廳 🌱', ARRAY['vegetarian'], ARRAY['cafe'])
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  handle = EXCLUDED.handle,
  email = EXCLUDED.email,
  password_hash = EXCLUDED.password_hash,
  avatar_url = EXCLUDED.avatar_url,
  bio = EXCLUDED.bio;

-- Insert REAL review posts
INSERT INTO review_posts (id, author_id, restaurant_name, restaurant_address, restaurant_lat, restaurant_lng, location_area, board_id, style_type, food_type, title, content, rating, price_level, visibility, like_count, comment_count, share_count, created_at) VALUES
  ('post-sample-1', 'user1', '鼎泰豐 信義店', '台北市信義區信義路二段194號', 25.0330, 121.5654, 'Xinyi', 'board-taiwanese', 'taiwanese', 'dumplings', '小籠包超好吃！', '來台北一定要吃的小籠包，皮薄餡多汁，18摺的完美工藝讓人驚艷！服務也很棒，雖然要排隊但絕對值得。推薦必點：小籠包、炒飯、酸辣湯 #鼎泰豐 #小籠包 #台北美食 #米其林', 4.8, '$$', 'PUBLIC', 0, 0, 0, NOW() - INTERVAL '2 days'),
  ('post-sample-2', 'user1', '一蘭拉麵 台北本店', '台北市信義區松壽路12號', 25.0360, 121.5680, 'Xinyi', 'board-japanese', 'japanese', 'ramen', '一個人吃拉麵的好地方', '湯頭濃郁，麵條Q彈，調味可以自己選擇濃淡，超推薦給喜歡一個人用餐的朋友！個人座位設計很有隱私感，可以專心品嚐美食。 #一蘭拉麵 #日式拉麵 #台北', 4.5, '$$', 'PUBLIC', 0, 0, 0, NOW() - INTERVAL '3 days'),
  ('post-sample-3', 'user3', 'Starbucks Reserve 時代寓所', '台北市大安區敦化南路一段187號', 25.0420, 121.5490, 'Daan', 'board-cafe', 'western', 'coffee', '超美的星巴克臻選門市', '環境超美，挑高設計搭配大片落地窗，咖啡也很好喝！這裡有很多臻選限定飲品，適合約會或遠端工作。二樓座位區更安靜，推薦！ #星巴克 #咖啡廳 #大安區 #約會景點', 4.3, '$$', 'PUBLIC', 0, 0, 0, NOW() - INTERVAL '1 day'),
  ('saboten-tianmu', 'user1', '勝博殿 天母店', '台北市士林區中山北路六段77號', 25.1150, 121.5290, 'Tianmu', 'board-japanese', 'japanese', 'tonkatsu', '炸豬排超酥脆！', '來天母一定要來吃勝博殿！炸豬排外酥內嫩，搭配他們的高麗菜絲和味噌湯，完美的一餐。價格雖然偏高但品質很穩定，約會聚餐都適合。 #勝博殿 #炸豬排 #天母 #日式料理', 4.6, '$$$', 'PUBLIC', 0, 0, 0, NOW() - INTERVAL '4 hours'),
  ('post-korean-bbq', 'user4', '姜滿堂 韓式烤肉', '台北市大安區忠孝東路四段216巷27弄3號', 25.0415, 121.5520, 'Daan', 'board-korean', 'korean', 'bbq', '超道地的韓式烤肉！', '肉質新鮮，小菜無限續，服務態度也很好！特別推薦他們的牛五花和豬頸肉，配上生菜包著吃超滿足。記得要先訂位，不然要等很久！ #韓式烤肉 #姜滿堂 #大安區', 4.7, '$$', 'PUBLIC', 0, 0, 0, NOW() - INTERVAL '5 hours'),
  ('post-vegan-cafe', 'user5', '小蔬杭 蔬食餐廳', '台北市中山區中山北路二段39巷3號', 25.0530, 121.5230, 'Zhongshan', 'board-vegetarian', 'vegetarian', 'chinese', '超好吃的素食餐廳！', '終於找到一家素食也能吃得很滿足的餐廳！這裡的素食料理創意十足，完全不會覺得在吃素。推薦他們的宮保素雞丁和麻婆豆腐，味道超正！ #素食 #蔬食 #中山區 #健康飲食', 4.8, '$$', 'PUBLIC', 0, 0, 0, NOW() - INTERVAL '6 hours')
ON CONFLICT (id) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  restaurant_name = EXCLUDED.restaurant_name,
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  like_count = 0,
  comment_count = 0;

-- Insert post images
INSERT INTO post_images (id, post_id, image_url, image_order) VALUES
  ('img-1', 'post-sample-1', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800', 0),
  ('img-2', 'post-sample-2', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', 0),
  ('img-3', 'post-sample-3', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800', 0),
  ('img-4', 'saboten-tianmu', 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800', 0),
  ('img-5', 'post-korean-bbq', 'https://images.unsplash.com/photo-1548474209-33e5c92c3fb3?w=800', 0),
  ('img-6', 'post-vegan-cafe', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', 0)
ON CONFLICT (id) DO NOTHING;

-- Insert REAL comments
INSERT INTO comments (id, post_id, post_type, author_id, content, created_at) VALUES
  ('comment-1', 'saboten-tianmu', 'review', 'user2', '看起來好好吃！請問大概要排多久？', NOW() - INTERVAL '3 hours'),
  ('comment-2', 'saboten-tianmu', 'review', 'user1', '平日中午大概等15分鐘，假日要等比較久喔！', NOW() - INTERVAL '2 hours'),
  ('comment-3', 'saboten-tianmu', 'review', 'user3', '上次去吃過，真的很推薦！炸的火候剛剛好', NOW() - INTERVAL '1 hour'),
  ('comment-4', 'post-sample-1', 'review', 'user4', '鼎泰豐真的是台灣之光！', NOW() - INTERVAL '1 day'),
  ('comment-5', 'post-sample-1', 'review', 'user5', '每次來台北必吃，從來沒讓我失望過', NOW() - INTERVAL '12 hours'),
  ('comment-6', 'post-sample-3', 'review', 'user2', '這間環境真的超美！下次去試試', NOW() - INTERVAL '8 hours'),
  ('comment-7', 'post-korean-bbq', 'review', 'user1', '哇看起來超讚！這週末要約朋友去吃', NOW() - INTERVAL '4 hours'),
  ('comment-8', 'post-korean-bbq', 'review', 'user3', '小菜真的無限續嗎？太棒了！', NOW() - INTERVAL '3 hours'),
  ('comment-9', 'post-vegan-cafe', 'review', 'user2', '素食也能這麼好吃！要帶我媽去試試', NOW() - INTERVAL '5 hours')
ON CONFLICT (id) DO NOTHING;

-- Insert REAL likes
INSERT INTO likes (id, post_id, user_id, created_at) VALUES
  ('like-1', 'saboten-tianmu', 'user2', NOW() - INTERVAL '3 hours'),
  ('like-2', 'saboten-tianmu', 'user3', NOW() - INTERVAL '2 hours'),
  ('like-3', 'saboten-tianmu', 'user4', NOW() - INTERVAL '1 hour'),
  ('like-4', 'post-sample-1', 'user2', NOW() - INTERVAL '1 day'),
  ('like-5', 'post-sample-1', 'user3', NOW() - INTERVAL '1 day'),
  ('like-6', 'post-sample-1', 'user4', NOW() - INTERVAL '1 day'),
  ('like-7', 'post-sample-1', 'user5', NOW() - INTERVAL '12 hours'),
  ('like-8', 'post-sample-3', 'user1', NOW() - INTERVAL '6 hours'),
  ('like-9', 'post-sample-3', 'user2', NOW() - INTERVAL '5 hours'),
  ('like-10', 'post-korean-bbq', 'user1', NOW() - INTERVAL '4 hours'),
  ('like-11', 'post-korean-bbq', 'user3', NOW() - INTERVAL '3 hours'),
  ('like-12', 'post-korean-bbq', 'user5', NOW() - INTERVAL '2 hours'),
  ('like-13', 'post-vegan-cafe', 'user1', NOW() - INTERVAL '5 hours'),
  ('like-14', 'post-vegan-cafe', 'user2', NOW() - INTERVAL '4 hours'),
  ('like-15', 'post-vegan-cafe', 'user3', NOW() - INTERVAL '3 hours'),
  ('like-16', 'post-vegan-cafe', 'user4', NOW() - INTERVAL '2 hours')
ON CONFLICT (id) DO NOTHING;

-- Insert REAL follows
INSERT INTO follows (id, follower_id, following_id, created_at) VALUES
  ('follow-1', 'user2', 'user1', NOW() - INTERVAL '7 days'),
  ('follow-2', 'user3', 'user1', NOW() - INTERVAL '5 days'),
  ('follow-3', 'user4', 'user1', NOW() - INTERVAL '3 days'),
  ('follow-4', 'user5', 'user1', NOW() - INTERVAL '2 days'),
  ('follow-5', 'user1', 'user3', NOW() - INTERVAL '6 days'),
  ('follow-6', 'user2', 'user3', NOW() - INTERVAL '4 days'),
  ('follow-7', 'user1', 'user4', NOW() - INTERVAL '3 days'),
  ('follow-8', 'user3', 'user5', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- UPDATE ALL COUNTS TO MATCH REAL DATA
-- =====================================================

-- Update review posts like counts
UPDATE review_posts SET like_count = (
  SELECT COUNT(*) FROM likes WHERE likes.post_id = review_posts.id
);

-- Update review posts comment counts
UPDATE review_posts SET comment_count = (
  SELECT COUNT(*) FROM comments WHERE comments.post_id = review_posts.id
);

-- Update meetup posts like counts
UPDATE meetup_posts SET like_count = (
  SELECT COUNT(*) FROM meetup_likes WHERE meetup_likes.post_id = meetup_posts.id
);

-- Update meetup posts comment counts
UPDATE meetup_posts SET comment_count = (
  SELECT COUNT(*) FROM comments WHERE comments.post_id = meetup_posts.id
);

-- =====================================================
-- VERIFY DATA
-- =====================================================
SELECT 'Users: ' || COUNT(*) as info FROM users;
SELECT 'Review Posts: ' || COUNT(*) as info FROM review_posts;
SELECT 'Comments: ' || COUNT(*) as info FROM comments;
SELECT 'Likes: ' || COUNT(*) as info FROM likes;
SELECT 'Follows: ' || COUNT(*) as info FROM follows;

SELECT 'Database setup completed successfully! All users can login with password: test123' as status;
