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

