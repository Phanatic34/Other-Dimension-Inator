import React from 'react';
import { UserProfile } from '../../types/profile';

interface ProfileTagsProps {
  profile: UserProfile;
}

export const ProfileTags: React.FC<ProfileTagsProps> = ({ profile }) => {
  return (
    <div className="px-4 md:px-6 py-4 bg-bg-card border-b border-border-color">
      {/* Favorite Styles */}
      {profile.favoriteStyles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
            風格 Styles
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteStyles.map((style, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm text-text-primary"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Favorite Categories */}
      {profile.favoriteCategories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
            類別 Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteCategories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm text-text-primary"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

