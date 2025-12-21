// Database seed script
// Populates the database with initial data from frontend mocks
import dotenv from 'dotenv';
dotenv.config();

import { query, closePool } from './database';
import { v4 as uuidv4 } from 'uuid';

const boards = [
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

const users = [
  { 
    id: 'user1', 
    displayName: 'Foodie NTU', 
    handle: 'foodie_ntu', 
    username: 'foodie_ntu', 
    email: 'foodie@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    bio: '台大學生，專門探索公館周邊美食！每週發掘新餐廳 🍜',
    favoriteStyles: ['日式 Japanese', '台菜 Taiwanese', '韓式 Korean'],
    favoriteCategories: ['拉麵 Ramen', '小籠包', '炸雞'],
    joinedDate: 'January 2024'
  },
  { 
    id: 'user2', 
    displayName: 'Taipei Eater', 
    handle: 'taipei_eater', 
    username: 'taipei_eater', 
    email: 'eater@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces',
    bio: '台北美食部落客，專門挖掘隱藏版美食 📸',
    favoriteStyles: ['台菜 Taiwanese', '法式 French', '義式 Italian'],
    favoriteCategories: ['甜點 Desserts', '咖啡', '早午餐'],
    joinedDate: 'February 2024'
  },
  { 
    id: 'user3', 
    displayName: 'Ramen Lover', 
    handle: 'ramen_lover', 
    username: 'ramen_lover', 
    email: 'ramen@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces',
    bio: '拉麵狂熱者！目標是吃遍台北所有拉麵店 🍜',
    favoriteStyles: ['日式 Japanese'],
    favoriteCategories: ['拉麵 Ramen', '沾麵', '豚骨'],
    joinedDate: 'March 2024'
  },
  { 
    id: 'user4', 
    displayName: 'Sweet Tooth', 
    handle: 'sweet_tooth', 
    username: 'sweet_tooth', 
    email: 'sweet@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces',
    bio: '甜點控！蛋糕、冰淇淋、手搖飲通通愛 🍰',
    favoriteStyles: ['法式 French', '日式 Japanese'],
    favoriteCategories: ['甜點 Desserts', '飲料 Beverages', '下午茶'],
    joinedDate: 'April 2024'
  },
  { 
    id: 'user5', 
    displayName: 'Street Food Hunter', 
    handle: 'street_hunter', 
    username: 'street_hunter', 
    email: 'street@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces',
    bio: '夜市達人！專門發掘各地夜市的隱藏美食 🌙',
    favoriteStyles: ['台菜 Taiwanese', '泰式 Thai', '越式 Vietnamese'],
    favoriteCategories: ['街頭小吃 Street Food', '宵夜 Late Night', '燒烤'],
    joinedDate: 'May 2024'
  },
  { 
    id: 'lamige_9', 
    displayName: '王柏融', 
    handle: 'lamige_9', 
    username: 'lamige_9', 
    email: 'lamige@example.com', 
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s',
    bio: '職業棒球選手，休假時最愛探索美食！⚾',
    favoriteStyles: ['美式 American', '日式 Japanese', '台菜 Taiwanese'],
    favoriteCategories: ['速食 Fast Food', '牛排', '燒肉'],
    joinedDate: 'June 2024'
  },
  { 
    id: 'real_harrystyles', 
    displayName: 'Harry Styles', 
    handle: 'real_harrystyles', 
    username: 'real_harrystyles', 
    email: 'harry@example.com', 
    avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg',
    bio: 'Singer, songwriter, and food enthusiast 🎤🍽️',
    favoriteStyles: ['義式 Italian', '日式 Japanese', '法式 French'],
    favoriteCategories: ['Fine Dining', '甜點 Desserts', '紅酒'],
    joinedDate: 'July 2024'
  },
  { 
    id: 'lorry930811', 
    displayName: '羅立宸', 
    handle: 'lorry930811', 
    username: 'lorry930811', 
    email: 'lorry@example.com', 
    avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png', 
    bio: '熱愛探索美食的吃貨，喜歡分享餐廳體驗 🍜', 
    favoriteStyles: ['日式 Japanese', '美式 American', '泰式 Thai', '墨西哥 Mexican'], 
    favoriteCategories: ['早餐 Breakfast', '飲料 Beverages', '甜點 Desserts', '速食 Fast Food'], 
    joinedDate: 'April 2024' 
  },
];

async function seed() {
  console.log('Seeding database...');

  try {
    // Insert boards
    for (const board of boards) {
      await query(
        'INSERT INTO boards (id, name, label, category) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING',
        [board.id, board.name, board.label, board.category]
      );
    }
    console.log(`✓ Inserted ${boards.length} boards`);

    // Insert users (update if already exists)
    for (const user of users) {
      await query(
        `INSERT INTO users (id, display_name, handle, username, email, avatar_url, bio, favorite_styles, favorite_categories, joined_date) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
         ON CONFLICT (id) DO UPDATE SET
           display_name = EXCLUDED.display_name,
           avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
           bio = COALESCE(EXCLUDED.bio, users.bio),
           favorite_styles = COALESCE(EXCLUDED.favorite_styles, users.favorite_styles),
           favorite_categories = COALESCE(EXCLUDED.favorite_categories, users.favorite_categories),
           joined_date = COALESCE(EXCLUDED.joined_date, users.joined_date)`,
        [
          user.id,
          user.displayName,
          user.handle,
          user.username,
          user.email,
          user.avatarUrl || null,
          user.bio || null,
          user.favoriteStyles || null,
          user.favoriteCategories || null,
          user.joinedDate || null,
        ]
      );
    }
    console.log(`✓ Inserted/Updated ${users.length} users`);

    // Insert review posts
    const reviewPosts = [
      {
        id: 'post-mcd-tianmu-1',
        authorId: 'lamige_9',
        restaurantName: '麥當勞-天母餐廳',
        restaurantAddress: '台北市士林區天母東路68號',
        restaurantLat: 25.1185,
        restaurantLng: 121.5274,
        locationArea: 'Tianmu',
        boardId: 'american',
        styleType: '美式 American',
        foodType: '速食 Fast Food',
        title: '天母這間麥當勞氣氛 surprisingly 不錯',
        content: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
        rating: 4.3,
        priceLevel: '$$',
        priceMax: 250,
        images: [
          'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
        ],
        likeCount: 59,
        commentCount: 12,
        shareCount: 8,
        createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      },
      {
        id: 'saboten-tianmu',
        authorId: 'real_harrystyles',
        restaurantName: '勝博殿 新光三越天母店',
        restaurantAddress: '台北市士林區天母東路68號',
        restaurantLat: 25.1185,
        restaurantLng: 121.5274,
        locationArea: 'Tianmu',
        boardId: 'japanese',
        styleType: '日式 Japanese',
        foodType: '炸豬排 Tonkatsu',
        title: '天母勝博殿的日式炸豬排超讚！',
        content: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
        rating: 4.4,
        priceLevel: '$$',
        priceMax: 800,
        images: [
          'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
        ],
        likeCount: 102,
        commentCount: 14,
        shareCount: 23,
        createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      },
      {
        id: 'review1',
        authorId: 'user1',
        restaurantName: 'Ichiran Ramen',
        restaurantAddress: '台北市信義區信義路五段7號',
        restaurantLat: 25.0330,
        restaurantLng: 121.5654,
        locationArea: 'Xinyi',
        boardId: 'japanese',
        styleType: '日式 Japanese',
        foodType: '拉麵 Ramen',
        title: '超濃郁的拉麵體驗！',
        content: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
        rating: 4.5,
        priceLevel: '$$$',
        priceMax: 480,
        images: [
          'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
          'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
          'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
        ],
        likeCount: 42,
        commentCount: 12,
        shareCount: 15,
        createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      },
      {
        id: 'review2',
        authorId: 'user2',
        restaurantName: '鼎泰豐',
        restaurantAddress: '台北市大安區信義路二段194號',
        restaurantLat: 25.0339,
        restaurantLng: 121.5325,
        locationArea: 'Gongguan',
        boardId: 'taiwanese',
        styleType: '台菜 Taiwanese',
        foodType: null,
        title: '小籠包還是這裡最經典',
        content: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
        rating: 4.8,
        priceLevel: '$$',
        priceMax: 650,
        images: null,
        likeCount: 88,
        commentCount: 23,
        shareCount: 32,
        createdAt: new Date(Date.now() - 18000000).toISOString(), // 5 hours ago
      },
      {
        id: 'review3',
        authorId: 'user3',
        restaurantName: 'Lady M',
        restaurantAddress: '台北市信義區松高路19號',
        restaurantLat: 25.0400,
        restaurantLng: 121.5680,
        locationArea: 'Xinyi',
        boardId: 'desserts',
        styleType: '法式 French',
        foodType: '甜點 Desserts',
        title: '千層蛋糕的天花板',
        content: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
        rating: 4.7,
        priceLevel: '$$$',
        priceMax: 380,
        images: [
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
          'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
        ],
        likeCount: 156,
        commentCount: 45,
        shareCount: 45,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: 'review4',
        authorId: 'user4',
        restaurantName: '永和豆漿',
        restaurantAddress: '台北市大安區羅斯福路三段316巷',
        restaurantLat: 25.0167,
        restaurantLng: 121.5333,
        locationArea: 'Gongguan',
        boardId: 'breakfast',
        styleType: null,
        foodType: null,
        title: '傳統早餐的溫暖',
        content: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
        rating: 4.2,
        priceLevel: '$',
        priceMax: 120,
        images: null,
        likeCount: 67,
        commentCount: 18,
        shareCount: 12,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: 'review5',
        authorId: 'user5',
        restaurantName: '韓式炸雞店',
        restaurantAddress: '台北市信義區松仁路58號',
        restaurantLat: 25.0380,
        restaurantLng: 121.5700,
        locationArea: 'Xinyi',
        boardId: 'korean',
        styleType: '韓式 Korean',
        foodType: null,
        title: '超酥脆的韓式炸雞',
        content: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
        rating: 4.6,
        priceLevel: '$$',
        priceMax: 550,
        images: [
          'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
        ],
        likeCount: 94,
        commentCount: 31,
        shareCount: 28,
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ];

    for (const post of reviewPosts) {
      await query(
        `INSERT INTO review_posts (
          id, author_id, restaurant_name, restaurant_address, restaurant_lat, restaurant_lng,
          location_area, board_id, style_type, food_type, title, content, rating,
          price_level, price_max, visibility, like_count, comment_count, share_count, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        ON CONFLICT (id) DO NOTHING`,
        [
          post.id,
          post.authorId,
          post.restaurantName,
          post.restaurantAddress,
          post.restaurantLat,
          post.restaurantLng,
          post.locationArea,
          post.boardId,
          post.styleType,
          post.foodType,
          post.title,
          post.content,
          post.rating,
          post.priceLevel,
          post.priceMax,
          'PUBLIC',
          post.likeCount,
          post.commentCount,
          post.shareCount,
          post.createdAt,
          post.createdAt,
        ]
      );

      // Insert images
      if (post.images) {
        for (let i = 0; i < post.images.length; i++) {
          await query(
            'INSERT INTO post_images (id, post_id, image_url, image_order) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING',
            [uuidv4(), post.id, post.images[i], i]
          );
        }
      }
    }
    console.log(`✓ Inserted ${reviewPosts.length} review posts`);

    // Insert meetup posts
    const meetupPosts = [
      {
        id: 'meetup1',
        authorId: 'user1',
        restaurantName: '無老鍋 台北信義店',
        locationText: 'Xinyi',
        address: '台北市信義區松壽路 22 號',
        meetupTime: new Date('2024-11-30T19:00:00+08:00').toISOString(),
        foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
        maxHeadcount: 4,
        currentHeadcount: 2,
        budgetDescription: '預計 500–700 / 1 人',
        hasReservation: true,
        description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
        visibility: 'PUBLIC',
        imageUrl: null,
        status: 'OPEN',
        boardId: 'taiwanese',
        locationArea: 'Xinyi',
        likeCount: 15,
        commentCount: 3,
        shareCount: 2,
        createdAt: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      },
      {
        id: 'meetup2',
        authorId: 'user3',
        restaurantName: '拉麵店探索',
        locationText: 'Gongguan',
        address: '台北市大安區羅斯福路四段 1 號',
        meetupTime: new Date('2024-12-01T12:00:00+08:00').toISOString(),
        foodTags: ['日式 Japanese', '拉麵 Ramen'],
        maxHeadcount: 3,
        currentHeadcount: 1,
        budgetDescription: '預計 500–700 / 1 人',
        hasReservation: false,
        description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
        visibility: 'PUBLIC',
        imageUrl: null,
        status: 'OPEN',
        boardId: 'japanese',
        locationArea: 'Gongguan',
        likeCount: 8,
        commentCount: 1,
        shareCount: 0,
        createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
      },
      {
        id: 'meetup3',
        authorId: 'user2',
        restaurantName: 'Lady M 信義店',
        locationText: 'Xinyi',
        address: '台北市信義區松壽路 28 號',
        meetupTime: new Date('2024-11-28T15:00:00+08:00').toISOString(),
        foodTags: ['甜點 Desserts', '法式 French'],
        maxHeadcount: 3,
        currentHeadcount: 3,
        budgetDescription: '預計 800–1000 / 1 人',
        hasReservation: true,
        description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
        visibility: 'PUBLIC',
        imageUrl: null,
        status: 'CLOSED',
        boardId: 'desserts',
        locationArea: 'Xinyi',
        likeCount: 22,
        commentCount: 5,
        shareCount: 4,
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
      {
        id: 'meetup4',
        authorId: 'user5',
        restaurantName: '公館夜市',
        locationText: 'Gongguan',
        address: '台北市大安區羅斯福路四段 90 號',
        meetupTime: new Date('2024-12-02T18:00:00+08:00').toISOString(),
        foodTags: ['街頭小吃 Street Food'],
        maxHeadcount: 5,
        currentHeadcount: 2,
        budgetDescription: '預計 200–300 / 1 人',
        hasReservation: false,
        description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
        visibility: 'PUBLIC',
        imageUrl: null,
        status: 'OPEN',
        boardId: 'streetfood',
        locationArea: 'Gongguan',
        likeCount: 12,
        commentCount: 2,
        shareCount: 1,
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
    ];

    for (const post of meetupPosts) {
      await query(
        `INSERT INTO meetup_posts (
          id, author_id, restaurant_name, location_text, address, meetup_time,
          food_tags, max_headcount, current_headcount, budget_description,
          has_reservation, description, visibility, image_url, status,
          board_id, location_area, like_count, comment_count, share_count,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
        ON CONFLICT (id) DO NOTHING`,
        [
          post.id,
          post.authorId,
          post.restaurantName,
          post.locationText,
          post.address,
          post.meetupTime,
          post.foodTags,
          post.maxHeadcount,
          post.currentHeadcount,
          post.budgetDescription,
          post.hasReservation,
          post.description,
          post.visibility,
          post.imageUrl,
          post.status,
          post.boardId,
          post.locationArea,
          post.likeCount,
          post.commentCount,
          post.shareCount,
          post.createdAt,
          post.createdAt,
        ]
      );
    }
    console.log(`✓ Inserted ${meetupPosts.length} meetup posts`);

    // Insert saved restaurants
    const savedRestaurants = [
      {
        userId: 'user1',
        name: '勝博殿 新光三越天母店',
        address: '台北市士林區天母東路68號',
        lat: 25.1185,
        lng: 121.5274,
        styles: ['日式 Japanese'],
        categories: ['午晚餐 Lunch / Dinner'],
        rating: 4.4,
        priceLevel: '$$',
      },
      {
        userId: 'user1',
        name: 'Ichiran Ramen',
        address: '台北市信義區信義路五段7號',
        lat: 25.0330,
        lng: 121.5654,
        styles: ['日式 Japanese'],
        categories: ['麵食 Noodles'],
        rating: 4.5,
        priceLevel: '$$$',
      },
      {
        userId: 'user1',
        name: '鼎泰豐',
        address: '台北市大安區信義路二段194號',
        lat: 25.0339,
        lng: 121.5325,
        styles: ['台菜 Taiwanese'],
        categories: ['午晚餐 Lunch / Dinner'],
        rating: 4.8,
        priceLevel: '$$',
      },
      {
        userId: 'user1',
        name: 'Lady M',
        address: '台北市信義區松高路19號',
        lat: 25.0400,
        lng: 121.5680,
        styles: ['法式 French'],
        categories: ['甜點 Desserts'],
        rating: 4.7,
        priceLevel: '$$$',
      },
      {
        userId: 'user1',
        name: '麥當勞-天母餐廳',
        address: '台北市士林區天母西路3號',
        lat: 25.1200,
        lng: 121.5274,
        styles: ['美式 American'],
        categories: ['速食 Fast Food'],
        rating: 4.3,
        priceLevel: '$$',
      },
    ];

    for (const restaurant of savedRestaurants) {
      await query(
        `INSERT INTO saved_restaurants (
          id, user_id, name, address, lat, lng, styles, categories, rating, price_level
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO NOTHING`,
        [
          uuidv4(),
          restaurant.userId,
          restaurant.name,
          restaurant.address,
          restaurant.lat,
          restaurant.lng,
          restaurant.styles,
          restaurant.categories,
          restaurant.rating,
          restaurant.priceLevel,
        ]
      );
    }
    console.log(`✓ Inserted ${savedRestaurants.length} saved restaurants`);

    console.log('✅ Database seeding completed!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await closePool();
  }
}

// Run if called directly
if (require.main === module) {
  seed();
}

export default seed;

