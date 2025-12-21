import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { 
  fetchBoards as fetchBoardsAPI, 
  fetchAllPosts, 
  fetchRecommendedUsers as fetchRecommendedUsersAPI,
  createReviewPost as createReviewPostAPI,
  createMeetupPost as createMeetupPostAPI,
  deleteReviewPost as deleteReviewPostAPI,
  deleteMeetupPost as deleteMeetupPostAPI,
  archiveReviewPost as archiveReviewPostAPI,
  archiveMeetupPost as archiveMeetupPostAPI
} from '../api/api';
import { fetchBoards as fetchMockBoards, fetchPosts as fetchMockPosts } from '../api/mock';
import { useAuth } from '../contexts/AuthContext';
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
import { EditReviewPostModal } from '../components/modals/EditReviewPostModal';
import { EditMeetupPostModal } from '../components/modals/EditMeetupPostModal';
import { YouMightLike } from '../components/profile/YouMightLike';
import { SmallMap } from '../components/homepage/SmallMap';
import { LocationPreviewProvider, useLocationPreview } from '../contexts/LocationPreviewContext';
import { LocationSavePrompt } from '../components/LocationSavePrompt';
import { FoodSelector } from '../components/food-selector/FoodSelector';

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

const RendezvousHomeContent: React.FC = () => {
  // URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'meetups' | 'food-selector'>('reviews');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isMeetupComposerOpen, setIsMeetupComposerOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  type PostType = 'review' | 'meetup';
  const [postType, setPostType] = useState<PostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedUsers, setRecommendedUsers] = useState<any[]>([]);
  
  // Edit modal state
  const [isEditReviewModalOpen, setIsEditReviewModalOpen] = useState(false);
  const [isEditMeetupModalOpen, setIsEditMeetupModalOpen] = useState(false);
  const [editingReviewPost, setEditingReviewPost] = useState<ReviewPost | null>(null);
  const [editingMeetupPost, setEditingMeetupPost] = useState<MeetupPost | null>(null);
  
  // Use context for location preview
  const { setSelectedLocation } = useLocationPreview();

  // Get initial search query from URL
  const urlSearchQuery = searchParams.get('search') || '';

  // Centralized filter state
  const [filters, setFilters] = useState<ActiveFilters>({
    searchQuery: urlSearchQuery,
    style: null,
    category: null,
    priceMin: null,
    priceMax: null,
    ratingAtLeast: null,
    distanceKm: null,
  });

  // Sync URL search param with filters - must include searchParams in dependencies
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    setFilters((f) => {
      if (urlSearch !== f.searchQuery) {
        return { ...f, searchQuery: urlSearch };
      }
      return f;
    });
  }, [searchParams]);

  // Filter updaters
  const updateSearchQuery = (q: string) => {
    setFilters((f) => ({ ...f, searchQuery: q }));
    // Update URL without causing a navigation
    if (q) {
      setSearchParams({ search: q }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

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
        // Try to fetch from API first, fallback to mock data
        let boardsData: Board[] = [];
        let postsData: Post[] = [];
        let recommended: any[] = [];

        try {
          [boardsData, postsData, recommended] = await Promise.all([
            fetchBoardsAPI(),
            fetchAllPosts(),
            fetchRecommendedUsersAPI(),
          ]);
        } catch (apiError) {
          console.warn('API not available, using mock data:', apiError);
          // Fallback to mock data
          [boardsData, postsData] = await Promise.all([
            fetchMockBoards(),
            fetchMockPosts(),
          ]);
        }

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

  // Handle location selection from post cards (legacy handler for onLocationClick prop)
  const handleLocationSelect = (location: { name: string; address?: string; lat: number; lng: number }) => {
    setSelectedLocation({
      id: `${location.name}-${location.address || ''}`,
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
    const matches = (
      post.restaurantName?.toLowerCase().includes(text) ||
      post.locationArea?.toLowerCase().includes(text) ||
      post.contentSnippet?.toLowerCase().includes(text) ||
      post.title?.toLowerCase().includes(text) ||
      post.styleType?.toLowerCase().includes(text) ||
      post.foodType?.toLowerCase().includes(text) ||
      post.author?.displayName?.toLowerCase().includes(text) ||
      post.author?.handle?.toLowerCase().includes(text) ||
      post.board?.label?.toLowerCase().includes(text) ||
      post.restaurantAddress?.toLowerCase().includes(text)
    );
    
    // Debug logging
    if (q) {
      console.log(`[Filter] Checking post "${post.restaurantName}" for query "${q}": ${matches ? 'MATCH' : 'no match'}, locationArea="${post.locationArea}"`);
    }

    return !!matches;
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

    // Filter out archived posts (archived posts should not appear in home feed)
    filtered = filtered.filter(post => !post.isArchived);

    // Filter by tab (only for reviews and meetups tabs)
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post): post is ReviewPost => post.type === 'review');
    } else if (activeTab === 'meetups') {
      filtered = filtered.filter((post): post is MeetupPost => post.type === 'meetup');
    } else {
      // For food-selector or other tabs, show all posts but no filtering needed
      return filtered;
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

    console.log(`[FilteredPosts] Query="${filters.searchQuery}", Total=${posts.length}, After filter=${filtered.length}`);
    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, filters, passesFilters, matchesMeetupText]);

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: In the future, this will navigate to a post detail page
    // TODO: The detail page will show full content, comments, etc.
  };

  const handleSearchFromTag = (tag: string) => {
    console.log('[Search] Tag clicked:', tag);
    console.log('[Search] Current filters.searchQuery:', filters.searchQuery);
    updateSearchQuery(tag);
    // The filtering will happen automatically via the filteredPosts useMemo
  };

  const handlePostTypeSelect = (type: 'review' | 'meetup') => {
    console.log(`User wants to create a ${type} post`);
    // TODO: In the future, this will open a form modal
    // TODO: The form will submit to the backend API
  };

  // Get current user from auth context
  const { user: authUser, isAuthenticated } = useAuth();
  
  // Current user for display purposes
  const currentUser: User = authUser ? {
    id: authUser.id,
    displayName: authUser.displayName,
    handle: `@${authUser.handle}`,
    avatarUrl: authUser.avatarUrl,
    isFollowedByCurrentUser: false,
  } : {
    id: 'guest',
    displayName: 'Guest',
    handle: '@guest',
    avatarUrl: '/images/default-avatar.png',
    isFollowedByCurrentUser: false,
  };

  // Handler to create a new review post from form values
  const handleCreateReviewPost = async (values: ReviewPostFormValues) => {
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
    const locationDisplayParts = values.locationDisplayName.split(' | ');
    const locationArea = locationDisplayParts.length > 1 
      ? locationDisplayParts[0]
      : 'Taipei';

    // Convert photo files to image URLs (object URLs for immediate display)
    const imageUrls = values.photoFiles.map((file) => URL.createObjectURL(file));

    // Check if user is authenticated
    if (isAuthenticated) {
      try {
        // Create post via API
        const createdPost = await createReviewPostAPI({
          restaurantName: values.restaurantName,
          restaurantAddress: values.restaurantAddress,
          restaurantLat: values.lat ?? undefined,
          restaurantLng: values.lng ?? undefined,
          locationArea,
          boardId: styleBoard?.id || boards[0]?.id,
          styleType: styleBoard?.label,
          foodType: categoryBoard?.label,
          title: values.restaurantName,
          content: values.content,
          rating: values.rating,
          priceLevel,
          priceMin: values.priceMin ?? undefined,
          priceMax: values.priceMax ?? undefined,
          images: imageUrls,
        });

        // Add the created post to the beginning
        setPosts((prev) => [createdPost, ...prev]);
      } catch (error) {
        console.error('Failed to create post:', error);
        alert('Failed to create post. Please try again.');
        return;
      }
    } else {
      // Create local post for non-authenticated users
      const newPost: ReviewPost = {
        id: `local-${now.getTime()}`,
        type: 'review',
        author: currentUser,
        restaurantName: values.restaurantName,
        board: styleBoard || boards[0],
        styleType: styleBoard?.label,
        foodType: categoryBoard?.label,
        title: values.restaurantName,
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
        imageUrl: imageUrls[0],
        isFromFollowedUser: feedFilter === 'following',
      };
      setPosts((prev) => [newPost, ...prev]);
    }

    // Scroll to the top of the feed
    const feedTop = document.getElementById('review-feed-top');
    if (feedTop) {
      feedTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler to create a new meetup post from form values
  const handleCreateMeetupPost = async (values: DiningMeetupFormValues) => {
    try {
      // Call the API to create the post
      let createdPost: any = null;
      
      if (isAuthenticated) {
        createdPost = await createMeetupPostAPI({
          restaurantName: values.restaurantName,
          locationText: values.locationText,
          address: values.locationText, // Use locationText as address
          meetupTime: values.meetupTime,
          foodTags: values.foodTags,
          maxHeadcount: values.maxHeadcount,
          budgetDescription: values.budgetDescription,
          hasReservation: values.hasReservation,
          description: values.description,
          imageUrl: values.imageUrl ?? undefined,
          boardId: undefined,
          locationArea: values.locationText,
        });
      }
      
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

  // Handler to delete a review post
  const handleDeleteReviewPost = async (post: ReviewPost) => {
    try {
      await deleteReviewPostAPI(post.id);
      // Remove from local state
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error('Error deleting review post:', error);
      alert('刪除貼文失敗，請稍後再試');
    }
  };

  // Handler to delete a meetup post
  const handleDeleteMeetupPost = async (post: MeetupPost) => {
    try {
      await deleteMeetupPostAPI(post.id);
      // Remove from local state
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch (error) {
      console.error('Error deleting meetup post:', error);
      alert('刪除貼文失敗，請稍後再試');
    }
  };

  // Handler to edit a review post
  const handleEditReviewPost = (post: ReviewPost) => {
    setEditingReviewPost(post);
    setIsEditReviewModalOpen(true);
  };

  // Handler to edit a meetup post
  const handleEditMeetupPost = (post: MeetupPost) => {
    setEditingMeetupPost(post);
    setIsEditMeetupModalOpen(true);
  };

  // Handler to save edited review post
  const handleSaveEditedReviewPost = (updatedPost: ReviewPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  // Handler to save edited meetup post
  const handleSaveEditedMeetupPost = (updatedPost: MeetupPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  // Handler to archive a post
  const handleArchivePost = async (post: ReviewPost | MeetupPost) => {
    try {
      let result: { success: boolean; message: string; isArchived: boolean };
      if (post.type === 'review') {
        result = await archiveReviewPostAPI(post.id);
      } else {
        result = await archiveMeetupPostAPI(post.id);
      }
      
      if (result.isArchived) {
        // If archived, remove from posts list (it will be filtered out anyway)
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
        alert('貼文已封存');
      } else {
        // If unarchived, update the state and reload posts to show it again
        setPosts((prev) =>
          prev.map((p) =>
            p.id === post.id ? { ...p, isArchived: false } : p
          )
        );
        // Reload posts to get the unarchived post back
        const allPosts = await fetchAllPosts();
        setPosts(allPosts);
        alert('貼文已取消封存');
      }
    } catch (error) {
      console.error('Error archiving post:', error);
      alert('封存失敗，請稍後再試');
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
        <div className="flex flex-col h-screen bg-bg-primary transition-colors duration-300">
          {/* Top nav bar */}
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

          {/* 3-column area under the nav */}
          <div className="flex flex-1 w-full overflow-hidden bg-bg-primary transition-colors duration-300">
            {/* LEFT SIDEBAR */}
            <aside className="hidden lg:flex flex-shrink-0 w-[320px] h-full bg-bg-tertiary border-r border-border-color transition-colors duration-300 overflow-y-auto overflow-x-hidden px-6 py-5">
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

            {/* CENTER POSTS COLUMN (ONLY MAIN SCROLL AREA) */}
            <main className="flex-1 min-w-0 h-full overflow-y-auto overflow-x-hidden bg-bg-secondary transition-colors duration-300 px-8 pt-0 pb-4">
              {/* Mobile Board Chips - hide when on food-selector tab */}
              {activeTab !== 'food-selector' && (
                <MobileBoardChips
                  boards={boards}
                  selectedBoardId={selectedBoardId}
                  onBoardSelect={setSelectedBoardId}
                />
              )}

              {/* Tab bar 評價貼文串 / 揪吃飯貼文串 + All/Following - Full width */}
              <div className="-mx-8 mb-4">
                <TabSwitcher
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  feedFilter={feedFilter}
                  onFeedFilterChange={setFeedFilter}
                />
              </div>

              {/* Feed top anchor for scrolling */}
              <div id="review-feed-top" />

              {/* Content based on active tab */}
              {activeTab === 'food-selector' ? (
                <FoodSelector />
              ) : (
              <div className="max-w-[720px] mx-auto space-y-4">
                  {/* Search indicator */}
                  {filters.searchQuery && (
                    <div className="flex items-center justify-between bg-accent-primary/10 border border-accent-primary/30 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-text-secondary">搜尋結果：</span>
                        <span className="font-bold text-accent-primary">{filters.searchQuery}</span>
                        <span className="text-text-secondary">({filteredPosts.length} 篇貼文)</span>
                      </div>
                      <button
                        onClick={() => updateSearchQuery('')}
                        className="text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded-lg hover:bg-bg-hover"
                      >
                        ✕ 清除搜尋
                      </button>
                    </div>
                  )}
                  {/* "今天吃了什麼好東西？" input card */}
                  {activeTab === 'reviews' ? (
                    <section
                      onClick={() => {
                        setIsReviewModalOpen(true);
                      }}
                      className="rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-bg-tertiary">
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
                      className="rounded-3xl border border-border-color bg-bg-card px-5 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="mt-1 h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-bg-tertiary">
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

                  {/* posts feed */}
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
                            onEdit={handleEditReviewPost}
                            onDelete={handleDeleteReviewPost}
                            onArchive={handleArchivePost}
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
                            onEdit={handleEditMeetupPost}
                            onDelete={handleDeleteMeetupPost}
                            onArchive={handleArchivePost}
                          />
                        );
                      }
                    })
                  )}
              </div>
              )}
            </main>

            {/* RIGHT SIDEBAR */}
            <aside className="hidden xl:flex flex-shrink-0 w-[360px] h-full bg-bg-sidebar-right border-l border-border-color transition-colors duration-300 overflow-y-auto overflow-x-hidden px-5 py-4">
              {/* Right sidebar content = two stacked cards */}
              <div className="flex flex-col gap-4 h-full w-full">
                {/* 1. Location preview / map card on top */}
                <SmallMap />
                
                {/* 2. You might like card below */}
                {recommendedUsers.length > 0 && (
                  <YouMightLike recommendedUsers={recommendedUsers} />
                )}
              </div>
            </aside>
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

      {/* Edit Review Post Modal */}
      {editingReviewPost && (
        <EditReviewPostModal
          isOpen={isEditReviewModalOpen}
          onClose={() => {
            setIsEditReviewModalOpen(false);
            setEditingReviewPost(null);
          }}
          post={editingReviewPost}
          onSave={handleSaveEditedReviewPost}
        />
      )}

      {/* Edit Meetup Post Modal */}
      {editingMeetupPost && (
        <EditMeetupPostModal
          isOpen={isEditMeetupModalOpen}
          onClose={() => {
            setIsEditMeetupModalOpen(false);
            setEditingMeetupPost(null);
          }}
          post={editingMeetupPost}
          onSave={handleSaveEditedMeetupPost}
        />
      )}
      
      {/* Location Save Prompt */}
      <LocationSavePrompt />
    </div>
  );
};

// Wrapper component with LocationPreviewProvider
export const RendezvousHome: React.FC = () => {
  return (
    <LocationPreviewProvider>
      <RendezvousHomeContent />
    </LocationPreviewProvider>
  );
};

