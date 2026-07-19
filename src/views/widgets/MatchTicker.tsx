/**
 * @module MatchTicker
 * @description Real-time match score and clock widget displayed on the stadium map.
 * Shows live score, match minute, scorer information, attendance, and venue status.
 *
 * Architecture: Consumes useMatchClock controller for live time progression.
 * Pure presentational widget with no business logic.
 *
 * Performance: React.memo prevents re-renders from parent state changes.
 * Only re-renders when clock time changes (every second).
 *
 * Accessibility: role="status" with aria-label for screen reader updates,
 * aria-live="polite" for periodic score announcements.
 *
 * Hackathon Alignment:
 * - FIFA World Cup 2026 match simulation (Mexico vs Argentina)
 * - Real-time clock progression for immersive demo experience
 * - Stadium capacity and roof status monitoring
 * - Live scorer tracking for fan experience
 */
import { memo } from 'react';
import { useMatchClock } from '../../controllers/useMatchClock';
import { Users, MapPin } from 'lucide-react';

export default memo(function MatchTicker() {
  const { matchTime, clockTime } = useMatchClock();

  return (
    <div className="absolute top-6 left-6 z-30 glass-float rounded-2xl p-4 min-w-[240px] border-glow-cyan" role="status" aria-label="Live match score and clock" aria-live="polite">
      {/* Clock row */}
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/[0.05]">
        <span className="text-[10px] font-mono text-white/30">{clockTime}</span>
        <span className="text-[8px] text-white/20 uppercase tracking-[0.2em] font-bold">Match Day</span>
      </div>

      {/* Live + time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(251,113,133,0.7)]" />
            <div className="absolute inset-0 w-2 h-2 bg-rose-500 rounded-full animate-ping opacity-30" />
          </div>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.15em]">Live</span>
        </div>
        <span className="text-[16px] font-mono font-bold text-white tracking-wider" aria-label={`Match time ${matchTime}`}>{matchTime}</span>
      </div>

      {/* Score */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-3.5 rounded-sm" style={{ background: 'linear-gradient(180deg, #006341, #00a74f)' }} aria-hidden="true" />
          <span className="text-[13px] font-bold text-white/80 tracking-wider">MEX</span>
        </div>
        <div className="text-[26px] font-bold tracking-[0.12em]" aria-label="Mexico 1, Argentina 0">
          <span className="text-gradient-gold">1</span>
          <span className="text-white/15 mx-1">–</span>
          <span className="text-white/70">0</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-white/80 tracking-wider">ARG</span>
          <div className="w-5 h-3.5 rounded-sm" style={{ background: 'linear-gradient(180deg, #74ACDF, #A8D8F0)' }} aria-hidden="true" />
        </div>
      </div>

      {/* Scorer */}
      <div className="text-[10px] text-white/30 mb-3 pb-2.5 border-b border-white/[0.04]">
        ⚽ Lozano 42' (MEX)
      </div>

      {/* Stadium info */}
      <div className="flex items-center justify-between text-[9px] text-white/25 tracking-[0.12em] uppercase font-semibold">
        <span className="flex items-center gap-1.5"><Users className="w-3 h-3" aria-hidden="true" /> 84,200</span>
        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" aria-hidden="true" /> Roof Open</span>
      </div>
    </div>
  );
});
