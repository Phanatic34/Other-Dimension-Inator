import React, { useState } from 'react';
import { MeetupPost } from '../../types/models';

interface MeetupPostCardProps {
  post: MeetupPost;
  onClick?: () => void;
}

export const MeetupPostCard: React.FC<MeetupPostCardProps> = ({ post, onClick }) => {
  const [currentHeadcount, setCurrentHeadcount] = useState(post.currentHeadcount);
  const [hasJoined, setHasJoined] = useState(false);

  const isDeadlinePast = new Date(post.deadline) < new Date();
  const isFull = currentHeadcount >= post.expectedHeadcount;
  const canJoin = !isDeadlinePast && !isFull && !hasJoined;

  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canJoin) {
      setCurrentHeadcount(prev => prev + 1);
      setHasJoined(true);
      alert(`You've joined the meetup! Current headcount: ${currentHeadcount + 1}/${post.expectedHeadcount}`);
    }
  };

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
            {post.host.avatarUrl ? (
              <img src={post.host.avatarUrl} alt={post.host.displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-text-primary text-lg">👤</span>
            )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          {/* Name, Username, Time */}
          <div className="flex items-baseline flex-wrap gap-1 text-sm">
            <span className="font-bold text-text-primary">
              {post.host.displayName}
            </span>
            <span className="text-text-secondary">
              {post.host.handle}
            </span>
            <span className="text-text-secondary">•</span>
            <span className="text-text-secondary">
              {post.createdAt}
            </span>
          </div>
          
          {/* "→ looking for:" row */}
          <div className="text-sm text-text-secondary mt-0.5">
            <span>→ looking for: </span>
            <span className="font-bold text-text-primary">{post.title}</span>
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

      {/* LOCATION ROW */}
      <div className="ml-[52px] mb-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.locationArea)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-text-secondary hover:text-brand-orange transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {post.locationArea}
        </a>
      </div>

      {/* Post Content */}
      <div className="ml-[52px]">
        {/* Board Tag */}
        <div className="mb-2">
          <span className="text-xs text-text-secondary px-2 py-0.5 rounded bg-bg-card border border-border-color">
            {post.board.label}
          </span>
        </div>

        {/* Restaurant Name (if available) */}
        {post.restaurantName && (
          <div className="text-sm font-semibold text-text-primary mb-2">
            📍 {post.restaurantName}
          </div>
        )}

        {/* Description */}
        <p className="text-base text-text-primary leading-relaxed mb-3">
          {post.description}
        </p>

        {/* Meetup Info Card */}
        <div className="bg-bg-card border border-border-color rounded-lg p-3 mb-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">🕒 Meetup Time</span>
            <span className="font-semibold text-text-primary">{post.meetupTime}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">👥 Headcount</span>
            <span className="font-semibold text-text-primary">
              {currentHeadcount} / {post.expectedHeadcount} joined
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">💰 Budget</span>
            <span className="font-semibold text-text-primary">{post.budgetRange}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">📋 Reservation</span>
            <span className="font-semibold text-text-primary">{post.hasReservation ? 'Yes' : 'No'}</span>
          </div>
          
          {/* Status Badge */}
          <div className="pt-2 border-t border-border-color">
            {isDeadlinePast ? (
              <span className="inline-block px-2.5 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                Closed
              </span>
            ) : isFull ? (
              <span className="inline-block px-2.5 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
                Full
              </span>
            ) : (
              <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                Open until {new Date(post.deadline).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={handleJoin}
          disabled={!canJoin}
          className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all duration-200 mb-3 ${
            canJoin
              ? 'bg-brand-orange text-white hover:bg-opacity-90'
              : hasJoined
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {hasJoined ? '✓ Joined' : isFull ? 'Full' : isDeadlinePast ? 'Closed' : 'Join Meetup'}
        </button>

        {/* BOTTOM ACTION BAR - Twitter style */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-1">
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
    </div>
  );
};

