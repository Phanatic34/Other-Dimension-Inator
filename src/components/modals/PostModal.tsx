import React, { useEffect } from 'react';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, title, children }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Save original overflow values
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyOverflowY = document.body.style.overflowY;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalHtmlOverflowY = document.documentElement.style.overflowY;
    
    // Disable scroll on both body and html
    document.body.style.overflow = 'hidden';
    document.body.style.overflowY = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overflowY = 'hidden';

    return () => {
      // Restore original values (empty string restores default scrolling behavior)
      document.body.style.overflow = originalBodyOverflow || '';
      document.body.style.overflowY = originalBodyOverflowY || '';
      document.documentElement.style.overflow = originalHtmlOverflow || '';
      document.documentElement.style.overflowY = originalHtmlOverflowY || '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] scrollbar-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between p-6 pb-4 border-b border-border-color">
            <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
        <div className={title ? 'p-6 pt-4' : 'p-6'}>
          {children}
        </div>
      </div>
    </div>
  );
};

