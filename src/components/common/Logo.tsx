import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export const Logo: React.FC = () => {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? '/Dark_Rendezvous_Logo.png' : '/Light_Rendezvous_Logo.png';
  
  return (
    <img 
      src={logoSrc}
      alt="RENDEZVOUS" 
      className="h-auto w-auto transition-opacity duration-300"
      style={{ 
        filter: theme === 'dark' 
          ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' 
          : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
        height: 'calc(2.5rem * 1.7)', // h-10 (40px) * 1.7 = 68px
      }}
    />
  );
};

