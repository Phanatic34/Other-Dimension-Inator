import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data
const mockBoards: Board[] = [
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
  // By Food Type
  { id: 'desserts', name: 'Desserts', label: '甜點 Desserts', category: 'type' },
  { id: 'breakfast', name: 'Breakfast', label: '早餐 Breakfast', category: 'type' },
  { id: 'streetfood', name: 'Street Food', label: '街頭小吃 Street Food', category: 'type' },
  { id: 'beverages', name: 'Beverages', label: '飲料 Beverages', category: 'type' },
  { id: 'vegetarian', name: 'Vegetarian', label: '素食 Vegetarian', category: 'type' },
  { id: 'fastfood', name: 'Fast Food', label: '速食 Fast Food', category: 'type' },
];

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    locationArea: 'Tianmu',
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    locationArea: 'Xinyi',
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
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
    locationArea: 'Gongguan',
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    locationArea: 'Xinyi',
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
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
    locationArea: 'Gongguan',
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
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
    locationArea: 'Xinyi',
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
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
    host: mockUsers[0],
    restaurantName: '無老鍋',
    board: mockBoards[3], // Taiwanese
    title: '週末揪團吃火鍋！',
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    meetupTime: '2024-11-30 19:00',
    locationArea: 'Xinyi',
    hasReservation: true,
    expectedHeadcount: 4,
    currentHeadcount: 2,
    budgetRange: '$$',
    deadline: '2024-11-29 18:00',
    isFromFollowedUser: true,
    createdAt: '3小時前',
  },
  {
    id: 'meetup2',
    type: 'meetup',
    host: mockUsers[2],
    restaurantName: undefined,
    board: mockBoards[1], // Japanese
    title: '尋找拉麵同好一起探店',
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    meetupTime: '2024-12-01 12:00',
    locationArea: 'Gongguan',
    hasReservation: false,
    expectedHeadcount: 3,
    currentHeadcount: 1,
    budgetRange: '$$',
    deadline: '2024-11-30 20:00',
    isFromFollowedUser: true,
    createdAt: '6小時前',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    host: mockUsers[1],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    title: '下午茶甜點時光',
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    meetupTime: '2024-11-28 15:00',
    locationArea: 'Xinyi',
    hasReservation: true,
    expectedHeadcount: 3,
    currentHeadcount: 3,
    budgetRange: '$$$',
    deadline: '2024-11-27 12:00', // Past deadline
    isFromFollowedUser: false,
    createdAt: '2天前',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    host: mockUsers[4],
    restaurantName: undefined,
    board: mockBoards[15], // Street Food
    title: '夜市美食探索',
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    meetupTime: '2024-12-02 18:00',
    locationArea: 'Gongguan',
    hasReservation: false,
    expectedHeadcount: 5,
    currentHeadcount: 2,
    budgetRange: '$',
    deadline: '2024-12-01 18:00',
    isFromFollowedUser: true,
    createdAt: '1天前',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  return [...mockBoards];
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

