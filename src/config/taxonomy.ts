/**
 * Unified Taxonomy Configuration
 * Single source of truth for Style (風格) and Category (類別) options
 * 
 * All UI components, filters, and API validation should import from here.
 * DO NOT duplicate these arrays elsewhere in the codebase.
 */

import { sortWithOthersLast } from '../utils/sorting';

// ============================================================================
// Type Definitions
// ============================================================================

export interface TaxonomyOption {
  /** Stable key for DB storage, API params, URL queries */
  key: string;
  /** Chinese label */
  zh: string;
  /** English label */
  en: string;
  /** Combined bilingual display label: "中文 English" */
  label: string;
  /** Sort key (usually English name for alphabetical sorting) */
  sortKey: string;
}

export interface BoardOption extends TaxonomyOption {
  /** Board category: 'cuisine' for styles, 'type' for categories */
  category: 'cuisine' | 'type';
}

// ============================================================================
// REMOVED STYLES (for migration/fallback mapping)
// These styles are no longer selectable but may exist in old data
// ============================================================================

export const REMOVED_STYLE_KEYS = new Set([
  'western',    // 西式料理 - only this one is still removed
]);

// Legacy label mapping (old Chinese-only labels → current key)
export const LEGACY_STYLE_LABELS: Record<string, string> = {
  '中式料理': 'chinese',
  '義式料理': 'italian',
  '日式料理': 'japanese',
  '韓式料理': 'korean',
  '台灣小吃': 'taiwanese',
  '泰式料理': 'thai',
  '西式料理': 'western',
  // Current bilingual labels
  '中式 Chinese': 'chinese',
  '義式 Italian': 'italian',
  '日式 Japanese': 'japanese',
  '韓式 Korean': 'korean',
  '台菜 Taiwanese': 'taiwanese',
  '泰式 Thai': 'thai',
};

// ============================================================================
// STYLE OPTIONS (Cuisine Types / 風格)
// ============================================================================

const STYLE_OPTIONS_RAW: TaxonomyOption[] = [
  { key: 'american', zh: '美式', en: 'American', label: '美式 American', sortKey: 'American' },
  { key: 'chinese', zh: '中式', en: 'Chinese', label: '中式 Chinese', sortKey: 'Chinese' },
  { key: 'french', zh: '法式', en: 'French', label: '法式 French', sortKey: 'French' },
  { key: 'hongkong', zh: '港式', en: 'Hong Kong', label: '港式 Hong Kong', sortKey: 'Hong Kong' },
  { key: 'indian', zh: '印度', en: 'Indian', label: '印度 Indian', sortKey: 'Indian' },
  { key: 'italian', zh: '義式', en: 'Italian', label: '義式 Italian', sortKey: 'Italian' },
  { key: 'japanese', zh: '日式', en: 'Japanese', label: '日式 Japanese', sortKey: 'Japanese' },
  { key: 'korean', zh: '韓式', en: 'Korean', label: '韓式 Korean', sortKey: 'Korean' },
  { key: 'mexican', zh: '墨西哥', en: 'Mexican', label: '墨西哥 Mexican', sortKey: 'Mexican' },
  { key: 'taiwanese', zh: '台菜', en: 'Taiwanese', label: '台菜 Taiwanese', sortKey: 'Taiwanese' },
  { key: 'thai', zh: '泰式', en: 'Thai', label: '泰式 Thai', sortKey: 'Thai' },
  { key: 'vietnamese', zh: '越式', en: 'Vietnamese', label: '越式 Vietnamese', sortKey: 'Vietnamese' },
  { key: 'others-style', zh: '其他', en: 'Others', label: '其他 Others', sortKey: 'Others' },
];

/** Sorted style options for UI display (alphabetical by English, "Others" last) */
export const STYLES = sortWithOthersLast(STYLE_OPTIONS_RAW, (opt) => opt.sortKey);

/** Set of valid style keys for validation */
export const STYLE_KEYS = new Set(STYLES.map(s => s.key));

/** Map: key → TaxonomyOption for quick lookup */
export const styleByKey = new Map(STYLES.map(s => [s.key, s]));

/** Map: label → TaxonomyOption for label-based lookup */
export const styleByLabel = new Map(STYLES.map(s => [s.label, s]));

// ============================================================================
// CATEGORY OPTIONS (Food Types / 類別)
// ============================================================================

