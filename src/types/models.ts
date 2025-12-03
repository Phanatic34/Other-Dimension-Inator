export type BoardCategory = 'cuisine' | 'type';

export interface Board {
  id: string;
  name: string;      // e.g. "Japanese"
  label: string;     // e.g. "日式 Japanese"
  category: BoardCategory;
}

export interface User {
  id: string;
  displayName: string;
  handle: string;      // e.g. "@foodie_ntu"
  avatarUrl?: string;
  isFollowedByCurrentUser?: boolean;
}

export interface ReviewPost {
  id: string;
  type: 'review';
  author: User;
  restaurantName: string;
  board: Board;         // cuisine or food type board (legacy)
  styleType?: string;   // e.g. "美式 American" (cuisine/style)
  foodType?: string;    // e.g. "漢堡 Burgers" (food type)
  title: string;
  contentSnippet: string;
  rating: number;       // 1–5
  priceLevel: '$' | '$$' | '$$$';
  priceMax?: number;    // Maximum price per person in NTD (for detailed range)
  locationArea: string; // e.g. "Gongguan", "Xinyi"
  restaurantAddress?: string; // Full address
  restaurantLat?: number; // Latitude
  restaurantLng?: number; // Longitude
  createdAt: string;    // ISO or human-friendly string
  likeCount: number;
  commentCount: number;
  shareCount?: number;  // Number of shares
  imageUrl?: string;    // Single image (legacy support)
  images?: string[];    // Multiple images array
  isFromFollowedUser?: boolean;
}

export type Visibility = 'PUBLIC' | 'FOLLOWERS';

export interface MeetupPost {
  id: string;
  type: 'meetup';
  author: User;              // Changed from 'host' to 'author' for consistency
  restaurantName: string;    // Required field
  locationText: string;      // Free-text address/area, e.g. "信義區, 台北" or "Xinyi"
  address?: string;          // Optional full address for Google Maps
  meetupTime: string;        // ISO datetime string
  foodTags: string[];       // e.g. ["Hotpot", "Taiwanese"], can be board labels or custom tags
  maxHeadcount: number;     // Total seats host wants
  currentHeadcount: number;  // Start at 1 (host), can be extended later
  budgetDescription: string; // Free text like "預計 500–700 / 1 人", "我請客"
  hasReservation: boolean;
  description: string;      // Main text body of the post
  visibility: Visibility;    // 'PUBLIC' | 'FOLLOWERS'
  imageUrl?: string | null; // Optional restaurant/meetup image
  status: 'OPEN' | 'CLOSED'; // Default "OPEN"; show "Closed" style
  createdAt: string;        // ISO or human-friendly string
  updatedAt?: string;       // ISO or human-friendly string
  likeCount: number;        // Number of likes
  commentCount: number;     // Number of comments
  shareCount?: number;      // Number of shares
  isFromFollowedUser?: boolean;
  // Legacy fields for backward compatibility (can be derived from new fields)
  board?: Board;            // Optional: can derive from foodTags
  locationArea?: string;    // Optional: can derive from locationText
}

export type Post = ReviewPost | MeetupPost;

