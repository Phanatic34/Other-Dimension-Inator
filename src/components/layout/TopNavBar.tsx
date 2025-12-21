import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '../common/SearchInput';
import { Logo } from '../common/Logo';
import { useAuth } from '../../contexts/AuthContext';

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
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleProfile = () => {
    setIsProfileOpen(prev => {
      const newValue = !prev;
      if (newValue) setIsMenuOpen(false); // Close menu when opening profile
      return newValue;
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const newValue = !prev;
      if (newValue) setIsProfileOpen(false); // Close profile when opening menu
      return newValue;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleViewProfile = () => {
    if (user) {
      navigate(`/user/${user.handle}`);
    } else {
      navigate('/login');
    }
    setIsProfileOpen(false);
  };

  const handleSettings = () => {
    if (isAuthenticated) {
      navigate('/settings');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-bg-topbar shadow-elegant transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76.8px]">
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
          <div className="flex items-center justify-end gap-3">
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={toggleProfile}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-white bg-transparent hover:bg-white/10 transition-all duration-200 focus:outline-none overflow-hidden"
                aria-label="User menu"
              >
                {user?.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  {isAuthenticated ? (
                    <>
                      {/* User info */}
                      <div className="px-4 py-2 border-b border-border-color">
                        <p className="font-semibold text-text-primary truncate">{user?.displayName}</p>
                        <p className="text-sm text-text-secondary truncate">@{user?.handle}</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleViewProfile}
                        className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                        style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                      >
                        View Profile
                      </button>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2.5 text-base text-red-400 hover:bg-bg-hover hover:text-red-500 active:bg-red-100 transition-all duration-150 border-t border-border-color cursor-pointer"
                        style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          navigate('/login');
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                        style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          navigate('/register');
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 text-base text-[#722F37] hover:bg-bg-hover transition-all duration-150 border-t border-border-color"
                        style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                      >
                        Create Account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Hamburger Menu */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={toggleMenu}
                className="flex items-center justify-center h-10 w-10 rounded-full border border-white bg-transparent hover:bg-white/10 transition-all duration-200 focus:outline-none"
                aria-label="Main menu"
              >
                <svg 
                  className="w-5 h-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-bg-card rounded-lg shadow-elegant-lg border border-border-color py-1 z-50 backdrop-blur-sm transition-colors duration-300">
                  <button
                    type="button"
                    onClick={handleSettings}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/saved-restaurants');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-base text-text-primary hover:bg-bg-hover transition-all duration-150"
                    style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 }}
                  >
                    Saved Restaurants
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
