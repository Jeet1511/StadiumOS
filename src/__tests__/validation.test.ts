/**
 * @module validation.test
 * @description Unit tests for ticket validation and input parsing utilities.
 * Validates FIFA World Cup 2026 ticket format parsing and edge cases.
 */
import { describe, it, expect } from 'vitest';
import { parseTicketId, isValidTicketFormat, isValidSection, isValidRow } from '../utils/validation';

describe('parseTicketId() — Smart Ticketing', () => {
  it('parses valid ticket ID correctly', () => {
    const result = parseTicketId('WC26-MX-084200-F24');
    expect(result).not.toBeNull();
    expect(result!.section).toBe(112);
    expect(result!.row).toBe('F');
    expect(result!.seat).toBe(24);
  });

  it('handles lowercase input', () => {
    const result = parseTicketId('wc26-mx-084200-f24');
    expect(result).not.toBeNull();
    expect(result!.row).toBe('F');
  });

  it('trims whitespace', () => {
    const result = parseTicketId('  WC26-MX-084200-F24  ');
    expect(result).not.toBeNull();
  });

  it('returns null for invalid format', () => {
    expect(parseTicketId('invalid')).toBeNull();
    expect(parseTicketId('')).toBeNull();
    expect(parseTicketId('WC26')).toBeNull();
    expect(parseTicketId('WC26-MX-123-F24')).toBeNull();
  });

  it('returns null for partial ticket IDs', () => {
    expect(parseTicketId('WC26-MX-084200')).toBeNull();
    expect(parseTicketId('WC26-MX-084200-')).toBeNull();
  });

  it('section number is within valid range (100-199)', () => {
    const result = parseTicketId('WC26-MX-084200-F24');
    expect(result!.section).toBeGreaterThanOrEqual(100);
    expect(result!.section).toBeLessThanOrEqual(199);
  });
});

describe('isValidTicketFormat()', () => {
  it('accepts valid ticket format', () => {
    expect(isValidTicketFormat('WC26-MX-084200-F24')).toBe(true);
    expect(isValidTicketFormat('WC26-US-123456-A1')).toBe(true);
    expect(isValidTicketFormat('WC26-BR-000001-Z99')).toBe(true);
  });

  it('rejects invalid formats', () => {
    expect(isValidTicketFormat('')).toBe(false);
    expect(isValidTicketFormat('invalid')).toBe(false);
    expect(isValidTicketFormat('WC26-MX-12345-F24')).toBe(false);
    expect(isValidTicketFormat('WC25-MX-123456-F24')).toBe(false);
  });
});

describe('isValidSection()', () => {
  it('accepts valid sections (100-212)', () => {
    expect(isValidSection(100)).toBe(true);
    expect(isValidSection(112)).toBe(true);
    expect(isValidSection(212)).toBe(true);
  });

  it('rejects invalid sections', () => {
    expect(isValidSection(99)).toBe(false);
    expect(isValidSection(213)).toBe(false);
    expect(isValidSection(0)).toBe(false);
    expect(isValidSection(-1)).toBe(false);
    expect(isValidSection(1.5)).toBe(false);
  });
});

describe('isValidRow()', () => {
  it('accepts valid rows (A-Z)', () => {
    expect(isValidRow('A')).toBe(true);
    expect(isValidRow('F')).toBe(true);
    expect(isValidRow('Z')).toBe(true);
  });

  it('rejects invalid rows', () => {
    expect(isValidRow('a')).toBe(false);
    expect(isValidRow('AB')).toBe(false);
    expect(isValidRow('')).toBe(false);
    expect(isValidRow('1')).toBe(false);
  });
});
