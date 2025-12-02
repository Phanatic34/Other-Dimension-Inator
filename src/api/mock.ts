import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { sortWithOthersLast } from '../utils/sorting';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data - raw boards array (will be sorted)
const mockBoardsRaw: Board[] = [
  // By Cuisine / Style
  { id: 'american', name: 'American', label: '美式 American', category: 'cuisine' },
  { id: 'japanese', name: 'Japanese', label: '日式 Japanese', category: 'cuisine' },
  { id: 'korean', name: 'Korean', label: '韓式 Korean', category: 'cuisine' },
  { id: 'taiwanese', name: 'Taiwanese', label: '台菜 Taiwanese', category: 'cuisine' },
  { id: 'thai', name: 'Thai', label: '泰式 Thai', category: 'cuisine' },
  { id: 'hongkong', name: 'Hong Kong', label: '港式 Hong Kong', category: 'cuisine' },
  { id: 'italian', name: 'Italian', label: '義式 Italian', category: 'cuisine' },
  { id: 'french', name: 'French', label: '法式 French', category: 'cuisine' },
  { id: 'chinese', name: 'Chinese', label: '中式 Chinese', category: 'cuisine' },
  { id: 'vietnamese', name: 'Vietnamese', label: '越式 Vietnamese', category: 'cuisine' },
  { id: 'indian', name: 'Indian', label: '印度 Indian', category: 'cuisine' },
  { id: 'mexican', name: 'Mexican', label: '墨西哥 Mexican', category: 'cuisine' },
  { id: 'others-style', name: 'Others', label: '其他 Others', category: 'cuisine' },
  // By Food Type
  { id: 'desserts', name: 'Desserts', label: '甜點 Desserts', category: 'type' },
  { id: 'breakfast', name: 'Breakfast', label: '早餐 Breakfast', category: 'type' },
  { id: 'streetfood', name: 'Street Food', label: '街頭小吃 Street Food', category: 'type' },
  { id: 'beverages', name: 'Beverages', label: '飲料 Beverages', category: 'type' },
  { id: 'vegetarian', name: 'Vegetarian', label: '素食 Vegetarian', category: 'type' },
  { id: 'fastfood', name: 'Fast Food', label: '速食 Fast Food', category: 'type' },
  { id: 'noodles', name: 'Noodles', label: '麵食 Noodles', category: 'type' },
  { id: 'rice', name: 'Rice', label: '米飯 Rice', category: 'type' },
  { id: 'lunch_din', name: 'Lunch / Dinner', label: '午晚餐 Lunch / Dinner', category: 'type' },
  { id: 'late_night', name: 'Late Night', label: '宵夜 Late Night', category: 'type' },
  { id: 'others-category', name: 'Others', label: '其他 Others', category: 'type' },
];

