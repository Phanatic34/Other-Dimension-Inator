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

  const renderPriceLevel = (level: string) => {
    return <span className="text-spotify-text-dim">{level}</span>;
  };

  return (
    <div
      onClick={onClick}
      className="bg-spotify-gray rounded-xl border border-elegant-border p-5 hover:bg-elegant-hover transition-all duration-300 cursor-pointer shadow-elegant hover:shadow-elegant-lg"
      style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}
    >
      {/* Header: Host Info */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-spotify-light-gray flex items-center justify-center overflow-hidden flex-shrink-0">
          {post.host.avatarUrl ? (
            <img src={post.host.avatarUrl} alt={post.host.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="text-spotify-text-dim text-sm">👤</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-base text-spotify-text truncate" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
              {post.host.displayName}
            </span>
            <span className="text-sm text-spotify-text-dim truncate" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.host.handle}</span>
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

      {/* Title */}
      <h3 className="text-2xl text-spotify-text mb-3 tracking-tight" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.title}</h3>

      {/* Restaurant (if available) */}
      {post.restaurantName && (
        <div className="text-base text-spotify-text-dim mb-2">
          <span className="font-medium">📍 {post.restaurantName}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-base text-spotify-text-dim mb-4 line-clamp-2 leading-relaxed" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>{post.description}</p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-base" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        <div>
          <span className="text-spotify-text-dim">Meetup Time:</span>
          <span className="ml-2 text-spotify-text">{post.meetupTime}</span>
        </div>
        <div>
          <span className="text-spotify-text-dim">Location:</span>
          <span className="ml-2 text-spotify-text">{post.locationArea}</span>
        </div>
        <div>
          <span className="text-spotify-text-dim">Reservation:</span>
          <span className="ml-2 text-spotify-text">{post.hasReservation ? 'Yes' : 'No'}</span>
        </div>
        <div>
          <span className="text-spotify-text-dim">Budget:</span>
          <span className="ml-2">{renderPriceLevel(post.budgetRange)}</span>
        </div>
        <div className="col-span-2">
          <span className="text-spotify-text-dim">Headcount:</span>
          <span className="ml-2 text-spotify-text">
            {currentHeadcount} / {post.expectedHeadcount} joined
          </span>
        </div>
      </div>

      {/* Deadline Status */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {isDeadlinePast ? (
            <span className="inline-block px-4 py-1.5 bg-red-900 bg-opacity-30 text-red-400 text-sm rounded-full border border-red-800 border-opacity-50" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
              Closed
            </span>
          ) : (
            <span className="inline-block px-4 py-1.5 bg-spotify-green bg-opacity-25 text-spotify-green text-sm rounded-full border border-spotify-green border-opacity-40" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
              Open until {new Date(post.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Join Button */}
      <div className="flex items-center justify-between pt-3 border-t border-elegant-border">
        <div className="text-sm text-spotify-text-dim" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
          Deadline: {new Date(post.deadline).toLocaleString()}
        </div>
        <button
          onClick={handleJoin}
          disabled={!canJoin}
          className={`px-5 py-2.5 rounded-lg text-base transition-all duration-200 shadow-premium ${
            canJoin
              ? 'bg-spotify-green text-white hover:bg-spotify-green-hover hover:shadow-elegant'
              : 'bg-spotify-light-gray text-spotify-text-dim cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
        >
          {hasJoined ? 'Joined ✓' : isFull ? 'Full' : isDeadlinePast ? 'Closed' : 'Join'}
        </button>
      </div>
    </div>
  );
};

