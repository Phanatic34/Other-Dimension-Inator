import React from 'react';
import { ReviewPost } from '../../types/models';

interface ReviewPostCardProps {
  post: ReviewPost;
  onClick?: () => void;
}

export const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, onClick }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-sm">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-500 text-sm">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300 text-sm">★</span>
        ))}
        <span className="ml-1.5 text-sm text-text-primary font-bold">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderPriceLevel = (level: string) => {
    return <span className="text-text-primary font-bold">{level}</span>;
  };

  return (
    <div
      onClick={onClick}
      className="bg-bg-card rounded-xl border border-stone-200 p-4 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      style={{ 
        fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', 
        fontWeight: 700
      }}
    >
      {/* Header: Author Info */}
      <div className="flex items-start space-x-2.5 mb-3">
        <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden flex-shrink-0 border border-accent-gold border-opacity-30">
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-text-primary text-base">👤</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-wrap mb-0.5">
            <span className="text-base text-text-primary font-bold truncate" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
              {post.author.displayName}
            </span>
            <span className="text-sm text-text-secondary truncate" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>{post.author.handle}</span>
            {post.isFromFollowedUser && (
              <span className="text-xs bg-accent-gold text-text-primary px-2 py-0.5 rounded-md" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Following</span>
            )}
          </div>
          <div className="text-xs text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>{post.createdAt}</div>
        </div>
      </div>

      {/* Board Label */}
      <div className="mb-2.5">
        <span className="inline-block px-3 py-1 bg-bg-primary text-text-primary text-xs rounded-md border border-border-color" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
          {post.board.label}
        </span>
      </div>

      {/* Restaurant Name */}
      <h3 className="text-xl text-text-primary mb-2 tracking-tight" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.restaurantName}</h3>

      {/* Title */}
      <h4 className="text-base text-text-primary mb-2.5" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>{post.title}</h4>

      {/* Rating, Price, Location */}
      <div className="flex items-center space-x-3 mb-2.5 text-sm">
        {renderStars(post.rating)}
        {renderPriceLevel(post.priceLevel)}
        <span className="text-text-secondary text-xs">📍 {post.locationArea}</span>
      </div>

      {/* Content Snippet */}
      <p className="text-sm text-text-primary mb-3 line-clamp-2 leading-relaxed" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>{post.contentSnippet}</p>

      {/* Footer: Like and Comment Count */}
      <div className="flex items-center space-x-5 text-sm pt-2.5 border-t border-border-color" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>
        <div className="flex items-center space-x-1.5 text-text-secondary hover:text-red-600 transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span className="text-text-primary font-bold">{post.likeCount}</span>
        </div>
        <div className="flex items-center space-x-1.5 text-text-secondary hover:text-accent-primary transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-text-primary font-bold">{post.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

