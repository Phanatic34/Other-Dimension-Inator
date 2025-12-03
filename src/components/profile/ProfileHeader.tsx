import React from 'react';
import { UserProfile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
  onEditClick?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isOwnProfile = false,
  onEditClick,
}) => {
  return (
    <div className="bg-bg-card border-b border-border-color">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gray-200 overflow-hidden">
        <img
          src={profile.coverImageUrl}
          alt={`${profile.displayName}'s cover`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info Section */}
      <div className="px-4 md:px-6 pb-4">
        {/* Avatar - overlaps cover */}
        <div className="relative -mt-16 md:-mt-20 mb-4">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-bg-card bg-bg-card overflow-hidden shadow-lg">
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
              {profile.displayName}
            </h1>
            <p className="text-text-secondary text-base mb-2">
              @{profile.username}
            </p>
            {profile.joinedDate && (
              <p className="text-text-secondary text-sm mb-3">
                Joined {profile.joinedDate}
              </p>
            )}
            {profile.bio && (
              <p className="text-text-primary text-base mb-3">
                {profile.bio}
              </p>
            )}
            
            {/* Following / Followers */}
            <div className="flex gap-4 text-sm">
              <span className="text-text-primary">
                <span className="font-semibold">{profile.followingCount}</span>
                <span className="text-text-secondary ml-1">Following</span>
              </span>
              <span className="text-text-primary">
                <span className="font-semibold">{profile.followersCount}</span>
                <span className="text-text-secondary ml-1">Followers</span>
              </span>
            </div>
          </div>

          {/* Edit Profile Button */}
          {isOwnProfile && (
            <button
              onClick={onEditClick}
              className="px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
            >
              Edit profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

