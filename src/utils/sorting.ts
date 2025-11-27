/**
 * Sorts an array of options alphabetically by a label field,
 * but always places items ending with "Others" at the end.
 * 
 * @param options - Array of items to sort
 * @param getLabel - Function to extract the label string from each item
 * @returns Sorted array with "Others" items at the end
 */
export function sortWithOthersLast<T>(
  options: T[],
  getLabel: (opt: T) => string
): T[] {
  return [...options].sort((a, b) => {
    const aLabel = getLabel(a);
    const bLabel = getLabel(b);

    const aIsOthers = /Others$/i.test(aLabel);
    const bIsOthers = /Others$/i.test(bLabel);

    // If one is "Others" and the other isn't, "Others" goes last
    if (aIsOthers && !bIsOthers) return 1;
    if (!aIsOthers && bIsOthers) return -1;

    // Otherwise, sort alphabetically
    return aLabel.localeCompare(bLabel);
  });
}

