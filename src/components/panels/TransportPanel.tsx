import { Train, Bus, Car, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCrowdData } from '../../hooks/useCrowdData';

export default function TransportPanel() {
  const { transport } = useCrowdData();
  const typeIcons: Record<string, React.ElementType> = { metro: Train, bus: Bus, taxi: Car, parking: Car };
  const statusColors: Record<string, string> = {
    operational: 'text-green-400 bg-green-500/15 border-green-500/25',
    delayed: 'text-amber-400 bg-amber-500/15 border-amber-500/25',
    full: 'text-red-400 bg-red-500/15 border-red-500/25',
  };

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-black/30 backdrop-blur-2xl border-l border-white/[0.08] flex flex-col z-40 hidden md:flex relative" role="complementary" aria-label="Transit hub panel">
      <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white flex items-center gap-2">
            <Train className="w-4 h-4 text-blue-400" /> Transit Hub
          </h2>
          <p className="text-[11px] text-white/50 mt-1 tracking-wide">Live capacity · Auto-refresh 3s</p>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-500/15 border border-blue-500/25 px-2.5 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 relative z-10">
        {transport.map((t) => {
          const Icon = typeIcons[t.type] || Train;
          return (
            <div key={t.id} className="bg-black/40 rounded-[14px] p-4 border border-white/[0.08] hover:border-white/[0.15] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/[0.06] rounded-lg"><Icon className="w-4 h-4 text-blue-400" /></div>
                  <div>
                    <div className="text-[13px] font-medium text-white">{t.label}</div>
                    <div className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">
                      {t.eta !== '—' ? `ETA: ${t.eta}` : 'Capacity'}
                    </div>
                  </div>
                </div>
                <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border", statusColors[t.status])}>
                  {t.status}
                </span>
              </div>
              <div className="relative h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-1000",
                  t.capacity > 85 ? "bg-red-500" : t.capacity > 60 ? "bg-amber-500" : "bg-blue-500"
                )} style={{ width: `${Math.min(100, t.capacity)}%` }} />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-white/40 font-medium">{Math.round(t.capacity)}% full</span>
                <span className="text-[10px] text-white/40 font-medium">{100 - Math.round(t.capacity)}% available</span>
              </div>
            </div>
          );
        })}

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-[14px] p-4 flex items-start gap-3 mt-1">
          <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-semibold text-blue-200 mb-1">AI Exit Strategy</div>
            <div className="text-[11px] text-blue-300/80 leading-relaxed">Metro Line 3 is optimal — depart via Gate W (4 min walk, 62% capacity). Avoid Parking B (95% full).</div>
          </div>
        </div>
      </div>
    </div>
  );
}
