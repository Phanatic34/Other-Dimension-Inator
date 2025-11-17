import React from 'react';

interface TabSwitcherProps {
  activeTab: 'reviews' | 'meetups';
  onTabChange: (tab: 'reviews' | 'meetups') => void;
  feedFilter: 'all' | 'following';
  onFeedFilterChange: (filter: 'all' | 'following') => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  activeTab,
  onTabChange,
  feedFilter,
  onFeedFilterChange,
}) => {
  return (
    <div className="border-b border-elegant-border bg-spotify-dark sticky top-16 z-10 shadow-elegant">
      <div className="flex items-center justify-between px-5 py-4">
        {/* Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => onTabChange('reviews')}
            className={`px-5 py-2.5 text-base rounded-lg transition-all duration-200 ${
              activeTab === 'reviews'
                ? 'text-spotify-green border-b-2 border-spotify-green bg-spotify-gray bg-opacity-30'
                : 'text-spotify-text-dim hover:text-spotify-text hover:bg-elegant-hover'
            }`}
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            評價貼文串
          </button>
          <button
            onClick={() => onTabChange('meetups')}
            className={`px-5 py-2.5 text-base rounded-lg transition-all duration-200 ${
              activeTab === 'meetups'
                ? 'text-spotify-green border-b-2 border-spotify-green bg-spotify-gray bg-opacity-30'
                : 'text-spotify-text-dim hover:text-spotify-text hover:bg-elegant-hover'
            }`}
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            揪吃飯貼文串
          </button>
        </div>

        {/* All / Following Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onFeedFilterChange('all')}
            className={`px-4 py-2 text-base rounded-lg transition-all duration-200 ${
              feedFilter === 'all'
                ? 'bg-spotify-gray text-spotify-text shadow-premium border border-spotify-green border-opacity-50'
                : 'text-spotify-text-dim hover:bg-elegant-hover hover:text-spotify-text'
            }`}
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            All
          </button>
          <button
            onClick={() => onFeedFilterChange('following')}
            className={`px-4 py-2 text-base rounded-lg transition-all duration-200 ${
              feedFilter === 'following'
                ? 'bg-spotify-gray text-spotify-text shadow-premium border border-spotify-green border-opacity-50'
                : 'text-spotify-text-dim hover:bg-elegant-hover hover:text-spotify-text'
            }`}
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            Following
          </button>
        </div>
      </div>
    </div>
  );
};

