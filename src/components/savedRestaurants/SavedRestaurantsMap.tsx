import React, { useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SavedRestaurantsMapProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  onMarkerClick: (restaurant: SavedRestaurant) => void;
  centerLocation?: { lat: number; lng: number } | null; // External control for map centering
  centerZoom?: number; // Zoom level when centering
}

export const SavedRestaurantsMap: React.FC<SavedRestaurantsMapProps> = ({
  restaurants,
  selectedRestaurant,
  onMarkerClick,
  centerLocation,
  centerZoom = 16,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const searchMarkerRef = useRef<google.maps.Marker | null>(null); // Marker for search results

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
  }, [isLoaded]);

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Create markers for saved restaurants only
    const savedRestaurants = restaurants.filter((r) => r.isSaved);

    if (savedRestaurants.length === 0) return;

    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();

    savedRestaurants.forEach((restaurant) => {
      const position = { lat: restaurant.lat, lng: restaurant.lng };

      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: restaurant.name,
        animation: selectedRestaurant?.id === restaurant.id ? google.maps.Animation.BOUNCE : undefined,
      });

      // Add click listener
      marker.addListener('click', () => {
        onMarkerClick(restaurant);
      });

      markersRef.current.set(restaurant.id, marker);
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (savedRestaurants.length > 1) {
      mapInstanceRef.current.fitBounds(bounds);
    } else if (savedRestaurants.length === 1) {
      mapInstanceRef.current.setCenter({ lat: savedRestaurants[0].lat, lng: savedRestaurants[0].lng });
      mapInstanceRef.current.setZoom(15);
    }
  }, [restaurants, isLoaded, selectedRestaurant, onMarkerClick]);

  // Center map on selected restaurant or external location
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    if (centerLocation) {
      // External control (e.g., from search)
      mapInstanceRef.current.setCenter(centerLocation);
      mapInstanceRef.current.setZoom(centerZoom);

      // Show a marker for search result if it's not a saved restaurant
      if (selectedRestaurant && !selectedRestaurant.isSaved) {
        // Remove previous search marker
        if (searchMarkerRef.current) {
          searchMarkerRef.current.setMap(null);
        }

        // Create new marker for search result
        searchMarkerRef.current = new google.maps.Marker({
          position: centerLocation,
          map: mapInstanceRef.current,
          title: selectedRestaurant.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#FF6B35',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          },
          animation: google.maps.Animation.DROP,
        });
      } else {
        // Remove search marker if restaurant is saved (will be shown by regular marker)
        if (searchMarkerRef.current) {
          searchMarkerRef.current.setMap(null);
          searchMarkerRef.current = null;
        }
      }
      return;
    }

    if (selectedRestaurant) {
      // Center on selected restaurant
      const position = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng };
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(16);

      // Highlight selected marker
      markersRef.current.forEach((marker, id) => {
        if (id === selectedRestaurant.id) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 2000);
        }
      });

      // Remove search marker if restaurant is saved
      if (selectedRestaurant.isSaved && searchMarkerRef.current) {
        searchMarkerRef.current.setMap(null);
        searchMarkerRef.current = null;
      }
    }
  }, [selectedRestaurant, centerLocation, centerZoom, isLoaded]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-text-secondary">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

