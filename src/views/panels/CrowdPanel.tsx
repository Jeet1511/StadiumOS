/* View: Crowd Panel */
import { Users, Sparkles, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLiveData } from '../../controllers/useLiveData';
import GlassCard from '../shared/GlassCard';

export default function CrowdPanel() {
  const { crowdZones, totalAttendance, avgDensity, criticalZones } = useLiveData();

  return (
    <div className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative" style={{ background: 'rgba(4,8,15,0.9)', backdropFilter: 'blur(40px)' }}>
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.06] to-white/[0.03]" />
      <div className="p-4 flex items-center justify-between shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div><h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2"><Users className="w-3.5 h-3.5 text-rose-400" /> Crowd Matrix</h2><p className="text-[10px] text-white/25 mt-0.5">{totalAttendance.toLocaleString()} total · {avgDensity}% avg</p></div>
        {criticalZones.length > 0 && (
          <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-full">
            <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
            <span className="text-[9px] font-bold text-rose-400 uppercase tracking-[0.12em]">{criticalZones.length} Alert</span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
        {crowdZones.map(zone => {
          const crit = zone.density > 85; const high = zone.density > 65;
          return (
            <GlassCard key={zone.id} padding="p-3.5" className={crit ? "border-rose-500/15" : ""}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {crit && <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse" />}
                  <span className="text-[12px] font-medium text-white/70">{zone.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded", zone.trend === 'rising' ? 'text-rose-400 bg-rose-500/10' : zone.trend === 'falling' ? 'text-emerald-400 bg-emerald-500/10' : 'text-white/30 bg-white/[0.03]')}>{zone.trend === 'rising' ? '↑' : zone.trend === 'falling' ? '↓' : '—'}</span>
                  <span className={cn("text-[14px] font-semibold", crit ? "text-rose-400" : high ? "text-amber-400" : "text-emerald-400")}>{Math.round(zone.density)}%</span>
                </div>
              </div>
              <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden">
                <div className={cn("h-full rounded-full transition-all duration-1000", crit ? "bg-rose-500" : high ? "bg-amber-500" : "bg-emerald-500")} style={{ width: `${Math.min(100, zone.density)}%` }} />
              </div>
              <div className="mt-1"><span className="text-[9px] text-white/20">{zone.current.toLocaleString()} / {zone.capacity.toLocaleString()}</span></div>
            </GlassCard>
          );
        })}
        <GlassCard padding="p-3.5" className="border-rose-500/10">
          <div className="flex items-start gap-2.5"><Sparkles className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" /><div><div className="text-[11px] font-semibold text-rose-200 mb-1">AI Anomaly Detection</div><div className="text-[10px] text-rose-300/50 leading-relaxed">North Concourse exceeding safe threshold. Recommend diverting Gate N inflow to Gate E/W.</div></div></div>
        </GlassCard>
      </div>
    </div>
  );
}
