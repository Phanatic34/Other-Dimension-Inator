import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TopNavBar } from '../components/layout/TopNavBar';
import { useTheme } from '../contexts/ThemeContext';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setMessage('');
    
    try {
      // TODO: Call API to update profile
      updateUser({ displayName });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile');
    }
    
    setIsSaving(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-page transition-colors duration-300">
      <TopNavBar
        searchQuery=""
        onSearchChange={() => {}}
        onPostClick={() => {}}
        showSearch={false}
      />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold text-text-primary mb-8" style={{ fontFamily: 'Garamond, Baskerville, Georgia, serif' }}>
          Settings
        </h1>

        {/* Profile Section */}
        <div className="bg-bg-card rounded-2xl p-6 mb-6 shadow-sm border border-border-color">
          <h2 className="text-xl font-semibold text-text-primary mb-4" style={{ fontFamily: 'Garamond, Baskerville, Georgia, serif' }}>
            Profile
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-text-secondary mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#722F37] focus:border-transparent transition-all bg-white text-text-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Handle
              </label>
              <input
                type="text"
                value={`@${user.handle}`}
                disabled
                className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-text-secondary mt-1">Handle cannot be changed</p>
            </div>

            {message && (
              <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            <button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="px-6 py-2 bg-[#722F37] text-white rounded-lg font-medium hover:bg-[#5C252C] transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-bg-card rounded-2xl p-6 mb-6 shadow-sm border border-border-color">
          <h2 className="text-xl font-semibold text-text-primary mb-4" style={{ fontFamily: 'Garamond, Baskerville, Georgia, serif' }}>
            Appearance
          </h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-primary">Dark Mode</p>
              <p className="text-sm text-text-secondary">Switch between light and dark theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-[#722F37]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Account Section */}
        <div className="bg-bg-card rounded-2xl p-6 shadow-sm border border-border-color">
          <h2 className="text-xl font-semibold text-text-primary mb-4" style={{ fontFamily: 'Garamond, Baskerville, Georgia, serif' }}>
            Account
          </h2>
          
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors border border-red-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

