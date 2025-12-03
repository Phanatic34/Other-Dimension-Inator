import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../../types/profile';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface EditProfileModalProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [coverImageUrl, setCoverImageUrl] = useState(profile.coverImageUrl);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>(profile.favoriteStyles);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(profile.favoriteCategories);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens/closes or profile changes
  useEffect(() => {
    if (isOpen) {
      setDisplayName(profile.displayName);
      setAvatarUrl(profile.avatarUrl);
      setCoverImageUrl(profile.coverImageUrl);
      setSelectedStyles([...profile.favoriteStyles]);
      setSelectedCategories([...profile.favoriteCategories]);
      setAvatarPreview(null);
      setCoverPreview(null);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setAvatarPreview(preview);
      // TODO: In production, upload to cloud storage and get URL
      // For now, we'll use the preview URL temporarily
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setCoverPreview(preview);
      // TODO: In production, upload to cloud storage and get URL
    }
  };

  const handleSave = () => {
    onSave({
      displayName,
      avatarUrl: avatarPreview || avatarUrl,
      coverImageUrl: coverPreview || coverImageUrl,
      favoriteStyles: selectedStyles,
      favoriteCategories: selectedCategories,
    });
    onClose();
    // Clean up preview URLs
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setAvatarPreview(null);
    setCoverPreview(null);
  };

  const handleCancel = () => {
    // Reset to original values
    setDisplayName(profile.displayName);
    setAvatarUrl(profile.avatarUrl);
    setCoverImageUrl(profile.coverImageUrl);
    setSelectedStyles([...profile.favoriteStyles]);
    setSelectedCategories([...profile.favoriteCategories]);
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setAvatarPreview(null);
    setCoverPreview(null);
    onClose();
  };

  const toggleStyle = (styleLabel: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleLabel)
        ? prev.filter((s) => s !== styleLabel)
        : [...prev, styleLabel]
    );
  };

  const toggleCategory = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel)
        ? prev.filter((c) => c !== categoryLabel)
        : [...prev, categoryLabel]
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
      onClick={handleCancel}
    >
      <div
        className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto scrollbar-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Edit Profile</h2>
            <button
              onClick={handleCancel}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Cover Image */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Cover Image
            </label>
            <div className="relative h-32 bg-gray-200 rounded-lg overflow-hidden mb-2">
              <img
                src={coverPreview || coverImageUrl}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverFileChange}
                className="hidden"
              />
              <button
                onClick={() => coverInputRef.current?.click()}
                className="px-4 py-2 rounded-lg border border-border-color bg-bg-card text-text-primary hover:bg-bg-hover transition-colors"
              >
                Upload Image
              </button>
              <input
                type="text"
                placeholder="Or enter image URL"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-border-color bg-bg-card text-text-primary"
              />
            </div>
          </div>

          {/* Avatar */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Avatar
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <img
                  src={avatarPreview || avatarUrl}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarFileChange}
                  className="hidden"
                />
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-4 py-2 rounded-lg border border-border-color bg-bg-card text-text-primary hover:bg-bg-hover transition-colors"
                >
                  Upload Image
                </button>
                <input
                  type="text"
                  placeholder="Or enter image URL"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border-color bg-bg-card text-text-primary"
                />
              </div>
            </div>
          </div>

          {/* Display Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-border-color bg-bg-card text-text-primary"
              placeholder="Enter display name"
            />
          </div>

          {/* Favorite Styles */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-3">
              風格 Styles
            </label>
            <div className="flex flex-wrap gap-2">
              {STYLE_OPTIONS.map((style) => {
                const isSelected = selectedStyles.includes(style.label);
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => toggleStyle(style.label)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-accent-primary text-white'
                        : 'bg-white border border-gray-200 text-text-primary hover:bg-bg-hover'
                    }`}
                  >
                    {style.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Favorite Categories */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-text-primary mb-3">
              類別 Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((category) => {
                const isSelected = selectedCategories.includes(category.label);
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.label)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-accent-primary text-white'
                        : 'bg-white border border-gray-200 text-text-primary hover:bg-bg-hover'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 rounded-full border border-border-color bg-bg-card text-text-primary hover:bg-bg-hover transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-accent-primary text-white hover:bg-accent-primary/90 transition-colors font-semibold"
            >
              Save
            </button>
          </div>

          {/* TODO: In production, replace local state with API calls:
           * 1. Upload images to cloud storage (AWS S3, GCS, Firebase)
           * 2. Get image URLs from upload response
           * 3. Call PATCH /api/users/:userId/profile with updated data
           * 4. Handle loading states and error messages
           */}
        </div>
      </div>
    </div>
  );
};

