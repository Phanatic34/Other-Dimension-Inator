import { UserProfile, ProfileTabData, RecommendedUser } from '../types/profile';
import { ReviewPost, MeetupPost, Post } from '../types/models';
import { fetchPosts } from './mock';

// Mock user profile data
// Note: This user ID should match one of the users in mock.ts for posts to show up
export const mockUserProfile: UserProfile = {
  id: 'user1', // Match with mockUsers[0] from mock.ts
  displayName: '羅立宸',
  username: 'lorry930811',
  avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
  coverImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  followingCount: 127,
  followersCount: 342,
  joinedDate: 'April 2024',
  favoriteStyles: ['日式 Japanese', '美式 American', '泰式 Thai', '墨西哥 Mexican'],
  favoriteCategories: ['早餐 Breakfast', '飲料 Beverages', '甜點 Desserts', '速食 Fast Food'],
  bio: '熱愛探索美食的吃貨，喜歡分享餐廳體驗 🍜',
};

// Helper to get posts by user ID
const getPostsByUserId = (userId: string, allPosts: Post[]): Post[] => {
  return allPosts.filter(post => post.author.id === userId);
};

// Helper to create mock liked/replied/reposted/bookmarked posts
// For now, we'll use a subset of existing posts as examples
export const getProfileTabData = async (userId: string): Promise<ProfileTabData> => {
  const allPosts = await fetchPosts();
  
  // Posts created by this user
  const userPosts = getPostsByUserId(userId, allPosts);
  
  // For demo purposes, use some existing posts as liked/replied/reposted/bookmarked
  // In a real app, these would come from separate API endpoints
  const samplePosts = allPosts.slice(0, 5);
  
  return {
    posts: userPosts,
    likes: samplePosts.slice(0, 3), // User has liked these posts
    replies: samplePosts.slice(1, 4), // User has replied to these posts
    reposts: samplePosts.slice(2, 5), // User has reposted these posts
    bookmarks: samplePosts.slice(0, 2), // User has bookmarked these posts
  };
};

// Fetch a user profile by username
export const fetchUserProfile = async (username: string): Promise<UserProfile | null> => {
  // Remove @ if present
  const cleanUsername = username.replace('@', '');
  
  // For now, return mock profile if username matches
  if (cleanUsername === mockUserProfile.username) {
    return mockUserProfile;
  }
  
  // TODO: In production, fetch from API
  // const response = await fetch(`/api/users/${cleanUsername}/profile`);
  // return response.json();
  
  return null;
};

// Mock recommended users for "You might like" sidebar
export const mockRecommendedUsers: RecommendedUser[] = [
  {
    id: 'rec_user_1',
    displayName: 'Taipei Food Explorer',
    username: 'taipei_explorer',
    avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
    bio: '探索台北美食，分享在地好味道',
  },
  {
    id: 'rec_user_2',
    displayName: 'Ramen Master',
    username: 'ramen_master',
    avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
    bio: '拉麵愛好者，尋找最道地的日式拉麵',
  },
  {
    id: 'rec_user_3',
    displayName: 'Sweet Dreams',
    username: 'sweet_dreams',
    avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
    bio: '甜點控，記錄每一口甜蜜時光',
  },
];

// Fetch recommended users
export const fetchRecommendedUsers = async (): Promise<RecommendedUser[]> => {
  // TODO: In production, fetch from API
  // const response = await fetch('/api/users/recommended');
  // return response.json();
  return mockRecommendedUsers;
};

