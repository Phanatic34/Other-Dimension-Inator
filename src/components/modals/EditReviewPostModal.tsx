import React, { useState, useEffect } from 'react';
import { ReviewPost } from '../../types/models';
import { updateReviewPost } from '../../api/api';

interface EditReviewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: ReviewPost;
  onSave: (updatedPost: ReviewPost) => void;
}

export const EditReviewPostModal: React.FC<EditReviewPostModalProps> = ({ 
  isOpen, 
  onClose, 
  post, 
  onSave 
}) => {
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || post.contentSnippet || '');
  const [rating, setRating] = useState(post.rating);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when post changes
  useEffect(() => {
    setTitle(post.title || '');
    setContent(post.content || post.contentSnippet || '');
    setRating(post.rating);
    setError(null);
  }, [post]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('標題不能為空');
      return;
    }
    if (!content.trim()) {
      setError('內容不能為空');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const updatedPost = await updateReviewPost(post.id, {
        title: title.trim(),
        content: content.trim(),
        rating,
      });
      onSave(updatedPost);
      onClose();
    } catch (err: any) {
      setError(err.message || '更新失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-bg-card rounded-2xl shadow-2xl border border-border-color max-w-lg w-full mx-4 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-color shrink-0">
          <h2 className="text-lg font-bold text-text-primary">編輯貼文</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {/* Restaurant Name (read-only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-1">
              餐廳名稱
            </label>
            <div className="p-3 rounded-lg bg-bg-tertiary text-text-primary border border-border-color">
              {post.restaurantName}
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              標題 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="輸入標題..."
              className="w-full p-3 rounded-lg border border-border-color bg-bg-tertiary text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              評分 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl transition-colors"
                >
                  {star <= rating ? '⭐' : '☆'}
                </button>
              ))}
              <span className="text-text-secondary ml-2">{rating} / 5</span>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              內容 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="分享你的用餐體驗..."
              className="w-full p-3 rounded-lg border border-border-color bg-bg-tertiary text-text-primary placeholder:text-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
              rows={6}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-border-color shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg border border-border-color text-text-primary hover:bg-bg-hover transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 py-2.5 px-4 rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '儲存中...' : '儲存變更'}
          </button>
        </div>
      </div>
    </div>
  );
};

