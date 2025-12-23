/**
 * Unified Taxonomy Configuration for Backend
 * Single source of truth for Style (風格) and Category (類別) validation
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface TaxonomyOption {
  key: string;
  zh: string;
  en: string;
  label: string;
}

// ============================================================================
// REMOVED STYLES (for migration/fallback mapping)
// ============================================================================

export const REMOVED_STYLE_KEYS = new Set([
  'chinese',    // 中式料理
  'italian',    // 義式料理
  'japanese',   // 日式料理
  'korean',     // 韓式料理
  'taiwanese',  // 台灣小吃
  'thai',       // 泰式料理
  'western',    // 西式料理
]);

// Legacy label mapping (old Chinese-only labels → key)
export const LEGACY_STYLE_LABELS: Record<string, string> = {
  '中式料理': 'chinese',
  '義式料理': 'italian',
  '日式料理': 'japanese',
  '韓式料理': 'korean',
  '台灣小吃': 'taiwanese',
  '泰式料理': 'thai',
  '西式料理': 'western',
  '中式 Chinese': 'chinese',
  '義式 Italian': 'italian',
  '日式 Japanese': 'japanese',
  '韓式 Korean': 'korean',
  '台菜 Taiwanese': 'taiwanese',
  '泰式 Thai': 'thai',
};

// ============================================================================
// VALID STYLES (only these are selectable)
// ============================================================================

export const STYLES: TaxonomyOption[] = [
  { key: 'american', zh: '美式', en: 'American', label: '美式 American' },
  { key: 'french', zh: '法式', en: 'French', label: '法式 French' },
  { key: 'hongkong', zh: '港式', en: 'Hong Kong', label: '港式 Hong Kong' },
  { key: 'indian', zh: '印度', en: 'Indian', label: '印度 Indian' },
  { key: 'mexican', zh: '墨西哥', en: 'Mexican', label: '墨西哥 Mexican' },
  { key: 'vietnamese', zh: '越式', en: 'Vietnamese', label: '越式 Vietnamese' },
  { key: 'others-style', zh: '其他', en: 'Others', label: '其他 Others' },
];

export const STYLE_KEYS = new Set(STYLES.map(s => s.key));
export const STYLE_LABELS = new Set(STYLES.map(s => s.label));
export const styleByKey = new Map(STYLES.map(s => [s.key, s]));
export const styleByLabel = new Map(STYLES.map(s => [s.label, s]));

// ============================================================================
// VALID CATEGORIES
// ============================================================================

export const CATEGORIES: TaxonomyOption[] = [
  { key: 'beverages', zh: '飲料', en: 'Beverages', label: '飲料 Beverages' },
  { key: 'breakfast', zh: '早餐', en: 'Breakfast', label: '早餐 Breakfast' },
  { key: 'brunch', zh: '早午餐', en: 'Brunch', label: '早午餐 Brunch' },
  { key: 'cafe', zh: '咖啡廳', en: 'Cafe', label: '咖啡廳 Cafe' },
  { key: 'desserts', zh: '甜點', en: 'Desserts', label: '甜點 Desserts' },
  { key: 'fastfood', zh: '速食', en: 'Fast Food', label: '速食 Fast Food' },
  { key: 'hotpot', zh: '火鍋', en: 'Hotpot', label: '火鍋 Hotpot' },
  { key: 'late_night', zh: '宵夜', en: 'Late Night', label: '宵夜 Late Night' },
  { key: 'lunch_din', zh: '午晚餐', en: 'Lunch / Dinner', label: '午晚餐 Lunch / Dinner' },
  { key: 'noodles', zh: '麵食', en: 'Noodles', label: '麵食 Noodles' },
  { key: 'ramen', zh: '拉麵', en: 'Ramen', label: '拉麵 Ramen' },
  { key: 'rice', zh: '米飯', en: 'Rice', label: '米飯 Rice' },
  { key: 'streetfood', zh: '街頭小吃', en: 'Street Food', label: '街頭小吃 Street Food' },
  { key: 'vegetarian', zh: '素食', en: 'Vegetarian', label: '素食 Vegetarian' },
  { key: 'others-category', zh: '其他', en: 'Others', label: '其他 Others' },
];

export const CATEGORY_KEYS = new Set(CATEGORIES.map(c => c.key));
export const CATEGORY_LABELS = new Set(CATEGORIES.map(c => c.label));
export const categoryByKey = new Map(CATEGORIES.map(c => [c.key, c]));
export const categoryByLabel = new Map(CATEGORIES.map(c => [c.label, c]));

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Normalize style value: handle legacy labels, removed styles, return valid label
 */
export function normalizeStyleLabel(value: string | null | undefined): string {
  if (!value) return '其他 Others';
  
  // Check if it's a valid key
  const byKey = styleByKey.get(value);
  if (byKey) return byKey.label;
  
  // Check if it's already a valid label
  if (styleByLabel.has(value)) return value;
  
  // Check if it's a legacy/removed style label
  const legacyKey = LEGACY_STYLE_LABELS[value];
  if (legacyKey && REMOVED_STYLE_KEYS.has(legacyKey)) {
    return '其他 Others';
  }
  
  // Unknown → fallback to Others
  return '其他 Others';
}

/**
 * Normalize category value: return proper label or fallback
 */
export function normalizeCategoryLabel(value: string | null | undefined): string {
  if (!value) return '其他 Others';
  
  const byKey = categoryByKey.get(value);
  if (byKey) return byKey.label;
  
  if (categoryByLabel.has(value)) return value;
  
  return '其他 Others';
}

/**
 * Check if style key/label is valid and selectable
 */
export function isValidStyle(value: string | null | undefined): boolean {
  if (!value) return false;
  return STYLE_KEYS.has(value) || STYLE_LABELS.has(value);
}

/**
 * Check if category key/label is valid
 */
export function isValidCategory(value: string | null | undefined): boolean {
  if (!value) return false;
  return CATEGORY_KEYS.has(value) || CATEGORY_LABELS.has(value);
}

/**
 * Get all valid style keys (for API validation)
 */
export function getValidStyleKeys(): string[] {
  return Array.from(STYLE_KEYS);
}

/**
 * Get all valid category keys (for API validation)
 */
export function getValidCategoryKeys(): string[] {
  return Array.from(CATEGORY_KEYS);
}

