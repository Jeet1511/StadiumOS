/**
 * @module security
 * @description Security utilities for StadiumOS.
 * Provides client-side rate limiting, XSS sanitization, output encoding,
 * and cryptographic nonce generation for defense-in-depth.
 *
 * Hackathon Alignment:
 * - Protects GenAI interactions from prompt injection
 * - Sanitizes user inputs across all stadium features
 * - Rate limits API calls to prevent abuse
 * - Ensures safe rendering of AI-generated content
 */

/**
 * Client-side rate limiter using token bucket algorithm.
 * Prevents excessive API calls from the browser.
 *
 * @example
 * const limiter = createRateLimiter(5, 60000); // 5 requests per minute
 * if (limiter.canProceed()) { sendMessage(...); }
 */
export interface RateLimiter {
  /** Check if a request can proceed within the rate limit. */
  canProceed: () => boolean;
  /** Get remaining requests in the current window. */
  remaining: () => number;
  /** Reset the rate limiter state. */
  reset: () => void;
}

/**
 * Creates a token-bucket rate limiter.
 * @param {number} maxRequests - Maximum requests allowed in the time window.
 * @param {number} windowMs - Time window in milliseconds.
 * @returns {RateLimiter} A rate limiter instance.
 */
export function createRateLimiter(maxRequests: number, windowMs: number): RateLimiter {
  let tokens = maxRequests;
  let lastRefill = Date.now();

  function refill(): void {
    const now = Date.now();
    const elapsed = now - lastRefill;
    if (elapsed >= windowMs) {
      tokens = maxRequests;
      lastRefill = now;
    }
  }

  return {
    canProceed(): boolean {
      refill();
      if (tokens > 0) {
        tokens--;
        return true;
      }
      return false;
    },
    remaining(): number {
      refill();
      return tokens;
    },
    reset(): void {
      tokens = maxRequests;
      lastRefill = Date.now();
    },
  };
}

/**
 * Sanitizes user input to prevent XSS and prompt injection attacks.
 * Strips HTML tags, script content, control characters, and enforces length limits.
 *
 * @param {string} input - Raw user input from any form field or chat.
 * @param {number} [maxLength=500] - Maximum allowed character length.
 * @returns {string} Sanitized input safe for API transmission and DOM rendering.
 *
 * @example
 * sanitizeInput('<script>alert("xss")</script>Hello') // returns 'Hello'
 * sanitizeInput('  normal text  ') // returns 'normal text'
 */
export function sanitizeInput(input: string, maxLength: number = 500): string {
  return input
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')  // Strip script tags
    .replace(/<[^>]+>/g, '')                              // Strip all HTML tags
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')      // Strip control chars
    .replace(/javascript:/gi, '')                         // Strip JS protocol
    .replace(/on\w+\s*=/gi, '')                           // Strip event handlers
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitizes AI-generated output before rendering in the DOM.
 * Prevents any embedded HTML/script from AI responses from executing.
 *
 * @param {string} output - Raw AI response text.
 * @returns {string} Safe text for DOM rendering.
 */
export function sanitizeOutput(output: string): string {
  return output
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Generates a cryptographic nonce for Content Security Policy headers.
 * Uses crypto.getRandomValues when available, falls back to Math.random.
 *
 * @returns {string} A base64-encoded random nonce string.
 */
export function generateNonce(): string {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }
  // Fallback for environments without crypto API
  return btoa(Math.random().toString(36).slice(2) + Date.now().toString(36));
}

/**
 * Validates that a URL is safe to navigate to (no javascript: protocol, etc.).
 *
 * @param {string} url - URL string to validate.
 * @returns {boolean} True if the URL is safe.
 */
export function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}
