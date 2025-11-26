import React, { useState, useEffect } from 'react';
import { ReviewPost } from '../../types/models';

interface ReviewPostCardProps {
  post: ReviewPost;
  onClick?: () => void;
}

export const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, onClick }) => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Helper function to parse and style hashtags
  const renderContentWithHashtags = (text: string) => {
    const parts = text.split(/(#[\w\u4e00-\u9fa5]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
        return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Open lightbox
  const openLightbox = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to previous image
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  // Navigate to next image
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const maxIndex = (post.images?.length || 1) - 1;
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // ESC key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen]);

  return (
    <div
      onClick={onClick}
      className="px-4 py-3 border-b border-border-color cursor-pointer hover:bg-bg-card transition-colors duration-200"
    >
      {/* TOP SECTION: Header Row */}
      <div className="flex items-start mb-2">
        {/* Avatar */}
        <div className="relative mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden">
            {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-text-primary text-lg">👤</span>
            )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          {/* Line 1: Name, Username, Time */}
          <div className="flex items-baseline flex-wrap gap-1 text-sm">
            <span className="font-bold text-text-primary">
              {post.author.displayName}
            </span>
            <span className="text-text-secondary">
              {post.author.handle}
            </span>
            <span className="text-text-secondary">•</span>
            <span className="text-text-secondary">
              {post.createdAt}
            </span>
          </div>
          
          {/* Line 2: Restaurant + Cuisine Pill Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm mt-1.5">
            <span className="font-medium text-text-primary">{post.restaurantName}</span>
            <span style={{ color: '#C7C7C7' }}>·</span>
            <span className="text-text-secondary">{post.board.label}</span>
          </div>
          
          {/* Line 3: Location */}
          <div className="mt-1">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.locationArea)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-0.5 text-text-secondary hover:text-brand-orange transition-colors text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {post.locationArea}
            </a>
          </div>
        </div>

        {/* More options button */}
        <button 
          className="text-text-secondary hover:text-brand-orange transition-colors p-1 ml-2"
          onClick={(e) => {
            e.stopPropagation();
            console.log('More options clicked');
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>

      {/* Post Content Area */}
      <div className="ml-[52px]">
        {/* RATING ROW (ABOVE content text) */}
        <div className="flex items-center gap-3 mb-2 text-sm">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(post.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 font-semibold text-text-primary">{post.rating.toFixed(1)}</span>
          </div>
          
          {/* Price Level */}
          <span className="font-semibold text-text-primary">{post.priceLevel}</span>
          
          {/* Board Tag */}
          <span className="text-xs text-text-secondary px-2 py-0.5 rounded bg-bg-card border border-border-color">
            {post.board.label}
          </span>
        </div>

        {/* CONTENT TEXT with hashtag styling */}
        <p className="text-base text-text-primary leading-relaxed mb-3">
          {renderContentWithHashtags(post.contentSnippet)}
        </p>

        {/* IMAGE GALLERY */}
        {/* PRODUCTION NOTE: Images should be uploaded to cloud storage (AWS S3, GCS, Firebase Storage) 
            and URLs stored in database. Never rely on direct Unsplash/external hotlinks in production. */}
        {(post.images && post.images.length > 0) ? (
          <div className="mb-3 -mx-4">
            <div 
              className="flex overflow-x-auto scroll-smooth px-4 gap-3"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {post.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden border border-border-color group cursor-pointer snap-center"
                  style={{
                    width: post.images!.length === 1 ? 'calc(100% - 2rem)' : '85%',
                    height: '300px',
                  }}
                  onClick={(e) => openLightbox(index, e)}
                >
                  <img
                    src={imageUrl}
                    alt={`${post.restaurantName} - ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {/* Image counter badge - HOVER ONLY */}
                  {post.images!.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}/{post.images!.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Hide scrollbar CSS-in-JS */}
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : post.imageUrl ? (
          // Legacy single image support
          <div 
            className="rounded-xl overflow-hidden border border-border-color mb-3 cursor-pointer group"
            onClick={(e) => openLightbox(0, e)}
          >
            <img 
              src={post.imageUrl} 
              alt={post.restaurantName}
              className="w-full h-[300px] object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ) : null}

        {/* BOTTOM ACTION BAR - Twitter style */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          {/* Like */}
          <button 
            className="flex items-center gap-2 hover:text-red-500 transition-colors group"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Like clicked');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:fill-red-500 transition-all">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="font-medium">{post.likeCount}</span>
          </button>

          {/* Comment */}
          <button 
            className="flex items-center gap-2 hover:text-blue-500 transition-colors group"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Comment clicked');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span className="font-medium">{post.commentCount}</span>
          </button>

          {/* Share */}
          <button 
            className="flex items-center gap-2 hover:text-brand-orange transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Share clicked');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          {/* Modal Content */}
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* Main Image */}
            <img
              src={(post.images && post.images[activeIndex]) || post.imageUrl || ''}
              alt={`${post.restaurantName} - ${activeIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            {post.images && post.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                {activeIndex + 1} / {post.images.length}
              </div>
            )}

            {/* Previous Arrow */}
            {post.images && post.images.length > 1 && activeIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {post.images && post.images.length > 1 && activeIndex < post.images.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

