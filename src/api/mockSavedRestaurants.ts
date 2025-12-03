import { SavedRestaurant } from '../types/savedRestaurants';

// Mock saved restaurants data
// Some are saved (isSaved: true), some are not (isSaved: false)
export const mockRestaurants: SavedRestaurant[] = [
  {
    id: 'rest_1',
    name: '勝博殿 新光三越天母店',
    address: '台北市士林區天母東路68號',
    lat: 25.1185,
    lng: 121.5274,
    styles: ['日式 Japanese'],
    categories: ['午晚餐 Lunch / Dinner'],
    isSaved: true,
    rating: 4.4,
    priceLevel: '$$',
  },
  {
    id: 'rest_2',
    name: 'Ichiran Ramen',
    address: '台北市信義區信義路五段7號',
    lat: 25.0330,
    lng: 121.5654,
    styles: ['日式 Japanese'],
    categories: ['麵食 Noodles'],
    isSaved: true,
    rating: 4.5,
    priceLevel: '$$$',
  },
  {
    id: 'rest_3',
    name: '鼎泰豐',
    address: '台北市大安區信義路二段194號',
    lat: 25.0339,
    lng: 121.5325,
    styles: ['台菜 Taiwanese'],
    categories: ['午晚餐 Lunch / Dinner'],
    isSaved: true,
    rating: 4.8,
    priceLevel: '$$',
  },
  {
    id: 'rest_4',
    name: 'Lady M',
    address: '台北市信義區松高路19號',
    lat: 25.0400,
    lng: 121.5680,
    styles: ['法式 French'],
    categories: ['甜點 Desserts'],
    isSaved: true,
    rating: 4.7,
    priceLevel: '$$$',
  },
  {
    id: 'rest_5',
    name: '永和豆漿',
    address: '台北市大安區羅斯福路三段316巷',
    lat: 25.0167,
    lng: 121.5333,
    styles: ['中式 Chinese'],
    categories: ['早餐 Breakfast'],
    isSaved: false,
    rating: 4.2,
    priceLevel: '$',
  },
  {
    id: 'rest_6',
    name: '韓式炸雞店',
    address: '台北市信義區松仁路58號',
    lat: 25.0380,
    lng: 121.5700,
    styles: ['韓式 Korean'],
    categories: ['速食 Fast Food'],
    isSaved: false,
    rating: 4.6,
    priceLevel: '$$',
  },
  {
    id: 'rest_7',
    name: '麥當勞-天母餐廳',
    address: '台北市士林區天母西路3號',
    lat: 25.1200,
    lng: 121.5274,
    styles: ['美式 American'],
    categories: ['速食 Fast Food'],
    isSaved: true,
    rating: 4.3,
    priceLevel: '$$',
  },
];

// Fetch all restaurants (saved and unsaved)
export const fetchAllRestaurants = async (): Promise<SavedRestaurant[]> => {
  // TODO: In production, fetch from API
  // const response = await fetch('/api/restaurants');
  // return response.json();
  return mockRestaurants;
};

// Save a restaurant
export const saveRestaurant = async (restaurantId: string, styles: string[], categories: string[]): Promise<void> => {
  // TODO: In production, call API
  // await fetch(`/api/restaurants/${restaurantId}/save`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ styles, categories }),
  // });
  console.log('Save restaurant:', restaurantId, styles, categories);
};

// Unsave a restaurant
export const unsaveRestaurant = async (restaurantId: string): Promise<void> => {
  // TODO: In production, call API
  // await fetch(`/api/restaurants/${restaurantId}/unsave`, {
  //   method: 'DELETE',
  // });
  console.log('Unsave restaurant:', restaurantId);
};

