import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { PlaceSuggestion } from '../../types/placeSearch';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SearchWithAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectPlace: (place: PlaceSuggestion) => void;
  restaurants: SavedRestaurant[]; // To match with existing restaurants
  placeholder?: string;
}

export const SearchWithAutocomplete: React.FC<SearchWithAutocompleteProps> = ({
  value,
  onChange,
  onSelectPlace,
  restaurants,
  placeholder = '搜尋地點或餐廳…',
}) => {
  const { isLoaded } = useGoogleMaps();
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Default location: Taipei center
  const defaultLocation = { lat: 25.0330, lng: 121.5654 };

  // Initialize Google Maps services
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    if (!autocompleteServiceRef.current) {
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    }

    if (!placesServiceRef.current) {
      const dummyDiv = document.createElement('div');
      placesServiceRef.current = new google.maps.places.PlacesService(dummyDiv);
    }
  }, [isLoaded]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform autocomplete search
  const performSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!autocompleteServiceRef.current || trimmed.length < 2) {
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      // First, check local restaurants
      const localMatches: PlaceSuggestion[] = restaurants
        .filter(
          (r) =>
            r.name.toLowerCase().includes(trimmed.toLowerCase()) ||
            r.address.toLowerCase().includes(trimmed.toLowerCase())
        )
        .slice(0, 3)
        .map((r) => ({
          placeId: r.id,
          name: r.name,
          address: r.address,
          lat: r.lat,
          lng: r.lng,
        }));

      // Then, use Google Places Autocomplete
      const location = new google.maps.LatLng(defaultLocation.lat, defaultLocation.lng);
      const autocompleteRequest: google.maps.places.AutocompletionRequest = {
        input: trimmed,
        componentRestrictions: { country: 'tw' },
        types: ['establishment'],
        location: location,
        radius: 30000,
      };

      autocompleteServiceRef.current.getPlacePredictions(
        autocompleteRequest,
        (
          predictions: google.maps.places.AutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          setIsSearching(false);

          let googleSuggestions: PlaceSuggestion[] = [];
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            googleSuggestions = predictions.slice(0, 5).map((pred) => ({
              placeId: pred.place_id,
              name: pred.structured_formatting.main_text,
              address: pred.structured_formatting.secondary_text || '',
            }));
          }

          // Combine local and Google suggestions, prioritizing local
          const combined = [...localMatches, ...googleSuggestions];
          setSuggestions(combined);
          setShowSuggestions(combined.length > 0);
        }
      );
    },
    [restaurants, defaultLocation.lat, defaultLocation.lng]
  );

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim().length >= 2 && isLoaded) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [value, isLoaded, performSearch]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion: PlaceSuggestion) => {
    setShowSuggestions(false);
    onChange(suggestion.name);

    // If suggestion has coordinates, use them directly
    if (suggestion.lat && suggestion.lng) {
      onSelectPlace(suggestion);
      return;
    }

    // Otherwise, get place details from Google Places
    if (placesServiceRef.current && suggestion.placeId) {
      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: suggestion.placeId,
        fields: ['name', 'formatted_address', 'geometry', 'place_id'],
      };

      placesServiceRef.current.getDetails(
        request,
        (
          place: google.maps.places.PlaceResult | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();

            if (lat && lng) {
              onSelectPlace({
                placeId: suggestion.placeId,
                name: place.name || suggestion.name,
                address: place.formatted_address || suggestion.address,
                lat,
                lng,
              });
            }
          }
        }
      );
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className="block w-full pl-11 pr-10 py-2.5 border border-border-color rounded-full bg-bg-card text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50 focus:border-accent-primary focus:outline-none text-base shadow-md transition-all duration-300"
          style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {isSearching && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-12">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-primary"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-bg-card rounded-lg shadow-lg border border-border-color max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.placeId || index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-bg-hover transition-colors border-b border-border-color last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-text-secondary mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate">{suggestion.name}</p>
                  <p className="text-text-secondary text-xs truncate">{suggestion.address}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

