import { Globe, Zap, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCrowdData } from '../../hooks/useCrowdData';

export default function SustainabilityPanel() {
  const { sustainability } = useCrowdData();
  const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };
  const colors = [
    { bar: 'bg-amber-500', accent: 'text-amber-400' }, { bar: 'bg-blue-500', accent: 'text-blue-400' },
    { bar: 'bg-green-500', accent: 'text-green-400' }, { bar: 'bg-purple-500', accent: 'text-purple-400' },
  ];

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-[#151d2e]/95 backdrop-blur-2xl border-l border-white/[0.06] flex flex-col z-40 hidden md:flex">
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-slate-200 flex items-center gap-2"><Globe className="w-4 h-4 text-green-400" /> Sustainability</h2>
          <p className="text-[11px] text-slate-500 mt-1">Environmental impact tracking</p>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/12 border border-green-500/20 px-2.5 py-1.5 rounded-full">
          <Zap className="w-3 h-3 text-green-400" />
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Eco</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {sustainability.map((m, i) => {
          const c = colors[i % colors.length]; const TI = trendIcons[m.trend]; const pct = Math.round((m.value / m.max) * 100);
          return (
            <div key={m.label} className="bg-[#1a2438] rounded-xl p-4 border border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-medium text-slate-200">{m.label}</span>
                <div className="flex items-center gap-1.5">
                  <TI className={cn("w-3 h-3", m.trend === 'up' ? 'text-amber-400' : m.trend === 'down' ? 'text-green-400' : 'text-slate-500')} />
                  <span className={cn("text-[16px] font-semibold", c.accent)}>{m.value}<span className="text-[10px] text-slate-500 ml-1">{m.unit}</span></span>
                </div>
              </div>
              <div className="relative h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-1000", c.bar)} style={{ width: `${pct}%` }} />
              </div>
              <div className="flex justify-between mt-1"><span className="text-[10px] text-slate-600">{pct}%</span><span className="text-[10px] text-slate-600">{m.max} {m.unit}</span></div>
            </div>
          );
        })}
        <div className="bg-[#1a2438] rounded-xl p-4 border border-white/[0.06]">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-2">FIFA Green Score</div>
          <div className="flex items-end gap-3"><span className="text-[32px] font-semibold text-green-400 leading-none">B+</span><span className="text-[11px] text-slate-500 mb-1">Above Standard</span></div>
        </div>
        <div className="bg-green-500/8 border border-green-500/15 rounded-2xl p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-semibold text-green-200 mb-1">AI Sustainability Insight</div>
            <div className="text-[11px] text-green-300/70 leading-relaxed">Energy 8% above baseline. Dim south concourse lighting to offset. Water reclamation at 72% efficiency.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
