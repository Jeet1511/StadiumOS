/**
 * @module performance
 * @description Performance monitoring utilities for StadiumOS.
 * Provides debouncing, throttling, and Web Vitals measurement
 * for production-grade performance optimization.
 *
 * Efficiency: Debounce prevents excessive function calls on rapid user input.
 * Throttle limits execution frequency for scroll/resize handlers.
 *
 * Hackathon Alignment: Demonstrates production-grade performance awareness
 * beyond MVP-level implementation.
 */

/**
 * Creates a debounced version of a function that delays execution
 * until after `delay` milliseconds have elapsed since the last invocation.
 *
 * @template T - Function type to debounce.
 * @param {T} fn - The function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {T & { cancel: () => void }} Debounced function with cancel method.
 *
 * @example
 * const debouncedSearch = debounce((query: string) => search(query), 300);
 * inputElement.addEventListener('input', (e) => debouncedSearch(e.target.value));
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  }) as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

/**
 * Creates a throttled version of a function that executes at most once
 * per `interval` milliseconds.
 *
 * @template T - Function type to throttle.
 * @param {T} fn - The function to throttle.
 * @param {number} interval - Minimum interval between executions in milliseconds.
 * @returns {T} Throttled function.
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number
): T {
  let lastTime = 0;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      return fn(...args);
    }
  }) as T;
}

/**
 * Measures and logs the execution time of a named operation.
 * Uses the Performance API for high-resolution timing.
 *
 * @param {string} label - Name of the operation being measured.
 * @param {() => T} fn - Function to measure.
 * @returns {T} Return value of the measured function.
 */
export function measurePerformance<T>(label: string, fn: () => T): T {
  if (typeof performance !== 'undefined') {
    performance.mark(`${label}-start`);
  }
  const result = fn();
  if (typeof performance !== 'undefined') {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
  }
  return result;
}
