export interface SavedRestaurant {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  styles: string[]; // Cuisine style labels like "日式 Japanese"
  categories: string[]; // Category labels like "早餐 Breakfast"
  isSaved: boolean;
  rating?: number; // Optional rating
  priceLevel?: '$' | '$$' | '$$$'; // Optional price level
  imageUrl?: string; // Optional restaurant image
}

