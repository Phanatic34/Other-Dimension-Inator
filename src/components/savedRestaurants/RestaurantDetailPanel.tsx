import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface RestaurantDetailPanelProps {
  restaurant: SavedRestaurant | null;
  onSave: (restaurant: SavedRestaurant, styles: string[], categories: string[]) => void;
  onUnsave: (restaurant: SavedRestaurant) => void;
}

export const RestaurantDetailPanel: React.FC<RestaurantDetailPanelProps> = ({
  restaurant,
  onSave,
  onUnsave,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Update selected tags when restaurant changes
  React.useEffect(() => {
    if (restaurant) {
      if (restaurant.isSaved) {
        // If already saved, use existing tags
        setSelectedStyles(restaurant.styles);
        setSelectedCategories(restaurant.categories);
      } else {
        // If not saved, start with empty selection
        setSelectedStyles([]);
        setSelectedCategories([]);
      }
    }
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="h-full flex items-center justify-center bg-bg-card border-l border-border-color">
        <p className="text-text-secondary text-center px-4">請選擇地圖上的餐廳或左側列表中的餐廳</p>
      </div>
    );
  }

  const toggleStyle = (styleLabel: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleLabel) ? prev.filter((s) => s !== styleLabel) : [...prev, styleLabel]
    );
  };

  const toggleCategory = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel) ? prev.filter((c) => c !== categoryLabel) : [...prev, categoryLabel]
    );
  };

  const handleSave = () => {
    if (selectedStyles.length === 0 || selectedCategories.length === 0) {
      alert('請至少選擇一個風格和一個類別');
      return;
    }
    onSave(restaurant, selectedStyles, selectedCategories);
  };

  const handleUnsave = () => {
    if (window.confirm('確定要取消收藏這個餐廳嗎？')) {
      onUnsave(restaurant);
    }
  };

  return (
    <div className="h-full flex flex-col bg-bg-card border-l border-border-color overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="p-6">
          {/* Restaurant Name */}
          <h2 className="text-2xl font-bold text-text-primary mb-2">{restaurant.name}</h2>

          {/* Address */}
          <div className="mb-4">
            <div className="flex items-start gap-2">
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
                className="text-text-secondary mt-0.5 flex-shrink-0"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p className="text-text-secondary text-sm">{restaurant.address}</p>
            </div>
          </div>

          {/* Rating & Price */}
          {(restaurant.rating || restaurant.priceLevel) && (
            <div className="flex items-center gap-4 mb-4">
              {restaurant.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-text-primary font-semibold">{restaurant.rating.toFixed(1)}</span>
                </div>
              )}
              {restaurant.priceLevel && (
                <span className="text-text-secondary text-sm">{restaurant.priceLevel}</span>
              )}
            </div>
          )}

          {/* Existing Tags (if saved) */}
          {restaurant.isSaved && (
            <div className="mb-6">
              {restaurant.styles.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.styles.map((style, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {restaurant.categories.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tag Selection (if not saved) */}
          {!restaurant.isSaved && (
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3">選擇風格 Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {STYLE_OPTIONS.map((style) => {
                    const isSelected = selectedStyles.includes(style.label);
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => toggleStyle(style.label)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
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

              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">選擇類別 Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map((category) => {
                    const isSelected = selectedCategories.includes(category.label);
                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => toggleCategory(category.label)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
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
      </div>

      {/* Fixed Action Buttons at Bottom */}
      <div className="flex-shrink-0 p-6 pt-4 border-t border-border-color bg-bg-card">
        {restaurant.isSaved ? (
          <button
            onClick={handleUnsave}
            className="w-full px-4 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            取消收藏
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={selectedStyles.length === 0 || selectedCategories.length === 0}
            className="w-full px-4 py-2.5 rounded-full bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            收藏
          </button>
        )}
      </div>
    </div>
  );
};

