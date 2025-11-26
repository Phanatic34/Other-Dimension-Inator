import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchBoards, fetchPosts } from '../api/mock';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { CreatePostCard } from '../components/posts/CreatePostCard';
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

  // Helper: Check if text matches search query
  function matchesText(post: ReviewPost, q: string): boolean {
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
  }

  // Helper: Check if post passes all active filters
  function passesFilters(post: ReviewPost, filters: ActiveFilters): boolean {
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
  }

  // Filter posts based on active tab, board, feed filter, and ALL active filters
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by tab
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post): post is ReviewPost => post.type === 'review');
    } else {
      filtered = filtered.filter((post): post is MeetupPost => post.type === 'meetup');
    }

    // Filter by board
    if (selectedBoardId !== null) {
      filtered = filtered.filter(post => post.board.id === selectedBoardId);
    }

    // Filter by following
    if (feedFilter === 'following') {
      filtered = filtered.filter(post => post.isFromFollowedUser === true);
    }

    // Apply comprehensive filters (only for review posts)
    if (activeTab === 'reviews') {
      filtered = filtered.filter((post) => passesFilters(post as ReviewPost, filters));
    }

    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, filters]);

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
            onPostClick={() => setIsPostModalOpen(true)}
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
              {/* Create Post Composer */}
              <CreatePostCard />

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
                      />
                    );
                  } else {
                    return (
                      <MeetupPostCard
                        key={post.id}
                        post={post}
                        onClick={() => handlePostClick(post)}
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

      {/* Post Type Modal */}
      <PostTypeModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSelectType={handlePostTypeSelect}
      />
    </div>
  );
};

