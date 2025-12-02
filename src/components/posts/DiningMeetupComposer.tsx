import React, { useState, useRef, useEffect } from 'react';
import { LocationSearchModal } from './LocationSearchModal';
import { sortWithOthersLast } from '../../utils/sorting';
import { Visibility } from '../../types/models';

interface DiningMeetupComposerProps {
  avatarUrl?: string;
  onCreateMeetupPost?: (values: DiningMeetupFormValues) => void;
  isOpen?: boolean;
  onClose?: () => void;
  renderModal?: boolean; // If false, render only the form content without modal overlay
  currentUser?: { displayName: string; handle: string; avatarUrl?: string };
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
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount: number; // Number of people already in the group (host + friends)
  expectedInviteCount: number; // Number of additional people to recruit
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
  renderModal = true, // Default to true for backward compatibility
  currentUser,
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
  const [baseParticipantCount, setBaseParticipantCount] = useState<string>('1');
  const [expectedInviteCount, setExpectedInviteCount] = useState<string>('');
  const [budgetMin, setBudgetMin] = useState<string>('');
  const [budgetMax, setBudgetMax] = useState<string>('');
  const [isTreating, setIsTreating] = useState<boolean>(false);
  const [hasReservation, setHasReservation] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [timeError, setTimeError] = useState<string | null>(null);

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
  
