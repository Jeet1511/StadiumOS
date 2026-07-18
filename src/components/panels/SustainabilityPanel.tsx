import { Globe, Zap, Sparkles, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCrowdData } from '../../hooks/useCrowdData';

export default function SustainabilityPanel() {
  const { sustainability } = useCrowdData();

  const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus };
  const colors = [
    { bar: 'bg-amber-500', glow: 'shadow-[0_0_10px_rgba(245,158,11,0.3)]', accent: 'text-amber-400' },
    { bar: 'bg-blue-500', glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]', accent: 'text-blue-400' },
    { bar: 'bg-green-500', glow: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]', accent: 'text-green-400' },
    { bar: 'bg-purple-500', glow: 'shadow-[0_0_10px_rgba(168,85,247,0.3)]', accent: 'text-purple-400' },
  ];

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-white/[0.01] backdrop-blur-3xl border-l border-white/[0.05] flex flex-col z-40 hidden md:flex relative shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.5)]" role="complementary" aria-label="Sustainability panel">
      <div className="absolute inset-0 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="p-6 border-b border-white/[0.05] relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white/90 flex items-center gap-2">
            <Globe className="w-4 h-4 text-green-400" />
            Sustainability Monitor
          </h2>
          <p className="text-[11px] text-white/40 mt-1.5 tracking-wide">Environmental impact tracking</p>
        </div>
        <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 px-2.5 py-1.5 rounded-full">
          <Zap className="w-3 h-3 text-green-400" />
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Eco</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 relative z-10">
        {sustainability.map((metric, i) => {
          const color = colors[i % colors.length];
          const TrendIcon = trendIcons[metric.trend];
          const pct = Math.round((metric.value / metric.max) * 100);

          return (
            <div key={metric.label} className="bg-[#050505]/80 rounded-[16px] p-5 border border-white/[0.05] shadow-[inset_0_2px_15px_rgba(0,0,0,0.4)]">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[12px] font-medium text-white/80">{metric.label}</div>
                <div className="flex items-center gap-1.5">
                  <TrendIcon className={cn("w-3 h-3", metric.trend === 'up' ? 'text-amber-400' : metric.trend === 'down' ? 'text-green-400' : 'text-white/40')} />
                  <span className={cn("text-[18px] font-light", color.accent)}>
                    {metric.value}<span className="text-[11px] text-white/40 ml-1">{metric.unit}</span>
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out", color.bar, color.glow)}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-white/30">{pct}% of capacity</span>
                <span className="text-[10px] text-white/30">{metric.max} {metric.unit} max</span>
              </div>
            </div>
          );
        })}

        {/* Summary card */}
        <div className="bg-[#050505]/80 rounded-[16px] p-5 border border-white/[0.05] shadow-[inset_0_2px_15px_rgba(0,0,0,0.4)]">
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-3">Event Sustainability Score</div>
          <div className="flex items-end gap-3">
            <span className="text-[36px] font-light text-green-400 leading-none">B+</span>
            <span className="text-[11px] text-white/40 mb-1.5">Above FIFA Green Standard</span>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-[16px] p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-medium text-green-100 mb-1">AI Sustainability Insight</div>
            <div className="text-[11px] text-green-300/70 leading-relaxed">Energy usage is trending 8% above baseline due to extended floodlight operation. Recommend dimming concourse lighting in low-density South sectors to offset.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
