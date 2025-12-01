import React, { useState, useRef, useEffect } from 'react';
import { LocationSearchModal } from './LocationSearchModal';
import { sortWithOthersLast } from '../../utils/sorting';
import { Visibility } from '../../types/models';

interface DiningMeetupComposerProps {
  avatarUrl?: string;
  onCreateMeetupPost?: (values: DiningMeetupFormValues) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface LocationData {
  restaurantName: string;
  address: string;
  lat: number;
  lng: number;
  region?: string;
}

// Form values interface for submission
export interface DiningMeetupFormValues {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number;
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: Visibility;
  imageUrl?: string | null;
}

// Style options (reuse from ReviewPostComposer)
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

const STYLE_OPTIONS = sortWithOthersLast(STYLE_OPTIONS_RAW, (opt) => opt.sortKey);

// Category options
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
  { id: 'hotpot', label: '火鍋 Hotpot', sortKey: 'Hotpot' },
  { id: 'ramen', label: '拉麵 Ramen', sortKey: 'Ramen' },
  { id: 'others-category', label: '其他 Others', sortKey: 'Others' },
];

const CATEGORY_OPTIONS = sortWithOthersLast(CATEGORY_OPTIONS_RAW, (opt) => opt.sortKey);

/**
 * Comprehensive post composer for dining meetup posts
 * Features: restaurant location, tags, meetup time, headcount, budget, reservation, description, visibility
 */
