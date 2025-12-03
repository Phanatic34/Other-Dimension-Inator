import { sortWithOthersLast } from './sorting';

// Style options (cuisine types)
export const STYLE_OPTIONS_RAW = [
  { id: 'american', label: '美式 American', sortKey: 'American' },
  { id: 'chinese', label: '中式 Chinese', sortKey: 'Chinese' },
  { id: 'french', label: '法式 French', sortKey: 'French' },
  { id: 'hongkong', label: '港式 Hong Kong', sortKey: 'Hong Kong' },
  { id: 'indian', label: '印度 Indian', sortKey: 'Indian' },
  { id: 'italian', label: '義式 Italian', sortKey: 'Italian' },
  { id: 'japanese', label: '日式 Japanese', sortKey: 'Japanese' },
  { id: 'korean', label: '韓式 Korean', sortKey: 'Korean' },
  { id: 'mexican', label: '墨西哥 Mexican', sortKey: 'Mexican' },
  { id: 'taiwanese', label: '台菜 Taiwanese', sortKey: 'Taiwanese' },
  { id: 'thai', label: '泰式 Thai', sortKey: 'Thai' },
  { id: 'vietnamese', label: '越式 Vietnamese', sortKey: 'Vietnamese' },
  { id: 'others-style', label: '其他 Others', sortKey: 'Others' },
];

// Sort alphabetically by English name, with "Others" always last
export const STYLE_OPTIONS = sortWithOthersLast(STYLE_OPTIONS_RAW, (opt) => opt.sortKey);

// Category options (food types)
export const CATEGORY_OPTIONS_RAW = [
  { id: 'breakfast', label: '早餐 Breakfast', sortKey: 'Breakfast' },
  { id: 'beverages', label: '飲料 Beverages', sortKey: 'Beverages' },
  { id: 'desserts', label: '甜點 Desserts', sortKey: 'Desserts' },
  { id: 'lunch_din', label: '午晚餐 Lunch / Dinner', sortKey: 'Lunch / Dinner' },
  { id: 'late_night', label: '宵夜 Late Night', sortKey: 'Late Night' },
  { id: 'noodles', label: '麵食 Noodles', sortKey: 'Noodles' },
  { id: 'rice', label: '米飯 Rice', sortKey: 'Rice' },
  { id: 'streetfood', label: '街頭小吃 Street Food', sortKey: 'Street Food' },
  { id: 'fastfood', label: '速食 Fast Food', sortKey: 'Fast Food' },
  { id: 'vegetarian', label: '素食 Vegetarian', sortKey: 'Vegetarian' },
  { id: 'others-category', label: '其他 Others', sortKey: 'Others' },
];

// Sort alphabetically by English name, with "Others" always last
export const CATEGORY_OPTIONS = sortWithOthersLast(CATEGORY_OPTIONS_RAW, (opt) => opt.sortKey);

