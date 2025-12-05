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
                      // Only show "Edit" and "Archive" options for posts in the "Posts" tab
                      // For reposts, likes, replies, and bookmarks, treat all posts as external
                      // (show "Save" and "Report" options instead)
                      const isOwnPost = activeTab === 'posts' && post.author.id === currentUserId;
                      
                      if (post.type === 'review') {
                        return (
                          <ReviewPostCard
                            key={post.id}
                            post={post as ReviewPost}
                            onClick={() => handlePostClick(post)}
                            onTagClick={handleTagClick}
                            isOwnPost={isOwnPost}
                          />
                        );
                      } else {
                        return (
                          <MeetupPostCard
                            key={post.id}
                            post={post as MeetupPost}
                            onClick={() => handlePostClick(post)}
                            onTagClick={handleTagClick}
                            isOwnPost={isOwnPost}
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

