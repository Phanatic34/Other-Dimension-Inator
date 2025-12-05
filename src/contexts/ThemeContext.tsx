import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Force light theme only - no theme switching for now
  const [theme] = useState<Theme>('light');

  useEffect(() => {
    // Always set to light theme
    document.documentElement.setAttribute('data-theme', 'light');
    // Clear any saved dark theme preference
    if (localStorage.getItem('theme') === 'dark') {
      localStorage.removeItem('theme');
    }
  }, []);

  const toggleTheme = () => {
    // Disabled - theme switching not available yet
    console.log('Theme switching is currently disabled');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

