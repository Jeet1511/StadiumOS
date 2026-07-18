import { useState, useEffect } from 'react';
import { Users, MapPin, Clock } from 'lucide-react';

export default function LiveMatchWidget() {
  const [now, setNow] = useState(new Date());
  const [matchMin, setMatchMin] = useState(68);
  const [matchSec, setMatchSec] = useState(12);

  useEffect(() => {
    const t = setInterval(() => {
      setNow(new Date());
      setMatchSec(prev => {
        if (prev >= 59) { setMatchMin(m => Math.min(m + 1, 90)); return 0; }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  return (
    <div className="absolute top-8 left-8 z-30 bg-[#151d2e]/90 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-5 shadow-lg min-w-[260px]" role="status" aria-label="Live match">
      {/* Real-time clock */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-slate-500" />
          <span className="text-[11px] font-mono text-slate-400">{timeStr}</span>
        </div>
        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Match Day</span>
      </div>

      {/* Match status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Live</span>
        </div>
        <span className="text-[14px] font-mono font-semibold text-white tracking-wider">{matchMin}:{matchSec.toString().padStart(2, '0')}</span>
      </div>

      {/* Score */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-3.5 bg-green-600 rounded-sm" />
          <span className="text-[14px] font-bold text-slate-200 tracking-widest">MEX</span>
        </div>
        <div className="text-[28px] font-bold text-white tracking-[0.15em]">1 <span className="text-slate-600">–</span> 0</div>
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-bold text-slate-200 tracking-widest">ARG</span>
          <div className="w-5 h-3.5 bg-sky-400 rounded-sm" />
        </div>
      </div>

      {/* Goal scorer */}
      <div className="text-[10px] text-slate-500 mb-3 pb-3 border-b border-white/[0.05]">
        ⚽ Lozano 42' (MEX)
      </div>

      {/* Stadium info */}
      <div className="flex items-center justify-between text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
        <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> 84,200</span>
        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Roof Open</span>
      </div>
    </div>
  );
}
