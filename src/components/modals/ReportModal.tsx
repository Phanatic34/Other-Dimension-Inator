import React, { useState } from 'react';
import { ReportReason, reportPost } from '../../api/api';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postType: 'review' | 'meetup';
}

const REPORT_REASONS: { value: ReportReason; label: string; description: string }[] = [
  { value: 'spam', label: '垃圾訊息', description: '廣告或無關內容' },
  { value: 'harassment', label: '騷擾或霸凌', description: '針對個人的攻擊或威脅' },
  { value: 'inappropriate', label: '不當內容', description: '色情、暴力或其他不適當內容' },
  { value: 'misinformation', label: '不實資訊', description: '虛假或誤導性的資訊' },
  { value: 'other', label: '其他', description: '其他違規行為' },
];

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, postId, postType }) => {
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) {
      setError('請選擇檢舉原因');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await reportPost(postId, postType, selectedReason, description || undefined);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset state after closing
        setSelectedReason(null);
        setDescription('');
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || '檢舉失敗，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason(null);
    setDescription('');
    setError(null);
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="bg-bg-card rounded-2xl shadow-2xl border border-border-color max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-color">
          <h2 className="text-lg font-bold text-text-primary">檢舉貼文</h2>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">感謝您的回報</h3>
              <p className="text-text-secondary text-sm">我們會盡快審查這則貼文</p>
            </div>
          ) : (
            <>
              <p className="text-text-secondary text-sm mb-4">
                請選擇檢舉此貼文的原因：
              </p>

              {/* Reason Options */}
              <div className="space-y-2 mb-4">
                {REPORT_REASONS.map((reason) => (
                  <label
                    key={reason.value}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedReason === reason.value
                        ? 'bg-accent-primary/10 border border-accent-primary'
                        : 'bg-bg-tertiary border border-transparent hover:border-border-color'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportReason"
                      value={reason.value}
                      checked={selectedReason === reason.value}
                      onChange={() => setSelectedReason(reason.value)}
                      className="mt-1 accent-accent-primary"
                    />
                    <div>
                      <div className="font-medium text-text-primary">{reason.label}</div>
                      <div className="text-sm text-text-secondary">{reason.description}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Additional Description */}
              {selectedReason && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    補充說明（選填）
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="請提供更多細節..."
                    className="w-full p-3 rounded-lg border border-border-color bg-bg-tertiary text-text-primary placeholder:text-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    rows={3}
                  />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="flex gap-3 p-4 border-t border-border-color">
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 px-4 rounded-lg border border-border-color text-text-primary hover:bg-bg-hover transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedReason || isSubmitting}
              className="flex-1 py-2.5 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '提交中...' : '提交檢舉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