// Keep original array for mock posts (they reference boards by index)
// The sorted version will be exported for UI display
const mockBoards = mockBoardsRaw;

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
  { id: 'real_harrystyles', displayName: 'Harry Styles', handle: '@real_harrystyles', avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg', isFollowedByCurrentUser: true },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    styleType: '美式 American',
    foodType: '速食 Fast Food',
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    priceMax: 250,
    locationArea: 'Tianmu',
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    shareCount: 8,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'saboten-tianmu',
    type: 'review',
    author: mockUsers[6], // Harry Styles
    restaurantName: '勝博殿 新光三越天母店',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '炸豬排 Tonkatsu',
    // Google Maps: https://share.google/vH94IEyh2dBKddN1Y
    title: '天母勝博殿的日式炸豬排超讚！',
    contentSnippet: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
    rating: 4.4,
    priceLevel: '$$',
    priceMax: 800,
    locationArea: 'Tianmu',
    createdAt: '30分鐘前',
    likeCount: 102,
    commentCount: 14,
    shareCount: 23,
    images: [
      'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '拉麵 Ramen',
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    priceMax: 480,
    locationArea: 'Xinyi',
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
    shareCount: 15,
    images: [
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review2',
    type: 'review',
    author: mockUsers[1],
    restaurantName: '鼎泰豐',
    board: mockBoards[3], // Taiwanese
    title: '小籠包還是這裡最經典',
    contentSnippet: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
    rating: 4.8,
    priceLevel: '$$',
    priceMax: 650,
    locationArea: 'Gongguan',
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    shareCount: 32,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    styleType: '法式 French',
    foodType: '甜點 Desserts',
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    priceMax: 380,
    locationArea: 'Xinyi',
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
    shareCount: 45,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review4',
    type: 'review',
    author: mockUsers[3],
    restaurantName: '永和豆漿',
    board: mockBoards[14], // Breakfast
    title: '傳統早餐的溫暖',
    contentSnippet: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
    rating: 4.2,
    priceLevel: '$',
    priceMax: 120,
    locationArea: 'Gongguan',
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
    shareCount: 12,
    isFromFollowedUser: false,
  },
  {
    id: 'review5',
    type: 'review',
    author: mockUsers[4],
    restaurantName: '韓式炸雞店',
    board: mockBoards[2], // Korean
    title: '超酥脆的韓式炸雞',
    contentSnippet: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
    rating: 4.6,
    priceLevel: '$$',
    priceMax: 550,
    locationArea: 'Xinyi',
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
    shareCount: 28,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
];

const mockMeetupPosts: MeetupPost[] = [
  {
    id: 'meetup1',
    type: 'meetup',
    author: mockUsers[0],
    restaurantName: '無老鍋 台北信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 22 號',
    meetupTime: '2024-11-30T19:00:00+08:00',
    foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
    maxHeadcount: 4,
    currentHeadcount: 2,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: true,
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '3小時前',
    updatedAt: '3小時前',
    likeCount: 15,
    commentCount: 3,
    shareCount: 2,
    isFromFollowedUser: true,
    board: mockBoards[3], // Taiwanese (for backward compatibility)
    locationArea: 'Xinyi', // for backward compatibility
  },
  {
    id: 'meetup2',
    type: 'meetup',
    author: mockUsers[2],
    restaurantName: '拉麵店探索',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 1 號',
    meetupTime: '2024-12-01T12:00:00+08:00',
    foodTags: ['日式 Japanese', '拉麵 Ramen'],
    maxHeadcount: 3,
    currentHeadcount: 1,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: false,
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '6小時前',
    updatedAt: '6小時前',
    likeCount: 8,
    commentCount: 1,
    shareCount: 0,
    isFromFollowedUser: true,
    board: mockBoards[1], // Japanese
    locationArea: 'Gongguan',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    author: mockUsers[1],
    restaurantName: 'Lady M 信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 28 號',
    meetupTime: '2024-11-28T15:00:00+08:00',
    foodTags: ['甜點 Desserts', '法式 French'],
    maxHeadcount: 3,
    currentHeadcount: 3,
    budgetDescription: '預計 800–1000 / 1 人',
    hasReservation: true,
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'CLOSED', // Closed because full
    createdAt: '2天前',
    updatedAt: '2天前',
    likeCount: 22,
    commentCount: 5,
    shareCount: 4,
    isFromFollowedUser: false,
    board: mockBoards[12], // Desserts
    locationArea: 'Xinyi',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    author: mockUsers[4],
    restaurantName: '公館夜市',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 90 號',
    meetupTime: '2024-12-02T18:00:00+08:00',
    foodTags: ['街頭小吃 Street Food'],
    maxHeadcount: 5,
    currentHeadcount: 2,
    budgetDescription: '預計 200–300 / 1 人',
    hasReservation: false,
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '1天前',
    updatedAt: '1天前',
    likeCount: 12,
    commentCount: 2,
    shareCount: 1,
    isFromFollowedUser: true,
    board: mockBoards[15], // Street Food
    locationArea: 'Gongguan',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  // Return sorted boards: alphabetically by English name, with "Others" always last
  return sortWithOthersLast(mockBoards, (board) => board.name);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

// API functions for meetup posts
export async function fetchMeetupPosts(visibility?: 'PUBLIC' | 'FOLLOWERS'): Promise<MeetupPost[]> {
  await delay(300);
  let posts = [...mockMeetupPosts];
  
  // Filter by visibility if provided (in real app, this would be based on current user)
  if (visibility) {
    posts = posts.filter(post => post.visibility === visibility);
  }
  
  // Sort by createdAt DESC (newest first)
  return posts.sort((a, b) => {
    // Simple comparison - in real app, parse ISO dates properly
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export interface CreateMeetupPostRequest {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount?: number; // Number of people already in the group
  expectedInviteCount?: number; // Total headcount for the meetup
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
}

export async function createMeetupPost(data: CreateMeetupPostRequest): Promise<MeetupPost> {
  await delay(500);
  
  // In real app, this would call the backend API
  // For now, create a mock post
  const now = new Date();
  const newPost: MeetupPost = {
    id: `meetup-${now.getTime()}`,
    type: 'meetup',
    author: mockUsers[0], // In real app, get from auth context
    restaurantName: data.restaurantName,
    locationText: data.locationText,
    meetupTime: data.meetupTime,
    foodTags: data.foodTags,
    maxHeadcount: data.maxHeadcount,
    currentHeadcount: data.baseParticipantCount || 1, // Base participants are already "joined"
    budgetDescription: data.budgetDescription,
    hasReservation: data.hasReservation,
    description: data.description,
    visibility: data.visibility,
    imageUrl: data.imageUrl || null,
    status: 'OPEN',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isFromFollowedUser: false,
  };
  
  // In real app, add to database
  mockMeetupPosts.unshift(newPost);
  
  return newPost;
}

