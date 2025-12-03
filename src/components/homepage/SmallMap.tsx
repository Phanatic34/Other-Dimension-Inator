import React, { useEffect, useRef } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { RestaurantLocation } from '../../types/location';

interface SmallMapProps {
  selectedLocation: RestaurantLocation | null;
}

export const SmallMap: React.FC<SmallMapProps> = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    });
  }, [isLoaded]);

  // Update map when location is selected
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    if (selectedLocation) {
      // Center map on selected location
      const position = { lat: selectedLocation.lat, lng: selectedLocation.lng };
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(16);

      // Remove previous marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Create new marker
      markerRef.current = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: selectedLocation.name,
        animation: google.maps.Animation.DROP,
      });
    } else {
      // Reset to default view when no location is selected
      const defaultCenter = { lat: 25.0330, lng: 121.5654 };
      mapInstanceRef.current.setCenter(defaultCenter);
      mapInstanceRef.current.setZoom(13);

      // Remove marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    }
  }, [selectedLocation, isLoaded]);

  if (loadError) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-text-secondary text-sm">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-2"></div>
          <p className="text-text-secondary text-xs">載入地圖中...</p>
        </div>
      </div>
    );
  }

  // Handler to open in Google Maps
  const handleOpenInGoogleMaps = () => {
    if (selectedLocation) {
      const query = `${selectedLocation.name} ${selectedLocation.address || ''}`.trim();
      const url = selectedLocation.lat && selectedLocation.lng
        ? `https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-bg-card rounded-2xl border border-border-color p-4 shadow-sm">
      <h3 className="text-lg font-bold text-text-primary mb-3" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        Location Preview
      </h3>
      {selectedLocation ? (
        <div className="mb-2">
          <p className="text-sm font-semibold text-text-primary">{selectedLocation.name}</p>
          {selectedLocation.address && (
            <p className="text-xs text-text-secondary mt-1">{selectedLocation.address}</p>
          )}
          <button
            onClick={handleOpenInGoogleMaps}
            className="mt-2 text-xs text-accent-primary hover:underline font-medium"
          >
            在 Google 地圖中開啟
          </button>
        </div>
      ) : (
        <p className="text-sm text-text-secondary mb-2">Select a restaurant location to preview it here</p>
      )}
      <div ref={mapRef} className="w-full h-64 rounded-lg overflow-hidden" />
    </div>
  );
};

