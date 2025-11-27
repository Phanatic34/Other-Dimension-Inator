import React, { useState, useEffect } from 'react';
import { ReviewPost } from '../../types/models';

interface ReviewPostCardProps {
  post: ReviewPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
}

// Helper function to map priceMax to symbols and label
function getPriceInfo(maxPrice: number | null | undefined) {
  if (maxPrice == null) {
    return { symbols: "", label: "" };
  }

  if (maxPrice <= 300) {
    return { symbols: "$", label: "NT$0–300" };
  }

  if (maxPrice <= 1000) {
    return { symbols: "$$", label: "NT$301–1000" };
  }

  if (maxPrice <= 5000) {
    return { symbols: "$$$", label: "NT$1001–5000" };
  }

  // 5000+
  return { symbols: "$$$$$", label: "NT$5000+" };
}

export const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, onClick, onTagClick }) => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute price info from priceMax
  const priceInfo = getPriceInfo(post.priceMax);

  // Handler for opening Google Maps
  const handleOpenGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = `${post.restaurantName ?? ""} ${post.locationArea ?? ""}`.trim();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      "_blank"
    );
  };

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

  // ESC key listener for lightbox and menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          closeLightbox();
        }
        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen, menuOpen]);

  return (
    <div
      onClick={(e) => {
        // Close menu if open
        if (menuOpen) {
          setMenuOpen(false);
        }
        // Trigger parent onClick
        if (onClick) {
          onClick();
        }
      }}
      className="group px-4 py-3 border-b border-border-color cursor-pointer hover:bg-bg-hover transition-colors duration-200"
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
          {/* Line 1: Name, Username, Time + More Menu (right-aligned) */}
          <div className="flex items-baseline justify-between gap-2">
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
            
            {/* Right-aligned: More menu (...) with dropdown */}
            <div className="relative flex-shrink-0">
              <button
                className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer text-text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-44 rounded-lg bg-white shadow-lg border border-neutral-200 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Save this post */}
                  <button
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-text-primary hover:bg-neutral-50 cursor-pointer rounded-t-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('save post', post.id);
                      setMenuOpen(false);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Save this post</span>
                  </button>
                  
                  {/* Report this post */}
                  <button
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer rounded-b-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('report post', post.id);
                      setMenuOpen(false);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>Report this post</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Line 2: Three Separate Pills - Restaurant+Location, Style Type, Food Type */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {/* Chip 1: Restaurant + Location */}
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer group-hover:bg-neutral-50 transition-colors"
              onClick={handleOpenGoogleMaps}
            >
              {(post.locationArea || (post as any).region) && (
                <>
                  <span className="text-text-secondary">
                    {(post as any).region || post.locationArea}
                  </span>
                  <span className="text-gray-300">|</span>
                </>
              )}
              <span className="font-medium text-text-primary">
                {post.restaurantName}
              </span>
            </button>

            {/* Chip 2: Style Type (Cuisine) - use styleType if available, otherwise use board if it's cuisine */}
            {(post.styleType || (post.board?.category === 'cuisine' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.styleType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.styleType || post.board?.label}
                </span>
              </button>
            )}

            {/* Chip 3: Food Type - use foodType if available, otherwise use board if it's type */}
            {(post.foodType || (post.board?.category === 'type' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.foodType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.foodType || post.board?.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Post Content Area */}
      <div className="ml-[52px]">
        {/* RATING ROW (ABOVE content text) */}
        <div className="mt-1 flex items-center text-sm text-text-secondary">
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
          </div>

          {/* Numeric rating */}
          <span className="ml-2 font-semibold text-text-primary">
            {post.rating.toFixed(1)}
          </span>

          {/* Dot separator */}
          <span className="mx-2 text-text-secondary/60">·</span>

          {/* Price Symbols + Range */}
          {priceInfo.symbols && (
            <>
              <span className="font-semibold text-text-primary">{priceInfo.symbols}</span>
              <span className="ml-2 text-xs text-text-secondary">{priceInfo.label}</span>
            </>
          )}
        </div>

        {/* CONTENT TEXT with hashtag styling */}
        <p className="mt-3 text-base text-text-primary leading-relaxed mb-3">
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

        {/* BOTTOM ACTION BAR - Like, Comment, Share, Save */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          {/* Like */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('like post', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span className="font-medium">{post.likeCount}</span>
          </button>

          {/* Comment */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('comment post', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span className="font-medium">{post.commentCount}</span>
          </button>

          {/* Share (paper airplane) */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('share post', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span className="font-medium">{post.shareCount ?? 0}</span>
          </button>

          {/* Save restaurant location (map pin) */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('save restaurant location', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
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

