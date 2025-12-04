import React, { createContext, useContext, useState, ReactNode } from "react";
import { RestaurantLocation } from "../types/location";

type LocationPreviewContextValue = {
  selectedLocation: RestaurantLocation | null;
  setSelectedLocation: (loc: RestaurantLocation | null) => void;

  savedLocations: RestaurantLocation[];
  addSavedLocation: (loc: RestaurantLocation) => void;

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
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);
  const [savedLocations, setSavedLocations] = useState<RestaurantLocation[]>([]);
  const [pendingSaveLocation, setPendingSaveLocation] = useState<RestaurantLocation | null>(null);

  const addSavedLocation = (loc: RestaurantLocation) => {
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
  };

  const value: LocationPreviewContextValue = {
    selectedLocation,
    setSelectedLocation,
    savedLocations,
    addSavedLocation,
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
      addSavedLocation: () => {},
      pendingSaveLocation: null,
      setPendingSaveLocation: () => {},
      isProviderAvailable: false,
    };
  }
  return ctx;
};

