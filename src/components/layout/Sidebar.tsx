import React, { useState } from 'react';
import { Board } from '../../types/models';

// Smooth expand/collapse animation wrapper
function FilterSectionBody({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// Active Filters Type (must match parent)
type ActiveFilters = {
  searchQuery: string;
  style: string | null;
  category: string | null;
  priceMin: number | null;
  priceMax: number | null;
  ratingAtLeast: number | null;
  distanceKm: number | null;
};

interface SidebarProps {
  boards: Board[];
  selectedBoardId: string | null;
  onBoardSelect: (boardId: string | null) => void;
  filters: ActiveFilters;
  onChangeStyle: (style: string | null) => void;
  onChangeCategory: (category: string | null) => void;
  onChangePrice?: (min: number | '', max: number | '') => void;
  onApplyPrice?: (min: number, max: number) => void;
  onChangeRating?: (ratingAtLeast: number | null) => void;
  onChangeNearMe?: (distanceKm: number | '') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  boards,
  selectedBoardId,
  onBoardSelect,
  filters,
  onChangeStyle,
  onChangeCategory,
  onChangePrice,
  onApplyPrice,
  onChangeRating,
  onChangeNearMe,
}) => {
  // Section open/close state (all collapsed by default)
  const [priceOpen, setPriceOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [styleOpen, setStyleOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [nearOpen, setNearOpen] = useState(false);

  // Local input state (syncs with filters from props)
  const [priceMin, setPriceMin] = useState<number | ''>(filters.priceMin ?? '');
  const [priceMax, setPriceMax] = useState<number | ''>(filters.priceMax ?? '');
  const [nearMeDistanceKm, setNearMeDistanceKm] = useState<number | ''>(filters.distanceKm ?? '');
  
  const cuisineBoards = boards.filter(b => b.category === 'cuisine');
  const typeBoards = boards.filter(b => b.category === 'type');

  const ratingOptions = [4, 3, 2];

  // Single-select handlers for Style and Category
  const handleStyleClick = (styleKey: string) => {
    const next = filters.style === styleKey ? null : styleKey;
    onChangeStyle(next);
  };

  const handleCategoryClick = (categoryKey: string) => {
    const next = filters.category === categoryKey ? null : categoryKey;
    onChangeCategory(next);
  };

  // Shared collapsible header component
  const SectionHeader: React.FC<{
    title: string;
    isOpen: boolean;
    onToggle: () => void;
  }> = ({ title, isOpen, onToggle }) => (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold tracking-[0.18em] text-text-secondary/80 uppercase cursor-pointer hover:text-text-secondary transition-colors"
    >
      <span>{title}</span>
      <svg
        className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-180'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );

  // Star rendering helper
  const renderStars = (count: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < count) {
        // Filled star
        stars.push(
          <svg key={i} className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        // Outline star
        stars.push(
          <svg key={i} className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 20 20">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="sticky top-0 pb-6">
      <div className="p-4">
        {/* Main title */}
        <h2 className="text-lg font-serif font-extrabold text-text-primary mb-4 leading-tight">
          看板 (Board)
        </h2>

        {/* All Boards Option */}
        <button
          onClick={() => onBoardSelect(null)}
          className={`w-full text-left px-3 py-2.5 rounded-lg mb-4 text-base font-semibold transition-all duration-200 flex items-center gap-2 ${
            selectedBoardId === null
              ? 'bg-white text-topbar shadow-sm border-l-2 border-accent-primary'
              : 'text-text-primary hover:bg-white/50'
          }`}
        >
          <svg className="w-4 h-4 flex-shrink-0 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          <span className="text-[15px] font-semibold text-text-primary">
            所有看板 (All Boards)
          </span>
        </button>

        {/* 風格 (STYLE) Section */}
        <div className="mb-5">
          <SectionHeader
            title="風格 (STYLE)"
            isOpen={styleOpen}
            onToggle={() => setStyleOpen(!styleOpen)}
          />
          
          <FilterSectionBody open={styleOpen}>
            <div className="px-3 pb-3 space-y-1">
              {cuisineBoards.map(board => {
                const isActive = filters.style === board.label;
                return (
                  <button
                    key={board.id}
                    onClick={() => handleStyleClick(board.label)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-white text-topbar font-semibold shadow-sm border-l-2 border-accent-primary'
                        : 'text-text-primary hover:bg-white/50 font-medium'
                    }`}
                  >
                    <svg className="w-4 h-4 flex-shrink-0 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                    <span className="text-sm md:text-[15px]">{board.label}</span>
                  </button>
                );
              })}
            </div>
          </FilterSectionBody>
        </div>

        {/* 類別 (CATEGORY) Section */}
        <div className="mb-5">
          <SectionHeader
            title="類別 (CATEGORY)"
            isOpen={categoryOpen}
            onToggle={() => setCategoryOpen(!categoryOpen)}
          />
          
          <FilterSectionBody open={categoryOpen}>
            <div className="px-3 pb-3 space-y-1">
              {typeBoards.map(board => {
                const isActive = filters.category === board.label;
                return (
                  <button
                    key={board.id}
                    onClick={() => handleCategoryClick(board.label)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-white text-topbar font-semibold shadow-sm border-l-2 border-accent-primary'
                        : 'text-text-primary hover:bg-white/50 font-medium'
                    }`}
                  >
                    <svg className="w-4 h-4 flex-shrink-0 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm md:text-[15px]">{board.label}</span>
                  </button>
                );
              })}
            </div>
          </FilterSectionBody>
        </div>

        {/* 評價 (RATING) Section */}
        <div className="mb-5">
          <SectionHeader
            title="評價 (RATING)"
            isOpen={ratingOpen}
            onToggle={() => setRatingOpen(!ratingOpen)}
          />
          
          <FilterSectionBody open={ratingOpen}>
            <div className="px-3 pb-3 space-y-1">
              {ratingOptions.map((stars) => (
                <button
                  key={stars}
                  type="button"
                  className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs transition-colors ${
                    filters.ratingAtLeast === stars ? "bg-white shadow-sm" : "hover:bg-white/50"
                  }`}
                  onClick={() => {
                    const next = filters.ratingAtLeast === stars ? null : stars;
                    if (typeof onChangeRating === 'function') {
                      onChangeRating(next);
                    } else {
                      console.log('rating filter changed:', next);
                    }
                  }}
                >
                  <div className="flex items-center gap-1">
                    {renderStars(stars)}
                  </div>
                  <span className="text-xs text-text-secondary">
                    或以上
                  </span>
                </button>
              ))}
            </div>
          </FilterSectionBody>
        </div>

        {/* 價格 (PRICE) Section */}
        <div className="mb-5">
          <SectionHeader
            title="價格 (PRICE)"
            isOpen={priceOpen}
            onToggle={() => setPriceOpen(!priceOpen)}
          />
          
          <FilterSectionBody open={priceOpen}>
            <div className="px-3 pb-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-[11px] text-text-secondary">
                    最小值
                  </label>
                  <div className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1">
                    <span className="text-xs text-text-secondary">NT$</span>
                    <input
                      type="number"
                      min={0}
                      className="w-full border-none bg-transparent p-0 text-xs text-text-primary focus:outline-none"
                      value={priceMin}
                      onChange={(e) => {
                        const v = e.target.value === '' ? '' : Number(e.target.value);
                        setPriceMin(v);
                        onChangePrice?.(v, priceMax);
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>

                <span className="mt-5 text-xs text-text-secondary">—</span>

                <div className="flex-1">
                  <label className="mb-1 block text-[11px] text-text-secondary">
                    最大值
                  </label>
                  <div className="flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1">
                    <span className="text-xs text-text-secondary">NT$</span>
                    <input
                      type="number"
                      min={0}
                      className="w-full border-none bg-transparent p-0 text-xs text-text-primary focus:outline-none"
                      value={priceMax}
                      onChange={(e) => {
                        const v = e.target.value === '' ? '' : Number(e.target.value);
                        setPriceMax(v);
                        onChangePrice?.(priceMin, v);
                      }}
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>

              <button
                className="mt-2 w-full rounded-md bg-topbar px-3 py-1.5 text-xs font-semibold text-white hover:brightness-105 transition-all"
                onClick={() => {
                  if (typeof onApplyPrice === "function" && priceMin !== '' && priceMax !== '') {
                    onApplyPrice(priceMin as number, priceMax as number);
                  } else {
                    console.log("apply price filter", priceMin, priceMax);
                  }
                }}
              >
                套用
              </button>
            </div>
          </FilterSectionBody>
        </div>

        {/* 距離 (NEAR ME) Section */}
        <div className="mb-5">
          <SectionHeader
            title="距離 (NEAR ME)"
            isOpen={nearOpen}
            onToggle={() => setNearOpen(!nearOpen)}
          />
          
          <FilterSectionBody open={nearOpen}>
            <div className="px-3 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-md border border-gray-300 bg-white px-2 py-1">
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={nearMeDistanceKm}
                    onChange={(e) => {
                      const v = e.target.value === '' ? '' : Number(e.target.value);
                      setNearMeDistanceKm(v);
                      if (typeof onChangeNearMe === 'function') {
                        onChangeNearMe(v);
                      } else if (v !== '') {
                        console.log('Near me distance changed (km):', v);
                      }
                    }}
                    placeholder="3"
                    className="w-12 border-none bg-transparent p-0 text-xs text-text-primary focus:outline-none"
                  />
                  <span className="ml-1 text-xs text-text-secondary">km 以內</span>
                </div>
              </div>
            </div>
          </FilterSectionBody>
        </div>
      </div>
    </div>
  );
};

