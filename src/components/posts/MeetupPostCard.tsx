import React from 'react';
import { MeetupPost } from '../../types/models';
import { PostActions } from './PostActions';

interface MeetupPostCardProps {
  post: MeetupPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
}

// Helper to format ISO datetime string to readable format
const formatMeetupTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch {
    return isoString; // Fallback to original string if parsing fails
  }
};

// Helper to derive price symbol from amount
const derivePriceSymbol = (amount: number | null): string => {
  if (!amount) return '';
  // Rough conversion: < 300 = $, 300-600 = $$, > 600 = $$$
  if (amount < 300) return '$';
  if (amount <= 600) return '$$';
  return '$$$';
};

// Helper to parse budget description and extract price symbols
const parseBudget = (budgetDescription: string): { 
  isTreating: boolean; 
  amount: number | null; 
  displayText: string; 
  priceSymbol: string; // $, $$, $$$, or empty
} => {
  if (!budgetDescription) {
    return { 
      isTreating: false, 
      amount: null, 
      displayText: '--',
      priceSymbol: ''
    };
  }
  
  // Check if budgetDescription is just price symbols ($, $$, $$$)
  const priceSymbolMatch = budgetDescription.match(/^(\$+)$/);
  if (priceSymbolMatch) {
    return { 
      isTreating: false, 
      amount: null, 
      displayText: '--', 
      priceSymbol: priceSymbolMatch[1]
    };
  }
  
  // Check for "我請客"
  if (budgetDescription.includes('我請客')) {
    return { 
      isTreating: true, 
      amount: null, 
      displayText: '我請客',
      priceSymbol: ''
    };
  }
  
  // Try to extract number from "預計 500 / 1 人" or "預計 500–700 / 1 人" format
  const match = budgetDescription.match(/預計\s*(\d+)(?:[–-](\d+))?\s*\/\s*1\s*人/);
  if (match) {
    const amount = parseInt(match[1]);
    const maxAmount = match[2] ? parseInt(match[2]) : amount;
    // Use the higher amount for price symbol derivation
    const avgAmount = match[2] ? Math.round((amount + maxAmount) / 2) : amount;
    return { 
      isTreating: false, 
      amount: avgAmount, 
      displayText: budgetDescription,
      priceSymbol: derivePriceSymbol(avgAmount)
    };
  }
  
  // Try to extract any number from budgetDescription for price symbol derivation
  const numberMatch = budgetDescription.match(/(\d+)/);
  if (numberMatch) {
    const amount = parseInt(numberMatch[1]);
    return { 
      isTreating: false, 
      amount, 
      displayText: budgetDescription,
      priceSymbol: derivePriceSymbol(amount)
    };
  }
  
  // Return budgetDescription as-is for display, no price symbol
  return { 
    isTreating: false, 
    amount: null, 
    displayText: budgetDescription,
    priceSymbol: ''
  };
};

