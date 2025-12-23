import React, { createContext, useContext, useState, ReactNode } from "react";
import { RestaurantLocation } from "../types/location";
import { fetchSavedRestaurants, saveRestaurant as saveRestaurantAPI, unsaveRestaurant as unsaveRestaurantAPI } from "../api/api";
import { useAuth } from "./AuthContext";

type LocationPreviewContextValue = {
  selectedLocation: RestaurantLocation | null;
  setSelectedLocation: (loc: RestaurantLocation | null) => void;

  savedLocations: RestaurantLocation[];
  addSavedLocation: (loc: RestaurantLocation) => Promise<void> | void;
  removeSavedLocation: (id: string) => Promise<void> | void;

  // for showing the "加入蒐藏清單？" prompt
  pendingSaveLocation: RestaurantLocation | null;
  setPendingSaveLocation: (loc: RestaurantLocation | null) => void;
  
  // Flag to indicate if provider is available
  isProviderAvailable: boolean;
};

const LocationPreviewContext = createContext<LocationPreviewContextValue | undefined>(
  undefined
);

export const LocationPreviewProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);
  const [savedLocations, setSavedLocations] = useState<RestaurantLocation[]>([]);
  const [pendingSaveLocation, setPendingSaveLocation] = useState<RestaurantLocation | null>(null);

  // Load saved locations from backend when authenticated
  React.useEffect(() => {
    const loadSaved = async () => {
      if (!isAuthenticated) {
        setSavedLocations([]);
        return;
      }
      try {
        const saved = await fetchSavedRestaurants();
        const normalized = (saved || []).map((r: any) => ({
          id: r.id,
          name: r.name,
          address: r.address,
          lat: r.lat,
          lng: r.lng,
        })) as RestaurantLocation[];
        setSavedLocations(normalized);
      } catch (error) {
        console.error("Failed to load saved locations", error);
      }
    };

    loadSaved();
  }, [isAuthenticated]);

  const addSavedLocation = async (loc: RestaurantLocation) => {
    setSavedLocations(prev => {
      // avoid duplicates by id if available, otherwise by name + address combination
      if (loc.id) {
        if (prev.some(p => p.id === loc.id)) return prev;
      } else {
        const key = `${loc.name}-${loc.address || ''}`;
        if (prev.some(p => `${p.name}-${p.address || ''}` === key)) return prev;
      }
      return [...prev, loc];
    });

    // Persist to backend if authenticated
    if (isAuthenticated && loc.id) {
      try {
        await saveRestaurantAPI({
          restaurantId: loc.id,
          name: loc.name,
          address: loc.address || '',
          lat: loc.lat,
          lng: loc.lng,
          styles: [],
          categories: [],
        });
      } catch (error) {
        console.error('Failed to persist saved location', error);
      }
    }
  };

  const removeSavedLocation = async (id: string) => {
    setSavedLocations(prev => prev.filter(p => p.id !== id));
    if (isAuthenticated) {
      try {
        await unsaveRestaurantAPI(id);
      } catch (error) {
        console.error('Failed to remove saved location', error);
      }
    }
  };

  const value: LocationPreviewContextValue = {
    selectedLocation,
    setSelectedLocation,
    savedLocations,
    addSavedLocation,
    removeSavedLocation,
    pendingSaveLocation,
    setPendingSaveLocation,
    isProviderAvailable: true,
  };

  return (
    <LocationPreviewContext.Provider value={value}>
      {children}
    </LocationPreviewContext.Provider>
  );
};

export const useLocationPreview = () => {
  const ctx = useContext(LocationPreviewContext);
  if (!ctx) {
    // Return a safe default when context is not available (e.g., in UserProfilePage)
    return {
      selectedLocation: null,
      setSelectedLocation: () => {},
      savedLocations: [],
      addSavedLocation: async () => {},
      removeSavedLocation: async () => {},
      pendingSaveLocation: null,
      setPendingSaveLocation: () => {},
      isProviderAvailable: false,
    };
  }
  return ctx;
};

