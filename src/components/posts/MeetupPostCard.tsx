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
      className="bg-bg-card rounded-xl border border-stone-200 p-4 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      style={{ 
        fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', 
        fontWeight: 700
      }}
    >
      {/* Header: Host Info */}
      <div className="flex items-start space-x-2.5 mb-3">
        <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden flex-shrink-0 border border-accent-gold border-opacity-30">
          {post.host.avatarUrl ? (
            <img src={post.host.avatarUrl} alt={post.host.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-text-primary text-base">👤</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 flex-wrap mb-0.5">
            <span className="text-base text-text-primary font-bold truncate" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
              {post.host.displayName}
            </span>
            <span className="text-sm text-text-secondary truncate" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>{post.host.handle}</span>
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

      {/* Title */}
      <h3 className="text-xl text-text-primary mb-2 tracking-tight" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.title}</h3>

      {/* Restaurant (if available) */}
      {post.restaurantName && (
        <div className="text-sm text-text-primary mb-2">
          <span className="font-medium">📍 {post.restaurantName}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-text-primary mb-3 line-clamp-2 leading-relaxed" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>{post.description}</p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>
        <div>
          <span className="text-text-secondary">Meetup Time:</span>
          <span className="ml-1.5 text-text-primary font-bold">{post.meetupTime}</span>
        </div>
        <div>
          <span className="text-text-secondary">Location:</span>
          <span className="ml-1.5 text-text-primary font-bold">{post.locationArea}</span>
        </div>
        <div>
          <span className="text-text-secondary">Reservation:</span>
          <span className="ml-1.5 text-text-primary font-bold">{post.hasReservation ? 'Yes' : 'No'}</span>
        </div>
        <div>
          <span className="text-text-secondary">Budget:</span>
          <span className="ml-1.5 text-text-primary font-bold">{post.budgetRange}</span>
        </div>
        <div className="col-span-2">
          <span className="text-text-secondary">Headcount:</span>
          <span className="ml-1.5 text-text-primary font-bold">
            {currentHeadcount} / {post.expectedHeadcount} joined
          </span>
        </div>
      </div>

      {/* Deadline Status */}
      <div className="flex items-center justify-between mb-3">
        <div>
          {isDeadlinePast ? (
            <span className="inline-block px-2.5 py-1 bg-red-100 text-red-700 text-xs rounded-md border border-red-300" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
              Closed
            </span>
          ) : (
            <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs rounded-md border border-green-300" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
              Open until {new Date(post.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Join Button */}
      <div className="flex items-center justify-between pt-2.5 border-t border-border-color">
        <div className="text-xs text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}>
          Deadline: {new Date(post.deadline).toLocaleString()}
        </div>
        <button
          onClick={handleJoin}
          disabled={!canJoin}
          className={`px-4 py-1.5 rounded-md text-sm transition-all duration-200 ${
            canJoin
              ? 'bg-accent-gold text-text-primary hover:bg-accent-hover shadow-sm hover:shadow-md'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
        >
          {hasJoined ? 'Joined ✓' : isFull ? 'Full' : isDeadlinePast ? 'Closed' : 'Join'}
        </button>
      </div>
    </div>
  );
};

