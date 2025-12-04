import React, { useState } from 'react';
import { RecommendedUser } from '../../types/profile';

interface YouMightLikeProps {
  recommendedUsers: RecommendedUser[];
}

export const YouMightLike: React.FC<YouMightLikeProps> = ({ recommendedUsers }) => {
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});

  const handleFollow = (userId: string) => {
    setFollowingStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
    // TODO: In production, call API to follow/unfollow user
    // await fetch(`/api/users/${userId}/follow`, { method: 'POST' });
  };

  const handleShowMore = () => {
    console.log('Show more recommended users');
    // TODO: In production, fetch more recommendations
  };

  if (recommendedUsers.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-full rounded-3xl bg-bg-card shadow-md p-5">
      <h3 className="text-xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        You might like
      </h3>
      
      <div className="space-y-4">
        {recommendedUsers.map((user) => {
          const isFollowing = followingStates[user.id] || false;
          
          return (
            <div key={user.id} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-secondary">
                      <span className="text-lg">👤</span>
                    </div>
                  )}
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate">
                    {user.displayName}
                  </p>
                  <p className="text-text-secondary text-sm truncate">
                    @{user.username}
                  </p>
                  {user.bio && (
                    <p className="text-text-secondary text-xs mt-1 line-clamp-2">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Follow Button */}
              <button
                onClick={() => handleFollow(user.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${
                  isFollowing
                    ? 'bg-bg-card border border-border-color text-text-primary hover:bg-bg-hover'
                    : 'bg-accent-primary text-white hover:bg-accent-primary/90'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Show More Link */}
      <button
        onClick={handleShowMore}
        className="mt-4 text-accent-primary text-sm font-semibold hover:underline w-full text-left"
      >
        Show more
      </button>
    </div>
  );
};

