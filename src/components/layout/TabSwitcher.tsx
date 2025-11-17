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
    <div className="border-b border-stone-200 bg-bg-secondary sticky top-16 z-10 transition-colors duration-300 shadow-sm">
      <div className="flex items-center justify-between px-5 py-4">
        {/* Tabs */}
        <div className="flex space-x-2">
          <button
            onClick={() => onTabChange('reviews')}
            className={`px-5 py-3 text-base rounded-lg transition-all duration-200 ${
              activeTab === 'reviews'
                ? 'text-accent-primary border-b-3 border-accent-primary bg-bg-card shadow-sm font-bold'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            評價貼文串
          </button>
          <button
            onClick={() => onTabChange('meetups')}
            className={`px-5 py-3 text-base rounded-lg transition-all duration-200 ${
              activeTab === 'meetups'
                ? 'text-accent-primary border-b-3 border-accent-primary bg-bg-card shadow-sm font-bold'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            揪吃飯貼文串
          </button>
        </div>

        {/* All / Following Toggle */}
        <div className="flex items-center space-x-2 bg-bg-card rounded-lg p-1 shadow-sm">
          <button
            onClick={() => onFeedFilterChange('all')}
            className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
              feedFilter === 'all'
                ? 'bg-accent-gold text-text-primary shadow-md font-bold'
                : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
            }`}
            style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
          >
            All
          </button>
          <button
            onClick={() => onFeedFilterChange('following')}
            className={`px-4 py-2 text-sm rounded-md transition-all duration-200 ${
              feedFilter === 'following'
                ? 'bg-accent-gold text-text-primary shadow-md font-bold'
                : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
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

