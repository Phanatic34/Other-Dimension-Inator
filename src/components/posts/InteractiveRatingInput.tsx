import React, { useState, useRef } from 'react';

interface InteractiveRatingInputProps {
  rating: number; // 0-5
  onChange: (rating: number) => void;
}

/**
 * Interactive star rating input with fractional support (0.0 - 5.0)
 * User can click/drag across stars or input exact value
 */
export const InteractiveRatingInput: React.FC<InteractiveRatingInputProps> = ({
  rating,
  onChange,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate rating based on mouse position
  const calculateRating = (clientX: number): number => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const calculatedRating = percentage * 5;

    // Round to nearest 0.5
    return Math.round(calculatedRating * 2) / 2;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const newRating = calculateRating(e.clientX);
    setHoverRating(newRating);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverRating(0);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    const newRating = calculateRating(e.clientX);
    onChange(newRating);
  };

  const displayRating = isHovering ? hoverRating : rating;

  // Render stars with partial fill
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const fillPercentage = Math.max(
        0,
        Math.min(1, displayRating - i)
      ) * 100;

      stars.push(
        <div key={i} className="relative w-8 h-8">
          {/* Background star (empty) */}
          <svg
            className="absolute inset-0 w-8 h-8 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          {/* Filled star (partial or full) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fillPercentage}%` }}
          >
            <svg
              className="w-8 h-8 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-4">
      {/* Star container */}
      <div
        ref={containerRef}
        className="flex items-center gap-1 cursor-pointer select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {renderStars()}
      </div>

      {/* Numeric display and input */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={rating === 0 ? '' : rating.toFixed(1)}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            if (!isNaN(value) && value >= 0 && value <= 5) {
              onChange(value);
            } else if (e.target.value === '') {
              onChange(0);
            }
          }}
          className="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-transparent"
          placeholder="0.0"
        />
        <span className="text-sm text-text-secondary">/ 5.0</span>
      </div>
    </div>
  );
};

