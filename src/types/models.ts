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
  board: Board;         // cuisine or food type board
  title: string;
  contentSnippet: string;
  rating: number;       // 1–5
  priceLevel: '$' | '$$' | '$$$';
  locationArea: string; // e.g. "Gongguan", "Xinyi"
  createdAt: string;    // ISO or human-friendly string
  likeCount: number;
  commentCount: number;
  imageUrl?: string;
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

