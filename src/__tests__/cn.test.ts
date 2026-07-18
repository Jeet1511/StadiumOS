/**
 * @module cn.test
 * @description Unit tests for the Tailwind CSS class merging utility.
 * Tests conflict resolution, conditional classes, and edge cases.
 */
import { describe, it, expect } from 'vitest';
import { cn } from '../utils/cn';

describe('cn() — Class Merging Utility', () => {
  it('merges multiple class strings', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('resolves Tailwind conflicts (last wins)', () => {
    const result = cn('px-4', 'px-6');
    expect(result).toBe('px-6');
  });

  it('handles conditional classes with boolean', () => {
    expect(cn('base', true && 'active')).toBe('base active');
    expect(cn('base', false && 'active')).toBe('base');
  });

  it('handles undefined and null gracefully', () => {
    expect(cn('text-white', undefined, null, 'bg-blue-500')).toBe('text-white bg-blue-500');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('resolves complex Tailwind conflicts', () => {
    const result = cn('text-white/30', 'text-white/60');
    expect(result).toBe('text-white/60');
  });

  it('merges arrays of classes', () => {
    expect(cn(['px-4', 'py-2'], 'bg-blue-500')).toBe('px-4 py-2 bg-blue-500');
  });
});
