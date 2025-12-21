import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User type
export interface User {
  id: string;
  email: string;
  displayName: string;
  handle: string;
  avatarUrl?: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, displayName: string, handle: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API base URL
// In production (Vercel), use relative path if REACT_APP_API_URL is not set
const getApiUrl = () => {
  let baseUrl: string;
  
  // If explicitly set, use it
  if (process.env.REACT_APP_API_URL) {
    baseUrl = process.env.REACT_APP_API_URL;
  } else {
    // Check if running in browser (client-side)
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      // If not localhost, assume production and use relative path
      if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.startsWith('192.168.')) {
        baseUrl = '/api';
      } else {
        baseUrl = 'http://localhost:5000';
      }
    } else {
      // Fallback: check NODE_ENV (for build-time)
      if (process.env.NODE_ENV === 'production') {
        baseUrl = '/api';
      } else {
        baseUrl = 'http://localhost:5000';
      }
    }
  }
  
  // Ensure baseUrl ends with /api if it's a full URL
  // If it's already /api (relative path), keep it as is
  if (baseUrl.startsWith('http') && !baseUrl.endsWith('/api')) {
    return `${baseUrl}/api`;
  }
  
  // If it's a relative path starting with /api, return as is
  if (baseUrl.startsWith('/api')) {
    return baseUrl;
  }
  
  // Otherwise, append /api
  return `${baseUrl}/api`;
};

const API_URL = getApiUrl();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          // Verify token with backend
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        } catch (error) {
          // Network error, use saved user data
          console.warn('Could not verify token, using cached user data');
          setUser(JSON.parse(savedUser));
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const register = async (
    email: string, 
    password: string, 
    displayName: string, 
    handle: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, displayName, handle }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

