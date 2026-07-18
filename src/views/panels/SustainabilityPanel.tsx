/* View: Sustainability Panel */
import { Globe, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLiveData } from '../../controllers/useLiveData';
import GlassCard from '../shared/GlassCard';
import StatusBadge from '../shared/StatusBadge';

export default function SustainabilityPanel() {
  const { sustainability } = useLiveData();
  const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };
  const colors = [{ bar: 'bg-amber-500', t: 'text-amber-400' }, { bar: 'bg-blue-500', t: 'text-blue-400' }, { bar: 'bg-emerald-500', t: 'text-emerald-400' }, { bar: 'bg-violet-500', t: 'text-violet-400' }];

  return (
    <div className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative" style={{ background: 'rgba(4,8,15,0.9)', backdropFilter: 'blur(40px)' }}>
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.06] to-white/[0.03]" />
      <div className="p-4 flex items-center justify-between shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div><h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-emerald-400" /> Sustainability</h2><p className="text-[10px] text-white/25 mt-0.5">Environmental impact tracking</p></div>
        <StatusBadge label="Eco" color="green" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
        {sustainability.map((m, i) => {
          const c = colors[i % colors.length]; const TI = trendIcons[m.trend]; const pct = Math.round((m.value / m.max) * 100);
          return (
            <GlassCard key={m.label} padding="p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-white/60">{m.label}</span>
                <div className="flex items-center gap-1.5">
                  <TI className={cn("w-3 h-3", m.trend === 'up' ? 'text-amber-400' : m.trend === 'down' ? 'text-emerald-400' : 'text-white/25')} />
                  <span className={cn("text-[15px] font-semibold", c.t)}>{m.value}<span className="text-[9px] text-white/25 ml-0.5">{m.unit}</span></span>
                </div>
              </div>
              <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden"><div className={cn("h-full rounded-full transition-all duration-1000", c.bar)} style={{ width: `${pct}%` }} /></div>
              <div className="flex justify-between mt-1"><span className="text-[9px] text-white/15">{pct}%</span><span className="text-[9px] text-white/15">{m.max} {m.unit}</span></div>
            </GlassCard>
          );
        })}
        <GlassCard padding="p-3.5">
          <div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold mb-2">FIFA Green Score</div>
          <div className="flex items-end gap-2.5"><span className="text-[30px] font-bold text-emerald-400 leading-none">B+</span><span className="text-[10px] text-white/25 mb-1">Above Standard</span></div>
        </GlassCard>
        <GlassCard padding="p-3.5" className="border-emerald-500/10">
          <div className="flex items-start gap-2.5"><Sparkles className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" /><div><div className="text-[11px] font-semibold text-emerald-200 mb-1">AI Sustainability Insight</div><div className="text-[10px] text-emerald-300/50 leading-relaxed">Energy 8% above baseline. Dim south concourse lighting to offset. Water reclamation at 72% efficiency.</div></div></div>
        </GlassCard>
      </div>
    </div>
  );
}
