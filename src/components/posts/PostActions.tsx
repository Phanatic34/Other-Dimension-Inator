import React from 'react';

interface PostActionsProps {
  postId: string;
  likeCount: number;
  commentCount: number;
  shareCount?: number;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

/**
 * Shared action bar component for both Review and Meetup posts
 * Displays Like, Comment, and Share icons with counts
 */
export const PostActions: React.FC<PostActionsProps> = ({
  postId,
  likeCount,
  commentCount,
  shareCount = 0,
  onLike,
  onComment,
  onShare,
}) => {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(postId);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.(postId);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(postId);
  };

  return (
    <>
      {/* Like */}
      <button 
        className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleLike}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span className="font-medium">{likeCount}</span>
      </button>

      {/* Comment */}
      <button 
        className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleComment}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
        <span className="font-medium">{commentCount}</span>
      </button>

      {/* Share (paper airplane) */}
      <button 
        className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={handleShare}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
        <span className="font-medium">{shareCount}</span>
      </button>
    </>
  );
};

