/**
 * @module validation
 * @description Centralized input validation utilities for StadiumOS.
 * Extracts validation logic from UI components for reusability and testability.
 *
 * Hackathon Alignment:
 * - Smart ticketing validation for fan experience
 * - Secure input handling across all stadium operations
 */

/** Parsed ticket data structure */
export interface ParsedTicket {
  /** Stadium section number (100-199) */
  section: number;
  /** Row letter (A-Z) */
  row: string;
  /** Seat number */
  seat: number;
}

/**
 * FIFA World Cup 2026 ticket ID format regex.
 * Format: WC26-XX-NNNNNN-LNN (e.g., WC26-MX-084200-F24)
 * - WC26: World Cup 2026 prefix
 * - XX: Two-letter country code
 * - NNNNNN: Six-digit ticket number
 * - L: Row letter (A-Z)
 * - NN: Seat number (1-99)
 */
const TICKET_REGEX = /^WC26-[A-Z]{2}-(\d{6})-([A-Z])(\d+)$/;

/**
 * Parses a FIFA World Cup 2026 ticket ID into its components.
 *
 * @param {string} ticketId - Raw ticket ID string from user input.
 * @returns {ParsedTicket | null} Parsed ticket data, or null if format is invalid.
 *
 * @example
 * parseTicketId('WC26-MX-084200-F24')
 * // returns { section: 112, row: 'F', seat: 24 }
 *
 * parseTicketId('invalid')
 * // returns null
 */
export function parseTicketId(ticketId: string): ParsedTicket | null {
  const match = ticketId.trim().toUpperCase().match(TICKET_REGEX);
  if (!match) return null;

  const sectionSeed = match[1]!
    .slice(0, 3)
    .split('')
    .reduce((sum, digit) => sum + Number(digit), 0);

  return {
    section: 100 + sectionSeed,
    row: match[2]!,
    seat: parseInt(match[3]!, 10),
  };
}

/**
 * Validates that a ticket ID matches the expected format.
 *
 * @param {string} ticketId - Ticket ID to validate.
 * @returns {boolean} True if the format is valid.
 */
export function isValidTicketFormat(ticketId: string): boolean {
  return TICKET_REGEX.test(ticketId.trim().toUpperCase());
}

/**
 * Validates a stadium section number is within valid range.
 *
 * @param {number} section - Section number to validate.
 * @returns {boolean} True if section is between 100-212 (inclusive).
 */
export function isValidSection(section: number): boolean {
  return Number.isInteger(section) && section >= 100 && section <= 212;
}

/**
 * Validates a seat row letter.
 *
 * @param {string} row - Row letter to validate.
 * @returns {boolean} True if row is a single uppercase letter A-Z.
 */
export function isValidRow(row: string): boolean {
  return /^[A-Z]$/.test(row);
}
