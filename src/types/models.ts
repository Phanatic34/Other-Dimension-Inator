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
  createdAt: string;    // ISO or human-friendly string
  likeCount: number;
  commentCount: number;
  shareCount?: number;  // Number of shares
  imageUrl?: string;    // Single image (legacy support)
  images?: string[];    // Multiple images array
  isFromFollowedUser?: boolean;
}

export interface MeetupPost {
  id: string;
  type: 'meetup';
  host: User;
  restaurantName?: string;
  board: Board;
  title: string;
  description: string;
  meetupTime: string;      // datetime text
  locationArea: string;
  hasReservation: boolean;
  expectedHeadcount: number;
  currentHeadcount: number;
  budgetRange: '$' | '$$' | '$$$';
  deadline: string;        // sign-up close time
  isFromFollowedUser?: boolean;
  createdAt: string;
}

export type Post = ReviewPost | MeetupPost;