const CATEGORY_OPTIONS_RAW: TaxonomyOption[] = [
  { key: 'beverages', zh: '飲料', en: 'Beverages', label: '飲料 Beverages', sortKey: 'Beverages' },
  { key: 'breakfast', zh: '早餐', en: 'Breakfast', label: '早餐 Breakfast', sortKey: 'Breakfast' },
  { key: 'brunch', zh: '早午餐', en: 'Brunch', label: '早午餐 Brunch', sortKey: 'Brunch' },
  { key: 'cafe', zh: '咖啡廳', en: 'Cafe', label: '咖啡廳 Cafe', sortKey: 'Cafe' },
  { key: 'desserts', zh: '甜點', en: 'Desserts', label: '甜點 Desserts', sortKey: 'Desserts' },
  { key: 'fastfood', zh: '速食', en: 'Fast Food', label: '速食 Fast Food', sortKey: 'Fast Food' },
  { key: 'hotpot', zh: '火鍋', en: 'Hotpot', label: '火鍋 Hotpot', sortKey: 'Hotpot' },
  { key: 'late_night', zh: '宵夜', en: 'Late Night', label: '宵夜 Late Night', sortKey: 'Late Night' },
  { key: 'lunch_din', zh: '午晚餐', en: 'Lunch / Dinner', label: '午晚餐 Lunch / Dinner', sortKey: 'Lunch / Dinner' },
  { key: 'noodles', zh: '麵食', en: 'Noodles', label: '麵食 Noodles', sortKey: 'Noodles' },
  { key: 'ramen', zh: '拉麵', en: 'Ramen', label: '拉麵 Ramen', sortKey: 'Ramen' },
  { key: 'rice', zh: '米飯', en: 'Rice', label: '米飯 Rice', sortKey: 'Rice' },
  { key: 'streetfood', zh: '街頭小吃', en: 'Street Food', label: '街頭小吃 Street Food', sortKey: 'Street Food' },
  { key: 'vegetarian', zh: '素食', en: 'Vegetarian', label: '素食 Vegetarian', sortKey: 'Vegetarian' },
  { key: 'others-category', zh: '其他', en: 'Others', label: '其他 Others', sortKey: 'Others' },
];

/** Sorted category options for UI display (alphabetical by English, "Others" last) */
export const CATEGORIES = sortWithOthersLast(CATEGORY_OPTIONS_RAW, (opt) => opt.sortKey);

/** Set of valid category keys for validation */
export const CATEGORY_KEYS = new Set(CATEGORIES.map(c => c.key));

/** Map: key → TaxonomyOption for quick lookup */
export const categoryByKey = new Map(CATEGORIES.map(c => [c.key, c]));

/** Map: label → TaxonomyOption for label-based lookup */
export const categoryByLabel = new Map(CATEGORIES.map(c => [c.label, c]));

// ============================================================================
// BOARDS (Combined for Sidebar/Filters)
// ============================================================================

/** Style boards for sidebar filtering */
export const STYLE_BOARDS: BoardOption[] = STYLES.map(s => ({
  ...s,
  category: 'cuisine' as const,
}));

/** Category boards for sidebar filtering */
export const CATEGORY_BOARDS: BoardOption[] = CATEGORIES.map(c => ({
  ...c,
  category: 'type' as const,
}));

/** All boards combined */
export const ALL_BOARDS: BoardOption[] = [...STYLE_BOARDS, ...CATEGORY_BOARDS];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Normalize a style value: handle legacy labels, removed styles, and return proper label
 * @param value - Key or label to normalize
 * @returns The bilingual label if valid, or '其他 Others' as fallback
 */
export function normalizeStyleLabel(value: string | null | undefined): string {
  if (!value) return '其他 Others';
  
  // Check if it's a valid key
  const byKey = styleByKey.get(value);
  if (byKey) return byKey.label;
  
  // Check if it's already a valid label
  if (styleByLabel.has(value)) return value;
  
  // Check if it's a legacy label that maps to a removed style
  const legacyKey = LEGACY_STYLE_LABELS[value];
  if (legacyKey && REMOVED_STYLE_KEYS.has(legacyKey)) {
    return '其他 Others'; // Map removed styles to Others
  }
  
  // Unknown → fallback to Others
  return '其他 Others';
}

/**
 * Normalize a category value: return proper label or fallback
 * @param value - Key or label to normalize
 * @returns The bilingual label if valid, or '其他 Others' as fallback
 */
export function normalizeCategoryLabel(value: string | null | undefined): string {
  if (!value) return '其他 Others';
  
  // Check if it's a valid key
  const byKey = categoryByKey.get(value);
  if (byKey) return byKey.label;
  
  // Check if it's already a valid label
  if (categoryByLabel.has(value)) return value;
  
  // Unknown → fallback to Others
  return '其他 Others';
}

/**
 * Check if a style key/label is valid and selectable (not removed)
 */
export function isValidStyle(value: string | null | undefined): boolean {
  if (!value) return false;
  return STYLE_KEYS.has(value) || styleByLabel.has(value);
}

/**
 * Check if a category key/label is valid
 */
export function isValidCategory(value: string | null | undefined): boolean {
  if (!value) return false;
  return CATEGORY_KEYS.has(value) || categoryByLabel.has(value);
}

/**
 * Get style key from label or key
 */
export function getStyleKey(value: string | null | undefined): string | null {
  if (!value) return null;
  if (STYLE_KEYS.has(value)) return value;
  const opt = styleByLabel.get(value);
  return opt?.key || null;
}

/**
 * Get category key from label or key
 */
export function getCategoryKey(value: string | null | undefined): string | null {
  if (!value) return null;
  if (CATEGORY_KEYS.has(value)) return value;
  const opt = categoryByLabel.get(value);
  return opt?.key || null;
}

// ============================================================================
// Backward Compatibility Exports
// (For components that expect the old tagOptions.ts format)
// ============================================================================

/** @deprecated Use STYLES from taxonomy.ts instead */
export const STYLE_OPTIONS = STYLES.map(s => ({
  id: s.key,
  label: s.label,
  sortKey: s.sortKey,
}));

/** @deprecated Use CATEGORIES from taxonomy.ts instead */
export const CATEGORY_OPTIONS = CATEGORIES.map(c => ({
  id: c.key,
  label: c.label,
  sortKey: c.sortKey,
}));

