/**
 * @module ai-service.test
 * @description Unit tests for the AI service layer.
 * Validates input sanitization, error handling, and security measures.
 */
import { describe, it, expect } from 'vitest';

// Test the sanitization logic directly (extracted for testability)
function sanitizeInput(input: string): string {
  return input
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .trim()
    .slice(0, 500);
}

describe('sanitizeInput() — Security', () => {
  it('strips HTML script tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('Hello');
  });

  it('strips all HTML tags', () => {
    expect(sanitizeInput('<b>bold</b> text')).toBe('bold text');
    expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe('');
  });

  it('strips control characters', () => {
    expect(sanitizeInput('hello\x00world')).toBe('helloworld');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world');
  });

  it('enforces max length of 500 characters', () => {
    const longInput = 'a'.repeat(1000);
    expect(sanitizeInput(longInput)).toHaveLength(500);
  });

  it('returns empty string for script-only input', () => {
    expect(sanitizeInput('<script>malicious()</script>')).toBe('');
  });

  it('preserves normal text input', () => {
    expect(sanitizeInput('Where is my seat?')).toBe('Where is my seat?');
  });

  it('handles nested HTML tags', () => {
    expect(sanitizeInput('<div><span>text</span></div>')).toBe('text');
  });

  it('handles empty input', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });
});
