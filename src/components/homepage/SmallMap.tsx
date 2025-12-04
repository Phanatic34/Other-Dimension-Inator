import React, { useEffect, useRef } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { useLocationPreview } from '../../contexts/LocationPreviewContext';

export const SmallMap: React.FC = () => {
  const { selectedLocation } = useLocationPreview();
  const { isLoaded, loadError } = useGoogleMaps();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    // Guard: Google SDK not loaded or container not ready
    if (!isLoaded || !window.google || !containerRef.current) return;

    // Only create the map once
    if (!mapInstanceRef.current) {
      // Ensure the container is a valid DOM element
      const containerElement = containerRef.current;
      if (!(containerElement instanceof HTMLElement)) {
        console.warn('Container ref is not a valid HTMLElement');
        return;
      }

      // Ensure the element is in the document
      if (!document.contains(containerElement)) {
        // Wait for next frame to ensure element is mounted
        requestAnimationFrame(() => {
          if (!containerRef.current || !document.contains(containerRef.current) || mapInstanceRef.current) return;
          
          const defaultCenter = { lat: 25.0330, lng: 121.5654 };
          try {
            mapInstanceRef.current = new google.maps.Map(containerRef.current, {
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
          } catch (error) {
            console.error('Error initializing Google Maps:', error);
          }
        });
        return;
      }

      // Default center: Taipei
      const defaultCenter = { lat: 25.0330, lng: 121.5654 };

      try {
        mapInstanceRef.current = new google.maps.Map(containerElement, {
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
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
      }
    }
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
      <div className="w-full rounded-3xl bg-bg-card shadow-md p-5">
        <h3 className="text-lg font-bold text-text-primary mb-3" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
          Location Preview
        </h3>
        <div className="mt-3 w-full h-[260px] bg-gray-100 rounded-2xl flex items-center justify-center">
          <p className="text-text-secondary text-sm">無法載入地圖：{loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full rounded-3xl bg-bg-card shadow-md p-5">
        <h3 className="text-lg font-bold text-text-primary mb-3" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
          Location Preview
        </h3>
        <div className="mt-3 w-full h-[260px] bg-gray-100 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-2"></div>
            <p className="text-text-secondary text-xs">載入地圖中...</p>
          </div>
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
    <div id="location-preview-panel" className="w-full max-w-full rounded-3xl bg-bg-card shadow-md p-5">
      <h3 className="text-lg font-bold text-text-primary mb-3" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        Location Preview
      </h3>
      {selectedLocation ? (
        <div className="mb-3">
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
        <p className="text-sm text-text-secondary mb-3">Select a restaurant location to preview it here</p>
      )}
      <div className="mt-3 w-full max-w-full overflow-hidden rounded-2xl">
        <div ref={containerRef} className="w-full h-[260px]" />
      </div>
    </div>
  );
};

