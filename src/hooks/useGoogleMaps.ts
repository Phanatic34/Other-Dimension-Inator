import { useEffect, useState } from 'react';

interface UseGoogleMapsReturn {
  isLoaded: boolean;
  loadError: Error | null;
}

/**
 * Hook to load Google Maps JavaScript SDK with Places library
 * Loads the SDK only once and provides loading state
 * Handles errors gracefully to prevent blocking the app
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
    ) as HTMLScriptElement;
    
    if (existingScript) {
      // If script exists, check if it's loaded
      if (window.google && window.google.maps) {
        setIsLoaded(true);
        return;
      }
      
      // Wait for existing script to load
      const handleLoad = () => {
        if (window.google && window.google.maps) {
          setIsLoaded(true);
        }
      };
      
      const handleError = () => {
        setLoadError(new Error('Failed to load Google Maps'));
        // Don't block the app - continue without Maps
        console.warn('Google Maps failed to load, but app will continue');
      };
      
      existingScript.addEventListener('load', handleLoad);
      existingScript.addEventListener('error', handleError);
      
      return () => {
        existingScript.removeEventListener('load', handleLoad);
        existingScript.removeEventListener('error', handleError);
      };
    }

    // Get API key from environment (Create React App uses REACT_APP_ prefix)
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('REACT_APP_GOOGLE_MAPS_API_KEY is not defined');
      setLoadError(
        new Error(
          'REACT_APP_GOOGLE_MAPS_API_KEY is not defined'
        )
      );
      // Don't block the app - continue without Maps
      return;
    }

    // Create and load script
    // language=zh-TW sets UI language to Chinese, region=TW sets region to Taiwan
    // User can still type English queries and get results
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=zh-TW&region=TW`;
    script.async = true;
    script.defer = true;

    // Set a timeout to detect if script fails to load
    const timeoutId = setTimeout(() => {
      if (!window.google || !window.google.maps) {
        console.warn('Google Maps script loading timeout');
        setLoadError(new Error('Google Maps loading timeout'));
        // Don't block the app - continue without Maps
      }
    }, 10000); // 10 second timeout

    script.addEventListener('load', () => {
      clearTimeout(timeoutId);
      // Wait a bit for google.maps to be fully initialized
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps) {
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      
      // Fallback timeout
      setTimeout(() => {
        clearInterval(checkInterval);
        if (window.google && window.google.maps) {
          setIsLoaded(true);
        }
      }, 2000);
    });

    script.addEventListener('error', () => {
      clearTimeout(timeoutId);
      console.error('Failed to load Google Maps JavaScript SDK');
      setLoadError(new Error('Failed to load Google Maps JavaScript SDK'));
      // Don't block the app - continue without Maps
    });

    // Suppress console warnings from Google Maps
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      // Filter out Google Maps specific warnings
      if (args[0] && typeof args[0] === 'string' && args[0].includes('maps.googleapis.com')) {
        return; // Suppress Google Maps warnings
      }
      originalWarn.apply(console, args);
    };

    document.head.appendChild(script);

    return () => {
      clearTimeout(timeoutId);
      console.warn = originalWarn;
    };
  }, []);

  return { isLoaded, loadError };
}

