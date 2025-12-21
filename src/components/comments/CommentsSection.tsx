import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Comment, 
  fetchComments, 
  createComment, 
  likeComment, 
  unlikeComment,
  deleteComment 
} from '../../api/api';
import { Heart, MessageCircle, Trash2, Send, ChevronDown, ChevronUp } from 'lucide-react';

interface CommentsSectionProps {
  postId: string;
  postType: 'review' | 'meetup';
  initialCommentCount: number;
}

interface CommentItemProps {
  comment: Comment;
  postId: string;
  postType: 'review' | 'meetup';
  depth: number;
  onReply: (parentId: string) => void;
  onDelete: (commentId: string) => void;
  currentUserId?: string;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  postId,
  postType,
  depth,
  onReply,
  onDelete,
  currentUserId,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(comment.isLikedByUser);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [showReplies, setShowReplies] = useState(depth < 2); // Auto-expand first 2 levels

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isLiked) {
        await unlikeComment(comment.id);
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        await likeComment(comment.id);
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/user/${comment.author.handle}`);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '剛剛';
    if (minutes < 60) return `${minutes}分鐘前`;
    if (hours < 24) return `${hours}小時前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-TW');
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-border-color pl-4' : ''}`}>
      <div className="py-3">
        {/* Comment Header */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div 
            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-accent-primary transition-all"
            onClick={handleAuthorClick}
          >
            {comment.author.avatarUrl ? (
              <img 
                src={comment.author.avatarUrl} 
                alt={comment.author.displayName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-accent-gold bg-opacity-40 flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
            )}
          </div>

          {/* Comment Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span 
                className="font-semibold text-text-primary text-sm hover:underline cursor-pointer"
                onClick={handleAuthorClick}
              >
                {comment.author.displayName}
              </span>
              <span className="text-text-secondary text-xs">
                @{comment.author.handle}
              </span>
              <span className="text-text-secondary text-xs">•</span>
              <span className="text-text-secondary text-xs">
                {formatTime(comment.createdAt)}
              </span>
            </div>
            
            <p className="text-text-primary text-sm mt-1 whitespace-pre-wrap">
              {comment.content}
            </p>

            {/* Comment Actions */}
            <div className="flex items-center gap-4 mt-2">
              {/* Like Button */}
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 text-xs transition-colors ${
                  isLiked 
                    ? 'text-red-500' 
                    : 'text-text-secondary hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount > 0 && <span>{likeCount}</span>}
              </button>

              {/* Reply Button */}
              {depth < 3 && (
                <button 
                  onClick={() => onReply(comment.id)}
                  className="flex items-center gap-1 text-xs text-text-secondary hover:text-accent-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>回覆</span>
                </button>
              )}

              {/* Delete Button (only for own comments) */}
              {currentUserId === comment.author.id && (
                <button 
                  onClick={() => onDelete(comment.id)}
                  className="flex items-center gap-1 text-xs text-text-secondary hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="mt-2">
            {!showReplies ? (
              <button
                onClick={() => setShowReplies(true)}
                className="flex items-center gap-1 text-xs text-accent-primary hover:underline ml-11"
              >
                <ChevronDown className="w-4 h-4" />
                <span>顯示 {comment.replies.length} 則回覆</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowReplies(false)}
                  className="flex items-center gap-1 text-xs text-text-secondary hover:underline ml-11 mb-2"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>收起回覆</span>
                </button>
                {comment.replies.map(reply => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    postId={postId}
                    postType={postType}
                    depth={depth + 1}
                    onReply={onReply}
                    onDelete={onDelete}
                    currentUserId={currentUserId}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  postType,
  initialCommentCount,
}) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load comments when expanded
  useEffect(() => {
    if (isExpanded && comments.length === 0) {
      loadComments();
    }
  }, [isExpanded]);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const data = await fetchComments(postId, postType);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    setIsSubmitting(true);
    try {
      const comment = await createComment(postId, newComment.trim(), postType, replyingTo || undefined);
      if (comment) {
        // Reload comments to get the updated tree
        await loadComments();
        setNewComment('');
        setReplyingTo(null);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = (parentId: string) => {
    setReplyingTo(parentId);
    // Focus the input
    const input = document.getElementById(`comment-input-${postId}`);
    if (input) input.focus();
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('確定要刪除這則留言嗎？')) return;
    
    try {
      await deleteComment(commentId);
      await loadComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  // Find the comment being replied to (for display)
  const findReplyTarget = (comments: Comment[], targetId: string): Comment | null => {
    for (const comment of comments) {
      if (comment.id === targetId) return comment;
      const found = findReplyTarget(comment.replies, targetId);
      if (found) return found;
    }
    return null;
  };

  const replyTarget = replyingTo ? findReplyTarget(comments, replyingTo) : null;

  return (
    <div className="border-t border-border-color mt-3 pt-3">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span>
          {initialCommentCount > 0 
            ? `${initialCommentCount} 則留言` 
            : '留言'
          }
        </span>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Comments Content */}
      {isExpanded && (
        <div className="mt-3">
          {/* Comment Input */}
          {isAuthenticated ? (
            <form onSubmit={handleSubmitComment} className="mb-4">
              {/* Reply indicator */}
              {replyTarget && (
                <div className="flex items-center gap-2 mb-2 text-sm text-text-secondary bg-bg-tertiary rounded-lg px-3 py-2">
                  <span>回覆 @{replyTarget.author.handle}</span>
                  <button
                    type="button"
                    onClick={cancelReply}
                    className="text-red-500 hover:underline ml-auto"
                  >
                    取消
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-3">
                {/* User Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-accent-gold bg-opacity-40 flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                  )}
                </div>
                
                {/* Input */}
                <div className="flex-1 relative">
                  <input
                    id={`comment-input-${postId}`}
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={replyTarget ? `回覆 @${replyTarget.author.handle}...` : '寫下你的留言...'}
                    className="w-full px-4 py-2 pr-12 rounded-full bg-bg-tertiary border border-border-color text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary text-sm"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent-primary hover:text-accent-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <p className="text-sm text-text-secondary mb-4">
              請先<a href="/login" className="text-accent-primary hover:underline">登入</a>以發表留言
            </p>
          )}

          {/* Comments List */}
          {isLoading ? (
            <div className="text-center py-4 text-text-secondary text-sm">
              載入留言中...
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-4 text-text-secondary text-sm">
              還沒有留言，來當第一個吧！
            </div>
          ) : (
            <div className="space-y-1">
              {comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  postId={postId}
                  postType={postType}
                  depth={0}
                  onReply={handleReply}
                  onDelete={handleDelete}
                  currentUserId={user?.id}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

