// Type definitions matching frontend models

export type BoardCategory = 'cuisine' | 'type';

export interface Board {
  id: string;
  name: string;
  label: string;
  category: BoardCategory;
}

export interface User {
  id: string;
  displayName: string;
  handle: string;
  avatarUrl?: string;
  email?: string;
  passwordHash?: string; // Only in database, never in API responses
  createdAt: string;
  isFollowedByCurrentUser?: boolean; // Computed field
}

export interface ReviewPost {
  id: string;
  type: 'review';
  authorId: string;
  author?: User; // Populated when fetching
  restaurantName: string;
  restaurantAddress?: string;
  restaurantLat?: number;
  restaurantLng?: number;
  locationArea?: string;
  boardId: string;
  board?: Board; // Populated when fetching
  styleType?: string;
  foodType?: string;
  title: string;
  content: string;
  contentSnippet?: string; // Computed from content
  rating: number;
  priceLevel: '$' | '$$' | '$$$';
  priceMin?: number;
  priceMax?: number;
  images?: string[];
  visibility: 'PUBLIC' | 'FOLLOWERS';
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;
  isFromFollowedUser?: boolean; // Computed field
}

export interface MeetupPost {
  id: string;
  type: 'meetup';
  authorId: string;
  author?: User; // Populated when fetching
  restaurantName: string;
  locationText: string;
  address?: string;
  meetupTime: string;
  foodTags: string[];
  maxHeadcount: number;
  currentHeadcount: number;
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  shareCount?: number;
  isFromFollowedUser?: boolean; // Computed field
  boardId?: string; // Optional for backward compatibility
  board?: Board;
  locationArea?: string;
}

export type Post = ReviewPost | MeetupPost;

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author?: User;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  handle: string;
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  followerCount: number;
  followingCount: number;
  isFollowedByCurrentUser?: boolean;
  favoriteStyles?: string[];
  favoriteCategories?: string[];
  joinedDate?: string;
}

export interface SavedRestaurant {
  id: string;
  userId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  styles?: string[];
  categories?: string[];
  rating?: number;
  priceLevel?: '$' | '$$' | '$$$';
  savedAt: string;
  savedFromPostId?: string;
}

export interface RecommendedUser {
  id: string;
  displayName: string;
  username: string;
  handle?: string; // alias for username
  avatarUrl?: string;
  bio?: string;
  isFollowing?: boolean;
}

