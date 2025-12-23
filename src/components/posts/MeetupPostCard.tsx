import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MeetupPost } from '../../types/models';
import { PostActions } from './PostActions';
import { Edit3, Archive, Trash2, Bookmark, BookmarkCheck, Flag, Users } from 'lucide-react';
import { CommentsSection } from '../comments/CommentsSection';
import { likePost, unlikePost, savePost, unsavePost, sharePost, fetchEnrollmentInfo, enrollInMeetup, cancelEnrollment, EnrollmentInfo } from '../../api/api';
import { ReportModal } from '../modals/ReportModal';
import { useAuth } from '../../contexts/AuthContext';

interface MeetupPostCardProps {
  post: MeetupPost;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
  isOwnPost?: boolean;
  onEdit?: (post: MeetupPost) => void;
  onDelete?: (post: MeetupPost) => void;
  onArchive?: (post: MeetupPost) => void;
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

export const MeetupPostCard: React.FC<MeetupPostCardProps> = ({ post, onClick, onTagClick, isOwnPost = false, onEdit, onDelete, onArchive }) => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const budgetInfo = parseBudget(post.budgetDescription);
  
  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Like state
  const [isLiked, setIsLiked] = useState(!!post.isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(post.likeCount);

  // Save state
  const [isSaved, setIsSaved] = useState(!!post.isSaved);
  const [isSaving, setIsSaving] = useState(false);

  // Report modal state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Share state
  const [shareCount, setShareCount] = useState(post.shareCount || 0);

  // Enrollment state
  const [enrollmentInfo, setEnrollmentInfo] = useState<EnrollmentInfo | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
  const [showMembersPopover, setShowMembersPopover] = useState(false);
  const membersPopoverRef = useRef<HTMLDivElement>(null);

  // Derived state from enrollment info
  const enrolledCount = enrollmentInfo?.enrolledCount ?? post.currentHeadcount;
  const isFull = enrollmentInfo?.isFull ?? (post.currentHeadcount >= post.maxHeadcount);
  const isEnrolled = enrollmentInfo?.isEnrolled ?? false;
  const canCancel = enrollmentInfo?.canCancel ?? false;
  const eventStarted = enrollmentInfo?.eventStarted ?? false;
  const isClosed = post.status === 'CLOSED' || isFull || eventStarted;

  // Fetch enrollment info on mount
  useEffect(() => {
    const loadEnrollmentInfo = async () => {
      try {
        const info = await fetchEnrollmentInfo(post.id);
        setEnrollmentInfo(info);
      } catch (error) {
        console.error('Error loading enrollment info:', error);
      }
    };
    loadEnrollmentInfo();
  }, [post.id]);

  useEffect(() => {
    setIsLiked(!!post.isLiked);
    setIsSaved(!!post.isSaved);
    setShareCount(post.shareCount || 0);
  }, [post.isLiked, post.isSaved, post.shareCount]);

  // Close members popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (membersPopoverRef.current && !membersPopoverRef.current.contains(event.target as Node)) {
        setShowMembersPopover(false);
      }
    };
    if (showMembersPopover) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showMembersPopover]);

  // Handle join/cancel enrollment
  const handleEnrollmentClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!currentUser) {
      // Redirect to login or show message
      navigate('/login');
      return;
    }

    if (isEnrolling) return;
    setIsEnrolling(true);
    setEnrollmentError(null);

    try {
      if (isEnrolled) {
        // Cancel enrollment
        if (!canCancel) {
          setEnrollmentError('活動開始前 2 小時內無法取消報名');
          setIsEnrolling(false);
          return;
        }
        const result = await cancelEnrollment(post.id);
        setEnrollmentInfo(prev => prev ? {
          ...prev,
          enrolledCount: result.enrolledCount,
          isEnrolled: result.isEnrolled,
          canCancel: result.canCancel,
          isFull: result.isFull,
          enrolledMembers: result.enrolledMembers || prev.enrolledMembers,
        } : null);
      } else {
        // Join
        const result = await enrollInMeetup(post.id);
        setEnrollmentInfo(prev => prev ? {
          ...prev,
          enrolledCount: result.enrolledCount,
          isEnrolled: result.isEnrolled,
          canCancel: result.canCancel,
          isFull: result.isFull,
          enrolledMembers: result.enrolledMembers || prev.enrolledMembers,
        } : null);
      }
    } catch (error: any) {
      console.error('Enrollment action failed:', error);
      setEnrollmentError(error.message || '操作失敗，請稍後再試');
      // Refresh enrollment info to get accurate state
      try {
        const info = await fetchEnrollmentInfo(post.id);
        setEnrollmentInfo(info);
      } catch {}
    } finally {
      setIsEnrolling(false);
    }
  };

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
      {post.imageUrl && !post.imageUrl.startsWith('blob:') && (
        <div className="mb-3 -mx-4 -mt-3 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.restaurantName}
            className="w-full h-48 object-cover"
            onError={(e) => {
              // Hide broken images
              (e.target as HTMLImageElement).style.display = 'none';
            }}
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
                      setMenuOpen(false);
                      if (onEdit) onEdit(post);
                    }}
                  />
                  <MenuActionItem
                    icon={<Archive className="w-4 h-4" />}
                    label={post.isArchived ? 'Cancel archived' : 'Archive this post'}
                    onClick={() => {
                      setMenuOpen(false);
                      if (onArchive) onArchive(post);
                    }}
                  />
                  <MenuActionItem
                    icon={<Trash2 className="w-4 h-4" />}
                    label="Delete this post"
                    destructive
                    onClick={() => {
                      setMenuOpen(false);
                      if (onDelete) {
                        if (window.confirm('確定要刪除這篇貼文嗎？此操作無法撤銷。')) {
                          onDelete(post);
                        }
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <MenuActionItem
                    icon={isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    label={isSaved ? '取消儲存' : '儲存貼文'}
                    onClick={async () => {
                      setMenuOpen(false);
                      if (isSaving) return;
                      setIsSaving(true);
                      try {
                        if (isSaved) {
                          await unsavePost(post.id, 'meetup');
                          setIsSaved(false);
                        } else {
                          await savePost(post.id, 'meetup');
                          setIsSaved(true);
                        }
                      } catch (error) {
                        console.error('Error toggling save:', error);
                      } finally {
                        setIsSaving(false);
                      }
                    }}
                  />
                  <MenuActionItem
                    icon={<Flag className="w-4 h-4" />}
                    label="檢舉貼文"
                    destructive
                    onClick={() => {
                      setMenuOpen(false);
                      setIsReportModalOpen(true);
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
        {/* Line 2: Separate Pills - Location, Restaurant, Style Tags - EXACTLY like ReviewPostCard */}
        <div className="mt-1 flex flex-wrap items-center gap-2 mb-2">
          {/* Chip 1: Location Area - clickable to search */}
          {district && (
            <button
              className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 hover:border-accent-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                if (onTagClick) {
                  onTagClick(district);
                } else {
                  navigate(`/?search=${encodeURIComponent(district)}`);
                }
              }}
            >
              <span className="text-text-secondary">
                {district}
              </span>
            </button>
          )}
          
          {/* Chip 2: Restaurant Name - clickable to open Google Maps */}
          <button
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 hover:border-accent-primary transition-colors"
            onClick={handleOpenGoogleMaps}
          >
            <span className="font-medium text-text-primary">
              {post.restaurantName}
            </span>
          </button>

          {/* Style and Category Tags - Same style as ReviewPostCard */}
          {post.foodTags && post.foodTags.map((tag, index) => (
            <button
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-gray-200 text-sm shadow-sm cursor-pointer hover:bg-neutral-50 hover:border-accent-primary transition-colors"
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
            <div className="relative" ref={membersPopoverRef}>
              <button
                type="button"
                className="font-semibold text-text-primary hover:text-accent-primary hover:underline cursor-pointer flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMembersPopover(!showMembersPopover);
                }}
                onMouseEnter={() => setShowMembersPopover(true)}
              >
                {enrolledCount} / {post.maxHeadcount} 已加入
                <Users className="w-3.5 h-3.5 text-text-secondary" />
              </button>
              
              {/* Enrolled Members Popover */}
              {showMembersPopover && enrollmentInfo?.enrolledMembers && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-30 max-h-60 overflow-y-auto"
                  onMouseLeave={() => setShowMembersPopover(false)}
                >
                  <div className="p-3 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-text-primary">已報名成員</h4>
                  </div>
                  {enrollmentInfo.enrolledMembers.length === 0 ? (
                    <div className="p-3 text-sm text-text-secondary text-center">
                      目前尚無人報名
                    </div>
                  ) : (
                    <div className="py-2">
                      {enrollmentInfo.enrolledMembers.map((member) => (
                        <div 
                          key={member.id}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            const handle = member.handle?.replace('@', '') || member.id;
                            navigate(`/user/${handle}`);
                          }}
                        >
                          <div className="w-8 h-8 rounded-full bg-accent-gold bg-opacity-40 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {member.avatarUrl ? (
                              <img src={member.avatarUrl} alt={member.displayName} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-text-primary text-sm">👤</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">{member.displayName}</p>
                            {member.handle && (
                              <p className="text-xs text-text-secondary truncate">{member.handle}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
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
        {eventStarted ? (
          <div className="w-full py-3 rounded-lg bg-gray-200 text-gray-600 text-center text-sm font-semibold mb-3">
            活動已開始
          </div>
        ) : post.status === 'CLOSED' ? (
          <div className="w-full py-3 rounded-lg bg-gray-200 text-gray-600 text-center text-sm font-semibold mb-3">
            活動已關閉
          </div>
        ) : isFull && !isEnrolled ? (
          <div className="w-full py-3 rounded-lg bg-gray-200 text-gray-600 text-center text-sm font-semibold mb-3">
            已額滿 / Full
          </div>
        ) : isEnrolled ? (
          <div className="flex flex-col gap-2 mb-3">
            <button 
              onClick={handleEnrollmentClick}
              disabled={isEnrolling || (!canCancel)}
              title={!canCancel ? '活動開始前 2 小時內無法取消報名' : ''}
              className={`w-full py-3 rounded-lg text-center text-sm font-bold transition-all duration-200 ${
                !canCancel 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200'
              }`}
            >
              {isEnrolling ? '處理中...' : '取消報名 / Cancel'}
            </button>
            {!canCancel && (
              <p className="text-xs text-text-secondary text-center">
                活動開始前 2 小時內無法取消報名
              </p>
            )}
            {enrollmentError && (
              <p className="text-xs text-red-600 text-center">{enrollmentError}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2 mb-3">
            <button 
              onClick={handleEnrollmentClick}
              disabled={isEnrolling}
              className="w-full py-3 rounded-lg bg-green-600 text-white text-center text-sm font-bold hover:bg-green-700 transition-all duration-200 disabled:opacity-50"
            >
              {isEnrolling ? '處理中...' : '報名 / Join'}
            </button>
            {enrollmentError && (
              <p className="text-xs text-red-600 text-center">{enrollmentError}</p>
            )}
          </div>
        )}

        {/* BOTTOM ACTION BAR - Reuse shared component */}
        <div className="flex items-center gap-6 text-text-secondary text-sm pt-2">
          <PostActions
            postId={post.id}
            isLiked={isLiked}
            likeCount={currentLikeCount}
            commentCount={post.commentCount}
            shareCount={shareCount}
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
            onShare={async (id) => {
              // Copy post URL to clipboard
              const url = `${window.location.origin}/post/${id}`;
              
              // Try native share first (mobile)
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: post.restaurantName,
                    text: post.description,
                    url: url,
                  });
                } catch (err) {
                  // User cancelled or error, fall back to clipboard
                  await navigator.clipboard.writeText(url);
                }
              } else {
                // Desktop: copy to clipboard
                await navigator.clipboard.writeText(url);
                alert('連結已複製到剪貼簿！');
              }
              
              // Increment share count in backend
              try {
                const result = await sharePost(id, 'meetup');
                setShareCount(result.shareCount);
              } catch (error) {
                console.error('Error recording share:', error);
              }
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

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        postId={post.id}
        postType="meetup"
      />
    </div>
  );
};
