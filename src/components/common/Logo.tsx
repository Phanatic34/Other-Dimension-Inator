import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export const Logo: React.FC = () => {
  const { theme } = useTheme();
  // Version number to bust cache after logo update
  const version = '5.0';
  // Use transparent logo for both themes
  const logoSrc = `/Transparent_Rendezvous_Logo.png?v=${version}`;
  
  return (
    <img 
      src={logoSrc}
      alt="RENDEZVOUS" 
      className="h-auto w-auto transition-opacity duration-300"
      key={`logo-${version}`}
      style={{ 
        filter: theme === 'dark' 
          ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' 
          : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
        height: 'calc(2.5rem * 1.7 * 1.5114514)', // 68px * 1.5114514 ≈ 102.78px
        marginTop: '3px', // Move logo down slightly
        marginBottom: '-3px', // Align to bottom edge
        marginLeft: '-48px', // Move logo to the left
      }}
    />
  );
};

