import { Post, ReviewPost, MeetupPost, Board } from './models';

export interface UserProfile {
  id: string;
  displayName: string;
  username: string; // e.g., "lorry930811" (without @)
  avatarUrl: string;
  coverImageUrl: string;
  followingCount: number;
  followersCount: number;
  joinedDate?: string; // e.g., "April 2024"
  favoriteStyles: string[]; // Style labels like "日式 Japanese", "美式 American"
  favoriteCategories: string[]; // Category labels like "早餐 Breakfast", "甜點 Desserts"
  bio?: string; // Optional bio text
}

export interface RecommendedUser {
  id: string;
  displayName: string;
  username: string; // without @
  avatarUrl?: string;
  bio?: string;
}

export type ProfileTab = 'posts' | 'likes' | 'replies' | 'reposts' | 'bookmarks';

export interface ProfileTabData {
  posts: Post[];
  likes: Post[];
  replies: Post[];
  reposts: Post[];
  bookmarks: Post[];
}
