import React, { useState, useRef, useEffect } from 'react';
import { LocationSearchModal } from './LocationSearchModal';
import { InteractiveRatingInput } from './InteractiveRatingInput';
import { sortWithOthersLast } from '../../utils/sorting';

interface ReviewPostComposerProps {
  avatarUrl?: string;
  onCreateReviewPost?: (values: ReviewPostFormValues) => void;
}

interface LocationData {
  restaurantName: string;
  address: string;
  lat: number;
  lng: number;
  region?: string;
}

// Visibility type - required field
type Visibility = 'public' | 'followers';

// Form values interface for submission
export interface ReviewPostFormValues {
  restaurantName: string;
  restaurantAddress: string;
  lat?: number | null;
  lng?: number | null;
  locationDisplayName: string; // e.g. "大安區 | 好吃炒飯" or "Tianmu | 勝博殿"
  styleTags: string[];         // Style ids (single-select converted to array)
  categoryTags: string[];      // Category ids (single-select converted to array)
  rating: number;              // 0.0–5.0
  priceMin?: number | null;
  priceMax?: number | null;
  content: string;
  visibility: 'public' | 'followers';
  photoFiles: File[];          // from the photos section
}

// Style options (matching sidebar filters + mock.ts boards)
const STYLE_OPTIONS_RAW = [
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
const STYLE_OPTIONS = sortWithOthersLast(STYLE_OPTIONS_RAW, (opt) => opt.sortKey);

// Category options (matching sidebar filters + mock.ts boards)
const CATEGORY_OPTIONS_RAW = [
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
const CATEGORY_OPTIONS = sortWithOthersLast(CATEGORY_OPTIONS_RAW, (opt) => opt.sortKey);

const MAX_PHOTOS = 9;

/**
 * Comprehensive post composer for review posts
 * Features: expandable, restaurant location search, tags, rating, price, content, visibility, photos
 * REQUIRED FIELDS: location, style, category, rating (>0), visibility, content
 */
export const ReviewPostComposer: React.FC<ReviewPostComposerProps> = ({
  avatarUrl,
  onCreateReviewPost,
}) => {
  // UI State
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  // Form State
  const [location, setLocation] = useState<LocationData | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [priceError, setPriceError] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<Visibility | null>(null); // Required: null initially
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const compactComposerRef = useRef<HTMLElement | null>(null);
  const expandedComposerRef = useRef<HTMLElement | null>(null);

  // Cleanup photo preview URLs on unmount
  useEffect(() => {
    return () => {
      photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [photoPreviews]);

  // Price range validation
  const validatePriceRange = (min: string, max: string) => {
    const minNum = min === '' ? null : Number(min);
    const maxNum = max === '' ? null : Number(max);
    
    if (minNum !== null && maxNum !== null && maxNum < minNum) {
      setPriceError('最大值必須大於或等於最小值');
    } else {
      setPriceError(null);
    }
  };

  // Derived: Check if price range is invalid (both have values and min > max)
  const hasInvalidPriceRange =
    priceMin !== '' &&
    priceMax !== '' &&
    Number(priceMin) > Number(priceMax);

  // Validation - All required fields
  const isLocationValid = 
    location !== null &&
    location.restaurantName.trim() !== '' &&
    location.address.trim() !== '';
  
  const isStyleValid = selectedStyle !== null;
  const isCategoryValid = selectedCategory !== null;
  const isRatingValid = rating > 0; // NEW: Rating must be > 0
  const isVisibilityValid = visibility !== null; // NEW: Visibility required
  const isContentValid = content.trim() !== '';

  // Overall validation
  const isValid = 
    isLocationValid && 
    isStyleValid && 
    isCategoryValid && 
    isRatingValid && 
    isVisibilityValid && 
    isContentValid &&
    !hasInvalidPriceRange;

  const handleExpand = () => {
    // Expand in-place without scrolling
    setIsExpanded(true);
  };

  const handleCancel = () => {
    // Reset all form state
    setLocation(null);
    setSelectedStyle(null);
    setSelectedCategory(null);
    setRating(0);
    setPriceMin('');
    setPriceMax('');
    setPriceError(null);
    setContent('');
    setVisibility(null);
    setHasTriedSubmit(false); // Reset submit attempt flag
    
    // Clear photos and previews
    photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    setPhotos([]);
    setPhotoPreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setIsExpanded(false);
  };

  const handleSubmit = () => {
    // Set flag to show validation errors
    setHasTriedSubmit(true);

    // Re-validate prices before submit
    validatePriceRange(priceMin, priceMax);

    // Check all required fields
    const missingLocation = !isLocationValid;
    const missingStyle = !isStyleValid;
    const missingCategory = !isCategoryValid;
    const missingRating = !isRatingValid;
    const missingVisibility = !isVisibilityValid;
    const missingContent = !isContentValid;

    const hasError =
      missingLocation ||
      missingStyle ||
      missingCategory ||
      missingRating ||
      missingVisibility ||
      missingContent ||
      hasInvalidPriceRange;

    if (hasError) {
      // Do NOT submit, just show errors
      return;
    }

    // Build payload - all required fields are guaranteed non-null here
    const minPriceNum = priceMin ? parseInt(priceMin) : null;
    const maxPriceNum = priceMax ? parseInt(priceMax) : null;
    
    // Final validation: ensure max >= min
    if (minPriceNum !== null && maxPriceNum !== null && maxPriceNum < minPriceNum) {
      return; // Block submission
    }

    // Build locationDisplayName: "region | restaurantName" or just "restaurantName"
    const locationDisplayName = location!.region
      ? `${location!.region} | ${location!.restaurantName}`
      : location!.restaurantName;

    const formValues: ReviewPostFormValues = {
      restaurantName: location!.restaurantName,
      restaurantAddress: location!.address,
      lat: location!.lat,
      lng: location!.lng,
      locationDisplayName,
      styleTags: selectedStyle ? [selectedStyle] : [], // Convert single-select to array
      categoryTags: selectedCategory ? [selectedCategory] : [], // Convert single-select to array
      rating: rating,
      priceMin: minPriceNum,
      priceMax: maxPriceNum,
      content: content.trim(),
      visibility: visibility!,
      photoFiles: photos,
    };

    // Call the callback to create the post
    onCreateReviewPost?.(formValues);

    // Reset and collapse (this also resets hasTriedSubmit)
    handleCancel();
  };

  const handleLocationSelect = (locationData: LocationData) => {
    setLocation(locationData);
    setIsLocationModalOpen(false);

    // Smoothly scroll back to the composer after modal closes
    requestAnimationFrame(() => {
      // Try expanded composer first, then fallback to compact
      const targetElement = expandedComposerRef.current || compactComposerRef.current;
      targetElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  const handleStyleClick = (styleId: string) => {
    setSelectedStyle(selectedStyle === styleId ? null : styleId);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleVisibilityClick = (vis: Visibility) => {
    setVisibility(vis);
  };

  const handleAddPhotosClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotosSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];

    // Convert FileList to array and check total count
    const selectedFiles = Array.from(files);
    const remainingSlots = MAX_PHOTOS - photos.length;
    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      // Only accept image files
      if (file.type.startsWith('image/')) {
        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    if (newFiles.length > 0) {
      setPhotos((prev) => [...prev, ...newFiles]);
      setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    }

    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (index: number) => {
    // Revoke the object URL to free memory
    URL.revokeObjectURL(photoPreviews[index]);

    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Collapsed State
  if (!isExpanded) {
    return (
      <>
        <section
          ref={compactComposerRef}
          onClick={handleExpand}
          data-review-composer
          className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex gap-3">
            {/* Avatar */}
            <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
              <img
                src={
                  avatarUrl ||
                  'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
                }
                alt="Your avatar"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Placeholder Text */}
            <div className="flex-1 flex items-center">
              <p className="text-[15px] text-text-secondary">
                今天吃了什麼好東西？分享一下用餐心得吧…
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  const handleCollapse = () => {
    // Collapse without clearing form data
    // No scroll - let the page naturally adjust as composer shrinks
    setIsExpanded(false);
  };

  // Expanded State
  return (
    <>
      <section 
        ref={expandedComposerRef}
        className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-6 py-5 shadow-lg"
      >
        {/* Header with Avatar and Collapse Button */}
        <div className="flex gap-3 mb-5">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
            <img
              src={
                avatarUrl ||
                'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
              }
              alt="Your avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-text-primary">
              新增餐廳評價
            </h3>
            <p className="text-sm text-text-secondary">
              分享你的用餐體驗
            </p>
          </div>
          {/* Collapse Button */}
          <button
            type="button"
            onClick={handleCollapse}
            className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
            aria-label="收起編輯區"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>

        {/* Restaurant / Location Section */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-text-primary mb-2">
            餐廳與地點 *
          </label>
          {!location ? (
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-accent-gold hover:bg-accent-gold hover:bg-opacity-5 transition-all text-text-secondary"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium">新增餐廳與地點</span>
            </button>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-accent-gold bg-opacity-10 border border-accent-gold rounded-xl">
              <svg
                className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-primary">
                  {location.restaurantName}
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  {location.address}
                </p>
              </div>
              <button
                onClick={() => setLocation(null)}
                className="flex-shrink-0 p-1 rounded-full hover:bg-white hover:bg-opacity-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          {hasTriedSubmit && !isLocationValid && (
            <p className="text-xs text-red-500 mt-2">
              請選擇餐廳與地址
            </p>
          )}
        </div>

        {/* Tags Section: Style & Category - REQUIRED */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-text-primary mb-3">
            標籤 *
          </label>

          {/* Style Tags - REQUIRED */}
          <div className="mb-3">
            <p className="text-xs text-text-secondary mb-2">
              風格 Style *
            </p>
            <div className="flex flex-wrap gap-2">
              {STYLE_OPTIONS.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleClick(style.id)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                    selectedStyle === style.id
                      ? 'bg-accent-gold border-accent-gold text-text-primary font-semibold shadow-sm'
                      : 'bg-white border-gray-300 text-text-secondary hover:border-accent-gold hover:bg-accent-gold hover:bg-opacity-10'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
            {/* Validation message for Style */}
            {hasTriedSubmit && !isStyleValid && (
              <p className="text-xs text-red-500 mt-2">
                請至少選擇一個風格
              </p>
            )}
          </div>

          {/* Category Tags - REQUIRED */}
          <div>
            <p className="text-xs text-text-secondary mb-2">
              類別 Category *
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-all ${
                    selectedCategory === category.id
                      ? 'bg-accent-gold border-accent-gold text-text-primary font-semibold shadow-sm'
                      : 'bg-white border-gray-300 text-text-secondary hover:border-accent-gold hover:bg-accent-gold hover:bg-opacity-10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
            {/* Validation message for Category */}
            {hasTriedSubmit && !isCategoryValid && (
              <p className="text-xs text-red-500 mt-2">
                請至少選擇一個類別
              </p>
            )}
          </div>
        </div>

        {/* Rating Section - NOW REQUIRED */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-text-primary mb-3">
            評分 *
          </label>
          <InteractiveRatingInput rating={rating} onChange={setRating} />
          {/* Validation message for Rating */}
          {hasTriedSubmit && !isRatingValid && (
            <p className="text-xs text-red-500 mt-2">
              請給這間餐廳一個評分
            </p>
          )}
        </div>

        {/* Price Range Section */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-text-primary mb-2">
            價格範圍
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <input
                type="number"
                min="0"
                step="50"
                value={priceMin}
                onChange={(e) => {
                  const value = e.target.value;
                  setPriceMin(value);
                  validatePriceRange(value, priceMax);
                }}
                placeholder="最小值"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  hasInvalidPriceRange ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={hasInvalidPriceRange}
              />
            </div>
            <span className="text-text-secondary">—</span>
            <div className="flex-1">
              <input
                type="number"
                min="0"
                step="50"
                value={priceMax}
                onChange={(e) => {
                  const value = e.target.value;
                  setPriceMax(value);
                  validatePriceRange(priceMin, value);
                }}
                placeholder="最大值"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                  hasInvalidPriceRange ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={hasInvalidPriceRange}
              />
            </div>
          </div>
          {hasInvalidPriceRange ? (
            <p className="mt-1 text-xs text-red-500">
              請確認價格範圍：最大值必須大於或等於最小值
            </p>
          ) : (
            <p className="text-xs text-text-secondary mt-2">
              範例：NT$ 300 – 800
            </p>
          )}
        </div>

        {/* Photos Section - NEW */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-text-primary">
              照片 Photos
            </label>
            <button
              type="button"
              onClick={handleAddPhotosClick}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-accent-primary border border-accent-gold rounded-lg hover:bg-accent-gold hover:bg-opacity-10 transition-colors"
              aria-label="新增照片"
              disabled={photos.length >= MAX_PHOTOS}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>新增</span>
            </button>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handlePhotosSelected}
          />

          {/* Photo previews */}
          {photoPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-3">
              {photoPreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group"
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label={`移除照片 ${index + 1}`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Photo count hint */}
          {photos.length > 0 && (
            <p className="text-xs text-text-secondary">
              已選擇 {photos.length} 張照片 {photos.length >= MAX_PHOTOS && '(已達上限)'}
            </p>
          )}
        </div>

        {/* Content Section */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-text-primary mb-2">
            用餐心得 *
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今天吃了什麼好東西？分享一下用餐心得吧…"
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent resize-none text-base text-text-primary placeholder:text-text-secondary/50"
            style={{ maxHeight: '200px' }}
          />
          <p className="text-xs text-text-secondary mt-1 text-right">
            {content.length} 字
          </p>
          {hasTriedSubmit && !isContentValid && (
            <p className="text-xs text-red-500 mt-2">
              請輸入用餐心得
            </p>
          )}
        </div>

        {/* Visibility Section - NOW REQUIRED */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-text-primary mb-2">
            是否公開 *
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleVisibilityClick('public')}
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                visibility === 'public'
                  ? 'bg-accent-gold border-accent-gold text-text-primary shadow-sm'
                  : 'bg-white border-gray-300 text-text-secondary hover:border-accent-gold'
              }`}
            >
              公開 Public
            </button>
            <button
              onClick={() => handleVisibilityClick('followers')}
              className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                visibility === 'followers'
                  ? 'bg-accent-gold border-accent-gold text-text-primary shadow-sm'
                  : 'bg-white border-gray-300 text-text-secondary hover:border-accent-gold'
              }`}
            >
              僅限追蹤者 Followers
            </button>
          </div>
          {/* Validation message for Visibility */}
          {hasTriedSubmit && !isVisibilityValid && (
            <p className="text-xs text-red-500 mt-2">
              請選擇是否公開
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border-color opacity-50 mb-4" />

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="text-text-secondary hover:text-text-primary font-medium transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`px-8 py-2.5 rounded-full font-semibold text-white transition-all ${
              isValid
                ? 'bg-[#b63a2f] hover:brightness-110 shadow-md hover:shadow-lg'
                : 'bg-[#d3c6b8] cursor-not-allowed'
            }`}
          >
            發佈
          </button>
        </div>
      </section>

      {/* Location Search Modal */}
      <LocationSearchModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />
    </>
  );
};
