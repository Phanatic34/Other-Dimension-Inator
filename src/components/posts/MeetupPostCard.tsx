import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MeetupPost } from '../../types/models';
import { PostActions } from './PostActions';
import { Edit3, Archive, Trash2, Bookmark, Flag } from 'lucide-react';
import { CommentsSection } from '../comments/CommentsSection';
import { likePost, unlikePost } from '../../api/api';

interface MeetupPostCardProps {
  post: MeetupPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
  isOwnPost?: boolean;
}

interface MenuActionItemProps {
  icon: React.ReactNode;
  label: string;
  destructive?: boolean;
  onClick?: () => void;
}

const MenuActionItem: React.FC<MenuActionItemProps> = ({
  icon,
  label,
  destructive,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex w-full items-center gap-3 px-4 py-2 text-sm ${
      destructive ? 'text-red-600 hover:bg-red-50' : 'text-gray-800 hover:bg-gray-50'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

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

export const MeetupPostCard: React.FC<MeetupPostCardProps> = ({ post, onClick, onTagClick, isOwnPost = false }) => {
  const navigate = useNavigate();
  const isFull = post.currentHeadcount >= post.maxHeadcount;
  const isClosed = post.status === 'CLOSED' || isFull;
  const budgetInfo = parseBudget(post.budgetDescription);
  
  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Like state
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(post.likeCount);

  // Navigate to author's profile
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const handle = post.author.handle?.replace('@', '') || post.author.id;
    navigate(`/user/${handle}`);
  };
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };
    
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);

  // Build full detailed address (big → small): city, district, street, building (no restaurant name)
  // Priority: use address if it's already detailed, otherwise build from available fields
  // Remove restaurant name from address if it's included
  let fullAddress = post.address || post.locationText || '';
  
  // Remove restaurant name from the end of address if it exists
  if (fullAddress && post.restaurantName) {
    const restaurantName = post.restaurantName.trim();
    // Check if address ends with restaurant name and remove it
    if (fullAddress.endsWith(restaurantName)) {
      fullAddress = fullAddress.slice(0, -restaurantName.length).trim();
    }
  }
  
  // Fallback: if no address, use locationText (without restaurant name)
  if (!fullAddress) {
    fullAddress = post.locationText || '';
  }
  
  // Use the same fullAddress for Google Maps search
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  
  // Extract district/region from locationText or locationArea for the chip
  const district = post.locationArea || (post.locationText?.includes('區') ? post.locationText.split('區')[0] + '區' : post.locationText?.split(',')[0]?.trim() || post.locationText);
  
  // Handler for opening Google Maps
  const handleOpenGoogleMaps = (e?: React.MouseEvent) => {
    if (e) {
    e.stopPropagation();
    }
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
        {/* Avatar - clickable to go to author profile */}
        <div 
          className="relative mr-3 flex-shrink-0 cursor-pointer"
          onClick={handleAuthorClick}
        >
          <div className="w-10 h-10 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden hover:ring-2 hover:ring-accent-primary transition-all">
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
            <span 
              className="font-bold text-text-primary hover:underline cursor-pointer"
              onClick={handleAuthorClick}
            >
              {post.author.displayName}
            </span>
            <span 
              className="text-text-secondary hover:underline cursor-pointer"
              onClick={handleAuthorClick}
            >
              {post.author.handle}
            </span>
            <span className="text-text-secondary">•</span>
            <span className="text-text-secondary">
              {post.createdAt}
            </span>
          </div>
          
          {/* "→" row */}
          <div className="text-sm text-text-secondary mt-0.5">
            <span>→ </span>
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
        <div className="relative flex-shrink-0">
        <button 
            className="p-1 rounded-full hover:bg-neutral-100 cursor-pointer text-text-secondary"
          onClick={(e) => {
            e.stopPropagation();
              setMenuOpen((v) => !v);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
          
          {/* Dropdown menu */}
          {menuOpen && (
            <div 
              className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-neutral-200 z-20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
            >
              {isOwnPost ? (
                <>
                  <MenuActionItem
                    icon={<Edit3 className="w-4 h-4" />}
                    label="Edit this post"
                    onClick={() => {
                      console.log('Edit post', post.id);
                      setMenuOpen(false);
                    }}
                  />
                  <MenuActionItem
                    icon={<Archive className="w-4 h-4" />}
                    label="Archive this post"
                    onClick={() => {
                      console.log('Archive post', post.id);
                      setMenuOpen(false);
                    }}
                  />
                  <MenuActionItem
                    icon={<Trash2 className="w-4 h-4" />}
                    label="Delete this post"
                    destructive
                    onClick={() => {
                      console.log('Delete post', post.id);
                      setMenuOpen(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <MenuActionItem
                    icon={<Bookmark className="w-4 h-4" />}
                    label="Save this post"
                    onClick={() => {
                      console.log('Save post', post.id);
                      setMenuOpen(false);
                    }}
                  />
                  <MenuActionItem
                    icon={<Flag className="w-4 h-4" />}
                    label="Report this post"
                    destructive
                    onClick={() => {
                      console.log('Report post', post.id);
                      setMenuOpen(false);
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
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
                } else {
                  // Navigate to search with tag
                  navigate(`/?search=${encodeURIComponent(tag)}`);
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
            <span className="text-text-secondary">時間</span>
            <span className="font-semibold text-text-primary">{formatMeetupTime(post.meetupTime)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">人數</span>
            <span className="font-semibold text-text-primary">
              {post.currentHeadcount} / {post.maxHeadcount} 已加入
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">預計</span>
            <span className="font-semibold text-text-primary">
              {(() => {
                const rawBudgetDesc = post.budgetDescription ?? "";
                let budgetValue = rawBudgetDesc.replace(/^預計\s*/, "") || "--";
                // Format: "500–700 / 1 人" to "500$ ~ 700$ / 1 人"
                // Replace en dash or hyphen with " ~ " and add $ after numbers
                budgetValue = budgetValue.replace(/(\d+)[–-](\d+)/g, "$1$ ~ $2$");
                return budgetValue;
              })()}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">已訂位</span>
            <span className="font-semibold text-text-primary">{post.hasReservation ? '是' : '否'}</span>
          </div>
        </div>

        {/* Icons Row - Three columns: Payment, Budget, Headcount */}
        <div className="flex items-start gap-4 mb-3 px-3 py-3 bg-bg-secondary rounded-lg">
          {/* Icon 1: Credit card / Payment method */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <span className="text-xs text-text-secondary font-medium">付款方式</span>
            <span className="text-sm text-text-primary font-semibold">{budgetInfo.isTreating ? '我請客' : 'AA制'}</span>
          </div>

          {/* Icon 2: Coin / Price */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v12M6 12h12"></path>
            </svg>
            <span className="text-xs text-text-secondary font-medium">價位</span>
            <span className="text-sm text-text-primary font-semibold">
              {budgetInfo.priceSymbol || '--'}
            </span>
          </div>

          {/* Icon 3: People / Headcount */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="text-xs text-text-secondary font-medium">人數</span>
            <span className="text-sm text-text-primary font-semibold">{post.maxHeadcount}人</span>
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
            isLiked={isLiked}
            likeCount={currentLikeCount}
            commentCount={post.commentCount}
            shareCount={post.shareCount}
            onLike={async (id) => {
              try {
                if (isLiked) {
                  await unlikePost(id, 'meetup');
                  setIsLiked(false);
                  setCurrentLikeCount(prev => prev - 1);
                } else {
                  await likePost(id, 'meetup');
                  setIsLiked(true);
                  setCurrentLikeCount(prev => prev + 1);
                }
              } catch (error) {
                console.error('Error toggling like:', error);
              }
            }}
            onComment={(id) => {
              // Scroll to comments section
              const commentsSection = document.getElementById(`comments-${id}`);
              if (commentsSection) {
                commentsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onShare={(id) => {
              // Copy post URL to clipboard
              const url = `${window.location.origin}/post/${id}`;
              navigator.clipboard.writeText(url);
              alert('連結已複製到剪貼簿！');
            }}
          />
        </div>

        {/* Comments Section */}
        <div id={`comments-${post.id}`}>
          <CommentsSection
            postId={post.id}
            postType="meetup"
            initialCommentCount={post.commentCount}
          />
        </div>
      </div>
    </div>
  );
};
