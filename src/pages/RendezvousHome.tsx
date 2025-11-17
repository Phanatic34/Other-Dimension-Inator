import React, { useState, useEffect, useMemo } from 'react';
import { Board, Post, ReviewPost, MeetupPost } from '../types/models';
import { fetchBoards, fetchPosts } from '../api/mock';
import { TopNavBar } from '../components/layout/TopNavBar';
import { Sidebar } from '../components/layout/Sidebar';
import { MobileBoardChips } from '../components/layout/MobileBoardChips';
import { TabSwitcher } from '../components/layout/TabSwitcher';
import { ReviewPostCard } from '../components/posts/ReviewPostCard';
import { MeetupPostCard } from '../components/posts/MeetupPostCard';
import { PostTypeModal } from '../components/modals/PostTypeModal';

export const RendezvousHome: React.FC = () => {
  // State
  const [boards, setBoards] = useState<Board[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'meetups'>('reviews');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [feedFilter, setFeedFilter] = useState<'all' | 'following'>('all');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Filter posts based on active tab, board, feed filter, and search query
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
      filtered = filtered.filter(post => {
        if (post.type === 'review') {
          return post.isFromFollowedUser === true;
        } else {
          return post.isFromFollowedUser === true;
        }
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(post => {
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesBoard = post.board.name.toLowerCase().includes(query) ||
                           post.board.label.toLowerCase().includes(query);
        
        if (post.type === 'review') {
          const reviewPost = post as ReviewPost;
          const matchesRestaurant = reviewPost.restaurantName.toLowerCase().includes(query);
          const matchesAuthor = reviewPost.author.displayName.toLowerCase().includes(query) ||
                              reviewPost.author.handle.toLowerCase().includes(query);
          return matchesTitle || matchesRestaurant || matchesBoard || matchesAuthor;
        } else {
          const meetupPost = post as MeetupPost;
          const matchesRestaurant = meetupPost.restaurantName?.toLowerCase().includes(query) || false;
          const matchesHost = meetupPost.host.displayName.toLowerCase().includes(query) ||
                            meetupPost.host.handle.toLowerCase().includes(query);
          const matchesDescription = meetupPost.description.toLowerCase().includes(query);
          return matchesTitle || matchesRestaurant || matchesBoard || matchesHost || matchesDescription;
        }
      });
    }

    return filtered;
  }, [posts, activeTab, selectedBoardId, feedFilter, searchQuery]);

  const handlePostClick = (post: Post) => {
    console.log('Post clicked:', post.id);
    // TODO: In the future, this will navigate to a post detail page
    // TODO: The detail page will show full content, comments, etc.
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
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPostClick={() => setIsPostModalOpen(true)}
          />

          <div className="max-w-7xl mx-auto">
            <div className="flex">
              {/* Left Sidebar (Desktop) */}
              <Sidebar
                boards={boards}
                selectedBoardId={selectedBoardId}
                onBoardSelect={setSelectedBoardId}
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

                <div className="p-4 space-y-4" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-text-secondary text-xl mb-2" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>No posts found</p>
                  <p className="text-text-secondary text-base opacity-70" style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}>
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

