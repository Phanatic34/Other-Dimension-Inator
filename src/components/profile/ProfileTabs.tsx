import React from 'react';
import { ProfileTab } from '../../types/profile';

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  postCounts?: {
    posts: number;
    likes: number;
    replies: number;
    reposts: number;
    bookmarks: number;
  };
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  postCounts,
}) => {
  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'posts', label: 'Posts' },
    { key: 'likes', label: 'Likes' },
    { key: 'replies', label: 'Replies' },
    { key: 'reposts', label: 'Reposts' },
    { key: 'bookmarks', label: 'Bookmarks' },
  ];

  return (
    <div className="border-b border-border-color bg-bg-secondary sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center overflow-x-auto scrollbar-hidden">
        {tabs.map((tab) => {
          const count = postCounts?.[tab.key];
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-4 md:px-6 py-4 text-base font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-accent-primary border-accent-primary'
                  : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border-color'
              }`}
              style={{
                fontFamily: activeTab === tab.key 
                  ? 'Garamond, Baskerville, Georgia, Times New Roman, serif' 
                  : 'inherit',
                fontWeight: activeTab === tab.key ? 900 : 600,
              }}
            >
              {tab.label}
              {count !== undefined && (
                <span className="ml-2 text-text-secondary text-sm font-normal">
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

