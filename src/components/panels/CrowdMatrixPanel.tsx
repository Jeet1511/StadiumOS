import { Users, Sparkles, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useCrowdData } from '../../hooks/useCrowdData';

export default function CrowdMatrixPanel() {
  const { crowdZones, totalAttendance, avgDensity, criticalZones } = useCrowdData();

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-black/30 backdrop-blur-2xl border-l border-white/[0.08] flex flex-col z-40 hidden md:flex relative" role="complementary" aria-label="Crowd matrix panel">
      <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-rose-400" /> Crowd Matrix
          </h2>
          <p className="text-[11px] text-white/50 mt-1 tracking-wide">
            {totalAttendance.toLocaleString()} total · {avgDensity}% avg
          </p>
        </div>
        {criticalZones.length > 0 && (
          <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 px-2.5 py-1.5 rounded-full">
            <AlertTriangle className="w-3 h-3 text-red-400 animate-pulse" />
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{criticalZones.length} Alert</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2.5 relative z-10">
        {crowdZones.map((zone) => {
          const isCritical = zone.density > 85;
          const isHigh = zone.density > 65;
          return (
            <div key={zone.id} className={cn(
              "bg-black/40 rounded-[14px] p-4 border transition-colors",
              isCritical ? "border-red-500/30" : "border-white/[0.08]"
            )}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {isCritical && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                  <span className="text-[13px] font-medium text-white">{zone.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded",
                    zone.trend === 'rising' ? 'text-red-400 bg-red-500/15' : zone.trend === 'falling' ? 'text-green-400 bg-green-500/15' : 'text-white/50 bg-white/[0.05]'
                  )}>{zone.trend === 'rising' ? '↑' : zone.trend === 'falling' ? '↓' : '—'}</span>
                  <span className={cn("text-[16px] font-semibold",
                    isCritical ? "text-red-400" : isHigh ? "text-amber-400" : "text-green-400"
                  )}>{Math.round(zone.density)}%</span>
                </div>
              </div>
              <div className="relative h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-1000",
                  isCritical ? "bg-red-500" : isHigh ? "bg-amber-500" : "bg-green-500"
                )} style={{ width: `${Math.min(100, zone.density)}%` }} />
              </div>
              <div className="mt-1"><span className="text-[10px] text-white/40 font-medium">{zone.current.toLocaleString()} / {zone.capacity.toLocaleString()}</span></div>
            </div>
          );
        })}

        <div className="bg-rose-500/10 border border-rose-500/20 rounded-[14px] p-4 flex items-start gap-3 mt-1">
          <Sparkles className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-semibold text-rose-200 mb-1">AI Anomaly Detection</div>
            <div className="text-[11px] text-rose-300/80 leading-relaxed">North Concourse exceeding safe threshold. Recommend diverting Gate N inflow to Gate E/W.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
