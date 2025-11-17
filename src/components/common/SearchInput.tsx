import React from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search users, restaurants, or posts…',
}) => {
  return (
    <div className="relative flex-1 max-w-2xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <svg
          className="w-5 h-5 text-text-secondary transition-colors duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-11 pr-4 py-2.5 border border-border-color rounded-full bg-bg-card text-text-primary placeholder-text-secondary focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50 focus:border-accent-primary focus:outline-none text-base shadow-md transition-all duration-300"
        style={{ fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 700 }}
      />
    </div>
  );
};

