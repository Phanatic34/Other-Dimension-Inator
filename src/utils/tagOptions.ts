/**
 * Tag Options - Re-exports from unified taxonomy
 * 
 * @deprecated Import directly from '../config/taxonomy' instead.
 * This file is kept for backward compatibility.
 */

export {
  STYLE_OPTIONS,
  CATEGORY_OPTIONS,
  STYLES,
  CATEGORIES,
  STYLE_KEYS,
  CATEGORY_KEYS,
  styleByKey,
  styleByLabel,
  categoryByKey,
  categoryByLabel,
  STYLE_BOARDS,
  CATEGORY_BOARDS,
  ALL_BOARDS,
  normalizeStyleLabel,
  normalizeCategoryLabel,
  isValidStyle,
  isValidCategory,
  getStyleKey,
  getCategoryKey,
  REMOVED_STYLE_KEYS,
  LEGACY_STYLE_LABELS,
} from '../config/taxonomy';

export type { TaxonomyOption, BoardOption } from '../config/taxonomy';
