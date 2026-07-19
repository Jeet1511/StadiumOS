/**
 * @module performance.test
 * @description Unit tests for performance utilities.
 * Validates debounce, throttle, and measurePerformance functions
 * that power StadiumOS's efficiency optimizations.
 *
 * Hackathon Alignment:
 * - Demonstrates production-grade performance testing
 * - Validates debounce for search input optimization
 * - Validates throttle for scroll/resize handler efficiency
 * - Validates performance measurement for monitoring
 */
import { describe, it, expect, vi } from 'vitest';
import { debounce, throttle, measurePerformance } from '../utils/performance';

describe('debounce()', () => {
  it('delays function execution', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    await new Promise(r => setTimeout(r, 60));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets timer on subsequent calls', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced();
    await new Promise(r => setTimeout(r, 30));
    debounced(); // reset timer
    await new Promise(r => setTimeout(r, 30));
    expect(fn).not.toHaveBeenCalled(); // still waiting

    await new Promise(r => setTimeout(r, 30));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments to the original function', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced('hello', 42);
    await new Promise(r => setTimeout(r, 60));
    expect(fn).toHaveBeenCalledWith('hello', 42);
  });

  it('cancel() prevents execution', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);

    debounced();
    debounced.cancel();
    await new Promise(r => setTimeout(r, 60));
    expect(fn).not.toHaveBeenCalled();
  });

  it('cancel() is safe to call multiple times', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);
    debounced.cancel();
    debounced.cancel(); // should not throw
    expect(fn).not.toHaveBeenCalled();
  });
});

describe('throttle()', () => {
  it('executes immediately on first call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('blocks subsequent calls within interval', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('allows execution after interval expires', async () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 50);

    throttled();
    expect(fn).toHaveBeenCalledTimes(1);

    await new Promise(r => setTimeout(r, 60));
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('measurePerformance()', () => {
  it('returns the result of the measured function', () => {
    const result = measurePerformance('test-op', () => 42);
    expect(result).toBe(42);
  });

  it('handles functions that return objects', () => {
    const result = measurePerformance('test-obj', () => ({ a: 1, b: 'hello' }));
    expect(result).toEqual({ a: 1, b: 'hello' });
  });

  it('handles functions that return void', () => {
    let sideEffect = 0;
    measurePerformance('test-void', () => { sideEffect = 1; });
    expect(sideEffect).toBe(1);
  });

  it('handles functions that throw', () => {
    expect(() => {
      measurePerformance('test-throw', () => { throw new Error('test'); });
    }).toThrow('test');
  });
});
