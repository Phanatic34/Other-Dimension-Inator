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
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-spotify-light-gray">★</span>
        ))}
        <span className="ml-1 text-sm text-spotify-text-dim">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderPriceLevel = (level: string) => {
    return <span className="text-spotify-text-dim">{level}</span>;
  };

  return (
    <div
      onClick={onClick}
      className="bg-spotify-gray rounded-xl border border-elegant-border p-5 hover:bg-elegant-hover transition-all duration-300 cursor-pointer shadow-elegant hover:shadow-elegant-lg"
      style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}
    >
      {/* Header: Author Info */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-spotify-light-gray flex items-center justify-center overflow-hidden flex-shrink-0">
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-spotify-text-dim text-sm">👤</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-base text-spotify-text truncate" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
              {post.author.displayName}
            </span>
            <span className="text-sm text-spotify-text-dim truncate" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.author.handle}</span>
            {post.isFromFollowedUser && (
              <span className="text-sm bg-spotify-green bg-opacity-25 text-spotify-green px-2.5 py-1 rounded-full border border-spotify-green border-opacity-30" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Following</span>
            )}
          </div>
          <div className="text-sm text-spotify-text-dim mt-1" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.createdAt}</div>
        </div>
      </div>

      {/* Board Label */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1.5 bg-spotify-light-gray text-spotify-text-dim text-sm rounded-lg border border-elegant-border" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
          {post.board.label}
        </span>
      </div>

      {/* Restaurant Name */}
      <h3 className="text-2xl text-spotify-text mb-3 tracking-tight" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.restaurantName}</h3>

      {/* Title */}
      <h4 className="text-lg text-spotify-text mb-3" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.title}</h4>

      {/* Rating, Price, Location */}
      <div className="flex items-center space-x-4 mb-3 text-base">
        {renderStars(post.rating)}
        {renderPriceLevel(post.priceLevel)}
        <span className="text-spotify-text-dim">📍 {post.locationArea}</span>
      </div>

      {/* Content Snippet */}
      <p className="text-base text-spotify-text-dim mb-4 line-clamp-2 leading-relaxed" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.contentSnippet}</p>

      {/* Footer: Like and Comment Count */}
      <div className="flex items-center space-x-4 text-base text-spotify-text-dim pt-3 border-t border-elegant-border" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>{post.likeCount}</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{post.commentCount}</span>
        </div>
      </div>
    </div>
  );
};

