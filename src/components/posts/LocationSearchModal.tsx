import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';

interface LocationResult {
  restaurantName: string;
  address: string;
  lat: number;
  lng: number;
  region?: string; // e.g. "大安區", "Tianmu"
}

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (location: LocationResult) => void;
}

interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
  region?: string;
}

const MAX_LOCATION_RESULTS = 8;

/**
 * Instagram-style location search modal with Google Places integration
 * Features: search, list of results, map preview, manual entry fallback
 */
export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const [searchQuery, setSearchQuery] = useState('');
  const [places, setPlaces] = useState<PlaceResult[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualAddress, setManualAddress] = useState('');
  const [manualLat, setManualLat] = useState<number | null>(null);
  const [manualLng, setManualLng] = useState<number | null>(null);
  const [manualRegion, setManualRegion] = useState<string>('');

  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  
  // Default location: Taipei center (for location bias in search)
  const defaultLocation = { lat: 25.0330, lng: 121.5654 }; // Taipei 101 area

  // Initialize Google Maps services
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    if (!autocompleteServiceRef.current) {
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    }

    // Initialize PlacesService with a dummy div if not already initialized
    if (!placesServiceRef.current) {
      const dummyDiv = document.createElement('div');
      placesServiceRef.current = new google.maps.places.PlacesService(dummyDiv);
    }

    // Initialize Geocoder for reverse geocoding
    if (!geocoderRef.current) {
      geocoderRef.current = new google.maps.Geocoder();
    }
  }, [isLoaded]);

  // Search function with Autocomplete + Text Search fallback
  const performSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!autocompleteServiceRef.current || !trimmed) {
        setPlaces([]);
        return;
      }

      setIsSearching(true);

      // Location bias: use default location (Taipei center)
      const location = new google.maps.LatLng(defaultLocation.lat, defaultLocation.lng);

      // Step 1: Autocomplete search
      const autocompleteRequest: google.maps.places.AutocompletionRequest = {
        input: trimmed,
        componentRestrictions: { country: 'tw' },
        types: ['establishment'],
        location: location,
        radius: 30000, // 30km radius for location bias
      };

      autocompleteServiceRef.current.getPlacePredictions(
        autocompleteRequest,
        (
          predictions: google.maps.places.AutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          // Optional debug logging in development
          if (process.env.NODE_ENV === 'development') {
            console.debug('[Autocomplete]', status, predictions?.length ?? 0);
          }

          let autocompleteResults: PlaceResult[] = [];
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            autocompleteResults = predictions.map((pred) => ({
              placeId: pred.place_id,
              name: pred.structured_formatting.main_text,
              address: pred.structured_formatting.secondary_text || '',
            }));
          }

          // Step 2: If Autocomplete results are few (< 5), add Text Search fallback
          if (autocompleteResults.length < 5 && placesServiceRef.current) {
            const textSearchRequest: google.maps.places.TextSearchRequest = {
              query: trimmed,
              type: 'restaurant',
              location: location,
              radius: 30000,
            };

            placesServiceRef.current.textSearch(
              textSearchRequest,
              (
                textResults: google.maps.places.PlaceResult[] | null,
                textStatus: google.maps.places.PlacesServiceStatus
              ) => {
                setIsSearching(false);

                if (process.env.NODE_ENV === 'development') {
                  console.debug('[TextSearch]', textStatus, textResults?.length ?? 0);
                }

                let textSearchResults: PlaceResult[] = [];
                if (
                  textStatus === google.maps.places.PlacesServiceStatus.OK &&
                  textResults
                ) {
                  // Set explicitly typed as Set<string>
                  const autocompletePlaceIds = new Set<string>(
                    autocompleteResults.map((r) => r.placeId)
                  );

                  // Filter out results without place_id or geometry
                  const filteredTextResults =
                    textResults.filter(
                      (result) => result.place_id && result.geometry?.location
                    ) ?? [];

                  // Filter out duplicates and convert to PlaceResult
                  textSearchResults = filteredTextResults
                    .filter((result) => !autocompletePlaceIds.has(result.place_id!))
                    .map((result): PlaceResult => ({
                      placeId: result.place_id!, // ! assertion: already filtered above
                      name: result.name ?? '',
                      address: result.formatted_address ?? '',
                      lat: result.geometry!.location!.lat(), // ! assertion: already filtered above
                      lng: result.geometry!.location!.lng(), // ! assertion: already filtered above
                    }));
                }

                // Combine: Autocomplete first (more precise), then Text Search
                const combined: PlaceResult[] = [
                  ...autocompleteResults,
                  ...textSearchResults,
                ];

                // Deduplicate by placeId
                const seen = new Set<string>();
                const unique = combined.filter((place) => {
                  if (!place.placeId || seen.has(place.placeId)) return false;
                  seen.add(place.placeId);
                  return true;
                });

                // Cap at MAX_LOCATION_RESULTS
                setPlaces(unique.slice(0, MAX_LOCATION_RESULTS));
              }
            );
          } else {
            // Enough Autocomplete results, no need for Text Search
            setIsSearching(false);
            // Cap at MAX_LOCATION_RESULTS
            setPlaces(autocompleteResults.slice(0, MAX_LOCATION_RESULTS));
          }
        }
      );
    },
    [defaultLocation.lat, defaultLocation.lng]
  );

  // Debounced search - trigger when query length >= 2
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    
    if (trimmedQuery.length < 2 || !isLoaded || !autocompleteServiceRef.current) {
      setPlaces([]);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for debounce (300ms)
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(trimmedQuery);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, isLoaded, performSearch]);

  // Show map preview with marker
  const showMapPreview = useCallback((lat: number, lng: number) => {
    // Guard: Google SDK not loaded or container not ready
    if (!isLoaded || !window.google || !containerRef.current) return;

    // Ensure the container is a valid DOM element
    const containerElement = containerRef.current;
    if (!(containerElement instanceof HTMLElement) || !document.contains(containerElement)) {
      console.warn('Container ref is not a valid HTMLElement or not in document');
      return;
    }

    // Initialize map if not already
    if (!mapInstanceRef.current) {
      try {
        mapInstanceRef.current = new google.maps.Map(containerElement, {
          center: { lat, lng },
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
        });
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        return;
      }
    } else {
      mapInstanceRef.current.setCenter({ lat, lng });
    }

    // Remove old marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    // Add new marker
    markerRef.current = new google.maps.Marker({
      position: { lat, lng },
      map: mapInstanceRef.current,
      title: 'Selected location',
    });
  }, [isLoaded]);

  // Fetch place details when a place is selected
  const fetchPlaceDetails = useCallback((placeId: string) => {
    if (!placesServiceRef.current) return;

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId,
      fields: ['name', 'formatted_address', 'geometry', 'address_components'],
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

          // Extract region from address components
          const comps = place.address_components ?? [];
          const districtComp =
            comps.find((c) => c.types.includes('sublocality_level_1')) ||
            comps.find((c) => c.types.includes('administrative_area_level_3')) ||
            comps.find((c) => c.types.includes('locality'));
          const regionName = districtComp?.long_name ?? '';

          const selectedResult: PlaceResult & { region?: string } = {
            placeId,
            name: place.name || '',
            address: place.formatted_address || '',
            lat,
            lng,
            region: regionName || undefined,
          };

          setSelectedPlace(selectedResult);

          // Update map if coordinates available
          if (lat !== undefined && lng !== undefined) {
            showMapPreview(lat, lng);
          }

          // Automatically select location and close modal when details are fetched
          if (lat !== undefined && lng !== undefined) {
            onSelectLocation({
              restaurantName: selectedResult.name,
              address: selectedResult.address,
              lat: selectedResult.lat!,
              lng: selectedResult.lng!,
              region: selectedResult.region,
            });
            // Close modal - reset state and call onClose
            setSearchQuery('');
            setPlaces([]);
            setSelectedPlace(null);
            setShowManualEntry(false);
            setManualName('');
            setManualAddress('');
            setManualLat(null);
            setManualLng(null);
            setManualRegion('');
            if (mapInstanceRef.current) {
              mapInstanceRef.current = null;
            }
            if (markerRef.current) {
              markerRef.current = null;
            }
            onClose();
          }
        }
      }
    );
  }, [showMapPreview, onSelectLocation, onClose]);

  const handlePlaceClick = (place: PlaceResult) => {
    setSelectedPlace(place);
    fetchPlaceDetails(place.placeId);
  };

  const handleClose = useCallback(() => {
    // Reset state
    setSearchQuery('');
    setPlaces([]);
    setSelectedPlace(null);
    setShowManualEntry(false);
    setManualName('');
    setManualAddress('');
    setManualLat(null);
    setManualLng(null);
    setManualRegion('');
    if (mapInstanceRef.current) {
      mapInstanceRef.current = null;
    }
    if (markerRef.current) {
      markerRef.current = null;
    }
    onClose();
  }, [onClose]);

  const handleConfirmLocation = () => {
    if (selectedPlace && selectedPlace.lat && selectedPlace.lng) {
      onSelectLocation({
        restaurantName: selectedPlace.name,
        address: selectedPlace.address,
        lat: selectedPlace.lat,
        lng: selectedPlace.lng,
        region: selectedPlace.region,
      });
      handleClose();
    }
  };

  const handleManualEntryClick = () => {
    setShowManualEntry(true);
  };

  // Centralized manual location update with reverse geocoding
  const updateManualLocation = useCallback(
    (lat: number, lng: number) => {
      setManualLat(lat);
      setManualLng(lng);

      // Reverse geocode using google.maps.Geocoder
      if (geocoderRef.current) {
        const latlng: google.maps.LatLngLiteral = { lat, lng };

        geocoderRef.current.geocode(
          { location: latlng },
          (
            results: google.maps.GeocoderResult[] | null,
            status: google.maps.GeocoderStatus
          ) => {
            if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
              const top = results[0];

              // 1) Fill 餐廳地址 * input with formatted address
              setManualAddress(top.formatted_address);

              // 2) Extract nearest area / district for later display
              const comps = top.address_components ?? [];
              const districtComp =
                comps.find((c) => c.types.includes('sublocality_level_1')) ||
                comps.find((c) => c.types.includes('administrative_area_level_3')) ||
                comps.find((c) => c.types.includes('locality'));

              const regionName = districtComp?.long_name ?? '';
              setManualRegion(regionName);
            }
          }
        );
      }
    },
    []
  );

  // Show map preview for manual entry
  const showMapPreviewManual = useCallback((lat: number, lng: number, handleManualMapClick: (e: google.maps.MapMouseEvent) => void) => {
    // Guard: Google SDK not loaded or container not ready
    if (!isLoaded || !window.google || !containerRef.current) return;

    // Ensure the container is a valid DOM element
    const containerElement = containerRef.current;
    if (!(containerElement instanceof HTMLElement) || !document.contains(containerElement)) {
      console.warn('Container ref is not a valid HTMLElement or not in document');
      return;
    }

    if (!mapInstanceRef.current) {
      try {
        mapInstanceRef.current = new google.maps.Map(containerElement, {
          center: { lat, lng },
          zoom: 15,
          disableDefaultUI: true,
          zoomControl: true,
        });
        mapInstanceRef.current.addListener('click', handleManualMapClick);
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
        return;
      }
    } else {
      mapInstanceRef.current.setCenter({ lat, lng });
    }

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    markerRef.current = new google.maps.Marker({
      position: { lat, lng },
      map: mapInstanceRef.current,
      draggable: true,
    });

    markerRef.current.addListener('dragend', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        updateManualLocation(lat, lng);
      }
    });
  }, [isLoaded, updateManualLocation]);

  const handleManualMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      updateManualLocation(lat, lng);
      showMapPreviewManual(lat, lng, handleManualMapClick);
    },
    [showMapPreviewManual, updateManualLocation]
  );

  const handleConfirmManual = () => {
    if (
      manualName.trim() &&
      manualAddress.trim() &&
      manualLat !== null &&
      manualLng !== null
    ) {
      onSelectLocation({
        restaurantName: manualName,
        address: manualAddress,
        lat: manualLat,
        lng: manualLng,
        region: manualRegion || undefined,
      });
      handleClose();
    }
  };

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, handleClose]);

  // Initialize manual entry map with default location (Taipei)
  useEffect(() => {
    if (showManualEntry && isLoaded && containerRef.current) {
      const defaultLat = 25.0330;
      const defaultLng = 121.5654;
      updateManualLocation(defaultLat, defaultLng);
      showMapPreviewManual(defaultLat, defaultLng, handleManualMapClick);
    }
  }, [showManualEntry, isLoaded, showMapPreviewManual, handleManualMapClick, updateManualLocation]);

  if (!isOpen) return null;

  if (loadError) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-2xl p-6 max-w-md">
          <h3 className="text-lg font-bold text-red-600 mb-2">Error</h3>
          <p className="text-text-secondary mb-4">{loadError.message}</p>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-text-secondary">Loading Google Maps...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-text-primary">
            {showManualEntry ? '手動新增地點' : '選擇餐廳位置'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {!showManualEntry ? (
          <>
            {/* Search Input */}
            <div className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋餐廳名稱或地址..."
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent text-base"
                  autoFocus
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Results List - Scrollable area that takes up most of the height */}
            <div className="mt-4 px-6 flex-1 min-h-[260px] max-h-[60vh] overflow-y-auto flex-shrink-0">
              {isSearching ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                    <p className="text-sm text-text-secondary">搜尋中...</p>
                  </div>
                </div>
              ) : places.length > 0 ? (
                <ul className="divide-y divide-neutral-100">
                  {places.map((place) => (
                    <li
                      key={place.placeId}
                      onClick={() => handlePlaceClick(place)}
                      className={`cursor-pointer px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedPlace?.placeId === place.placeId
                          ? 'bg-accent-gold bg-opacity-10'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-text-primary truncate">
                            {place.name}
                          </div>
                          <div className="mt-0.5 text-xs text-text-secondary truncate">
                            {place.address}
                          </div>
                        </div>
                        {selectedPlace?.placeId === place.placeId && (
                          <svg
                            className="w-5 h-5 text-accent-gold flex-shrink-0 ml-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : searchQuery.trim() !== '' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-sm text-text-secondary mb-3">找不到餐廳，試試其他關鍵字</p>
                  <button
                    onClick={handleManualEntryClick}
                    className="px-4 py-2 border-2 border-accent-gold text-accent-primary rounded-full font-semibold hover:bg-accent-gold hover:bg-opacity-10 transition-colors text-xs"
                  >
                    手動新增地點
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-text-secondary mb-2">開始輸入餐廳名稱或地址</p>
                  <p className="text-xs text-text-secondary opacity-70">
                    搜尋結果將顯示在此處
                  </p>
                </div>
              )}
            </div>

            {/* Map Preview - shown when place is selected */}
            {selectedPlace && selectedPlace.lat && selectedPlace.lng && (
              <div className="border-t border-gray-200 flex-shrink-0">
                <div
                  ref={containerRef}
                  className="w-full h-48"
                  style={{ minHeight: '192px' }}
                />
              </div>
            )}

            {/* Footer - Confirm Button and Manual Entry Option */}
            <div className="mt-6 pt-4 px-6 pb-4 border-t border-neutral-200 flex flex-col gap-3 flex-shrink-0">
              {!selectedPlace && searchQuery.trim() !== '' && places.length === 0 && (
                <button
                  onClick={handleManualEntryClick}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  找不到餐廳？手動新增地點
                </button>
              )}
              <button
                onClick={handleConfirmLocation}
                disabled={!selectedPlace || !selectedPlace.lat || !selectedPlace.lng}
                className={`w-full py-3 rounded-full font-semibold text-white transition-colors ${
                  selectedPlace && selectedPlace.lat && selectedPlace.lng
                    ? 'bg-accent-primary hover:brightness-110'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Add location
              </button>
            </div>
          </>
        ) : (
          /* Manual Entry Mode */
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  餐廳名稱 *
                </label>
                <input
                  type="text"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="例：阿嬤的小吃店"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  餐廳地址 *
                </label>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  placeholder="例：台北市大安區羅斯福路..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  在地圖上點選位置 *
                </label>
                <p className="text-xs text-text-secondary mb-2">
                  點擊地圖或拖動標記來設定餐廳位置
                </p>
                <div
                  ref={containerRef}
                  className="w-full h-64 rounded-lg border border-gray-300"
                />
                {manualLat !== null && manualLng !== null && (
                  <p className="text-xs text-text-secondary mt-2">
                    座標: {manualLat.toFixed(6)}, {manualLng.toFixed(6)}
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowManualEntry(false)}
                className="flex-1 py-3 rounded-full font-semibold border-2 border-gray-300 text-text-secondary hover:bg-gray-50 transition-colors"
              >
                返回
              </button>
              <button
                onClick={handleConfirmManual}
                disabled={
                  !manualName.trim() ||
                  !manualAddress.trim() ||
                  manualLat === null ||
                  manualLng === null
                }
                className={`flex-1 py-3 rounded-full font-semibold text-white transition-colors ${
                  manualName.trim() &&
                  manualAddress.trim() &&
                  manualLat !== null &&
                  manualLng !== null
                    ? 'bg-accent-primary hover:brightness-110'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                確認新增
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
