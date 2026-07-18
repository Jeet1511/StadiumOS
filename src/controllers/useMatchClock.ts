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
  const [min, setMin] = useState(startMin);
  const [sec, setSec] = useState(startSec);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date());
      setSec(prev => {
        if (prev >= 59) { setMin(m => Math.min(m + 1, MAX_MATCH_MINUTES)); return 0; }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

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
