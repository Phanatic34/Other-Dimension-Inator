/**
 * Wheel spinner math utilities
 * Calculates rotation angles and segment positions for the food selector wheel
 */

export interface WheelSegment {
  id: string;
  label: string;
  startAngle: number;
  endAngle: number;
}

/**
 * Calculate segment angles for a wheel with n segments
 */
export function calculateSegments(
  items: Array<{ id: string; label: string }>
): WheelSegment[] {
  const n = items.length;
  if (n === 0) return [];
  
  const segmentAngle = 360 / n;
  return items.map((item, index) => {
    const startAngle = index * segmentAngle;
    const endAngle = (index + 1) * segmentAngle;
    return {
      id: item.id,
      label: item.label,
      startAngle,
      endAngle,
    };
  });
}

/**
 * Calculate the target rotation angle to land on a specific segment
 * @param segmentIndex - The index of the segment to land on (0-based)
 * @param totalSegments - Total number of segments
 * @param extraRotations - Number of full rotations before landing (default: 5-8 random)
 * @returns The total rotation angle in degrees
 */
export function calculateTargetRotation(
  segmentIndex: number,
  totalSegments: number,
  extraRotations?: number
): number {
  if (totalSegments === 0) return 0;
  
  const segmentAngle = 360 / totalSegments;
  // The pointer is at 12 o'clock (0 degrees)
  // We want the segment to align so its center is at the pointer
  // Segment center angle = (startAngle + endAngle) / 2
  const segmentCenterAngle = segmentIndex * segmentAngle + segmentAngle / 2;
  
  // We need to rotate so that the segment center aligns with 0 degrees (pointer)
  // Since we rotate clockwise, we need: 360 - segmentCenterAngle
  const baseRotation = 360 - segmentCenterAngle;
  
  // Add extra full rotations for visual effect
  const rotations = extraRotations ?? (5 + Math.random() * 3); // 5-8 rotations
  const extraRotation = rotations * 360;
  
  return baseRotation + extraRotation;
}

/**
 * Select a random winner from available items, avoiding the last picked if possible
 * @param availableItems - Items that can be selected
 * @param lastPickedId - ID of the last picked item (to avoid repeats)
 * @returns The selected item
 */
export function selectWinner(
  availableItems: Array<{ id: string; label: string }>,
  lastPickedId: string | null
): { id: string; label: string } {
  if (availableItems.length === 0) {
    throw new Error('No available items to select from');
  }
  
  // If we have at least 3 items and a last picked, exclude it
  let candidates = availableItems;
  if (availableItems.length >= 3 && lastPickedId) {
    candidates = availableItems.filter(item => item.id !== lastPickedId);
    // If filtering left us with nothing, use all items
    if (candidates.length === 0) {
      candidates = availableItems;
    }
  }
  
  // Random selection
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

