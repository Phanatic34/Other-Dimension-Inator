import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-bg-primary transition-colors duration-300 flex flex-col overflow-hidden">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
        showSearch={false}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4 flex-shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content - Full height with independent scrolling for sidebars */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0 h-full overflow-hidden">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchWithAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectPlace={handleSelectPlace}
              restaurants={restaurants}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
                centerLocation={mapCenter}
                centerZoom={mapZoom}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0 h-full overflow-hidden">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

