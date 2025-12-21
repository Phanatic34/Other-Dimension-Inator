import React, { useState, useEffect } from 'react';
import { MeetupPost } from '../../types/models';
import { updateMeetupPost } from '../../api/api';

interface EditMeetupPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: MeetupPost;
  onSave: (updatedPost: MeetupPost) => void;
}

export const EditMeetupPostModal: React.FC<EditMeetupPostModalProps> = ({ 
  isOpen, 
  onClose, 
  post, 
  onSave 
}) => {
  const [restaurantName, setRestaurantName] = useState(post.restaurantName);
  const [description, setDescription] = useState(post.description);
  const [maxHeadcount, setMaxHeadcount] = useState(post.maxHeadcount);
  const [budgetDescription, setBudgetDescription] = useState(post.budgetDescription);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when post changes
  useEffect(() => {
    setRestaurantName(post.restaurantName);
    setDescription(post.description);
    setMaxHeadcount(post.maxHeadcount);
    setBudgetDescription(post.budgetDescription);
    setError(null);
  }, [post]);

  const handleSubmit = async () => {
    if (!restaurantName.trim()) {
      setError('餐廳名稱不能為空');
      return;
    }
    if (!description.trim()) {
      setError('描述不能為空');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const updatedPost = await updateMeetupPost(post.id, {
        restaurantName: restaurantName.trim(),
        description: description.trim(),
        maxHeadcount,
        budgetDescription: budgetDescription.trim(),
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
          <h2 className="text-lg font-bold text-text-primary">編輯揪吃飯</h2>
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
          {/* Restaurant Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              餐廳名稱 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="輸入餐廳名稱..."
              className="w-full p-3 rounded-lg border border-border-color bg-bg-tertiary text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>

          {/* Max Headcount */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              人數上限
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMaxHeadcount(Math.max(2, maxHeadcount - 1))}
                className="w-10 h-10 rounded-full bg-bg-tertiary border border-border-color text-text-primary hover:bg-bg-hover transition-colors"
              >
                -
              </button>
              <span className="text-lg font-medium text-text-primary w-12 text-center">
                {maxHeadcount}
              </span>
              <button
                type="button"
                onClick={() => setMaxHeadcount(Math.min(20, maxHeadcount + 1))}
                className="w-10 h-10 rounded-full bg-bg-tertiary border border-border-color text-text-primary hover:bg-bg-hover transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Budget */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              預算
            </label>
            <input
              type="text"
              value={budgetDescription}
              onChange={(e) => setBudgetDescription(e.target.value)}
              placeholder="例如：每人 $300-500"
              className="w-full p-3 rounded-lg border border-border-color bg-bg-tertiary text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-1">
              描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="描述這次聚餐..."
              className="w-full p-3 rounded-lg border border-border-color bg-bg-tertiary text-text-primary placeholder:text-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
              rows={5}
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

