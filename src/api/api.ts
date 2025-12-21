// Real API service connecting to backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Get headers with auth token
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// ================== Users API ==================

export async function fetchUserByHandle(handle: string) {
  try {
    const response = await fetch(`${API_URL}/api/users/handle/${handle}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function fetchUserById(userId: string) {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}/posts`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch user posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }
}

// ================== Posts API ==================

export async function fetchAllPosts(type?: 'review' | 'meetup') {
  try {
    const url = type ? `${API_URL}/api/posts?type=${type}` : `${API_URL}/api/posts`;
    const response = await fetch(url, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function fetchReviewPosts() {
  return fetchAllPosts('review');
}

export async function fetchMeetupPosts() {
  return fetchAllPosts('meetup');
}

export async function createReviewPost(postData: {
  restaurantName: string;
  restaurantAddress?: string;
  restaurantLat?: number;
  restaurantLng?: number;
  locationArea?: string;
  boardId: string;
  styleType?: string;
  foodType?: string;
  title: string;
  content: string;
  rating: number;
  priceLevel: string;
  priceMin?: number;
  priceMax?: number;
  images?: string[];
}) {
  try {
    const response = await fetch(`${API_URL}/api/posts/review`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating review post:', error);
    throw error;
  }
}

export async function createMeetupPost(postData: {
  restaurantName: string;
  locationText: string;
  address?: string;
  meetupTime: string;
  foodTags: string[];
  maxHeadcount: number;
  budgetDescription: string;
  hasReservation?: boolean;
  description: string;
  imageUrl?: string;
  boardId?: string;
  locationArea?: string;
}) {
  try {
    const response = await fetch(`${API_URL}/api/posts/meetup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create meetup post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating meetup post:', error);
    throw error;
  }
}

export async function updateReviewPost(postId: string, postData: {
  restaurantName?: string;
  restaurantAddress?: string;
  restaurantLat?: number;
  restaurantLng?: number;
  locationArea?: string;
  boardId?: string;
  styleType?: string;
  foodType?: string;
  title?: string;
  content?: string;
  rating?: number;
  priceLevel?: string;
  priceMin?: number;
  priceMax?: number;
  images?: string[];
}) {
  try {
    const response = await fetch(`${API_URL}/api/posts/review/${postId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating review post:', error);
    throw error;
  }
}

export async function updateMeetupPost(postId: string, postData: {
  restaurantName?: string;
  locationText?: string;
  address?: string;
  meetupTime?: string;
  foodTags?: string[];
  maxHeadcount?: number;
  budgetDescription?: string;
  hasReservation?: boolean;
  description?: string;
  imageUrl?: string;
  boardId?: string;
  locationArea?: string;
}) {
  try {
    const response = await fetch(`${API_URL}/api/posts/meetup/${postId}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update meetup post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating meetup post:', error);
    throw error;
  }
}

export async function deleteReviewPost(postId: string) {
  try {
    const response = await fetch(`${API_URL}/api/posts/review/${postId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting review post:', error);
    throw error;
  }
}

export async function deleteMeetupPost(postId: string) {
  try {
    const response = await fetch(`${API_URL}/api/posts/meetup/${postId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete meetup post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting meetup post:', error);
    throw error;
  }
}

// ================== Save/Bookmark Posts API ==================

export async function savePost(postId: string, postType: 'review' | 'meetup') {
  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}/save?type=${postType}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
}

export async function unsavePost(postId: string, postType: 'review' | 'meetup') {
  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}/save?type=${postType}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to unsave post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error unsaving post:', error);
    throw error;
  }
}

export async function fetchSavedPosts() {
  try {
    const response = await fetch(`${API_URL}/api/posts/saved/list`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch saved posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching saved posts:', error);
    return [];
  }
}

// ================== Report Posts API ==================

export type ReportReason = 'spam' | 'harassment' | 'inappropriate' | 'misinformation' | 'other';

export async function reportPost(postId: string, postType: 'review' | 'meetup', reason: ReportReason, description?: string) {
  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}/report`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ type: postType, reason, description }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to report post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error reporting post:', error);
    throw error;
  }
}

// ================== Archive Posts API ==================

export async function archiveReviewPost(postId: string) {
  try {
    const response = await fetch(`${API_URL}/api/posts/review/${postId}/archive`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to archive post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error archiving review post:', error);
    throw error;
  }
}

export async function archiveMeetupPost(postId: string) {
  try {
    const response = await fetch(`${API_URL}/api/posts/meetup/${postId}/archive`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to archive post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error archiving meetup post:', error);
    throw error;
  }
}

// ================== Share Posts API ==================

export async function sharePost(postId: string, postType: 'review' | 'meetup') {
  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}/share?type=${postType}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to record share');
    }
    return await response.json();
  } catch (error) {
    console.error('Error sharing post:', error);
    throw error;
  }
}

// ================== Boards API ==================

export async function fetchBoards() {
  try {
    const response = await fetch(`${API_URL}/api/boards`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch boards');
    return await response.json();
  } catch (error) {
    console.error('Error fetching boards:', error);
    return [];
  }
}

// ================== Recommended Users API ==================

export async function fetchRecommendedUsers() {
  try {
    const response = await fetch(`${API_URL}/api/users/recommended`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch recommended users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    return [];
  }
}

// ================== Follow API ==================

export async function followUser(userId: string) {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}/follow`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to follow user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
}

export async function unfollowUser(userId: string) {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}/follow`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to unfollow user');
    }
    return await response.json();
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
}

// ================== Like API ==================

export async function likePost(postId: string, postType: 'review' | 'meetup') {
  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}/like?type=${postType}`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to like post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
}

export async function unlikePost(postId: string, postType: 'review' | 'meetup') {
  try {
    const response = await fetch(`${API_URL}/api/posts/${postId}/like?type=${postType}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to unlike post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
}

// ================== Comments API ==================

export interface Comment {
  id: string;
  postId: string;
  postType: string;
  author: {
    id: string;
    displayName: string;
    handle: string;
    avatarUrl?: string;
  };
  content: string;
  likeCount: number;
  isLikedByUser: boolean;
  createdAt: string;
  replies: Comment[];
}

export async function fetchComments(postId: string, postType: 'review' | 'meetup' = 'review'): Promise<Comment[]> {
  try {
    const response = await fetch(`${API_URL}/api/comments/${postId}?postType=${postType}`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch comments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function createComment(postId: string, content: string, postType: 'review' | 'meetup' = 'review', parentId?: string): Promise<Comment | null> {
  try {
    const response = await fetch(`${API_URL}/api/comments`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ postId, postType, parentId, content }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create comment');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}

export async function likeComment(commentId: string) {
  try {
    const response = await fetch(`${API_URL}/api/comments/${commentId}/like`, {
      method: 'POST',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to like comment');
    return await response.json();
  } catch (error) {
    console.error('Error liking comment:', error);
    throw error;
  }
}

export async function unlikeComment(commentId: string) {
  try {
    const response = await fetch(`${API_URL}/api/comments/${commentId}/like`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to unlike comment');
    return await response.json();
  } catch (error) {
    console.error('Error unliking comment:', error);
    throw error;
  }
}

export async function deleteComment(commentId: string) {
  try {
    const response = await fetch(`${API_URL}/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete comment');
    return await response.json();
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
}

// ================== Saved Restaurants API ==================

export async function fetchSavedRestaurants() {
  try {
    const response = await fetch(`${API_URL}/api/restaurants/saved`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch saved restaurants');
    return await response.json();
  } catch (error) {
    console.error('Error fetching saved restaurants:', error);
    return [];
  }
}

export async function saveRestaurant(restaurant: {
  name: string;
  address: string;
  lat: number;
  lng: number;
  styles?: string[];
  categories?: string[];
  rating?: number;
  priceLevel?: string;
}) {
  try {
    const response = await fetch(`${API_URL}/api/restaurants/save`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(restaurant),
    });
    if (!response.ok) throw new Error('Failed to save restaurant');
    return await response.json();
  } catch (error) {
    console.error('Error saving restaurant:', error);
    throw error;
  }
}

export async function unsaveRestaurant(restaurantId: string) {
  try {
    const response = await fetch(`${API_URL}/api/restaurants/${restaurantId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to unsave restaurant');
    return true;
  } catch (error) {
    console.error('Error unsaving restaurant:', error);
    throw error;
  }
}

// ================== Upload API ==================

export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/upload/image`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || 'Image upload failed');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function uploadImages(files: File[]): Promise<string[]> {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/api/upload/images`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || 'Images upload failed');
    }

    const data = await response.json();
    return data.imageUrls || [];
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
}

