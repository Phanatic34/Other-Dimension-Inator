import React from 'react';

interface PostTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: 'review' | 'meetup') => void;
}

export const PostTypeModal: React.FC<PostTypeModalProps> = ({
  isOpen,
  onClose,
  onSelectType,
}) => {
  if (!isOpen) return null;

  const handleSelect = (type: 'review' | 'meetup') => {
    console.log(`Selected post type: ${type}`);
    // TODO: In the future, this will open a form modal for creating the post
    // TODO: The form will submit to the backend API (e.g., POST /api/posts)
    onSelectType(type);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-spotify-gray rounded-2xl shadow-elegant-lg border border-elegant-border p-8 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}
      >
        <h2 className="text-3xl text-spotify-text mb-2 tracking-tight" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Create New Post</h2>
        <p className="text-base text-spotify-text-dim mb-8" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Choose the type of post you want to create:</p>

        <div className="space-y-4">
          <button
            onClick={() => handleSelect('review')}
            className="w-full px-5 py-4 bg-spotify-green text-white rounded-xl hover:bg-spotify-green-hover transition-all duration-200 text-left shadow-premium hover:shadow-elegant"
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            <div className="text-lg mb-1">Create Review Post</div>
            <div className="text-base opacity-90">Share your restaurant experience and rating</div>
          </button>

          <button
            onClick={() => handleSelect('meetup')}
            className="w-full px-5 py-4 bg-spotify-green text-white rounded-xl hover:bg-spotify-green-hover transition-all duration-200 text-left shadow-premium hover:shadow-elegant"
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            <div className="text-lg mb-1">Create Meetup Post</div>
            <div className="text-base opacity-90">Organize a group meal with others</div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-5 py-3 text-base text-spotify-text bg-spotify-light-gray rounded-xl hover:bg-elegant-hover transition-all duration-200 border border-elegant-border"
          style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

