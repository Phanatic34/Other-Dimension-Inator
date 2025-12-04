import { useEffect, useState } from 'react';

interface UseGoogleMapsReturn {
  isLoaded: boolean;
  loadError: Error | null;
}

/**
 * Hook to load Google Maps JavaScript SDK with Places library
 * Loads the SDK only once and provides loading state
 */
export function useGoogleMaps(): UseGoogleMapsReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  useEffect(() => {
    // Check if already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      'script[src*="maps.googleapis.com"]'
    );
    if (existingScript) {
      existingScript.addEventListener('load', () => setIsLoaded(true));
      existingScript.addEventListener('error', (e) =>
        setLoadError(new Error('Failed to load Google Maps'))
      );
      return;
    }

    // Get API key from environment (Create React App uses REACT_APP_ prefix)
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setLoadError(
        new Error(
          'REACT_APP_GOOGLE_MAPS_API_KEY is not defined in .env.local'
        )
      );
      return;
    }

    // Create and load script
    // language=zh-TW sets UI language to Chinese, region=TW sets region to Taiwan
    // User can still type English queries and get results
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=zh-TW&region=TW`;
    script.async = true;
    script.defer = true;

    script.addEventListener('load', () => {
      setIsLoaded(true);
      // Note: You may see "ERR_BLOCKED_BY_CLIENT" errors for Google's gen_204 endpoint
      // This is caused by ad blockers and is harmless - Maps will still work correctly
    });

    script.addEventListener('error', () => {
      setLoadError(new Error('Failed to load Google Maps JavaScript SDK'));
    });

    document.head.appendChild(script);

    return () => {
      // Cleanup if needed (though we generally want to keep the script loaded)
    };
  }, []);

  return { isLoaded, loadError };
}

