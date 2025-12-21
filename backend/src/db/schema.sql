-- PostgreSQL Schema for Rendezvous (NeonDB)
-- Run this script to initialize your database

-- Boards table
CREATE TABLE IF NOT EXISTS boards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  category TEXT NOT NULL CHECK(category IN ('cuisine', 'type')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Users table
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

-- Review Posts table
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

-- Meetup Posts table
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

-- Post Images table
CREATE TABLE IF NOT EXISTS post_images (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  image_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (post_id) REFERENCES review_posts(id) ON DELETE CASCADE
);

-- Comments table (for review posts, supports nested replies)
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  post_type TEXT NOT NULL DEFAULT 'review' CHECK(post_type IN ('review', 'meetup')),
  author_id TEXT NOT NULL,
  parent_id TEXT, -- NULL for top-level comments, comment_id for replies
  content TEXT NOT NULL,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Comment likes table
CREATE TABLE IF NOT EXISTS comment_likes (
  id TEXT PRIMARY KEY,
  comment_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(comment_id, user_id),
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Post images unique constraint (prevent duplicates)
CREATE UNIQUE INDEX IF NOT EXISTS idx_post_images_unique ON post_images(post_id, image_order);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES review_posts(id) ON DELETE CASCADE
);

-- Meetup Likes table (separate for meetup posts)
CREATE TABLE IF NOT EXISTS meetup_likes (
  id TEXT PRIMARY KEY,
  post_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(post_id, user_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES meetup_posts(id) ON DELETE CASCADE
);

-- Follows table
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

-- Saved Restaurants table
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

-- Indexes for better query performance
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

