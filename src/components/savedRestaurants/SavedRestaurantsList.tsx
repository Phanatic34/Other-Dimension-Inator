import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface SavedRestaurantsListProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  selectedStyles: string[];
  selectedCategories: string[];
  onRestaurantClick: (restaurant: SavedRestaurant) => void;
  onStyleToggle: (style: string) => void;
  onCategoryToggle: (category: string) => void;
}

export const SavedRestaurantsList: React.FC<SavedRestaurantsListProps> = ({
  restaurants,
  selectedRestaurant,
  selectedStyles,
  selectedCategories,
  onRestaurantClick,
  onStyleToggle,
  onCategoryToggle,
}) => {
  // Collapsible filter state
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Count active filters
  const activeFilterCount = selectedStyles.length + selectedCategories.length;

  // Filter restaurants based on selected styles and categories
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Only show saved restaurants in the list
    if (!restaurant.isSaved) return false;

    // Filter by styles
    if (selectedStyles.length > 0) {
      const hasMatchingStyle = restaurant.styles.some((style) => selectedStyles.includes(style));
      if (!hasMatchingStyle) return false;
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = restaurant.categories.some((category) => selectedCategories.includes(category));
      if (!hasMatchingCategory) return false;
    }

    return true;
  });

  return (
    <div className="h-full flex flex-col bg-bg-tertiary border-r border-border-color overflow-hidden">
      {/* Filters Section Header */}
      <div className="flex-shrink-0 border-b border-border-color">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-hover transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">篩選條件 Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-accent-primary text-white text-xs font-medium">
                {activeFilterCount}
              </span>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-text-secondary transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Collapsible Filters Content */}
        {filtersOpen && (
          <div className="p-4 border-t border-border-color">
            {/* Style Filter */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
              <div className="flex flex-wrap gap-2">
                {STYLE_OPTIONS.map((style) => {
                  const isSelected = selectedStyles.includes(style.label);
                  return (
                    <button
                      key={style.id}
                      onClick={() => onStyleToggle(style.label)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-accent-primary text-white'
                          : 'bg-white border border-gray-200 text-text-primary hover:bg-bg-hover'
                      }`}
                    >
                      {style.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((category) => {
                  const isSelected = selectedCategories.includes(category.label);
                  return (
                    <button
                      key={category.id}
                      onClick={() => onCategoryToggle(category.label)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        isSelected
                          ? 'bg-accent-primary text-white'
                          : 'bg-white border border-gray-200 text-text-primary hover:bg-bg-hover'
                      }`}
                    >
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        {filteredRestaurants.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-text-secondary text-sm">沒有找到餐廳</p>
          </div>
        ) : (
          <div className="divide-y divide-border-color">
            {filteredRestaurants.map((restaurant) => {
              const isSelected = selectedRestaurant?.id === restaurant.id;
              return (
                <button
                  key={restaurant.id}
                  onClick={() => onRestaurantClick(restaurant)}
                  className={`w-full text-left p-4 hover:bg-bg-hover transition-colors ${
                    isSelected ? 'bg-bg-card border-l-4 border-accent-primary' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Restaurant Icon */}
                    <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center flex-shrink-0">
                      <span className="text-text-primary text-lg">🍽️</span>
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary text-sm mb-1 truncate">{restaurant.name}</h4>
                      <p className="text-text-secondary text-xs mb-2 line-clamp-1">{restaurant.address}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {restaurant.styles.slice(0, 2).map((style, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {style}
                          </span>
                        ))}
                        {restaurant.categories.slice(0, 1).map((category, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