export const DiningMeetupComposer: React.FC<DiningMeetupComposerProps> = ({
  avatarUrl,
  onCreateMeetupPost,
  isOpen = false,
  onClose,
}) => {
  // UI State
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  // Form State
  const [location, setLocation] = useState<LocationData | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null); // Single-select per group
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Single-select per group
  const [meetupDate, setMeetupDate] = useState<string>('');
  const [meetupTime, setMeetupTime] = useState<string>('');
  const [maxHeadcount, setMaxHeadcount] = useState<string>('');
  const [budgetNumeric, setBudgetNumeric] = useState<string>('');
  const [isTreating, setIsTreating] = useState<boolean>(false);
  const [hasReservation, setHasReservation] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Cleanup photo preview URL on unmount
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Validation helpers
  const isLocationValid = location !== null;
  const isStyleValid = selectedStyle !== null;
  const isCategoryValid = selectedCategory !== null;
  const isMeetupTimeValid = meetupDate !== '' && meetupTime !== '';
  
  // Validate meetup time is in the future
  const isMeetupTimeFuture = (): boolean => {
    if (!meetupDate || !meetupTime) return false;
    try {
      const dateTimeString = `${meetupDate}T${meetupTime}:00+08:00`;
      const meetupDateTime = new Date(dateTimeString);
      const now = new Date();
      return meetupDateTime > now;
    } catch {
      return false;
    }
  };
  
  const isMaxHeadcountValid = maxHeadcount !== '' && parseInt(maxHeadcount) >= 2;
  const isBudgetValid = isTreating || (budgetNumeric !== '' && !isNaN(parseInt(budgetNumeric)) && parseInt(budgetNumeric) > 0);
  const isDescriptionValid = description.trim().length > 0;
  const isVisibilityValid = visibility !== null;

  const handleCancel = () => {
    // Reset form
    setLocation(null);
    setSelectedStyle(null);
    setSelectedCategory(null);
    setMeetupDate('');
    setMeetupTime('');
    setMaxHeadcount('');
    setBudgetNumeric('');
    setIsTreating(false);
    setHasReservation(false);
    setDescription('');
    setVisibility(null);
    setPhotoFile(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
    }
    setHasTriedSubmit(false);
    onClose?.();
  };

  const handleSubmit = () => {
    setHasTriedSubmit(true);

    // Check all required fields
    const hasError =
      !isLocationValid ||
      !isStyleValid ||
      !isCategoryValid ||
      !isMeetupTimeValid ||
      !isMeetupTimeFuture() ||
      !isMaxHeadcountValid ||
      !isBudgetValid ||
      !isDescriptionValid ||
      !isVisibilityValid;

    if (hasError) {
      return;
    }

    // Build ISO datetime string
    const dateTimeString = `${meetupDate}T${meetupTime}:00+08:00`;

    // Build locationText from location
    const locationText = location!.region || location!.address;

    // Get tag labels from selected tag IDs
    const tagLabels: string[] = [];
    if (selectedStyle) {
      const styleTag = STYLE_OPTIONS.find(t => t.id === selectedStyle);
      if (styleTag) tagLabels.push(styleTag.label);
    }
    if (selectedCategory) {
      const categoryTag = CATEGORY_OPTIONS.find(t => t.id === selectedCategory);
      if (categoryTag) tagLabels.push(categoryTag.label);
    }

    // Build budgetDescription
    let budgetDescription = '';
    if (isTreating) {
      budgetDescription = '我請客';
    } else if (budgetNumeric) {
      budgetDescription = `預計 ${budgetNumeric} / 1 人`;
    }

    // Convert photo file to URL (for now, use object URL; in production, upload to cloud storage)
    const imageUrl = photoPreview || null;

    const formValues: DiningMeetupFormValues = {
      restaurantName: location!.restaurantName,
      locationText,
      meetupTime: dateTimeString,
      foodTags: tagLabels,
      maxHeadcount: parseInt(maxHeadcount),
      budgetDescription,
      hasReservation,
      description: description.trim(),
      visibility: visibility!,
      imageUrl,
    };

    onCreateMeetupPost?.(formValues);
    handleCancel();
  };

  const handleLocationSelect = (locationData: LocationData) => {
    setLocation(locationData);
    setIsLocationModalOpen(false);
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

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    // Cleanup previous preview
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
        onClick={handleCancel}
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <section className="px-6 py-5">
            {/* Header */}
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
                <h3 className="text-lg font-bold text-text-primary">揪吃飯貼文</h3>
                <p className="text-sm text-text-secondary">尋找一起用餐的夥伴</p>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-gray-100 transition-colors"
                aria-label="關閉"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Restaurant / Location Section */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                餐廳名稱與地點 *
              </label>
              {!location ? (
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-accent-gold hover:bg-accent-gold hover:bg-opacity-5 transition-all text-text-secondary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">新增餐廳與地點</span>
                </button>
              ) : (
                <div className="flex items-start gap-3 p-4 bg-accent-gold bg-opacity-10 border border-accent-gold rounded-xl">
                  <svg className="w-5 h-5 text-accent-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary">{location.restaurantName}</p>
                    <p className="text-sm text-text-secondary mt-1">{location.address}</p>
                  </div>
                  <button
                    onClick={() => setLocation(null)}
                    className="flex-shrink-0 p-1 rounded-full hover:bg-white hover:bg-opacity-50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              {hasTriedSubmit && !isLocationValid && (
                <p className="text-xs text-red-500 mt-2">請選擇餐廳與地址</p>
              )}
            </div>

            {/* Tags Section - Single-select per group, multi-select across groups */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-3">
                標籤 *
              </label>

              {/* Style Tags - Single-select */}
              <div className="mb-3">
                <p className="text-xs text-text-secondary mb-2">
                  風格 Style *
                </p>
                <div className="flex flex-wrap gap-2">
                  {STYLE_OPTIONS.map((style) => (
                    <button
                      key={style.id}
                      type="button"
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
                {hasTriedSubmit && !isStyleValid && (
                  <p className="text-xs text-red-500 mt-2">請至少選擇一個風格</p>
                )}
              </div>

              {/* Category Tags - Single-select */}
              <div>
                <p className="text-xs text-text-secondary mb-2">
                  類別 Category *
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORY_OPTIONS.map((category) => (
                    <button
                      key={category.id}
                      type="button"
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
                {hasTriedSubmit && !isCategoryValid && (
                  <p className="text-xs text-red-500 mt-2">請至少選擇一個類別</p>
                )}
              </div>
            </div>

            {/* Meetup Time */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                用餐時間 *
              </label>
              <div className="flex gap-3">
                <input
                  type="date"
                  value={meetupDate}
                  onChange={(e) => setMeetupDate(e.target.value)}
                  className={`flex-1 px-4 py-2 border rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary ${
                    hasTriedSubmit && (!isMeetupTimeValid || !isMeetupTimeFuture()) ? 'border-red-500' : 'border-border-color'
                  }`}
                />
                <input
                  type="time"
                  value={meetupTime}
                  onChange={(e) => setMeetupTime(e.target.value)}
                  className={`flex-1 px-4 py-2 border rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary ${
                    hasTriedSubmit && (!isMeetupTimeValid || !isMeetupTimeFuture()) ? 'border-red-500' : 'border-border-color'
                  }`}
                />
              </div>
              {hasTriedSubmit && !isMeetupTimeValid && (
                <p className="text-xs text-red-500 mt-2">請選擇用餐日期與時間</p>
              )}
              {hasTriedSubmit && isMeetupTimeValid && !isMeetupTimeFuture() && (
                <p className="text-xs text-red-500 mt-2">用餐時間必須晚於現在</p>
              )}
            </div>

            {/* Max Headcount */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                預計人數 * (至少2人)
              </label>
              <input
                type="number"
                min="2"
                value={maxHeadcount}
                onChange={(e) => setMaxHeadcount(e.target.value)}
                placeholder="例如: 4"
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
              {hasTriedSubmit && !isMaxHeadcountValid && (
                <p className="text-xs text-red-500 mt-2">請輸入至少2人的預計人數</p>
              )}
            </div>

            {/* Budget Section - Numeric input or "我請客" */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                預算說明 *
              </label>
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={budgetNumeric}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                      setBudgetNumeric(value);
                    }}
                    placeholder="例如: 500"
                    disabled={isTreating}
                    className={`w-full px-4 py-2 border rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary ${
                      isTreating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                    } ${
                      hasTriedSubmit && !isBudgetValid ? 'border-red-500' : 'border-border-color'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsTreating(!isTreating);
                    if (!isTreating) {
                      setBudgetNumeric('');
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    isTreating
                      ? 'bg-accent-gold border-accent-gold text-text-primary font-semibold shadow-sm'
                      : 'bg-white border-gray-300 text-text-secondary hover:border-accent-gold hover:bg-accent-gold hover:bg-opacity-10'
                  }`}
                >
                  我請客
                </button>
              </div>
              {hasTriedSubmit && !isBudgetValid && (
                <p className="text-xs text-red-500 mt-2">請輸入預算或選擇「我請客」</p>
              )}
            </div>

            {/* Has Reservation */}
            <div className="mb-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasReservation}
                  onChange={(e) => setHasReservation(e.target.checked)}
                  className="w-5 h-5 text-accent-primary border-border-color rounded focus:ring-accent-primary"
                />
                <span className="text-sm font-semibold text-text-primary">已預約餐廳</span>
              </label>
            </div>

            {/* Image Upload Section - Above description */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                圖片 (選填)
              </label>
              {!photoPreview ? (
                <button
                  type="button"
                  onClick={handleAddPhotoClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-accent-gold hover:bg-accent-gold hover:bg-opacity-5 transition-all text-text-secondary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">上傳圖片</span>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-border-color">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 flex items-center justify-center text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handlePhotoSelected}
              />
            </div>

            {/* Description (文案) */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                文案 *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="想找 3–4 個人一起吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。"
                rows={4}
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary resize-none"
              />
              {hasTriedSubmit && !isDescriptionValid && (
                <p className="text-xs text-red-500 mt-2">請輸入文案</p>
              )}
            </div>

            {/* Visibility */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-3">
                是否公開 *
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleVisibilityClick('PUBLIC')}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    visibility === 'PUBLIC'
                      ? 'bg-accent-primary text-white shadow-sm'
                      : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover border border-border-color'
                  }`}
                >
                  公開
                </button>
                <button
                  type="button"
                  onClick={() => handleVisibilityClick('FOLLOWERS')}
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    visibility === 'FOLLOWERS'
                      ? 'bg-accent-primary text-white shadow-sm'
                      : 'bg-bg-secondary text-text-secondary hover:bg-bg-hover border border-border-color'
                  }`}
                >
                  僅限追蹤者
                </button>
              </div>
              {hasTriedSubmit && !isVisibilityValid && (
                <p className="text-xs text-red-500 mt-2">請選擇是否公開</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-border-color">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-text-secondary bg-bg-secondary hover:bg-bg-hover transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-accent-primary hover:bg-opacity-90 transition-colors shadow-sm"
              >
                發佈
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Location Search Modal */}
      {isLocationModalOpen && (
        <LocationSearchModal
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
          onSelectLocation={handleLocationSelect}
        />
      )}
    </>
  );
};