  // Helper to combine date and time into a Date object
  const combineDateAndTime = (dateStr: string, timeStr: string): Date | null => {
    if (!dateStr || !timeStr) return null;
    try {
      // Normalize date format (handle both YYYY/MM/DD and YYYY-MM-DD)
      const normalized = dateStr.replace(/\//g, '-');
      const dateTimeString = `${normalized}T${timeStr}:00+08:00`;
      const d = new Date(dateTimeString);
      return isNaN(d.getTime()) ? null : d;
    } catch {
      return null;
    }
  };

  // Validate meetup time is in the future
  const isMeetupTimeFuture = (): boolean => {
    if (!meetupDate || !meetupTime) return false;
    const selected = combineDateAndTime(meetupDate, meetupTime);
    if (!selected) return false;
    const now = new Date();
    return selected > now;
  };

  // Get today's date in YYYY-MM-DD format for min date constraint
  const getTodayISO = (): string => {
    return new Date().toISOString().slice(0, 10);
  };
  
  const isBaseParticipantCountValid = baseParticipantCount !== '' && parseInt(baseParticipantCount) >= 1;
  const isExpectedInviteCountValid = expectedInviteCount !== '' && parseInt(expectedInviteCount) >= 2;
  
  // Budget range validation
  const validateBudgetRange = (min: string, max: string) => {
    const minNum = min === '' ? null : Number(min);
    const maxNum = max === '' ? null : Number(max);
    
    if (minNum !== null && maxNum !== null && maxNum < minNum) {
      return false;
    }
    return true;
  };
  
  const hasInvalidBudgetRange =
    budgetMin !== '' &&
    budgetMax !== '' &&
    !validateBudgetRange(budgetMin, budgetMax);
  
  const isBudgetValid = isTreating || (
    (budgetMin !== '' && !isNaN(parseInt(budgetMin)) && parseInt(budgetMin) > 0) ||
    (budgetMax !== '' && !isNaN(parseInt(budgetMax)) && parseInt(budgetMax) > 0)
  ) && !hasInvalidBudgetRange;
  
  const isDescriptionValid = description.trim().length > 0;
  const isVisibilityValid = visibility !== null;

  // Combined validation
  const isValid =
    isLocationValid &&
    isStyleValid &&
    isCategoryValid &&
    isMeetupTimeValid &&
    isMeetupTimeFuture() &&
    isBaseParticipantCountValid &&
    isExpectedInviteCountValid &&
    isBudgetValid &&
    isDescriptionValid &&
    isVisibilityValid;

  const handleCancel = () => {
    // Reset form
    setLocation(null);
    setSelectedStyle(null);
    setSelectedCategory(null);
    setMeetupDate('');
    setMeetupTime('');
    setTimeError(null);
    setBaseParticipantCount('1');
    setExpectedInviteCount('');
    setBudgetMin('');
    setBudgetMax('');
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
      !isBaseParticipantCountValid ||
      !isExpectedInviteCountValid ||
      !isBudgetValid ||
      !isDescriptionValid ||
      !isVisibilityValid;

    if (hasError) {
      return;
    }

    // Final validation: ensure datetime is in the future
    const selected = combineDateAndTime(meetupDate, meetupTime);
    const now = new Date();
    if (!selected || selected <= now) {
      setHasTriedSubmit(true);
      // Error message will be shown by the existing validation display
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
    } else {
      const minNum = budgetMin ? parseInt(budgetMin) : null;
      const maxNum = budgetMax ? parseInt(budgetMax) : null;
      
      if (minNum !== null && maxNum !== null) {
        budgetDescription = `預計 ${minNum}–${maxNum} / 1 人`;
      } else if (minNum !== null) {
        budgetDescription = `預計 ${minNum} / 1 人`;
      } else if (maxNum !== null) {
        budgetDescription = `預計 ${maxNum} / 1 人`;
      }
    }

    // Convert photo file to URL (for now, use object URL; in production, upload to cloud storage)
    const imageUrl = photoPreview || null;

    // Calculate total headcount
    const baseCount = parseInt(baseParticipantCount);
    const expectedCount = parseInt(expectedInviteCount);
    const totalHeadcount = baseCount + expectedCount;

    const formValues: DiningMeetupFormValues = {
      restaurantName: location!.restaurantName,
      locationText,
      meetupTime: dateTimeString,
      foodTags: tagLabels,
      maxHeadcount: totalHeadcount, // Total capacity
      baseParticipantCount: baseCount,
      expectedInviteCount: expectedCount,
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

  // If renderModal is false, skip the isOpen check and modal overlay
  if (renderModal && !isOpen) return null;

  // Form content (used both with and without modal)
  const formContent = (
    <section className="px-6 py-5">
            {/* Header */}
            <div className="flex gap-3 mb-5">
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                <img
                  src={
                    currentUser?.avatarUrl ||
                    avatarUrl ||
                    'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
                  }
                  alt="Your avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                {currentUser ? (
                  <>
                    <h3 className="text-lg font-bold text-text-primary">{currentUser.displayName}</h3>
                    <p className="text-sm text-text-secondary">{currentUser.handle}</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-text-primary">揪吃飯貼文</h3>
                    <p className="text-sm text-text-secondary">尋找一起用餐的夥伴</p>
                  </>
                )}
              </div>
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
                  min={getTodayISO()}
                  onChange={(e) => {
                    const newDate = e.target.value;
                    setMeetupDate(newDate);
                    // If date changed to today, validate time is not in the past
                    if (newDate === getTodayISO() && meetupTime) {
                      const selected = combineDateAndTime(newDate, meetupTime);
                      const now = new Date();
                      if (selected && selected <= now) {
                        // Clear time if it's in the past for today's date
                        setMeetupTime('');
                      }
                    }
                  }}
                  className={`flex-1 px-4 py-2 border rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary ${
                    hasTriedSubmit && (!isMeetupTimeValid || !isMeetupTimeFuture()) ? 'border-red-500' : 'border-border-color'
                  }`}
                />
                <input
                  type="time"
                  value={meetupTime}
                  onChange={(e) => {
                    const newTime = e.target.value;
                    const now = new Date();
                    const selected = combineDateAndTime(meetupDate, newTime);
                    
                    // If the selected datetime is in the past, reject the change and show error
                    if (selected && selected <= now) {
                      setTimeError('請選擇有效的時間。');
                      // Don't update the time, keep the previous value
                      return;
                    }
                    
                    setTimeError(null);
                    setMeetupTime(newTime);
                  }}
                  className={`flex-1 px-4 py-2 border rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary ${
                    (hasTriedSubmit && (!isMeetupTimeValid || !isMeetupTimeFuture())) || timeError ? 'border-red-500' : 'border-border-color'
                  }`}
                />
              </div>
              {timeError && (
                <p className="text-xs text-red-500 mt-2">{timeError}</p>
              )}
              {!timeError && hasTriedSubmit && !isMeetupTimeValid && (
                <p className="text-xs text-red-500 mt-2">請選擇用餐日期與時間</p>
              )}
              {!timeError && hasTriedSubmit && isMeetupTimeValid && !isMeetupTimeFuture() && (
                <p className="text-xs text-red-500 mt-2">用餐時間必須晚於現在</p>
              )}
            </div>

            {/* Base Participant Count */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                內建人數 *（至少1人）
              </label>
              <input
                type="number"
                min="1"
                value={baseParticipantCount}
                onChange={(e) => setBaseParticipantCount(e.target.value)}
                placeholder="例如: 2"
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
              {hasTriedSubmit && !isBaseParticipantCountValid && (
                <p className="text-xs text-red-500 mt-2">請輸入至少1人的內建人數</p>
              )}
            </div>

            {/* Expected Invite Count */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                預計邀請人數 * (至少2人)
              </label>
              <input
                type="number"
                min="2"
                value={expectedInviteCount}
                onChange={(e) => setExpectedInviteCount(e.target.value)}
                placeholder="例如: 3"
                className="w-full px-4 py-2 border border-border-color rounded-lg bg-bg-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
              />
              {hasTriedSubmit && !isExpectedInviteCountValid && (
                <p className="text-xs text-red-500 mt-2">請輸入至少2人的預計邀請人數</p>
              )}
            </div>

            {/* Budget Section - Range inputs or "我請客" */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                預算說明 *
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={budgetMin}
                    onChange={(e) => {
                      const value = e.target.value;
                      setBudgetMin(value);
                      validateBudgetRange(value, budgetMax);
                    }}
                    placeholder="最小值"
                    disabled={isTreating}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                      isTreating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-bg-primary text-text-primary'
                    } ${
                      hasInvalidBudgetRange ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={hasInvalidBudgetRange}
                  />
                </div>
                <span className="text-text-secondary">—</span>
                <div className="flex-1">
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={budgetMax}
                    onChange={(e) => {
                      const value = e.target.value;
                      setBudgetMax(value);
                      validateBudgetRange(budgetMin, value);
                    }}
                    placeholder="最大值"
                    disabled={isTreating}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent ${
                      isTreating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-bg-primary text-text-primary'
                    } ${
                      hasInvalidBudgetRange ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-invalid={hasInvalidBudgetRange}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsTreating(!isTreating);
                    if (!isTreating) {
                      setBudgetMin('');
                      setBudgetMax('');
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
              {hasInvalidBudgetRange ? (
                <p className="mt-1 text-xs text-red-500">
                  請確認預算範圍：最大值必須大於或等於最小值
                </p>
              ) : hasTriedSubmit && !isBudgetValid ? (
                <p className="text-xs text-red-500 mt-2">請輸入預算或選擇「我請客」</p>
              ) : (
                <p className="text-xs text-text-secondary mt-2">
                  範例：NT$ 300 – 800
                </p>
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
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-text-primary">
                  圖片 (選填)
                </label>
              </div>
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
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent resize-none text-base text-text-primary placeholder:text-text-secondary/50"
                style={{ maxHeight: '200px' }}
              />
              <p className="text-xs text-text-secondary mt-1 text-right">
                {description.length} 字
              </p>
              {hasTriedSubmit && !isDescriptionValid && (
                <p className="text-xs text-red-500 mt-2">請輸入文案</p>
              )}
            </div>

            {/* Visibility Section */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-text-primary mb-2">
                是否公開 *
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleVisibilityClick('PUBLIC')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                    visibility === 'PUBLIC'
                      ? 'bg-accent-gold border-accent-gold text-text-primary shadow-sm'
                      : 'bg-white border-gray-300 text-text-secondary hover:border-accent-gold'
                  }`}
                >
                  公開 Public
                </button>
                <button
                  type="button"
                  onClick={() => handleVisibilityClick('FOLLOWERS')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all font-medium ${
                    visibility === 'FOLLOWERS'
                      ? 'bg-accent-gold border-accent-gold text-text-primary shadow-sm'
                      : 'bg-white border-gray-300 text-text-secondary hover:border-accent-gold'
                  }`}
                >
                  僅限追蹤者 Followers
                </button>
              </div>
              {hasTriedSubmit && !isVisibilityValid && (
                <p className="text-xs text-red-500 mt-2">請選擇是否公開</p>
              )}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border-color opacity-50 mb-4" />

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="text-text-secondary hover:text-text-primary font-medium transition-colors"
              >
                取消
              </button>
              <button
                type="button"
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
  );

  // If renderModal is false, return just the form content (for use inside another modal)
  if (!renderModal) {
    return (
      <>
        {formContent}
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
  }

  // Otherwise, render with modal overlay
  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
        onClick={handleCancel}
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] scrollbar-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {formContent}
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
