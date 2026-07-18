/**
 * @module cn
 * @description Utility for merging Tailwind CSS classes with conflict resolution.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "px-6")
 * // Returns "py-2 px-6 bg-blue-500" (px-6 overrides px-4)
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges class names with Tailwind CSS conflict resolution.
 * @param {...ClassValue[]} inputs - Class names, conditionals, or arrays to merge.
 * @returns {string} Deduplicated, conflict-resolved class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
