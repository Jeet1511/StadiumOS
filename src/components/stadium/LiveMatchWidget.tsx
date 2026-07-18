import { Users, MapPin } from 'lucide-react';

export default function LiveMatchWidget() {
  return (
    <div className="absolute top-8 left-8 z-30 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-[20px] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col gap-4 min-w-[260px]" role="status" aria-label="Live match status">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
          <span className="text-[11px] font-semibold text-white/70 uppercase tracking-widest">Live</span>
        </div>
        <span className="text-[13px] font-mono font-semibold text-white/90 tracking-wider">68:12</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-[13px] font-bold text-white/90 tracking-widest">MEX</div>
        </div>
        <div className="text-3xl font-semibold text-white tracking-widest">1 <span className="text-white/30 mx-1">–</span> 0</div>
        <div className="text-center">
          <div className="text-[13px] font-bold text-white/90 tracking-widest">ARG</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] text-white/60 border-t border-white/[0.08] pt-3 mt-1 tracking-wider uppercase font-semibold">
        <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 84,200</span>
        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Roof Open</span>
      </div>
    </div>
  );
}
