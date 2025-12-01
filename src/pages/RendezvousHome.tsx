import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost, User } from '../types/models';
import { fetchBoards, fetchPosts, createMeetupPost } from '../api/mock';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { ReviewPostComposer, ReviewPostFormValues } from '../components/posts/ReviewPostComposer';
import { DiningMeetupComposer, DiningMeetupFormValues } from '../components/posts/DiningMeetupComposer';
import { PostTypeModal } from '../components/modals/PostTypeModal';

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
        currentHeadcount: 1, // Host only initially
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
        <div className="min-h-screen bg-bg-primary transition-colors duration-300">
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

          <div className="max-w-7xl mx-auto">
            <div className="flex">
              {/* Left Sidebar (Desktop) */}
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

              {/* Mobile Board Chips */}
              <MobileBoardChips
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelect={setSelectedBoardId}
              />

              {/* Center Feed */}
              <div className="flex-1 min-w-0 bg-bg-secondary">
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
                <ReviewPostComposer onCreateReviewPost={handleCreateReviewPost} />
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
          </div>

              {/* Right Column (Placeholder) */}
              <div className="hidden lg:block w-80 bg-bg-sidebar-right border-l border-border-color p-5 transition-colors duration-300">
            <div className="sticky top-20">
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
          </div>
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
            className="bg-bg-card rounded-3xl shadow-2xl border border-border-color max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
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
                  onCreateReviewPost={(values) => {
                    handleCreateReviewPost(values);
                    setIsPostModalOpen(false);
                    setPostType(null);
                  }} 
                />
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-text-primary">Create Dining Meetup Post</h2>
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
                <DiningMeetupComposer
                  renderModal={false}
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
    </div>
  );
};