export const MeetupPostCard: React.FC<MeetupPostCardProps> = ({ post, onClick, onTagClick }) => {
  const isFull = post.currentHeadcount >= post.maxHeadcount;
  const isClosed = post.status === 'CLOSED' || isFull;
  const budgetInfo = parseBudget(post.budgetDescription);

  // Build full address for Google Maps and display
  // Priority: address > locationText + restaurantName > locationText > restaurantName
  const fullAddress = post.address || 
    (post.locationText && post.restaurantName 
      ? `${post.locationText} ${post.restaurantName}`.trim()
      : post.locationText || post.restaurantName || '');
  
  // Build raw address for Google Maps search (same as fullAddress)
  const rawAddress = fullAddress;
  
  // Extract district/region from locationText or locationArea for the chip
  const district = post.locationArea || (post.locationText?.includes('區') ? post.locationText.split('區')[0] + '區' : post.locationText?.split(',')[0]?.trim() || post.locationText);
  
  // Handler for opening Google Maps
  const handleOpenGoogleMaps = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(rawAddress)}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  // Extract style and category tags from foodTags
  // foodTags typically contains both style (cuisine) and category (food type) tags
  // We'll display them in the same order as they appear, matching review post style

  return (
    <div
      onClick={onClick}
      className="group px-4 py-3 border-b border-border-color cursor-pointer hover:bg-bg-hover transition-colors duration-200"
    >
      {/* Optional Image Banner */}
      {post.imageUrl && (
        <div className="mb-3 -mx-4 -mt-3 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.restaurantName}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {/* TOP SECTION: Header Row - Match ReviewPostCard style */}
      <div className="flex items-start mb-2">
        {/* Avatar */}
        <div className="relative mr-3 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden">
            {post.author.avatarUrl ? (
              <img src={post.author.avatarUrl} alt={post.author.displayName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-text-primary text-lg">👤</span>
            )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-1 min-w-0">
          {/* Line 1: Name, Username, Time */}
          <div className="flex items-baseline flex-wrap gap-1 text-sm">
            <span className="font-bold text-text-primary">
              {post.author.displayName}
            </span>
            <span className="text-text-secondary">
              {post.author.handle}
            </span>
            <span className="text-text-secondary">•</span>
            <span className="text-text-secondary">
              {post.createdAt}
            </span>
          </div>
          
          {/* "→ looking for:" row */}
          <div className="text-sm text-text-secondary mt-0.5">
            <span>→ looking for: </span>
            <button
              type="button"
              className="font-semibold hover:underline cursor-pointer text-text-primary"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenGoogleMaps();
              }}
            >
              {fullAddress}
            </button>
          </div>
        </div>

        {/* More options button */}
        <button 
          className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer text-text-secondary flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            console.log('More options clicked');
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="ml-[52px]">
        {/* Line 2: Three Separate Pills - Restaurant+Location, Style Type, Food Type - EXACTLY like ReviewPostCard */}
        <div className="mt-1 flex flex-wrap items-center gap-2 mb-2">
          {/* Chip 1: Restaurant + Location - Same style as ReviewPostCard */}
          <button
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer group-hover:bg-neutral-50 transition-colors"
            onClick={handleOpenGoogleMaps}
          >
            {district && (
              <>
                <span className="text-text-secondary">
                  {district}
                </span>
                <span className="text-gray-300">|</span>
              </>
            )}
            <span className="font-medium text-text-primary">
              {post.restaurantName}
            </span>
          </button>

          {/* Style and Category Tags - Same style as ReviewPostCard */}
          {post.foodTags && post.foodTags.map((tag, index) => (
            <button
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (onTagClick) {
                  onTagClick(tag);
                }
              }}
            >
              <span className="font-medium text-text-primary">
                {tag}
              </span>
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="text-base text-text-primary leading-relaxed mb-3">
          {post.description}
        </p>

        {/* Meetup Info Card - Styled like Eatogether */}
        <div className="bg-bg-card border border-border-color rounded-lg p-3 mb-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Meetup Time</span>
            <span className="font-semibold text-text-primary">{formatMeetupTime(post.meetupTime)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Headcount</span>
            <span className="font-semibold text-text-primary">
              {post.currentHeadcount} / {post.maxHeadcount} joined
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Budget</span>
            <span className="font-semibold text-text-primary">{budgetInfo.displayText}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Reservation</span>
            <span className="font-semibold text-text-primary">{post.hasReservation ? 'Yes' : 'No'}</span>
          </div>
        </div>

        {/* Icons Row - Larger with labels */}
        <div className="flex items-start gap-4 mb-3 px-3 py-3 bg-bg-secondary rounded-lg">
          {/* Icon A: Wine glass / Event type */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <path d="M8 21h8M12 21v-8M8 13l-4-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4l-4 4"></path>
            </svg>
            <span className="text-xs text-text-secondary font-medium">聚會</span>
            <span className="text-sm text-text-primary font-semibold">50</span>
          </div>

          {/* Icon B: Credit card / Payment method */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span className="text-xs text-text-secondary font-medium">付款方式</span>
            <span className="text-sm text-text-primary font-semibold">{budgetInfo.isTreating ? '我請客' : 'AA制'}</span>
          </div>

          {/* Icon C: Coin / Price */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v12M6 12h12"></path>
            </svg>
            <span className="text-xs text-text-secondary font-medium">預算</span>
            <span className="text-sm text-text-primary font-semibold">
              {budgetInfo.priceSymbol || '--'}
            </span>
          </div>

          {/* Icon D: People / Headcount */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="text-xs text-text-secondary font-medium">人數</span>
            <span className="text-sm text-text-primary font-semibold">{post.currentHeadcount}人</span>
          </div>
        </div>

        {/* Status Bar - Bottom of card */}
        {isClosed ? (
          <div className="w-full py-3 rounded-lg bg-gray-200 text-gray-600 text-center text-sm font-semibold mb-3">
            Closed
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Implement join functionality
              console.log('Join meetup clicked');
            }}
            className="w-full py-3 rounded-lg bg-green-600 text-white text-center text-sm font-bold hover:bg-green-700 transition-all duration-200 mb-3"
          >
            報名 / Join
          </button>
        )}

        {/* BOTTOM ACTION BAR - Reuse shared component */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          <PostActions
            postId={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            onLike={(id) => console.log('like meetup post', id)}
            onComment={(id) => console.log('comment meetup post', id)}
            onShare={(id) => console.log('share meetup post', id)}
          />
        </div>
      </div>
    </div>
  );
};
