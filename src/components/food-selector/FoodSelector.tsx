import React, { useState, useEffect, useRef } from 'react';
import { STYLE_OPTIONS } from '../../utils/tagOptions';
import { calculateSegments, calculateTargetRotation, selectWinnerWeighted, WheelSegment } from '../../utils/wheelMath';

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

type SpinPhase = 'idle' | 'spinningMain' | 'bouncing' | 'done';

interface FoodSelectorState {
  selectedMealTime: MealTime | null;
  excludedIds: string[];
  lastPickedId: string | null;
  historyIds: string[];
  // scores removed - not persisted to localStorage
}

const STORAGE_KEY = 'rendezvous-food-selector-state';

export const FoodSelector: React.FC = () => {
  const [selectedMealTime, setSelectedMealTime] = useState<MealTime | null>(null);
  const [excludedIds, setExcludedIds] = useState<Set<string>>(new Set());
  const [lastPickedId, setLastPickedId] = useState<string | null>(null);
  const [historyIds, setHistoryIds] = useState<string[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [spinPhase, setSpinPhase] = useState<SpinPhase>('idle');
  const [currentResult, setCurrentResult] = useState<{ id: string; label: string } | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState('0ms');
  const [transitionTiming, setTransitionTiming] = useState('ease-out');
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
        setHistoryIds(parsed.historyIds || []);
        // scores not loaded - start fresh on each page load
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
        excludedIds: Array.from(excludedIds),
        lastPickedId,
        historyIds,
        // scores not persisted - memory only
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save food selector state:', error);
    }
  }, [selectedMealTime, excludedIds, lastPickedId, historyIds]);

  // Calculate available options (not excluded)
  const availableOptions = STYLE_OPTIONS.filter(opt => !excludedIds.has(opt.id));
  const excludedCount = excludedIds.size;
  const remainingCount = availableOptions.length;

  // Calculate wheel segments
  const segments = calculateSegments(availableOptions);

  // Validation: can spin if remainingCount >= 2
  const canSpin = remainingCount >= 2 && (spinPhase === 'idle' || spinPhase === 'done');

  // Check if it's the first spin (no history yet)
  const isFirstSpin = historyIds.length === 0;

  // Get history labels for display
  const historyLabels = historyIds
    .slice(0, 3)
    .map(id => {
      const option = STYLE_OPTIONS.find(opt => opt.id === id);
      return option ? option.label.split(' ')[0] : id;
    })
    .join(' → ');

  // Toggle exclusion for a style option
  const toggleExclusion = (id: string) => {
    // Allow toggling when idle or done (not during spinning)
    if (spinPhase !== 'idle' && spinPhase !== 'done') return;
    
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

  // Handle spin with two-phase bounce animation
  const handleSpin = () => {
    if (!canSpin) return;
    // Allow spinning from 'idle' or 'done' state
    if (spinPhase !== 'idle' && spinPhase !== 'done') return;

    // Clear result if starting a new spin
    if (currentResult) {
      setCurrentResult(null);
    }

    setSpinPhase('spinningMain');
    
    // Select winner using weighted selection
    const winner = selectWinnerWeighted(availableOptions, lastPickedId, scores);
    
    // Find winner index
    const winnerIndex = availableOptions.findIndex(opt => opt.id === winner.id);
    
    // Calculate target rotation to land on winner
    // The pointer is at 12 o'clock (0 degrees from top)
    // Segment 0 starts at 0 degrees and goes clockwise
    // To land on segment N, we need to rotate so segment N's center aligns with pointer
    const segmentAngle = 360 / availableOptions.length;
    const segmentCenterAngle = winnerIndex * segmentAngle + segmentAngle / 2;
    
    // Current normalized rotation (0-360)
    const currentNormalized = ((currentRotation % 360) + 360) % 360;
    
    // We need the segment center to align with the pointer at top (0 degrees)
    // Since we rotate clockwise, we need: 360 - segmentCenterAngle
    const targetAngle = 360 - segmentCenterAngle;
    
    // Calculate the difference needed from current position
    let rotationNeeded = targetAngle - currentNormalized;
    
    // Ensure we always rotate forward (clockwise) by at least 5 full rotations
    const extraRotations = 5 + Math.floor(Math.random() * 3); // 5-7 rotations
    rotationNeeded = rotationNeeded + extraRotations * 360;
    
    // If rotation is too small, add another full rotation
    if (rotationNeeded < 1800) { // Less than 5 full rotations
      rotationNeeded += 360;
    }
    
    // Calculate overshoot (6-14 degrees)
    const overshootDeg = 6 + Math.random() * 8;
    
    // Phase 1: Main spin with overshoot
    const phase1Target = currentRotation + rotationNeeded + overshootDeg;
    const phase1Duration = 2200 + Math.random() * 1000; // 2.2-3.2s
    
    // Store final target for phase 2 (phase1Target minus overshoot)
    const finalTarget = currentRotation + rotationNeeded;
    
    setTransitionDuration(`${phase1Duration}ms`);
    setTransitionTiming('cubic-bezier(0.15, 0.85, 0.25, 1)'); // Strong ease-out
    setCurrentRotation(phase1Target);
    
    // After phase 1, start phase 2 (bounce back)
    setTimeout(() => {
      setSpinPhase('bouncing');
      const phase2Duration = 250 + Math.random() * 100; // 250-350ms
      setTransitionDuration(`${phase2Duration}ms`);
      setTransitionTiming('cubic-bezier(0.34, 1.56, 0.64, 1)'); // Bounce ease
      setCurrentRotation(finalTarget);
      
      // After bounce completes, reveal result
      setTimeout(() => {
        setSpinPhase('done');
        setCurrentResult(winner);
        setLastPickedId(winner.id);
        
        // Update history
        setHistoryIds(prev => {
          const newHistory = [winner.id, ...prev.filter(id => id !== winner.id)];
          return newHistory.slice(0, 3);
        });
      }, phase2Duration);
    }, phase1Duration);
  };

  // Handle "spin again"
  const handleSpinAgain = () => {
    setCurrentResult(null);
    setSpinPhase('idle');
    // Reset transition timing for next spin
    setTransitionDuration('0ms');
    // Small delay to reset visual state
    setTimeout(() => {
      handleSpin();
    }, 100);
  };

  // Handle "accept this result"
  const handleAcceptResult = () => {
    if (!currentResult) return;
    
    // Increment score for accepted style
    setScores(prev => ({
      ...prev,
      [currentResult.id]: (prev[currentResult.id] || 0) + 1,
    }));
    
    // Show feedback (optional toast - keeping it simple for now)
    // Could add a toast notification here if desired
  };

  // Handle "ban this result"
  const handleBanResult = () => {
    if (!currentResult) return;
    
    // Decrement score for banned style
    setScores(prev => ({
      ...prev,
      [currentResult.id]: (prev[currentResult.id] || 0) - 1,
    }));
    
    const newExcludedIds = new Set(excludedIds);
    newExcludedIds.add(currentResult.id);
    setExcludedIds(newExcludedIds);
    setCurrentResult(null);
    setLastPickedId(null);
    setCurrentRotation(0);
    setTransitionDuration('0ms');
    setSpinPhase('idle');
  };

  // Reset handlers removed - no reset buttons in UI

  // Generate colors for wheel segments
  const getSegmentColor = (index: number): string => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80',
      '#EC7063', '#5DADE2', '#F1948A'
    ];
    return colors[index % colors.length];
  };

  const isSpinning = spinPhase !== 'idle' && spinPhase !== 'done';

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
              排除種類過多，請保留至少 2 種
            </p>
          )}
        </div>
      </section>

      {/* Wheel Spinner */}
      <section className="bg-bg-card rounded-3xl border border-border-color p-6 shadow-sm">
        <div className="flex flex-col items-center">
          {/* Remaining count and history */}
          <div className="w-full max-w-md mb-4 space-y-2 text-center">
            <p className="text-base font-medium text-text-primary">
              剩下：<span className="text-accent-primary font-bold">{remainingCount}</span> 種
            </p>
            {historyLabels && (
              <p className="text-sm text-text-secondary">
                最近：{historyLabels}
              </p>
            )}
          </div>

          <div className="relative w-full max-w-md aspect-square mb-6">
            {/* Pointer at top */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-accent-primary"></div>
            </div>

            {/* Wheel container */}
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-border-color shadow-lg">
              <div
                ref={wheelRef}
                className="w-full h-full"
                style={{
                  transform: `rotate(${currentRotation}deg)`,
                  transition: `transform ${transitionDuration} ${transitionTiming}`,
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
                    
                    // Calculate rotation angle for text (make it upright/readable)
                    // The text should be rotated to align with the radial direction
                    // Add 90 degrees to make it upright (since we're using sin/cos from top)
                    let textRotation = (textAngleRad * 180) / Math.PI + 90;
                    
                    // If text would be upside down (angle > 90 and < 270), flip it
                    const normalizedAngle = ((textAngleRad * 180) / Math.PI + 360) % 360;
                    if (normalizedAngle > 90 && normalizedAngle < 270) {
                      textRotation += 180;
                    }
                    
                    // Responsive font size based on number of segments
                    const segmentCount = segments.length;
                    const baseFontSize = segmentCount >= 10 ? 10 : 12;
                    const fontSize = Math.max(10, Math.min(14, baseFontSize));

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
                          transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                          style={{
                            fontSize: `${fontSize}px`,
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                            fontWeight: 700,
                            fill: '#ffffff',
                            letterSpacing: '0.02em',
                          }}
                        >
                          {segment.label.split(' ')[0]}
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
              排除種類過多，請保留至少 2 種
            </p>
          )}

          {/* Spin button - changes text after first spin */}
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
            {isFirstSpin ? '開始轉' : '再轉一次'}
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
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={handleAcceptResult}
                disabled={isSpinning}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  !isSpinning
                    ? 'bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200'
                    : 'bg-bg-tertiary text-text-secondary cursor-not-allowed opacity-50'
                }`}
              >
                就吃這個
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

    </div>
  );
};
