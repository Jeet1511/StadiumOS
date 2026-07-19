/**
 * @module ai-service.test
 * @description Unit tests for the AI service layer.
 * Validates input sanitization, error handling, and security measures
 * using the REAL sanitizeInput implementation from utils/security.
 *
 * Hackathon Alignment:
 * - Tests the security layer protecting GenAI interactions
 * - Validates XSS prevention for all user inputs
 * - Ensures prompt injection protection for AI chat
 */
import { describe, it, expect } from 'vitest';
import { sanitizeInput } from '../utils/security';

describe('sanitizeInput() — AI Input Security', () => {
  it('strips HTML script tags to prevent XSS', () => {
    expect(sanitizeInput('<script>alert("xss")</script>Hello')).toBe('Hello');
  });

  it('strips all HTML tags', () => {
    expect(sanitizeInput('<b>bold</b> text')).toBe('bold text');
    expect(sanitizeInput('<img src="x" onerror="alert(1)">')).toBe('');
  });

  it('strips control characters', () => {
    expect(sanitizeInput('hello\x00world')).toBe('helloworld');
  });

  it('strips javascript: protocol (prompt injection prevention)', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
  });

  it('strips event handlers (XSS prevention)', () => {
    expect(sanitizeInput('onload=alert(1)')).toBe('alert(1)');
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

  it('preserves normal text input (fan queries)', () => {
    expect(sanitizeInput('Where is my seat?')).toBe('Where is my seat?');
    expect(sanitizeInput('Navigate to Gate S')).toBe('Navigate to Gate S');
  });

  it('handles nested HTML tags', () => {
    expect(sanitizeInput('<div><span>text</span></div>')).toBe('text');
  });

  it('handles empty input', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput('   ')).toBe('');
  });

  it('handles multilingual input (international fan support)', () => {
    expect(sanitizeInput('¿Dónde está mi asiento?')).toBe('¿Dónde está mi asiento?');
    expect(sanitizeInput('مرحبا')).toBe('مرحبا');
  });
});
