/**
 * @module security.test
 * @description Unit tests for security utilities.
 * Validates rate limiting, XSS sanitization, output encoding, and URL safety.
 */
import { describe, it, expect } from 'vitest';
import { createRateLimiter, sanitizeInput, sanitizeOutput, generateNonce, isSafeUrl } from '../utils/security';

describe('createRateLimiter() — API Protection', () => {
  it('allows requests within limit', () => {
    const limiter = createRateLimiter(3, 60000);
    expect(limiter.canProceed()).toBe(true);
    expect(limiter.canProceed()).toBe(true);
    expect(limiter.canProceed()).toBe(true);
  });

  it('blocks requests exceeding limit', () => {
    const limiter = createRateLimiter(2, 60000);
    expect(limiter.canProceed()).toBe(true);
    expect(limiter.canProceed()).toBe(true);
    expect(limiter.canProceed()).toBe(false);
  });

  it('reports remaining tokens correctly', () => {
    const limiter = createRateLimiter(5, 60000);
    expect(limiter.remaining()).toBe(5);
    limiter.canProceed();
    expect(limiter.remaining()).toBe(4);
  });

  it('resets correctly', () => {
    const limiter = createRateLimiter(2, 60000);
    limiter.canProceed();
    limiter.canProceed();
    expect(limiter.canProceed()).toBe(false);
    limiter.reset();
    expect(limiter.canProceed()).toBe(true);
  });
});

describe('sanitizeInput() — XSS Prevention', () => {
  it('strips script tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('Hello');
  });

  it('strips all HTML tags', () => {
    expect(sanitizeInput('<b>bold</b> text')).toBe('bold text');
    expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe('');
  });

  it('strips control characters', () => {
    expect(sanitizeInput('hello\x00world')).toBe('helloworld');
  });

  it('strips javascript: protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
  });

  it('strips event handlers', () => {
    expect(sanitizeInput('onload=alert(1)')).toBe('alert(1)');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world');
  });

  it('enforces max length (default 500)', () => {
    expect(sanitizeInput('a'.repeat(1000))).toHaveLength(500);
  });

  it('enforces custom max length', () => {
    expect(sanitizeInput('a'.repeat(100), 50)).toHaveLength(50);
  });

  it('returns empty for empty input', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });

  it('preserves normal text', () => {
    expect(sanitizeInput('Where is my seat?')).toBe('Where is my seat?');
  });

  it('handles nested HTML tags', () => {
    expect(sanitizeInput('<div><span>text</span></div>')).toBe('text');
  });
});

describe('sanitizeOutput() — Output Encoding', () => {
  it('escapes HTML entities', () => {
    expect(sanitizeOutput('<script>')).toBe('&lt;script&gt;');
  });

  it('escapes quotes', () => {
    expect(sanitizeOutput('"hello"')).toBe('&quot;hello&quot;');
    expect(sanitizeOutput("'hello'")).toBe("&#x27;hello&#x27;");
  });

  it('escapes forward slashes', () => {
    expect(sanitizeOutput('a/b')).toBe('a&#x2F;b');
  });

  it('preserves normal text', () => {
    expect(sanitizeOutput('Hello world')).toBe('Hello world');
  });
});

describe('generateNonce() — CSP Support', () => {
  it('returns a non-empty string', () => {
    const nonce = generateNonce();
    expect(nonce).toBeTruthy();
    expect(typeof nonce).toBe('string');
  });

  it('generates unique values', () => {
    const a = generateNonce();
    const b = generateNonce();
    expect(a).not.toBe(b);
  });
});

describe('isSafeUrl() — URL Validation', () => {
  it('accepts http and https URLs', () => {
    expect(isSafeUrl('https://example.com')).toBe(true);
    expect(isSafeUrl('http://example.com')).toBe(true);
  });

  it('accepts mailto URLs', () => {
    expect(isSafeUrl('mailto:user@example.com')).toBe(true);
  });

  it('rejects javascript URLs', () => {
    expect(isSafeUrl('javascript:alert(1)')).toBe(false);
  });

  it('rejects data URLs', () => {
    expect(isSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
  });

  it('handles relative paths (safe by default)', () => {
    expect(isSafeUrl('/about')).toBe(true);
  });
});
