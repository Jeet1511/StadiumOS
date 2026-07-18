/* View: Match Ticker — Live score widget */
import { useMatchClock } from '../../controllers/useMatchClock';
import { Users, MapPin } from 'lucide-react';

export default function MatchTicker() {
  const { matchTime, clockTime } = useMatchClock();

  return (
    <div className="absolute top-6 left-6 z-30 glass-float rounded-2xl p-4 min-w-[240px] border-glow-cyan" role="status" aria-label="Live match">
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
        <span className="text-[16px] font-mono font-bold text-white tracking-wider">{matchTime}</span>
      </div>

      {/* Score */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-3.5 rounded-sm" style={{ background: 'linear-gradient(180deg, #006341, #00a74f)' }} />
          <span className="text-[13px] font-bold text-white/80 tracking-wider">MEX</span>
        </div>
        <div className="text-[26px] font-bold tracking-[0.12em]">
          <span className="text-gradient-gold">1</span>
          <span className="text-white/15 mx-1">–</span>
          <span className="text-white/70">0</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold text-white/80 tracking-wider">ARG</span>
          <div className="w-5 h-3.5 rounded-sm" style={{ background: 'linear-gradient(180deg, #74ACDF, #A8D8F0)' }} />
        </div>
      </div>

      {/* Scorer */}
      <div className="text-[10px] text-white/30 mb-3 pb-2.5 border-b border-white/[0.04]">
        ⚽ Lozano 42' (MEX)
      </div>

      {/* Stadium info */}
      <div className="flex items-center justify-between text-[9px] text-white/25 tracking-[0.12em] uppercase font-semibold">
        <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> 84,200</span>
        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Roof Open</span>
      </div>
    </div>
  );
}
