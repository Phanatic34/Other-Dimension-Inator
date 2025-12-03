# 讀取專案內容與對話紀錄
_Exported on 12/3/2025 at 14:34:57 GMT+8 from Cursor (2.1.42)_

---

**User**

請先讀取 ./wp-fianl專案的內容，並且讀取 ./wp-final/Chat History中的cursor對話紀錄來了解目前的專案細節

---

**Cursor**


正在讀取 `./wp-final` 專案內容，並查看 `./wp-final/Chat History` 中的對話紀錄。



讀取 Chat History 中的對話紀錄：



對話紀錄檔案很大，先讀取開頭部分以了解專案概況：



讀取關鍵源代碼文件以了解專案實現細節：



## 專案概況

**Rendezvous** 是一個餐廳社交平台，使用 React + TypeScript + Tailwind CSS 開發。

### 主要功能

1. 餐廳評價貼文（評價貼文串）
   - 多圖橫向滑動展示
   - 評分、價格、地點標籤
   - 過濾系統（風格、類別、評價、價格、距離）
   - 發文功能（ReviewPostComposer）整合 Google Maps Places API

2. 揪吃飯貼文（揪吃飯貼文串）
   - 用餐時間、人數、預算
   - 狀態管理（OPEN/CLOSED）
   - 發文功能（DiningMeetupComposer）

3. 過濾與搜尋
   - 多條件過濾（風格、類別、評價、價格、距離）
   - 標籤點擊搜尋
   - 追蹤/全部切換

### 開發歷程（從對話紀錄）

1. 1127 Main page design：重新設計 Post Section，採用 Threads 風格
2. 1127 Post Section Implement：實作評價貼文發文功能，包含 Google Maps 整合、互動式評分輸入等
3. 1202 揪吃飯頁面：實作揪吃飯貼文功能，包含資料模型、組件和 API

### 技術架構

- 狀態管理：集中在 `RendezvousHome.tsx`
- 資料模型：定義在 `types/models.ts`（ReviewPost、MeetupPost）
- API：使用 mock 資料（`api/mock.ts`）
- Google Maps：整合 Places API（`hooks/useGoogleMaps.ts`）
- 主題系統：支援深色模式（`contexts/ThemeContext.tsx`）

### 主要組件

- `ReviewPostCard`：評價貼文卡片
- `MeetupPostCard`：揪吃飯貼文卡片
- `ReviewPostComposer`：評價貼文發文器
- `DiningMeetupComposer`：揪吃飯貼文發文器
- `Sidebar`：左側過濾欄
- `TabSwitcher`：標籤切換器

需要我協助哪個部分？

---

**User**

You are a senior frontend engineer working on a restaurant-sharing web app.

The project currently has ONLY frontend (no backend/db yet).

Goal

Implement a Twitter-like user profile page while touching existing code as little as possible.

Use existing components (post cards, tag chips, buttons, tabs, etc.) whenever possible and add new components/routes instead of refactoring old ones.

High-level requirements

Profile layout (Twitter style)

A cover image at the top (background banner).

A circular avatar that overlaps the bottom of the cover.

User info section with:

Display name (e.g., 羅立宸).

@username (e.g., @lorry930811).

Optional meta (e.g., “Joined April 2024”) if easy to add.

A right-side “Edit profile” button.

Below that, show:

X Following

Y Followers

Style and spacing should roughly resemble Twitter, but follow our existing design tokens / Tailwind styles.

Cuisine style & category tags (specific to our app)

Under the Following / Followers line, add two tag sections:

Favorite styles / cuisines: examples: 中式, 日式, 美式, 泰式, 墨西哥 … (these values are already used on the main page; reuse the same constants and/or chip components).

Favorite categories: examples: 早餐, 飲料, 甜點, 速食 … (also reuse the same constants/components as the main page).

Each section can be labeled (e.g., “風格 Styles” and “類別 Categories”) and display tags as pill chips.

For now this can be read-only values from mock data, but the structure should be ready to plug in API data later.

Tabs for different post views

Add a tab bar under the profile info/tags.

Order of tabs:

Posts – posts created by this user

Likes – posts this user has liked

Replies – posts this user has replied to

Reposts – posts this user has reposted / shared

Bookmarks – posts this user has saved

Implementation details:

Use our existing tab component if we already have one; otherwise create a simple tab bar.

Each tab should reuse the existing post card / post list component from the main feed, but filtered by mock data for now.

Keep the list area scrollable and responsive.

Edit profile (frontend-only)

The “Edit profile” button should open a modal or an inline edit section that lets the user change:

Avatar image

Cover/background image

Display name

Because there is no backend yet:

Use local React state to store the edited values.

If you need file uploads, you can either:

Accept a local file and show a temporary preview using URL.createObjectURL, OR

Use simple text inputs for image URLs (simpler).

When the user clicks “Save”, update the local profile state so the UI immediately reflects the changes.

Leave clear TODO comments where an API call would go in the future.

Routing and integration

If we already have a user profile route, extend it to this new layout.

If not, create a new route such as:

/user/:username (or whatever matches our routing system).

Keep changes to existing files minimal:

Prefer creating new components under something like components/profile/ and new pages under pages/user/[username].tsx (or equivalent in our project).

Do not refactor existing unrelated pages or components unless strictly necessary.

Mock data

Create a small mock data module for:

The current user profile (name, username, avatar URL, cover URL, following/follower counts, styles, categories).

Arrays of posts for each tab (posts, liked, replies, reposts, bookmarks).

Use realistic but small sample data so the page can be tested visually.

Keep the mock data in a separate file (e.g., mock/profile.ts) for easy replacement by real APIs.

Implementation details / quality

Use TypeScript types/interfaces for the profile and post data.

Follow existing styling conventions (Tailwind classes / design system).

Make sure layout is responsive for both desktop and mobile:

On mobile, tabs should be scrollable horizontally if needed.

Avatar/cover should scale down nicely.

Avoid TypeScript errors and obvious ESLint warnings.

Tasks for you (Cursor)

Inspect the existing codebase to find:

The main post card / feed component.

Existing tag or chip components for styles/categories on the homepage.

The routing setup for pages.

Design and implement the UserProfilePage with the Twitter-like layout as described.

Implement the Edit Profile flow with local state and preview updates.

Wire up the 5 tabs with mock data using the existing post card component.

Ensure all new code compiles and integrates cleanly with minimal changes to existing code.

After implementing, show me:

The list of files you created or modified.

A brief explanation of how to navigate to the new profile page and where to plug in real API calls in the future.

---

**Cursor**


檢查現有代碼結構，找出可重用的組件與路由設定：



檢查現有組件結構，並查看是否有路由相關依賴：



建立初始待辦清單，開始實作用戶個人資料頁面：



建立類型定義與 mock 資料：


```typescript
import { Post, ReviewPost, MeetupPost, Board } from './models';

export interface UserProfile {
  id: string;
  displayName: string;
  username: string; // e.g., "lorry930811" (without @)
  avatarUrl: string;
  coverImageUrl: string;
  followingCount: number;
  followersCount: number;
  joinedDate?: string; // e.g., "April 2024"
  favoriteStyles: string[]; // Style labels like "日式 Japanese", "美式 American"
  favoriteCategories: string[]; // Category labels like "早餐 Breakfast", "甜點 Desserts"
  bio?: string; // Optional bio text
}

export type ProfileTab = 'posts' | 'likes' | 'replies' | 'reposts' | 'bookmarks';

export interface ProfileTabData {
  posts: Post[];
  likes: Post[];
  replies: Post[];
  reposts: Post[];
  bookmarks: Post[];
}

```

```typescript
import { UserProfile, ProfileTabData } from '../types/profile';
import { ReviewPost, MeetupPost, Post } from '../types/models';
import { fetchPosts } from './mock';

// Mock user profile data
export const mockUserProfile: UserProfile = {
  id: 'user_profile_1',
  displayName: '羅立宸',
  username: 'lorry930811',
  avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
  coverImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  followingCount: 127,
  followersCount: 342,
  joinedDate: 'April 2024',
  favoriteStyles: ['日式 Japanese', '美式 American', '泰式 Thai', '墨西哥 Mexican'],
  favoriteCategories: ['早餐 Breakfast', '飲料 Beverages', '甜點 Desserts', '速食 Fast Food'],
  bio: '熱愛探索美食的吃貨，喜歡分享餐廳體驗 🍜',
};

// Helper to get posts by user ID
const getPostsByUserId = (userId: string, allPosts: Post[]): Post[] => {
  return allPosts.filter(post => post.author.id === userId);
};

// Helper to create mock liked/replied/reposted/bookmarked posts
// For now, we'll use a subset of existing posts as examples
export const getProfileTabData = async (userId: string): Promise<ProfileTabData> => {
  const allPosts = await fetchPosts();
  
  // Posts created by this user
  const userPosts = getPostsByUserId(userId, allPosts);
  
  // For demo purposes, use some existing posts as liked/replied/reposted/bookmarked
  // In a real app, these would come from separate API endpoints
  const samplePosts = allPosts.slice(0, 5);
  
  return {
    posts: userPosts,
    likes: samplePosts.slice(0, 3), // User has liked these posts
    replies: samplePosts.slice(1, 4), // User has replied to these posts
    reposts: samplePosts.slice(2, 5), // User has reposted these posts
    bookmarks: samplePosts.slice(0, 2), // User has bookmarked these posts
  };
};

// Fetch a user profile by username
export const fetchUserProfile = async (username: string): Promise<UserProfile | null> => {
  // Remove @ if present
  const cleanUsername = username.replace('@', '');
  
  // For now, return mock profile if username matches
  if (cleanUsername === mockUserProfile.username) {
    return mockUserProfile;
  }
  
  // TODO: In production, fetch from API
  // const response = await fetch(`/api/users/${cleanUsername}/profile`);
  // return response.json();
  
  return null;
};

```


建立 Profile 相關組件：


```typescriptreact
import React from 'react';
import { UserProfile } from '../../types/profile';

interface ProfileHeaderProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
  onEditClick?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isOwnProfile = false,
  onEditClick,
}) => {
  return (
    <div className="bg-bg-card border-b border-border-color">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gray-200 overflow-hidden">
        <img
          src={profile.coverImageUrl}
          alt={`${profile.displayName}'s cover`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info Section */}
      <div className="px-4 md:px-6 pb-4">
        {/* Avatar - overlaps cover */}
        <div className="relative -mt-16 md:-mt-20 mb-4">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-bg-card bg-bg-card overflow-hidden shadow-lg">
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
              {profile.displayName}
            </h1>
            <p className="text-text-secondary text-base mb-2">
              @{profile.username}
            </p>
            {profile.joinedDate && (
              <p className="text-text-secondary text-sm mb-3">
                Joined {profile.joinedDate}
              </p>
            )}
            {profile.bio && (
              <p className="text-text-primary text-base mb-3">
                {profile.bio}
              </p>
            )}
            
            {/* Following / Followers */}
            <div className="flex gap-4 text-sm">
              <span className="text-text-primary">
                <span className="font-semibold">{profile.followingCount}</span>
                <span className="text-text-secondary ml-1">Following</span>
              </span>
              <span className="text-text-primary">
                <span className="font-semibold">{profile.followersCount}</span>
                <span className="text-text-secondary ml-1">Followers</span>
              </span>
            </div>
          </div>

          {/* Edit Profile Button */}
          {isOwnProfile && (
            <button
              onClick={onEditClick}
              className="px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
            >
              Edit profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

```

```typescriptreact
import React from 'react';
import { UserProfile } from '../../types/profile';

interface ProfileTagsProps {
  profile: UserProfile;
}

export const ProfileTags: React.FC<ProfileTagsProps> = ({ profile }) => {
  return (
    <div className="px-4 md:px-6 py-4 bg-bg-card border-b border-border-color">
      {/* Favorite Styles */}
      {profile.favoriteStyles.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
            風格 Styles
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteStyles.map((style, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm text-text-primary"
              >
                {style}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Favorite Categories */}
      {profile.favoriteCategories.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">
            類別 Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.favoriteCategories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm text-text-primary"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

```

```typescriptreact
import React from 'react';
import { ProfileTab } from '../../types/profile';

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  postCounts?: {
    posts: number;
    likes: number;
    replies: number;
    reposts: number;
    bookmarks: number;
  };
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  postCounts,
}) => {
  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'posts', label: 'Posts' },
    { key: 'likes', label: 'Likes' },
    { key: 'replies', label: 'Replies' },
    { key: 'reposts', label: 'Reposts' },
    { key: 'bookmarks', label: 'Bookmarks' },
  ];

  return (
    <div className="border-b border-border-color bg-bg-secondary sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center overflow-x-auto scrollbar-hidden">
        {tabs.map((tab) => {
          const count = postCounts?.[tab.key];
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-4 md:px-6 py-4 text-base font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-accent-primary border-accent-primary'
                  : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border-color'
              }`}
              style={{
                fontFamily: activeTab === tab.key 
                  ? 'Garamond, Baskerville, Georgia, Times New Roman, serif' 
                  : 'inherit',
                fontWeight: activeTab === tab.key ? 900 : 600,
              }}
            >
              {tab.label}
              {count !== undefined && (
                <span className="ml-2 text-text-secondary text-sm font-normal">
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

```

```typescriptreact
import React, { useState, useRef } from 'react';
import { UserProfile } from '../../types/profile';

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
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

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
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setAvatarPreview(null);
    setCoverPreview(null);
    onClose();
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

```


建立主要的 UserProfilePage 組件：


```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock current user ID (in production, get from auth context)
  const currentUserId = 'user_profile_1';
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          window.location.href = '/';
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        {/* Profile Tags */}
        <ProfileTags profile={profile} />

        {/* Profile Tabs */}
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          postCounts={postCounts}
        />

        {/* Posts Feed */}
        <div className="bg-bg-secondary min-h-screen">
          {currentPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-xl mb-2">No posts found</p>
              <p className="text-text-secondary text-base opacity-70">
                {activeTab === 'posts'
                  ? 'This user has not created any posts yet.'
                  : `This user has no ${activeTab} yet.`}
              </p>
            </div>
          ) : (
            <div>
              {currentPosts.map((post) => {
                if (post.type === 'review') {
                  return (
                    <ReviewPostCard
                      key={post.id}
                      post={post as ReviewPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                } else {
                  return (
                    <MeetupPostCard
                      key={post.id}
                      post={post as MeetupPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

```


更新 App.tsx 以添加路由：


```typescriptreact
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RendezvousHome } from './pages/RendezvousHome';
import { UserProfilePage } from './pages/UserProfilePage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RendezvousHome />} />
          <Route path="/user/:username" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


```


檢查並修復 mock 資料，確保用戶 ID 匹配：


```typescript
import { UserProfile, ProfileTabData } from '../types/profile';
import { ReviewPost, MeetupPost, Post } from '../types/models';
import { fetchPosts } from './mock';

// Mock user profile data
// Note: This user ID should match one of the users in mock.ts for posts to show up
export const mockUserProfile: UserProfile = {
  id: 'user1', // Match with mockUsers[0] from mock.ts
  displayName: '羅立宸',
  username: 'lorry930811',
  avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
  coverImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  followingCount: 127,
  followersCount: 342,
  joinedDate: 'April 2024',
  favoriteStyles: ['日式 Japanese', '美式 American', '泰式 Thai', '墨西哥 Mexican'],
  favoriteCategories: ['早餐 Breakfast', '飲料 Beverages', '甜點 Desserts', '速食 Fast Food'],
  bio: '熱愛探索美食的吃貨，喜歡分享餐廳體驗 🍜',
};

// Helper to get posts by user ID
const getPostsByUserId = (userId: string, allPosts: Post[]): Post[] => {
  return allPosts.filter(post => post.author.id === userId);
};

// Helper to create mock liked/replied/reposted/bookmarked posts
// For now, we'll use a subset of existing posts as examples
export const getProfileTabData = async (userId: string): Promise<ProfileTabData> => {
  const allPosts = await fetchPosts();
  
  // Posts created by this user
  const userPosts = getPostsByUserId(userId, allPosts);
  
  // For demo purposes, use some existing posts as liked/replied/reposted/bookmarked
  // In a real app, these would come from separate API endpoints
  const samplePosts = allPosts.slice(0, 5);
  
  return {
    posts: userPosts,
    likes: samplePosts.slice(0, 3), // User has liked these posts
    replies: samplePosts.slice(1, 4), // User has replied to these posts
    reposts: samplePosts.slice(2, 5), // User has reposted these posts
    bookmarks: samplePosts.slice(0, 2), // User has bookmarked these posts
  };
};

// Fetch a user profile by username
export const fetchUserProfile = async (username: string): Promise<UserProfile | null> => {
  // Remove @ if present
  const cleanUsername = username.replace('@', '');
  
  // For now, return mock profile if username matches
  if (cleanUsername === mockUserProfile.username) {
    return mockUserProfile;
  }
  
  // TODO: In production, fetch from API
  // const response = await fetch(`/api/users/${cleanUsername}/profile`);
  // return response.json();
  
  return null;
};


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          window.location.href = '/';
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        {/* Profile Tags */}
        <ProfileTags profile={profile} />

        {/* Profile Tabs */}
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          postCounts={postCounts}
        />

        {/* Posts Feed */}
        <div className="bg-bg-secondary min-h-screen">
          {currentPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-xl mb-2">No posts found</p>
              <p className="text-text-secondary text-base opacity-70">
                {activeTab === 'posts'
                  ? 'This user has not created any posts yet.'
                  : `This user has no ${activeTab} yet.`}
              </p>
            </div>
          ) : (
            <div>
              {currentPosts.map((post) => {
                if (post.type === 'review') {
                  return (
                    <ReviewPostCard
                      key={post.id}
                      post={post as ReviewPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                } else {
                  return (
                    <MeetupPostCard
                      key={post.id}
                      post={post as MeetupPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```


檢查並修復一些細節，確保所有組件正常運作：



檢查是否需要添加導航連結，並確保所有內容正常運作：



更新 TopNavBar，添加導航到個人資料頁面的功能：


```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      console.log('View Profile clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};


```

```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      console.log('View Profile clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};


```

```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      // TODO: Replace with actual logged-in user's username from auth context
                      navigate('/user/lorry930811');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};


```


## 已創建/修改的文件列表

### 新創建的文件：

1. **`src/types/profile.ts`** - Profile 相關的 TypeScript 類型定義
2. **`src/api/mockProfile.ts`** - Profile mock 資料模組
3. **`src/components/profile/ProfileHeader.tsx`** - 個人資料頭部組件（cover image, avatar, user info）
4. **`src/components/profile/ProfileTags.tsx`** - 風格和類別標籤組件
5. **`src/components/profile/ProfileTabs.tsx`** - 5個標籤頁組件（Posts, Likes, Replies, Reposts, Bookmarks）
6. **`src/components/profile/EditProfileModal.tsx`** - 編輯個人資料的模態框
7. **`src/pages/UserProfilePage.tsx`** - 個人資料主頁面組件

### 修改的文件：

1. **`src/App.tsx`** - 添加了 React Router 路由系統
2. **`src/components/layout/TopNavBar.tsx`** - 添加了導航到個人資料頁面的功能
3. **`package.json`** - 添加了 `react-router-dom` 依賴（已自動更新）

## 如何訪問個人資料頁面

1. 直接訪問 URL：在瀏覽器中輸入 `http://localhost:3000/user/lorry930811`
2. 通過導航欄：點擊右上角的用戶頭像，選擇 "View Profile"

## 功能說明

### 個人資料頁面包含：

1. **Cover Image + Avatar** - Twitter 風格的封面圖和頭像
2. **用戶資訊** - 顯示名稱、@username、加入日期、Following/Followers 數量
3. **風格和類別標籤** - 顯示用戶喜愛的餐廳風格和食物類別
4. **5個標籤頁**：
   - **Posts** - 用戶創建的貼文
   - **Likes** - 用戶點讚的貼文
   - **Replies** - 用戶回覆的貼文
   - **Reposts** - 用戶轉發的貼文
   - **Bookmarks** - 用戶收藏的貼文
5. **Edit Profile 功能** - 只有查看自己的個人資料時才會顯示，可以編輯：
   - 頭像圖片（上傳文件或輸入 URL）
   - 封面圖片（上傳文件或輸入 URL）
   - 顯示名稱

## 未來 API 整合點

所有需要連接後端 API 的地方都已標記了 `TODO` 註釋：

1. **`src/api/mockProfile.ts`**：
   - `fetchUserProfile()` - 第 57 行：替換為 `GET /api/users/:username/profile`
   - `getProfileTabData()` - 第 35-43 行：替換為各個標籤頁的 API 端點

2. **`src/pages/UserProfilePage.tsx`**：
   - 第 20 行：替換 `currentUserId` 為從 auth context 獲取
   - 第 50 行：`handleSaveProfile()` 函數中替換為 `PATCH /api/users/:userId/profile`

3. **`src/components/profile/EditProfileModal.tsx`**：
   - 第 25-30 行：圖片上傳功能需要連接到雲端存儲（AWS S3, GCS, Firebase）
   - 第 108-112 行：TODO 註釋中說明了完整的 API 整合步驟

4. **`src/components/layout/TopNavBar.tsx`**：
   - 第 90 行：替換為從 auth context 獲取當前用戶的 username

## 設計特點

- 重用現有組件：使用了 `ReviewPostCard` 和 `MeetupPostCard` 來顯示貼文
- 響應式設計：支援桌面和移動設備
- 樣式一致：使用現有的 Tailwind 類別和設計系統
- 最小改動：只修改了必要的文件，沒有重構現有代碼

所有功能已實作並通過 lint 檢查。可以啟動開發服務器測試個人資料頁面功能。

---

**User**

You are a senior frontend engineer working on a restaurant-sharing web app.

The project currently has ONLY frontend (no backend/db yet).

We want a Twitter-like user profile page with minimal changes to existing code.

Reuse existing components (post cards, tag chips, buttons, tabs, etc.) whenever possible and prefer adding new components/routes over refactoring old ones.

High-level goals

Implement a user profile page similar to Twitter’s profile layout.

Allow the user to edit profile info, including:

avatar

cover image

display name

preferred cuisine style tags

preferred category tags

Add a “You might like” recommendation card on the right side (like Twitter).

Keep data frontend-only for now (local state + mock data, no real API).

Layout requirements

1. Profile page main layout

Create or extend a route like /user/:username (or whatever matches our router).

The profile page should include:

A top bar with:

A “Back to Home” button on the left (icon + text is fine).

On click, navigate back to the main feed/home page (use our existing home route).

(Optional) User name in the center if that fits our design.

A cover image (banner) at the top.

A circular avatar overlapping the bottom of the cover.

A user info block:

Display name (e.g. 羅立宸)

@username (e.g. @lorry930811)

Optional meta such as “Joined April 2024” if easy.

On the right side: “Edit profile” button.

Under user info:

X Following / Y Followers counts (reusing any existing styling if we have it).

Under Following/Followers counts:

Two sections for tags:

Favorite styles / cuisines (風格), e.g. 中式, 日式, 美式, 泰式, 墨西哥…

Favorite categories (類別), e.g. 早餐, 飲料, 甜點, 速食…

Reuse the same constants and chip/tag components already used on the main page for styles and categories.

Labels like:

風格 Styles

類別 Categories

Display them as pill chips.

Below the tags, add a tab bar:

Tabs (in this exact order):

Posts – posts created by this user

Likes – posts this user has liked

Replies – posts this user has replied to

Reposts – posts this user has reposted/shared

Bookmarks – posts this user has saved

Implementation notes:

Use existing tab component if available; otherwise build a simple tab bar.

Each tab shows a list of posts using our existing post card / feed item component, filtered by mock data for now.

The list area should be scrollable and responsive.

2. Edit Profile behavior (extended)

The “Edit profile” button should open a modal or inline edit panel.

In Edit Profile, we must be able to edit:

Avatar image

Cover/background image

Display name

Preferred cuisine style tags (風格)

Preferred category tags (類別)

Details:

For images:

Either use:

input type="file" and preview via URL.createObjectURL, or

URL text inputs (simpler).

For style/category tags:

Use multi-select chips or checkboxes, reusing the SAME set of constants and tag components as the main page.

Allow toggling tags on/off.

When the user clicks Save:

Update the local profile state so that:

avatar

cover image

display name

style tags

category tags

all update immediately on the profile page.

No real API call yet; just leave clear // TODO: call updateProfile API here comments.

All state can live in the profile page component (or a simple context) for now.

3. “You might like” sidebar

On desktop/wider screens, the profile page likely has space on the right side.

Use that right blank area for a “You might like” section similar to Twitter (see screenshot).

Requirements:

A card or panel titled “You might like”.

Inside, render a small list (e.g. 3 items) of recommended accounts or users with:

small avatar

display name

@username

a Follow button on the right for each item (button is frontend-only; clicking can just toggle a local isFollowing flag for now).

At the bottom of the card, a “Show more” text/link.

For now it can be a no-op or just log to console.

Implementation notes:

Use mock data for recommended users (separate mock module).

Match our app’s style but roughly follow Twitter’s layout:

vertically stacked list

rounded card background

spacing similar to the screenshot.

Responsiveness:

On mobile or narrow screens, it’s acceptable to hide this sidebar entirely, or move it under the main content.

4. Mock data

Create a dedicated mock data file, e.g. mock/profile.ts, containing:

currentUserProfile:

id

displayName

username

avatarUrl

coverUrl

followingCount

followerCount

favoriteStyles: string[]

favoriteCategories: string[]

Post arrays:

userPosts

userLikedPosts

userReplyPosts

userRepostPosts

userBookmarkPosts

recommendedUsers for the “You might like” sidebar.

Use small but realistic sample data.

5. TypeScript, structure, and minimal changes

Define proper TypeScript interfaces for:

UserProfile

Post

RecommendedUser

Place profile-related components under something like:

components/profile/

Place the profile page under the appropriate pages/routes directory, e.g.:

pages/user/[username].tsx (Next.js)

or whatever our router uses.

Try to avoid modifying existing unrelated pages. If you must, keep changes minimal (e.g., adding a route link, exporting an existing component).

Ensure the project compiles without TypeScript errors.

6. Tasks for you (Cursor)

Inspect the codebase to find:

Main post card / feed components.

Tag components and constants for cuisines and categories used on the homepage.

The routing structure and home page route (needed for the “Back to Home” button).

Implement the UserProfilePage with:

back-to-home button

cover + avatar

user info + Edit Profile

Following/Followers

style & category tags

tabbed post lists

Implement the Edit Profile modal/panel that can edit:

avatar, cover image, display name

favorite style tags

favorite category tags

and updates the profile UI via local state only.

Implement the “You might like” sidebar widget on the right, powered by mock recommendedUsers.

Make sure everything is responsive and visually consistent with the rest of the app.

Finally, output:

The list of files created/modified.

A short explanation of:

how to navigate to the profile page,

where to plug in real API calls in the future (for profile data, posts, and recommendations).

---

**Cursor**


檢查現有代碼結構，準備擴展個人資料頁面：



檢查風格和類別選項的定義，以便重用：



建立共享常數文件，並擴展功能：


```typescript
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

```

```typescript
import { Post, ReviewPost, MeetupPost, Board } from './models';

export interface UserProfile {
  id: string;
  displayName: string;
  username: string; // e.g., "lorry930811" (without @)
  avatarUrl: string;
  coverImageUrl: string;
  followingCount: number;
  followersCount: number;
  joinedDate?: string; // e.g., "April 2024"
  favoriteStyles: string[]; // Style labels like "日式 Japanese", "美式 American"
  favoriteCategories: string[]; // Category labels like "早餐 Breakfast", "甜點 Desserts"
  bio?: string; // Optional bio text
}

export interface RecommendedUser {
  id: string;
  displayName: string;
  username: string; // without @
  avatarUrl?: string;
  bio?: string;
}

export type ProfileTab = 'posts' | 'likes' | 'replies' | 'reposts' | 'bookmarks';

export interface ProfileTabData {
  posts: Post[];
  likes: Post[];
  replies: Post[];
  reposts: Post[];
  bookmarks: Post[];
}

```

```typescriptreact
import React, { useState } from 'react';
import { RecommendedUser } from '../../types/profile';

interface YouMightLikeProps {
  recommendedUsers: RecommendedUser[];
}

export const YouMightLike: React.FC<YouMightLikeProps> = ({ recommendedUsers }) => {
  const [followingStates, setFollowingStates] = useState<Record<string, boolean>>({});

  const handleFollow = (userId: string) => {
    setFollowingStates((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
    // TODO: In production, call API to follow/unfollow user
    // await fetch(`/api/users/${userId}/follow`, { method: 'POST' });
  };

  const handleShowMore = () => {
    console.log('Show more recommended users');
    // TODO: In production, fetch more recommendations
  };

  if (recommendedUsers.length === 0) {
    return null;
  }

  return (
    <div className="bg-bg-card rounded-2xl border border-border-color p-5 shadow-sm">
      <h3 className="text-xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        You might like
      </h3>
      
      <div className="space-y-4">
        {recommendedUsers.map((user) => {
          const isFollowing = followingStates[user.id] || false;
          
          return (
            <div key={user.id} className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-secondary">
                      <span className="text-lg">👤</span>
                    </div>
                  )}
                </div>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate">
                    {user.displayName}
                  </p>
                  <p className="text-text-secondary text-sm truncate">
                    @{user.username}
                  </p>
                  {user.bio && (
                    <p className="text-text-secondary text-xs mt-1 line-clamp-2">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Follow Button */}
              <button
                onClick={() => handleFollow(user.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${
                  isFollowing
                    ? 'bg-bg-card border border-border-color text-text-primary hover:bg-bg-hover'
                    : 'bg-accent-primary text-white hover:bg-accent-primary/90'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Show More Link */}
      <button
        onClick={handleShowMore}
        className="mt-4 text-accent-primary text-sm font-semibold hover:underline w-full text-left"
      >
        Show more
      </button>
    </div>
  );
};

```

```typescript
import { UserProfile, ProfileTabData, RecommendedUser } from '../types/profile';
import { ReviewPost, MeetupPost, Post } from '../types/models';
import { fetchPosts } from './mock';

// Mock user profile data
// Note: This user ID should match one of the users in mock.ts for posts to show up
export const mockUserProfile: UserProfile = {
  id: 'user1', // Match with mockUsers[0] from mock.ts
  displayName: '羅立宸',
  username: 'lorry930811',
  avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
  coverImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  followingCount: 127,
  followersCount: 342,
  joinedDate: 'April 2024',
  favoriteStyles: ['日式 Japanese', '美式 American', '泰式 Thai', '墨西哥 Mexican'],
  favoriteCategories: ['早餐 Breakfast', '飲料 Beverages', '甜點 Desserts', '速食 Fast Food'],
  bio: '熱愛探索美食的吃貨，喜歡分享餐廳體驗 🍜',
};

// Helper to get posts by user ID
const getPostsByUserId = (userId: string, allPosts: Post[]): Post[] => {
  return allPosts.filter(post => post.author.id === userId);
};

// Helper to create mock liked/replied/reposted/bookmarked posts
// For now, we'll use a subset of existing posts as examples
export const getProfileTabData = async (userId: string): Promise<ProfileTabData> => {
  const allPosts = await fetchPosts();
  
  // Posts created by this user
  const userPosts = getPostsByUserId(userId, allPosts);
  
  // For demo purposes, use some existing posts as liked/replied/reposted/bookmarked
  // In a real app, these would come from separate API endpoints
  const samplePosts = allPosts.slice(0, 5);
  
  return {
    posts: userPosts,
    likes: samplePosts.slice(0, 3), // User has liked these posts
    replies: samplePosts.slice(1, 4), // User has replied to these posts
    reposts: samplePosts.slice(2, 5), // User has reposted these posts
    bookmarks: samplePosts.slice(0, 2), // User has bookmarked these posts
  };
};

// Fetch a user profile by username
export const fetchUserProfile = async (username: string): Promise<UserProfile | null> => {
  // Remove @ if present
  const cleanUsername = username.replace('@', '');
  
  // For now, return mock profile if username matches
  if (cleanUsername === mockUserProfile.username) {
    return mockUserProfile;
  }
  
  // TODO: In production, fetch from API
  // const response = await fetch(`/api/users/${cleanUsername}/profile`);
  // return response.json();
  
  return null;
};


```

```typescript
import { UserProfile, ProfileTabData, RecommendedUser } from '../types/profile';
import { ReviewPost, MeetupPost, Post } from '../types/models';
import { fetchPosts } from './mock';

// Mock user profile data
// Note: This user ID should match one of the users in mock.ts for posts to show up
export const mockUserProfile: UserProfile = {
  id: 'user1', // Match with mockUsers[0] from mock.ts
  displayName: '羅立宸',
  username: 'lorry930811',
  avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
  coverImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
  followingCount: 127,
  followersCount: 342,
  joinedDate: 'April 2024',
  favoriteStyles: ['日式 Japanese', '美式 American', '泰式 Thai', '墨西哥 Mexican'],
  favoriteCategories: ['早餐 Breakfast', '飲料 Beverages', '甜點 Desserts', '速食 Fast Food'],
  bio: '熱愛探索美食的吃貨，喜歡分享餐廳體驗 🍜',
};

// Helper to get posts by user ID
const getPostsByUserId = (userId: string, allPosts: Post[]): Post[] => {
  return allPosts.filter(post => post.author.id === userId);
};

// Helper to create mock liked/replied/reposted/bookmarked posts
// For now, we'll use a subset of existing posts as examples
export const getProfileTabData = async (userId: string): Promise<ProfileTabData> => {
  const allPosts = await fetchPosts();
  
  // Posts created by this user
  const userPosts = getPostsByUserId(userId, allPosts);
  
  // For demo purposes, use some existing posts as liked/replied/reposted/bookmarked
  // In a real app, these would come from separate API endpoints
  const samplePosts = allPosts.slice(0, 5);
  
  return {
    posts: userPosts,
    likes: samplePosts.slice(0, 3), // User has liked these posts
    replies: samplePosts.slice(1, 4), // User has replied to these posts
    reposts: samplePosts.slice(2, 5), // User has reposted these posts
    bookmarks: samplePosts.slice(0, 2), // User has bookmarked these posts
  };
};

// Fetch a user profile by username
export const fetchUserProfile = async (username: string): Promise<UserProfile | null> => {
  // Remove @ if present
  const cleanUsername = username.replace('@', '');
  
  // For now, return mock profile if username matches
  if (cleanUsername === mockUserProfile.username) {
    return mockUserProfile;
  }
  
  // TODO: In production, fetch from API
  // const response = await fetch(`/api/users/${cleanUsername}/profile`);
  // return response.json();
  
  return null;
};

// Mock recommended users for "You might like" sidebar
export const mockRecommendedUsers: RecommendedUser[] = [
  {
    id: 'rec_user_1',
    displayName: 'Taipei Food Explorer',
    username: 'taipei_explorer',
    avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
    bio: '探索台北美食，分享在地好味道',
  },
  {
    id: 'rec_user_2',
    displayName: 'Ramen Master',
    username: 'ramen_master',
    avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
    bio: '拉麵愛好者，尋找最道地的日式拉麵',
  },
  {
    id: 'rec_user_3',
    displayName: 'Sweet Dreams',
    username: 'sweet_dreams',
    avatarUrl: 'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png',
    bio: '甜點控，記錄每一口甜蜜時光',
  },
];

// Fetch recommended users
export const fetchRecommendedUsers = async (): Promise<RecommendedUser[]> => {
  // TODO: In production, fetch from API
  // const response = await fetch('/api/users/recommended');
  // return response.json();
  return mockRecommendedUsers;
};


```


更新 EditProfileModal 以支持編輯風格和類別標籤：


```typescriptreact
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
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

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
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setAvatarPreview(null);
    setCoverPreview(null);
    onClose();
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


```

```typescriptreact
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
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setAvatarPreview(null);
    setCoverPreview(null);
    onClose();
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


```

```typescriptreact
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
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    if (coverPreview) URL.revokeObjectURL(coverPreview);
    setAvatarPreview(null);
    setCoverPreview(null);
    onClose();
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


```

```typescriptreact
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


```

```typescriptreact
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


```


更新 UserProfilePage，加入 Back to Home 按鈕與側邊欄：


```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          window.location.href = '/';
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        {/* Profile Tags */}
        <ProfileTags profile={profile} />

        {/* Profile Tabs */}
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          postCounts={postCounts}
        />

        {/* Posts Feed */}
        <div className="bg-bg-secondary min-h-screen">
          {currentPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-xl mb-2">No posts found</p>
              <p className="text-text-secondary text-base opacity-70">
                {activeTab === 'posts'
                  ? 'This user has not created any posts yet.'
                  : `This user has no ${activeTab} yet.`}
              </p>
            </div>
          ) : (
            <div>
              {currentPosts.map((post) => {
                if (post.type === 'review') {
                  return (
                    <ReviewPostCard
                      key={post.id}
                      post={post as ReviewPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                } else {
                  return (
                    <MeetupPostCard
                      key={post.id}
                      post={post as MeetupPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          window.location.href = '/';
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        {/* Profile Tags */}
        <ProfileTags profile={profile} />

        {/* Profile Tabs */}
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          postCounts={postCounts}
        />

        {/* Posts Feed */}
        <div className="bg-bg-secondary min-h-screen">
          {currentPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-xl mb-2">No posts found</p>
              <p className="text-text-secondary text-base opacity-70">
                {activeTab === 'posts'
                  ? 'This user has not created any posts yet.'
                  : `This user has no ${activeTab} yet.`}
              </p>
            </div>
          ) : (
            <div>
              {currentPosts.map((post) => {
                if (post.type === 'review') {
                  return (
                    <ReviewPostCard
                      key={post.id}
                      post={post as ReviewPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                } else {
                  return (
                    <MeetupPostCard
                      key={post.id}
                      post={post as MeetupPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
        // Fetch recommended users
        const recommended = await fetchRecommendedUsers();
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          window.location.href = '/';
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        {/* Profile Tags */}
        <ProfileTags profile={profile} />

        {/* Profile Tabs */}
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          postCounts={postCounts}
        />

        {/* Posts Feed */}
        <div className="bg-bg-secondary min-h-screen">
          {currentPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary text-xl mb-2">No posts found</p>
              <p className="text-text-secondary text-base opacity-70">
                {activeTab === 'posts'
                  ? 'This user has not created any posts yet.'
                  : `This user has no ${activeTab} yet.`}
              </p>
            </div>
          ) : (
            <div>
              {currentPosts.map((post) => {
                if (post.type === 'review') {
                  return (
                    <ReviewPostCard
                      key={post.id}
                      post={post as ReviewPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                } else {
                  return (
                    <MeetupPostCard
                      key={post.id}
                      post={post as MeetupPost}
                      onClick={() => handlePostClick(post)}
                      onTagClick={handleTagClick}
                      isOwnPost={post.author.id === currentUserId}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
        // Fetch recommended users
        const recommended = await fetchRecommendedUsers();
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          navigate('/');
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Back to Home Button */}
            <div className="px-4 md:px-6 py-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">Back to Home</span>
              </button>
            </div>

            {/* Profile Header */}
            <ProfileHeader
              profile={profile}
              isOwnProfile={isOwnProfile}
              onEditClick={() => setIsEditModalOpen(true)}
            />

            {/* Profile Tags */}
            <ProfileTags profile={profile} />

            {/* Profile Tabs */}
            <ProfileTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              postCounts={postCounts}
            />

            {/* Posts Feed */}
            <div className="bg-bg-secondary min-h-screen">
              {currentPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    {activeTab === 'posts'
                      ? 'This user has not created any posts yet.'
                      : `This user has no ${activeTab} yet.`}
                  </p>
                </div>
              ) : (
                <div>
                  {currentPosts.map((post) => {
                    if (post.type === 'review') {
                      return (
                        <ReviewPostCard
                          key={post.id}
                          post={post as ReviewPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    } else {
                      return (
                        <MeetupPostCard
                          key={post.id}
                          post={post as MeetupPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - You Might Like (Desktop only) */}
          <aside className="hidden lg:block w-80 flex-shrink-0 pt-4">
            <div className="sticky top-4">
              <YouMightLike recommendedUsers={recommendedUsers} />
            </div>
          </aside>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```


檢查 lint 錯誤並修復：



完成最後檢查並總結：



## 已創建/修改的文件列表

### 新創建的文件：

1. **`src/utils/tagOptions.ts`** - 共享的風格和類別選項常數（可重用於多個組件）
2. **`src/components/profile/YouMightLike.tsx`** - "You might like" 側邊欄組件

### 修改的文件：

1. **`src/types/profile.ts`** - 添加了 `RecommendedUser` 接口
2. **`src/api/mockProfile.ts`** - 添加了推薦用戶的 mock 資料和 `fetchRecommendedUsers` 函數
3. **`src/components/profile/EditProfileModal.tsx`** - 擴展以支持編輯風格和類別標籤
4. **`src/pages/UserProfilePage.tsx`** - 添加了：
   - Back to Home 按鈕
   - 響應式布局（桌面顯示側邊欄，移動端隱藏）
   - 整合 YouMightLike 組件

## 如何訪問個人資料頁面

1. 直接訪問 URL：在瀏覽器中輸入 `http://localhost:3000/user/lorry930811`
2. 通過導航欄：點擊右上角的用戶頭像，選擇 "View Profile"
3. 從個人資料頁面：點擊 "Back to Home" 按鈕返回主頁

## 新功能說明

### 1. Back to Home 按鈕
- 位於個人資料頁面頂部
- 點擊後導航回主頁（`/`）
- 使用左箭頭圖標和文字

### 2. 擴展的 Edit Profile 功能
現在可以編輯：
- 頭像圖片（上傳文件或輸入 URL）
- 封面圖片（上傳文件或輸入 URL）
- 顯示名稱
- 風格標籤（多選，使用與主頁相同的選項）
- 類別標籤（多選，使用與主頁相同的選項）

所有更改會立即反映在個人資料頁面上（使用本地狀態）。

### 3. "You might like" 側邊欄
- 顯示在桌面版右側（寬度 ≥ 1024px）
- 包含推薦用戶列表（每個用戶顯示頭像、名稱、@username、簡介）
- 每個用戶有 "Follow" 按鈕（點擊後切換為 "Following"）
- 底部有 "Show more" 連結
- 移動端自動隱藏

## 未來 API 整合點

所有需要連接後端 API 的地方都已標記了 `TODO` 註釋：

### 1. **`src/api/mockProfile.ts`**：
- 第 58 行：`fetchUserProfile()` - 替換為 `GET /api/users/:username/profile`
- 第 35-44 行：`getProfileTabData()` - 替換為各個標籤頁的 API 端點
- 第 78 行：`fetchRecommendedUsers()` - 替換為 `GET /api/users/recommended`

### 2. **`src/pages/UserProfilePage.tsx`**：
- 第 25 行：`currentUserId` - 替換為從 auth context 獲取
- 第 62-67 行：`handleSaveProfile()` - 替換為 `PATCH /api/users/:userId/profile`

### 3. **`src/components/profile/EditProfileModal.tsx`**：
- 第 33-35 行：圖片上傳功能需要連接到雲端存儲（AWS S3, GCS, Firebase）
- 第 211-216 行：TODO 註釋中說明了完整的 API 整合步驟

### 4. **`src/components/profile/YouMightLike.tsx`**：
- 第 12-16 行：`handleFollow()` - 替換為 `POST /api/users/:userId/follow` 或 `DELETE /api/users/:userId/follow`
- 第 20-23 行：`handleShowMore()` - 替換為獲取更多推薦用戶的 API 調用

## 設計特點

- 重用現有組件：使用了 `ReviewPostCard`、`MeetupPostCard` 和共享的標籤選項
- 響應式設計：桌面顯示側邊欄，移動端自動隱藏
- 樣式一致：使用現有的 Tailwind 類別和設計系統
- 最小改動：只修改了必要的文件，沒有重構現有代碼
- 本地狀態管理：所有編輯功能使用 React 本地狀態，準備好未來接入 API

所有功能已實作並通過 lint 檢查。可以啟動開發服務器測試所有新功能。

---

**User**

專案中是否有環境變數需要設定

---

**Cursor**


檢查專案中是否有需要設定的環境變數：



專案需要設定環境變數。檢查結果如下：



專案需要設定環境變數。

## 需要的環境變數

### Google Maps API Key

在 `src/hooks/useGoogleMaps.ts` 中使用了 Google Maps API，需要設定：

**環境變數名稱：** `REACT_APP_GOOGLE_MAPS_API_KEY`

## 設定步驟

1. 在專案根目錄（`wp-final/`）創建 `.env` 或 `.env.local` 文件
2. 添加以下內容：

```env
REACT_APP_GOOGLE_MAPS_API_KEY=你的_Google_Maps_API_Key
```

## 重要說明

1. Create React App 要求環境變數以 `REACT_APP_` 開頭
2. 檔案名稱可以是：
   - `.env`（所有環境）
   - `.env.local`（本地開發，通常加入 .gitignore）
   - `.env.development`（僅開發環境）
3. 設定後需重啟開發服務器才會生效

## 如何取得 Google Maps API Key

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立或選擇專案
3. 啟用 Maps JavaScript API 和 Places API
4. 在「憑證」頁面建立 API 金鑰
5. 將金鑰複製到 `.env` 文件

## 注意事項

- 不要將 `.env` 文件提交到 Git（應加入 `.gitignore`）
- 建議使用 `.env.local` 用於本地開發
- 若未設定此環境變數，使用 Google Maps 地點搜尋功能時會出現錯誤

需要我幫你建立 `.env.example` 範例文件嗎？

```plaintext
REACT_APP_GOOGLE_MAPS_API_KEY=你的_Google_Maps_API_Key
```

---

**User**

這個專案有用到哪個api使得擁有google map的地點搜尋功能嗎

---

**Cursor**


檢查專案中 Google Maps 地點搜尋功能的實作：



專案使用 Google Maps JavaScript API 的 Places Library 來實現地點搜尋。使用的 API 與服務如下：

## 使用的 Google Maps API

### 1. Google Maps JavaScript API
- 載入方式：透過 `useGoogleMaps` hook 動態載入
- API 端點：`https://maps.googleapis.com/maps/api/js`
- 參數：
  - `key=${apiKey}` - API 金鑰
  - `libraries=places` - 載入 Places Library
  - `language=zh-TW` - 中文介面
  - `region=TW` - 台灣地區

### 2. Places Library 中的服務

在 `LocationSearchModal.tsx` 中使用了以下服務：

#### a) AutocompleteService（自動完成搜尋）
```typescript
google.maps.places.AutocompleteService
```
- 方法：`getPlacePredictions()`
- 用途：即時搜尋建議，輸入時顯示候選地點
- 限制：僅限台灣（`country: 'tw'`），類型為 `establishment`

#### b) PlacesService（地點服務）
```typescript
google.maps.places.PlacesService
```
- 方法：`textSearch()` - 文字搜尋地點
- 方法：`getDetails()` - 取得地點詳細資訊
- 用途：
  - 當 Autocomplete 結果不足時作為備援
  - 取得選中地點的完整資訊（座標、地址等）

#### c) Geocoder（地理編碼）
```typescript
google.maps.Geocoder
```
- 方法：`geocode()` - 座標轉地址（反向地理編碼）
- 用途：手動選擇地圖位置時，將座標轉換為地址

### 3. 搜尋流程

1. 主要搜尋：使用 `AutocompleteService.getPlacePredictions()`
   - 即時建議
   - 限制在台灣地區
   - 優先顯示餐廳/商家

2. 備援搜尋：如果 Autocomplete 結果少於 5 個，使用 `PlacesService.textSearch()`
   - 文字搜尋
   - 類型限制為 `restaurant`
   - 合併結果並去重

3. 地點詳情：選擇地點後，使用 `PlacesService.getDetails()`
   - 取得完整座標、地址、區域資訊

4. 地圖顯示：使用 `google.maps.Map` 和 `google.maps.Marker`
   - 顯示地圖預覽
   - 標記選中的地點

## 需要的 Google Cloud API

在 Google Cloud Console 中需要啟用：
1. Maps JavaScript API
2. Places API（Places Library 需要）

## 程式碼位置

- Hook：`src/hooks/useGoogleMaps.ts` - 載入 Google Maps SDK
- 搜尋組件：`src/components/posts/LocationSearchModal.tsx` - 地點搜尋模態框
- 類型定義：`src/types/google-maps.d.ts` - TypeScript 類型定義

## 總結

專案使用 Google Maps JavaScript API 的 Places Library，包含：
- AutocompleteService（自動完成）
- PlacesService（文字搜尋與地點詳情）
- Geocoder（地理編碼）

這些服務整合在 `LocationSearchModal` 組件中，提供類似 Instagram 的地點搜尋體驗。

```typescript
google.maps.places.AutocompleteService
```

```typescript
google.maps.places.PlacesService
```

```typescript
google.maps.Geocoder
```

---

**User**

You are a senior frontend engineer working on a restaurant-sharing web app.

Currently the project is frontend only (no backend or DB yet), so use mock data + local state.

We want to add a new page: “收藏餐廳” (Saved/Favorited Restaurants) and connect it from the existing UI.

1. Entry point from user avatar

Locate the top-right user avatar (user profile icon).

When clicking the avatar, there should be a dropdown / menu.

If a menu already exists, add a new menu item:

Label: 收藏餐廳 (Saved Restaurants).

If there is no menu yet, create a simple dropdown for the avatar that includes:

Profile

Log out (if already present)

收藏餐廳 (new item)

Clicking 收藏餐廳 should navigate to a new route, e.g.:

/saved-restaurants

or whatever matches our router conventions.

Do this with minimal changes to existing components (prefer extension over refactor).

2. New page: 收藏餐廳 (Saved Restaurants) layout

Create a new page component for the Saved Restaurants view.

Overall layout

Three main areas:

Left sidebar: list + filters

Center: map + search

Right sidebar: restaurant detail panel

Also include a “Back to Home” button on this page.

Back to Home

At the top (e.g. top-left) of the 收藏餐廳 page, add a:

< Back to Home button or icon + text.

Clicking it should navigate to the main homepage / feed route.

Center area: Map + search

The center area is a map view showing markers for saved restaurants.

Requirements:

At the top of the center area, add a search bar:

Placeholder: e.g. 搜尋地點或餐廳…

For now, it can:

Filter the list of restaurants and markers by name/address, OR

Optionally interact with a map geocoding API if we already use one.

Keep implementation simple and frontend-only.

Under the search bar, render a map component:

On the map, each saved restaurant has a marker (pin) at its location (lat/lng).

When clicking a marker:

Highlight that restaurant in the left list (if possible).

Show its details in the right sidebar (see below).

Map library:

If the project already uses a map library (Google Maps, Mapbox, Leaflet, etc.), reuse it.

If not, set up a minimal solution (e.g. Leaflet + OpenStreetMap or a lightweight React map component).

Encapsulate map logic in a dedicated component like <SavedRestaurantsMap />.

Left sidebar: saved restaurant list + filters

The left sidebar should show a list of restaurants the user has saved.

At the top of the left sidebar, add two filter controls:

Filter by style / cuisine 風格:

e.g. 中式, 日式, 美式, 泰式, 墨西哥…

Filter by category 類別:

e.g. 早餐, 飲料, 甜點, 速食…

Implementation details:

Reuse the same style and category constants and chip/tag components already used on the main page.

Filters can be multi-select chips, dropdowns, or checkboxes.

When filters change, the list of restaurants (and markers on the map) should be filtered accordingly.

Below the filters:

Render a scrollable list of saved restaurants:

Show restaurant name, maybe a small icon / category.

When clicking a restaurant in the list:

Select that restaurant.

Center/focus that restaurant on the map (if possible).

Show its details on the right sidebar.

Right sidebar: restaurant detail panel

The right sidebar acts similarly to Google Maps’ info panel.

Behavior:

When the user:

clicks a marker on the map, OR

clicks a restaurant in the left sidebar,

The right sidebar should display that restaurant’s details:

Name

Address

Style tags (風格)

Category tags (類別)

Any other fields we already have (rating, opening hours, etc., if available).

Saved vs not saved

We need to support both states:

If the selected restaurant is already saved by the user:

At the bottom of the detail panel, show a button:

Label: 取消收藏 (Unsave / Remove from favorites)

Clicking this should:

Update local state, removing the restaurant from the “saved list”.

Remove its marker from the map.

Update left sidebar list accordingly.

If the selected restaurant is NOT currently saved:

At the bottom of the panel:

Show controls to select style and category tags:

Reuse existing tag components/constants.

User can choose appropriate 風格 / 類別 for this restaurant.

Show a “收藏” (Save) button.

Clicking “收藏” should:

Add this restaurant to the saved list in local state.

Use the selected style/category tags.

Add a marker to the map.

Update left sidebar list.

Implementation notes:

For now, all save/unsave actions should be frontend-only, using React state.

Place clear // TODO: persist saved restaurants (API/DB) comments where appropriate.

3. Data model & mock data

Create or extend a mock data module, e.g. mock/savedRestaurants.ts, with:

Restaurant TypeScript interface:

id

name

address

lat

lng

styles: string[] (cuisine styles)

categories: string[]

isSaved: boolean

An initial array of restaurants, some with isSaved = true and some false, to demonstrate both states.

State management:

On the 收藏餐廳 page, maintain state for:

Current list of restaurants (including saved/unsaved).

Currently selected restaurant.

Active filters (styles & categories).

Search keyword.

Filtering behavior:

Apply filters + search both to:

left sidebar list

and map markers.

4. Structure, TypeScript, and minimal changes

Put new components under a folder like:

components/savedRestaurants/

Add the page under the appropriate routing folder, e.g.:

pages/saved-restaurants.tsx (Next.js)

or matching our router setup.

Use TypeScript with proper props and interfaces.

Follow existing styling conventions (Tailwind / design system).

Keep modifications to existing files minimal:

Mainly: avatar menu, routing, and possibly layout to accommodate the new page.

Ensure the project compiles without TypeScript errors.

5. Tasks for you (Cursor)

Inspect the codebase to find:

The top-right user avatar component / menu.

Existing style & category tag components and constants.

Existing map usage (if any) and routing setup.

Add the 收藏餐廳 menu entry under the avatar, linked to the new route.

Implement the Saved Restaurants page with:

Back-to-home button.

Left sidebar + filters + list.

Center map + search bar + markers for saved restaurants.

Right sidebar detail panel with correct behavior for saved vs unsaved restaurants (收藏 / 取消收藏 buttons).

Use mock data + local state for all restaurant and saved/unsaved behavior.

Make sure the layout is responsive (sidebars may stack on mobile if needed).

At the end, output:

The list of files created/modified.

A short explanation of how the save/unsave state flows and where an API could be integrated later.

---

**Cursor**


檢查現有代碼結構，準備實作「收藏餐廳」頁面：



開始實作「收藏餐廳」頁面。先建立初始待辦清單：


```typescript
export interface SavedRestaurant {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  styles: string[]; // Cuisine style labels like "日式 Japanese"
  categories: string[]; // Category labels like "早餐 Breakfast"
  isSaved: boolean;
  rating?: number; // Optional rating
  priceLevel?: '$' | '$$' | '$$$'; // Optional price level
  imageUrl?: string; // Optional restaurant image
}

```

```typescript
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
    lng: 25.1200,
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

```


修正 mock 資料中的錯誤，接著建立組件：


```typescript
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


```

```typescriptreact
import React, { useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SavedRestaurantsMapProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  onMarkerClick: (restaurant: SavedRestaurant) => void;
}

export const SavedRestaurantsMap: React.FC<SavedRestaurantsMapProps> = ({
  restaurants,
  selectedRestaurant,
  onMarkerClick,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
  }, [isLoaded]);

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Create markers for saved restaurants only
    const savedRestaurants = restaurants.filter((r) => r.isSaved);

    if (savedRestaurants.length === 0) return;

    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();

    savedRestaurants.forEach((restaurant) => {
      const position = { lat: restaurant.lat, lng: restaurant.lng };

      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: restaurant.name,
        animation: selectedRestaurant?.id === restaurant.id ? google.maps.Animation.BOUNCE : undefined,
      });

      // Add click listener
      marker.addListener('click', () => {
        onMarkerClick(restaurant);
      });

      markersRef.current.set(restaurant.id, marker);
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (savedRestaurants.length > 1) {
      mapInstanceRef.current.fitBounds(bounds);
    } else if (savedRestaurants.length === 1) {
      mapInstanceRef.current.setCenter({ lat: savedRestaurants[0].lat, lng: savedRestaurants[0].lng });
      mapInstanceRef.current.setZoom(15);
    }
  }, [restaurants, isLoaded, selectedRestaurant, onMarkerClick]);

  // Center map on selected restaurant
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedRestaurant) return;

    const position = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng };
    mapInstanceRef.current.setCenter(position);
    mapInstanceRef.current.setZoom(16);

    // Highlight selected marker
    markersRef.current.forEach((marker, id) => {
      if (id === selectedRestaurant.id) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 2000);
      }
    });
  }, [selectedRestaurant]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-text-secondary">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

```

```typescriptreact
import React from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface SavedRestaurantsListProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  selectedStyles: string[];
  selectedCategories: string[];
  onRestaurantClick: (restaurant: SavedRestaurant) => void;
  onStyleToggle: (style: string) => void;
  onCategoryToggle: (category: string) => void;
}

export const SavedRestaurantsList: React.FC<SavedRestaurantsListProps> = ({
  restaurants,
  selectedRestaurant,
  selectedStyles,
  selectedCategories,
  onRestaurantClick,
  onStyleToggle,
  onCategoryToggle,
}) => {
  // Filter restaurants based on selected styles and categories
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Only show saved restaurants in the list
    if (!restaurant.isSaved) return false;

    // Filter by styles
    if (selectedStyles.length > 0) {
      const hasMatchingStyle = restaurant.styles.some((style) => selectedStyles.includes(style));
      if (!hasMatchingStyle) return false;
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = restaurant.categories.some((category) => selectedCategories.includes(category));
      if (!hasMatchingCategory) return false;
    }

    return true;
  });

  return (
    <div className="h-full flex flex-col bg-bg-tertiary border-r border-border-color">
      {/* Filters Section */}
      <div className="p-4 border-b border-border-color">
        {/* Style Filter */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((style) => {
              const isSelected = selectedStyles.includes(style.label);
              return (
                <button
                  key={style.id}
                  onClick={() => onStyleToggle(style.label)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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

        {/* Category Filter */}
        <div>
          <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((category) => {
              const isSelected = selectedCategories.includes(category.label);
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryToggle(category.label)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        {filteredRestaurants.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-text-secondary text-sm">沒有找到餐廳</p>
          </div>
        ) : (
          <div className="divide-y divide-border-color">
            {filteredRestaurants.map((restaurant) => {
              const isSelected = selectedRestaurant?.id === restaurant.id;
              return (
                <button
                  key={restaurant.id}
                  onClick={() => onRestaurantClick(restaurant)}
                  className={`w-full text-left p-4 hover:bg-bg-hover transition-colors ${
                    isSelected ? 'bg-bg-card border-l-4 border-accent-primary' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Restaurant Icon */}
                    <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center flex-shrink-0">
                      <span className="text-text-primary text-lg">🍽️</span>
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary text-sm mb-1 truncate">{restaurant.name}</h4>
                      <p className="text-text-secondary text-xs mb-2 line-clamp-1">{restaurant.address}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {restaurant.styles.slice(0, 2).map((style, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {style}
                          </span>
                        ))}
                        {restaurant.categories.slice(0, 1).map((category, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

```

```typescriptreact
import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface RestaurantDetailPanelProps {
  restaurant: SavedRestaurant | null;
  onSave: (restaurant: SavedRestaurant, styles: string[], categories: string[]) => void;
  onUnsave: (restaurant: SavedRestaurant) => void;
}

export const RestaurantDetailPanel: React.FC<RestaurantDetailPanelProps> = ({
  restaurant,
  onSave,
  onUnsave,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Update selected tags when restaurant changes
  React.useEffect(() => {
    if (restaurant) {
      if (restaurant.isSaved) {
        // If already saved, use existing tags
        setSelectedStyles(restaurant.styles);
        setSelectedCategories(restaurant.categories);
      } else {
        // If not saved, start with empty selection
        setSelectedStyles([]);
        setSelectedCategories([]);
      }
    }
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="h-full flex items-center justify-center bg-bg-card border-l border-border-color">
        <p className="text-text-secondary text-center px-4">選擇一個餐廳查看詳情</p>
      </div>
    );
  }

  const toggleStyle = (styleLabel: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleLabel) ? prev.filter((s) => s !== styleLabel) : [...prev, styleLabel]
    );
  };

  const toggleCategory = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel) ? prev.filter((c) => c !== categoryLabel) : [...prev, categoryLabel]
    );
  };

  const handleSave = () => {
    if (selectedStyles.length === 0 || selectedCategories.length === 0) {
      alert('請至少選擇一個風格和一個類別');
      return;
    }
    onSave(restaurant, selectedStyles, selectedCategories);
  };

  const handleUnsave = () => {
    if (window.confirm('確定要取消收藏這個餐廳嗎？')) {
      onUnsave(restaurant);
    }
  };

  return (
    <div className="h-full flex flex-col bg-bg-card border-l border-border-color overflow-y-auto scrollbar-hidden">
      <div className="p-6">
        {/* Restaurant Name */}
        <h2 className="text-2xl font-bold text-text-primary mb-2">{restaurant.name}</h2>

        {/* Address */}
        <div className="mb-4">
          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-secondary mt-0.5 flex-shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="text-text-secondary text-sm">{restaurant.address}</p>
          </div>
        </div>

        {/* Rating & Price */}
        {(restaurant.rating || restaurant.priceLevel) && (
          <div className="flex items-center gap-4 mb-4">
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-text-primary font-semibold">{restaurant.rating.toFixed(1)}</span>
              </div>
            )}
            {restaurant.priceLevel && (
              <span className="text-text-secondary text-sm">{restaurant.priceLevel}</span>
            )}
          </div>
        )}

        {/* Existing Tags (if saved) */}
        {restaurant.isSaved && (
          <div className="mb-6">
            {restaurant.styles.length > 0 && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.styles.map((style, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {restaurant.categories.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tag Selection (if not saved) */}
        {!restaurant.isSaved && (
          <div className="mb-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">選擇風格 Styles</h3>
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

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">選擇類別 Categories</h3>
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
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-border-color">
          {restaurant.isSaved ? (
            <button
              onClick={handleUnsave}
              className="w-full px-4 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            >
              取消收藏
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={selectedStyles.length === 0 || selectedCategories.length === 0}
              className="w-full px-4 py-2.5 rounded-full bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              收藏
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

```


建立主頁面組件：


```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { TopNavBar } from '../components/layout/TopNavBar';
import { SearchInput } from '../components/common/SearchInput';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurant.id
          ? {
              ...r,
              isSaved: true,
              styles,
              categories,
            }
          : r
      )
    );

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 flex flex-col">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

```

```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      // TODO: Replace with actual logged-in user's username from auth context
                      navigate('/user/lorry930811');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/saved-restaurants');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    收藏餐廳
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};


```

```typescriptreact
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RendezvousHome } from './pages/RendezvousHome';
import { UserProfilePage } from './pages/UserProfilePage';
import { SavedRestaurantsPage } from './pages/SavedRestaurantsPage';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RendezvousHome />} />
          <Route path="/user/:username" element={<UserProfilePage />} />
          <Route path="/saved-restaurants" element={<SavedRestaurantsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


```


檢查 SearchInput 組件是否支援 placeholder：



所有功能已實作完成。以下是總結：

## 已創建/修改的文件列表

### 新創建的文件：

1. **`src/types/savedRestaurants.ts`** - SavedRestaurant 類型定義
2. **`src/api/mockSavedRestaurants.ts`** - Mock 餐廳資料和 API 函數
3. **`src/components/savedRestaurants/SavedRestaurantsMap.tsx`** - 地圖組件（顯示標記）
4. **`src/components/savedRestaurants/SavedRestaurantsList.tsx`** - 左側列表組件（含過濾器）
5. **`src/components/savedRestaurants/RestaurantDetailPanel.tsx`** - 右側詳情面板組件
6. **`src/pages/SavedRestaurantsPage.tsx`** - 收藏餐廳主頁面

### 修改的文件：

1. **`src/components/layout/TopNavBar.tsx`** - 在用戶頭像下拉菜單中添加了「收藏餐廳」選項
2. **`src/App.tsx`** - 添加了 `/saved-restaurants` 路由

## 功能說明

### 1. 入口點
- 點擊右上角用戶頭像
- 在下拉菜單中選擇「收藏餐廳」
- 導航到 `/saved-restaurants` 頁面

### 2. 頁面布局
- Back to Home 按鈕：位於頁面頂部，可返回主頁
- 左側邊欄：餐廳列表 + 風格/類別過濾器
- 中間區域：地圖視圖 + 搜尋欄
- 右側邊欄：餐廳詳情面板

### 3. 地圖功能
- 顯示所有已收藏餐廳的標記
- 點擊標記會選中餐廳並顯示詳情
- 自動調整視圖以顯示所有標記
- 選中的標記會有動畫效果

### 4. 過濾功能
- 風格過濾：可多選（日式、美式、泰式等）
- 類別過濾：可多選（早餐、飲料、甜點等）
- 搜尋欄：可搜尋餐廳名稱、地址、風格、類別
- 過濾結果會同時更新列表和地圖標記

### 5. 收藏/取消收藏功能
- 已收藏餐廳：顯示「取消收藏」按鈕，點擊後從列表中移除
- 未收藏餐廳：顯示風格/類別選擇器 + 「收藏」按鈕
- 收藏時必須選擇至少一個風格和一個類別
- 所有操作使用本地狀態，立即更新 UI

### 6. 響應式設計
- 桌面版：三欄布局（列表 + 地圖 + 詳情）
- 平板版：隱藏右側詳情面板
- 移動版：列表和詳情面板以模態框形式顯示

## 狀態流程說明

### 收藏/取消收藏狀態流程：

1. 初始狀態：
   - 從 `fetchAllRestaurants()` 載入所有餐廳（包含 `isSaved` 狀態）
   - 已收藏餐廳顯示在列表和地圖上

2. 收藏餐廳：
   - 用戶選擇未收藏的餐廳
   - 在詳情面板選擇風格和類別標籤
   - 點擊「收藏」按鈕
   - 更新 `restaurants` 狀態：`isSaved: true`，添加 `styles` 和 `categories`
   - 餐廳出現在列表和地圖上

3. 取消收藏：
   - 用戶選擇已收藏的餐廳
   - 點擊「取消收藏」按鈕
   - 更新 `restaurants` 狀態：`isSaved: false`
   - 餐廳從列表和地圖上移除

4. 過濾和搜尋：
   - 用戶選擇過濾器或輸入搜尋關鍵字
   - `filteredRestaurants` 自動更新
   - 列表和地圖標記同步更新

## 未來 API 整合點

所有需要連接後端 API 的地方都已標記了 `TODO` 註釋：

1. **`src/api/mockSavedRestaurants.ts`**：
   - 第 46 行：`fetchAllRestaurants()` - 替換為 `GET /api/restaurants`
   - 第 52 行：`saveRestaurant()` - 替換為 `POST /api/restaurants/:id/save`
   - 第 60 行：`unsaveRestaurant()` - 替換為 `DELETE /api/restaurants/:id/unsave`

2. **`src/pages/SavedRestaurantsPage.tsx`**：
   - 第 108 行：`handleSave()` - 調用 API 保存餐廳
   - 第 125 行：`handleUnsave()` - 調用 API 取消收藏

## 設計特點

- 重用現有組件：使用了 `SearchInput`、`TopNavBar` 和共享的標籤選項
- 使用 Google Maps：重用現有的 `useGoogleMaps` hook
- 響應式設計：支援桌面、平板和移動設備
- 樣式一致：使用現有的 Tailwind 類別和設計系統
- 最小改動：只修改了必要的文件

所有功能已實作並通過 lint 檢查。可以啟動開發服務器測試「收藏餐廳」頁面功能。

---

**User**

You are a senior frontend engineer working on our restaurant-sharing web app (React + TypeScript + Tailwind or our existing UI system).

The project is frontend-only (mock data + local state), but we already have a 收藏餐廳 (Saved Restaurants) page with:



Left sidebar: list of saved restaurants.



Center: map + search input.



Right sidebar: restaurant detail panel.



Now we need to fix bugs and upgrade the search behavior so it behaves more like Google Maps.



Context (what should exist already)



On the 收藏餐廳 page we already have:



A map component (showing saved restaurant markers).



A left sidebar that lists saved restaurants.



A right sidebar that should display details for the “selected” restaurant.



A search input above the map.



Please find the existing components, something like:



SavedRestaurantsPage (page container)



SavedRestaurantsMap (map component)



SavedRestaurantsSidebarLeft



SavedRestaurantsSidebarRight (detail panel)



Shared state for selectedRestaurant and savedRestaurants.



Try to reuse the existing structure and state instead of rewriting from scratch.



Bug 1: Clicking a map marker should update the right sidebar



Current problem:



When I click a marker / place on the map, the right sidebar is empty (no restaurant info), instead of showing details like Google Maps.



Desired behavior:



Clicking a marker on the map must:



Set a selectedRestaurant in shared state (or context).



Cause the right sidebar to render that restaurant’s information:



Name



Address



Styles / Categories



Other fields we already have



“收藏” / “取消收藏” button as previously designed.



Implementation details:



Inspect the map component:



Ensure each marker has an onClick handler.



That handler should call something like onSelectRestaurant(restaurant) passed from the parent.



If we are only passing coordinates, connect them back to a restaurant object (e.g., by id).



Inspect the right sidebar component:



It should accept a selectedRestaurant (prop or context).



When selectedRestaurant is null, show a simple placeholder text (e.g., “請選擇地圖上的餐廳或左側列表中的餐廳”).



When it is not null, render the full restaurant detail UI including:



Save / Unsave behavior (respecting isSaved).



Make sure the left sidebar list uses the same onSelectRestaurant flow:



Clicking a restaurant in the list should select it in the same way as a map marker click.



Keep all save/unsave logic frontend-only using local state for now.



Bug 2: Search input should behave like Google Maps



Current problems:



Typing in the search box:



Does not show any suggestion list under the input.



After entering a full restaurant name and confirming search:



The map does nothing (no panning / zooming / marker).



Desired behavior (similar to Google Maps):



When the user types in the search box:



Show a dropdown list of suggestions under the input:



Suggestions can be:



Real Places / addresses using the underlying map provider (preferred), OR



At minimum, autocomplete results from our local restaurant list.



Selecting a suggestion from the dropdown should:



Fill the search input.



Trigger a search/selection.



When the user confirms a search (press Enter or selects a suggestion):



The map should respond:



Center/pan to the selected place’s coordinates.



Adjust zoom appropriately.



Show a marker at that place.



The right sidebar should display details for that place:



If this place matches one of our saved restaurants:



Treat it as that restaurant (show saved info + 取消收藏).



If it is not currently saved:



Allow style/category selection + 收藏 button, as we previously designed.



Implementation details:



Detect which map / place API we are using now:



If using Google Maps via @react-google-maps/api or similar:



Use Places Autocomplete / AutocompleteService plus Places Details or Geocoding.



If using Mapbox or another provider:



Use their geocoding / search API.



Implement search state:



query: string



suggestions: PlaceSuggestion[] (type with at least id, label, lat, lng).



selectedSuggestion: PlaceSuggestion | null



On input change:



Debounce calls to the Places / Geocoding API.



Update suggestions state.



Render suggestions in a dropdown under the input (clickable list items).



On suggestion click or Enter key:



Set selectedSuggestion.



Pan/zoom the map to lat/lng.



If suggestion corresponds to an existing restaurant (match by place_id, name, or other key):



Set selectedRestaurant to that restaurant.



Otherwise:



Create a temporary “unsaved” restaurant-like object for the detail panel (with name/address from the place result).



In the right sidebar, show controls for choosing Styles / Categories and a 收藏 button that converts it into a saved restaurant.



Keep API keys and endpoints external:



Add configuration for the API key via .env (e.g. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).



Do not hardcode secrets.



At the end, when you respond, clearly tell me:



Which external API(s) you used (e.g., Google Maps Places API, Mapbox Geocoding API, etc.).



Which new environment variables I need to set.



Which services or APIs I must enable in the console (e.g., enable Places API + Geocoding API in Google Cloud).



Structure & quality



Keep changes localized to the 收藏餐廳 page and related components as much as possible.



Use TypeScript types for:



Restaurant



PlaceSuggestion



Maintain consistent styling with our existing design (Tailwind / UI components).



Ensure the app compiles with no TypeScript errors.



Tasks for you (Cursor)



Locate the 收藏餐廳 page components and the map/search/detail wiring.



Fix Bug 1 so clicking markers and list items correctly updates the right sidebar with restaurant details.



Implement Bug 2:



Autocomplete suggestions under the search input.



Map panning/zooming + marker placement on search/selection.



Right sidebar information display for both saved and unsaved places.



Keep state management in React (local or context) and mock data; do not add real backend calls.



When done, output:



The list of files created/modified.



A short explanation of:



How marker click → selectedRestaurant → right sidebar detail flow works now.



How the search autocomplete and map centering are implemented.



Which external map/places APIs and environment variables I need to configure.

---

**Cursor**


檢查現有代碼結構，準備修復這兩個問題：



建立待辦清單，開始修復這兩個問題：


```typescript
// Place suggestion from Google Places Autocomplete
export interface PlaceSuggestion {
  placeId: string;
  name: string;
  address: string;
  lat?: number;
  lng?: number;
}

```


修復地圖標記點擊問題，並建立搜尋自動完成組件：


```typescriptreact
import React, { useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SavedRestaurantsMapProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  onMarkerClick: (restaurant: SavedRestaurant) => void;
  centerLocation?: { lat: number; lng: number } | null; // External control for map centering
  centerZoom?: number; // Zoom level when centering
}

export const SavedRestaurantsMap: React.FC<SavedRestaurantsMapProps> = ({
  restaurants,
  selectedRestaurant,
  onMarkerClick,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
  }, [isLoaded]);

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Create markers for saved restaurants only
    const savedRestaurants = restaurants.filter((r) => r.isSaved);

    if (savedRestaurants.length === 0) return;

    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();

    savedRestaurants.forEach((restaurant) => {
      const position = { lat: restaurant.lat, lng: restaurant.lng };

      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: restaurant.name,
        animation: selectedRestaurant?.id === restaurant.id ? google.maps.Animation.BOUNCE : undefined,
      });

      // Add click listener
      marker.addListener('click', () => {
        onMarkerClick(restaurant);
      });

      markersRef.current.set(restaurant.id, marker);
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (savedRestaurants.length > 1) {
      mapInstanceRef.current.fitBounds(bounds);
    } else if (savedRestaurants.length === 1) {
      mapInstanceRef.current.setCenter({ lat: savedRestaurants[0].lat, lng: savedRestaurants[0].lng });
      mapInstanceRef.current.setZoom(15);
    }
  }, [restaurants, isLoaded, selectedRestaurant, onMarkerClick]);

  // Center map on selected restaurant
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedRestaurant) return;

    const position = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng };
    mapInstanceRef.current.setCenter(position);
    mapInstanceRef.current.setZoom(16);

    // Highlight selected marker
    markersRef.current.forEach((marker, id) => {
      if (id === selectedRestaurant.id) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 2000);
      }
    });
  }, [selectedRestaurant]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-text-secondary">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};


```

```typescriptreact
import React, { useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SavedRestaurantsMapProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  onMarkerClick: (restaurant: SavedRestaurant) => void;
  centerLocation?: { lat: number; lng: number } | null; // External control for map centering
  centerZoom?: number; // Zoom level when centering
}

export const SavedRestaurantsMap: React.FC<SavedRestaurantsMapProps> = ({
  restaurants,
  selectedRestaurant,
  onMarkerClick,
  centerLocation,
  centerZoom = 16,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
  }, [isLoaded]);

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Create markers for saved restaurants only
    const savedRestaurants = restaurants.filter((r) => r.isSaved);

    if (savedRestaurants.length === 0) return;

    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();

    savedRestaurants.forEach((restaurant) => {
      const position = { lat: restaurant.lat, lng: restaurant.lng };

      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: restaurant.name,
        animation: selectedRestaurant?.id === restaurant.id ? google.maps.Animation.BOUNCE : undefined,
      });

      // Add click listener
      marker.addListener('click', () => {
        onMarkerClick(restaurant);
      });

      markersRef.current.set(restaurant.id, marker);
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (savedRestaurants.length > 1) {
      mapInstanceRef.current.fitBounds(bounds);
    } else if (savedRestaurants.length === 1) {
      mapInstanceRef.current.setCenter({ lat: savedRestaurants[0].lat, lng: savedRestaurants[0].lng });
      mapInstanceRef.current.setZoom(15);
    }
  }, [restaurants, isLoaded, selectedRestaurant, onMarkerClick]);

  // Center map on selected restaurant
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedRestaurant) return;

    const position = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng };
    mapInstanceRef.current.setCenter(position);
    mapInstanceRef.current.setZoom(16);

    // Highlight selected marker
    markersRef.current.forEach((marker, id) => {
      if (id === selectedRestaurant.id) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 2000);
      }
    });
  }, [selectedRestaurant]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-text-secondary">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};


```

```typescriptreact
import React, { useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SavedRestaurantsMapProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  onMarkerClick: (restaurant: SavedRestaurant) => void;
  centerLocation?: { lat: number; lng: number } | null; // External control for map centering
  centerZoom?: number; // Zoom level when centering
}

export const SavedRestaurantsMap: React.FC<SavedRestaurantsMapProps> = ({
  restaurants,
  selectedRestaurant,
  onMarkerClick,
  centerLocation,
  centerZoom = 16,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
  }, [isLoaded]);

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Create markers for saved restaurants only
    const savedRestaurants = restaurants.filter((r) => r.isSaved);

    if (savedRestaurants.length === 0) return;

    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();

    savedRestaurants.forEach((restaurant) => {
      const position = { lat: restaurant.lat, lng: restaurant.lng };

      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: restaurant.name,
        animation: selectedRestaurant?.id === restaurant.id ? google.maps.Animation.BOUNCE : undefined,
      });

      // Add click listener
      marker.addListener('click', () => {
        onMarkerClick(restaurant);
      });

      markersRef.current.set(restaurant.id, marker);
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (savedRestaurants.length > 1) {
      mapInstanceRef.current.fitBounds(bounds);
    } else if (savedRestaurants.length === 1) {
      mapInstanceRef.current.setCenter({ lat: savedRestaurants[0].lat, lng: savedRestaurants[0].lng });
      mapInstanceRef.current.setZoom(15);
    }
  }, [restaurants, isLoaded, selectedRestaurant, onMarkerClick]);

  // Center map on selected restaurant or external location
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (centerLocation) {
      // External control (e.g., from search)
      mapInstanceRef.current.setCenter(centerLocation);
      mapInstanceRef.current.setZoom(centerZoom);
      return;
    }

    if (selectedRestaurant) {
      // Center on selected restaurant
      const position = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng };
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(16);

      // Highlight selected marker
      markersRef.current.forEach((marker, id) => {
        if (id === selectedRestaurant.id) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 2000);
        }
      });
    }
  }, [selectedRestaurant, centerLocation, centerZoom]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-text-secondary">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};


```

```typescriptreact
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { PlaceSuggestion } from '../../types/placeSearch';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SearchWithAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectPlace: (place: PlaceSuggestion) => void;
  restaurants: SavedRestaurant[]; // To match with existing restaurants
  placeholder?: string;
}

export const SearchWithAutocomplete: React.FC<SearchWithAutocompleteProps> = ({
  value,
  onChange,
  onSelectPlace,
  restaurants,
  placeholder = '搜尋地點或餐廳…',
}) => {
  const { isLoaded } = useGoogleMaps();
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Default location: Taipei center
  const defaultLocation = { lat: 25.0330, lng: 121.5654 };

  // Initialize Google Maps services
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    if (!autocompleteServiceRef.current) {
      autocompleteServiceRef.current = new google.maps.places.AutocompleteService();
    }

    if (!placesServiceRef.current) {
      const dummyDiv = document.createElement('div');
      placesServiceRef.current = new google.maps.places.PlacesService(dummyDiv);
    }
  }, [isLoaded]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Perform autocomplete search
  const performSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (!autocompleteServiceRef.current || trimmed.length < 2) {
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      // First, check local restaurants
      const localMatches: PlaceSuggestion[] = restaurants
        .filter(
          (r) =>
            r.name.toLowerCase().includes(trimmed.toLowerCase()) ||
            r.address.toLowerCase().includes(trimmed.toLowerCase())
        )
        .slice(0, 3)
        .map((r) => ({
          placeId: r.id,
          name: r.name,
          address: r.address,
          lat: r.lat,
          lng: r.lng,
        }));

      // Then, use Google Places Autocomplete
      const location = new google.maps.LatLng(defaultLocation.lat, defaultLocation.lng);
      const autocompleteRequest: google.maps.places.AutocompletionRequest = {
        input: trimmed,
        componentRestrictions: { country: 'tw' },
        types: ['establishment'],
        location: location,
        radius: 30000,
      };

      autocompleteServiceRef.current.getPlacePredictions(
        autocompleteRequest,
        (
          predictions: google.maps.places.AutocompletePrediction[] | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          setIsSearching(false);

          let googleSuggestions: PlaceSuggestion[] = [];
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            googleSuggestions = predictions.slice(0, 5).map((pred) => ({
              placeId: pred.place_id,
              name: pred.structured_formatting.main_text,
              address: pred.structured_formatting.secondary_text || '',
            }));
          }

          // Combine local and Google suggestions, prioritizing local
          const combined = [...localMatches, ...googleSuggestions];
          setSuggestions(combined);
          setShowSuggestions(combined.length > 0);
        }
      );
    },
    [restaurants, defaultLocation.lat, defaultLocation.lng]
  );

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim().length >= 2 && isLoaded) {
      searchTimeoutRef.current = setTimeout(() => {
        performSearch(value);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [value, isLoaded, performSearch]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion: PlaceSuggestion) => {
    setShowSuggestions(false);
    onChange(suggestion.name);

    // If suggestion has coordinates, use them directly
    if (suggestion.lat && suggestion.lng) {
      onSelectPlace(suggestion);
      return;
    }

    // Otherwise, get place details from Google Places
    if (placesServiceRef.current && suggestion.placeId) {
      const request: google.maps.places.PlaceDetailsRequest = {
        placeId: suggestion.placeId,
        fields: ['name', 'formatted_address', 'geometry', 'place_id'],
      };

      placesServiceRef.current.getDetails(
        request,
        (
          place: google.maps.places.PlaceResult | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();

            if (lat && lng) {
              onSelectPlace({
                placeId: suggestion.placeId,
                name: place.name || suggestion.name,
                address: place.formatted_address || suggestion.address,
                lat,
                lng,
              });
            }
          }
        }
      );
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={placeholder}
          className="block w-full pl-11 pr-10 py-2.5 border border-border-color rounded-full bg-bg-card text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50 focus:border-accent-primary focus:outline-none text-base shadow-md transition-all duration-300"
          style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}
        />
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setSuggestions([]);
              setShowSuggestions(false);
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {isSearching && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-12">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-primary"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-2 bg-bg-card rounded-lg shadow-lg border border-border-color max-h-80 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.placeId || index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-bg-hover transition-colors border-b border-border-color last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-text-secondary mt-0.5 flex-shrink-0"
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
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text-primary text-sm truncate">{suggestion.name}</p>
                  <p className="text-text-secondary text-xs truncate">{suggestion.address}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

```


更新 SavedRestaurantsPage，整合搜尋自動完成功能：


```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurant.id
          ? {
              ...r,
              isSaved: true,
              styles,
              categories,
            }
          : r
      )
    );

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 flex flex-col">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurant.id
          ? {
              ...r,
              isSaved: true,
              styles,
              categories,
            }
          : r
      )
    );

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 flex flex-col">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurant.id
          ? {
              ...r,
              isSaved: true,
              styles,
              categories,
            }
          : r
      )
    );

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 flex flex-col">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 flex flex-col">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 flex flex-col">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchWithAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectPlace={handleSelectPlace}
              restaurants={restaurants}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
                centerLocation={mapCenter}
                centerZoom={mapZoom}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface RestaurantDetailPanelProps {
  restaurant: SavedRestaurant | null;
  onSave: (restaurant: SavedRestaurant, styles: string[], categories: string[]) => void;
  onUnsave: (restaurant: SavedRestaurant) => void;
}

export const RestaurantDetailPanel: React.FC<RestaurantDetailPanelProps> = ({
  restaurant,
  onSave,
  onUnsave,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Update selected tags when restaurant changes
  React.useEffect(() => {
    if (restaurant) {
      if (restaurant.isSaved) {
        // If already saved, use existing tags
        setSelectedStyles(restaurant.styles);
        setSelectedCategories(restaurant.categories);
      } else {
        // If not saved, start with empty selection
        setSelectedStyles([]);
        setSelectedCategories([]);
      }
    }
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="h-full flex items-center justify-center bg-bg-card border-l border-border-color">
        <p className="text-text-secondary text-center px-4">請選擇地圖上的餐廳或左側列表中的餐廳</p>
      </div>
    );
  }

  const toggleStyle = (styleLabel: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleLabel) ? prev.filter((s) => s !== styleLabel) : [...prev, styleLabel]
    );
  };

  const toggleCategory = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel) ? prev.filter((c) => c !== categoryLabel) : [...prev, categoryLabel]
    );
  };

  const handleSave = () => {
    if (selectedStyles.length === 0 || selectedCategories.length === 0) {
      alert('請至少選擇一個風格和一個類別');
      return;
    }
    onSave(restaurant, selectedStyles, selectedCategories);
  };

  const handleUnsave = () => {
    if (window.confirm('確定要取消收藏這個餐廳嗎？')) {
      onUnsave(restaurant);
    }
  };

  return (
    <div className="h-full flex flex-col bg-bg-card border-l border-border-color overflow-y-auto scrollbar-hidden">
      <div className="p-6">
        {/* Restaurant Name */}
        <h2 className="text-2xl font-bold text-text-primary mb-2">{restaurant.name}</h2>

        {/* Address */}
        <div className="mb-4">
          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-secondary mt-0.5 flex-shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="text-text-secondary text-sm">{restaurant.address}</p>
          </div>
        </div>

        {/* Rating & Price */}
        {(restaurant.rating || restaurant.priceLevel) && (
          <div className="flex items-center gap-4 mb-4">
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-text-primary font-semibold">{restaurant.rating.toFixed(1)}</span>
              </div>
            )}
            {restaurant.priceLevel && (
              <span className="text-text-secondary text-sm">{restaurant.priceLevel}</span>
            )}
          </div>
        )}

        {/* Existing Tags (if saved) */}
        {restaurant.isSaved && (
          <div className="mb-6">
            {restaurant.styles.length > 0 && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.styles.map((style, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {restaurant.categories.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tag Selection (if not saved) */}
        {!restaurant.isSaved && (
          <div className="mb-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">選擇風格 Styles</h3>
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

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">選擇類別 Categories</h3>
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
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-border-color">
          {restaurant.isSaved ? (
            <button
              onClick={handleUnsave}
              className="w-full px-4 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            >
              取消收藏
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={selectedStyles.length === 0 || selectedCategories.length === 0}
              className="w-full px-4 py-2.5 rounded-full bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              收藏
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


```


更新地圖組件，支援顯示搜尋結果的臨時標記：


```typescriptreact
import React, { useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SavedRestaurantsMapProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  onMarkerClick: (restaurant: SavedRestaurant) => void;
  centerLocation?: { lat: number; lng: number } | null; // External control for map centering
  centerZoom?: number; // Zoom level when centering
}

export const SavedRestaurantsMap: React.FC<SavedRestaurantsMapProps> = ({
  restaurants,
  selectedRestaurant,
  onMarkerClick,
  centerLocation,
  centerZoom = 16,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const searchMarkerRef = useRef<google.maps.Marker | null>(null); // Marker for search results

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
  }, [isLoaded]);

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Create markers for saved restaurants only
    const savedRestaurants = restaurants.filter((r) => r.isSaved);

    if (savedRestaurants.length === 0) return;

    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();

    savedRestaurants.forEach((restaurant) => {
      const position = { lat: restaurant.lat, lng: restaurant.lng };

      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: restaurant.name,
        animation: selectedRestaurant?.id === restaurant.id ? google.maps.Animation.BOUNCE : undefined,
      });

      // Add click listener
      marker.addListener('click', () => {
        onMarkerClick(restaurant);
      });

      markersRef.current.set(restaurant.id, marker);
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (savedRestaurants.length > 1) {
      mapInstanceRef.current.fitBounds(bounds);
    } else if (savedRestaurants.length === 1) {
      mapInstanceRef.current.setCenter({ lat: savedRestaurants[0].lat, lng: savedRestaurants[0].lng });
      mapInstanceRef.current.setZoom(15);
    }
  }, [restaurants, isLoaded, selectedRestaurant, onMarkerClick]);

  // Center map on selected restaurant or external location
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (centerLocation) {
      // External control (e.g., from search)
      mapInstanceRef.current.setCenter(centerLocation);
      mapInstanceRef.current.setZoom(centerZoom);
      return;
    }

    if (selectedRestaurant) {
      // Center on selected restaurant
      const position = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng };
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(16);

      // Highlight selected marker
      markersRef.current.forEach((marker, id) => {
        if (id === selectedRestaurant.id) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 2000);
        }
      });
    }
  }, [selectedRestaurant, centerLocation, centerZoom]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-text-secondary">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};


```

```typescriptreact
import React, { useEffect, useRef, useCallback } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { SavedRestaurant } from '../../types/savedRestaurants';

interface SavedRestaurantsMapProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  onMarkerClick: (restaurant: SavedRestaurant) => void;
  centerLocation?: { lat: number; lng: number } | null; // External control for map centering
  centerZoom?: number; // Zoom level when centering
}

export const SavedRestaurantsMap: React.FC<SavedRestaurantsMapProps> = ({
  restaurants,
  selectedRestaurant,
  onMarkerClick,
  centerLocation,
  centerZoom = 16,
}) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());
  const searchMarkerRef = useRef<google.maps.Marker | null>(null); // Marker for search results

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 12,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });
  }, [isLoaded]);

  // Update markers when restaurants change
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Create markers for saved restaurants only
    const savedRestaurants = restaurants.filter((r) => r.isSaved);

    if (savedRestaurants.length === 0) return;

    // Create bounds to fit all markers
    const bounds = new google.maps.LatLngBounds();

    savedRestaurants.forEach((restaurant) => {
      const position = { lat: restaurant.lat, lng: restaurant.lng };

      const marker = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: restaurant.name,
        animation: selectedRestaurant?.id === restaurant.id ? google.maps.Animation.BOUNCE : undefined,
      });

      // Add click listener
      marker.addListener('click', () => {
        onMarkerClick(restaurant);
      });

      markersRef.current.set(restaurant.id, marker);
      bounds.extend(position);
    });

    // Fit map to show all markers
    if (savedRestaurants.length > 1) {
      mapInstanceRef.current.fitBounds(bounds);
    } else if (savedRestaurants.length === 1) {
      mapInstanceRef.current.setCenter({ lat: savedRestaurants[0].lat, lng: savedRestaurants[0].lng });
      mapInstanceRef.current.setZoom(15);
    }
  }, [restaurants, isLoaded, selectedRestaurant, onMarkerClick]);

  // Center map on selected restaurant or external location
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    if (centerLocation) {
      // External control (e.g., from search)
      mapInstanceRef.current.setCenter(centerLocation);
      mapInstanceRef.current.setZoom(centerZoom);

      // Show a marker for search result if it's not a saved restaurant
      if (selectedRestaurant && !selectedRestaurant.isSaved) {
        // Remove previous search marker
        if (searchMarkerRef.current) {
          searchMarkerRef.current.setMap(null);
        }

        // Create new marker for search result
        searchMarkerRef.current = new google.maps.Marker({
          position: centerLocation,
          map: mapInstanceRef.current,
          title: selectedRestaurant.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#FF6B35',
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 2,
          },
          animation: google.maps.Animation.DROP,
        });
      } else {
        // Remove search marker if restaurant is saved (will be shown by regular marker)
        if (searchMarkerRef.current) {
          searchMarkerRef.current.setMap(null);
          searchMarkerRef.current = null;
        }
      }
      return;
    }

    if (selectedRestaurant) {
      // Center on selected restaurant
      const position = { lat: selectedRestaurant.lat, lng: selectedRestaurant.lng };
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(16);

      // Highlight selected marker
      markersRef.current.forEach((marker, id) => {
        if (id === selectedRestaurant.id) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 2000);
        }
      });

      // Remove search marker if restaurant is saved
      if (selectedRestaurant.isSaved && searchMarkerRef.current) {
        searchMarkerRef.current.setMap(null);
        searchMarkerRef.current = null;
      }
    }
  }, [selectedRestaurant, centerLocation, centerZoom, isLoaded]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-text-secondary">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};


```


檢查並確保所有功能正常運作：



修復列表點擊時也清除外部地圖中心：


```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300 flex flex-col">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchWithAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectPlace={handleSelectPlace}
              restaurants={restaurants}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
                centerLocation={mapCenter}
                centerZoom={mapZoom}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```


所有功能已修復並實作完成。以下是總結：

## 已創建/修改的文件列表

### 新創建的文件：

1. **`src/types/placeSearch.ts`** - PlaceSuggestion 類型定義
2. **`src/components/savedRestaurants/SearchWithAutocomplete.tsx`** - 帶自動完成功能的搜尋組件

### 修改的文件：

1. **`src/components/savedRestaurants/SavedRestaurantsMap.tsx`** - 添加了：
   - 外部控制地圖中心位置（`centerLocation` 和 `centerZoom` props）
   - 搜尋結果的臨時標記顯示
   - 改進了標記點擊處理

2. **`src/components/savedRestaurants/RestaurantDetailPanel.tsx`** - 更新了空狀態提示文字

3. **`src/pages/SavedRestaurantsPage.tsx`** - 添加了：
   - 搜尋自動完成整合
   - 地點選擇處理邏輯
   - 地圖中心控制狀態
   - 匹配現有餐廳或創建臨時餐廳的邏輯

## Bug 修復說明

### Bug 1: 點擊地圖標記更新右側邊欄

修復內容：
- 地圖標記點擊：每個標記都有 `onClick` 監聽器，調用 `onMarkerClick(restaurant)`
- 列表項點擊：點擊列表中的餐廳也會調用 `handleRestaurantClick(restaurant)`
- 狀態流：`handleMarkerClick` / `handleRestaurantClick` → `setSelectedRestaurant` → `RestaurantDetailPanel` 接收 `selectedRestaurant` prop → 顯示餐廳詳情

流程：
```
用戶點擊標記/列表項 
  → handleMarkerClick/handleRestaurantClick 
  → setSelectedRestaurant(restaurant) 
  → RestaurantDetailPanel 接收 restaurant prop 
  → 顯示餐廳名稱、地址、標籤、收藏/取消收藏按鈕
```

### Bug 2: 搜尋輸入像 Google Maps 一樣運作

實作內容：

1. 自動完成建議：
   - 使用 Google Places Autocomplete API
   - 同時顯示本地餐廳匹配結果（優先）
   - 輸入至少 2 個字符後顯示建議
   - 300ms 防抖處理

2. 建議下拉列表：
   - 顯示在搜尋輸入框下方
   - 每個建議顯示名稱和地址
   - 點擊建議或按 Enter 鍵選擇

3. 地圖響應：
   - 選擇建議後，地圖自動移動到該位置
   - 縮放級別設為 16
   - 如果是未保存的地點，顯示臨時標記（橙色圓點）

4. 餐廳匹配邏輯：
   - 如果選擇的地點匹配現有餐廳（按名稱、地址或 placeId），顯示該餐廳的詳情
   - 如果不匹配，創建臨時 `SavedRestaurant` 對象（`isSaved: false`）
   - 右側邊欄顯示詳情，允許選擇風格/類別並收藏

## 使用的 API 和服務

### Google Maps JavaScript API

使用的服務：
1. Places Autocomplete Service (`google.maps.places.AutocompleteService`)
   - 方法：`getPlacePredictions()`
   - 用途：提供地點搜尋建議

2. Places Service (`google.maps.places.PlacesService`)
   - 方法：`getDetails()`
   - 用途：獲取地點的完整資訊（座標、地址等）

3. Maps JavaScript API
   - 用於顯示地圖和標記
   - 地圖移動和縮放控制

## 需要的環境變數

在 `.env` 或 `.env.local` 文件中需要設定：

```env
REACT_APP_GOOGLE_MAPS_API_KEY=你的_Google_Maps_API_Key
```

## 需要在 Google Cloud Console 啟用的 API

在 [Google Cloud Console](https://console.cloud.google.com/) 中需要啟用：

1. Maps JavaScript API
2. Places API（Places Library 需要）
3. Geocoding API（可選，用於反向地理編碼）

## 功能流程說明

### 標記點擊 → 右側邊欄詳情流程：

1. 用戶點擊地圖上的標記
2. 標記的 `click` 事件觸發 → 調用 `onMarkerClick(restaurant)`
3. `handleMarkerClick` 設置 `selectedRestaurant = restaurant`
4. `RestaurantDetailPanel` 接收 `restaurant` prop
5. 如果 `restaurant.isSaved === true`：顯示餐廳詳情 + 「取消收藏」按鈕
6. 如果 `restaurant.isSaved === false`：顯示餐廳詳情 + 風格/類別選擇器 + 「收藏」按鈕

### 搜尋自動完成和地圖移動流程：

1. 用戶在搜尋框輸入（至少 2 個字符）
2. 300ms 防抖後調用 Google Places Autocomplete API
3. 顯示建議下拉列表（本地餐廳 + Google Places 結果）
4. 用戶點擊建議或按 Enter
5. 如果建議有座標，直接使用；否則調用 `PlacesService.getDetails()` 獲取座標
6. `handleSelectPlace` 被調用：
   - 嘗試匹配現有餐廳
   - 如果匹配：設置 `selectedRestaurant` 為該餐廳
   - 如果不匹配：創建臨時餐廳對象（`isSaved: false`）
7. 設置 `mapCenter` 和 `mapZoom` → 地圖移動到該位置
8. 右側邊欄顯示餐廳詳情（已保存或未保存狀態）

## 設計特點

- 重用現有組件：使用了 `useGoogleMaps` hook 和現有的地圖服務
- 雙重搜尋：本地餐廳匹配 + Google Places API
- 智能匹配：自動匹配現有餐廳或創建臨時對象
- 響應式設計：建議下拉列表適配不同螢幕尺寸
- 用戶體驗：防抖、載入狀態、鍵盤導航支持

所有功能已實作並通過 lint 檢查。可以啟動開發服務器測試修復後的功能。

```plaintext
用戶點擊標記/列表項 
  → handleMarkerClick/handleRestaurantClick 
  → setSelectedRestaurant(restaurant) 
  → RestaurantDetailPanel 接收 restaurant prop 
  → 顯示餐廳名稱、地址、標籤、收藏/取消收藏按鈕
```

```plaintext
REACT_APP_GOOGLE_MAPS_API_KEY=你的_Google_Maps_API_Key
```

---

**User**

You are a senior frontend engineer working on our restaurant-sharing web app (React + TypeScript + Tailwind or our existing UI system).

The project is frontend-only (mock data + local state), but we already have a 收藏餐廳 (Saved Restaurants) page with:



Left sidebar: list of saved restaurants.



Center: map + search input.



Right sidebar: restaurant detail panel.



Now we need to fix bugs and upgrade the search behavior so it behaves more like Google Maps.



Context (what should exist already)



On the 收藏餐廳 page we already have:



A map component (showing saved restaurant markers).



A left sidebar that lists saved restaurants.



A right sidebar that should display details for the “selected” restaurant.



A search input above the map.



Please find the existing components, something like:



SavedRestaurantsPage (page container)



SavedRestaurantsMap (map component)



SavedRestaurantsSidebarLeft



SavedRestaurantsSidebarRight (detail panel)



Shared state for selectedRestaurant and savedRestaurants.



Try to reuse the existing structure and state instead of rewriting from scratch.



Bug 1: Clicking a map marker should update the right sidebar



Current problem:



When I click a marker / place on the map, the right sidebar is empty (no restaurant info), instead of showing details like Google Maps.



Desired behavior:



Clicking a marker on the map must:



Set a selectedRestaurant in shared state (or context).



Cause the right sidebar to render that restaurant’s information:



Name



Address



Styles / Categories



Other fields we already have



“收藏” / “取消收藏” button as previously designed.



Implementation details:



Inspect the map component:



Ensure each marker has an onClick handler.



That handler should call something like onSelectRestaurant(restaurant) passed from the parent.



If we are only passing coordinates, connect them back to a restaurant object (e.g., by id).



Inspect the right sidebar component:



It should accept a selectedRestaurant (prop or context).



When selectedRestaurant is null, show a simple placeholder text (e.g., “請選擇地圖上的餐廳或左側列表中的餐廳”).



When it is not null, render the full restaurant detail UI including:



Save / Unsave behavior (respecting isSaved).



Make sure the left sidebar list uses the same onSelectRestaurant flow:



Clicking a restaurant in the list should select it in the same way as a map marker click.



Keep all save/unsave logic frontend-only using local state for now.



Bug 2: Search input should behave like Google Maps



Current problems:



Typing in the search box:



Does not show any suggestion list under the input.



After entering a full restaurant name and confirming search:



The map does nothing (no panning / zooming / marker).



Desired behavior (similar to Google Maps):



When the user types in the search box:



Show a dropdown list of suggestions under the input:



Suggestions can be:



Real Places / addresses using the underlying map provider (preferred), OR



At minimum, autocomplete results from our local restaurant list.



Selecting a suggestion from the dropdown should:



Fill the search input.



Trigger a search/selection.



When the user confirms a search (press Enter or selects a suggestion):



The map should respond:



Center/pan to the selected place’s coordinates.



Adjust zoom appropriately.



Show a marker at that place.



The right sidebar should display details for that place:



If this place matches one of our saved restaurants:



Treat it as that restaurant (show saved info + 取消收藏).



If it is not currently saved:



Allow style/category selection + 收藏 button, as we previously designed.



Implementation details:



Detect which map / place API we are using now:



If using Google Maps via @react-google-maps/api or similar:



Use Places Autocomplete / AutocompleteService plus Places Details or Geocoding.



If using Mapbox or another provider:



Use their geocoding / search API.



Implement search state:



query: string



suggestions: PlaceSuggestion[] (type with at least id, label, lat, lng).



selectedSuggestion: PlaceSuggestion | null



On input change:



Debounce calls to the Places / Geocoding API.



Update suggestions state.



Render suggestions in a dropdown under the input (clickable list items).



On suggestion click or Enter key:



Set selectedSuggestion.



Pan/zoom the map to lat/lng.



If suggestion corresponds to an existing restaurant (match by place_id, name, or other key):



Set selectedRestaurant to that restaurant.



Otherwise:



Create a temporary “unsaved” restaurant-like object for the detail panel (with name/address from the place result).



In the right sidebar, show controls for choosing Styles / Categories and a 收藏 button that converts it into a saved restaurant.



Keep API keys and endpoints external:



Add configuration for the API key via .env (e.g. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).



Do not hardcode secrets.



At the end, when you respond, clearly tell me:



Which external API(s) you used (e.g., Google Maps Places API, Mapbox Geocoding API, etc.).



Which new environment variables I need to set.



Which services or APIs I must enable in the console (e.g., enable Places API + Geocoding API in Google Cloud).



Structure & quality



Keep changes localized to the 收藏餐廳 page and related components as much as possible.



Use TypeScript types for:



Restaurant



PlaceSuggestion



Maintain consistent styling with our existing design (Tailwind / UI components).



Ensure the app compiles with no TypeScript errors.



Tasks for you (Cursor)



Locate the 收藏餐廳 page components and the map/search/detail wiring.



Fix Bug 1 so clicking markers and list items correctly updates the right sidebar with restaurant details.



Implement Bug 2:



Autocomplete suggestions under the search input.



Map panning/zooming + marker placement on search/selection.



Right sidebar information display for both saved and unsaved places.



Keep state management in React (local or context) and mock data; do not add real backend calls.



When done, output:



The list of files created/modified.



A short explanation of:



How marker click → selectedRestaurant → right sidebar detail flow works now.



How the search autocomplete and map centering are implemented.



Which external map/places APIs and environment variables I need to configure.



你說：

現在收藏餐廳頁面還有幾個要修改的部分:

1. left side bar 和 right side bar應該都要有自己的上下滑動的滾輪，不會跟著整個頁面的上下滑動而滑動。

2. left side bar上面選風格和類別的標籤選項應該要能收起來，現在這樣太佔空間了。

***請將上述我的要求生成給cursor的prompt***

ChatGPT 說：

已思考 13s



下面是可以直接貼給 Cursor 的 prompt：



You are a senior frontend engineer working on our restaurant-sharing web app (React + TypeScript + Tailwind or our existing UI system).

We already have a “收藏餐廳 (Saved Restaurants)” page with:



Left sidebar: saved restaurant list + filters



Center: map + search bar



Right sidebar: restaurant detail panel



Now we need to improve the layout and UX of this page.



1. Independent scrolling for left/right sidebars



Current problem:



When the main page scrolls up/down, the left sidebar and right sidebar move together with the whole page.



We want each sidebar to have its own vertical scroll bar, similar to a typical 3-column dashboard.



Desired behavior:



On desktop / normal widths:



The 收藏餐廳 page should behave like a full-height, 3-column layout:



Left column: filters + restaurant list



Center column: search bar + map



Right column: restaurant detail



The whole 3-column container should fill the viewport height (minus any fixed header if we have one).



The left sidebar and right sidebar should each:



Stay visually fixed in place.



Have overflow-y: auto so they scroll independently within their own column.



Scrolling the browser window should not be required to see the contents of these sidebars; instead, you scroll inside each sidebar.



Implementation tips:



Use a flex or grid layout for the main content area, something like:



className="flex h-[calc(100vh-HEADER_HEIGHT)]" or similar.



For each sidebar:



Make sure they have a fixed or min-height: 100% and overflow-y-auto.



Keep responsive behavior:



On mobile / very narrow screens, it’s fine if the layout falls back to stacking and shares the main scroll, but desktop should clearly have independent scroll for left and right panels.



Please update the existing 收藏餐廳 page layout and related components accordingly, without breaking the existing map and detail behaviors.



2. Collapsible filters (style & category tags) in the left sidebar



Current problem:



At the top of the left sidebar, the filter section for 風格 (styles) and 類別 (categories) shows all tag options.



This takes up too much vertical space; the user has to scroll a lot to see the restaurant list.



Desired behavior:



The filter section (style & category tag controls) should be collapsible / expandable.



Default behavior can be:



Either expanded by default or collapsed by default — choose what feels best, but it must be easy to toggle.



There should be a small header / bar at the top of the left sidebar, e.g.:



Title: 篩選條件 Filters



A chevron icon or “收起 / 展開” label.



When the user clicks the header:



Toggle the visibility of the detailed filter controls (the style & category tag chips).



When the filter section is collapsed:



Only the header row is visible, leaving more space for the restaurant list.



Filters that are already applied should still remain active.



Optionally show a small indicator like 已選擇 X 個條件 (e.g., “3 filters applied”), but this is optional.



Implementation details:



Introduce a piece of state in the left sidebar component, e.g.:



const [filtersOpen, setFiltersOpen] = useState(true);



Wrap the style & category tag components inside a container that is only rendered when filtersOpen is true.



Do not change the existing filter logic; only control visibility of the UI section.



Make sure the left sidebar’s scroll behavior (from item 1) still works when filters are expanded or collapsed.



3. Tasks for you (Cursor)



Locate the 收藏餐廳 page and its layout components:



Main layout container for left / center / right.



Left sidebar component (filters + list).



Right sidebar detail component.



Update the layout so that:



The main content area is full height of the viewport (minus header if needed).



Left and right sidebars each have their own vertical scrollbars (overflow-y-auto), independent from the main page scroll.



Implement a collapsible filter section at the top of the left sidebar:



Toggle button / header to expand/collapse.



Hide/show the style & category tag controls without changing filter functionality.



Keep everything in TypeScript and aligned with our current styling conventions (Tailwind / design system).



When you’re done, output:



The list of files you created or modified.



A short explanation of:



How the new scrolling behavior is implemented.



How the filter collapse/expand state works and how to adjust the default state (open vs closed).

---

**Cursor**


檢查現有代碼結構，生成給 Cursor 的 prompt：



以下是可直接貼給 Cursor 的 prompt：

---

You are a senior frontend engineer working on our restaurant-sharing web app (React + TypeScript + Tailwind or our existing UI system).

We already have a "收藏餐廳 (Saved Restaurants)" page with:

- Left sidebar: saved restaurant list + filters
- Center: map + search bar
- Right sidebar: restaurant detail panel

Now we need to improve the layout and UX of this page.

## 1. Independent scrolling for left/right sidebars

**Current problem:**

When the main page scrolls up/down, the left sidebar and right sidebar move together with the whole page.

We want each sidebar to have its own vertical scroll bar, similar to a typical 3-column dashboard.

**Desired behavior:**

On desktop / normal widths:

The 收藏餐廳 page should behave like a full-height, 3-column layout:
- Left column: filters + restaurant list
- Center column: search bar + map
- Right column: restaurant detail

The whole 3-column container should fill the viewport height (minus any fixed header if we have one).

The left sidebar and right sidebar should each:
- Stay visually fixed in place
- Have `overflow-y: auto` so they scroll independently within their own column
- Scrolling the browser window should not be required to see the contents of these sidebars; instead, you scroll inside each sidebar

**Implementation tips:**

- Use a flex or grid layout for the main content area, something like:
  - `className="flex h-[calc(100vh-HEADER_HEIGHT)]"` or similar
- For each sidebar:
  - Make sure they have a fixed or `min-height: 100%` and `overflow-y-auto`
- Keep responsive behavior:
  - On mobile / very narrow screens, it's fine if the layout falls back to stacking and shares the main scroll, but desktop should clearly have independent scroll for left and right panels

Please update the existing 收藏餐廳 page layout and related components accordingly, without breaking the existing map and detail behaviors.

## 2. Collapsible filters (style & category tags) in the left sidebar

**Current problem:**

At the top of the left sidebar, the filter section for 風格 (styles) and 類別 (categories) shows all tag options.

This takes up too much vertical space; the user has to scroll a lot to see the restaurant list.

**Desired behavior:**

The filter section (style & category tag controls) should be collapsible / expandable.

Default behavior can be:
- Either expanded by default or collapsed by default — choose what feels best, but it must be easy to toggle

There should be a small header / bar at the top of the left sidebar, e.g.:
- Title: "篩選條件 Filters"
- A chevron icon or "收起 / 展開" label

When the user clicks the header:
- Toggle the visibility of the detailed filter controls (the style & category tag chips)

When the filter section is collapsed:
- Only the header row is visible, leaving more space for the restaurant list
- Filters that are already applied should still remain active

Optionally show a small indicator like "已選擇 X 個條件" (e.g., "3 filters applied"), but this is optional.

**Implementation details:**

- Introduce a piece of state in the left sidebar component, e.g.:
  ```typescript
  const [filtersOpen, setFiltersOpen] = useState(true);
  ```
- Wrap the style & category tag components inside a container that is only rendered when `filtersOpen` is true
- Do not change the existing filter logic; only control visibility of the UI section
- Make sure the left sidebar's scroll behavior (from item 1) still works when filters are expanded or collapsed

## 3. Tasks for you (Cursor)

Locate the 收藏餐廳 page and its layout components:
- Main layout container for left / center / right
- Left sidebar component (filters + list)
- Right sidebar detail component

Update the layout so that:
- The main content area is full height of the viewport (minus header if needed)
- Left and right sidebars each have their own vertical scrollbars (`overflow-y-auto`), independent from the main page scroll

Implement a collapsible filter section at the top of the left sidebar:
- Toggle button / header to expand/collapse
- Hide/show the style & category tag controls without changing filter functionality

Keep everything in TypeScript and aligned with our current styling conventions (Tailwind / design system).

When you're done, output:
- The list of files you created or modified
- A short explanation of:
  - How the new scrolling behavior is implemented
  - How the filter collapse/expand state works and how to adjust the default state (open vs closed)

---

此 prompt 可直接貼給 Cursor。

```typescript
  const [filtersOpen, setFiltersOpen] = useState(true);
```

---

**User**

You are a senior frontend engineer working on our restaurant-sharing web app (React + TypeScript + Tailwind or our existing UI system).

We already have a “收藏餐廳 (Saved Restaurants)” page with:



Left sidebar: saved restaurant list + filters



Center: map + search bar



Right sidebar: restaurant detail panel



Now we need to improve the layout and UX of this page.



1. Independent scrolling for left/right sidebars



Current problem:



When the main page scrolls up/down, the left sidebar and right sidebar move together with the whole page.



We want each sidebar to have its own vertical scroll bar, similar to a typical 3-column dashboard.



Desired behavior:



On desktop / normal widths:



The 收藏餐廳 page should behave like a full-height, 3-column layout:



Left column: filters + restaurant list



Center column: search bar + map



Right column: restaurant detail



The whole 3-column container should fill the viewport height (minus any fixed header if we have one).



The left sidebar and right sidebar should each:



Stay visually fixed in place.



Have overflow-y: auto so they scroll independently within their own column.



Scrolling the browser window should not be required to see the contents of these sidebars; instead, you scroll inside each sidebar.



Implementation tips:



Use a flex or grid layout for the main content area, something like:



className="flex h-[calc(100vh-HEADER_HEIGHT)]" or similar.



For each sidebar:



Make sure they have a fixed or min-height: 100% and overflow-y-auto.



Keep responsive behavior:



On mobile / very narrow screens, it’s fine if the layout falls back to stacking and shares the main scroll, but desktop should clearly have independent scroll for left and right panels.



Please update the existing 收藏餐廳 page layout and related components accordingly, without breaking the existing map and detail behaviors.



2. Collapsible filters (style & category tags) in the left sidebar



Current problem:



At the top of the left sidebar, the filter section for 風格 (styles) and 類別 (categories) shows all tag options.



This takes up too much vertical space; the user has to scroll a lot to see the restaurant list.



Desired behavior:



The filter section (style & category tag controls) should be collapsible / expandable.



Default behavior can be:



Either expanded by default or collapsed by default — choose what feels best, but it must be easy to toggle.



There should be a small header / bar at the top of the left sidebar, e.g.:



Title: 篩選條件 Filters



A chevron icon or “收起 / 展開” label.



When the user clicks the header:



Toggle the visibility of the detailed filter controls (the style & category tag chips).



When the filter section is collapsed:



Only the header row is visible, leaving more space for the restaurant list.



Filters that are already applied should still remain active.



Optionally show a small indicator like 已選擇 X 個條件 (e.g., “3 filters applied”), but this is optional.



Implementation details:



Introduce a piece of state in the left sidebar component, e.g.:



const [filtersOpen, setFiltersOpen] = useState(true);



Wrap the style & category tag components inside a container that is only rendered when filtersOpen is true.



Do not change the existing filter logic; only control visibility of the UI section.



Make sure the left sidebar’s scroll behavior (from item 1) still works when filters are expanded or collapsed.



3. Tasks for you (Cursor)



Locate the 收藏餐廳 page and its layout components:



Main layout container for left / center / right.



Left sidebar component (filters + list).



Right sidebar detail component.



Update the layout so that:



The main content area is full height of the viewport (minus header if needed).



Left and right sidebars each have their own vertical scrollbars (overflow-y-auto), independent from the main page scroll.



Implement a collapsible filter section at the top of the left sidebar:



Toggle button / header to expand/collapse.



Hide/show the style & category tag controls without changing filter functionality.



Keep everything in TypeScript and aligned with our current styling conventions (Tailwind / design system).



When you’re done, output:



The list of files you created or modified.



A short explanation of:



How the new scrolling behavior is implemented.



How the filter collapse/expand state works and how to adjust the default state (open vs closed).

---

**Cursor**


檢查現有代碼結構，準備實作這兩個改進：



開始實作這兩個改進：


```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-bg-primary transition-colors duration-300 flex flex-col overflow-hidden">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4 flex-shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content - Full height with independent scrolling for sidebars */}
      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px - 73px)' }}>
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchWithAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectPlace={handleSelectPlace}
              restaurants={restaurants}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
                centerLocation={mapCenter}
                centerZoom={mapZoom}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-bg-primary transition-colors duration-300 flex flex-col overflow-hidden">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4 flex-shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content - Full height with independent scrolling for sidebars */}
      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px - 73px)' }}>
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0 h-full overflow-hidden">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchWithAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectPlace={handleSelectPlace}
              restaurants={restaurants}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
                centerLocation={mapCenter}
                centerZoom={mapZoom}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-bg-primary transition-colors duration-300 flex flex-col overflow-hidden">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4 flex-shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content - Full height with independent scrolling for sidebars */}
      <div className="flex-1 flex overflow-hidden" style={{ height: 'calc(100vh - 64px - 73px)' }}>
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0 h-full overflow-hidden">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchWithAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectPlace={handleSelectPlace}
              restaurants={restaurants}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
                centerLocation={mapCenter}
                centerZoom={mapZoom}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0 h-full overflow-hidden">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface SavedRestaurantsListProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  selectedStyles: string[];
  selectedCategories: string[];
  onRestaurantClick: (restaurant: SavedRestaurant) => void;
  onStyleToggle: (style: string) => void;
  onCategoryToggle: (category: string) => void;
}

export const SavedRestaurantsList: React.FC<SavedRestaurantsListProps> = ({
  restaurants,
  selectedRestaurant,
  selectedStyles,
  selectedCategories,
  onRestaurantClick,
  onStyleToggle,
  onCategoryToggle,
}) => {
  // Filter restaurants based on selected styles and categories
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Only show saved restaurants in the list
    if (!restaurant.isSaved) return false;

    // Filter by styles
    if (selectedStyles.length > 0) {
      const hasMatchingStyle = restaurant.styles.some((style) => selectedStyles.includes(style));
      if (!hasMatchingStyle) return false;
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = restaurant.categories.some((category) => selectedCategories.includes(category));
      if (!hasMatchingCategory) return false;
    }

    return true;
  });

  return (
    <div className="h-full flex flex-col bg-bg-tertiary border-r border-border-color">
      {/* Filters Section */}
      <div className="p-4 border-b border-border-color">
        {/* Style Filter */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((style) => {
              const isSelected = selectedStyles.includes(style.label);
              return (
                <button
                  key={style.id}
                  onClick={() => onStyleToggle(style.label)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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

        {/* Category Filter */}
        <div>
          <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((category) => {
              const isSelected = selectedCategories.includes(category.label);
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryToggle(category.label)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        {filteredRestaurants.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-text-secondary text-sm">沒有找到餐廳</p>
          </div>
        ) : (
          <div className="divide-y divide-border-color">
            {filteredRestaurants.map((restaurant) => {
              const isSelected = selectedRestaurant?.id === restaurant.id;
              return (
                <button
                  key={restaurant.id}
                  onClick={() => onRestaurantClick(restaurant)}
                  className={`w-full text-left p-4 hover:bg-bg-hover transition-colors ${
                    isSelected ? 'bg-bg-card border-l-4 border-accent-primary' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Restaurant Icon */}
                    <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center flex-shrink-0">
                      <span className="text-text-primary text-lg">🍽️</span>
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary text-sm mb-1 truncate">{restaurant.name}</h4>
                      <p className="text-text-secondary text-xs mb-2 line-clamp-1">{restaurant.address}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {restaurant.styles.slice(0, 2).map((style, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {style}
                          </span>
                        ))}
                        {restaurant.categories.slice(0, 1).map((category, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


```

```typescriptreact
import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface SavedRestaurantsListProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  selectedStyles: string[];
  selectedCategories: string[];
  onRestaurantClick: (restaurant: SavedRestaurant) => void;
  onStyleToggle: (style: string) => void;
  onCategoryToggle: (category: string) => void;
}

export const SavedRestaurantsList: React.FC<SavedRestaurantsListProps> = ({
  restaurants,
  selectedRestaurant,
  selectedStyles,
  selectedCategories,
  onRestaurantClick,
  onStyleToggle,
  onCategoryToggle,
}) => {
  // Collapsible filter state
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Count active filters
  const activeFilterCount = selectedStyles.length + selectedCategories.length;

  // Filter restaurants based on selected styles and categories
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Only show saved restaurants in the list
    if (!restaurant.isSaved) return false;

    // Filter by styles
    if (selectedStyles.length > 0) {
      const hasMatchingStyle = restaurant.styles.some((style) => selectedStyles.includes(style));
      if (!hasMatchingStyle) return false;
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = restaurant.categories.some((category) => selectedCategories.includes(category));
      if (!hasMatchingCategory) return false;
    }

    return true;
  });

  return (
    <div className="h-full flex flex-col bg-bg-tertiary border-r border-border-color">
      {/* Filters Section */}
      <div className="p-4 border-b border-border-color">
        {/* Style Filter */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((style) => {
              const isSelected = selectedStyles.includes(style.label);
              return (
                <button
                  key={style.id}
                  onClick={() => onStyleToggle(style.label)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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

        {/* Category Filter */}
        <div>
          <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((category) => {
              const isSelected = selectedCategories.includes(category.label);
              return (
                <button
                  key={category.id}
                  onClick={() => onCategoryToggle(category.label)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        {filteredRestaurants.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-text-secondary text-sm">沒有找到餐廳</p>
          </div>
        ) : (
          <div className="divide-y divide-border-color">
            {filteredRestaurants.map((restaurant) => {
              const isSelected = selectedRestaurant?.id === restaurant.id;
              return (
                <button
                  key={restaurant.id}
                  onClick={() => onRestaurantClick(restaurant)}
                  className={`w-full text-left p-4 hover:bg-bg-hover transition-colors ${
                    isSelected ? 'bg-bg-card border-l-4 border-accent-primary' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Restaurant Icon */}
                    <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center flex-shrink-0">
                      <span className="text-text-primary text-lg">🍽️</span>
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary text-sm mb-1 truncate">{restaurant.name}</h4>
                      <p className="text-text-secondary text-xs mb-2 line-clamp-1">{restaurant.address}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {restaurant.styles.slice(0, 2).map((style, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {style}
                          </span>
                        ))}
                        {restaurant.categories.slice(0, 1).map((category, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


```

```typescriptreact
import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface SavedRestaurantsListProps {
  restaurants: SavedRestaurant[];
  selectedRestaurant: SavedRestaurant | null;
  selectedStyles: string[];
  selectedCategories: string[];
  onRestaurantClick: (restaurant: SavedRestaurant) => void;
  onStyleToggle: (style: string) => void;
  onCategoryToggle: (category: string) => void;
}

export const SavedRestaurantsList: React.FC<SavedRestaurantsListProps> = ({
  restaurants,
  selectedRestaurant,
  selectedStyles,
  selectedCategories,
  onRestaurantClick,
  onStyleToggle,
  onCategoryToggle,
}) => {
  // Collapsible filter state
  const [filtersOpen, setFiltersOpen] = useState(true);

  // Count active filters
  const activeFilterCount = selectedStyles.length + selectedCategories.length;

  // Filter restaurants based on selected styles and categories
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Only show saved restaurants in the list
    if (!restaurant.isSaved) return false;

    // Filter by styles
    if (selectedStyles.length > 0) {
      const hasMatchingStyle = restaurant.styles.some((style) => selectedStyles.includes(style));
      if (!hasMatchingStyle) return false;
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = restaurant.categories.some((category) => selectedCategories.includes(category));
      if (!hasMatchingCategory) return false;
    }

    return true;
  });

  return (
    <div className="h-full flex flex-col bg-bg-tertiary border-r border-border-color overflow-hidden">
      {/* Filters Section Header */}
      <div className="flex-shrink-0 border-b border-border-color">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-bg-hover transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">篩選條件 Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-accent-primary text-white text-xs font-medium">
                {activeFilterCount}
              </span>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-text-secondary transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Collapsible Filters Content */}
        {filtersOpen && (
          <div className="p-4 border-t border-border-color">
            {/* Style Filter */}
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
              <div className="flex flex-wrap gap-2">
                {STYLE_OPTIONS.map((style) => {
                  const isSelected = selectedStyles.includes(style.label);
                  return (
                    <button
                      key={style.id}
                      onClick={() => onStyleToggle(style.label)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((category) => {
                  const isSelected = selectedCategories.includes(category.label);
                  return (
                    <button
                      key={category.id}
                      onClick={() => onCategoryToggle(category.label)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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
          </div>
        )}
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        {filteredRestaurants.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-text-secondary text-sm">沒有找到餐廳</p>
          </div>
        ) : (
          <div className="divide-y divide-border-color">
            {filteredRestaurants.map((restaurant) => {
              const isSelected = selectedRestaurant?.id === restaurant.id;
              return (
                <button
                  key={restaurant.id}
                  onClick={() => onRestaurantClick(restaurant)}
                  className={`w-full text-left p-4 hover:bg-bg-hover transition-colors ${
                    isSelected ? 'bg-bg-card border-l-4 border-accent-primary' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Restaurant Icon */}
                    <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center flex-shrink-0">
                      <span className="text-text-primary text-lg">🍽️</span>
                    </div>

                    {/* Restaurant Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary text-sm mb-1 truncate">{restaurant.name}</h4>
                      <p className="text-text-secondary text-xs mb-2 line-clamp-1">{restaurant.address}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {restaurant.styles.slice(0, 2).map((style, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {style}
                          </span>
                        ))}
                        {restaurant.categories.slice(0, 1).map((category, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white border border-gray-200 text-xs text-text-secondary">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};


```


確保 RestaurantDetailPanel 也有獨立滾動：


```typescriptreact
import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface RestaurantDetailPanelProps {
  restaurant: SavedRestaurant | null;
  onSave: (restaurant: SavedRestaurant, styles: string[], categories: string[]) => void;
  onUnsave: (restaurant: SavedRestaurant) => void;
}

export const RestaurantDetailPanel: React.FC<RestaurantDetailPanelProps> = ({
  restaurant,
  onSave,
  onUnsave,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Update selected tags when restaurant changes
  React.useEffect(() => {
    if (restaurant) {
      if (restaurant.isSaved) {
        // If already saved, use existing tags
        setSelectedStyles(restaurant.styles);
        setSelectedCategories(restaurant.categories);
      } else {
        // If not saved, start with empty selection
        setSelectedStyles([]);
        setSelectedCategories([]);
      }
    }
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="h-full flex items-center justify-center bg-bg-card border-l border-border-color">
        <p className="text-text-secondary text-center px-4">請選擇地圖上的餐廳或左側列表中的餐廳</p>
      </div>
    );
  }

  const toggleStyle = (styleLabel: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleLabel) ? prev.filter((s) => s !== styleLabel) : [...prev, styleLabel]
    );
  };

  const toggleCategory = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel) ? prev.filter((c) => c !== categoryLabel) : [...prev, categoryLabel]
    );
  };

  const handleSave = () => {
    if (selectedStyles.length === 0 || selectedCategories.length === 0) {
      alert('請至少選擇一個風格和一個類別');
      return;
    }
    onSave(restaurant, selectedStyles, selectedCategories);
  };

  const handleUnsave = () => {
    if (window.confirm('確定要取消收藏這個餐廳嗎？')) {
      onUnsave(restaurant);
    }
  };

  return (
    <div className="h-full flex flex-col bg-bg-card border-l border-border-color overflow-hidden">
      <div className="p-6">
        {/* Restaurant Name */}
        <h2 className="text-2xl font-bold text-text-primary mb-2">{restaurant.name}</h2>

        {/* Address */}
        <div className="mb-4">
          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-secondary mt-0.5 flex-shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="text-text-secondary text-sm">{restaurant.address}</p>
          </div>
        </div>

        {/* Rating & Price */}
        {(restaurant.rating || restaurant.priceLevel) && (
          <div className="flex items-center gap-4 mb-4">
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-text-primary font-semibold">{restaurant.rating.toFixed(1)}</span>
              </div>
            )}
            {restaurant.priceLevel && (
              <span className="text-text-secondary text-sm">{restaurant.priceLevel}</span>
            )}
          </div>
        )}

        {/* Existing Tags (if saved) */}
        {restaurant.isSaved && (
          <div className="mb-6">
            {restaurant.styles.length > 0 && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.styles.map((style, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {restaurant.categories.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tag Selection (if not saved) */}
        {!restaurant.isSaved && (
          <div className="mb-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">選擇風格 Styles</h3>
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

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">選擇類別 Categories</h3>
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
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-border-color">
          {restaurant.isSaved ? (
            <button
              onClick={handleUnsave}
              className="w-full px-4 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            >
              取消收藏
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={selectedStyles.length === 0 || selectedCategories.length === 0}
              className="w-full px-4 py-2.5 rounded-full bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              收藏
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


```

```typescriptreact
import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface RestaurantDetailPanelProps {
  restaurant: SavedRestaurant | null;
  onSave: (restaurant: SavedRestaurant, styles: string[], categories: string[]) => void;
  onUnsave: (restaurant: SavedRestaurant) => void;
}

export const RestaurantDetailPanel: React.FC<RestaurantDetailPanelProps> = ({
  restaurant,
  onSave,
  onUnsave,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Update selected tags when restaurant changes
  React.useEffect(() => {
    if (restaurant) {
      if (restaurant.isSaved) {
        // If already saved, use existing tags
        setSelectedStyles(restaurant.styles);
        setSelectedCategories(restaurant.categories);
      } else {
        // If not saved, start with empty selection
        setSelectedStyles([]);
        setSelectedCategories([]);
      }
    }
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="h-full flex items-center justify-center bg-bg-card border-l border-border-color">
        <p className="text-text-secondary text-center px-4">請選擇地圖上的餐廳或左側列表中的餐廳</p>
      </div>
    );
  }

  const toggleStyle = (styleLabel: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleLabel) ? prev.filter((s) => s !== styleLabel) : [...prev, styleLabel]
    );
  };

  const toggleCategory = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel) ? prev.filter((c) => c !== categoryLabel) : [...prev, categoryLabel]
    );
  };

  const handleSave = () => {
    if (selectedStyles.length === 0 || selectedCategories.length === 0) {
      alert('請至少選擇一個風格和一個類別');
      return;
    }
    onSave(restaurant, selectedStyles, selectedCategories);
  };

  const handleUnsave = () => {
    if (window.confirm('確定要取消收藏這個餐廳嗎？')) {
      onUnsave(restaurant);
    }
  };

  return (
    <div className="h-full flex flex-col bg-bg-card border-l border-border-color overflow-hidden">
      <div className="p-6 overflow-y-auto scrollbar-hidden flex-1">
        {/* Restaurant Name */}
        <h2 className="text-2xl font-bold text-text-primary mb-2">{restaurant.name}</h2>

        {/* Address */}
        <div className="mb-4">
          <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-secondary mt-0.5 flex-shrink-0"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <p className="text-text-secondary text-sm">{restaurant.address}</p>
          </div>
        </div>

        {/* Rating & Price */}
        {(restaurant.rating || restaurant.priceLevel) && (
          <div className="flex items-center gap-4 mb-4">
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-text-primary font-semibold">{restaurant.rating.toFixed(1)}</span>
              </div>
            )}
            {restaurant.priceLevel && (
              <span className="text-text-secondary text-sm">{restaurant.priceLevel}</span>
            )}
          </div>
        )}

        {/* Existing Tags (if saved) */}
        {restaurant.isSaved && (
          <div className="mb-6">
            {restaurant.styles.length > 0 && (
              <div className="mb-3">
                <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.styles.map((style, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {restaurant.categories.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {restaurant.categories.map((category, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tag Selection (if not saved) */}
        {!restaurant.isSaved && (
          <div className="mb-6">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-text-primary mb-3">選擇風格 Styles</h3>
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

            <div>
              <h3 className="text-sm font-semibold text-text-primary mb-3">選擇類別 Categories</h3>
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
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-4 border-t border-border-color">
          {restaurant.isSaved ? (
            <button
              onClick={handleUnsave}
              className="w-full px-4 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
            >
              取消收藏
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={selectedStyles.length === 0 || selectedCategories.length === 0}
              className="w-full px-4 py-2.5 rounded-full bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              收藏
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


```


修復 RestaurantDetailPanel 的布局，確保按鈕固定在底部：


```typescriptreact
import React, { useState } from 'react';
import { SavedRestaurant } from '../../types/savedRestaurants';
import { STYLE_OPTIONS, CATEGORY_OPTIONS } from '../../utils/tagOptions';

interface RestaurantDetailPanelProps {
  restaurant: SavedRestaurant | null;
  onSave: (restaurant: SavedRestaurant, styles: string[], categories: string[]) => void;
  onUnsave: (restaurant: SavedRestaurant) => void;
}

export const RestaurantDetailPanel: React.FC<RestaurantDetailPanelProps> = ({
  restaurant,
  onSave,
  onUnsave,
}) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Update selected tags when restaurant changes
  React.useEffect(() => {
    if (restaurant) {
      if (restaurant.isSaved) {
        // If already saved, use existing tags
        setSelectedStyles(restaurant.styles);
        setSelectedCategories(restaurant.categories);
      } else {
        // If not saved, start with empty selection
        setSelectedStyles([]);
        setSelectedCategories([]);
      }
    }
  }, [restaurant]);

  if (!restaurant) {
    return (
      <div className="h-full flex items-center justify-center bg-bg-card border-l border-border-color">
        <p className="text-text-secondary text-center px-4">請選擇地圖上的餐廳或左側列表中的餐廳</p>
      </div>
    );
  }

  const toggleStyle = (styleLabel: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleLabel) ? prev.filter((s) => s !== styleLabel) : [...prev, styleLabel]
    );
  };

  const toggleCategory = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel) ? prev.filter((c) => c !== categoryLabel) : [...prev, categoryLabel]
    );
  };

  const handleSave = () => {
    if (selectedStyles.length === 0 || selectedCategories.length === 0) {
      alert('請至少選擇一個風格和一個類別');
      return;
    }
    onSave(restaurant, selectedStyles, selectedCategories);
  };

  const handleUnsave = () => {
    if (window.confirm('確定要取消收藏這個餐廳嗎？')) {
      onUnsave(restaurant);
    }
  };

  return (
    <div className="h-full flex flex-col bg-bg-card border-l border-border-color overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="p-6">
          {/* Restaurant Name */}
          <h2 className="text-2xl font-bold text-text-primary mb-2">{restaurant.name}</h2>

          {/* Address */}
          <div className="mb-4">
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-secondary mt-0.5 flex-shrink-0"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p className="text-text-secondary text-sm">{restaurant.address}</p>
            </div>
          </div>

          {/* Rating & Price */}
          {(restaurant.rating || restaurant.priceLevel) && (
            <div className="flex items-center gap-4 mb-4">
              {restaurant.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-text-primary font-semibold">{restaurant.rating.toFixed(1)}</span>
                </div>
              )}
              {restaurant.priceLevel && (
                <span className="text-text-secondary text-sm">{restaurant.priceLevel}</span>
              )}
            </div>
          )}

          {/* Existing Tags (if saved) */}
          {restaurant.isSaved && (
            <div className="mb-6">
              {restaurant.styles.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">風格 Styles</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.styles.map((style, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                      >
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {restaurant.categories.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-text-secondary mb-2 uppercase tracking-wide">類別 Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-text-primary"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tag Selection (if not saved) */}
          {!restaurant.isSaved && (
            <div className="mb-6">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3">選擇風格 Styles</h3>
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

              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-3">選擇類別 Categories</h3>
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
            </div>
          )}
        </div>
      </div>

      {/* Fixed Action Buttons at Bottom */}
      <div className="flex-shrink-0 p-6 pt-4 border-t border-border-color bg-bg-card">
        {restaurant.isSaved ? (
          <button
            onClick={handleUnsave}
            className="w-full px-4 py-2.5 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          >
            取消收藏
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={selectedStyles.length === 0 || selectedCategories.length === 0}
            className="w-full px-4 py-2.5 rounded-full bg-accent-primary text-white font-semibold hover:bg-accent-primary/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            收藏
          </button>
        )}
      </div>
    </div>
  );
};


```


調整高度計算，確保布局正確：


```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-bg-primary transition-colors duration-300 flex flex-col overflow-hidden">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4 flex-shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content - Full height with independent scrolling for sidebars */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0 h-full overflow-hidden">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchWithAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectPlace={handleSelectPlace}
              restaurants={restaurants}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
                centerLocation={mapCenter}
                centerZoom={mapZoom}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0 h-full overflow-hidden">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```


所有修改已完成。以下是總結：

## 已修改的文件列表

### 修改的文件：

1. **`src/pages/SavedRestaurantsPage.tsx`** - 主頁面布局
   - 將容器改為 `h-screen` 和 `flex flex-col overflow-hidden`
   - 主內容區域使用 `flex-1 flex overflow-hidden min-h-0`
   - 左右側邊欄添加 `h-full overflow-hidden` 以實現獨立滾動

2. **`src/components/savedRestaurants/SavedRestaurantsList.tsx`** - 左側邊欄組件
   - 添加 `useState` 管理過濾器展開/收起狀態（`filtersOpen`）
   - 添加可點擊的過濾器標題欄，顯示「篩選條件 Filters」和已選擇的過濾器數量
   - 使用條件渲染控制過濾器內容的顯示/隱藏
   - 添加旋轉動畫的 chevron 圖標

3. **`src/components/savedRestaurants/RestaurantDetailPanel.tsx`** - 右側詳情面板
   - 將內容區域改為可滾動（`overflow-y-auto`）
   - 將操作按鈕固定在底部（`flex-shrink-0`）

## 功能說明

### 1. 獨立滾動行為的實現

實現方式：
- 主容器：使用 `h-screen flex flex-col overflow-hidden` 讓頁面佔滿視窗高度，並防止整體滾動
- 主內容區域：使用 `flex-1 flex overflow-hidden min-h-0` 讓三欄布局填滿剩餘空間
- 左側邊欄：
  - 外層：`h-full overflow-hidden` 防止內容溢出
  - 列表區域：`flex-1 overflow-y-auto` 實現獨立垂直滾動
- 右側邊欄：
  - 外層：`h-full overflow-hidden` 防止內容溢出
  - 內容區域：`flex-1 overflow-y-auto` 實現獨立垂直滾動
  - 按鈕區域：`flex-shrink-0` 固定在底部

結果：
- 左右側邊欄各自有獨立的滾動條
- 瀏覽器窗口滾動不會影響側邊欄
- 桌面端三欄布局固定，側邊欄內容可獨立滾動
- 移動端保持響應式堆疊布局

### 2. 過濾器收起/展開功能的實現

實現方式：
- 狀態管理：使用 `const [filtersOpen, setFiltersOpen] = useState(true)` 控制展開/收起
  - 預設為 `true`（展開）
  - 要改為預設收起，將 `useState(true)` 改為 `useState(false)`
- UI 結構：
  - 標題欄：可點擊按鈕，顯示「篩選條件 Filters」標題
  - 過濾器計數：當有選中的過濾器時，顯示徽章（例如「3」）
  - Chevron 圖標：根據 `filtersOpen` 狀態旋轉 180 度
  - 過濾器內容：使用條件渲染 `{filtersOpen && (...)}` 控制顯示
- 功能保持：
  - 過濾邏輯不變，僅控制 UI 顯示
  - 已選中的過濾器在收起時仍保持有效
  - 收起時為餐廳列表釋放更多空間

調整預設狀態：
- 要改為預設收起，在 `SavedRestaurantsList.tsx` 第 18 行將：
  ```typescript
  const [filtersOpen, setFiltersOpen] = useState(true);
  ```
  改為：
  ```typescript
  const [filtersOpen, setFiltersOpen] = useState(false);
  ```

## 設計特點

- 響應式設計：桌面端獨立滾動，移動端保持原有堆疊行為
- 用戶體驗：過濾器收起釋放空間，已選過濾器數量清晰顯示
- 視覺反饋：Chevron 圖標旋轉動畫，過濾器計數徽章
- 性能優化：使用 `overflow-hidden` 和 `min-h-0` 避免布局問題

所有修改已完成並通過 lint 檢查。可以啟動開發服務器測試新的布局和過濾器功能。

```typescript
  const [filtersOpen, setFiltersOpen] = useState(true);
```

```typescript
  const [filtersOpen, setFiltersOpen] = useState(false);
```

---

**User**

點開頭像後的"收藏餐廳"按鈕能用英文嗎

---

**Cursor**


將頭像下拉菜單中的「收藏餐廳」改為英文。查找並修改：



將「收藏餐廳」改為英文：


```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      // TODO: Replace with actual logged-in user's username from auth context
                      navigate('/user/lorry930811');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/saved-restaurants');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Saved Restaurants
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};


```


已將頭像下拉菜單中的「收藏餐廳」改為 "Saved Restaurants"，與其他菜單項（View Profile、Settings、Log Out）的英文風格一致。

修改已完成，沒有 lint 錯誤。點擊頭像後的下拉菜單會顯示 "Saved Restaurants"。

---

**User**

收藏餐廳頁面的導航欄不需要搜尋框

---

**Cursor**


檢查 TopNavBar 的實現，添加控制搜尋框顯示的 prop：



修改 TopNavBar，添加控制搜尋框顯示的 prop，並在收藏餐廳頁面隱藏搜尋框：


```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
  showSearch?: boolean; // Optional prop to show/hide search box
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      // TODO: Replace with actual logged-in user's username from auth context
                      navigate('/user/lorry930811');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/saved-restaurants');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Saved Restaurants
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};


```

```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
  showSearch?: boolean; // Optional prop to show/hide search box
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
  showSearch = true, // Default to true for backward compatibility
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      // TODO: Replace with actual logged-in user's username from auth context
                      navigate('/user/lorry930811');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/saved-restaurants');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Saved Restaurants
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};


```

```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
  showSearch?: boolean; // Optional prop to show/hide search box
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
  showSearch = true, // Default to true for backward compatibility
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          {showSearch && (
            <div className="hidden md:flex flex-1 justify-center px-4">
              <SearchInput value={searchQuery} onChange={onSearchChange} />
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      // TODO: Replace with actual logged-in user's username from auth context
                      navigate('/user/lorry930811');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/saved-restaurants');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Saved Restaurants
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchInput value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </nav>
  );
};


```

```typescriptreact
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useTheme } from '../../contexts/ThemeContext';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onPostClick: () => void;
  showSearch?: boolean; // Optional prop to show/hide search box
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  searchQuery,
  onSearchChange,
  onPostClick,
  showSearch = true, // Default to true for backward compatibility
}) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center: Search */}
          {showSearch && (
            <div className="hidden md:flex flex-1 justify-center px-4">
              <SearchInput value={searchQuery} onChange={onSearchChange} />
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center justify-end space-x-4" style={{ width: '240px' }}>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-transparent border border-text-topbar border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-text-topbar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Post Button */}
            <button
              onClick={onPostClick}
              className="px-6 py-2.5 bg-accent-gold text-text-primary rounded-full hover:bg-accent-hover transition-all duration-200 text-base shadow-lg hover:shadow-xl font-bold border-2 border-transparent hover:border-accent-primary"
              style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
            >
              Post
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-transparent border-2 border-text-topbar border-opacity-30 flex items-center justify-center overflow-hidden hover:bg-white hover:bg-opacity-10 transition-all duration-200">
                  <span className="text-text-topbar text-lg">👤</span>
                </div>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    onClick={() => {
                      // TODO: Replace with actual logged-in user's username from auth context
                      navigate('/user/lorry930811');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/saved-restaurants');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Saved Restaurants
                  </button>
                  <button
                    onClick={() => {
                      console.log('Settings clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      console.log('Log Out clicked');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <div className="md:hidden pb-4">
            <SearchInput value={searchQuery} onChange={onSearchChange} />
          </div>
        )}
      </div>
    </nav>
  );
};


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SavedRestaurant } from '../types/savedRestaurants';
import { PlaceSuggestion } from '../types/placeSearch';
import { fetchAllRestaurants } from '../api/mockSavedRestaurants';
import { SavedRestaurantsMap } from '../components/savedRestaurants/SavedRestaurantsMap';
import { SavedRestaurantsList } from '../components/savedRestaurants/SavedRestaurantsList';
import { RestaurantDetailPanel } from '../components/savedRestaurants/RestaurantDetailPanel';
import { SearchWithAutocomplete } from '../components/savedRestaurants/SearchWithAutocomplete';
import { TopNavBar } from '../components/layout/TopNavBar';

export const SavedRestaurantsPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<SavedRestaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<SavedRestaurant | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(16);

  // Load restaurants on mount
  useEffect(() => {
    const loadRestaurants = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  // Filter restaurants by search query
  const filteredRestaurants = useMemo(() => {
    let filtered = [...restaurants];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query) ||
          restaurant.address.toLowerCase().includes(query) ||
          restaurant.styles.some((style) => style.toLowerCase().includes(query)) ||
          restaurant.categories.some((category) => category.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [restaurants, searchQuery]);

  // Handle style filter toggle
  const handleStyleToggle = (style: string) => {
    setSelectedStyles((prev) => (prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]));
  };

  // Handle category filter toggle
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // Handle restaurant click
  const handleRestaurantClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle marker click
  const handleMarkerClick = (restaurant: SavedRestaurant) => {
    setSelectedRestaurant(restaurant);
    // Clear external map center to use restaurant's position
    setMapCenter(null);
  };

  // Handle place selection from search
  const handleSelectPlace = (place: PlaceSuggestion) => {
    if (!place.lat || !place.lng) return;

    // Try to match with existing restaurant by name or placeId
    const matchedRestaurant = restaurants.find(
      (r) =>
        r.name === place.name ||
        r.address === place.address ||
        (place.placeId && r.id === place.placeId)
    );

    if (matchedRestaurant) {
      // If matched, use existing restaurant
      setSelectedRestaurant(matchedRestaurant);
      setMapCenter({ lat: matchedRestaurant.lat, lng: matchedRestaurant.lng });
    } else {
      // If not matched, create a temporary unsaved restaurant
      const tempRestaurant: SavedRestaurant = {
        id: place.placeId || `temp_${Date.now()}`,
        name: place.name,
        address: place.address,
        lat: place.lat,
        lng: place.lng,
        styles: [],
        categories: [],
        isSaved: false,
      };
      setSelectedRestaurant(tempRestaurant);
      setMapCenter({ lat: place.lat, lng: place.lng });
    }

    setMapZoom(16);
  };

  // Handle save restaurant
  const handleSave = (restaurant: SavedRestaurant, styles: string[], categories: string[]) => {
    // TODO: In production, call API to save restaurant
    // await saveRestaurant(restaurant.id, styles, categories);

    // Check if restaurant already exists in list
    const existingIndex = restaurants.findIndex((r) => r.id === restaurant.id);

    if (existingIndex >= 0) {
      // Update existing restaurant
      setRestaurants((prev) =>
        prev.map((r) =>
          r.id === restaurant.id
            ? {
                ...r,
                isSaved: true,
                styles,
                categories,
              }
            : r
        )
      );
    } else {
      // Add new restaurant to list
      setRestaurants((prev) => [
        ...prev,
        {
          ...restaurant,
          isSaved: true,
          styles,
          categories,
        },
      ]);
    }

    // Update selected restaurant
    setSelectedRestaurant((prev) =>
      prev && prev.id === restaurant.id
        ? {
            ...prev,
            isSaved: true,
            styles,
            categories,
          }
        : prev
    );

    // Clear map center to let it use restaurant's position
    setMapCenter(null);
  };

  // Handle unsave restaurant
  const handleUnsave = (restaurant: SavedRestaurant) => {
    // TODO: In production, call API to unsave restaurant
    // await unsaveRestaurant(restaurant.id);

    // Update local state
    setRestaurants((prev) =>
      prev.map((r) => (r.id === restaurant.id ? { ...r, isSaved: false } : r))
    );

    // Clear selection if unsaved restaurant was selected
    if (selectedRestaurant?.id === restaurant.id) {
      setSelectedRestaurant(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            載入中...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-bg-primary transition-colors duration-300 flex flex-col overflow-hidden">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => navigate('/')}
        showSearch={false}
      />

      {/* Back to Home Button */}
      <div className="px-4 md:px-6 py-4 flex-shrink-0">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Main Content - Full height with independent scrolling for sidebars */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Sidebar - Restaurant List */}
        <aside className="hidden md:block w-80 flex-shrink-0 h-full overflow-hidden">
          <SavedRestaurantsList
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            selectedStyles={selectedStyles}
            selectedCategories={selectedCategories}
            onRestaurantClick={handleRestaurantClick}
            onStyleToggle={handleStyleToggle}
            onCategoryToggle={handleCategoryToggle}
          />
        </aside>

        {/* Center - Map + Search */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Search Bar */}
          <div className="p-4 bg-bg-secondary border-b border-border-color">
            <SearchWithAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelectPlace={handleSelectPlace}
              restaurants={restaurants}
              placeholder="搜尋地點或餐廳…"
            />
          </div>

          {/* Map */}
          <div className="flex-1 bg-bg-secondary p-4">
            <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
              <SavedRestaurantsMap
                restaurants={filteredRestaurants}
                selectedRestaurant={selectedRestaurant}
                onMarkerClick={handleMarkerClick}
                centerLocation={mapCenter}
                centerZoom={mapZoom}
              />
            </div>
          </div>
        </main>

        {/* Right Sidebar - Restaurant Detail */}
        <aside className="hidden lg:block w-80 flex-shrink-0 h-full overflow-hidden">
          <RestaurantDetailPanel
            restaurant={selectedRestaurant}
            onSave={handleSave}
            onUnsave={handleUnsave}
          />
        </aside>
      </div>

      {/* Mobile: Show detail panel as modal when restaurant is selected */}
      {selectedRestaurant && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="w-full bg-bg-card rounded-t-3xl max-h-[80vh] overflow-y-auto">
            <RestaurantDetailPanel
              restaurant={selectedRestaurant}
              onSave={(restaurant, styles, categories) => {
                handleSave(restaurant, styles, categories);
                setSelectedRestaurant(null);
              }}
              onUnsave={(restaurant) => {
                handleUnsave(restaurant);
                setSelectedRestaurant(null);
              }}
            />
            <div className="p-4 border-t border-border-color">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="w-full px-4 py-2 rounded-full border border-border-color bg-bg-card text-text-primary font-semibold hover:bg-bg-hover transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


```


已更新：收藏餐廳頁面的導航欄不再顯示搜尋框。

## 修改內容

1. **`src/components/layout/TopNavBar.tsx`**：
   - 添加可選 prop `showSearch?: boolean`，默認為 `true`（保持向後兼容）
   - 桌面版和移動版搜尋框改為條件渲染，僅在 `showSearch` 為 `true` 時顯示

2. **`src/pages/SavedRestaurantsPage.tsx`**：
   - 在 `TopNavBar` 組件中傳遞 `showSearch={false}` 以隱藏搜尋框

收藏餐廳頁面的導航欄將只顯示 Logo、主題切換、Post 按鈕和用戶頭像，不再顯示搜尋框。其他使用 `TopNavBar` 的頁面仍會顯示搜尋框（因為默認值為 `true`）。

所有修改已完成，沒有 lint 錯誤。

---

**User**

1. user profile 頁面的導航欄也不需要搜尋框。

2. user profile 頁面在上下滑的時候導航欄和回主頁面的按鈕要被固定在畫面中的同一個位置，不管滑到哪都要能被看到

---

**Cursor**


檢查 UserProfilePage 的實現：



修改 UserProfilePage，隱藏搜尋框，並固定導航欄與「Back to Home」按鈕：


```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
        // Fetch recommended users
        const recommended = await fetchRecommendedUsers();
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          navigate('/');
        }}
        showSearch={false}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Back to Home Button */}
            <div className="px-4 md:px-6 py-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">Back to Home</span>
              </button>
            </div>

            {/* Profile Header */}
            <ProfileHeader
              profile={profile}
              isOwnProfile={isOwnProfile}
              onEditClick={() => setIsEditModalOpen(true)}
            />

            {/* Profile Tags */}
            <ProfileTags profile={profile} />

            {/* Profile Tabs */}
            <ProfileTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              postCounts={postCounts}
            />

            {/* Posts Feed */}
            <div className="bg-bg-secondary min-h-screen">
              {currentPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    {activeTab === 'posts'
                      ? 'This user has not created any posts yet.'
                      : `This user has no ${activeTab} yet.`}
                  </p>
                </div>
              ) : (
                <div>
                  {currentPosts.map((post) => {
                    if (post.type === 'review') {
                      return (
                        <ReviewPostCard
                          key={post.id}
                          post={post as ReviewPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    } else {
                      return (
                        <MeetupPostCard
                          key={post.id}
                          post={post as MeetupPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - You Might Like (Desktop only) */}
          <aside className="hidden lg:block w-80 flex-shrink-0 pt-4">
            <div className="sticky top-4">
              <YouMightLike recommendedUsers={recommendedUsers} />
            </div>
          </aside>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
        // Fetch recommended users
        const recommended = await fetchRecommendedUsers();
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          navigate('/');
        }}
        showSearch={false}
      />

      {/* Fixed Back to Home Button */}
      <div className="sticky top-16 z-40 bg-bg-primary border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Back to Home</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Profile Header */}
            <ProfileHeader
              profile={profile}
              isOwnProfile={isOwnProfile}
              onEditClick={() => setIsEditModalOpen(true)}
            />

            {/* Profile Tags */}
            <ProfileTags profile={profile} />

            {/* Profile Tabs */}
            <ProfileTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              postCounts={postCounts}
            />

            {/* Posts Feed */}
            <div className="bg-bg-secondary min-h-screen">
              {currentPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    {activeTab === 'posts'
                      ? 'This user has not created any posts yet.'
                      : `This user has no ${activeTab} yet.`}
                  </p>
                </div>
              ) : (
                <div>
                  {currentPosts.map((post) => {
                    if (post.type === 'review') {
                      return (
                        <ReviewPostCard
                          key={post.id}
                          post={post as ReviewPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    } else {
                      return (
                        <MeetupPostCard
                          key={post.id}
                          post={post as MeetupPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - You Might Like (Desktop only) */}
          <aside className="hidden lg:block w-80 flex-shrink-0 pt-4">
            <div className="sticky top-4">
              <YouMightLike recommendedUsers={recommendedUsers} />
            </div>
          </aside>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```


已完成兩項修改：

## 修改內容

### 1. 隱藏搜尋框
- 在 `UserProfilePage` 的 `TopNavBar` 組件中設置 `showSearch={false}`，隱藏導航欄中的搜尋框。

### 2. 固定導航欄和 Back to Home 按鈕
- TopNavBar：已使用 `sticky top-0`，固定在頂部。
- Back to Home 按鈕：
  - 移到 TopNavBar 下方
  - 使用 `sticky top-16`（TopNavBar 高度為 `h-16`，即 64px）
  - 添加背景色和邊框，確保滾動時可見
  - 設置 `z-40` 確保層級正確

滾動頁面時，導航欄和 Back to Home 按鈕會固定在頂部，始終可見。

所有修改已完成，沒有 lint 錯誤。

---

**User**

You are a senior frontend engineer working on our restaurant-sharing web app

(React + TypeScript + Tailwind or our existing UI system).

The project is frontend-only (mock data + local state, no backend yet).



We want to update:



The main homepage feed layout (sidebars + right content)



The user profile page (sticky navigation + Back to Home)



Please reuse existing components and layouts where possible, and keep changes minimal and localized.



Part 1 – Main homepage: fill sidebars + new right sidebar content

Current issues



On the main homepage, the left and right sides of the screen have visible blank space.



The right sidebar currently has no content.



Desired layout



The homepage should be a 3-column layout:



Left sidebar (existing navigation / menu)



Center: main feed (posts)



Right sidebar: “You might like” + small map



On desktop width:



The sidebars should visually fill the height and width of their columns.



There should be no big blank margins on the left/right; sidebars should occupy those areas.



Please:



Locate the main/home page component (the one that renders the main posts feed and sidebars).



Ensure the content area is structured as a 3-column layout using flex or grid:



Something like className="grid grid-cols-[SIDE_LEFT,MAIN,SIDE_RIGHT] h-screen" or similar.



Use our existing responsive breakpoints (on mobile it can still collapse).



New right sidebar content



The right sidebar should have two stacked sections:



Top: “You might like” card (Twitter-like)



Bottom: small map that reacts to location tags in posts



1) “You might like” card



Create a card component similar to Twitter’s “You might like” (see screenshot):



Title: “You might like”



A short list (e.g. 3) of recommended users/accounts:



avatar



display name



@username



a “Follow” button on the right



At the bottom, a Show more link.



Use mock data for recommended users, e.g. recommendedUsers array in a small mock module.



Clicking “Follow” can simply toggle a local isFollowing flag; this is purely frontend.



Style it like our other cards (rounded, shadow, padding) but roughly follow the layout from the screenshot.



2) Small map under the card



Under the “You might like” card, render a small map widget.



Behavior:



When a user clicks a location tag in a post (in the main feed center column):



The small map in the right sidebar should:



Center on that restaurant’s coordinates



Show a marker for that restaurant



If no location has been selected yet:



Show a default “Select a restaurant location to preview it here” state or default map view.



Implementation details:



Locate where posts and location tags are rendered.



The location tag might be a chip/button with restaurant name.



Add an onClick handler to the location tag:



It should call a function like handleLocationSelect(restaurant) in the main page.



Maintain a state in the main/home page:



const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);



Where RestaurantLocation includes at least name, lat, lng, and maybe address.



Pass selectedLocation into the right sidebar small map component.



In the small map component:



When selectedLocation changes:



Pan/zoom the map to lat/lng.



Show a single marker for that location.



Map library:



If we already use a map library (same as the 收藏餐廳 page), reuse it.



Do not introduce a second map library if one already exists.



Part 2 – User profile page: sticky nav + “Back to Home”



We already have a user profile page with:



A Back to Home button



A navigation bar / tabs (e.g. Posts, Likes, Replies, Reposts, Bookmarks)



Current issue



When the page scrolls up/down, both:



the Back to Home button, and



the profile navigation tabs

scroll out of view.



Desired behavior



Make the Back to Home button and the navigation bar sticky (fixed in place while the content below scrolls).



Details:



The sticky area should include:



Back to Home button



Profile nav / tab bar just below it



When the user scrolls through posts on the profile page:



These controls should remain visible at the top, so users can always switch tabs or go back home.



Implementation hints:



Use CSS position: sticky or a fixed header region:



Example:



<div className="sticky top-0 z-20 bg-background">

  <BackToHomeButton />

  <ProfileTabs />

</div>





Make sure to set appropriate z-index and background so content doesn’t bleed underneath.



The scrollable area should be the post list/content section, not the entire page including the nav.



Please update the user profile page layout accordingly without breaking existing behavior.



General requirements



Keep everything in TypeScript.



Follow existing styling conventions (Tailwind / design system).



Reuse existing components and map logic where possible.



Keep changes to unrelated files minimal.



Tasks for you (Cursor)



For the homepage:



Adjust the layout to fill left/right with sidebars (no large blank margins).



Implement the right sidebar with:



“You might like” card using mock data.



A small map that updates when a post’s location tag is clicked.



For the user profile page:



Make the Back to Home button and profile navigation bar sticky/fixed at the top while content scrolls.



Ensure the app still builds and runs without TypeScript errors.



At the end, output:



The list of files you created/modified.



A short explanation of:



How the homepage small map receives and reacts to location tag clicks.



How the sticky behavior of the profile nav and Back to Home button is implemented and how to tweak the top offset if needed.

---

**Cursor**


檢查現有代碼結構：



讀取主頁面組件以了解當前結構：



繼續檢查相關組件：



開始實作：先創建小地圖組件，然後更新主頁面布局。


```typescript
// Restaurant location for map preview
export interface RestaurantLocation {
  name: string;
  address?: string;
  lat: number;
  lng: number;
}

```

```typescriptreact
import React, { useEffect, useRef } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { RestaurantLocation } from '../../types/location';

interface SmallMapProps {
  selectedLocation: RestaurantLocation | null;
}

export const SmallMap: React.FC<SmallMapProps> = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    });
  }, [isLoaded]);

  // Update map when location is selected
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    if (selectedLocation) {
      // Center map on selected location
      const position = { lat: selectedLocation.lat, lng: selectedLocation.lng };
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(16);

      // Remove previous marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Create new marker
      markerRef.current = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: selectedLocation.name,
        animation: google.maps.Animation.DROP,
      });
    } else {
      // Reset to default view when no location is selected
      const defaultCenter = { lat: 25.0330, lng: 121.5654 };
      mapInstanceRef.current.setCenter(defaultCenter);
      mapInstanceRef.current.setZoom(13);

      // Remove marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    }
  }, [selectedLocation, isLoaded]);

  if (loadError) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-text-secondary text-sm">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-2"></div>
          <p className="text-text-secondary text-xs">載入地圖中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-2xl border border-border-color p-4 shadow-sm">
      <h3 className="text-lg font-bold text-text-primary mb-3" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        Location Preview
      </h3>
      {selectedLocation ? (
        <div className="mb-2">
          <p className="text-sm font-semibold text-text-primary">{selectedLocation.name}</p>
          {selectedLocation.address && (
            <p className="text-xs text-text-secondary mt-1">{selectedLocation.address}</p>
          )}
        </div>
      ) : (
        <p className="text-sm text-text-secondary mb-2">Select a restaurant location to preview it here</p>
      )}
      <div ref={mapRef} className="w-full h-64 rounded-lg overflow-hidden" />
    </div>
  );
};

```


檢查 ReviewPost 是否包含位置座標，並更新主頁面：



更新主頁面，添加右側邊欄，並修改相關組件：


```typescript
export type BoardCategory = 'cuisine' | 'type';

export interface Board {
  id: string;
  name: string;      // e.g. "Japanese"
  label: string;     // e.g. "日式 Japanese"
  category: BoardCategory;
}

export interface User {
  id: string;
  displayName: string;
  handle: string;      // e.g. "@foodie_ntu"
  avatarUrl?: string;
  isFollowedByCurrentUser?: boolean;
}

export interface ReviewPost {
  id: string;
  type: 'review';
  author: User;
  restaurantName: string;
  board: Board;         // cuisine or food type board (legacy)
  styleType?: string;   // e.g. "美式 American" (cuisine/style)
  foodType?: string;    // e.g. "漢堡 Burgers" (food type)
  title: string;
  contentSnippet: string;
  rating: number;       // 1–5
  priceLevel: '$' | '$$' | '$$$';
  priceMax?: number;    // Maximum price per person in NTD (for detailed range)
  locationArea: string; // e.g. "Gongguan", "Xinyi"
  restaurantAddress?: string; // Full address
  restaurantLat?: number; // Latitude
  restaurantLng?: number; // Longitude
  createdAt: string;    // ISO or human-friendly string
  likeCount: number;
  commentCount: number;
  shareCount?: number;  // Number of shares
  imageUrl?: string;    // Single image (legacy support)
  images?: string[];    // Multiple images array
  isFromFollowedUser?: boolean;
}

export type Visibility = 'PUBLIC' | 'FOLLOWERS';

export interface MeetupPost {
  id: string;
  type: 'meetup';
  author: User;              // Changed from 'host' to 'author' for consistency
  restaurantName: string;    // Required field
  locationText: string;      // Free-text address/area, e.g. "信義區, 台北" or "Xinyi"
  address?: string;          // Optional full address for Google Maps
  meetupTime: string;        // ISO datetime string
  foodTags: string[];       // e.g. ["Hotpot", "Taiwanese"], can be board labels or custom tags
  maxHeadcount: number;     // Total seats host wants
  currentHeadcount: number;  // Start at 1 (host), can be extended later
  budgetDescription: string; // Free text like "預計 500–700 / 1 人", "我請客"
  hasReservation: boolean;
  description: string;      // Main text body of the post
  visibility: Visibility;    // 'PUBLIC' | 'FOLLOWERS'
  imageUrl?: string | null; // Optional restaurant/meetup image
  status: 'OPEN' | 'CLOSED'; // Default "OPEN"; show "Closed" style
  createdAt: string;        // ISO or human-friendly string
  updatedAt?: string;       // ISO or human-friendly string
  likeCount: number;        // Number of likes
  commentCount: number;     // Number of comments
  shareCount?: number;      // Number of shares
  isFromFollowedUser?: boolean;
  // Legacy fields for backward compatibility (can be derived from new fields)
  board?: Board;            // Optional: can derive from foodTags
  locationArea?: string;    // Optional: can derive from locationText
}

export type Post = ReviewPost | MeetupPost;


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { ReviewPost } from '../../types/models';
import { Edit3, Archive, Trash2, Bookmark, Flag } from 'lucide-react';
import { PostActions } from './PostActions';

interface ReviewPostCardProps {
  post: ReviewPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
  onLocationClick?: (location: { name: string; address?: string; lat: number; lng: number }) => void;
  isOwnPost?: boolean;
}

interface MenuActionItemProps {
  icon: React.ReactNode;
  label: string;
  destructive?: boolean;
  onClick?: () => void;
}

const MenuActionItem: React.FC<MenuActionItemProps> = ({
  icon,
  label,
  destructive,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
      destructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-800 hover:bg-gray-50'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

// Helper function to map priceMax to symbols and label
function getPriceInfo(maxPrice: number | null | undefined) {
  if (maxPrice == null) {
    return { symbols: "", label: "" };
  }

  if (maxPrice <= 300) {
    return { symbols: "$", label: "NT$0–300" };
  }

  if (maxPrice <= 1000) {
    return { symbols: "$$", label: "NT$301–1000" };
  }

  if (maxPrice <= 5000) {
    return { symbols: "$$$", label: "NT$1001–5000" };
  }

  // 5000+
  return { symbols: "$$$$$", label: "NT$5000+" };
}

export const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, onClick, onTagClick, isOwnPost = false }) => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute price info from priceMax
  const priceInfo = getPriceInfo(post.priceMax);

  // Handler for opening Google Maps
  const handleOpenGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = `${post.restaurantName ?? ""} ${post.locationArea ?? ""}`.trim();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      "_blank"
    );
  };

  // Helper function to parse and style hashtags
  const renderContentWithHashtags = (text: string) => {
    const parts = text.split(/(#[\w\u4e00-\u9fa5]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
    return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Open lightbox
  const openLightbox = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to previous image
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  // Navigate to next image
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const maxIndex = (post.images?.length || 1) - 1;
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // ESC key listener for lightbox and menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          closeLightbox();
        }
        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen, menuOpen]);

  return (
    <div
      onClick={(e) => {
        // Close menu if open
        if (menuOpen) {
          setMenuOpen(false);
        }
        // Trigger parent onClick
        if (onClick) {
          onClick();
        }
      }}
      className="group px-4 py-3 border-b border-border-color cursor-pointer hover:bg-bg-hover transition-colors duration-200"
    >
      {/* TOP SECTION: Header Row */}
      <div className="flex items-start mb-2">
        {/* Avatar */}
        <div className="relative mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden">
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
          ) : (
              <span className="text-text-primary text-lg">👤</span>
          )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          {/* Line 1: Name, Username, Time + More Menu (right-aligned) */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline flex-wrap gap-1 text-sm">
              <span className="font-bold text-text-primary">
              {post.author.displayName}
            </span>
              <span className="text-text-secondary">
                {post.author.handle}
              </span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">
                {post.createdAt}
              </span>
            </div>
            
            {/* Right-aligned: More menu (...) with dropdown */}
            <div className="relative flex-shrink-0">
              <button
                className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer text-text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-neutral-200 z-20 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isOwnPost ? (
                    <>
                      <MenuActionItem
                        icon={<Edit3 className="w-4 h-4" />}
                        label="Edit this post"
                        onClick={() => {
                          console.log('Edit post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Archive className="w-4 h-4" />}
                        label="Archive this post"
                        onClick={() => {
                          console.log('Archive post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete this post"
                        destructive
                        onClick={() => {
                          console.log('Delete post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <MenuActionItem
                        icon={<Bookmark className="w-4 h-4" />}
                        label="Save this post"
                        onClick={() => {
                          console.log('Save post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Flag className="w-4 h-4" />}
                        label="Report this post"
                        destructive
                        onClick={() => {
                          console.log('Report post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Line 2: Three Separate Pills - Restaurant+Location, Style Type, Food Type */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {/* Chip 1: Restaurant + Location */}
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer group-hover:bg-neutral-50 transition-colors"
              onClick={handleOpenGoogleMaps}
            >
              {(post.locationArea || (post as any).region) && (
                <>
                  <span className="text-text-secondary">
                    {(post as any).region || post.locationArea}
                  </span>
                  <span className="text-gray-300">|</span>
                </>
              )}
              <span className="font-medium text-text-primary">
                {post.restaurantName}
              </span>
            </button>

            {/* Chip 2: Style Type (Cuisine) - use styleType if available, otherwise use board if it's cuisine */}
            {(post.styleType || (post.board?.category === 'cuisine' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.styleType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.styleType || post.board?.label}
                </span>
              </button>
            )}

            {/* Chip 3: Food Type - use foodType if available, otherwise use board if it's type */}
            {(post.foodType || (post.board?.category === 'type' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.foodType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.foodType || post.board?.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Post Content Area */}
      <div className="ml-[52px]">
        {/* RATING ROW (ABOVE content text) */}
        <div className="mt-1 flex items-center text-sm text-text-secondary">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(post.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Numeric rating */}
          <span className="ml-2 font-semibold text-text-primary">
            {post.rating.toFixed(1)}
          </span>

          {/* Dot separator */}
          <span className="mx-2 text-text-secondary/60">·</span>

          {/* Price Symbols + Range */}
          {priceInfo.symbols && (
            <>
              <span className="font-semibold text-text-primary">{priceInfo.symbols}</span>
              <span className="ml-2 text-xs text-text-secondary">{priceInfo.label}</span>
            </>
          )}
        </div>

        {/* CONTENT TEXT with hashtag styling */}
        <p className="mt-3 text-base text-text-primary leading-relaxed mb-3">
          {renderContentWithHashtags(post.contentSnippet)}
        </p>

        {/* IMAGE GALLERY */}
        {/* PRODUCTION NOTE: Images should be uploaded to cloud storage (AWS S3, GCS, Firebase Storage) 
            and URLs stored in database. Never rely on direct Unsplash/external hotlinks in production. */}
        {(post.images && post.images.length > 0) ? (
          <div className="mb-3 -mx-4">
            <div 
              className="flex overflow-x-auto scroll-smooth px-4 gap-3"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {post.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden border border-border-color group cursor-pointer snap-center"
                  style={{
                    width: post.images!.length === 1 ? 'calc(100% - 2rem)' : '85%',
                    height: '300px',
                  }}
                  onClick={(e) => openLightbox(index, e)}
                >
                  <img
                    src={imageUrl}
                    alt={`${post.restaurantName} - ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {/* Image counter badge - HOVER ONLY */}
                  {post.images!.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}/{post.images!.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Hide scrollbar CSS-in-JS */}
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : post.imageUrl ? (
          // Legacy single image support
          <div 
            className="rounded-xl overflow-hidden border border-border-color mb-3 cursor-pointer group"
            onClick={(e) => openLightbox(0, e)}
          >
            <img 
              src={post.imageUrl} 
              alt={post.restaurantName}
              className="w-full h-[300px] object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ) : null}

        {/* BOTTOM ACTION BAR - Like, Comment, Share, Save */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          <PostActions
            postId={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            onLike={(id) => console.log('like post', id)}
            onComment={(id) => console.log('comment post', id)}
            onShare={(id) => console.log('share post', id)}
          />
          
          {/* Save restaurant location (map pin) - Review posts only */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('save restaurant location', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          {/* Modal Content */}
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* Main Image */}
            <img
              src={(post.images && post.images[activeIndex]) || post.imageUrl || ''}
              alt={`${post.restaurantName} - ${activeIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            {post.images && post.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                {activeIndex + 1} / {post.images.length}
              </div>
            )}

            {/* Previous Arrow */}
            {post.images && post.images.length > 1 && activeIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {post.images && post.images.length > 1 && activeIndex < post.images.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { ReviewPost } from '../../types/models';
import { Edit3, Archive, Trash2, Bookmark, Flag } from 'lucide-react';
import { PostActions } from './PostActions';

interface ReviewPostCardProps {
  post: ReviewPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
  onLocationClick?: (location: { name: string; address?: string; lat: number; lng: number }) => void;
  isOwnPost?: boolean;
}

interface MenuActionItemProps {
  icon: React.ReactNode;
  label: string;
  destructive?: boolean;
  onClick?: () => void;
}

const MenuActionItem: React.FC<MenuActionItemProps> = ({
  icon,
  label,
  destructive,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
      destructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-800 hover:bg-gray-50'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

// Helper function to map priceMax to symbols and label
function getPriceInfo(maxPrice: number | null | undefined) {
  if (maxPrice == null) {
    return { symbols: "", label: "" };
  }

  if (maxPrice <= 300) {
    return { symbols: "$", label: "NT$0–300" };
  }

  if (maxPrice <= 1000) {
    return { symbols: "$$", label: "NT$301–1000" };
  }

  if (maxPrice <= 5000) {
    return { symbols: "$$$", label: "NT$1001–5000" };
  }

  // 5000+
  return { symbols: "$$$$$", label: "NT$5000+" };
}

export const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, onClick, onTagClick, onLocationClick, isOwnPost = false }) => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute price info from priceMax
  const priceInfo = getPriceInfo(post.priceMax);

  // Handler for opening Google Maps
  const handleOpenGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = `${post.restaurantName ?? ""} ${post.locationArea ?? ""}`.trim();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      "_blank"
    );
  };

  // Helper function to parse and style hashtags
  const renderContentWithHashtags = (text: string) => {
    const parts = text.split(/(#[\w\u4e00-\u9fa5]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
    return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Open lightbox
  const openLightbox = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to previous image
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  // Navigate to next image
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const maxIndex = (post.images?.length || 1) - 1;
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // ESC key listener for lightbox and menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          closeLightbox();
        }
        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen, menuOpen]);

  return (
    <div
      onClick={(e) => {
        // Close menu if open
        if (menuOpen) {
          setMenuOpen(false);
        }
        // Trigger parent onClick
        if (onClick) {
          onClick();
        }
      }}
      className="group px-4 py-3 border-b border-border-color cursor-pointer hover:bg-bg-hover transition-colors duration-200"
    >
      {/* TOP SECTION: Header Row */}
      <div className="flex items-start mb-2">
        {/* Avatar */}
        <div className="relative mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden">
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
          ) : (
              <span className="text-text-primary text-lg">👤</span>
          )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          {/* Line 1: Name, Username, Time + More Menu (right-aligned) */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline flex-wrap gap-1 text-sm">
              <span className="font-bold text-text-primary">
              {post.author.displayName}
            </span>
              <span className="text-text-secondary">
                {post.author.handle}
              </span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">
                {post.createdAt}
              </span>
            </div>
            
            {/* Right-aligned: More menu (...) with dropdown */}
            <div className="relative flex-shrink-0">
              <button
                className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer text-text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-neutral-200 z-20 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isOwnPost ? (
                    <>
                      <MenuActionItem
                        icon={<Edit3 className="w-4 h-4" />}
                        label="Edit this post"
                        onClick={() => {
                          console.log('Edit post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Archive className="w-4 h-4" />}
                        label="Archive this post"
                        onClick={() => {
                          console.log('Archive post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete this post"
                        destructive
                        onClick={() => {
                          console.log('Delete post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <MenuActionItem
                        icon={<Bookmark className="w-4 h-4" />}
                        label="Save this post"
                        onClick={() => {
                          console.log('Save post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Flag className="w-4 h-4" />}
                        label="Report this post"
                        destructive
                        onClick={() => {
                          console.log('Report post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Line 2: Three Separate Pills - Restaurant+Location, Style Type, Food Type */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {/* Chip 1: Restaurant + Location */}
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer group-hover:bg-neutral-50 transition-colors"
              onClick={handleOpenGoogleMaps}
            >
              {(post.locationArea || (post as any).region) && (
                <>
                  <span className="text-text-secondary">
                    {(post as any).region || post.locationArea}
                  </span>
                  <span className="text-gray-300">|</span>
                </>
              )}
              <span className="font-medium text-text-primary">
                {post.restaurantName}
              </span>
            </button>

            {/* Chip 2: Style Type (Cuisine) - use styleType if available, otherwise use board if it's cuisine */}
            {(post.styleType || (post.board?.category === 'cuisine' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.styleType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.styleType || post.board?.label}
                </span>
              </button>
            )}

            {/* Chip 3: Food Type - use foodType if available, otherwise use board if it's type */}
            {(post.foodType || (post.board?.category === 'type' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.foodType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.foodType || post.board?.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Post Content Area */}
      <div className="ml-[52px]">
        {/* RATING ROW (ABOVE content text) */}
        <div className="mt-1 flex items-center text-sm text-text-secondary">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(post.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Numeric rating */}
          <span className="ml-2 font-semibold text-text-primary">
            {post.rating.toFixed(1)}
          </span>

          {/* Dot separator */}
          <span className="mx-2 text-text-secondary/60">·</span>

          {/* Price Symbols + Range */}
          {priceInfo.symbols && (
            <>
              <span className="font-semibold text-text-primary">{priceInfo.symbols}</span>
              <span className="ml-2 text-xs text-text-secondary">{priceInfo.label}</span>
            </>
          )}
        </div>

        {/* CONTENT TEXT with hashtag styling */}
        <p className="mt-3 text-base text-text-primary leading-relaxed mb-3">
          {renderContentWithHashtags(post.contentSnippet)}
        </p>

        {/* IMAGE GALLERY */}
        {/* PRODUCTION NOTE: Images should be uploaded to cloud storage (AWS S3, GCS, Firebase Storage) 
            and URLs stored in database. Never rely on direct Unsplash/external hotlinks in production. */}
        {(post.images && post.images.length > 0) ? (
          <div className="mb-3 -mx-4">
            <div 
              className="flex overflow-x-auto scroll-smooth px-4 gap-3"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {post.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden border border-border-color group cursor-pointer snap-center"
                  style={{
                    width: post.images!.length === 1 ? 'calc(100% - 2rem)' : '85%',
                    height: '300px',
                  }}
                  onClick={(e) => openLightbox(index, e)}
                >
                  <img
                    src={imageUrl}
                    alt={`${post.restaurantName} - ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {/* Image counter badge - HOVER ONLY */}
                  {post.images!.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}/{post.images!.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Hide scrollbar CSS-in-JS */}
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : post.imageUrl ? (
          // Legacy single image support
          <div 
            className="rounded-xl overflow-hidden border border-border-color mb-3 cursor-pointer group"
            onClick={(e) => openLightbox(0, e)}
          >
            <img 
              src={post.imageUrl} 
              alt={post.restaurantName}
              className="w-full h-[300px] object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ) : null}

        {/* BOTTOM ACTION BAR - Like, Comment, Share, Save */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          <PostActions
            postId={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            onLike={(id) => console.log('like post', id)}
            onComment={(id) => console.log('comment post', id)}
            onShare={(id) => console.log('share post', id)}
          />
          
          {/* Save restaurant location (map pin) - Review posts only */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('save restaurant location', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          {/* Modal Content */}
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* Main Image */}
            <img
              src={(post.images && post.images[activeIndex]) || post.imageUrl || ''}
              alt={`${post.restaurantName} - ${activeIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            {post.images && post.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                {activeIndex + 1} / {post.images.length}
              </div>
            )}

            {/* Previous Arrow */}
            {post.images && post.images.length > 1 && activeIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {post.images && post.images.length > 1 && activeIndex < post.images.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { ReviewPost } from '../../types/models';
import { Edit3, Archive, Trash2, Bookmark, Flag } from 'lucide-react';
import { PostActions } from './PostActions';

interface ReviewPostCardProps {
  post: ReviewPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
  onLocationClick?: (location: { name: string; address?: string; lat: number; lng: number }) => void;
  isOwnPost?: boolean;
}

interface MenuActionItemProps {
  icon: React.ReactNode;
  label: string;
  destructive?: boolean;
  onClick?: () => void;
}

const MenuActionItem: React.FC<MenuActionItemProps> = ({
  icon,
  label,
  destructive,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
      destructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-800 hover:bg-gray-50'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

// Helper function to map priceMax to symbols and label
function getPriceInfo(maxPrice: number | null | undefined) {
  if (maxPrice == null) {
    return { symbols: "", label: "" };
  }

  if (maxPrice <= 300) {
    return { symbols: "$", label: "NT$0–300" };
  }

  if (maxPrice <= 1000) {
    return { symbols: "$$", label: "NT$301–1000" };
  }

  if (maxPrice <= 5000) {
    return { symbols: "$$$", label: "NT$1001–5000" };
  }

  // 5000+
  return { symbols: "$$$$$", label: "NT$5000+" };
}

export const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, onClick, onTagClick, onLocationClick, isOwnPost = false }) => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute price info from priceMax
  const priceInfo = getPriceInfo(post.priceMax);

  // Handler for opening Google Maps or selecting location
  const handleOpenGoogleMaps = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If location click handler is provided and we have coordinates, use it
    if (onLocationClick && post.restaurantLat && post.restaurantLng) {
      onLocationClick({
        name: post.restaurantName,
        address: post.restaurantAddress,
        lat: post.restaurantLat,
        lng: post.restaurantLng,
      });
    } else {
      // Fallback to opening Google Maps
      const query = `${post.restaurantName ?? ""} ${post.locationArea ?? ""}`.trim();
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
        "_blank"
      );
    }
  };

  // Helper function to parse and style hashtags
  const renderContentWithHashtags = (text: string) => {
    const parts = text.split(/(#[\w\u4e00-\u9fa5]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
    return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Open lightbox
  const openLightbox = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to previous image
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  // Navigate to next image
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const maxIndex = (post.images?.length || 1) - 1;
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // ESC key listener for lightbox and menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          closeLightbox();
        }
        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen, menuOpen]);

  return (
    <div
      onClick={(e) => {
        // Close menu if open
        if (menuOpen) {
          setMenuOpen(false);
        }
        // Trigger parent onClick
        if (onClick) {
          onClick();
        }
      }}
      className="group px-4 py-3 border-b border-border-color cursor-pointer hover:bg-bg-hover transition-colors duration-200"
    >
      {/* TOP SECTION: Header Row */}
      <div className="flex items-start mb-2">
        {/* Avatar */}
        <div className="relative mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden">
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
          ) : (
              <span className="text-text-primary text-lg">👤</span>
          )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          {/* Line 1: Name, Username, Time + More Menu (right-aligned) */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline flex-wrap gap-1 text-sm">
              <span className="font-bold text-text-primary">
              {post.author.displayName}
            </span>
              <span className="text-text-secondary">
                {post.author.handle}
              </span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">
                {post.createdAt}
              </span>
            </div>
            
            {/* Right-aligned: More menu (...) with dropdown */}
            <div className="relative flex-shrink-0">
              <button
                className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer text-text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-neutral-200 z-20 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isOwnPost ? (
                    <>
                      <MenuActionItem
                        icon={<Edit3 className="w-4 h-4" />}
                        label="Edit this post"
                        onClick={() => {
                          console.log('Edit post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Archive className="w-4 h-4" />}
                        label="Archive this post"
                        onClick={() => {
                          console.log('Archive post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete this post"
                        destructive
                        onClick={() => {
                          console.log('Delete post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <MenuActionItem
                        icon={<Bookmark className="w-4 h-4" />}
                        label="Save this post"
                        onClick={() => {
                          console.log('Save post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Flag className="w-4 h-4" />}
                        label="Report this post"
                        destructive
                        onClick={() => {
                          console.log('Report post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Line 2: Three Separate Pills - Restaurant+Location, Style Type, Food Type */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {/* Chip 1: Restaurant + Location */}
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer group-hover:bg-neutral-50 transition-colors"
              onClick={handleOpenGoogleMaps}
            >
              {(post.locationArea || (post as any).region) && (
                <>
                  <span className="text-text-secondary">
                    {(post as any).region || post.locationArea}
                  </span>
                  <span className="text-gray-300">|</span>
                </>
              )}
              <span className="font-medium text-text-primary">
                {post.restaurantName}
              </span>
            </button>

            {/* Chip 2: Style Type (Cuisine) - use styleType if available, otherwise use board if it's cuisine */}
            {(post.styleType || (post.board?.category === 'cuisine' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.styleType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.styleType || post.board?.label}
                </span>
              </button>
            )}

            {/* Chip 3: Food Type - use foodType if available, otherwise use board if it's type */}
            {(post.foodType || (post.board?.category === 'type' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.foodType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.foodType || post.board?.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Post Content Area */}
      <div className="ml-[52px]">
        {/* RATING ROW (ABOVE content text) */}
        <div className="mt-1 flex items-center text-sm text-text-secondary">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(post.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Numeric rating */}
          <span className="ml-2 font-semibold text-text-primary">
            {post.rating.toFixed(1)}
          </span>

          {/* Dot separator */}
          <span className="mx-2 text-text-secondary/60">·</span>

          {/* Price Symbols + Range */}
          {priceInfo.symbols && (
            <>
              <span className="font-semibold text-text-primary">{priceInfo.symbols}</span>
              <span className="ml-2 text-xs text-text-secondary">{priceInfo.label}</span>
            </>
          )}
        </div>

        {/* CONTENT TEXT with hashtag styling */}
        <p className="mt-3 text-base text-text-primary leading-relaxed mb-3">
          {renderContentWithHashtags(post.contentSnippet)}
        </p>

        {/* IMAGE GALLERY */}
        {/* PRODUCTION NOTE: Images should be uploaded to cloud storage (AWS S3, GCS, Firebase Storage) 
            and URLs stored in database. Never rely on direct Unsplash/external hotlinks in production. */}
        {(post.images && post.images.length > 0) ? (
          <div className="mb-3 -mx-4">
            <div 
              className="flex overflow-x-auto scroll-smooth px-4 gap-3"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {post.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden border border-border-color group cursor-pointer snap-center"
                  style={{
                    width: post.images!.length === 1 ? 'calc(100% - 2rem)' : '85%',
                    height: '300px',
                  }}
                  onClick={(e) => openLightbox(index, e)}
                >
                  <img
                    src={imageUrl}
                    alt={`${post.restaurantName} - ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {/* Image counter badge - HOVER ONLY */}
                  {post.images!.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}/{post.images!.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Hide scrollbar CSS-in-JS */}
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : post.imageUrl ? (
          // Legacy single image support
          <div 
            className="rounded-xl overflow-hidden border border-border-color mb-3 cursor-pointer group"
            onClick={(e) => openLightbox(0, e)}
          >
            <img 
              src={post.imageUrl} 
              alt={post.restaurantName}
              className="w-full h-[300px] object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ) : null}

        {/* BOTTOM ACTION BAR - Like, Comment, Share, Save */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          <PostActions
            postId={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            onLike={(id) => console.log('like post', id)}
            onComment={(id) => console.log('comment post', id)}
            onShare={(id) => console.log('share post', id)}
          />
          
          {/* Save restaurant location (map pin) - Review posts only */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('save restaurant location', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          {/* Modal Content */}
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* Main Image */}
            <img
              src={(post.images && post.images[activeIndex]) || post.imageUrl || ''}
              alt={`${post.restaurantName} - ${activeIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            {post.images && post.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                {activeIndex + 1} / {post.images.length}
              </div>
            )}

            {/* Previous Arrow */}
            {post.images && post.images.length > 1 && activeIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {post.images && post.images.length > 1 && activeIndex < post.images.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { fetchBoards, fetchPosts, createMeetupPost } from '../api/mock';
import { fetchRecommendedUsers } from '../api/mockProfile';
import { RestaurantLocation } from '../types/location';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { ReviewPostComposer, ReviewPostFormValues } from '../components/posts/ReviewPostComposer';
import { DiningMeetupComposer, DiningMeetupFormValues } from '../components/posts/DiningMeetupComposer';
import { PostTypeModal } from '../components/modals/PostTypeModal';
import { PostModal } from '../components/modals/PostModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { SmallMap } from '../components/homepage/SmallMap';

// Active Filters Type (single-select per group)
type ActiveFilters = {
  searchQuery: string;
  style: string | null;      // single style key or null
  category: string | null;   // single category key or null
  priceMin: number | null;
  priceMax: number | null;
  ratingAtLeast: number | null;
  distanceKm: number | null;
};

export const RendezvousHome: React.FC = () => {
  // State
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'meetups'>('reviews');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMeetupComposerOpen, setIsMeetupComposerOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  type PostType = 'review' | 'meetup';
  const [postType, setPostType] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Centralized filter state
  const [filters, setFilters] = useState<ActiveFilters>({
    searchQuery: '',
    style: null,
    category: null,
    priceMin: null,
    priceMax: null,
    ratingAtLeast: null,
    distanceKm: null,
  });

  // Filter updaters
  const updateSearchQuery = (q: string) =>
    setFilters((f) => ({ ...f, searchQuery: q }));

  const updateStyle = (style: string | null) =>
    setFilters((f) => ({ ...f, style }));

  const updateCategory = (category: string | null) =>
    setFilters((f) => ({ ...f, category }));

  const updatePrice = (min: number | '', max: number | '') =>
    setFilters((f) => ({
      ...f,
      priceMin: min === '' ? null : min,
      priceMax: max === '' ? null : max,
    }));

  const applyPrice = (min: number, max: number) =>
    setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));

  const updateRating = (rating: number | null) =>
    setFilters((f) => ({ ...f, ratingAtLeast: rating }));

  const updateDistance = (km: number | '') =>
    setFilters((f) => ({ ...f, distanceKm: km === '' ? null : km }));

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [boardsData, postsData] = await Promise.all([
          fetchBoards(),
          fetchPosts(),
        ]);
        setBoards(boardsData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Lock body scroll when any post modal is open
  // Note: PostModal component handles its own scroll lock, but we keep this for legacy modals
  useEffect(() => {
    const isAnyModalOpen = isPostModalOpen || isMeetupComposerOpen || isReviewModalOpen;
    
    if (isAnyModalOpen) {
      // Save original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyOverflowY = document.body.style.overflowY;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlOverflowY = document.documentElement.style.overflowY;
      
      // Disable scroll on both body and html
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      
      // Restore original overflow when modal closes
      return () => {
        // Restore original values (empty string restores default scrolling behavior)
        document.body.style.overflow = originalBodyOverflow || '';
        document.body.style.overflowY = originalBodyOverflowY || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
        document.documentElement.style.overflowY = originalHtmlOverflowY || '';
      };
    } else {
      // Ensure scrolling is enabled when no modals are open
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    }
  }, [isPostModalOpen, isMeetupComposerOpen, isReviewModalOpen]);

  // Helper: Check if text matches search query (for review posts)
  const matchesText = React.useCallback((post: ReviewPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, content and tags
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationArea?.toLowerCase().includes(text)) return true;
    if (post.contentSnippet?.toLowerCase().includes(text)) return true;
    if (post.styleType?.toLowerCase().includes(text)) return true;
    if (post.foodType?.toLowerCase().includes(text)) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if meetup post text matches search query
  const matchesMeetupText = React.useCallback((post: MeetupPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, description, tags, and author
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationText?.toLowerCase().includes(text)) return true;
    if (post.description?.toLowerCase().includes(text)) return true;
    if (post.foodTags?.some(tag => tag.toLowerCase().includes(text))) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if post passes all active filters
  const passesFilters = React.useCallback((post: ReviewPost, filters: ActiveFilters): boolean => {
    // 1) Search text
    if (!matchesText(post, filters.searchQuery)) return false;

    // 2) Style (single-select)
    if (filters.style) {
      if (!post.styleType || post.styleType !== filters.style) {
        return false;
      }
    }

    // 3) Category (single-select)
    if (filters.category) {
      if (!post.foodType || post.foodType !== filters.category) {
        return false;
      }
    }

    // 4) Price
    if (filters.priceMin != null || filters.priceMax != null) {
      const maxPrice = post.priceMax;
      if (maxPrice == null) return false;
      if (filters.priceMin != null && maxPrice < filters.priceMin) return false;
      if (filters.priceMax != null && maxPrice > filters.priceMax) return false;
    }

    // 5) Rating
    if (filters.ratingAtLeast != null) {
      if (post.rating == null) return false;
      if (post.rating < filters.ratingAtLeast) return false;
    }

    // 6) Near Me distance (skip for now if not available)
    if (filters.distanceKm != null) {
      // Distance filtering would go here if we had location data
      // For now, we'll skip this as posts don't have distanceKm field
    }

    return true;
  }, [matchesText]);

  // Filter posts based on active tab, board, feed filter, and ALL active filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by tab
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post): post is ReviewPost => post.type === 'review');
    } else {
      filtered = filtered.filter((post): post is MeetupPost => post.type === 'meetup');
    }

    // Filter by board (only if board exists on post)
    if (selectedBoardId !== null) {
      filtered = filtered.filter(post => {
        if (post.type === 'review') {
          return post.board.id === selectedBoardId;
        } else {
          // For meetup posts, board is optional, so check if it exists and matches
          return post.board?.id === selectedBoardId;
        }
      });
    }

    // Filter by following
    if (feedFilter === 'following') {
      filtered = filtered.filter(post => post.isFromFollowedUser === true);
    }

    // Apply comprehensive filters
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post) => passesFilters(post as ReviewPost, filters));
    } else {
      // For meetup posts, apply basic search filter
      if (filters.searchQuery) {
        filtered = filtered.filter((post) => matchesMeetupText(post as MeetupPost, filters.searchQuery));
      }
    }

    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, filters, passesFilters, matchesMeetupText]);

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: In the future, this will navigate to a post detail page
    // TODO: The detail page will show full content, comments, etc.
  };

  const handleSearchFromTag = (tag: string) => {
    updateSearchQuery(tag);
    // The filtering will happen automatically via the filteredPosts useMemo
  };

  const handlePostTypeSelect = (type: 'review' | 'meetup') => {
    console.log(`User wants to create a ${type} post`);
    // TODO: In the future, this will open a form modal
    // TODO: The form will submit to the backend API
  };

  // Current user (mock - in real app, get from auth context)
  const currentUser: User = {
    id: 'me',
    displayName: 'Philip',
    handle: '@philip',
    avatarUrl: '/images/default-avatar.png',
    isFollowedByCurrentUser: false, // User doesn't follow themselves
  };

  // Handler to create a new review post from form values
  const handleCreateReviewPost = (values: ReviewPostFormValues) => {
    const now = new Date();

    // Find the style board (cuisine category)
    const styleBoard = boards.find(b => b.id === values.styleTags[0] && b.category === 'cuisine');
    // Find the category board (type category) for foodType
    const categoryBoard = boards.find(b => b.id === values.categoryTags[0] && b.category === 'type');

    // Derive priceLevel from price range
    let priceLevel: '$' | '$$' | '$$$' = '$';
    if (values.priceMax !== null && values.priceMax !== undefined) {
      if (values.priceMax <= 200) {
        priceLevel = '$';
      } else if (values.priceMax <= 500) {
        priceLevel = '$$';
      } else {
        priceLevel = '$$$';
      }
    } else if (values.priceMin !== null && values.priceMin !== undefined) {
      if (values.priceMin > 500) {
        priceLevel = '$$$';
      } else if (values.priceMin > 200) {
        priceLevel = '$$';
      }
    }

    // Extract locationArea from locationDisplayName
    // Format: "大安區 | 好吃炒飯" or just "好吃炒飯"
    const locationDisplayParts = values.locationDisplayName.split(' | ');
    const locationArea = locationDisplayParts.length > 1 
      ? locationDisplayParts[0]  // e.g. "大安區"
      : 'Taipei'; // Default if no region in display name

    // Convert photo files to image URLs (object URLs for immediate display)
    const imageUrls = values.photoFiles.map((file) => URL.createObjectURL(file));

    const newPost: ReviewPost = {
      id: `local-${now.getTime()}`,
      type: 'review',
      author: currentUser,
      restaurantName: values.restaurantName,
      board: styleBoard || boards[0], // Fallback to first board if not found
      styleType: styleBoard?.label,
      foodType: categoryBoard?.label,
      title: values.restaurantName, // Use restaurant name as title for now
      contentSnippet: values.content.length > 100 
        ? values.content.substring(0, 100) + '...' 
        : values.content,
      rating: values.rating,
      priceLevel,
      priceMax: values.priceMax ?? undefined,
      locationArea,
      createdAt: now.toISOString(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      images: imageUrls.length > 0 ? imageUrls : undefined,
      imageUrl: imageUrls[0], // Legacy support
      isFromFollowedUser: feedFilter === 'following',
    };

    // Add the new post to the beginning of the posts array
    setPosts((prev) => [newPost, ...prev]);

    // Optional: scroll to the top of the feed smoothly after posting
    const feedTop = document.getElementById('review-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler to create a new meetup post from form values
  const handleCreateMeetupPost = async (values: DiningMeetupFormValues) => {
    try {
      // Call the API to create the post
      const createdPost = await createMeetupPost(values);
      
      // Convert API response to MeetupPost format
      const now = new Date();
      // Build address from locationText and restaurantName
      const address = `${values.locationText} ${values.restaurantName}`.trim();
      
      const newPost: MeetupPost = {
        id: createdPost.id,
        type: 'meetup',
        author: currentUser,
        restaurantName: values.restaurantName,
        locationText: values.locationText,
        address,
        meetupTime: values.meetupTime,
        foodTags: values.foodTags,
        maxHeadcount: values.maxHeadcount,
        currentHeadcount: values.baseParticipantCount || 1, // Base participants are already "joined"
        budgetDescription: values.budgetDescription,
        hasReservation: values.hasReservation,
        description: values.description,
        visibility: values.visibility,
        imageUrl: values.imageUrl || null,
        status: 'OPEN',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        isFromFollowedUser: feedFilter === 'following',
      };

      // Add the new post to the beginning of the posts array
      setPosts((prev) => [newPost, ...prev]);

      // Close the modal after successful creation
      setIsMeetupComposerOpen(false);

      // Scroll to the top of the feed smoothly after posting
      const feedTop = document.getElementById('review-feed-top');
      if (feedTop) {
        feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error creating meetup post:', error);
      // TODO: Show error message to user
      // Don't close modal on error so user can retry
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Loading...</p>
        </div>
      </div>
    );
  }

      return (
        <div className="h-screen flex flex-col bg-bg-primary transition-colors duration-300">
          <TopNavBar
            searchQuery={filters.searchQuery}
            onSearchChange={updateSearchQuery}
            onPostClick={() => {
              const type: PostType = activeTab === 'reviews' ? 'review' : 'meetup';
              console.log('Post clicked', { activeTab, postTypeNext: type });
              setPostType(type);
              setIsPostModalOpen(true);
            }}
          />

          <div className="flex flex-1 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="flex items-stretch w-full">
              {/* Left Sidebar (Desktop) */}
              <aside className="hidden md:block w-64 bg-bg-tertiary border-r border-border-color transition-colors duration-300 self-stretch">
                <Sidebar
                  boards={boards}
                  selectedBoardId={selectedBoardId}
                  onBoardSelect={setSelectedBoardId}
                  filters={filters}
                  onChangeStyle={updateStyle}
                  onChangeCategory={updateCategory}
                  onChangePrice={updatePrice}
                  onApplyPrice={applyPrice}
                  onChangeRating={updateRating}
                  onChangeNearMe={updateDistance}
                />
              </aside>

              {/* Mobile Board Chips */}
              <MobileBoardChips
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelect={setSelectedBoardId}
              />

              {/* Center Feed */}
              <main className="flex-1 min-w-0 bg-bg-secondary overflow-y-auto scrollbar-hidden">
                {/* Tabs row at the very top of the center column, just under the navbar */}
                <TabSwitcher
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  feedFilter={feedFilter}
                  onFeedFilterChange={setFeedFilter}
                />

                <div className="px-4" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
                  {/* Feed top anchor for scrolling */}
                  <div id="review-feed-top" />
                  
                  {/* Create Post Composer - Different for each tab */}
              {activeTab === 'reviews' ? (
                <section
                  onClick={() => {
                    setIsReviewModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
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
              ) : activeTab === 'meetups' ? (
                <section
                  onClick={() => {
                    const type: PostType = 'meetup';
                    console.log('Meetup composer placeholder clicked', { activeTab, postTypeNext: type });
                    setPostType(type);
                    setIsPostModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
                          'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
                        }
                        alt="Your avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Placeholder Text */}
                    <div className="flex-1 flex items-center">
                      <p className="text-[15px] text-text-secondary">
                        想找一起吃飯的夥伴？分享你的用餐計畫吧…
                      </p>
                    </div>
                  </div>
                </section>
              ) : null}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                filteredPosts.map(post => {
                  if (post.type === 'review') {
                    return (
                      <ReviewPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  } else {
                    return (
                      <MeetupPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  }
                })
              )}
                </div>
              </main>

              {/* Right Column (Placeholder) */}
              <aside className="hidden lg:block w-80 bg-bg-sidebar-right border-l border-border-color transition-colors duration-300 self-stretch">
                <div className="sticky top-0 p-5">
                  <h3 className="text-xl text-text-primary mb-4 tracking-tight" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Coming Soon</h3>
                  <p className="text-base text-text-secondary leading-relaxed" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
                    Map view and restaurant recommendations will appear here.
                  </p>
                  {/* TODO: In the future, this will show:
                      - Interactive map with restaurant locations
                      - Restaurant detail pages
                      - Personalized recommendations based on user preferences
                      - Nearby restaurants based on location
                  */}
                </div>
              </aside>
            </div>
          </div>

          {/* Unified Post Composer Modal */}
      {isPostModalOpen && postType && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
          onClick={() => {
            setIsPostModalOpen(false);
            setPostType(null);
          }}
        >
          <div
            className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] scrollbar-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {postType === 'review' ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary">Create Review Post</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <ReviewPostComposer 
                  initialExpanded={true}
                  currentUser={currentUser}
                  onCreateReviewPost={(values) => {
                    handleCreateReviewPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between p-6 pb-4 border-b border-border-color -m-6 mb-0">
                  <h2 className="text-2xl font-bold text-text-primary">發揪吃飯文</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  </button>
                </div>
                <div className="pt-4">
                <DiningMeetupComposer
                  renderModal={false}
                  currentUser={currentUser}
                  onClose={() => {
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                  onCreateMeetupPost={(values) => {
                    handleCreateMeetupPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Type Modal (fallback for other cases) */}
      <PostTypeModal
        isOpen={isPostModalOpen && postType === null}
        onClose={() => {
          setIsPostModalOpen(false);
          setPostType(null);
        }}
        onSelectType={(type) => {
          setPostType(type);
          // Keep modal open, will show the composer
        }}
      />

      {/* Legacy Dining Meetup Composer Modal (keep for backward compatibility) */}
      <DiningMeetupComposer
        isOpen={isMeetupComposerOpen}
        onClose={() => setIsMeetupComposerOpen(false)}
        onCreateMeetupPost={handleCreateMeetupPost}
      />

      {/* Review Post Composer Modal */}
      <PostModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="新增餐廳評價"
      >
        <ReviewPostComposer
          initialExpanded={true}
          hideCollapseButton={true}
          currentUser={currentUser}
          onCreateReviewPost={(values) => {
            handleCreateReviewPost(values);
            setIsReviewModalOpen(false);
          }}
        />
      </PostModal>
      </div>
    );
  };


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { fetchBoards, fetchPosts, createMeetupPost } from '../api/mock';
import { fetchRecommendedUsers } from '../api/mockProfile';
import { RestaurantLocation } from '../types/location';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { ReviewPostComposer, ReviewPostFormValues } from '../components/posts/ReviewPostComposer';
import { DiningMeetupComposer, DiningMeetupFormValues } from '../components/posts/DiningMeetupComposer';
import { PostTypeModal } from '../components/modals/PostTypeModal';
import { PostModal } from '../components/modals/PostModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { SmallMap } from '../components/homepage/SmallMap';

// Active Filters Type (single-select per group)
type ActiveFilters = {
  searchQuery: string;
  style: string | null;      // single style key or null
  category: string | null;   // single category key or null
  priceMin: number | null;
  priceMax: number | null;
  ratingAtLeast: number | null;
  distanceKm: number | null;
};

export const RendezvousHome: React.FC = () => {
  // State
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'meetups'>('reviews');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMeetupComposerOpen, setIsMeetupComposerOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  type PostType = 'review' | 'meetup';
  const [postType, setPostType] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);

  // Centralized filter state
  const [filters, setFilters] = useState<ActiveFilters>({
    searchQuery: '',
    style: null,
    category: null,
    priceMin: null,
    priceMax: null,
    ratingAtLeast: null,
    distanceKm: null,
  });

  // Filter updaters
  const updateSearchQuery = (q: string) =>
    setFilters((f) => ({ ...f, searchQuery: q }));

  const updateStyle = (style: string | null) =>
    setFilters((f) => ({ ...f, style }));

  const updateCategory = (category: string | null) =>
    setFilters((f) => ({ ...f, category }));

  const updatePrice = (min: number | '', max: number | '') =>
    setFilters((f) => ({
      ...f,
      priceMin: min === '' ? null : min,
      priceMax: max === '' ? null : max,
    }));

  const applyPrice = (min: number, max: number) =>
    setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));

  const updateRating = (rating: number | null) =>
    setFilters((f) => ({ ...f, ratingAtLeast: rating }));

  const updateDistance = (km: number | '') =>
    setFilters((f) => ({ ...f, distanceKm: km === '' ? null : km }));

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [boardsData, postsData] = await Promise.all([
          fetchBoards(),
          fetchPosts(),
        ]);
        setBoards(boardsData);
        setPosts(postsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Lock body scroll when any post modal is open
  // Note: PostModal component handles its own scroll lock, but we keep this for legacy modals
  useEffect(() => {
    const isAnyModalOpen = isPostModalOpen || isMeetupComposerOpen || isReviewModalOpen;
    
    if (isAnyModalOpen) {
      // Save original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyOverflowY = document.body.style.overflowY;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlOverflowY = document.documentElement.style.overflowY;
      
      // Disable scroll on both body and html
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      
      // Restore original overflow when modal closes
      return () => {
        // Restore original values (empty string restores default scrolling behavior)
        document.body.style.overflow = originalBodyOverflow || '';
        document.body.style.overflowY = originalBodyOverflowY || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
        document.documentElement.style.overflowY = originalHtmlOverflowY || '';
      };
    } else {
      // Ensure scrolling is enabled when no modals are open
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    }
  }, [isPostModalOpen, isMeetupComposerOpen, isReviewModalOpen]);

  // Helper: Check if text matches search query (for review posts)
  const matchesText = React.useCallback((post: ReviewPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, content and tags
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationArea?.toLowerCase().includes(text)) return true;
    if (post.contentSnippet?.toLowerCase().includes(text)) return true;
    if (post.styleType?.toLowerCase().includes(text)) return true;
    if (post.foodType?.toLowerCase().includes(text)) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if meetup post text matches search query
  const matchesMeetupText = React.useCallback((post: MeetupPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, description, tags, and author
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationText?.toLowerCase().includes(text)) return true;
    if (post.description?.toLowerCase().includes(text)) return true;
    if (post.foodTags?.some(tag => tag.toLowerCase().includes(text))) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if post passes all active filters
  const passesFilters = React.useCallback((post: ReviewPost, filters: ActiveFilters): boolean => {
    // 1) Search text
    if (!matchesText(post, filters.searchQuery)) return false;

    // 2) Style (single-select)
    if (filters.style) {
      if (!post.styleType || post.styleType !== filters.style) {
        return false;
      }
    }

    // 3) Category (single-select)
    if (filters.category) {
      if (!post.foodType || post.foodType !== filters.category) {
        return false;
      }
    }

    // 4) Price
    if (filters.priceMin != null || filters.priceMax != null) {
      const maxPrice = post.priceMax;
      if (maxPrice == null) return false;
      if (filters.priceMin != null && maxPrice < filters.priceMin) return false;
      if (filters.priceMax != null && maxPrice > filters.priceMax) return false;
    }

    // 5) Rating
    if (filters.ratingAtLeast != null) {
      if (post.rating == null) return false;
      if (post.rating < filters.ratingAtLeast) return false;
    }

    // 6) Near Me distance (skip for now if not available)
    if (filters.distanceKm != null) {
      // Distance filtering would go here if we had location data
      // For now, we'll skip this as posts don't have distanceKm field
    }

    return true;
  }, [matchesText]);

  // Filter posts based on active tab, board, feed filter, and ALL active filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by tab
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post): post is ReviewPost => post.type === 'review');
    } else {
      filtered = filtered.filter((post): post is MeetupPost => post.type === 'meetup');
    }

    // Filter by board (only if board exists on post)
    if (selectedBoardId !== null) {
      filtered = filtered.filter(post => {
        if (post.type === 'review') {
          return post.board.id === selectedBoardId;
        } else {
          // For meetup posts, board is optional, so check if it exists and matches
          return post.board?.id === selectedBoardId;
        }
      });
    }

    // Filter by following
    if (feedFilter === 'following') {
      filtered = filtered.filter(post => post.isFromFollowedUser === true);
    }

    // Apply comprehensive filters
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post) => passesFilters(post as ReviewPost, filters));
    } else {
      // For meetup posts, apply basic search filter
      if (filters.searchQuery) {
        filtered = filtered.filter((post) => matchesMeetupText(post as MeetupPost, filters.searchQuery));
      }
    }

    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, filters, passesFilters, matchesMeetupText]);

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: In the future, this will navigate to a post detail page
    // TODO: The detail page will show full content, comments, etc.
  };

  const handleSearchFromTag = (tag: string) => {
    updateSearchQuery(tag);
    // The filtering will happen automatically via the filteredPosts useMemo
  };

  const handlePostTypeSelect = (type: 'review' | 'meetup') => {
    console.log(`User wants to create a ${type} post`);
    // TODO: In the future, this will open a form modal
    // TODO: The form will submit to the backend API
  };

  // Current user (mock - in real app, get from auth context)
  const currentUser: User = {
    id: 'me',
    displayName: 'Philip',
    handle: '@philip',
    avatarUrl: '/images/default-avatar.png',
    isFollowedByCurrentUser: false, // User doesn't follow themselves
  };

  // Handler to create a new review post from form values
  const handleCreateReviewPost = (values: ReviewPostFormValues) => {
    const now = new Date();

    // Find the style board (cuisine category)
    const styleBoard = boards.find(b => b.id === values.styleTags[0] && b.category === 'cuisine');
    // Find the category board (type category) for foodType
    const categoryBoard = boards.find(b => b.id === values.categoryTags[0] && b.category === 'type');

    // Derive priceLevel from price range
    let priceLevel: '$' | '$$' | '$$$' = '$';
    if (values.priceMax !== null && values.priceMax !== undefined) {
      if (values.priceMax <= 200) {
        priceLevel = '$';
      } else if (values.priceMax <= 500) {
        priceLevel = '$$';
      } else {
        priceLevel = '$$$';
      }
    } else if (values.priceMin !== null && values.priceMin !== undefined) {
      if (values.priceMin > 500) {
        priceLevel = '$$$';
      } else if (values.priceMin > 200) {
        priceLevel = '$$';
      }
    }

    // Extract locationArea from locationDisplayName
    // Format: "大安區 | 好吃炒飯" or just "好吃炒飯"
    const locationDisplayParts = values.locationDisplayName.split(' | ');
    const locationArea = locationDisplayParts.length > 1 
      ? locationDisplayParts[0]  // e.g. "大安區"
      : 'Taipei'; // Default if no region in display name

    // Convert photo files to image URLs (object URLs for immediate display)
    const imageUrls = values.photoFiles.map((file) => URL.createObjectURL(file));

    const newPost: ReviewPost = {
      id: `local-${now.getTime()}`,
      type: 'review',
      author: currentUser,
      restaurantName: values.restaurantName,
      board: styleBoard || boards[0], // Fallback to first board if not found
      styleType: styleBoard?.label,
      foodType: categoryBoard?.label,
      title: values.restaurantName, // Use restaurant name as title for now
      contentSnippet: values.content.length > 100 
        ? values.content.substring(0, 100) + '...' 
        : values.content,
      rating: values.rating,
      priceLevel,
      priceMax: values.priceMax ?? undefined,
      locationArea,
      createdAt: now.toISOString(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      images: imageUrls.length > 0 ? imageUrls : undefined,
      imageUrl: imageUrls[0], // Legacy support
      isFromFollowedUser: feedFilter === 'following',
    };

    // Add the new post to the beginning of the posts array
    setPosts((prev) => [newPost, ...prev]);

    // Optional: scroll to the top of the feed smoothly after posting
    const feedTop = document.getElementById('review-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler to create a new meetup post from form values
  const handleCreateMeetupPost = async (values: DiningMeetupFormValues) => {
    try {
      // Call the API to create the post
      const createdPost = await createMeetupPost(values);
      
      // Convert API response to MeetupPost format
      const now = new Date();
      // Build address from locationText and restaurantName
      const address = `${values.locationText} ${values.restaurantName}`.trim();
      
      const newPost: MeetupPost = {
        id: createdPost.id,
        type: 'meetup',
        author: currentUser,
        restaurantName: values.restaurantName,
        locationText: values.locationText,
        address,
        meetupTime: values.meetupTime,
        foodTags: values.foodTags,
        maxHeadcount: values.maxHeadcount,
        currentHeadcount: values.baseParticipantCount || 1, // Base participants are already "joined"
        budgetDescription: values.budgetDescription,
        hasReservation: values.hasReservation,
        description: values.description,
        visibility: values.visibility,
        imageUrl: values.imageUrl || null,
        status: 'OPEN',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        isFromFollowedUser: feedFilter === 'following',
      };

      // Add the new post to the beginning of the posts array
      setPosts((prev) => [newPost, ...prev]);

      // Close the modal after successful creation
      setIsMeetupComposerOpen(false);

      // Scroll to the top of the feed smoothly after posting
      const feedTop = document.getElementById('review-feed-top');
      if (feedTop) {
        feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error creating meetup post:', error);
      // TODO: Show error message to user
      // Don't close modal on error so user can retry
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Loading...</p>
        </div>
      </div>
    );
  }

      return (
        <div className="h-screen flex flex-col bg-bg-primary transition-colors duration-300">
          <TopNavBar
            searchQuery={filters.searchQuery}
            onSearchChange={updateSearchQuery}
            onPostClick={() => {
              const type: PostType = activeTab === 'reviews' ? 'review' : 'meetup';
              console.log('Post clicked', { activeTab, postTypeNext: type });
              setPostType(type);
              setIsPostModalOpen(true);
            }}
          />

          <div className="flex flex-1 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="flex items-stretch w-full">
              {/* Left Sidebar (Desktop) */}
              <aside className="hidden md:block w-64 bg-bg-tertiary border-r border-border-color transition-colors duration-300 self-stretch">
                <Sidebar
                  boards={boards}
                  selectedBoardId={selectedBoardId}
                  onBoardSelect={setSelectedBoardId}
                  filters={filters}
                  onChangeStyle={updateStyle}
                  onChangeCategory={updateCategory}
                  onChangePrice={updatePrice}
                  onApplyPrice={applyPrice}
                  onChangeRating={updateRating}
                  onChangeNearMe={updateDistance}
                />
              </aside>

              {/* Mobile Board Chips */}
              <MobileBoardChips
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelect={setSelectedBoardId}
              />

              {/* Center Feed */}
              <main className="flex-1 min-w-0 bg-bg-secondary overflow-y-auto scrollbar-hidden">
                {/* Tabs row at the very top of the center column, just under the navbar */}
                <TabSwitcher
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  feedFilter={feedFilter}
                  onFeedFilterChange={setFeedFilter}
                />

                <div className="px-4" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
                  {/* Feed top anchor for scrolling */}
                  <div id="review-feed-top" />
                  
                  {/* Create Post Composer - Different for each tab */}
              {activeTab === 'reviews' ? (
                <section
                  onClick={() => {
                    setIsReviewModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
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
              ) : activeTab === 'meetups' ? (
                <section
                  onClick={() => {
                    const type: PostType = 'meetup';
                    console.log('Meetup composer placeholder clicked', { activeTab, postTypeNext: type });
                    setPostType(type);
                    setIsPostModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
                          'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
                        }
                        alt="Your avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Placeholder Text */}
                    <div className="flex-1 flex items-center">
                      <p className="text-[15px] text-text-secondary">
                        想找一起吃飯的夥伴？分享你的用餐計畫吧…
                      </p>
                    </div>
                  </div>
                </section>
              ) : null}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                filteredPosts.map(post => {
                  if (post.type === 'review') {
                    return (
                      <ReviewPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  } else {
                    return (
                      <MeetupPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  }
                })
              )}
                </div>
              </main>

              {/* Right Column (Placeholder) */}
              <aside className="hidden lg:block w-80 bg-bg-sidebar-right border-l border-border-color transition-colors duration-300 self-stretch">
                <div className="sticky top-0 p-5">
                  <h3 className="text-xl text-text-primary mb-4 tracking-tight" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Coming Soon</h3>
                  <p className="text-base text-text-secondary leading-relaxed" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
                    Map view and restaurant recommendations will appear here.
                  </p>
                  {/* TODO: In the future, this will show:
                      - Interactive map with restaurant locations
                      - Restaurant detail pages
                      - Personalized recommendations based on user preferences
                      - Nearby restaurants based on location
                  */}
                </div>
              </aside>
            </div>
          </div>

          {/* Unified Post Composer Modal */}
      {isPostModalOpen && postType && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
          onClick={() => {
            setIsPostModalOpen(false);
            setPostType(null);
          }}
        >
          <div
            className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] scrollbar-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {postType === 'review' ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary">Create Review Post</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <ReviewPostComposer 
                  initialExpanded={true}
                  currentUser={currentUser}
                  onCreateReviewPost={(values) => {
                    handleCreateReviewPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between p-6 pb-4 border-b border-border-color -m-6 mb-0">
                  <h2 className="text-2xl font-bold text-text-primary">發揪吃飯文</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  </button>
                </div>
                <div className="pt-4">
                <DiningMeetupComposer
                  renderModal={false}
                  currentUser={currentUser}
                  onClose={() => {
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                  onCreateMeetupPost={(values) => {
                    handleCreateMeetupPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Type Modal (fallback for other cases) */}
      <PostTypeModal
        isOpen={isPostModalOpen && postType === null}
        onClose={() => {
          setIsPostModalOpen(false);
          setPostType(null);
        }}
        onSelectType={(type) => {
          setPostType(type);
          // Keep modal open, will show the composer
        }}
      />

      {/* Legacy Dining Meetup Composer Modal (keep for backward compatibility) */}
      <DiningMeetupComposer
        isOpen={isMeetupComposerOpen}
        onClose={() => setIsMeetupComposerOpen(false)}
        onCreateMeetupPost={handleCreateMeetupPost}
      />

      {/* Review Post Composer Modal */}
      <PostModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="新增餐廳評價"
      >
        <ReviewPostComposer
          initialExpanded={true}
          hideCollapseButton={true}
          currentUser={currentUser}
          onCreateReviewPost={(values) => {
            handleCreateReviewPost(values);
            setIsReviewModalOpen(false);
          }}
        />
      </PostModal>
      </div>
    );
  };


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { fetchBoards, fetchPosts, createMeetupPost } from '../api/mock';
import { fetchRecommendedUsers } from '../api/mockProfile';
import { RestaurantLocation } from '../types/location';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { ReviewPostComposer, ReviewPostFormValues } from '../components/posts/ReviewPostComposer';
import { DiningMeetupComposer, DiningMeetupFormValues } from '../components/posts/DiningMeetupComposer';
import { PostTypeModal } from '../components/modals/PostTypeModal';
import { PostModal } from '../components/modals/PostModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { SmallMap } from '../components/homepage/SmallMap';

// Active Filters Type (single-select per group)
type ActiveFilters = {
  searchQuery: string;
  style: string | null;      // single style key or null
  category: string | null;   // single category key or null
  priceMin: number | null;
  priceMax: number | null;
  ratingAtLeast: number | null;
  distanceKm: number | null;
};

export const RendezvousHome: React.FC = () => {
  // State
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'meetups'>('reviews');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMeetupComposerOpen, setIsMeetupComposerOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  type PostType = 'review' | 'meetup';
  const [postType, setPostType] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);

  // Centralized filter state
  const [filters, setFilters] = useState<ActiveFilters>({
    searchQuery: '',
    style: null,
    category: null,
    priceMin: null,
    priceMax: null,
    ratingAtLeast: null,
    distanceKm: null,
  });

  // Filter updaters
  const updateSearchQuery = (q: string) =>
    setFilters((f) => ({ ...f, searchQuery: q }));

  const updateStyle = (style: string | null) =>
    setFilters((f) => ({ ...f, style }));

  const updateCategory = (category: string | null) =>
    setFilters((f) => ({ ...f, category }));

  const updatePrice = (min: number | '', max: number | '') =>
    setFilters((f) => ({
      ...f,
      priceMin: min === '' ? null : min,
      priceMax: max === '' ? null : max,
    }));

  const applyPrice = (min: number, max: number) =>
    setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));

  const updateRating = (rating: number | null) =>
    setFilters((f) => ({ ...f, ratingAtLeast: rating }));

  const updateDistance = (km: number | '') =>
    setFilters((f) => ({ ...f, distanceKm: km === '' ? null : km }));

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [boardsData, postsData, recommended] = await Promise.all([
          fetchBoards(),
          fetchPosts(),
          fetchRecommendedUsers(),
        ]);
        setBoards(boardsData);
        setPosts(postsData);
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle location selection from post cards
  const handleLocationSelect = (location: { name: string; address?: string; lat: number; lng: number }) => {
    setSelectedLocation({
      name: location.name,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    });
  };

  // Lock body scroll when any post modal is open
  // Note: PostModal component handles its own scroll lock, but we keep this for legacy modals
  useEffect(() => {
    const isAnyModalOpen = isPostModalOpen || isMeetupComposerOpen || isReviewModalOpen;
    
    if (isAnyModalOpen) {
      // Save original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyOverflowY = document.body.style.overflowY;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlOverflowY = document.documentElement.style.overflowY;
      
      // Disable scroll on both body and html
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      
      // Restore original overflow when modal closes
      return () => {
        // Restore original values (empty string restores default scrolling behavior)
        document.body.style.overflow = originalBodyOverflow || '';
        document.body.style.overflowY = originalBodyOverflowY || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
        document.documentElement.style.overflowY = originalHtmlOverflowY || '';
      };
    } else {
      // Ensure scrolling is enabled when no modals are open
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    }
  }, [isPostModalOpen, isMeetupComposerOpen, isReviewModalOpen]);

  // Helper: Check if text matches search query (for review posts)
  const matchesText = React.useCallback((post: ReviewPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, content and tags
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationArea?.toLowerCase().includes(text)) return true;
    if (post.contentSnippet?.toLowerCase().includes(text)) return true;
    if (post.styleType?.toLowerCase().includes(text)) return true;
    if (post.foodType?.toLowerCase().includes(text)) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if meetup post text matches search query
  const matchesMeetupText = React.useCallback((post: MeetupPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, description, tags, and author
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationText?.toLowerCase().includes(text)) return true;
    if (post.description?.toLowerCase().includes(text)) return true;
    if (post.foodTags?.some(tag => tag.toLowerCase().includes(text))) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if post passes all active filters
  const passesFilters = React.useCallback((post: ReviewPost, filters: ActiveFilters): boolean => {
    // 1) Search text
    if (!matchesText(post, filters.searchQuery)) return false;

    // 2) Style (single-select)
    if (filters.style) {
      if (!post.styleType || post.styleType !== filters.style) {
        return false;
      }
    }

    // 3) Category (single-select)
    if (filters.category) {
      if (!post.foodType || post.foodType !== filters.category) {
        return false;
      }
    }

    // 4) Price
    if (filters.priceMin != null || filters.priceMax != null) {
      const maxPrice = post.priceMax;
      if (maxPrice == null) return false;
      if (filters.priceMin != null && maxPrice < filters.priceMin) return false;
      if (filters.priceMax != null && maxPrice > filters.priceMax) return false;
    }

    // 5) Rating
    if (filters.ratingAtLeast != null) {
      if (post.rating == null) return false;
      if (post.rating < filters.ratingAtLeast) return false;
    }

    // 6) Near Me distance (skip for now if not available)
    if (filters.distanceKm != null) {
      // Distance filtering would go here if we had location data
      // For now, we'll skip this as posts don't have distanceKm field
    }

    return true;
  }, [matchesText]);

  // Filter posts based on active tab, board, feed filter, and ALL active filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by tab
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post): post is ReviewPost => post.type === 'review');
    } else {
      filtered = filtered.filter((post): post is MeetupPost => post.type === 'meetup');
    }

    // Filter by board (only if board exists on post)
    if (selectedBoardId !== null) {
      filtered = filtered.filter(post => {
        if (post.type === 'review') {
          return post.board.id === selectedBoardId;
        } else {
          // For meetup posts, board is optional, so check if it exists and matches
          return post.board?.id === selectedBoardId;
        }
      });
    }

    // Filter by following
    if (feedFilter === 'following') {
      filtered = filtered.filter(post => post.isFromFollowedUser === true);
    }

    // Apply comprehensive filters
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post) => passesFilters(post as ReviewPost, filters));
    } else {
      // For meetup posts, apply basic search filter
      if (filters.searchQuery) {
        filtered = filtered.filter((post) => matchesMeetupText(post as MeetupPost, filters.searchQuery));
      }
    }

    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, filters, passesFilters, matchesMeetupText]);

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: In the future, this will navigate to a post detail page
    // TODO: The detail page will show full content, comments, etc.
  };

  const handleSearchFromTag = (tag: string) => {
    updateSearchQuery(tag);
    // The filtering will happen automatically via the filteredPosts useMemo
  };

  const handlePostTypeSelect = (type: 'review' | 'meetup') => {
    console.log(`User wants to create a ${type} post`);
    // TODO: In the future, this will open a form modal
    // TODO: The form will submit to the backend API
  };

  // Current user (mock - in real app, get from auth context)
  const currentUser: User = {
    id: 'me',
    displayName: 'Philip',
    handle: '@philip',
    avatarUrl: '/images/default-avatar.png',
    isFollowedByCurrentUser: false, // User doesn't follow themselves
  };

  // Handler to create a new review post from form values
  const handleCreateReviewPost = (values: ReviewPostFormValues) => {
    const now = new Date();

    // Find the style board (cuisine category)
    const styleBoard = boards.find(b => b.id === values.styleTags[0] && b.category === 'cuisine');
    // Find the category board (type category) for foodType
    const categoryBoard = boards.find(b => b.id === values.categoryTags[0] && b.category === 'type');

    // Derive priceLevel from price range
    let priceLevel: '$' | '$$' | '$$$' = '$';
    if (values.priceMax !== null && values.priceMax !== undefined) {
      if (values.priceMax <= 200) {
        priceLevel = '$';
      } else if (values.priceMax <= 500) {
        priceLevel = '$$';
      } else {
        priceLevel = '$$$';
      }
    } else if (values.priceMin !== null && values.priceMin !== undefined) {
      if (values.priceMin > 500) {
        priceLevel = '$$$';
      } else if (values.priceMin > 200) {
        priceLevel = '$$';
      }
    }

    // Extract locationArea from locationDisplayName
    // Format: "大安區 | 好吃炒飯" or just "好吃炒飯"
    const locationDisplayParts = values.locationDisplayName.split(' | ');
    const locationArea = locationDisplayParts.length > 1 
      ? locationDisplayParts[0]  // e.g. "大安區"
      : 'Taipei'; // Default if no region in display name

    // Convert photo files to image URLs (object URLs for immediate display)
    const imageUrls = values.photoFiles.map((file) => URL.createObjectURL(file));

    const newPost: ReviewPost = {
      id: `local-${now.getTime()}`,
      type: 'review',
      author: currentUser,
      restaurantName: values.restaurantName,
      board: styleBoard || boards[0], // Fallback to first board if not found
      styleType: styleBoard?.label,
      foodType: categoryBoard?.label,
      title: values.restaurantName, // Use restaurant name as title for now
      contentSnippet: values.content.length > 100 
        ? values.content.substring(0, 100) + '...' 
        : values.content,
      rating: values.rating,
      priceLevel,
      priceMax: values.priceMax ?? undefined,
      locationArea,
      createdAt: now.toISOString(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      images: imageUrls.length > 0 ? imageUrls : undefined,
      imageUrl: imageUrls[0], // Legacy support
      isFromFollowedUser: feedFilter === 'following',
    };

    // Add the new post to the beginning of the posts array
    setPosts((prev) => [newPost, ...prev]);

    // Optional: scroll to the top of the feed smoothly after posting
    const feedTop = document.getElementById('review-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler to create a new meetup post from form values
  const handleCreateMeetupPost = async (values: DiningMeetupFormValues) => {
    try {
      // Call the API to create the post
      const createdPost = await createMeetupPost(values);
      
      // Convert API response to MeetupPost format
      const now = new Date();
      // Build address from locationText and restaurantName
      const address = `${values.locationText} ${values.restaurantName}`.trim();
      
      const newPost: MeetupPost = {
        id: createdPost.id,
        type: 'meetup',
        author: currentUser,
        restaurantName: values.restaurantName,
        locationText: values.locationText,
        address,
        meetupTime: values.meetupTime,
        foodTags: values.foodTags,
        maxHeadcount: values.maxHeadcount,
        currentHeadcount: values.baseParticipantCount || 1, // Base participants are already "joined"
        budgetDescription: values.budgetDescription,
        hasReservation: values.hasReservation,
        description: values.description,
        visibility: values.visibility,
        imageUrl: values.imageUrl || null,
        status: 'OPEN',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        isFromFollowedUser: feedFilter === 'following',
      };

      // Add the new post to the beginning of the posts array
      setPosts((prev) => [newPost, ...prev]);

      // Close the modal after successful creation
      setIsMeetupComposerOpen(false);

      // Scroll to the top of the feed smoothly after posting
      const feedTop = document.getElementById('review-feed-top');
      if (feedTop) {
        feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error creating meetup post:', error);
      // TODO: Show error message to user
      // Don't close modal on error so user can retry
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Loading...</p>
        </div>
      </div>
    );
  }

      return (
        <div className="h-screen flex flex-col bg-bg-primary transition-colors duration-300">
          <TopNavBar
            searchQuery={filters.searchQuery}
            onSearchChange={updateSearchQuery}
            onPostClick={() => {
              const type: PostType = activeTab === 'reviews' ? 'review' : 'meetup';
              console.log('Post clicked', { activeTab, postTypeNext: type });
              setPostType(type);
              setIsPostModalOpen(true);
            }}
          />

          <div className="flex flex-1 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="flex items-stretch w-full">
              {/* Left Sidebar (Desktop) */}
              <aside className="hidden md:block w-64 bg-bg-tertiary border-r border-border-color transition-colors duration-300 self-stretch">
                <Sidebar
                  boards={boards}
                  selectedBoardId={selectedBoardId}
                  onBoardSelect={setSelectedBoardId}
                  filters={filters}
                  onChangeStyle={updateStyle}
                  onChangeCategory={updateCategory}
                  onChangePrice={updatePrice}
                  onApplyPrice={applyPrice}
                  onChangeRating={updateRating}
                  onChangeNearMe={updateDistance}
                />
              </aside>

              {/* Mobile Board Chips */}
              <MobileBoardChips
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelect={setSelectedBoardId}
              />

              {/* Center Feed */}
              <main className="flex-1 min-w-0 bg-bg-secondary overflow-y-auto scrollbar-hidden">
                {/* Tabs row at the very top of the center column, just under the navbar */}
                <TabSwitcher
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  feedFilter={feedFilter}
                  onFeedFilterChange={setFeedFilter}
                />

                <div className="px-4" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
                  {/* Feed top anchor for scrolling */}
                  <div id="review-feed-top" />
                  
                  {/* Create Post Composer - Different for each tab */}
              {activeTab === 'reviews' ? (
                <section
                  onClick={() => {
                    setIsReviewModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
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
              ) : activeTab === 'meetups' ? (
                <section
                  onClick={() => {
                    const type: PostType = 'meetup';
                    console.log('Meetup composer placeholder clicked', { activeTab, postTypeNext: type });
                    setPostType(type);
                    setIsPostModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
                          'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
                        }
                        alt="Your avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Placeholder Text */}
                    <div className="flex-1 flex items-center">
                      <p className="text-[15px] text-text-secondary">
                        想找一起吃飯的夥伴？分享你的用餐計畫吧…
                      </p>
                    </div>
                  </div>
                </section>
              ) : null}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                filteredPosts.map(post => {
                  if (post.type === 'review') {
                    return (
                      <ReviewPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  } else {
                    return (
                      <MeetupPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  }
                })
              )}
                </div>
              </main>

              {/* Right Column (Placeholder) */}
              <aside className="hidden lg:block w-80 bg-bg-sidebar-right border-l border-border-color transition-colors duration-300 self-stretch">
                <div className="sticky top-0 p-5">
                  <h3 className="text-xl text-text-primary mb-4 tracking-tight" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Coming Soon</h3>
                  <p className="text-base text-text-secondary leading-relaxed" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
                    Map view and restaurant recommendations will appear here.
                  </p>
                  {/* TODO: In the future, this will show:
                      - Interactive map with restaurant locations
                      - Restaurant detail pages
                      - Personalized recommendations based on user preferences
                      - Nearby restaurants based on location
                  */}
                </div>
              </aside>
            </div>
          </div>

          {/* Unified Post Composer Modal */}
      {isPostModalOpen && postType && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
          onClick={() => {
            setIsPostModalOpen(false);
            setPostType(null);
          }}
        >
          <div
            className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] scrollbar-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {postType === 'review' ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary">Create Review Post</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <ReviewPostComposer 
                  initialExpanded={true}
                  currentUser={currentUser}
                  onCreateReviewPost={(values) => {
                    handleCreateReviewPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between p-6 pb-4 border-b border-border-color -m-6 mb-0">
                  <h2 className="text-2xl font-bold text-text-primary">發揪吃飯文</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  </button>
                </div>
                <div className="pt-4">
                <DiningMeetupComposer
                  renderModal={false}
                  currentUser={currentUser}
                  onClose={() => {
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                  onCreateMeetupPost={(values) => {
                    handleCreateMeetupPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Type Modal (fallback for other cases) */}
      <PostTypeModal
        isOpen={isPostModalOpen && postType === null}
        onClose={() => {
          setIsPostModalOpen(false);
          setPostType(null);
        }}
        onSelectType={(type) => {
          setPostType(type);
          // Keep modal open, will show the composer
        }}
      />

      {/* Legacy Dining Meetup Composer Modal (keep for backward compatibility) */}
      <DiningMeetupComposer
        isOpen={isMeetupComposerOpen}
        onClose={() => setIsMeetupComposerOpen(false)}
        onCreateMeetupPost={handleCreateMeetupPost}
      />

      {/* Review Post Composer Modal */}
      <PostModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="新增餐廳評價"
      >
        <ReviewPostComposer
          initialExpanded={true}
          hideCollapseButton={true}
          currentUser={currentUser}
          onCreateReviewPost={(values) => {
            handleCreateReviewPost(values);
            setIsReviewModalOpen(false);
          }}
        />
      </PostModal>
      </div>
    );
  };


```


更新右側邊欄，並修改 ReviewPostCard 的調用：


```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { fetchBoards, fetchPosts, createMeetupPost } from '../api/mock';
import { fetchRecommendedUsers } from '../api/mockProfile';
import { RestaurantLocation } from '../types/location';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { ReviewPostComposer, ReviewPostFormValues } from '../components/posts/ReviewPostComposer';
import { DiningMeetupComposer, DiningMeetupFormValues } from '../components/posts/DiningMeetupComposer';
import { PostTypeModal } from '../components/modals/PostTypeModal';
import { PostModal } from '../components/modals/PostModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { SmallMap } from '../components/homepage/SmallMap';

// Active Filters Type (single-select per group)
type ActiveFilters = {
  searchQuery: string;
  style: string | null;      // single style key or null
  category: string | null;   // single category key or null
  priceMin: number | null;
  priceMax: number | null;
  ratingAtLeast: number | null;
  distanceKm: number | null;
};

export const RendezvousHome: React.FC = () => {
  // State
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'meetups'>('reviews');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMeetupComposerOpen, setIsMeetupComposerOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  type PostType = 'review' | 'meetup';
  const [postType, setPostType] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);

  // Centralized filter state
  const [filters, setFilters] = useState<ActiveFilters>({
    searchQuery: '',
    style: null,
    category: null,
    priceMin: null,
    priceMax: null,
    ratingAtLeast: null,
    distanceKm: null,
  });

  // Filter updaters
  const updateSearchQuery = (q: string) =>
    setFilters((f) => ({ ...f, searchQuery: q }));

  const updateStyle = (style: string | null) =>
    setFilters((f) => ({ ...f, style }));

  const updateCategory = (category: string | null) =>
    setFilters((f) => ({ ...f, category }));

  const updatePrice = (min: number | '', max: number | '') =>
    setFilters((f) => ({
      ...f,
      priceMin: min === '' ? null : min,
      priceMax: max === '' ? null : max,
    }));

  const applyPrice = (min: number, max: number) =>
    setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));

  const updateRating = (rating: number | null) =>
    setFilters((f) => ({ ...f, ratingAtLeast: rating }));

  const updateDistance = (km: number | '') =>
    setFilters((f) => ({ ...f, distanceKm: km === '' ? null : km }));

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [boardsData, postsData, recommended] = await Promise.all([
          fetchBoards(),
          fetchPosts(),
          fetchRecommendedUsers(),
        ]);
        setBoards(boardsData);
        setPosts(postsData);
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle location selection from post cards
  const handleLocationSelect = (location: { name: string; address?: string; lat: number; lng: number }) => {
    setSelectedLocation({
      name: location.name,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    });
  };

  // Lock body scroll when any post modal is open
  // Note: PostModal component handles its own scroll lock, but we keep this for legacy modals
  useEffect(() => {
    const isAnyModalOpen = isPostModalOpen || isMeetupComposerOpen || isReviewModalOpen;
    
    if (isAnyModalOpen) {
      // Save original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyOverflowY = document.body.style.overflowY;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlOverflowY = document.documentElement.style.overflowY;
      
      // Disable scroll on both body and html
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      
      // Restore original overflow when modal closes
      return () => {
        // Restore original values (empty string restores default scrolling behavior)
        document.body.style.overflow = originalBodyOverflow || '';
        document.body.style.overflowY = originalBodyOverflowY || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
        document.documentElement.style.overflowY = originalHtmlOverflowY || '';
      };
    } else {
      // Ensure scrolling is enabled when no modals are open
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    }
  }, [isPostModalOpen, isMeetupComposerOpen, isReviewModalOpen]);

  // Helper: Check if text matches search query (for review posts)
  const matchesText = React.useCallback((post: ReviewPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, content and tags
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationArea?.toLowerCase().includes(text)) return true;
    if (post.contentSnippet?.toLowerCase().includes(text)) return true;
    if (post.styleType?.toLowerCase().includes(text)) return true;
    if (post.foodType?.toLowerCase().includes(text)) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if meetup post text matches search query
  const matchesMeetupText = React.useCallback((post: MeetupPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, description, tags, and author
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationText?.toLowerCase().includes(text)) return true;
    if (post.description?.toLowerCase().includes(text)) return true;
    if (post.foodTags?.some(tag => tag.toLowerCase().includes(text))) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if post passes all active filters
  const passesFilters = React.useCallback((post: ReviewPost, filters: ActiveFilters): boolean => {
    // 1) Search text
    if (!matchesText(post, filters.searchQuery)) return false;

    // 2) Style (single-select)
    if (filters.style) {
      if (!post.styleType || post.styleType !== filters.style) {
        return false;
      }
    }

    // 3) Category (single-select)
    if (filters.category) {
      if (!post.foodType || post.foodType !== filters.category) {
        return false;
      }
    }

    // 4) Price
    if (filters.priceMin != null || filters.priceMax != null) {
      const maxPrice = post.priceMax;
      if (maxPrice == null) return false;
      if (filters.priceMin != null && maxPrice < filters.priceMin) return false;
      if (filters.priceMax != null && maxPrice > filters.priceMax) return false;
    }

    // 5) Rating
    if (filters.ratingAtLeast != null) {
      if (post.rating == null) return false;
      if (post.rating < filters.ratingAtLeast) return false;
    }

    // 6) Near Me distance (skip for now if not available)
    if (filters.distanceKm != null) {
      // Distance filtering would go here if we had location data
      // For now, we'll skip this as posts don't have distanceKm field
    }

    return true;
  }, [matchesText]);

  // Filter posts based on active tab, board, feed filter, and ALL active filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by tab
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post): post is ReviewPost => post.type === 'review');
    } else {
      filtered = filtered.filter((post): post is MeetupPost => post.type === 'meetup');
    }

    // Filter by board (only if board exists on post)
    if (selectedBoardId !== null) {
      filtered = filtered.filter(post => {
        if (post.type === 'review') {
          return post.board.id === selectedBoardId;
        } else {
          // For meetup posts, board is optional, so check if it exists and matches
          return post.board?.id === selectedBoardId;
        }
      });
    }

    // Filter by following
    if (feedFilter === 'following') {
      filtered = filtered.filter(post => post.isFromFollowedUser === true);
    }

    // Apply comprehensive filters
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post) => passesFilters(post as ReviewPost, filters));
    } else {
      // For meetup posts, apply basic search filter
      if (filters.searchQuery) {
        filtered = filtered.filter((post) => matchesMeetupText(post as MeetupPost, filters.searchQuery));
      }
    }

    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, filters, passesFilters, matchesMeetupText]);

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: In the future, this will navigate to a post detail page
    // TODO: The detail page will show full content, comments, etc.
  };

  const handleSearchFromTag = (tag: string) => {
    updateSearchQuery(tag);
    // The filtering will happen automatically via the filteredPosts useMemo
  };

  const handlePostTypeSelect = (type: 'review' | 'meetup') => {
    console.log(`User wants to create a ${type} post`);
    // TODO: In the future, this will open a form modal
    // TODO: The form will submit to the backend API
  };

  // Current user (mock - in real app, get from auth context)
  const currentUser: User = {
    id: 'me',
    displayName: 'Philip',
    handle: '@philip',
    avatarUrl: '/images/default-avatar.png',
    isFollowedByCurrentUser: false, // User doesn't follow themselves
  };

  // Handler to create a new review post from form values
  const handleCreateReviewPost = (values: ReviewPostFormValues) => {
    const now = new Date();

    // Find the style board (cuisine category)
    const styleBoard = boards.find(b => b.id === values.styleTags[0] && b.category === 'cuisine');
    // Find the category board (type category) for foodType
    const categoryBoard = boards.find(b => b.id === values.categoryTags[0] && b.category === 'type');

    // Derive priceLevel from price range
    let priceLevel: '$' | '$$' | '$$$' = '$';
    if (values.priceMax !== null && values.priceMax !== undefined) {
      if (values.priceMax <= 200) {
        priceLevel = '$';
      } else if (values.priceMax <= 500) {
        priceLevel = '$$';
      } else {
        priceLevel = '$$$';
      }
    } else if (values.priceMin !== null && values.priceMin !== undefined) {
      if (values.priceMin > 500) {
        priceLevel = '$$$';
      } else if (values.priceMin > 200) {
        priceLevel = '$$';
      }
    }

    // Extract locationArea from locationDisplayName
    // Format: "大安區 | 好吃炒飯" or just "好吃炒飯"
    const locationDisplayParts = values.locationDisplayName.split(' | ');
    const locationArea = locationDisplayParts.length > 1 
      ? locationDisplayParts[0]  // e.g. "大安區"
      : 'Taipei'; // Default if no region in display name

    // Convert photo files to image URLs (object URLs for immediate display)
    const imageUrls = values.photoFiles.map((file) => URL.createObjectURL(file));

    const newPost: ReviewPost = {
      id: `local-${now.getTime()}`,
      type: 'review',
      author: currentUser,
      restaurantName: values.restaurantName,
      board: styleBoard || boards[0], // Fallback to first board if not found
      styleType: styleBoard?.label,
      foodType: categoryBoard?.label,
      title: values.restaurantName, // Use restaurant name as title for now
      contentSnippet: values.content.length > 100 
        ? values.content.substring(0, 100) + '...' 
        : values.content,
      rating: values.rating,
      priceLevel,
      priceMax: values.priceMax ?? undefined,
      locationArea,
      createdAt: now.toISOString(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      images: imageUrls.length > 0 ? imageUrls : undefined,
      imageUrl: imageUrls[0], // Legacy support
      isFromFollowedUser: feedFilter === 'following',
    };

    // Add the new post to the beginning of the posts array
    setPosts((prev) => [newPost, ...prev]);

    // Optional: scroll to the top of the feed smoothly after posting
    const feedTop = document.getElementById('review-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler to create a new meetup post from form values
  const handleCreateMeetupPost = async (values: DiningMeetupFormValues) => {
    try {
      // Call the API to create the post
      const createdPost = await createMeetupPost(values);
      
      // Convert API response to MeetupPost format
      const now = new Date();
      // Build address from locationText and restaurantName
      const address = `${values.locationText} ${values.restaurantName}`.trim();
      
      const newPost: MeetupPost = {
        id: createdPost.id,
        type: 'meetup',
        author: currentUser,
        restaurantName: values.restaurantName,
        locationText: values.locationText,
        address,
        meetupTime: values.meetupTime,
        foodTags: values.foodTags,
        maxHeadcount: values.maxHeadcount,
        currentHeadcount: values.baseParticipantCount || 1, // Base participants are already "joined"
        budgetDescription: values.budgetDescription,
        hasReservation: values.hasReservation,
        description: values.description,
        visibility: values.visibility,
        imageUrl: values.imageUrl || null,
        status: 'OPEN',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        isFromFollowedUser: feedFilter === 'following',
      };

      // Add the new post to the beginning of the posts array
      setPosts((prev) => [newPost, ...prev]);

      // Close the modal after successful creation
      setIsMeetupComposerOpen(false);

      // Scroll to the top of the feed smoothly after posting
      const feedTop = document.getElementById('review-feed-top');
      if (feedTop) {
        feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error creating meetup post:', error);
      // TODO: Show error message to user
      // Don't close modal on error so user can retry
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Loading...</p>
        </div>
      </div>
    );
  }

      return (
        <div className="h-screen flex flex-col bg-bg-primary transition-colors duration-300">
          <TopNavBar
            searchQuery={filters.searchQuery}
            onSearchChange={updateSearchQuery}
            onPostClick={() => {
              const type: PostType = activeTab === 'reviews' ? 'review' : 'meetup';
              console.log('Post clicked', { activeTab, postTypeNext: type });
              setPostType(type);
              setIsPostModalOpen(true);
            }}
          />

          <div className="flex flex-1 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="flex items-stretch w-full">
              {/* Left Sidebar (Desktop) */}
              <aside className="hidden md:block w-64 bg-bg-tertiary border-r border-border-color transition-colors duration-300 self-stretch">
                <Sidebar
                  boards={boards}
                  selectedBoardId={selectedBoardId}
                  onBoardSelect={setSelectedBoardId}
                  filters={filters}
                  onChangeStyle={updateStyle}
                  onChangeCategory={updateCategory}
                  onChangePrice={updatePrice}
                  onApplyPrice={applyPrice}
                  onChangeRating={updateRating}
                  onChangeNearMe={updateDistance}
                />
              </aside>

              {/* Mobile Board Chips */}
              <MobileBoardChips
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelect={setSelectedBoardId}
              />

              {/* Center Feed */}
              <main className="flex-1 min-w-0 bg-bg-secondary overflow-y-auto scrollbar-hidden">
                {/* Tabs row at the very top of the center column, just under the navbar */}
                <TabSwitcher
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  feedFilter={feedFilter}
                  onFeedFilterChange={setFeedFilter}
                />

                <div className="px-4" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
                  {/* Feed top anchor for scrolling */}
                  <div id="review-feed-top" />
                  
                  {/* Create Post Composer - Different for each tab */}
              {activeTab === 'reviews' ? (
                <section
                  onClick={() => {
                    setIsReviewModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
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
              ) : activeTab === 'meetups' ? (
                <section
                  onClick={() => {
                    const type: PostType = 'meetup';
                    console.log('Meetup composer placeholder clicked', { activeTab, postTypeNext: type });
                    setPostType(type);
                    setIsPostModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
                          'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
                        }
                        alt="Your avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Placeholder Text */}
                    <div className="flex-1 flex items-center">
                      <p className="text-[15px] text-text-secondary">
                        想找一起吃飯的夥伴？分享你的用餐計畫吧…
                      </p>
                    </div>
                  </div>
                </section>
              ) : null}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                filteredPosts.map(post => {
                  if (post.type === 'review') {
                    return (
                      <ReviewPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  } else {
                    return (
                      <MeetupPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  }
                })
              )}
                </div>
              </main>

              {/* Right Sidebar */}
              <aside className="hidden lg:block w-80 bg-bg-sidebar-right border-l border-border-color transition-colors duration-300 self-stretch overflow-y-auto scrollbar-hidden">
                <div className="sticky top-0 p-5 space-y-5">
                  {/* You Might Like */}
                  {recommendedUsers.length > 0 && (
                    <YouMightLike recommendedUsers={recommendedUsers} />
                  )}
                  
                  {/* Small Map */}
                  <SmallMap selectedLocation={selectedLocation} />
                </div>
              </aside>
            </div>
          </div>

          {/* Unified Post Composer Modal */}
      {isPostModalOpen && postType && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
          onClick={() => {
            setIsPostModalOpen(false);
            setPostType(null);
          }}
        >
          <div
            className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] scrollbar-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {postType === 'review' ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary">Create Review Post</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <ReviewPostComposer 
                  initialExpanded={true}
                  currentUser={currentUser}
                  onCreateReviewPost={(values) => {
                    handleCreateReviewPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between p-6 pb-4 border-b border-border-color -m-6 mb-0">
                  <h2 className="text-2xl font-bold text-text-primary">發揪吃飯文</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  </button>
                </div>
                <div className="pt-4">
                <DiningMeetupComposer
                  renderModal={false}
                  currentUser={currentUser}
                  onClose={() => {
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                  onCreateMeetupPost={(values) => {
                    handleCreateMeetupPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Type Modal (fallback for other cases) */}
      <PostTypeModal
        isOpen={isPostModalOpen && postType === null}
        onClose={() => {
          setIsPostModalOpen(false);
          setPostType(null);
        }}
        onSelectType={(type) => {
          setPostType(type);
          // Keep modal open, will show the composer
        }}
      />

      {/* Legacy Dining Meetup Composer Modal (keep for backward compatibility) */}
      <DiningMeetupComposer
        isOpen={isMeetupComposerOpen}
        onClose={() => setIsMeetupComposerOpen(false)}
        onCreateMeetupPost={handleCreateMeetupPost}
      />

      {/* Review Post Composer Modal */}
      <PostModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="新增餐廳評價"
      >
        <ReviewPostComposer
          initialExpanded={true}
          hideCollapseButton={true}
          currentUser={currentUser}
          onCreateReviewPost={(values) => {
            handleCreateReviewPost(values);
            setIsReviewModalOpen(false);
          }}
        />
      </PostModal>
      </div>
    );
  };


```

```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { fetchBoards, fetchPosts, createMeetupPost } from '../api/mock';
import { fetchRecommendedUsers } from '../api/mockProfile';
import { RestaurantLocation } from '../types/location';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { ReviewPostComposer, ReviewPostFormValues } from '../components/posts/ReviewPostComposer';
import { DiningMeetupComposer, DiningMeetupFormValues } from '../components/posts/DiningMeetupComposer';
import { PostTypeModal } from '../components/modals/PostTypeModal';
import { PostModal } from '../components/modals/PostModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { SmallMap } from '../components/homepage/SmallMap';

// Active Filters Type (single-select per group)
type ActiveFilters = {
  searchQuery: string;
  style: string | null;      // single style key or null
  category: string | null;   // single category key or null
  priceMin: number | null;
  priceMax: number | null;
  ratingAtLeast: number | null;
  distanceKm: number | null;
};

export const RendezvousHome: React.FC = () => {
  // State
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'meetups'>('reviews');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMeetupComposerOpen, setIsMeetupComposerOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  type PostType = 'review' | 'meetup';
  const [postType, setPostType] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);

  // Centralized filter state
  const [filters, setFilters] = useState<ActiveFilters>({
    searchQuery: '',
    style: null,
    category: null,
    priceMin: null,
    priceMax: null,
    ratingAtLeast: null,
    distanceKm: null,
  });

  // Filter updaters
  const updateSearchQuery = (q: string) =>
    setFilters((f) => ({ ...f, searchQuery: q }));

  const updateStyle = (style: string | null) =>
    setFilters((f) => ({ ...f, style }));

  const updateCategory = (category: string | null) =>
    setFilters((f) => ({ ...f, category }));

  const updatePrice = (min: number | '', max: number | '') =>
    setFilters((f) => ({
      ...f,
      priceMin: min === '' ? null : min,
      priceMax: max === '' ? null : max,
    }));

  const applyPrice = (min: number, max: number) =>
    setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));

  const updateRating = (rating: number | null) =>
    setFilters((f) => ({ ...f, ratingAtLeast: rating }));

  const updateDistance = (km: number | '') =>
    setFilters((f) => ({ ...f, distanceKm: km === '' ? null : km }));

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [boardsData, postsData, recommended] = await Promise.all([
          fetchBoards(),
          fetchPosts(),
          fetchRecommendedUsers(),
        ]);
        setBoards(boardsData);
        setPosts(postsData);
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle location selection from post cards
  const handleLocationSelect = (location: { name: string; address?: string; lat: number; lng: number }) => {
    setSelectedLocation({
      name: location.name,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    });
  };

  // Lock body scroll when any post modal is open
  // Note: PostModal component handles its own scroll lock, but we keep this for legacy modals
  useEffect(() => {
    const isAnyModalOpen = isPostModalOpen || isMeetupComposerOpen || isReviewModalOpen;
    
    if (isAnyModalOpen) {
      // Save original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyOverflowY = document.body.style.overflowY;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlOverflowY = document.documentElement.style.overflowY;
      
      // Disable scroll on both body and html
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      
      // Restore original overflow when modal closes
      return () => {
        // Restore original values (empty string restores default scrolling behavior)
        document.body.style.overflow = originalBodyOverflow || '';
        document.body.style.overflowY = originalBodyOverflowY || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
        document.documentElement.style.overflowY = originalHtmlOverflowY || '';
      };
    } else {
      // Ensure scrolling is enabled when no modals are open
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    }
  }, [isPostModalOpen, isMeetupComposerOpen, isReviewModalOpen]);

  // Helper: Check if text matches search query (for review posts)
  const matchesText = React.useCallback((post: ReviewPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, content and tags
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationArea?.toLowerCase().includes(text)) return true;
    if (post.contentSnippet?.toLowerCase().includes(text)) return true;
    if (post.styleType?.toLowerCase().includes(text)) return true;
    if (post.foodType?.toLowerCase().includes(text)) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if meetup post text matches search query
  const matchesMeetupText = React.useCallback((post: MeetupPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, description, tags, and author
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationText?.toLowerCase().includes(text)) return true;
    if (post.description?.toLowerCase().includes(text)) return true;
    if (post.foodTags?.some(tag => tag.toLowerCase().includes(text))) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if post passes all active filters
  const passesFilters = React.useCallback((post: ReviewPost, filters: ActiveFilters): boolean => {
    // 1) Search text
    if (!matchesText(post, filters.searchQuery)) return false;

    // 2) Style (single-select)
    if (filters.style) {
      if (!post.styleType || post.styleType !== filters.style) {
        return false;
      }
    }

    // 3) Category (single-select)
    if (filters.category) {
      if (!post.foodType || post.foodType !== filters.category) {
        return false;
      }
    }

    // 4) Price
    if (filters.priceMin != null || filters.priceMax != null) {
      const maxPrice = post.priceMax;
      if (maxPrice == null) return false;
      if (filters.priceMin != null && maxPrice < filters.priceMin) return false;
      if (filters.priceMax != null && maxPrice > filters.priceMax) return false;
    }

    // 5) Rating
    if (filters.ratingAtLeast != null) {
      if (post.rating == null) return false;
      if (post.rating < filters.ratingAtLeast) return false;
    }

    // 6) Near Me distance (skip for now if not available)
    if (filters.distanceKm != null) {
      // Distance filtering would go here if we had location data
      // For now, we'll skip this as posts don't have distanceKm field
    }

    return true;
  }, [matchesText]);

  // Filter posts based on active tab, board, feed filter, and ALL active filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by tab
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post): post is ReviewPost => post.type === 'review');
    } else {
      filtered = filtered.filter((post): post is MeetupPost => post.type === 'meetup');
    }

    // Filter by board (only if board exists on post)
    if (selectedBoardId !== null) {
      filtered = filtered.filter(post => {
        if (post.type === 'review') {
          return post.board.id === selectedBoardId;
        } else {
          // For meetup posts, board is optional, so check if it exists and matches
          return post.board?.id === selectedBoardId;
        }
      });
    }

    // Filter by following
    if (feedFilter === 'following') {
      filtered = filtered.filter(post => post.isFromFollowedUser === true);
    }

    // Apply comprehensive filters
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post) => passesFilters(post as ReviewPost, filters));
    } else {
      // For meetup posts, apply basic search filter
      if (filters.searchQuery) {
        filtered = filtered.filter((post) => matchesMeetupText(post as MeetupPost, filters.searchQuery));
      }
    }

    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, filters, passesFilters, matchesMeetupText]);

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: In the future, this will navigate to a post detail page
    // TODO: The detail page will show full content, comments, etc.
  };

  const handleSearchFromTag = (tag: string) => {
    updateSearchQuery(tag);
    // The filtering will happen automatically via the filteredPosts useMemo
  };

  const handlePostTypeSelect = (type: 'review' | 'meetup') => {
    console.log(`User wants to create a ${type} post`);
    // TODO: In the future, this will open a form modal
    // TODO: The form will submit to the backend API
  };

  // Current user (mock - in real app, get from auth context)
  const currentUser: User = {
    id: 'me',
    displayName: 'Philip',
    handle: '@philip',
    avatarUrl: '/images/default-avatar.png',
    isFollowedByCurrentUser: false, // User doesn't follow themselves
  };

  // Handler to create a new review post from form values
  const handleCreateReviewPost = (values: ReviewPostFormValues) => {
    const now = new Date();

    // Find the style board (cuisine category)
    const styleBoard = boards.find(b => b.id === values.styleTags[0] && b.category === 'cuisine');
    // Find the category board (type category) for foodType
    const categoryBoard = boards.find(b => b.id === values.categoryTags[0] && b.category === 'type');

    // Derive priceLevel from price range
    let priceLevel: '$' | '$$' | '$$$' = '$';
    if (values.priceMax !== null && values.priceMax !== undefined) {
      if (values.priceMax <= 200) {
        priceLevel = '$';
      } else if (values.priceMax <= 500) {
        priceLevel = '$$';
      } else {
        priceLevel = '$$$';
      }
    } else if (values.priceMin !== null && values.priceMin !== undefined) {
      if (values.priceMin > 500) {
        priceLevel = '$$$';
      } else if (values.priceMin > 200) {
        priceLevel = '$$';
      }
    }

    // Extract locationArea from locationDisplayName
    // Format: "大安區 | 好吃炒飯" or just "好吃炒飯"
    const locationDisplayParts = values.locationDisplayName.split(' | ');
    const locationArea = locationDisplayParts.length > 1 
      ? locationDisplayParts[0]  // e.g. "大安區"
      : 'Taipei'; // Default if no region in display name

    // Convert photo files to image URLs (object URLs for immediate display)
    const imageUrls = values.photoFiles.map((file) => URL.createObjectURL(file));

    const newPost: ReviewPost = {
      id: `local-${now.getTime()}`,
      type: 'review',
      author: currentUser,
      restaurantName: values.restaurantName,
      board: styleBoard || boards[0], // Fallback to first board if not found
      styleType: styleBoard?.label,
      foodType: categoryBoard?.label,
      title: values.restaurantName, // Use restaurant name as title for now
      contentSnippet: values.content.length > 100 
        ? values.content.substring(0, 100) + '...' 
        : values.content,
      rating: values.rating,
      priceLevel,
      priceMax: values.priceMax ?? undefined,
      locationArea,
      createdAt: now.toISOString(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      images: imageUrls.length > 0 ? imageUrls : undefined,
      imageUrl: imageUrls[0], // Legacy support
      isFromFollowedUser: feedFilter === 'following',
    };

    // Add the new post to the beginning of the posts array
    setPosts((prev) => [newPost, ...prev]);

    // Optional: scroll to the top of the feed smoothly after posting
    const feedTop = document.getElementById('review-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler to create a new meetup post from form values
  const handleCreateMeetupPost = async (values: DiningMeetupFormValues) => {
    try {
      // Call the API to create the post
      const createdPost = await createMeetupPost(values);
      
      // Convert API response to MeetupPost format
      const now = new Date();
      // Build address from locationText and restaurantName
      const address = `${values.locationText} ${values.restaurantName}`.trim();
      
      const newPost: MeetupPost = {
        id: createdPost.id,
        type: 'meetup',
        author: currentUser,
        restaurantName: values.restaurantName,
        locationText: values.locationText,
        address,
        meetupTime: values.meetupTime,
        foodTags: values.foodTags,
        maxHeadcount: values.maxHeadcount,
        currentHeadcount: values.baseParticipantCount || 1, // Base participants are already "joined"
        budgetDescription: values.budgetDescription,
        hasReservation: values.hasReservation,
        description: values.description,
        visibility: values.visibility,
        imageUrl: values.imageUrl || null,
        status: 'OPEN',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        isFromFollowedUser: feedFilter === 'following',
      };

      // Add the new post to the beginning of the posts array
      setPosts((prev) => [newPost, ...prev]);

      // Close the modal after successful creation
      setIsMeetupComposerOpen(false);

      // Scroll to the top of the feed smoothly after posting
      const feedTop = document.getElementById('review-feed-top');
      if (feedTop) {
        feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error creating meetup post:', error);
      // TODO: Show error message to user
      // Don't close modal on error so user can retry
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Loading...</p>
        </div>
      </div>
    );
  }

      return (
        <div className="h-screen flex flex-col bg-bg-primary transition-colors duration-300">
          <TopNavBar
            searchQuery={filters.searchQuery}
            onSearchChange={updateSearchQuery}
            onPostClick={() => {
              const type: PostType = activeTab === 'reviews' ? 'review' : 'meetup';
              console.log('Post clicked', { activeTab, postTypeNext: type });
              setPostType(type);
              setIsPostModalOpen(true);
            }}
          />

          <div className="flex flex-1 max-w-7xl mx-auto w-full overflow-hidden">
            <div className="flex items-stretch w-full">
              {/* Left Sidebar (Desktop) */}
              <aside className="hidden md:block w-64 bg-bg-tertiary border-r border-border-color transition-colors duration-300 self-stretch">
                <Sidebar
                  boards={boards}
                  selectedBoardId={selectedBoardId}
                  onBoardSelect={setSelectedBoardId}
                  filters={filters}
                  onChangeStyle={updateStyle}
                  onChangeCategory={updateCategory}
                  onChangePrice={updatePrice}
                  onApplyPrice={applyPrice}
                  onChangeRating={updateRating}
                  onChangeNearMe={updateDistance}
                />
              </aside>

              {/* Mobile Board Chips */}
              <MobileBoardChips
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelect={setSelectedBoardId}
              />

              {/* Center Feed */}
              <main className="flex-1 min-w-0 bg-bg-secondary overflow-y-auto scrollbar-hidden">
                {/* Tabs row at the very top of the center column, just under the navbar */}
                <TabSwitcher
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  feedFilter={feedFilter}
                  onFeedFilterChange={setFeedFilter}
                />

                <div className="px-4" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
                  {/* Feed top anchor for scrolling */}
                  <div id="review-feed-top" />
                  
                  {/* Create Post Composer - Different for each tab */}
              {activeTab === 'reviews' ? (
                <section
                  onClick={() => {
                    setIsReviewModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
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
              ) : activeTab === 'meetups' ? (
                <section
                  onClick={() => {
                    const type: PostType = 'meetup';
                    console.log('Meetup composer placeholder clicked', { activeTab, postTypeNext: type });
                    setPostType(type);
                    setIsPostModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
                          'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
                        }
                        alt="Your avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Placeholder Text */}
                    <div className="flex-1 flex items-center">
                      <p className="text-[15px] text-text-secondary">
                        想找一起吃飯的夥伴？分享你的用餐計畫吧…
                      </p>
                    </div>
                  </div>
                </section>
              ) : null}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                filteredPosts.map(post => {
                  if (post.type === 'review') {
                    return (
                      <ReviewPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        onLocationClick={handleLocationSelect}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  } else {
                    return (
                      <MeetupPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  }
                })
              )}
                </div>
              </main>

              {/* Right Sidebar */}
              <aside className="hidden lg:block w-80 bg-bg-sidebar-right border-l border-border-color transition-colors duration-300 self-stretch overflow-y-auto scrollbar-hidden">
                <div className="sticky top-0 p-5 space-y-5">
                  {/* You Might Like */}
                  {recommendedUsers.length > 0 && (
                    <YouMightLike recommendedUsers={recommendedUsers} />
                  )}
                  
                  {/* Small Map */}
                  <SmallMap selectedLocation={selectedLocation} />
                </div>
              </aside>
            </div>
          </div>

          {/* Unified Post Composer Modal */}
      {isPostModalOpen && postType && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
          onClick={() => {
            setIsPostModalOpen(false);
            setPostType(null);
          }}
        >
          <div
            className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] scrollbar-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {postType === 'review' ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary">Create Review Post</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <ReviewPostComposer 
                  initialExpanded={true}
                  currentUser={currentUser}
                  onCreateReviewPost={(values) => {
                    handleCreateReviewPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between p-6 pb-4 border-b border-border-color -m-6 mb-0">
                  <h2 className="text-2xl font-bold text-text-primary">發揪吃飯文</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  </button>
                </div>
                <div className="pt-4">
                <DiningMeetupComposer
                  renderModal={false}
                  currentUser={currentUser}
                  onClose={() => {
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                  onCreateMeetupPost={(values) => {
                    handleCreateMeetupPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Type Modal (fallback for other cases) */}
      <PostTypeModal
        isOpen={isPostModalOpen && postType === null}
        onClose={() => {
          setIsPostModalOpen(false);
          setPostType(null);
        }}
        onSelectType={(type) => {
          setPostType(type);
          // Keep modal open, will show the composer
        }}
      />

      {/* Legacy Dining Meetup Composer Modal (keep for backward compatibility) */}
      <DiningMeetupComposer
        isOpen={isMeetupComposerOpen}
        onClose={() => setIsMeetupComposerOpen(false)}
        onCreateMeetupPost={handleCreateMeetupPost}
      />

      {/* Review Post Composer Modal */}
      <PostModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="新增餐廳評價"
      >
        <ReviewPostComposer
          initialExpanded={true}
          hideCollapseButton={true}
          currentUser={currentUser}
          onCreateReviewPost={(values) => {
            handleCreateReviewPost(values);
            setIsReviewModalOpen(false);
          }}
        />
      </PostModal>
      </div>
    );
  };


```


修改 UserProfilePage，使 Back to Home 和 tabs 一起固定在頂部：


```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
        // Fetch recommended users
        const recommended = await fetchRecommendedUsers();
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          navigate('/');
        }}
        showSearch={false}
      />

      {/* Sticky Navigation Area: Back to Home + Profile Tabs */}
      <div className="sticky top-16 z-40 bg-bg-primary">
        <div className="max-w-7xl mx-auto">
          {/* Back to Home Button */}
          <div className="px-4 md:px-6 py-4 border-b border-border-color">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="font-semibold">Back to Home</span>
            </button>
          </div>

          {/* Profile Tabs */}
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            postCounts={postCounts}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Profile Header */}
            <ProfileHeader
              profile={profile}
              isOwnProfile={isOwnProfile}
              onEditClick={() => setIsEditModalOpen(true)}
            />

            {/* Profile Tags */}
            <ProfileTags profile={profile} />

            {/* Posts Feed */}
            <div className="bg-bg-secondary min-h-screen">
              {currentPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    {activeTab === 'posts'
                      ? 'This user has not created any posts yet.'
                      : `This user has no ${activeTab} yet.`}
                  </p>
                </div>
              ) : (
                <div>
                  {currentPosts.map((post) => {
                    if (post.type === 'review') {
                      return (
                        <ReviewPostCard
                          key={post.id}
                          post={post as ReviewPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    } else {
                      return (
                        <MeetupPostCard
                          key={post.id}
                          post={post as MeetupPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - You Might Like (Desktop only) */}
          <aside className="hidden lg:block w-80 flex-shrink-0 pt-4">
            <div className="sticky top-4">
              <YouMightLike recommendedUsers={recommendedUsers} />
            </div>
          </aside>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```

```typescriptreact
import React from 'react';
import { ProfileTab } from '../../types/profile';

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  postCounts?: {
    posts: number;
    likes: number;
    replies: number;
    reposts: number;
    bookmarks: number;
  };
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  postCounts,
}) => {
  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'posts', label: 'Posts' },
    { key: 'likes', label: 'Likes' },
    { key: 'replies', label: 'Replies' },
    { key: 'reposts', label: 'Reposts' },
    { key: 'bookmarks', label: 'Bookmarks' },
  ];

  return (
    <div className="border-b border-border-color bg-bg-secondary transition-colors duration-300">
      <div className="flex items-center overflow-x-auto scrollbar-hidden">
        {tabs.map((tab) => {
          const count = postCounts?.[tab.key];
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-4 md:px-6 py-4 text-base font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-accent-primary border-accent-primary'
                  : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border-color'
              }`}
              style={{
                fontFamily: activeTab === tab.key 
                  ? 'Garamond, Baskerville, Georgia, Times New Roman, serif' 
                  : 'inherit',
                fontWeight: activeTab === tab.key ? 900 : 600,
              }}
            >
              {tab.label}
              {count !== undefined && (
                <span className="ml-2 text-text-secondary text-sm font-normal">
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};


```


檢查並調整主頁面布局，確保側邊欄填滿高度：


```typescriptreact
import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { fetchBoards, fetchPosts, createMeetupPost } from '../api/mock';
import { fetchRecommendedUsers } from '../api/mockProfile';
import { RestaurantLocation } from '../types/location';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { ReviewPostComposer, ReviewPostFormValues } from '../components/posts/ReviewPostComposer';
import { DiningMeetupComposer, DiningMeetupFormValues } from '../components/posts/DiningMeetupComposer';
import { PostTypeModal } from '../components/modals/PostTypeModal';
import { PostModal } from '../components/modals/PostModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { SmallMap } from '../components/homepage/SmallMap';

// Active Filters Type (single-select per group)
type ActiveFilters = {
  searchQuery: string;
  style: string | null;      // single style key or null
  category: string | null;   // single category key or null
  priceMin: number | null;
  priceMax: number | null;
  ratingAtLeast: number | null;
  distanceKm: number | null;
};

export const RendezvousHome: React.FC = () => {
  // State
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'meetups'>('reviews');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMeetupComposerOpen, setIsMeetupComposerOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  type PostType = 'review' | 'meetup';
  const [postType, setPostType] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);

  // Centralized filter state
  const [filters, setFilters] = useState<ActiveFilters>({
    searchQuery: '',
    style: null,
    category: null,
    priceMin: null,
    priceMax: null,
    ratingAtLeast: null,
    distanceKm: null,
  });

  // Filter updaters
  const updateSearchQuery = (q: string) =>
    setFilters((f) => ({ ...f, searchQuery: q }));

  const updateStyle = (style: string | null) =>
    setFilters((f) => ({ ...f, style }));

  const updateCategory = (category: string | null) =>
    setFilters((f) => ({ ...f, category }));

  const updatePrice = (min: number | '', max: number | '') =>
    setFilters((f) => ({
      ...f,
      priceMin: min === '' ? null : min,
      priceMax: max === '' ? null : max,
    }));

  const applyPrice = (min: number, max: number) =>
    setFilters((f) => ({ ...f, priceMin: min, priceMax: max }));

  const updateRating = (rating: number | null) =>
    setFilters((f) => ({ ...f, ratingAtLeast: rating }));

  const updateDistance = (km: number | '') =>
    setFilters((f) => ({ ...f, distanceKm: km === '' ? null : km }));

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [boardsData, postsData, recommended] = await Promise.all([
          fetchBoards(),
          fetchPosts(),
          fetchRecommendedUsers(),
        ]);
        setBoards(boardsData);
        setPosts(postsData);
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handle location selection from post cards
  const handleLocationSelect = (location: { name: string; address?: string; lat: number; lng: number }) => {
    setSelectedLocation({
      name: location.name,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    });
  };

  // Lock body scroll when any post modal is open
  // Note: PostModal component handles its own scroll lock, but we keep this for legacy modals
  useEffect(() => {
    const isAnyModalOpen = isPostModalOpen || isMeetupComposerOpen || isReviewModalOpen;
    
    if (isAnyModalOpen) {
      // Save original overflow values
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyOverflowY = document.body.style.overflowY;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlOverflowY = document.documentElement.style.overflowY;
      
      // Disable scroll on both body and html
      document.body.style.overflow = 'hidden';
      document.body.style.overflowY = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      
      // Restore original overflow when modal closes
      return () => {
        // Restore original values (empty string restores default scrolling behavior)
        document.body.style.overflow = originalBodyOverflow || '';
        document.body.style.overflowY = originalBodyOverflowY || '';
        document.documentElement.style.overflow = originalHtmlOverflow || '';
        document.documentElement.style.overflowY = originalHtmlOverflowY || '';
      };
    } else {
      // Ensure scrolling is enabled when no modals are open
      document.body.style.overflow = '';
      document.body.style.overflowY = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overflowY = '';
    }
  }, [isPostModalOpen, isMeetupComposerOpen, isReviewModalOpen]);

  // Helper: Check if text matches search query (for review posts)
  const matchesText = React.useCallback((post: ReviewPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, content and tags
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationArea?.toLowerCase().includes(text)) return true;
    if (post.contentSnippet?.toLowerCase().includes(text)) return true;
    if (post.styleType?.toLowerCase().includes(text)) return true;
    if (post.foodType?.toLowerCase().includes(text)) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if meetup post text matches search query
  const matchesMeetupText = React.useCallback((post: MeetupPost, q: string): boolean => {
    if (!q) return true;
    const text = q.toLowerCase();

    // Include restaurant, location, description, tags, and author
    if (post.restaurantName?.toLowerCase().includes(text)) return true;
    if (post.locationText?.toLowerCase().includes(text)) return true;
    if (post.description?.toLowerCase().includes(text)) return true;
    if (post.foodTags?.some(tag => tag.toLowerCase().includes(text))) return true;
    if (post.author?.displayName?.toLowerCase().includes(text)) return true;
    if (post.author?.handle?.toLowerCase().includes(text)) return true;

    return false;
  }, []);

  // Helper: Check if post passes all active filters
  const passesFilters = React.useCallback((post: ReviewPost, filters: ActiveFilters): boolean => {
    // 1) Search text
    if (!matchesText(post, filters.searchQuery)) return false;

    // 2) Style (single-select)
    if (filters.style) {
      if (!post.styleType || post.styleType !== filters.style) {
        return false;
      }
    }

    // 3) Category (single-select)
    if (filters.category) {
      if (!post.foodType || post.foodType !== filters.category) {
        return false;
      }
    }

    // 4) Price
    if (filters.priceMin != null || filters.priceMax != null) {
      const maxPrice = post.priceMax;
      if (maxPrice == null) return false;
      if (filters.priceMin != null && maxPrice < filters.priceMin) return false;
      if (filters.priceMax != null && maxPrice > filters.priceMax) return false;
    }

    // 5) Rating
    if (filters.ratingAtLeast != null) {
      if (post.rating == null) return false;
      if (post.rating < filters.ratingAtLeast) return false;
    }

    // 6) Near Me distance (skip for now if not available)
    if (filters.distanceKm != null) {
      // Distance filtering would go here if we had location data
      // For now, we'll skip this as posts don't have distanceKm field
    }

    return true;
  }, [matchesText]);

  // Filter posts based on active tab, board, feed filter, and ALL active filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by tab
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post): post is ReviewPost => post.type === 'review');
    } else {
      filtered = filtered.filter((post): post is MeetupPost => post.type === 'meetup');
    }

    // Filter by board (only if board exists on post)
    if (selectedBoardId !== null) {
      filtered = filtered.filter(post => {
        if (post.type === 'review') {
          return post.board.id === selectedBoardId;
        } else {
          // For meetup posts, board is optional, so check if it exists and matches
          return post.board?.id === selectedBoardId;
        }
      });
    }

    // Filter by following
    if (feedFilter === 'following') {
      filtered = filtered.filter(post => post.isFromFollowedUser === true);
    }

    // Apply comprehensive filters
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post) => passesFilters(post as ReviewPost, filters));
    } else {
      // For meetup posts, apply basic search filter
      if (filters.searchQuery) {
        filtered = filtered.filter((post) => matchesMeetupText(post as MeetupPost, filters.searchQuery));
      }
    }

    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, filters, passesFilters, matchesMeetupText]);

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: In the future, this will navigate to a post detail page
    // TODO: The detail page will show full content, comments, etc.
  };

  const handleSearchFromTag = (tag: string) => {
    updateSearchQuery(tag);
    // The filtering will happen automatically via the filteredPosts useMemo
  };

  const handlePostTypeSelect = (type: 'review' | 'meetup') => {
    console.log(`User wants to create a ${type} post`);
    // TODO: In the future, this will open a form modal
    // TODO: The form will submit to the backend API
  };

  // Current user (mock - in real app, get from auth context)
  const currentUser: User = {
    id: 'me',
    displayName: 'Philip',
    handle: '@philip',
    avatarUrl: '/images/default-avatar.png',
    isFollowedByCurrentUser: false, // User doesn't follow themselves
  };

  // Handler to create a new review post from form values
  const handleCreateReviewPost = (values: ReviewPostFormValues) => {
    const now = new Date();

    // Find the style board (cuisine category)
    const styleBoard = boards.find(b => b.id === values.styleTags[0] && b.category === 'cuisine');
    // Find the category board (type category) for foodType
    const categoryBoard = boards.find(b => b.id === values.categoryTags[0] && b.category === 'type');

    // Derive priceLevel from price range
    let priceLevel: '$' | '$$' | '$$$' = '$';
    if (values.priceMax !== null && values.priceMax !== undefined) {
      if (values.priceMax <= 200) {
        priceLevel = '$';
      } else if (values.priceMax <= 500) {
        priceLevel = '$$';
      } else {
        priceLevel = '$$$';
      }
    } else if (values.priceMin !== null && values.priceMin !== undefined) {
      if (values.priceMin > 500) {
        priceLevel = '$$$';
      } else if (values.priceMin > 200) {
        priceLevel = '$$';
      }
    }

    // Extract locationArea from locationDisplayName
    // Format: "大安區 | 好吃炒飯" or just "好吃炒飯"
    const locationDisplayParts = values.locationDisplayName.split(' | ');
    const locationArea = locationDisplayParts.length > 1 
      ? locationDisplayParts[0]  // e.g. "大安區"
      : 'Taipei'; // Default if no region in display name

    // Convert photo files to image URLs (object URLs for immediate display)
    const imageUrls = values.photoFiles.map((file) => URL.createObjectURL(file));

    const newPost: ReviewPost = {
      id: `local-${now.getTime()}`,
      type: 'review',
      author: currentUser,
      restaurantName: values.restaurantName,
      board: styleBoard || boards[0], // Fallback to first board if not found
      styleType: styleBoard?.label,
      foodType: categoryBoard?.label,
      title: values.restaurantName, // Use restaurant name as title for now
      contentSnippet: values.content.length > 100 
        ? values.content.substring(0, 100) + '...' 
        : values.content,
      rating: values.rating,
      priceLevel,
      priceMax: values.priceMax ?? undefined,
      locationArea,
      createdAt: now.toISOString(),
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      images: imageUrls.length > 0 ? imageUrls : undefined,
      imageUrl: imageUrls[0], // Legacy support
      isFromFollowedUser: feedFilter === 'following',
    };

    // Add the new post to the beginning of the posts array
    setPosts((prev) => [newPost, ...prev]);

    // Optional: scroll to the top of the feed smoothly after posting
    const feedTop = document.getElementById('review-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler to create a new meetup post from form values
  const handleCreateMeetupPost = async (values: DiningMeetupFormValues) => {
    try {
      // Call the API to create the post
      const createdPost = await createMeetupPost(values);
      
      // Convert API response to MeetupPost format
      const now = new Date();
      // Build address from locationText and restaurantName
      const address = `${values.locationText} ${values.restaurantName}`.trim();
      
      const newPost: MeetupPost = {
        id: createdPost.id,
        type: 'meetup',
        author: currentUser,
        restaurantName: values.restaurantName,
        locationText: values.locationText,
        address,
        meetupTime: values.meetupTime,
        foodTags: values.foodTags,
        maxHeadcount: values.maxHeadcount,
        currentHeadcount: values.baseParticipantCount || 1, // Base participants are already "joined"
        budgetDescription: values.budgetDescription,
        hasReservation: values.hasReservation,
        description: values.description,
        visibility: values.visibility,
        imageUrl: values.imageUrl || null,
        status: 'OPEN',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        isFromFollowedUser: feedFilter === 'following',
      };

      // Add the new post to the beginning of the posts array
      setPosts((prev) => [newPost, ...prev]);

      // Close the modal after successful creation
      setIsMeetupComposerOpen(false);

      // Scroll to the top of the feed smoothly after posting
      const feedTop = document.getElementById('review-feed-top');
      if (feedTop) {
        feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.error('Error creating meetup post:', error);
      // TODO: Show error message to user
      // Don't close modal on error so user can retry
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>Loading...</p>
        </div>
      </div>
    );
  }

      return (
        <div className="h-screen flex flex-col bg-bg-primary transition-colors duration-300">
          <TopNavBar
            searchQuery={filters.searchQuery}
            onSearchChange={updateSearchQuery}
            onPostClick={() => {
              const type: PostType = activeTab === 'reviews' ? 'review' : 'meetup';
              console.log('Post clicked', { activeTab, postTypeNext: type });
              setPostType(type);
              setIsPostModalOpen(true);
            }}
          />

          <div className="flex flex-1 w-full overflow-hidden">
            <div className="flex items-stretch w-full">
              {/* Left Sidebar (Desktop) */}
              <aside className="hidden md:block w-64 bg-bg-tertiary border-r border-border-color transition-colors duration-300 self-stretch overflow-y-auto scrollbar-hidden">
                <Sidebar
                  boards={boards}
                  selectedBoardId={selectedBoardId}
                  onBoardSelect={setSelectedBoardId}
                  filters={filters}
                  onChangeStyle={updateStyle}
                  onChangeCategory={updateCategory}
                  onChangePrice={updatePrice}
                  onApplyPrice={applyPrice}
                  onChangeRating={updateRating}
                  onChangeNearMe={updateDistance}
                />
              </aside>

              {/* Mobile Board Chips */}
              <MobileBoardChips
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelect={setSelectedBoardId}
              />

              {/* Center Feed */}
              <main className="flex-1 min-w-0 bg-bg-secondary overflow-y-auto scrollbar-hidden">
                {/* Tabs row at the very top of the center column, just under the navbar */}
                <TabSwitcher
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  feedFilter={feedFilter}
                  onFeedFilterChange={setFeedFilter}
                />

                <div className="px-4" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
                  {/* Feed top anchor for scrolling */}
                  <div id="review-feed-top" />
                  
                  {/* Create Post Composer - Different for each tab */}
              {activeTab === 'reviews' ? (
                <section
                  onClick={() => {
                    setIsReviewModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
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
              ) : activeTab === 'meetups' ? (
                <section
                  onClick={() => {
                    const type: PostType = 'meetup';
                    console.log('Meetup composer placeholder clicked', { activeTab, postTypeNext: type });
                    setPostType(type);
                    setIsPostModalOpen(true);
                  }}
                  className="mt-4 md:mt-6 mb-4 rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-[#f2e4d0]">
                      <img
                        src={
                          currentUser.avatarUrl ||
                          'https://images.squarespace-cdn.com/content/v1/5c34403aaa49a1c60b7e6c7e/1548979956856-ZSK82JV8UYCWVECAKEAS/person.png'
                        }
                        alt="Your avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Placeholder Text */}
                    <div className="flex-1 flex items-center">
                      <p className="text-[15px] text-text-secondary">
                        想找一起吃飯的夥伴？分享你的用餐計畫吧…
                      </p>
                    </div>
                  </div>
                </section>
              ) : null}

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                filteredPosts.map(post => {
                  if (post.type === 'review') {
                    return (
                      <ReviewPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        onLocationClick={handleLocationSelect}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  } else {
                    return (
                      <MeetupPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
                        onTagClick={handleSearchFromTag}
                        isOwnPost={post.author.id === currentUser.id}
                      />
                    );
                  }
                })
              )}
                </div>
              </main>

              {/* Right Sidebar */}
              <aside className="hidden lg:block w-80 bg-bg-sidebar-right border-l border-border-color transition-colors duration-300 self-stretch overflow-y-auto scrollbar-hidden">
                <div className="sticky top-0 p-5 space-y-5">
                  {/* You Might Like */}
                  {recommendedUsers.length > 0 && (
                    <YouMightLike recommendedUsers={recommendedUsers} />
                  )}
                  
                  {/* Small Map */}
                  <SmallMap selectedLocation={selectedLocation} />
                </div>
              </aside>
            </div>
          </div>

          {/* Unified Post Composer Modal */}
      {isPostModalOpen && postType && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] backdrop-blur-sm"
          onClick={() => {
            setIsPostModalOpen(false);
            setPostType(null);
          }}
        >
          <div
            className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] scrollbar-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {postType === 'review' ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary">Create Review Post</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <ReviewPostComposer 
                  initialExpanded={true}
                  currentUser={currentUser}
                  onCreateReviewPost={(values) => {
                    handleCreateReviewPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between p-6 pb-4 border-b border-border-color -m-6 mb-0">
                  <h2 className="text-2xl font-bold text-text-primary">發揪吃飯文</h2>
                  <button
                    onClick={() => {
                      setIsPostModalOpen(false);
                      setPostType(null);
                    }}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                  </button>
                </div>
                <div className="pt-4">
                <DiningMeetupComposer
                  renderModal={false}
                  currentUser={currentUser}
                  onClose={() => {
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                  onCreateMeetupPost={(values) => {
                    handleCreateMeetupPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }}
                />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Post Type Modal (fallback for other cases) */}
      <PostTypeModal
        isOpen={isPostModalOpen && postType === null}
        onClose={() => {
          setIsPostModalOpen(false);
          setPostType(null);
        }}
        onSelectType={(type) => {
          setPostType(type);
          // Keep modal open, will show the composer
        }}
      />

      {/* Legacy Dining Meetup Composer Modal (keep for backward compatibility) */}
      <DiningMeetupComposer
        isOpen={isMeetupComposerOpen}
        onClose={() => setIsMeetupComposerOpen(false)}
        onCreateMeetupPost={handleCreateMeetupPost}
      />

      {/* Review Post Composer Modal */}
      <PostModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="新增餐廳評價"
      >
        <ReviewPostComposer
          initialExpanded={true}
          hideCollapseButton={true}
          currentUser={currentUser}
          onCreateReviewPost={(values) => {
            handleCreateReviewPost(values);
            setIsReviewModalOpen(false);
          }}
        />
      </PostModal>
      </div>
    );
  };


```


移除寬度限制，讓側邊欄填滿整個寬度：


```typescriptreact
          <div className="flex flex-1 w-full overflow-hidden">
```


重新讀取文件確認：



所有修改已完成。以下是總結：

## 已創建/修改的文件列表

### 新創建的文件：

1. **`src/types/location.ts`** - RestaurantLocation 類型定義
2. **`src/components/homepage/SmallMap.tsx`** - 小地圖組件

### 修改的文件：

1. **`src/types/models.ts`** - 擴展 ReviewPost 接口，添加 `restaurantAddress`, `restaurantLat`, `restaurantLng` 字段

2. **`src/components/posts/ReviewPostCard.tsx`** - 添加 `onLocationClick` prop 和處理邏輯

3. **`src/pages/RendezvousHome.tsx`** - 主頁面：
   - 添加右側邊欄（YouMightLike + SmallMap）
   - 添加 `selectedLocation` 狀態和 `handleLocationSelect` 處理函數
   - 移除 `max-w-7xl` 限制，讓側邊欄填滿寬度
   - 為左側邊欄添加獨立滾動

4. **`src/pages/UserProfilePage.tsx`** - 用戶資料頁面：
   - 將 Back to Home 按鈕和 ProfileTabs 放在同一個 sticky 容器中
   - 設置 `sticky top-16` 固定在導航欄下方

5. **`src/components/profile/ProfileTabs.tsx`** - 移除內部的 sticky，因為現在由父容器控制

## 功能說明

### 1. 主頁面小地圖如何接收和響應 location tag 點擊

流程：
1. 用戶點擊 ReviewPostCard 中的 location tag（餐廳名稱+位置）
2. `ReviewPostCard` 檢查是否有 `onLocationClick` prop 和座標數據（`restaurantLat`, `restaurantLng`）
3. 如果有座標，調用 `onLocationClick` 並傳遞位置信息
4. `RendezvousHome` 的 `handleLocationSelect` 接收位置信息並更新 `selectedLocation` 狀態
5. `SmallMap` 組件接收 `selectedLocation` prop
6. `SmallMap` 使用 `useEffect` 監聽 `selectedLocation` 變化：
   - 如果有選中位置：地圖移動到該座標（zoom 16），顯示標記
   - 如果沒有選中位置：重置到默認視圖（台北中心，zoom 13）

實現細節：
- 使用 Google Maps JavaScript API（重用現有的 `useGoogleMaps` hook）
- 標記使用 `DROP` 動畫效果
- 顯示餐廳名稱和地址（如果有）

### 2. 用戶資料頁面 sticky 行為的實現

實現方式：
- 將 Back to Home 按鈕和 ProfileTabs 放在同一個容器中：
  ```tsx
  <div className="sticky top-16 z-40 bg-bg-primary">
    {/* Back to Home Button */}
    {/* Profile Tabs */}
  </div>
  ```
- `top-16` 對應 TopNavBar 的高度（`h-16` = 64px），讓 sticky 區域緊貼導航欄下方
- `z-40` 確保在內容之上
- `bg-bg-primary` 提供背景，避免內容透過

調整 top offset：
- 要調整 sticky 位置，修改 `top-16`：
  - `top-16` = 64px（當前，對應 TopNavBar）
  - `top-20` = 80px
  - `top-24` = 96px
  - 或使用自定義值：`style={{ top: '72px' }}`

滾動行為：
- 當用戶滾動頁面時，Back to Home 按鈕和 ProfileTabs 會固定在頂部
- 只有內容區域（ProfileHeader、ProfileTags、Posts）會滾動
- 用戶可以隨時切換標籤或返回首頁

## 設計特點

- 重用現有組件：使用了 `YouMightLike` 和 `useGoogleMaps` hook
- 響應式設計：右側邊欄在桌面顯示，移動端隱藏
- 性能優化：使用 `useEffect` 和條件渲染避免不必要的重渲染
- 用戶體驗：地圖有載入狀態和錯誤處理，sticky 導航提供更好的導航體驗

所有功能已實作並通過 lint 檢查。可以啟動開發服務器測試新功能。

```typescriptreact
  <div className="sticky top-16 z-40 bg-bg-primary">
    {/* Back to Home Button */}
    {/* Profile Tabs */}
  </div>
```

---

**User**

user profile 的頁面能回到上一版嗎

---

**Cursor**


檢查當前版本，恢復 user profile 頁面到上一版：



恢復 user profile 頁面到上一版（Back to Home 按鈕不在 sticky 容器中，ProfileTabs 有自己的 sticky）：


```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
        // Fetch recommended users
        const recommended = await fetchRecommendedUsers();
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-300">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          navigate('/');
        }}
        showSearch={false}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Back to Home Button */}
            <div className="px-4 md:px-6 py-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">Back to Home</span>
              </button>
            </div>

            {/* Profile Header */}
            <ProfileHeader
              profile={profile}
              isOwnProfile={isOwnProfile}
              onEditClick={() => setIsEditModalOpen(true)}
            />

            {/* Profile Tags */}
            <ProfileTags profile={profile} />

            {/* Profile Tabs */}
            <ProfileTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              postCounts={postCounts}
            />

            {/* Posts Feed */}
            <div className="bg-bg-secondary min-h-screen">
              {currentPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2">No posts found</p>
                  <p className="text-text-secondary text-base opacity-70">
                    {activeTab === 'posts'
                      ? 'This user has not created any posts yet.'
                      : `This user has no ${activeTab} yet.`}
                  </p>
                </div>
              ) : (
                <div>
                  {currentPosts.map((post) => {
                    if (post.type === 'review') {
                      return (
                        <ReviewPostCard
                          key={post.id}
                          post={post as ReviewPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    } else {
                      return (
                        <MeetupPostCard
                          key={post.id}
                          post={post as MeetupPost}
                          onClick={() => handlePostClick(post)}
                          onTagClick={handleTagClick}
                          isOwnPost={post.author.id === currentUserId}
                        />
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - You Might Like (Desktop only) */}
          <aside className="hidden lg:block w-80 flex-shrink-0 pt-4">
            <div className="sticky top-4">
              <YouMightLike recommendedUsers={recommendedUsers} />
            </div>
          </aside>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```

```typescriptreact
import React from 'react';
import { ProfileTab } from '../../types/profile';

interface ProfileTabsProps {
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
  postCounts?: {
    posts: number;
    likes: number;
    replies: number;
    reposts: number;
    bookmarks: number;
  };
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
  postCounts,
}) => {
  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'posts', label: 'Posts' },
    { key: 'likes', label: 'Likes' },
    { key: 'replies', label: 'Replies' },
    { key: 'reposts', label: 'Reposts' },
    { key: 'bookmarks', label: 'Bookmarks' },
  ];

  return (
    <div className="border-b border-border-color bg-bg-secondary sticky top-0 z-30 transition-colors duration-300">
      <div className="flex items-center overflow-x-auto scrollbar-hidden">
        {tabs.map((tab) => {
          const count = postCounts?.[tab.key];
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-4 md:px-6 py-4 text-base font-semibold border-b-2 transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.key
                  ? 'text-accent-primary border-accent-primary'
                  : 'text-text-secondary border-transparent hover:text-text-primary hover:border-border-color'
              }`}
              style={{
                fontFamily: activeTab === tab.key 
                  ? 'Garamond, Baskerville, Georgia, Times New Roman, serif' 
                  : 'inherit',
                fontWeight: activeTab === tab.key ? 900 : 600,
              }}
            >
              {tab.label}
              {count !== undefined && (
                <span className="ml-2 text-text-secondary text-sm font-normal">
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};


```


已將 user profile 頁面恢復到上一版：

## 恢復的變更

1. **Back to Home 按鈕**：
   - 從 sticky 容器中移出
   - 回到原位置（在內容區域內，ProfileHeader 之前）
   - 不再固定在頂部

2. **ProfileTabs**：
   - 恢復自己的 `sticky top-0`
   - 回到 ProfileTags 之後的位置
   - 滾動時會固定在頂部

現在的行為：
- Back to Home 按鈕會隨頁面滾動
- ProfileTabs 在滾動時固定在頂部（`sticky top-0`）

所有修改已完成，沒有 lint 錯誤。

---

**User**

You are a senior frontend engineer on our restaurant-sharing web app (React + TypeScript + Tailwind or our existing UI system).



We already modified the homepage right sidebar to contain:



Top: a “You might like” card



Bottom: a small map that should display the location of a restaurant when user clicks the location tag in a post.



However, there is a bug:



Currently, clicking the restaurant location in a post opens Google Maps in a new tab instead of updating the small map in the right sidebar.



We need to fix this behavior.



Current vs desired behavior

Current



Location text / tag in each post is implemented as a link (e.g. <a href="https://maps.google.com/...">).



Clicking it navigates the browser to Google Maps (or opens a new tab).



Desired



Clicking a location in a post should no longer navigate to Google Maps by default.



Instead, it should:



Update a shared state on the homepage (e.g. selectedLocation).



The right sidebar small map must center on that location and show a marker there.



Optionally, we can keep a separate “Open in Google Maps” button inside the right sidebar detail or the map component, but the main click on the post’s location tag should update the small map only.



Implementation details



Find the location tag component in posts



Locate where posts are rendered in the main homepage feed.



Find the element that displays the restaurant’s location (probably a link inside a post footer, chip, or badge).



It is currently an anchor with an href pointing to Google Maps or some external URL.



Replace external navigation with an internal handler



Change the element from a pure <a href="..."> to either:



a <button> / clickable <span>, or



keep <a> but use onClick={handleLocationClick} + event.preventDefault().



handleLocationClick should:



Receive the restaurant’s location data (id, name, lat, lng, address).



Call a function passed from the homepage container like onLocationSelect(location).



Use homepage state for selected location



On the main homepage component, confirm we have a state like:



const [selectedLocation, setSelectedLocation] = useState<RestaurantLocation | null>(null);





If not, add it.



Pass setSelectedLocation (or a wrapper like handleLocationSelect) down to the post list / post item component.



Ensure each post has access to its location’s lat/lng and other needed info:



If the current post model only has a name or address string, extend the mock data to include coordinates:



type RestaurantLocation = {

  id: string;

  name: string;

  address: string;

  lat: number;

  lng: number;

};





Wire selectedLocation into the right sidebar small map



Confirm the right sidebar small map component already accepts something like selectedLocation as a prop.



When selectedLocation changes:



Pan/zoom the map to lat/lng.



Show a marker at that location.



Optionally show a small label with selectedLocation.name.



Optional: keep “Open in Google Maps”



If we still want to allow opening Google Maps:



Add a small button or link inside the right sidebar map/detail section labeled “在 Google 地圖中開啟”.



That button can use the Google Maps URL constructed from selectedLocation.lat and selectedLocation.lng.



Constraints / quality



Do not break other navigation or map behavior (e.g. 收藏餐廳 page).



Keep all changes localized to:



Post item / location tag components



Homepage container (selectedLocation state & map wiring)



Right sidebar small map (if adjustments are needed)



TypeScript must compile cleanly; add/update types for RestaurantLocation as needed.



No backend calls; still all mock data + local state.



Tasks for you (Cursor)



Identify the components responsible for:



Rendering post location tags.



Managing homepage state.



Rendering the right sidebar small map.



Remove the direct navigation to Google Maps when clicking a location tag and instead:



Call an internal onLocationSelect(location) handler.



Update the homepage’s selectedLocation state.



Ensure the right sidebar small map correctly centers and displays a marker for the newly selected location.



Optionally, add an explicit “Open in Google Maps” button inside the right sidebar if you think it’s useful.



When you’re done, output:



The list of files you modified.



A short explanation of:



How the click flow works now (post location tag → selectedLocation → small map update).



Where to adjust the map center/zoom behavior if we want to tweak it later.

---

**Cursor**


檢查當前實現，修復此問題：



檢查 mock 數據是否包含座標，並修復點擊處理邏輯：



修復此問題：先為 mock 數據添加座標，然後更新點擊處理邏輯。


```typescriptreact
import React, { useState, useEffect } from 'react';
import { ReviewPost } from '../../types/models';
import { Edit3, Archive, Trash2, Bookmark, Flag } from 'lucide-react';
import { PostActions } from './PostActions';

interface ReviewPostCardProps {
  post: ReviewPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
  onLocationClick?: (location: { name: string; address?: string; lat: number; lng: number }) => void;
  isOwnPost?: boolean;
}

interface MenuActionItemProps {
  icon: React.ReactNode;
  label: string;
  destructive?: boolean;
  onClick?: () => void;
}

const MenuActionItem: React.FC<MenuActionItemProps> = ({
  icon,
  label,
  destructive,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
      destructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-800 hover:bg-gray-50'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

// Helper function to map priceMax to symbols and label
function getPriceInfo(maxPrice: number | null | undefined) {
  if (maxPrice == null) {
    return { symbols: "", label: "" };
  }

  if (maxPrice <= 300) {
    return { symbols: "$", label: "NT$0–300" };
  }

  if (maxPrice <= 1000) {
    return { symbols: "$$", label: "NT$301–1000" };
  }

  if (maxPrice <= 5000) {
    return { symbols: "$$$", label: "NT$1001–5000" };
  }

  // 5000+
  return { symbols: "$$$$$", label: "NT$5000+" };
}

export const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, onClick, onTagClick, onLocationClick, isOwnPost = false }) => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute price info from priceMax
  const priceInfo = getPriceInfo(post.priceMax);

  // Handler for selecting location (updates sidebar map instead of opening Google Maps)
  const handleLocationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // If location click handler is provided, always use it (even without coordinates)
    if (onLocationClick) {
      // If we have coordinates, use them
      if (post.restaurantLat && post.restaurantLng) {
        onLocationClick({
          name: post.restaurantName,
          address: post.restaurantAddress,
          lat: post.restaurantLat,
          lng: post.restaurantLng,
        });
      } else {
        // If no coordinates, still call handler but with null coordinates
        // The handler can decide what to do (e.g., show a message or use geocoding)
        // For now, we'll try to use a default location based on locationArea
        const defaultCoords = getDefaultCoordinates(post.locationArea);
        if (defaultCoords) {
          onLocationClick({
            name: post.restaurantName,
            address: post.restaurantAddress || post.locationArea,
            lat: defaultCoords.lat,
            lng: defaultCoords.lng,
          });
        }
      }
    }
  };

  // Helper to get default coordinates for common areas
  const getDefaultCoordinates = (locationArea?: string): { lat: number; lng: number } | null => {
    const areaMap: Record<string, { lat: number; lng: number }> = {
      'Tianmu': { lat: 25.1185, lng: 121.5274 },
      'Xinyi': { lat: 25.0330, lng: 121.5654 },
      'Gongguan': { lat: 25.0167, lng: 121.5333 },
      'Da\'an': { lat: 25.0260, lng: 121.5430 },
    };
    return locationArea ? areaMap[locationArea] || null : null;
  };

  // Helper function to parse and style hashtags
  const renderContentWithHashtags = (text: string) => {
    const parts = text.split(/(#[\w\u4e00-\u9fa5]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
    return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Open lightbox
  const openLightbox = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to previous image
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  // Navigate to next image
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const maxIndex = (post.images?.length || 1) - 1;
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // ESC key listener for lightbox and menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          closeLightbox();
        }
        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen, menuOpen]);

  return (
    <div
      onClick={(e) => {
        // Close menu if open
        if (menuOpen) {
          setMenuOpen(false);
        }
        // Trigger parent onClick
        if (onClick) {
          onClick();
        }
      }}
      className="group px-4 py-3 border-b border-border-color cursor-pointer hover:bg-bg-hover transition-colors duration-200"
    >
      {/* TOP SECTION: Header Row */}
      <div className="flex items-start mb-2">
        {/* Avatar */}
        <div className="relative mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden">
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
          ) : (
              <span className="text-text-primary text-lg">👤</span>
          )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          {/* Line 1: Name, Username, Time + More Menu (right-aligned) */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline flex-wrap gap-1 text-sm">
              <span className="font-bold text-text-primary">
              {post.author.displayName}
            </span>
              <span className="text-text-secondary">
                {post.author.handle}
              </span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">
                {post.createdAt}
              </span>
            </div>
            
            {/* Right-aligned: More menu (...) with dropdown */}
            <div className="relative flex-shrink-0">
              <button
                className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer text-text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-neutral-200 z-20 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isOwnPost ? (
                    <>
                      <MenuActionItem
                        icon={<Edit3 className="w-4 h-4" />}
                        label="Edit this post"
                        onClick={() => {
                          console.log('Edit post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Archive className="w-4 h-4" />}
                        label="Archive this post"
                        onClick={() => {
                          console.log('Archive post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete this post"
                        destructive
                        onClick={() => {
                          console.log('Delete post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <MenuActionItem
                        icon={<Bookmark className="w-4 h-4" />}
                        label="Save this post"
                        onClick={() => {
                          console.log('Save post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Flag className="w-4 h-4" />}
                        label="Report this post"
                        destructive
                        onClick={() => {
                          console.log('Report post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Line 2: Three Separate Pills - Restaurant+Location, Style Type, Food Type */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {/* Chip 1: Restaurant + Location */}
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer group-hover:bg-neutral-50 transition-colors"
              onClick={handleOpenGoogleMaps}
            >
              {(post.locationArea || (post as any).region) && (
                <>
                  <span className="text-text-secondary">
                    {(post as any).region || post.locationArea}
                  </span>
                  <span className="text-gray-300">|</span>
                </>
              )}
              <span className="font-medium text-text-primary">
                {post.restaurantName}
              </span>
            </button>

            {/* Chip 2: Style Type (Cuisine) - use styleType if available, otherwise use board if it's cuisine */}
            {(post.styleType || (post.board?.category === 'cuisine' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.styleType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.styleType || post.board?.label}
                </span>
              </button>
            )}

            {/* Chip 3: Food Type - use foodType if available, otherwise use board if it's type */}
            {(post.foodType || (post.board?.category === 'type' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.foodType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.foodType || post.board?.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Post Content Area */}
      <div className="ml-[52px]">
        {/* RATING ROW (ABOVE content text) */}
        <div className="mt-1 flex items-center text-sm text-text-secondary">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(post.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Numeric rating */}
          <span className="ml-2 font-semibold text-text-primary">
            {post.rating.toFixed(1)}
          </span>

          {/* Dot separator */}
          <span className="mx-2 text-text-secondary/60">·</span>

          {/* Price Symbols + Range */}
          {priceInfo.symbols && (
            <>
              <span className="font-semibold text-text-primary">{priceInfo.symbols}</span>
              <span className="ml-2 text-xs text-text-secondary">{priceInfo.label}</span>
            </>
          )}
        </div>

        {/* CONTENT TEXT with hashtag styling */}
        <p className="mt-3 text-base text-text-primary leading-relaxed mb-3">
          {renderContentWithHashtags(post.contentSnippet)}
        </p>

        {/* IMAGE GALLERY */}
        {/* PRODUCTION NOTE: Images should be uploaded to cloud storage (AWS S3, GCS, Firebase Storage) 
            and URLs stored in database. Never rely on direct Unsplash/external hotlinks in production. */}
        {(post.images && post.images.length > 0) ? (
          <div className="mb-3 -mx-4">
            <div 
              className="flex overflow-x-auto scroll-smooth px-4 gap-3"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {post.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden border border-border-color group cursor-pointer snap-center"
                  style={{
                    width: post.images!.length === 1 ? 'calc(100% - 2rem)' : '85%',
                    height: '300px',
                  }}
                  onClick={(e) => openLightbox(index, e)}
                >
                  <img
                    src={imageUrl}
                    alt={`${post.restaurantName} - ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {/* Image counter badge - HOVER ONLY */}
                  {post.images!.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}/{post.images!.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Hide scrollbar CSS-in-JS */}
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : post.imageUrl ? (
          // Legacy single image support
          <div 
            className="rounded-xl overflow-hidden border border-border-color mb-3 cursor-pointer group"
            onClick={(e) => openLightbox(0, e)}
          >
            <img 
              src={post.imageUrl} 
              alt={post.restaurantName}
              className="w-full h-[300px] object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ) : null}

        {/* BOTTOM ACTION BAR - Like, Comment, Share, Save */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          <PostActions
            postId={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            onLike={(id) => console.log('like post', id)}
            onComment={(id) => console.log('comment post', id)}
            onShare={(id) => console.log('share post', id)}
          />
          
          {/* Save restaurant location (map pin) - Review posts only */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('save restaurant location', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          {/* Modal Content */}
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* Main Image */}
            <img
              src={(post.images && post.images[activeIndex]) || post.imageUrl || ''}
              alt={`${post.restaurantName} - ${activeIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            {post.images && post.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                {activeIndex + 1} / {post.images.length}
              </div>
            )}

            {/* Previous Arrow */}
            {post.images && post.images.length > 1 && activeIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {post.images && post.images.length > 1 && activeIndex < post.images.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { ReviewPost } from '../../types/models';
import { Edit3, Archive, Trash2, Bookmark, Flag } from 'lucide-react';
import { PostActions } from './PostActions';

interface ReviewPostCardProps {
  post: ReviewPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
  onLocationClick?: (location: { name: string; address?: string; lat: number; lng: number }) => void;
  isOwnPost?: boolean;
}

interface MenuActionItemProps {
  icon: React.ReactNode;
  label: string;
  destructive?: boolean;
  onClick?: () => void;
}

const MenuActionItem: React.FC<MenuActionItemProps> = ({
  icon,
  label,
  destructive,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
      destructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-800 hover:bg-gray-50'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

// Helper function to map priceMax to symbols and label
function getPriceInfo(maxPrice: number | null | undefined) {
  if (maxPrice == null) {
    return { symbols: "", label: "" };
  }

  if (maxPrice <= 300) {
    return { symbols: "$", label: "NT$0–300" };
  }

  if (maxPrice <= 1000) {
    return { symbols: "$$", label: "NT$301–1000" };
  }

  if (maxPrice <= 5000) {
    return { symbols: "$$$", label: "NT$1001–5000" };
  }

  // 5000+
  return { symbols: "$$$$$", label: "NT$5000+" };
}

export const ReviewPostCard: React.FC<ReviewPostCardProps> = ({ post, onClick, onTagClick, onLocationClick, isOwnPost = false }) => {
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Compute price info from priceMax
  const priceInfo = getPriceInfo(post.priceMax);

  // Handler for selecting location (updates sidebar map instead of opening Google Maps)
  const handleLocationClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // If location click handler is provided, always use it (even without coordinates)
    if (onLocationClick) {
      // If we have coordinates, use them
      if (post.restaurantLat && post.restaurantLng) {
        onLocationClick({
          name: post.restaurantName,
          address: post.restaurantAddress,
          lat: post.restaurantLat,
          lng: post.restaurantLng,
        });
      } else {
        // If no coordinates, still call handler but with null coordinates
        // The handler can decide what to do (e.g., show a message or use geocoding)
        // For now, we'll try to use a default location based on locationArea
        const defaultCoords = getDefaultCoordinates(post.locationArea);
        if (defaultCoords) {
          onLocationClick({
            name: post.restaurantName,
            address: post.restaurantAddress || post.locationArea,
            lat: defaultCoords.lat,
            lng: defaultCoords.lng,
          });
        }
      }
    }
  };

  // Helper to get default coordinates for common areas
  const getDefaultCoordinates = (locationArea?: string): { lat: number; lng: number } | null => {
    const areaMap: Record<string, { lat: number; lng: number }> = {
      'Tianmu': { lat: 25.1185, lng: 121.5274 },
      'Xinyi': { lat: 25.0330, lng: 121.5654 },
      'Gongguan': { lat: 25.0167, lng: 121.5333 },
      'Da\'an': { lat: 25.0260, lng: 121.5430 },
    };
    return locationArea ? areaMap[locationArea] || null : null;
  };

  // Helper function to parse and style hashtags
  const renderContentWithHashtags = (text: string) => {
    const parts = text.split(/(#[\w\u4e00-\u9fa5]+)/g);
    return parts.map((part, index) => {
      if (part.startsWith('#')) {
    return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Open lightbox
  const openLightbox = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to previous image
  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  // Navigate to next image
  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const maxIndex = (post.images?.length || 1) - 1;
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // ESC key listener for lightbox and menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          closeLightbox();
        }
        if (menuOpen) {
          setMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [lightboxOpen, menuOpen]);

  return (
    <div
      onClick={(e) => {
        // Close menu if open
        if (menuOpen) {
          setMenuOpen(false);
        }
        // Trigger parent onClick
        if (onClick) {
          onClick();
        }
      }}
      className="group px-4 py-3 border-b border-border-color cursor-pointer hover:bg-bg-hover transition-colors duration-200"
    >
      {/* TOP SECTION: Header Row */}
      <div className="flex items-start mb-2">
        {/* Avatar */}
        <div className="relative mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden">
          {post.author.avatarUrl ? (
            <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
          ) : (
              <span className="text-text-primary text-lg">👤</span>
          )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          {/* Line 1: Name, Username, Time + More Menu (right-aligned) */}
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline flex-wrap gap-1 text-sm">
              <span className="font-bold text-text-primary">
              {post.author.displayName}
            </span>
              <span className="text-text-secondary">
                {post.author.handle}
              </span>
              <span className="text-text-secondary">•</span>
              <span className="text-text-secondary">
                {post.createdAt}
              </span>
            </div>
            
            {/* Right-aligned: More menu (...) with dropdown */}
            <div className="relative flex-shrink-0">
              <button
                className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer text-text-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen((v) => !v);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {menuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-neutral-200 z-20 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isOwnPost ? (
                    <>
                      <MenuActionItem
                        icon={<Edit3 className="w-4 h-4" />}
                        label="Edit this post"
                        onClick={() => {
                          console.log('Edit post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Archive className="w-4 h-4" />}
                        label="Archive this post"
                        onClick={() => {
                          console.log('Archive post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Trash2 className="w-4 h-4" />}
                        label="Delete this post"
                        destructive
                        onClick={() => {
                          console.log('Delete post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <MenuActionItem
                        icon={<Bookmark className="w-4 h-4" />}
                        label="Save this post"
                        onClick={() => {
                          console.log('Save post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                      <MenuActionItem
                        icon={<Flag className="w-4 h-4" />}
                        label="Report this post"
                        destructive
                        onClick={() => {
                          console.log('Report post', post.id);
                          setMenuOpen(false);
                        }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Line 2: Three Separate Pills - Restaurant+Location, Style Type, Food Type */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {/* Chip 1: Restaurant + Location */}
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer group-hover:bg-neutral-50 transition-colors"
              onClick={handleLocationClick}
            >
              {(post.locationArea || (post as any).region) && (
                <>
                  <span className="text-text-secondary">
                    {(post as any).region || post.locationArea}
                  </span>
                  <span className="text-gray-300">|</span>
                </>
              )}
              <span className="font-medium text-text-primary">
                {post.restaurantName}
              </span>
            </button>

            {/* Chip 2: Style Type (Cuisine) - use styleType if available, otherwise use board if it's cuisine */}
            {(post.styleType || (post.board?.category === 'cuisine' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.styleType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.styleType || post.board?.label}
                </span>
              </button>
            )}

            {/* Chip 3: Food Type - use foodType if available, otherwise use board if it's type */}
            {(post.foodType || (post.board?.category === 'type' && post.board?.label)) && (
              <button
                className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  const tag = post.foodType || post.board?.label;
                  if (tag && onTagClick) {
                    onTagClick(tag);
                  }
                }}
              >
                <span className="font-medium text-text-primary">
                  {post.foodType || post.board?.label}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Post Content Area */}
      <div className="ml-[52px]">
        {/* RATING ROW (ABOVE content text) */}
        <div className="mt-1 flex items-center text-sm text-text-secondary">
          {/* Stars */}
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(post.rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          {/* Numeric rating */}
          <span className="ml-2 font-semibold text-text-primary">
            {post.rating.toFixed(1)}
          </span>

          {/* Dot separator */}
          <span className="mx-2 text-text-secondary/60">·</span>

          {/* Price Symbols + Range */}
          {priceInfo.symbols && (
            <>
              <span className="font-semibold text-text-primary">{priceInfo.symbols}</span>
              <span className="ml-2 text-xs text-text-secondary">{priceInfo.label}</span>
            </>
          )}
        </div>

        {/* CONTENT TEXT with hashtag styling */}
        <p className="mt-3 text-base text-text-primary leading-relaxed mb-3">
          {renderContentWithHashtags(post.contentSnippet)}
        </p>

        {/* IMAGE GALLERY */}
        {/* PRODUCTION NOTE: Images should be uploaded to cloud storage (AWS S3, GCS, Firebase Storage) 
            and URLs stored in database. Never rely on direct Unsplash/external hotlinks in production. */}
        {(post.images && post.images.length > 0) ? (
          <div className="mb-3 -mx-4">
            <div 
              className="flex overflow-x-auto scroll-smooth px-4 gap-3"
              style={{
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {post.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden border border-border-color group cursor-pointer snap-center"
                  style={{
                    width: post.images!.length === 1 ? 'calc(100% - 2rem)' : '85%',
                    height: '300px',
                  }}
                  onClick={(e) => openLightbox(index, e)}
                >
                  <img
                    src={imageUrl}
                    alt={`${post.restaurantName} - ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                  {/* Image counter badge - HOVER ONLY */}
                  {post.images!.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      {index + 1}/{post.images!.length}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Hide scrollbar CSS-in-JS */}
            <style>{`
              .overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : post.imageUrl ? (
          // Legacy single image support
          <div 
            className="rounded-xl overflow-hidden border border-border-color mb-3 cursor-pointer group"
            onClick={(e) => openLightbox(0, e)}
          >
            <img 
              src={post.imageUrl} 
              alt={post.restaurantName}
              className="w-full h-[300px] object-cover hover:opacity-90 transition-opacity"
            />
          </div>
        ) : null}

        {/* BOTTOM ACTION BAR - Like, Comment, Share, Save */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          <PostActions
            postId={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            onLike={(id) => console.log('like post', id)}
            onComment={(id) => console.log('comment post', id)}
            onShare={(id) => console.log('share post', id)}
          />
          
          {/* Save restaurant location (map pin) - Review posts only */}
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              console.log('save restaurant location', post.id);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          {/* Modal Content */}
          <div className="relative max-w-[90vw] max-h-[90vh]">
            {/* Main Image */}
            <img
              src={(post.images && post.images[activeIndex]) || post.imageUrl || ''}
              alt={`${post.restaurantName} - ${activeIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Counter */}
            {post.images && post.images.length > 1 && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg text-sm font-semibold">
                {activeIndex + 1} / {post.images.length}
              </div>
            )}

            {/* Previous Arrow */}
            {post.images && post.images.length > 1 && activeIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {post.images && post.images.length > 1 && activeIndex < post.images.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 left-4 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2 rounded-full transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


```

```typescriptreact
import React, { useEffect, useRef } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { RestaurantLocation } from '../../types/location';

interface SmallMapProps {
  selectedLocation: RestaurantLocation | null;
}

export const SmallMap: React.FC<SmallMapProps> = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    // Default center: Taipei
    const defaultCenter = { lat: 25.0330, lng: 121.5654 };

    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: defaultCenter,
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    });
  }, [isLoaded]);

  // Update map when location is selected
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded) return;

    if (selectedLocation) {
      // Center map on selected location
      const position = { lat: selectedLocation.lat, lng: selectedLocation.lng };
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(16);

      // Remove previous marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Create new marker
      markerRef.current = new google.maps.Marker({
        position,
        map: mapInstanceRef.current,
        title: selectedLocation.name,
        animation: google.maps.Animation.DROP,
      });
    } else {
      // Reset to default view when no location is selected
      const defaultCenter = { lat: 25.0330, lng: 121.5654 };
      mapInstanceRef.current.setCenter(defaultCenter);
      mapInstanceRef.current.setZoom(13);

      // Remove marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    }
  }, [selectedLocation, isLoaded]);

  if (loadError) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-text-secondary text-sm">無法載入地圖：{loadError.message}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-primary mx-auto mb-2"></div>
          <p className="text-text-secondary text-xs">載入地圖中...</p>
        </div>
      </div>
    );
  }

  // Handler to open in Google Maps
  const handleOpenInGoogleMaps = () => {
    if (selectedLocation) {
      const query = `${selectedLocation.name} ${selectedLocation.address || ''}`.trim();
      const url = selectedLocation.lat && selectedLocation.lng
        ? `https://www.google.com/maps?q=${selectedLocation.lat},${selectedLocation.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-bg-card rounded-2xl border border-border-color p-4 shadow-sm">
      <h3 className="text-lg font-bold text-text-primary mb-3" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
        Location Preview
      </h3>
      {selectedLocation ? (
        <div className="mb-2">
          <p className="text-sm font-semibold text-text-primary">{selectedLocation.name}</p>
          {selectedLocation.address && (
            <p className="text-xs text-text-secondary mt-1">{selectedLocation.address}</p>
          )}
          <button
            onClick={handleOpenInGoogleMaps}
            className="mt-2 text-xs text-accent-primary hover:underline font-medium"
          >
            在 Google 地圖中開啟
          </button>
        </div>
      ) : (
        <p className="text-sm text-text-secondary mb-2">Select a restaurant location to preview it here</p>
      )}
      <div ref={mapRef} className="w-full h-64 rounded-lg overflow-hidden" />
    </div>
  );
};


```


為 mock 數據添加座標：


```typescript
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { sortWithOthersLast } from '../utils/sorting';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data - raw boards array (will be sorted)
const mockBoardsRaw: Board[] = [
  // By Cuisine / Style
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
  // By Food Type
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

// Keep original array for mock posts (they reference boards by index)
// The sorted version will be exported for UI display
const mockBoards = mockBoardsRaw;

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
  { id: 'real_harrystyles', displayName: 'Harry Styles', handle: '@real_harrystyles', avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg', isFollowedByCurrentUser: true },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    styleType: '美式 American',
    foodType: '速食 Fast Food',
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    priceMax: 250,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    shareCount: 8,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'saboten-tianmu',
    type: 'review',
    author: mockUsers[6], // Harry Styles
    restaurantName: '勝博殿 新光三越天母店',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '炸豬排 Tonkatsu',
    // Google Maps: https://share.google/vH94IEyh2dBKddN1Y
    title: '天母勝博殿的日式炸豬排超讚！',
    contentSnippet: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
    rating: 4.4,
    priceLevel: '$$',
    priceMax: 800,
    locationArea: 'Tianmu',
    createdAt: '30分鐘前',
    likeCount: 102,
    commentCount: 14,
    shareCount: 23,
    images: [
      'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '拉麵 Ramen',
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    priceMax: 480,
    locationArea: 'Xinyi',
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
    shareCount: 15,
    images: [
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review2',
    type: 'review',
    author: mockUsers[1],
    restaurantName: '鼎泰豐',
    board: mockBoards[3], // Taiwanese
    title: '小籠包還是這裡最經典',
    contentSnippet: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
    rating: 4.8,
    priceLevel: '$$',
    priceMax: 650,
    locationArea: 'Gongguan',
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    shareCount: 32,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    styleType: '法式 French',
    foodType: '甜點 Desserts',
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    priceMax: 380,
    locationArea: 'Xinyi',
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
    shareCount: 45,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review4',
    type: 'review',
    author: mockUsers[3],
    restaurantName: '永和豆漿',
    board: mockBoards[14], // Breakfast
    title: '傳統早餐的溫暖',
    contentSnippet: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
    rating: 4.2,
    priceLevel: '$',
    priceMax: 120,
    locationArea: 'Gongguan',
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
    shareCount: 12,
    isFromFollowedUser: false,
  },
  {
    id: 'review5',
    type: 'review',
    author: mockUsers[4],
    restaurantName: '韓式炸雞店',
    board: mockBoards[2], // Korean
    title: '超酥脆的韓式炸雞',
    contentSnippet: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
    rating: 4.6,
    priceLevel: '$$',
    priceMax: 550,
    locationArea: 'Xinyi',
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
    shareCount: 28,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
];

const mockMeetupPosts: MeetupPost[] = [
  {
    id: 'meetup1',
    type: 'meetup',
    author: mockUsers[0],
    restaurantName: '無老鍋 台北信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 22 號',
    meetupTime: '2024-11-30T19:00:00+08:00',
    foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
    maxHeadcount: 4,
    currentHeadcount: 2,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: true,
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '3小時前',
    updatedAt: '3小時前',
    likeCount: 15,
    commentCount: 3,
    shareCount: 2,
    isFromFollowedUser: true,
    board: mockBoards[3], // Taiwanese (for backward compatibility)
    locationArea: 'Xinyi', // for backward compatibility
  },
  {
    id: 'meetup2',
    type: 'meetup',
    author: mockUsers[2],
    restaurantName: '拉麵店探索',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 1 號',
    meetupTime: '2024-12-01T12:00:00+08:00',
    foodTags: ['日式 Japanese', '拉麵 Ramen'],
    maxHeadcount: 3,
    currentHeadcount: 1,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: false,
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '6小時前',
    updatedAt: '6小時前',
    likeCount: 8,
    commentCount: 1,
    shareCount: 0,
    isFromFollowedUser: true,
    board: mockBoards[1], // Japanese
    locationArea: 'Gongguan',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    author: mockUsers[1],
    restaurantName: 'Lady M 信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 28 號',
    meetupTime: '2024-11-28T15:00:00+08:00',
    foodTags: ['甜點 Desserts', '法式 French'],
    maxHeadcount: 3,
    currentHeadcount: 3,
    budgetDescription: '預計 800–1000 / 1 人',
    hasReservation: true,
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'CLOSED', // Closed because full
    createdAt: '2天前',
    updatedAt: '2天前',
    likeCount: 22,
    commentCount: 5,
    shareCount: 4,
    isFromFollowedUser: false,
    board: mockBoards[12], // Desserts
    locationArea: 'Xinyi',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    author: mockUsers[4],
    restaurantName: '公館夜市',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 90 號',
    meetupTime: '2024-12-02T18:00:00+08:00',
    foodTags: ['街頭小吃 Street Food'],
    maxHeadcount: 5,
    currentHeadcount: 2,
    budgetDescription: '預計 200–300 / 1 人',
    hasReservation: false,
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '1天前',
    updatedAt: '1天前',
    likeCount: 12,
    commentCount: 2,
    shareCount: 1,
    isFromFollowedUser: true,
    board: mockBoards[15], // Street Food
    locationArea: 'Gongguan',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  // Return sorted boards: alphabetically by English name, with "Others" always last
  return sortWithOthersLast(mockBoards, (board) => board.name);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

// API functions for meetup posts
export async function fetchMeetupPosts(visibility?: 'PUBLIC' | 'FOLLOWERS'): Promise<MeetupPost[]> {
  await delay(300);
  let posts = [...mockMeetupPosts];
  
  // Filter by visibility if provided (in real app, this would be based on current user)
  if (visibility) {
    posts = posts.filter(post => post.visibility === visibility);
  }
  
  // Sort by createdAt DESC (newest first)
  return posts.sort((a, b) => {
    // Simple comparison - in real app, parse ISO dates properly
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export interface CreateMeetupPostRequest {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount?: number; // Number of people already in the group
  expectedInviteCount?: number; // Total headcount for the meetup
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
}

export async function createMeetupPost(data: CreateMeetupPostRequest): Promise<MeetupPost> {
  await delay(500);
  
  // In real app, this would call the backend API
  // For now, create a mock post
  const now = new Date();
  const newPost: MeetupPost = {
    id: `meetup-${now.getTime()}`,
    type: 'meetup',
    author: mockUsers[0], // In real app, get from auth context
    restaurantName: data.restaurantName,
    locationText: data.locationText,
    meetupTime: data.meetupTime,
    foodTags: data.foodTags,
    maxHeadcount: data.maxHeadcount,
    currentHeadcount: data.baseParticipantCount || 1, // Base participants are already "joined"
    budgetDescription: data.budgetDescription,
    hasReservation: data.hasReservation,
    description: data.description,
    visibility: data.visibility,
    imageUrl: data.imageUrl || null,
    status: 'OPEN',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isFromFollowedUser: false,
  };
  
  // In real app, add to database
  mockMeetupPosts.unshift(newPost);
  
  return newPost;
}


```

```typescript
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { sortWithOthersLast } from '../utils/sorting';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data - raw boards array (will be sorted)
const mockBoardsRaw: Board[] = [
  // By Cuisine / Style
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
  // By Food Type
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

// Keep original array for mock posts (they reference boards by index)
// The sorted version will be exported for UI display
const mockBoards = mockBoardsRaw;

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
  { id: 'real_harrystyles', displayName: 'Harry Styles', handle: '@real_harrystyles', avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg', isFollowedByCurrentUser: true },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    styleType: '美式 American',
    foodType: '速食 Fast Food',
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    priceMax: 250,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    shareCount: 8,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'saboten-tianmu',
    type: 'review',
    author: mockUsers[6], // Harry Styles
    restaurantName: '勝博殿 新光三越天母店',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '炸豬排 Tonkatsu',
    // Google Maps: https://share.google/vH94IEyh2dBKddN1Y
    title: '天母勝博殿的日式炸豬排超讚！',
    contentSnippet: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
    rating: 4.4,
    priceLevel: '$$',
    priceMax: 800,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '30分鐘前',
    likeCount: 102,
    commentCount: 14,
    shareCount: 23,
    images: [
      'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '拉麵 Ramen',
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    priceMax: 480,
    locationArea: 'Xinyi',
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
    shareCount: 15,
    images: [
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review2',
    type: 'review',
    author: mockUsers[1],
    restaurantName: '鼎泰豐',
    board: mockBoards[3], // Taiwanese
    title: '小籠包還是這裡最經典',
    contentSnippet: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
    rating: 4.8,
    priceLevel: '$$',
    priceMax: 650,
    locationArea: 'Gongguan',
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    shareCount: 32,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    styleType: '法式 French',
    foodType: '甜點 Desserts',
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    priceMax: 380,
    locationArea: 'Xinyi',
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
    shareCount: 45,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review4',
    type: 'review',
    author: mockUsers[3],
    restaurantName: '永和豆漿',
    board: mockBoards[14], // Breakfast
    title: '傳統早餐的溫暖',
    contentSnippet: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
    rating: 4.2,
    priceLevel: '$',
    priceMax: 120,
    locationArea: 'Gongguan',
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
    shareCount: 12,
    isFromFollowedUser: false,
  },
  {
    id: 'review5',
    type: 'review',
    author: mockUsers[4],
    restaurantName: '韓式炸雞店',
    board: mockBoards[2], // Korean
    title: '超酥脆的韓式炸雞',
    contentSnippet: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
    rating: 4.6,
    priceLevel: '$$',
    priceMax: 550,
    locationArea: 'Xinyi',
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
    shareCount: 28,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
];

const mockMeetupPosts: MeetupPost[] = [
  {
    id: 'meetup1',
    type: 'meetup',
    author: mockUsers[0],
    restaurantName: '無老鍋 台北信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 22 號',
    meetupTime: '2024-11-30T19:00:00+08:00',
    foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
    maxHeadcount: 4,
    currentHeadcount: 2,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: true,
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '3小時前',
    updatedAt: '3小時前',
    likeCount: 15,
    commentCount: 3,
    shareCount: 2,
    isFromFollowedUser: true,
    board: mockBoards[3], // Taiwanese (for backward compatibility)
    locationArea: 'Xinyi', // for backward compatibility
  },
  {
    id: 'meetup2',
    type: 'meetup',
    author: mockUsers[2],
    restaurantName: '拉麵店探索',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 1 號',
    meetupTime: '2024-12-01T12:00:00+08:00',
    foodTags: ['日式 Japanese', '拉麵 Ramen'],
    maxHeadcount: 3,
    currentHeadcount: 1,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: false,
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '6小時前',
    updatedAt: '6小時前',
    likeCount: 8,
    commentCount: 1,
    shareCount: 0,
    isFromFollowedUser: true,
    board: mockBoards[1], // Japanese
    locationArea: 'Gongguan',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    author: mockUsers[1],
    restaurantName: 'Lady M 信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 28 號',
    meetupTime: '2024-11-28T15:00:00+08:00',
    foodTags: ['甜點 Desserts', '法式 French'],
    maxHeadcount: 3,
    currentHeadcount: 3,
    budgetDescription: '預計 800–1000 / 1 人',
    hasReservation: true,
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'CLOSED', // Closed because full
    createdAt: '2天前',
    updatedAt: '2天前',
    likeCount: 22,
    commentCount: 5,
    shareCount: 4,
    isFromFollowedUser: false,
    board: mockBoards[12], // Desserts
    locationArea: 'Xinyi',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    author: mockUsers[4],
    restaurantName: '公館夜市',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 90 號',
    meetupTime: '2024-12-02T18:00:00+08:00',
    foodTags: ['街頭小吃 Street Food'],
    maxHeadcount: 5,
    currentHeadcount: 2,
    budgetDescription: '預計 200–300 / 1 人',
    hasReservation: false,
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '1天前',
    updatedAt: '1天前',
    likeCount: 12,
    commentCount: 2,
    shareCount: 1,
    isFromFollowedUser: true,
    board: mockBoards[15], // Street Food
    locationArea: 'Gongguan',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  // Return sorted boards: alphabetically by English name, with "Others" always last
  return sortWithOthersLast(mockBoards, (board) => board.name);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

// API functions for meetup posts
export async function fetchMeetupPosts(visibility?: 'PUBLIC' | 'FOLLOWERS'): Promise<MeetupPost[]> {
  await delay(300);
  let posts = [...mockMeetupPosts];
  
  // Filter by visibility if provided (in real app, this would be based on current user)
  if (visibility) {
    posts = posts.filter(post => post.visibility === visibility);
  }
  
  // Sort by createdAt DESC (newest first)
  return posts.sort((a, b) => {
    // Simple comparison - in real app, parse ISO dates properly
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export interface CreateMeetupPostRequest {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount?: number; // Number of people already in the group
  expectedInviteCount?: number; // Total headcount for the meetup
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
}

export async function createMeetupPost(data: CreateMeetupPostRequest): Promise<MeetupPost> {
  await delay(500);
  
  // In real app, this would call the backend API
  // For now, create a mock post
  const now = new Date();
  const newPost: MeetupPost = {
    id: `meetup-${now.getTime()}`,
    type: 'meetup',
    author: mockUsers[0], // In real app, get from auth context
    restaurantName: data.restaurantName,
    locationText: data.locationText,
    meetupTime: data.meetupTime,
    foodTags: data.foodTags,
    maxHeadcount: data.maxHeadcount,
    currentHeadcount: data.baseParticipantCount || 1, // Base participants are already "joined"
    budgetDescription: data.budgetDescription,
    hasReservation: data.hasReservation,
    description: data.description,
    visibility: data.visibility,
    imageUrl: data.imageUrl || null,
    status: 'OPEN',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isFromFollowedUser: false,
  };
  
  // In real app, add to database
  mockMeetupPosts.unshift(newPost);
  
  return newPost;
}


```

```typescript
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { sortWithOthersLast } from '../utils/sorting';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data - raw boards array (will be sorted)
const mockBoardsRaw: Board[] = [
  // By Cuisine / Style
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
  // By Food Type
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

// Keep original array for mock posts (they reference boards by index)
// The sorted version will be exported for UI display
const mockBoards = mockBoardsRaw;

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
  { id: 'real_harrystyles', displayName: 'Harry Styles', handle: '@real_harrystyles', avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg', isFollowedByCurrentUser: true },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    styleType: '美式 American',
    foodType: '速食 Fast Food',
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    priceMax: 250,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    shareCount: 8,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'saboten-tianmu',
    type: 'review',
    author: mockUsers[6], // Harry Styles
    restaurantName: '勝博殿 新光三越天母店',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '炸豬排 Tonkatsu',
    // Google Maps: https://share.google/vH94IEyh2dBKddN1Y
    title: '天母勝博殿的日式炸豬排超讚！',
    contentSnippet: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
    rating: 4.4,
    priceLevel: '$$',
    priceMax: 800,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '30分鐘前',
    likeCount: 102,
    commentCount: 14,
    shareCount: 23,
    images: [
      'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '拉麵 Ramen',
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    priceMax: 480,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區信義路五段7號',
    restaurantLat: 25.0330,
    restaurantLng: 121.5654,
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
    shareCount: 15,
    images: [
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review2',
    type: 'review',
    author: mockUsers[1],
    restaurantName: '鼎泰豐',
    board: mockBoards[3], // Taiwanese
    title: '小籠包還是這裡最經典',
    contentSnippet: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
    rating: 4.8,
    priceLevel: '$$',
    priceMax: 650,
    locationArea: 'Gongguan',
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    shareCount: 32,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    styleType: '法式 French',
    foodType: '甜點 Desserts',
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    priceMax: 380,
    locationArea: 'Xinyi',
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
    shareCount: 45,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review4',
    type: 'review',
    author: mockUsers[3],
    restaurantName: '永和豆漿',
    board: mockBoards[14], // Breakfast
    title: '傳統早餐的溫暖',
    contentSnippet: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
    rating: 4.2,
    priceLevel: '$',
    priceMax: 120,
    locationArea: 'Gongguan',
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
    shareCount: 12,
    isFromFollowedUser: false,
  },
  {
    id: 'review5',
    type: 'review',
    author: mockUsers[4],
    restaurantName: '韓式炸雞店',
    board: mockBoards[2], // Korean
    title: '超酥脆的韓式炸雞',
    contentSnippet: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
    rating: 4.6,
    priceLevel: '$$',
    priceMax: 550,
    locationArea: 'Xinyi',
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
    shareCount: 28,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
];

const mockMeetupPosts: MeetupPost[] = [
  {
    id: 'meetup1',
    type: 'meetup',
    author: mockUsers[0],
    restaurantName: '無老鍋 台北信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 22 號',
    meetupTime: '2024-11-30T19:00:00+08:00',
    foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
    maxHeadcount: 4,
    currentHeadcount: 2,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: true,
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '3小時前',
    updatedAt: '3小時前',
    likeCount: 15,
    commentCount: 3,
    shareCount: 2,
    isFromFollowedUser: true,
    board: mockBoards[3], // Taiwanese (for backward compatibility)
    locationArea: 'Xinyi', // for backward compatibility
  },
  {
    id: 'meetup2',
    type: 'meetup',
    author: mockUsers[2],
    restaurantName: '拉麵店探索',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 1 號',
    meetupTime: '2024-12-01T12:00:00+08:00',
    foodTags: ['日式 Japanese', '拉麵 Ramen'],
    maxHeadcount: 3,
    currentHeadcount: 1,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: false,
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '6小時前',
    updatedAt: '6小時前',
    likeCount: 8,
    commentCount: 1,
    shareCount: 0,
    isFromFollowedUser: true,
    board: mockBoards[1], // Japanese
    locationArea: 'Gongguan',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    author: mockUsers[1],
    restaurantName: 'Lady M 信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 28 號',
    meetupTime: '2024-11-28T15:00:00+08:00',
    foodTags: ['甜點 Desserts', '法式 French'],
    maxHeadcount: 3,
    currentHeadcount: 3,
    budgetDescription: '預計 800–1000 / 1 人',
    hasReservation: true,
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'CLOSED', // Closed because full
    createdAt: '2天前',
    updatedAt: '2天前',
    likeCount: 22,
    commentCount: 5,
    shareCount: 4,
    isFromFollowedUser: false,
    board: mockBoards[12], // Desserts
    locationArea: 'Xinyi',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    author: mockUsers[4],
    restaurantName: '公館夜市',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 90 號',
    meetupTime: '2024-12-02T18:00:00+08:00',
    foodTags: ['街頭小吃 Street Food'],
    maxHeadcount: 5,
    currentHeadcount: 2,
    budgetDescription: '預計 200–300 / 1 人',
    hasReservation: false,
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '1天前',
    updatedAt: '1天前',
    likeCount: 12,
    commentCount: 2,
    shareCount: 1,
    isFromFollowedUser: true,
    board: mockBoards[15], // Street Food
    locationArea: 'Gongguan',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  // Return sorted boards: alphabetically by English name, with "Others" always last
  return sortWithOthersLast(mockBoards, (board) => board.name);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

// API functions for meetup posts
export async function fetchMeetupPosts(visibility?: 'PUBLIC' | 'FOLLOWERS'): Promise<MeetupPost[]> {
  await delay(300);
  let posts = [...mockMeetupPosts];
  
  // Filter by visibility if provided (in real app, this would be based on current user)
  if (visibility) {
    posts = posts.filter(post => post.visibility === visibility);
  }
  
  // Sort by createdAt DESC (newest first)
  return posts.sort((a, b) => {
    // Simple comparison - in real app, parse ISO dates properly
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export interface CreateMeetupPostRequest {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount?: number; // Number of people already in the group
  expectedInviteCount?: number; // Total headcount for the meetup
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
}

export async function createMeetupPost(data: CreateMeetupPostRequest): Promise<MeetupPost> {
  await delay(500);
  
  // In real app, this would call the backend API
  // For now, create a mock post
  const now = new Date();
  const newPost: MeetupPost = {
    id: `meetup-${now.getTime()}`,
    type: 'meetup',
    author: mockUsers[0], // In real app, get from auth context
    restaurantName: data.restaurantName,
    locationText: data.locationText,
    meetupTime: data.meetupTime,
    foodTags: data.foodTags,
    maxHeadcount: data.maxHeadcount,
    currentHeadcount: data.baseParticipantCount || 1, // Base participants are already "joined"
    budgetDescription: data.budgetDescription,
    hasReservation: data.hasReservation,
    description: data.description,
    visibility: data.visibility,
    imageUrl: data.imageUrl || null,
    status: 'OPEN',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isFromFollowedUser: false,
  };
  
  // In real app, add to database
  mockMeetupPosts.unshift(newPost);
  
  return newPost;
}


```

```typescript
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { sortWithOthersLast } from '../utils/sorting';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data - raw boards array (will be sorted)
const mockBoardsRaw: Board[] = [
  // By Cuisine / Style
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
  // By Food Type
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

// Keep original array for mock posts (they reference boards by index)
// The sorted version will be exported for UI display
const mockBoards = mockBoardsRaw;

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
  { id: 'real_harrystyles', displayName: 'Harry Styles', handle: '@real_harrystyles', avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg', isFollowedByCurrentUser: true },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    styleType: '美式 American',
    foodType: '速食 Fast Food',
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    priceMax: 250,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    shareCount: 8,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'saboten-tianmu',
    type: 'review',
    author: mockUsers[6], // Harry Styles
    restaurantName: '勝博殿 新光三越天母店',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '炸豬排 Tonkatsu',
    // Google Maps: https://share.google/vH94IEyh2dBKddN1Y
    title: '天母勝博殿的日式炸豬排超讚！',
    contentSnippet: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
    rating: 4.4,
    priceLevel: '$$',
    priceMax: 800,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '30分鐘前',
    likeCount: 102,
    commentCount: 14,
    shareCount: 23,
    images: [
      'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '拉麵 Ramen',
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    priceMax: 480,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區信義路五段7號',
    restaurantLat: 25.0330,
    restaurantLng: 121.5654,
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
    shareCount: 15,
    images: [
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review2',
    type: 'review',
    author: mockUsers[1],
    restaurantName: '鼎泰豐',
    board: mockBoards[3], // Taiwanese
    title: '小籠包還是這裡最經典',
    contentSnippet: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
    rating: 4.8,
    priceLevel: '$$',
    priceMax: 650,
    locationArea: 'Gongguan',
    restaurantAddress: '台北市大安區信義路二段194號',
    restaurantLat: 25.0339,
    restaurantLng: 121.5325,
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    shareCount: 32,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    styleType: '法式 French',
    foodType: '甜點 Desserts',
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    priceMax: 380,
    locationArea: 'Xinyi',
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
    shareCount: 45,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review4',
    type: 'review',
    author: mockUsers[3],
    restaurantName: '永和豆漿',
    board: mockBoards[14], // Breakfast
    title: '傳統早餐的溫暖',
    contentSnippet: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
    rating: 4.2,
    priceLevel: '$',
    priceMax: 120,
    locationArea: 'Gongguan',
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
    shareCount: 12,
    isFromFollowedUser: false,
  },
  {
    id: 'review5',
    type: 'review',
    author: mockUsers[4],
    restaurantName: '韓式炸雞店',
    board: mockBoards[2], // Korean
    title: '超酥脆的韓式炸雞',
    contentSnippet: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
    rating: 4.6,
    priceLevel: '$$',
    priceMax: 550,
    locationArea: 'Xinyi',
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
    shareCount: 28,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
];

const mockMeetupPosts: MeetupPost[] = [
  {
    id: 'meetup1',
    type: 'meetup',
    author: mockUsers[0],
    restaurantName: '無老鍋 台北信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 22 號',
    meetupTime: '2024-11-30T19:00:00+08:00',
    foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
    maxHeadcount: 4,
    currentHeadcount: 2,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: true,
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '3小時前',
    updatedAt: '3小時前',
    likeCount: 15,
    commentCount: 3,
    shareCount: 2,
    isFromFollowedUser: true,
    board: mockBoards[3], // Taiwanese (for backward compatibility)
    locationArea: 'Xinyi', // for backward compatibility
  },
  {
    id: 'meetup2',
    type: 'meetup',
    author: mockUsers[2],
    restaurantName: '拉麵店探索',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 1 號',
    meetupTime: '2024-12-01T12:00:00+08:00',
    foodTags: ['日式 Japanese', '拉麵 Ramen'],
    maxHeadcount: 3,
    currentHeadcount: 1,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: false,
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '6小時前',
    updatedAt: '6小時前',
    likeCount: 8,
    commentCount: 1,
    shareCount: 0,
    isFromFollowedUser: true,
    board: mockBoards[1], // Japanese
    locationArea: 'Gongguan',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    author: mockUsers[1],
    restaurantName: 'Lady M 信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 28 號',
    meetupTime: '2024-11-28T15:00:00+08:00',
    foodTags: ['甜點 Desserts', '法式 French'],
    maxHeadcount: 3,
    currentHeadcount: 3,
    budgetDescription: '預計 800–1000 / 1 人',
    hasReservation: true,
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'CLOSED', // Closed because full
    createdAt: '2天前',
    updatedAt: '2天前',
    likeCount: 22,
    commentCount: 5,
    shareCount: 4,
    isFromFollowedUser: false,
    board: mockBoards[12], // Desserts
    locationArea: 'Xinyi',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    author: mockUsers[4],
    restaurantName: '公館夜市',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 90 號',
    meetupTime: '2024-12-02T18:00:00+08:00',
    foodTags: ['街頭小吃 Street Food'],
    maxHeadcount: 5,
    currentHeadcount: 2,
    budgetDescription: '預計 200–300 / 1 人',
    hasReservation: false,
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '1天前',
    updatedAt: '1天前',
    likeCount: 12,
    commentCount: 2,
    shareCount: 1,
    isFromFollowedUser: true,
    board: mockBoards[15], // Street Food
    locationArea: 'Gongguan',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  // Return sorted boards: alphabetically by English name, with "Others" always last
  return sortWithOthersLast(mockBoards, (board) => board.name);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

// API functions for meetup posts
export async function fetchMeetupPosts(visibility?: 'PUBLIC' | 'FOLLOWERS'): Promise<MeetupPost[]> {
  await delay(300);
  let posts = [...mockMeetupPosts];
  
  // Filter by visibility if provided (in real app, this would be based on current user)
  if (visibility) {
    posts = posts.filter(post => post.visibility === visibility);
  }
  
  // Sort by createdAt DESC (newest first)
  return posts.sort((a, b) => {
    // Simple comparison - in real app, parse ISO dates properly
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export interface CreateMeetupPostRequest {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount?: number; // Number of people already in the group
  expectedInviteCount?: number; // Total headcount for the meetup
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
}

export async function createMeetupPost(data: CreateMeetupPostRequest): Promise<MeetupPost> {
  await delay(500);
  
  // In real app, this would call the backend API
  // For now, create a mock post
  const now = new Date();
  const newPost: MeetupPost = {
    id: `meetup-${now.getTime()}`,
    type: 'meetup',
    author: mockUsers[0], // In real app, get from auth context
    restaurantName: data.restaurantName,
    locationText: data.locationText,
    meetupTime: data.meetupTime,
    foodTags: data.foodTags,
    maxHeadcount: data.maxHeadcount,
    currentHeadcount: data.baseParticipantCount || 1, // Base participants are already "joined"
    budgetDescription: data.budgetDescription,
    hasReservation: data.hasReservation,
    description: data.description,
    visibility: data.visibility,
    imageUrl: data.imageUrl || null,
    status: 'OPEN',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isFromFollowedUser: false,
  };
  
  // In real app, add to database
  mockMeetupPosts.unshift(newPost);
  
  return newPost;
}


```

```typescript
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { sortWithOthersLast } from '../utils/sorting';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data - raw boards array (will be sorted)
const mockBoardsRaw: Board[] = [
  // By Cuisine / Style
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
  // By Food Type
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

// Keep original array for mock posts (they reference boards by index)
// The sorted version will be exported for UI display
const mockBoards = mockBoardsRaw;

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
  { id: 'real_harrystyles', displayName: 'Harry Styles', handle: '@real_harrystyles', avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg', isFollowedByCurrentUser: true },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    styleType: '美式 American',
    foodType: '速食 Fast Food',
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    priceMax: 250,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    shareCount: 8,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'saboten-tianmu',
    type: 'review',
    author: mockUsers[6], // Harry Styles
    restaurantName: '勝博殿 新光三越天母店',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '炸豬排 Tonkatsu',
    // Google Maps: https://share.google/vH94IEyh2dBKddN1Y
    title: '天母勝博殿的日式炸豬排超讚！',
    contentSnippet: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
    rating: 4.4,
    priceLevel: '$$',
    priceMax: 800,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '30分鐘前',
    likeCount: 102,
    commentCount: 14,
    shareCount: 23,
    images: [
      'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '拉麵 Ramen',
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    priceMax: 480,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區信義路五段7號',
    restaurantLat: 25.0330,
    restaurantLng: 121.5654,
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
    shareCount: 15,
    images: [
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review2',
    type: 'review',
    author: mockUsers[1],
    restaurantName: '鼎泰豐',
    board: mockBoards[3], // Taiwanese
    title: '小籠包還是這裡最經典',
    contentSnippet: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
    rating: 4.8,
    priceLevel: '$$',
    priceMax: 650,
    locationArea: 'Gongguan',
    restaurantAddress: '台北市大安區信義路二段194號',
    restaurantLat: 25.0339,
    restaurantLng: 121.5325,
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    shareCount: 32,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    styleType: '法式 French',
    foodType: '甜點 Desserts',
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    priceMax: 380,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區松高路19號',
    restaurantLat: 25.0400,
    restaurantLng: 121.5680,
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
    shareCount: 45,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review4',
    type: 'review',
    author: mockUsers[3],
    restaurantName: '永和豆漿',
    board: mockBoards[14], // Breakfast
    title: '傳統早餐的溫暖',
    contentSnippet: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
    rating: 4.2,
    priceLevel: '$',
    priceMax: 120,
    locationArea: 'Gongguan',
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
    shareCount: 12,
    isFromFollowedUser: false,
  },
  {
    id: 'review5',
    type: 'review',
    author: mockUsers[4],
    restaurantName: '韓式炸雞店',
    board: mockBoards[2], // Korean
    title: '超酥脆的韓式炸雞',
    contentSnippet: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
    rating: 4.6,
    priceLevel: '$$',
    priceMax: 550,
    locationArea: 'Xinyi',
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
    shareCount: 28,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
];

const mockMeetupPosts: MeetupPost[] = [
  {
    id: 'meetup1',
    type: 'meetup',
    author: mockUsers[0],
    restaurantName: '無老鍋 台北信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 22 號',
    meetupTime: '2024-11-30T19:00:00+08:00',
    foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
    maxHeadcount: 4,
    currentHeadcount: 2,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: true,
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '3小時前',
    updatedAt: '3小時前',
    likeCount: 15,
    commentCount: 3,
    shareCount: 2,
    isFromFollowedUser: true,
    board: mockBoards[3], // Taiwanese (for backward compatibility)
    locationArea: 'Xinyi', // for backward compatibility
  },
  {
    id: 'meetup2',
    type: 'meetup',
    author: mockUsers[2],
    restaurantName: '拉麵店探索',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 1 號',
    meetupTime: '2024-12-01T12:00:00+08:00',
    foodTags: ['日式 Japanese', '拉麵 Ramen'],
    maxHeadcount: 3,
    currentHeadcount: 1,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: false,
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '6小時前',
    updatedAt: '6小時前',
    likeCount: 8,
    commentCount: 1,
    shareCount: 0,
    isFromFollowedUser: true,
    board: mockBoards[1], // Japanese
    locationArea: 'Gongguan',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    author: mockUsers[1],
    restaurantName: 'Lady M 信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 28 號',
    meetupTime: '2024-11-28T15:00:00+08:00',
    foodTags: ['甜點 Desserts', '法式 French'],
    maxHeadcount: 3,
    currentHeadcount: 3,
    budgetDescription: '預計 800–1000 / 1 人',
    hasReservation: true,
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'CLOSED', // Closed because full
    createdAt: '2天前',
    updatedAt: '2天前',
    likeCount: 22,
    commentCount: 5,
    shareCount: 4,
    isFromFollowedUser: false,
    board: mockBoards[12], // Desserts
    locationArea: 'Xinyi',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    author: mockUsers[4],
    restaurantName: '公館夜市',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 90 號',
    meetupTime: '2024-12-02T18:00:00+08:00',
    foodTags: ['街頭小吃 Street Food'],
    maxHeadcount: 5,
    currentHeadcount: 2,
    budgetDescription: '預計 200–300 / 1 人',
    hasReservation: false,
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '1天前',
    updatedAt: '1天前',
    likeCount: 12,
    commentCount: 2,
    shareCount: 1,
    isFromFollowedUser: true,
    board: mockBoards[15], // Street Food
    locationArea: 'Gongguan',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  // Return sorted boards: alphabetically by English name, with "Others" always last
  return sortWithOthersLast(mockBoards, (board) => board.name);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

// API functions for meetup posts
export async function fetchMeetupPosts(visibility?: 'PUBLIC' | 'FOLLOWERS'): Promise<MeetupPost[]> {
  await delay(300);
  let posts = [...mockMeetupPosts];
  
  // Filter by visibility if provided (in real app, this would be based on current user)
  if (visibility) {
    posts = posts.filter(post => post.visibility === visibility);
  }
  
  // Sort by createdAt DESC (newest first)
  return posts.sort((a, b) => {
    // Simple comparison - in real app, parse ISO dates properly
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export interface CreateMeetupPostRequest {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount?: number; // Number of people already in the group
  expectedInviteCount?: number; // Total headcount for the meetup
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
}

export async function createMeetupPost(data: CreateMeetupPostRequest): Promise<MeetupPost> {
  await delay(500);
  
  // In real app, this would call the backend API
  // For now, create a mock post
  const now = new Date();
  const newPost: MeetupPost = {
    id: `meetup-${now.getTime()}`,
    type: 'meetup',
    author: mockUsers[0], // In real app, get from auth context
    restaurantName: data.restaurantName,
    locationText: data.locationText,
    meetupTime: data.meetupTime,
    foodTags: data.foodTags,
    maxHeadcount: data.maxHeadcount,
    currentHeadcount: data.baseParticipantCount || 1, // Base participants are already "joined"
    budgetDescription: data.budgetDescription,
    hasReservation: data.hasReservation,
    description: data.description,
    visibility: data.visibility,
    imageUrl: data.imageUrl || null,
    status: 'OPEN',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isFromFollowedUser: false,
  };
  
  // In real app, add to database
  mockMeetupPosts.unshift(newPost);
  
  return newPost;
}


```

```typescript
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { sortWithOthersLast } from '../utils/sorting';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data - raw boards array (will be sorted)
const mockBoardsRaw: Board[] = [
  // By Cuisine / Style
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
  // By Food Type
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

// Keep original array for mock posts (they reference boards by index)
// The sorted version will be exported for UI display
const mockBoards = mockBoardsRaw;

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
  { id: 'real_harrystyles', displayName: 'Harry Styles', handle: '@real_harrystyles', avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg', isFollowedByCurrentUser: true },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    styleType: '美式 American',
    foodType: '速食 Fast Food',
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    priceMax: 250,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    shareCount: 8,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'saboten-tianmu',
    type: 'review',
    author: mockUsers[6], // Harry Styles
    restaurantName: '勝博殿 新光三越天母店',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '炸豬排 Tonkatsu',
    // Google Maps: https://share.google/vH94IEyh2dBKddN1Y
    title: '天母勝博殿的日式炸豬排超讚！',
    contentSnippet: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
    rating: 4.4,
    priceLevel: '$$',
    priceMax: 800,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '30分鐘前',
    likeCount: 102,
    commentCount: 14,
    shareCount: 23,
    images: [
      'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '拉麵 Ramen',
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    priceMax: 480,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區信義路五段7號',
    restaurantLat: 25.0330,
    restaurantLng: 121.5654,
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
    shareCount: 15,
    images: [
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review2',
    type: 'review',
    author: mockUsers[1],
    restaurantName: '鼎泰豐',
    board: mockBoards[3], // Taiwanese
    title: '小籠包還是這裡最經典',
    contentSnippet: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
    rating: 4.8,
    priceLevel: '$$',
    priceMax: 650,
    locationArea: 'Gongguan',
    restaurantAddress: '台北市大安區信義路二段194號',
    restaurantLat: 25.0339,
    restaurantLng: 121.5325,
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    shareCount: 32,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    styleType: '法式 French',
    foodType: '甜點 Desserts',
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    priceMax: 380,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區松高路19號',
    restaurantLat: 25.0400,
    restaurantLng: 121.5680,
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
    shareCount: 45,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review4',
    type: 'review',
    author: mockUsers[3],
    restaurantName: '永和豆漿',
    board: mockBoards[14], // Breakfast
    title: '傳統早餐的溫暖',
    contentSnippet: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
    rating: 4.2,
    priceLevel: '$',
    priceMax: 120,
    locationArea: 'Gongguan',
    restaurantAddress: '台北市大安區羅斯福路三段316巷',
    restaurantLat: 25.0167,
    restaurantLng: 121.5333,
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
    shareCount: 12,
    isFromFollowedUser: false,
  },
  {
    id: 'review5',
    type: 'review',
    author: mockUsers[4],
    restaurantName: '韓式炸雞店',
    board: mockBoards[2], // Korean
    title: '超酥脆的韓式炸雞',
    contentSnippet: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
    rating: 4.6,
    priceLevel: '$$',
    priceMax: 550,
    locationArea: 'Xinyi',
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
    shareCount: 28,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
];

const mockMeetupPosts: MeetupPost[] = [
  {
    id: 'meetup1',
    type: 'meetup',
    author: mockUsers[0],
    restaurantName: '無老鍋 台北信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 22 號',
    meetupTime: '2024-11-30T19:00:00+08:00',
    foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
    maxHeadcount: 4,
    currentHeadcount: 2,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: true,
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '3小時前',
    updatedAt: '3小時前',
    likeCount: 15,
    commentCount: 3,
    shareCount: 2,
    isFromFollowedUser: true,
    board: mockBoards[3], // Taiwanese (for backward compatibility)
    locationArea: 'Xinyi', // for backward compatibility
  },
  {
    id: 'meetup2',
    type: 'meetup',
    author: mockUsers[2],
    restaurantName: '拉麵店探索',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 1 號',
    meetupTime: '2024-12-01T12:00:00+08:00',
    foodTags: ['日式 Japanese', '拉麵 Ramen'],
    maxHeadcount: 3,
    currentHeadcount: 1,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: false,
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '6小時前',
    updatedAt: '6小時前',
    likeCount: 8,
    commentCount: 1,
    shareCount: 0,
    isFromFollowedUser: true,
    board: mockBoards[1], // Japanese
    locationArea: 'Gongguan',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    author: mockUsers[1],
    restaurantName: 'Lady M 信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 28 號',
    meetupTime: '2024-11-28T15:00:00+08:00',
    foodTags: ['甜點 Desserts', '法式 French'],
    maxHeadcount: 3,
    currentHeadcount: 3,
    budgetDescription: '預計 800–1000 / 1 人',
    hasReservation: true,
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'CLOSED', // Closed because full
    createdAt: '2天前',
    updatedAt: '2天前',
    likeCount: 22,
    commentCount: 5,
    shareCount: 4,
    isFromFollowedUser: false,
    board: mockBoards[12], // Desserts
    locationArea: 'Xinyi',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    author: mockUsers[4],
    restaurantName: '公館夜市',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 90 號',
    meetupTime: '2024-12-02T18:00:00+08:00',
    foodTags: ['街頭小吃 Street Food'],
    maxHeadcount: 5,
    currentHeadcount: 2,
    budgetDescription: '預計 200–300 / 1 人',
    hasReservation: false,
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '1天前',
    updatedAt: '1天前',
    likeCount: 12,
    commentCount: 2,
    shareCount: 1,
    isFromFollowedUser: true,
    board: mockBoards[15], // Street Food
    locationArea: 'Gongguan',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  // Return sorted boards: alphabetically by English name, with "Others" always last
  return sortWithOthersLast(mockBoards, (board) => board.name);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

// API functions for meetup posts
export async function fetchMeetupPosts(visibility?: 'PUBLIC' | 'FOLLOWERS'): Promise<MeetupPost[]> {
  await delay(300);
  let posts = [...mockMeetupPosts];
  
  // Filter by visibility if provided (in real app, this would be based on current user)
  if (visibility) {
    posts = posts.filter(post => post.visibility === visibility);
  }
  
  // Sort by createdAt DESC (newest first)
  return posts.sort((a, b) => {
    // Simple comparison - in real app, parse ISO dates properly
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export interface CreateMeetupPostRequest {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount?: number; // Number of people already in the group
  expectedInviteCount?: number; // Total headcount for the meetup
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
}

export async function createMeetupPost(data: CreateMeetupPostRequest): Promise<MeetupPost> {
  await delay(500);
  
  // In real app, this would call the backend API
  // For now, create a mock post
  const now = new Date();
  const newPost: MeetupPost = {
    id: `meetup-${now.getTime()}`,
    type: 'meetup',
    author: mockUsers[0], // In real app, get from auth context
    restaurantName: data.restaurantName,
    locationText: data.locationText,
    meetupTime: data.meetupTime,
    foodTags: data.foodTags,
    maxHeadcount: data.maxHeadcount,
    currentHeadcount: data.baseParticipantCount || 1, // Base participants are already "joined"
    budgetDescription: data.budgetDescription,
    hasReservation: data.hasReservation,
    description: data.description,
    visibility: data.visibility,
    imageUrl: data.imageUrl || null,
    status: 'OPEN',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isFromFollowedUser: false,
  };
  
  // In real app, add to database
  mockMeetupPosts.unshift(newPost);
  
  return newPost;
}


```

```typescript
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { sortWithOthersLast } from '../utils/sorting';

// IMPORTANT: For production apps, DO NOT use direct Unsplash hotlinks.
// User-uploaded images must be stored in cloud storage (AWS S3, Google Cloud Storage, or Firebase Storage).
// The image URLs below are DEMO placeholders only.

// Mock data - raw boards array (will be sorted)
const mockBoardsRaw: Board[] = [
  // By Cuisine / Style
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
  // By Food Type
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

// Keep original array for mock posts (they reference boards by index)
// The sorted version will be exported for UI display
const mockBoards = mockBoardsRaw;

const mockUsers: User[] = [
  { id: 'user1', displayName: 'Foodie NTU', handle: '@foodie_ntu', isFollowedByCurrentUser: true },
  { id: 'user2', displayName: 'Taipei Eater', handle: '@taipei_eater', isFollowedByCurrentUser: false },
  { id: 'user3', displayName: 'Ramen Lover', handle: '@ramen_lover', isFollowedByCurrentUser: true },
  { id: 'user4', displayName: 'Sweet Tooth', handle: '@sweet_tooth', isFollowedByCurrentUser: false },
  { id: 'user5', displayName: 'Street Food Hunter', handle: '@street_hunter', isFollowedByCurrentUser: true },
  { id: 'lamige_9', displayName: '王柏融', handle: '@lamige_9', avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRlemVfqgIwcy8YxYkeyEcWKZaQ8gKT64JVg&s', isFollowedByCurrentUser: false },
  { id: 'real_harrystyles', displayName: 'Harry Styles', handle: '@real_harrystyles', avatarUrl: 'https://m.media-amazon.com/images/M/MV5BN2YxZGU1YTMtZmYyYy00YzA5LWIyNjMtMDA1NDg5YmFjMWY2XkEyXkFqcGc@._V1_.jpg', isFollowedByCurrentUser: true },
];

const mockReviewPosts: ReviewPost[] = [
  {
    id: 'post-mcd-tianmu-1',
    type: 'review',
    author: mockUsers[5], // 王柏融
    restaurantName: '麥當勞-天母餐廳',
    board: mockBoards[0], // American
    styleType: '美式 American',
    foodType: '速食 Fast Food',
    title: '天母這間麥當勞氣氛 surprisingly 不錯',
    contentSnippet: '今天跟朋友在天母這間麥當勞吃晚餐，座位寬敞、不會太吵。薯條熱騰騰、雞塊也很酥，附近想找速食時可以考慮這家。#麥當勞 #天母 #速食',
    rating: 4.3,
    priceLevel: '$$',
    priceMax: 250,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '1小時前',
    likeCount: 59,
    commentCount: 12,
    shareCount: 8,
    images: [
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: false,
  },
  {
    id: 'saboten-tianmu',
    type: 'review',
    author: mockUsers[6], // Harry Styles
    restaurantName: '勝博殿 新光三越天母店',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '炸豬排 Tonkatsu',
    // Google Maps: https://share.google/vH94IEyh2dBKddN1Y
    title: '天母勝博殿的日式炸豬排超讚！',
    contentSnippet: '跟朋友跑來天母新光三越的勝博殿吃炸豬排，外皮酥脆但不會刮嘴，肉超嫩又多汁，味噌湯和高麗菜可以續到飽，超適合周末犒賞自己！ #勝博殿 #天母 #炸豬排 #日式料理 #百貨公司美食',
    rating: 4.4,
    priceLevel: '$$',
    priceMax: 800,
    locationArea: 'Tianmu',
    restaurantAddress: '台北市士林區天母東路68號',
    restaurantLat: 25.1185,
    restaurantLng: 121.5274,
    createdAt: '30分鐘前',
    likeCount: 102,
    commentCount: 14,
    shareCount: 23,
    images: [
      'https://images.unsplash.com/photo-1532347922424-c652d9b7208e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1629978522805-07e4d16c5204?auto=format&fit=crop&w=1200&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review1',
    type: 'review',
    author: mockUsers[0],
    restaurantName: 'Ichiran Ramen',
    board: mockBoards[1], // Japanese
    styleType: '日式 Japanese',
    foodType: '拉麵 Ramen',
    title: '超濃郁的拉麵體驗！',
    contentSnippet: '今天去了信義區的Ichiran，湯頭真的超濃郁，麵條Q彈有嚼勁。雖然價格偏高，但絕對值得一試！',
    rating: 4.5,
    priceLevel: '$$$',
    priceMax: 480,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區信義路五段7號',
    restaurantLat: 25.0330,
    restaurantLng: 121.5654,
    createdAt: '2小時前',
    likeCount: 42,
    commentCount: 12,
    shareCount: 15,
    images: [
      'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800&q=80',
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80',
      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review2',
    type: 'review',
    author: mockUsers[1],
    restaurantName: '鼎泰豐',
    board: mockBoards[3], // Taiwanese
    title: '小籠包還是這裡最經典',
    contentSnippet: '每次來都必點小籠包和炒飯，品質穩定，服務也很好。雖然要排隊，但等待是值得的。',
    rating: 4.8,
    priceLevel: '$$',
    priceMax: 650,
    locationArea: 'Gongguan',
    restaurantAddress: '台北市大安區信義路二段194號',
    restaurantLat: 25.0339,
    restaurantLng: 121.5325,
    createdAt: '5小時前',
    likeCount: 88,
    commentCount: 23,
    shareCount: 32,
    isFromFollowedUser: false,
  },
  {
    id: 'review3',
    type: 'review',
    author: mockUsers[2],
    restaurantName: 'Lady M',
    board: mockBoards[12], // Desserts
    styleType: '法式 French',
    foodType: '甜點 Desserts',
    title: '千層蛋糕的天花板',
    contentSnippet: '第一次嘗試Lady M的千層蛋糕，每一層都超薄，奶油香而不膩。雖然價格不便宜，但偶爾犒賞自己很值得！',
    rating: 4.7,
    priceLevel: '$$$',
    priceMax: 380,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區松高路19號',
    restaurantLat: 25.0400,
    restaurantLng: 121.5680,
    createdAt: '1天前',
    likeCount: 156,
    commentCount: 45,
    shareCount: 45,
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
  {
    id: 'review4',
    type: 'review',
    author: mockUsers[3],
    restaurantName: '永和豆漿',
    board: mockBoards[14], // Breakfast
    title: '傳統早餐的溫暖',
    contentSnippet: '早上六點就來排隊，燒餅油條配豆漿，簡單卻滿足。價格親民，是學生族的最愛。',
    rating: 4.2,
    priceLevel: '$',
    priceMax: 120,
    locationArea: 'Gongguan',
    restaurantAddress: '台北市大安區羅斯福路三段316巷',
    restaurantLat: 25.0167,
    restaurantLng: 121.5333,
    createdAt: '1天前',
    likeCount: 67,
    commentCount: 18,
    shareCount: 12,
    isFromFollowedUser: false,
  },
  {
    id: 'review5',
    type: 'review',
    author: mockUsers[4],
    restaurantName: '韓式炸雞店',
    board: mockBoards[2], // Korean
    title: '超酥脆的韓式炸雞',
    contentSnippet: '點了原味和辣味雙拼，外皮超酥脆，肉質多汁。配啤酒超搭！適合朋友聚餐。',
    rating: 4.6,
    priceLevel: '$$',
    priceMax: 550,
    locationArea: 'Xinyi',
    restaurantAddress: '台北市信義區松仁路58號',
    restaurantLat: 25.0380,
    restaurantLng: 121.5700,
    createdAt: '2天前',
    likeCount: 94,
    commentCount: 31,
    shareCount: 28,
    images: [
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    ],
    isFromFollowedUser: true,
  },
];

const mockMeetupPosts: MeetupPost[] = [
  {
    id: 'meetup1',
    type: 'meetup',
    author: mockUsers[0],
    restaurantName: '無老鍋 台北信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 22 號',
    meetupTime: '2024-11-30T19:00:00+08:00',
    foodTags: ['台菜 Taiwanese', '火鍋 Hotpot'],
    maxHeadcount: 4,
    currentHeadcount: 2,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: true,
    description: '想找3-4個人一起來吃無老鍋，可以點更多種類的食材，分攤下來也比較划算。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '3小時前',
    updatedAt: '3小時前',
    likeCount: 15,
    commentCount: 3,
    shareCount: 2,
    isFromFollowedUser: true,
    board: mockBoards[3], // Taiwanese (for backward compatibility)
    locationArea: 'Xinyi', // for backward compatibility
  },
  {
    id: 'meetup2',
    type: 'meetup',
    author: mockUsers[2],
    restaurantName: '拉麵店探索',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 1 號',
    meetupTime: '2024-12-01T12:00:00+08:00',
    foodTags: ['日式 Japanese', '拉麵 Ramen'],
    maxHeadcount: 3,
    currentHeadcount: 1,
    budgetDescription: '預計 500–700 / 1 人',
    hasReservation: false,
    description: '想找喜歡拉麵的朋友一起探索台北的拉麵店，每週末去一家，分享心得。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '6小時前',
    updatedAt: '6小時前',
    likeCount: 8,
    commentCount: 1,
    shareCount: 0,
    isFromFollowedUser: true,
    board: mockBoards[1], // Japanese
    locationArea: 'Gongguan',
  },
  {
    id: 'meetup3',
    type: 'meetup',
    author: mockUsers[1],
    restaurantName: 'Lady M 信義店',
    locationText: 'Xinyi',
    address: '台北市信義區松壽路 28 號',
    meetupTime: '2024-11-28T15:00:00+08:00',
    foodTags: ['甜點 Desserts', '法式 French'],
    maxHeadcount: 3,
    currentHeadcount: 3,
    budgetDescription: '預計 800–1000 / 1 人',
    hasReservation: true,
    description: '想找人一起分享Lady M的千層蛋糕，可以點不同口味一起品嚐。',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'CLOSED', // Closed because full
    createdAt: '2天前',
    updatedAt: '2天前',
    likeCount: 22,
    commentCount: 5,
    shareCount: 4,
    isFromFollowedUser: false,
    board: mockBoards[12], // Desserts
    locationArea: 'Xinyi',
  },
  {
    id: 'meetup4',
    type: 'meetup',
    author: mockUsers[4],
    restaurantName: '公館夜市',
    locationText: 'Gongguan',
    address: '台北市大安區羅斯福路四段 90 號',
    meetupTime: '2024-12-02T18:00:00+08:00',
    foodTags: ['街頭小吃 Street Food'],
    maxHeadcount: 5,
    currentHeadcount: 2,
    budgetDescription: '預計 200–300 / 1 人',
    hasReservation: false,
    description: '週五晚上逛夜市，尋找隱藏版美食，歡迎一起來！',
    visibility: 'PUBLIC',
    imageUrl: null,
    status: 'OPEN',
    createdAt: '1天前',
    updatedAt: '1天前',
    likeCount: 12,
    commentCount: 2,
    shareCount: 1,
    isFromFollowedUser: true,
    board: mockBoards[15], // Street Food
    locationArea: 'Gongguan',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchBoards(): Promise<Board[]> {
  await delay(300);
  // Return sorted boards: alphabetically by English name, with "Others" always last
  return sortWithOthersLast(mockBoards, (board) => board.name);
}

export async function fetchPosts(): Promise<Post[]> {
  await delay(500);
  return [...mockReviewPosts, ...mockMeetupPosts];
}

// API functions for meetup posts
export async function fetchMeetupPosts(visibility?: 'PUBLIC' | 'FOLLOWERS'): Promise<MeetupPost[]> {
  await delay(300);
  let posts = [...mockMeetupPosts];
  
  // Filter by visibility if provided (in real app, this would be based on current user)
  if (visibility) {
    posts = posts.filter(post => post.visibility === visibility);
  }
  
  // Sort by createdAt DESC (newest first)
  return posts.sort((a, b) => {
    // Simple comparison - in real app, parse ISO dates properly
    return b.createdAt.localeCompare(a.createdAt);
  });
}

export interface CreateMeetupPostRequest {
  restaurantName: string;
  locationText: string;
  meetupTime: string; // ISO datetime string
  foodTags: string[];
  maxHeadcount: number; // Total capacity (baseParticipantCount + expectedInviteCount)
  baseParticipantCount?: number; // Number of people already in the group
  expectedInviteCount?: number; // Total headcount for the meetup
  budgetDescription: string;
  hasReservation: boolean;
  description: string;
  visibility: 'PUBLIC' | 'FOLLOWERS';
  imageUrl?: string | null;
}

export async function createMeetupPost(data: CreateMeetupPostRequest): Promise<MeetupPost> {
  await delay(500);
  
  // In real app, this would call the backend API
  // For now, create a mock post
  const now = new Date();
  const newPost: MeetupPost = {
    id: `meetup-${now.getTime()}`,
    type: 'meetup',
    author: mockUsers[0], // In real app, get from auth context
    restaurantName: data.restaurantName,
    locationText: data.locationText,
    meetupTime: data.meetupTime,
    foodTags: data.foodTags,
    maxHeadcount: data.maxHeadcount,
    currentHeadcount: data.baseParticipantCount || 1, // Base participants are already "joined"
    budgetDescription: data.budgetDescription,
    hasReservation: data.hasReservation,
    description: data.description,
    visibility: data.visibility,
    imageUrl: data.imageUrl || null,
    status: 'OPEN',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    likeCount: 0,
    commentCount: 0,
    shareCount: 0,
    isFromFollowedUser: false,
  };
  
  // In real app, add to database
  mockMeetupPosts.unshift(newPost);
  
  return newPost;
}


```


所有修改已完成。以下是總結：

## 已修改的文件列表

### 修改的文件：

1. **`src/components/posts/ReviewPostCard.tsx`** - 修改 location tag 點擊處理：
   - 將 `handleOpenGoogleMaps` 重命名為 `handleLocationClick`
   - 優先使用 `onLocationClick` handler（如果存在）
   - 即使沒有座標，也會阻止默認導航行為
   - 添加 `getDefaultCoordinates` 輔助函數，為常見區域提供默認座標

2. **`src/components/homepage/SmallMap.tsx`** - 添加 "在 Google 地圖中開啟" 按鈕：
   - 當有選中位置時，顯示一個按鈕可以打開 Google Maps
   - 使用座標或餐廳名稱構建 Google Maps URL

3. **`src/api/mock.ts`** - 為所有 mock review posts 添加座標：
   - 添加 `restaurantAddress`、`restaurantLat`、`restaurantLng` 字段
   - 為每個餐廳提供真實的台北地區座標

## 功能說明

### 點擊流程：post location tag → selectedLocation → small map 更新

1. 用戶點擊 post 中的 location tag（餐廳名稱+位置）
2. `ReviewPostCard` 的 `handleLocationClick` 被觸發：
   - 阻止默認行為（`e.preventDefault()`）
   - 檢查是否有 `onLocationClick` prop
   - 如果有座標（`restaurantLat`, `restaurantLng`），直接使用
   - 如果沒有座標，嘗試使用 `locationArea` 的默認座標
   - 調用 `onLocationClick` 並傳遞位置信息
3. `RendezvousHome` 的 `handleLocationSelect` 接收位置信息：
   - 更新 `selectedLocation` 狀態
4. `SmallMap` 組件接收 `selectedLocation` prop：
   - `useEffect` 監聽 `selectedLocation` 變化
   - 如果有選中位置：
     - 地圖移動到該座標（`setCenter`）
     - 縮放級別設為 16（`setZoom(16)`）
     - 顯示標記（`Marker` with `DROP` animation）
   - 如果沒有選中位置：
     - 重置到默認視圖（台北中心，zoom 13）
     - 移除標記

### 如何調整地圖中心/縮放行為

在 `SmallMap.tsx` 組件中，可以調整以下部分：

1. 縮放級別（第 43 行）：
   ```typescript
   mapInstanceRef.current.setZoom(16); // 當前值：16（較近）
   // 可以改為：15（稍遠）、17（更近）、14（更遠）
   ```

2. 默認視圖（第 20、59-60 行）：
   ```typescript
   const defaultCenter = { lat: 25.0330, lng: 121.5654 }; // 台北市中心
   mapInstanceRef.current.setZoom(13); // 默認縮放級別
   ```

3. 標記動畫（第 55 行）：
   ```typescript
   animation: google.maps.Animation.DROP, // 當前：掉落動畫
   // 可以改為：google.maps.Animation.BOUNCE（彈跳動畫）
   // 或：undefined（無動畫）
   ```

4. 地圖控制項（第 25-31 行）：
   - `mapTypeControl`: 地圖類型切換（衛星/地圖）
   - `streetViewControl`: 街景控制
   - `fullscreenControl`: 全屏控制
   - `zoomControl`: 縮放控制（當前啟用）

## 設計特點

- 優先內部處理：點擊 location tag 優先更新內部地圖，不再直接打開 Google Maps
- 降級處理：如果沒有座標，使用 `locationArea` 的默認座標
- 用戶選擇：在 SmallMap 中提供 "在 Google 地圖中開啟" 按鈕，用戶可選擇打開外部地圖
- 數據完整性：為所有 mock posts 添加了真實座標

所有修改已完成並通過 lint 檢查。現在點擊 post 中的 location tag 會更新右側邊欄的小地圖，而不是直接打開 Google Maps。

```typescript
   mapInstanceRef.current.setZoom(16); // 當前值：16（較近）
   // 可以改為：15（稍遠）、17（更近）、14（更遠）
```

```typescript
   const defaultCenter = { lat: 25.0330, lng: 121.5654 }; // 台北市中心
   mapInstanceRef.current.setZoom(13); // 默認縮放級別
```

```typescript
   animation: google.maps.Animation.DROP, // 當前：掉落動畫
   // 可以改為：google.maps.Animation.BOUNCE（彈跳動畫）
   // 或：undefined（無動畫）
```

---

**User**

我希望user profile的部分會上下滾動的部分只有profile的那一塊，並且最上面的"Back to Home"按鈕也不能隨著滾動。

***請將上述我的要求生成給cursor的prompt***

---

**Cursor**


檢查當前實現，生成 prompt：



以下是可直接貼給 Cursor 的 prompt：

---

You are a senior frontend engineer working on our restaurant-sharing web app (React + TypeScript + Tailwind or our existing UI system).

We need to fix the scrolling behavior on the user profile page.

## Current Problem

On the user profile page (`UserProfilePage.tsx`), when the user scrolls:

- The entire page scrolls, including the "Back to Home" button
- The "Back to Home" button scrolls out of view

## Desired Behavior

1. **Fixed "Back to Home" button**:
   - The "Back to Home" button should remain fixed at the top (below the TopNavBar)
   - It should not scroll with the page content
   - It should always be visible

2. **Scrollable profile content only**:
   - Only the profile content area should scroll:
     - Profile Header (cover image, avatar, user info)
     - Profile Tags (Styles and Categories)
     - Profile Tabs (Posts, Likes, Replies, etc.)
     - Posts Feed
   - The "Back to Home" button should stay fixed above this scrollable area

## Implementation Details

**Layout structure should be:**

```
<TopNavBar /> (already fixed/sticky)
<Fixed "Back to Home" button> (new: fixed below TopNavBar)
<Scrollable container>
  <ProfileHeader />
  <ProfileTags />
  <ProfileTabs />
  <Posts Feed />
</Scrollable container>
```

**Technical approach:**

1. Make the page container use `h-screen` and `flex flex-col` to fill viewport height
2. Keep TopNavBar fixed at top (already done)
3. Add a fixed container for "Back to Home" button:
   - Use `sticky top-16` or `fixed` positioning (TopNavBar is `h-16`)
   - Set appropriate `z-index` and background color
4. Make the profile content area scrollable:
   - Use `flex-1 overflow-y-auto` on the scrollable container
   - This container should include: ProfileHeader, ProfileTags, ProfileTabs, and Posts Feed
5. Ensure the right sidebar ("You might like") remains sticky if it exists

**Example structure:**

```tsx
<div className="h-screen flex flex-col">
  <TopNavBar />
  
  {/* Fixed Back to Home */}
  <div className="sticky top-16 z-40 bg-bg-primary border-b">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <Back to Home button />
    </div>
  </div>
  
  {/* Scrollable Profile Content */}
  <div className="flex-1 overflow-y-auto">
    <div className="max-w-7xl mx-auto">
      <ProfileHeader />
      <ProfileTags />
      <ProfileTabs />
      <Posts Feed />
    </div>
  </div>
</div>
```

## Constraints

- Keep all existing functionality (edit profile, tabs, posts, etc.)
- Maintain responsive design
- Do not break the right sidebar if it exists
- Use TypeScript and follow existing styling conventions

## Tasks

1. Locate `UserProfilePage.tsx`
2. Restructure the layout so:
   - The page container fills viewport height (`h-screen flex flex-col`)
   - "Back to Home" button is in a fixed/sticky container below TopNavBar
   - Profile content (Header, Tags, Tabs, Posts) is in a scrollable container
3. Ensure the scrollable area has proper overflow handling
4. Test that "Back to Home" stays visible while scrolling profile content

When you're done, output:
- The list of files you modified
- A brief explanation of how the fixed "Back to Home" and scrollable content area are implemented

---

```plaintext
<TopNavBar /> (already fixed/sticky)
<Fixed "Back to Home" button> (new: fixed below TopNavBar)
<Scrollable container>
  <ProfileHeader />
  <ProfileTags />
  <ProfileTabs />
  <Posts Feed />
</Scrollable container>
```

```typescriptreact
<div className="h-screen flex flex-col">
  <TopNavBar />
  
  {/* Fixed Back to Home */}
  <div className="sticky top-16 z-40 bg-bg-primary border-b">
    <div className="max-w-7xl mx-auto px-4 py-4">
      <Back to Home button />
    </div>
  </div>
  
  {/* Scrollable Profile Content */}
  <div className="flex-1 overflow-y-auto">
    <div className="max-w-7xl mx-auto">
      <ProfileHeader />
      <ProfileTags />
      <ProfileTabs />
      <Posts Feed />
    </div>
  </div>
</div>
```

---

**User**

You are a senior frontend engineer working on our restaurant-sharing web app (React + TypeScript + Tailwind or our existing UI system).

We need to fix the scrolling behavior on the user profile page.

## Current Problem

On the user profile page (`UserProfilePage.tsx`), when the user scrolls:

- The entire page scrolls, including the "Back to Home" button

- The "Back to Home" button scrolls out of view

## Desired Behavior

1. **Fixed "Back to Home" button**:

   - The "Back to Home" button should remain fixed at the top (below the TopNavBar)

   - It should not scroll with the page content

   - It should always be visible

2. **Scrollable profile content only**:

   - Only the profile content area should scroll:

     - Profile Header (cover image, avatar, user info)

     - Profile Tags (Styles and Categories)

     - Profile Tabs (Posts, Likes, Replies, etc.)

     - Posts Feed

   - The "Back to Home" button should stay fixed above this scrollable area

## Implementation Details

**Layout structure should be:**

```

<TopNavBar /> (already fixed/sticky)

<Fixed "Back to Home" button> (new: fixed below TopNavBar)

<Scrollable container>

  <ProfileHeader />

  <ProfileTags />

  <ProfileTabs />

  <Posts Feed />

</Scrollable container>

```

**Technical approach:**

1. Make the page container use `h-screen` and `flex flex-col` to fill viewport height

2. Keep TopNavBar fixed at top (already done)

3. Add a fixed container for "Back to Home" button:

   - Use `sticky top-16` or `fixed` positioning (TopNavBar is `h-16`)

   - Set appropriate `z-index` and background color

4. Make the profile content area scrollable:

   - Use `flex-1 overflow-y-auto` on the scrollable container

   - This container should include: ProfileHeader, ProfileTags, ProfileTabs, and Posts Feed

5. Ensure the right sidebar ("You might like") remains sticky if it exists

**Example structure:**

```tsx

<div className="h-screen flex flex-col">

  <TopNavBar />

  

  {/* Fixed Back to Home */}

  <div className="sticky top-16 z-40 bg-bg-primary border-b">

    <div className="max-w-7xl mx-auto px-4 py-4">

      <Back to Home button />

    </div>

  </div>

  

  {/* Scrollable Profile Content */}

  <div className="flex-1 overflow-y-auto">

    <div className="max-w-7xl mx-auto">

      <ProfileHeader />

      <ProfileTags />

      <ProfileTabs />

      <Posts Feed />

    </div>

  </div>

</div>

```

## Constraints

- Keep all existing functionality (edit profile, tabs, posts, etc.)

- Maintain responsive design

- Do not break the right sidebar if it exists

- Use TypeScript and follow existing styling conventions

## Tasks

1. Locate `UserProfilePage.tsx`

2. Restructure the layout so:

   - The page container fills viewport height (`h-screen flex flex-col`)

   - "Back to Home" button is in a fixed/sticky container below TopNavBar

   - Profile content (Header, Tags, Tabs, Posts) is in a scrollable container

3. Ensure the scrollable area has proper overflow handling

4. Test that "Back to Home" stays visible while scrolling profile content

When you're done, output:

- The list of files you modified

- A brief explanation of how the fixed "Back to Home" and scrollable content area are implemented

---

**Cursor**


檢查當前實現，修復滾動行為：



修改 UserProfilePage，實現固定 "Back to Home" 按鈕和可滾動的 profile 內容區域：


```typescriptreact
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserProfile, ProfileTab, ProfileTabData, RecommendedUser } from '../types/profile';
import { Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchUserProfile, getProfileTabData, fetchRecommendedUsers } from '../api/mockProfile';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileTags } from '../components/profile/ProfileTags';
import { ProfileTabs } from '../components/profile/ProfileTabs';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { TopNavBar } from '../components/layout/TopNavBar';

export const UserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tabData, setTabData] = useState<ProfileTabData | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedUsers, setRecommendedUsers] = useState<RecommendedUser[]>([]);

  // Mock current user ID (in production, get from auth context)
  // TODO: Replace with actual auth context
  const currentUserId = 'user1'; // Should match the logged-in user's ID
  const isOwnProfile = profile?.id === currentUserId;

  // Fetch profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!username) return;
      
      setIsLoading(true);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile) {
          setProfile(userProfile);
          // Fetch tab data
          const data = await getProfileTabData(userProfile.id);
          setTabData(data);
        }
        // Fetch recommended users
        const recommended = await fetchRecommendedUsers();
        setRecommendedUsers(recommended);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [username]);

  // Handle edit profile save
  const handleSaveProfile = (updatedFields: Partial<UserProfile>) => {
    if (!profile) return;
    
    // Update local state (in production, this would be an API call)
    setProfile({
      ...profile,
      ...updatedFields,
    });
    
    // TODO: In production, call API:
    // await fetch(`/api/users/${profile.id}/profile`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedFields),
    // });
  };

  // Get current tab posts
  const getCurrentTabPosts = (): Post[] => {
    if (!tabData) return [];
    return tabData[activeTab] || [];
  };

  // Handle tag click (navigate to search)
  const handleTagClick = (tag: string) => {
    // TODO: Navigate to home page with search query
    console.log('Tag clicked:', tag);
  };

  // Handle post click
  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: Navigate to post detail page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4 shadow-premium"></div>
          <p className="text-text-secondary" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary transition-colors duration-300">
        <div className="text-center">
          <p className="text-text-primary text-xl mb-2">User not found</p>
          <p className="text-text-secondary text-base">
            The user @{username} does not exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPosts = getCurrentTabPosts();
  const postCounts = tabData
    ? {
        posts: tabData.posts.length,
        likes: tabData.likes.length,
        replies: tabData.replies.length,
        reposts: tabData.reposts.length,
        bookmarks: tabData.bookmarks.length,
      }
    : undefined;

  return (
    <div className="h-screen flex flex-col bg-bg-primary transition-colors duration-300 overflow-hidden">
      <TopNavBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostClick={() => {
          // Navigate to home or post creation
          navigate('/');
        }}
        showSearch={false}
      />

      {/* Fixed Back to Home Button */}
      <div className="sticky top-16 z-40 bg-bg-primary border-b border-border-color flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="font-semibold">Back to Home</span>
          </button>
        </div>
      </div>

      {/* Scrollable Profile Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Profile Header */}
              <ProfileHeader
                profile={profile}
                isOwnProfile={isOwnProfile}
                onEditClick={() => setIsEditModalOpen(true)}
              />

              {/* Profile Tags */}
              <ProfileTags profile={profile} />

              {/* Profile Tabs */}
              <ProfileTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                postCounts={postCounts}
              />

              {/* Posts Feed */}
              <div className="bg-bg-secondary">
                {currentPosts.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-text-secondary text-xl mb-2">No posts found</p>
                    <p className="text-text-secondary text-base opacity-70">
                      {activeTab === 'posts'
                        ? 'This user has not created any posts yet.'
                        : `This user has no ${activeTab} yet.`}
                    </p>
                  </div>
                ) : (
                  <div>
                    {currentPosts.map((post) => {
                      if (post.type === 'review') {
                        return (
                          <ReviewPostCard
                            key={post.id}
                            post={post as ReviewPost}
                            onClick={() => handlePostClick(post)}
                            onTagClick={handleTagClick}
                            isOwnPost={post.author.id === currentUserId}
                          />
                        );
                      } else {
                        return (
                          <MeetupPostCard
                            key={post.id}
                            post={post as MeetupPost}
                            onClick={() => handlePostClick(post)}
                            onTagClick={handleTagClick}
                            isOwnPost={post.author.id === currentUserId}
                          />
                        );
                      }
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - You Might Like (Desktop only) */}
            <aside className="hidden lg:block w-80 flex-shrink-0 pt-4">
              <div className="sticky top-4">
                <YouMightLike recommendedUsers={recommendedUsers} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};


```


檢查 ProfileTabs 的 sticky 行為是否需要調整：



修改已完成。以下是總結：

## 已修改的文件列表

### 修改的文件：

1. **`src/pages/UserProfilePage.tsx`** - 重構布局結構：
   - 將頁面容器改為 `h-screen flex flex-col overflow-hidden` 以填滿視窗高度
   - 將 "Back to Home" 按鈕移到固定的 sticky 容器中（`sticky top-16 z-40`）
   - 將 profile 內容（ProfileHeader, ProfileTags, ProfileTabs, Posts Feed）放入可滾動容器（`flex-1 overflow-y-auto`）
   - 移除 Posts Feed 的 `min-h-screen`，改為正常高度

## 實現說明

### 固定 "Back to Home" 按鈕的實現

實現方式：
- 使用 `sticky top-16` 定位（TopNavBar 高度為 `h-16` = 64px）
- 設置 `z-40` 確保在內容之上
- 添加 `bg-bg-primary` 背景色和 `border-b` 邊框
- 使用 `flex-shrink-0` 防止被壓縮

結果：
- "Back to Home" 按鈕固定在 TopNavBar 下方
- 滾動時始終可見
- 不會隨內容滾動

### 可滾動內容區域的實現

實現方式：
- 使用 `flex-1 overflow-y-auto scrollbar-hidden` 創建可滾動容器
- 這個容器包含：
  - ProfileHeader（封面圖、頭像、用戶信息）
  - ProfileTags（風格和類別標籤）
  - ProfileTabs（標籤欄，內部有 `sticky top-0`，在滾動容器內會固定在頂部）
  - Posts Feed（貼文列表）

結果：
- 只有 profile 內容區域可以滾動
- ProfileTabs 在滾動時會固定在滾動容器的頂部
- "Back to Home" 按鈕保持固定，不隨內容滾動
- 右側邊欄 "You might like" 保持 sticky 行為

### 布局結構

```
<div className="h-screen flex flex-col">  // 填滿視窗高度
  <TopNavBar />  // 固定導航欄
  
  <div className="sticky top-16">  // 固定的 Back to Home
    <Back to Home button />
  </div>
  
  <div className="flex-1 overflow-y-auto">  // 可滾動區域
    <ProfileHeader />
    <ProfileTags />
    <ProfileTabs sticky top-0 />  // 在滾動容器內固定
    <Posts Feed />
  </div>
</div>
```

所有修改已完成並通過 lint 檢查。現在 "Back to Home" 按鈕會固定在頂部，只有 profile 內容區域可以滾動。

```plaintext
<div className="h-screen flex flex-col">  // 填滿視窗高度
  <TopNavBar />  // 固定導航欄
  
  <div className="sticky top-16">  // 固定的 Back to Home
    <Back to Home button />
  </div>
  
  <div className="flex-1 overflow-y-auto">  // 可滾動區域
    <ProfileHeader />
    <ProfileTags />
    <ProfileTabs sticky top-0 />  // 在滾動容器內固定
    <Posts Feed />
  </div>
</div>
```

