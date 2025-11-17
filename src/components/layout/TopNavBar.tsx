import React, { useState, useRef, useEffect } from 'react';
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

