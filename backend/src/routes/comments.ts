import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { query, isDatabaseAvailable } from '../db/database';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Middleware to check if database is available
const requireDatabase = (req: Request, res: Response, next: Function) => {
  if (!isDatabaseAvailable()) {
    return res.status(503).json({
      error: 'Database not configured',
      hint: 'Please set DATABASE_URL in backend/.env file.'
    });
  }
  next();
};

// Helper function to get user info
async function getUser(userId: string) {
  const result = await query(
    'SELECT id, display_name, handle, avatar_url FROM users WHERE id = $1',
    [userId]
  );
  if (result.rows.length === 0) return null;
  const user = result.rows[0];
  return {
    id: user.id,
    displayName: user.display_name,
    handle: user.handle,
    avatarUrl: user.avatar_url,
  };
}

// Helper to build comment tree
interface Comment {
  id: string;
  postId: string;
  postType: string;
  author: any;
  content: string;
  likeCount: number;
  isLikedByUser: boolean;
  createdAt: string;
  replies: Comment[];
}

async function buildCommentTree(postId: string, postType: string, currentUserId?: string): Promise<Comment[]> {
  const result = await query(
    `SELECT c.*, u.display_name, u.handle, u.avatar_url 
     FROM comments c 
     JOIN users u ON c.author_id = u.id 
     WHERE c.post_id = $1 AND c.post_type = $2 
     ORDER BY c.created_at ASC`,
    [postId, postType]
  );

  const commentsMap = new Map<string, Comment>();
  const rootComments: Comment[] = [];

  // First pass: create all comment objects
  for (const row of result.rows) {
    // Check if current user liked this comment
    let isLikedByUser = false;
    if (currentUserId) {
      const likeResult = await query(
        'SELECT id FROM comment_likes WHERE comment_id = $1 AND user_id = $2',
        [row.id, currentUserId]
      );
      isLikedByUser = likeResult.rows.length > 0;
    }

    const comment: Comment = {
      id: row.id,
      postId: row.post_id,
      postType: row.post_type,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        handle: row.handle,
        avatarUrl: row.avatar_url,
      },
      content: row.content,
      likeCount: row.like_count || 0,
      isLikedByUser,
      createdAt: row.created_at,
      replies: [],
    };
    commentsMap.set(row.id, comment);
  }

  // Second pass: build tree structure
  for (const row of result.rows) {
    const comment = commentsMap.get(row.id)!;
    if (row.parent_id && commentsMap.has(row.parent_id)) {
      commentsMap.get(row.parent_id)!.replies.push(comment);
    } else {
      rootComments.push(comment);
    }
  }

  return rootComments;
}

// GET /api/comments/:postId - Get all comments for a post
router.get('/:postId', requireDatabase, async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { postType = 'review' } = req.query;
    const currentUserId = req.headers['x-user-id'] as string | undefined;

    const comments = await buildCommentTree(postId, postType as string, currentUserId);
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// POST /api/comments - Create a new comment
router.post('/', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { postId, postType = 'review', parentId, content } = req.body;
    const userId = (req as any).userId;

    if (!postId || !content) {
      return res.status(400).json({ error: 'postId and content are required' });
    }

    const commentId = uuidv4();
    await query(
      `INSERT INTO comments (id, post_id, post_type, author_id, parent_id, content) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [commentId, postId, postType, userId, parentId || null, content]
    );

    // Update comment count on the post
    if (postType === 'review') {
      await query(
        'UPDATE review_posts SET comment_count = comment_count + 1 WHERE id = $1',
        [postId]
      );
    } else {
      await query(
        'UPDATE meetup_posts SET comment_count = comment_count + 1 WHERE id = $1',
        [postId]
      );
    }

    // Fetch the created comment with author info
    const result = await query(
      `SELECT c.*, u.display_name, u.handle, u.avatar_url 
       FROM comments c 
       JOIN users u ON c.author_id = u.id 
       WHERE c.id = $1`,
      [commentId]
    );

    const row = result.rows[0];
    const comment: Comment = {
      id: row.id,
      postId: row.post_id,
      postType: row.post_type,
      author: {
        id: row.author_id,
        displayName: row.display_name,
        handle: row.handle,
        avatarUrl: row.avatar_url,
      },
      content: row.content,
      likeCount: 0,
      isLikedByUser: false,
      createdAt: row.created_at,
      replies: [],
    };

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

// POST /api/comments/:id/like - Like a comment
router.post('/:id/like', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Check if already liked
    const existingLike = await query(
      'SELECT id FROM comment_likes WHERE comment_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (existingLike.rows.length > 0) {
      return res.json({ message: 'Already liked', liked: true });
    }

    // Create like
    await query(
      'INSERT INTO comment_likes (id, comment_id, user_id) VALUES ($1, $2, $3)',
      [uuidv4(), id, userId]
    );

    // Update like count
    await query('UPDATE comments SET like_count = like_count + 1 WHERE id = $1', [id]);

    res.status(201).json({ message: 'Comment liked', liked: true });
  } catch (error) {
    console.error('Error liking comment:', error);
    res.status(500).json({ error: 'Failed to like comment' });
  }
});

// DELETE /api/comments/:id/like - Unlike a comment
router.delete('/:id/like', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    await query(
      'DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2',
      [id, userId]
    );

    // Update like count
    await query(
      'UPDATE comments SET like_count = GREATEST(0, like_count - 1) WHERE id = $1',
      [id]
    );

    res.json({ message: 'Comment unliked', liked: false });
  } catch (error) {
    console.error('Error unliking comment:', error);
    res.status(500).json({ error: 'Failed to unlike comment' });
  }
});

// DELETE /api/comments/:id - Delete a comment
router.delete('/:id', requireDatabase, requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Check if user owns the comment
    const comment = await query('SELECT * FROM comments WHERE id = $1', [id]);
    if (comment.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.rows[0].author_id !== userId) {
      return res.status(403).json({ error: 'Unauthorized to delete this comment' });
    }

    const postId = comment.rows[0].post_id;
    const postType = comment.rows[0].post_type;

    // Delete comment and all replies (cascade)
    await query('DELETE FROM comments WHERE id = $1', [id]);

    // Update comment count
    if (postType === 'review') {
      await query(
        `UPDATE review_posts SET comment_count = (
          SELECT COUNT(*) FROM comments WHERE post_id = $1 AND post_type = 'review'
        ) WHERE id = $1`,
        [postId]
      );
    } else {
      await query(
        `UPDATE meetup_posts SET comment_count = (
          SELECT COUNT(*) FROM comments WHERE post_id = $1 AND post_type = 'meetup'
        ) WHERE id = $1`,
        [postId]
      );
    }

    res.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;




