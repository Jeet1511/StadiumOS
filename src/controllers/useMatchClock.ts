/**
 * @module useMatchClock
 * @description Controller for the live match clock and real-world time display.
 * Simulates match progression from a configurable starting minute/second,
 * capping at 90 minutes (regulation time).
 *
 * Architecture: Controller layer hook consumed by the MatchTicker view widget.
 *
 * Hackathon Alignment:
 * - Real-time match state awareness for all stadium stakeholders
 * - Time-synchronized operational decisions (e.g., halftime preparations)
 * - Fan experience: live match time display with formatted output
 */
import { useState, useEffect, useMemo } from 'react';
import type { MatchClockReturn } from '../models/types';

/** Maximum regulation match time in minutes */
const MAX_MATCH_MINUTES = 90;

/**
 * Match clock hook for real-time game time tracking.
 *
 * @param {number} [startMin=68] - Starting match minute for the demo.
 * @param {number} [startSec=12] - Starting match second.
 * @returns {MatchClockReturn} Current match time, formatted strings, and Date object.
 *
 * @example
 * function MatchTicker() {
 *   const { matchTime, clockTime } = useMatchClock(68, 12);
 *   return <div>{matchTime} — {clockTime}</div>;
 * }
 */
export function useMatchClock(startMin: number = 68, startSec: number = 12): MatchClockReturn {
  const [clock, setClock] = useState(() => ({ min: startMin, sec: startSec, now: new Date() }));

  useEffect(() => {
    const t = setInterval(() => {
      setClock(prev => {
        if (prev.sec >= 59) {
          return {
            min: Math.min(prev.min + 1, MAX_MATCH_MINUTES),
            sec: 0,
            now: new Date(),
          };
        }

        return {
          min: prev.min,
          sec: prev.sec + 1,
          now: new Date(),
        };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const { min, sec, now } = clock;

  /** Formatted match time string (e.g., "68:12") */
  const matchTime = useMemo(
    () => `${min}:${sec.toString().padStart(2, '0')}`,
    [min, sec]
  );

  /** Formatted real-world clock time (e.g., "7:30 PM") */
  const clockTime = useMemo(
    () => now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    [now]
  );

  return { min, sec, matchTime, clockTime, now };
}
