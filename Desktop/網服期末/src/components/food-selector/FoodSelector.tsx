import React, { useState, useEffect, useRef } from 'react';
import { STYLE_OPTIONS } from '../../utils/tagOptions';
import { calculateSegments, calculateTargetRotation, selectWinner, WheelSegment } from '../../utils/wheelMath';

type MealTime = 'breakfast' | 'lunch' | 'dinner' | 'late-night';

interface MealTimeOption {
  id: MealTime;
  label: string;
}

const MEAL_TIME_OPTIONS: MealTimeOption[] = [
  { id: 'breakfast', label: '早餐' },
  { id: 'lunch', label: '午餐' },
  { id: 'dinner', label: '晚餐' },
  { id: 'late-night', label: '宵夜' },
];

interface FoodSelectorState {
  selectedMealTime: MealTime | null;
  excludedIds: string[]; // Array for serialization
  lastPickedId: string | null;
}

const STORAGE_KEY = 'rendezvous-food-selector-state';

export const FoodSelector: React.FC = () => {
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime | null>(null);
  const [excludedIds, setExcludedIds] = useState<Set<string>>(new Set());
  const [lastPickedId, setLastPickedId] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentResult, setCurrentResult] = useState<{ id: string; label: string } | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: FoodSelectorState = JSON.parse(saved);
        setSelectedMealTime(parsed.selectedMealTime);
        setExcludedIds(new Set(parsed.excludedIds || []));
        setLastPickedId(parsed.lastPickedId || null);
      }
    } catch (error) {
      console.error('Failed to load food selector state:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      const state: FoodSelectorState = {
        selectedMealTime,
        excludedIds: Array.from(excludedIds), // Convert Set to array for serialization
        lastPickedId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save food selector state:', error);
    }
  }, [selectedMealTime, excludedIds, lastPickedId]);

  // Calculate available options (not excluded)
  const availableOptions = STYLE_OPTIONS.filter(opt => !excludedIds.has(opt.id));
  const excludedCount = excludedIds.size;
  const remainingCount = availableOptions.length;

  // Calculate wheel segments
  const segments = calculateSegments(availableOptions);

  // Validation: can spin if remainingCount >= 2
  const canSpin = remainingCount >= 2 && !isSpinning;

  // Toggle exclusion for a style option
  const toggleExclusion = (id: string) => {
    if (isSpinning) return;
    
    setExcludedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Handle spin
  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    
    // Select winner (avoiding last picked if possible)
    const winner = selectWinner(availableOptions, lastPickedId);
    
    // Find winner index
    const winnerIndex = availableOptions.findIndex(opt => opt.id === winner.id);
    
    // Calculate target rotation
    const targetRotation = calculateTargetRotation(winnerIndex, availableOptions.length);
    
    // Set rotation with transition
    setWheelRotation(targetRotation);
    
    // Wait for animation to complete (3 seconds)
    setTimeout(() => {
      setCurrentResult(winner);
      setLastPickedId(winner.id);
      setIsSpinning(false);
    }, 3000);
  };

  // Handle "spin again"
  const handleSpinAgain = () => {
    setCurrentResult(null);
    setWheelRotation(0);
    // Small delay to reset visual state
    setTimeout(() => {
      handleSpin();
    }, 100);
  };

  // Handle "ban this result"
  const handleBanResult = () => {
    if (!currentResult) return;
    
    const newExcludedIds = new Set(excludedIds);
    newExcludedIds.add(currentResult.id);
    setExcludedIds(newExcludedIds);
    setCurrentResult(null);
    setLastPickedId(null);
    setWheelRotation(0);
    
    // After banning, check if remaining < 2
    // The warning will automatically show based on remainingCount calculation
  };

  // Handle reset
  const handleReset = () => {
    setSelectedMealTime(null);
    setExcludedIds(new Set());
    setLastPickedId(null);
    setCurrentResult(null);
    setWheelRotation(0);
    setIsSpinning(false);
  };

  // Generate colors for wheel segments
  const getSegmentColor = (index: number): string => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80',
      '#EC7063', '#5DADE2', '#F1948A'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="max-w-[720px] mx-auto space-y-6 py-6">
      {/* Meal Time Selector */}
      <section className="bg-bg-card rounded-3xl border border-border-color p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-4">選擇用餐時段</h3>
        <div className="flex flex-wrap gap-3">
          {MEAL_TIME_OPTIONS.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedMealTime(option.id)}
              disabled={isSpinning}
              className={`px-5 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                selectedMealTime === option.id
                  ? 'bg-accent-primary text-text-primary shadow-md font-bold'
                  : 'bg-bg-tertiary text-text-secondary hover:bg-bg-hover hover:text-text-primary'
              } ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={selectedMealTime === option.id ? { fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 } : {}}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      {/* Exclusion Chips */}
      <section className="bg-bg-card rounded-3xl border border-border-color p-6 shadow-sm">
        <h3 className="text-lg font-bold text-text-primary mb-4">排除不想要的類型</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {STYLE_OPTIONS.map(option => {
            const isExcluded = excludedIds.has(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggleExclusion(option.id)}
                disabled={isSpinning}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isExcluded
                    ? 'bg-red-100 text-red-700 border-2 border-red-300'
                    : 'bg-bg-tertiary text-text-secondary hover:bg-bg-hover hover:text-text-primary border-2 border-transparent'
                } ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        
        {/* Helper text */}
        <div className="text-sm text-text-secondary space-y-1">
          <p>已排除：{excludedCount}（至少需保留 2 種選擇才能開始）</p>
          {remainingCount < 2 && (
            <p className="text-red-600 font-medium">
              排除太多，至少要保留 2 種選擇
            </p>
          )}
        </div>
      </section>

      {/* Wheel Spinner */}
      <section className="bg-bg-card rounded-3xl border border-border-color p-6 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-md aspect-square mb-6">
            {/* Pointer at top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-accent-primary"></div>
            </div>

            {/* Wheel container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-border-color shadow-lg">
              <div
                ref={wheelRef}
                className="w-full h-full transition-transform duration-[3000ms] ease-out"
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                }}
              >
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  {segments.map((segment, index) => {
                    const startAngleRad = (segment.startAngle * Math.PI) / 180;
                    const endAngleRad = (segment.endAngle * Math.PI) / 180;
                    const centerX = 200;
                    const centerY = 200;
                    const radius = 200;

                    // Calculate path for segment
                    const x1 = centerX + radius * Math.sin(startAngleRad);
                    const y1 = centerY - radius * Math.cos(startAngleRad);
                    const x2 = centerX + radius * Math.sin(endAngleRad);
                    const y2 = centerY - radius * Math.cos(endAngleRad);

                    const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;

                    const pathData = [
                      `M ${centerX} ${centerY}`,
                      `L ${x1} ${y1}`,
                      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z',
                    ].join(' ');

                    // Text position (middle of segment)
                    const textAngleRad = ((segment.startAngle + segment.endAngle) / 2 * Math.PI) / 180;
                    const textRadius = radius * 0.7;
                    const textX = centerX + textRadius * Math.sin(textAngleRad);
                    const textY = centerY - textRadius * Math.cos(textAngleRad);

                    return (
                      <g key={segment.id}>
                        <path
                          d={pathData}
                          fill={getSegmentColor(index)}
                          stroke="#fff"
                          strokeWidth="2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs font-bold fill-white"
                          style={{ fontSize: '11px' }}
                        >
                          <tspan x={textX} dy="0">{segment.label.split(' ')[0]}</tspan>
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Warning message if remaining < 2 */}
          {remainingCount < 2 && (
            <p className="text-red-600 font-medium mb-4 text-center">
              排除太多，至少要保留 2 種選擇
            </p>
          )}

          {/* Spin button */}
          <button
            onClick={handleSpin}
            disabled={!canSpin}
            className={`px-8 py-4 rounded-lg text-lg font-bold transition-all duration-200 ${
              canSpin
                ? 'bg-accent-primary text-text-primary shadow-md hover:shadow-lg hover:scale-105'
                : 'bg-bg-tertiary text-text-secondary cursor-not-allowed opacity-50'
            }`}
            style={canSpin ? { fontFamily: 'Garamond, Baskerville, Georgia, Times New Roman, serif', fontWeight: 900 } : {}}
          >
            開始轉
          </button>
        </div>
      </section>

      {/* Result Card */}
      {currentResult && (
        <section className="bg-bg-card rounded-3xl border-2 border-accent-primary p-6 shadow-lg">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-text-primary">結果</h3>
            <div className="text-2xl font-bold text-accent-primary py-4">
              {currentResult.label}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleSpinAgain}
                disabled={!canSpin || isSpinning}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  canSpin && !isSpinning
                    ? 'bg-accent-primary text-text-primary shadow-md hover:shadow-lg'
                    : 'bg-bg-tertiary text-text-secondary cursor-not-allowed opacity-50'
                }`}
              >
                再轉一次
              </button>
              <button
                onClick={handleBanResult}
                disabled={isSpinning}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  !isSpinning
                    ? 'bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200'
                    : 'bg-bg-tertiary text-text-secondary cursor-not-allowed opacity-50'
                }`}
              >
                不想要這類
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Reset button */}
      <div className="flex justify-center">
        <button
          onClick={handleReset}
          disabled={isSpinning}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            !isSpinning
              ? 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              : 'text-text-secondary cursor-not-allowed opacity-50'
          }`}
        >
          重置
        </button>
      </div>
    </div>
  );
};

