-- =====================================================
-- RESET ALL COUNTS TO REAL VALUES
-- Run this if your posts show fake like/comment counts
-- =====================================================

-- Reset review posts like counts to actual values
UPDATE review_posts SET like_count = (
  SELECT COUNT(*) FROM likes WHERE likes.post_id = review_posts.id
);

-- Reset review posts comment counts to actual values  
UPDATE review_posts SET comment_count = (
  SELECT COUNT(*) FROM comments WHERE comments.post_id = review_posts.id
);

-- Reset meetup posts like counts to actual values
UPDATE meetup_posts SET like_count = (
  SELECT COUNT(*) FROM meetup_likes WHERE meetup_likes.post_id = meetup_posts.id
);

-- Reset meetup posts comment counts to actual values
UPDATE meetup_posts SET comment_count = (
  SELECT COUNT(*) FROM comments WHERE comments.post_id = meetup_posts.id
);

-- Verify the results
SELECT 'Review Posts' as type, id, title, like_count, comment_count FROM review_posts;
SELECT 'Meetup Posts' as type, id, restaurant_name, like_count, comment_count FROM meetup_posts;

SELECT 'Counts reset successfully!' as status;

