import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecommendedUser } from '../../types/profile';
import { followUser, unfollowUser } from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';

interface YouMightLikeProps {
  recommendedUsers: RecommendedUser[];
}

export const YouMightLike: React.FC<YouMightLikeProps> = ({ recommendedUsers }) => {
  const navigate = useNavigate();
  const { user: currentUser, isAuthenticated } = useAuth();
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>(() => {
    // Initialize from the isFollowing property if available
    const initial: Record<string, boolean> = {};
    recommendedUsers.forEach(user => {
      initial[user.id] = (user as any).isFollowing || false;
    });
    return initial;
  });
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const handleFollow = async (userId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const isCurrentlyFollowing = followingStates[userId] || false;
    
    // Optimistic update
    setFollowingStates((prev) => ({
      ...prev,
      [userId]: !isCurrentlyFollowing,
    }));
    setLoadingStates((prev) => ({ ...prev, [userId]: true }));

    try {
      if (isCurrentlyFollowing) {
        await unfollowUser(userId);
      } else {
        await followUser(userId);
      }
    } catch (error) {
      // Revert on error
      setFollowingStates((prev) => ({
        ...prev,
        [userId]: isCurrentlyFollowing,
      }));
      console.error('Follow/unfollow error:', error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleShowMore = () => {
    console.log('Show more recommended users');
    // TODO: In production, fetch more recommendations
  };

  // Filter out current user from recommendations
  const filteredUsers = recommendedUsers.filter(user => {
    if (!currentUser) return true;
    return user.id !== currentUser.id;
  });

  if (filteredUsers.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-full rounded-3xl bg-bg-card shadow-md p-5">
      <h3 className="text-xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        You might like
      </h3>
      
      <div className="space-y-4">
        {filteredUsers.map((user) => {
          const isFollowing = followingStates[user.id] || false;
          const isLoading = loadingStates[user.id] || false;
          
          return (
            <div key={user.id} className="flex items-start justify-between gap-3">
              <div 
                className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer"
                onClick={() => navigate(`/user/${user.handle || user.username}`)}
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#722F37] text-white font-bold text-lg">
                      {user.displayName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate hover:underline">
                    {user.displayName}
                  </p>
                  <p className="text-text-secondary text-sm truncate">
                    @{user.handle || user.username}
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
                disabled={isLoading}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex-shrink-0 disabled:opacity-50 ${
                  isFollowing
                    ? 'bg-bg-card border border-border-color text-text-primary hover:bg-bg-hover'
                    : 'bg-accent-primary text-white hover:bg-accent-primary/90'
                }`}
              >
                {isLoading ? '...' : isFollowing ? 'Following' : 'Follow'}
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
