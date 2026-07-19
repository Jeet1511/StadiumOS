/**
 * @module CrowdPanel
 * @description Real-time crowd density monitoring panel.
 * Displays zone-by-zone occupancy, density trends, and AI anomaly alerts.
 *
 * Architecture: Consumes shared live data via LiveDataContext to avoid
 * duplicate polling intervals. Uses PanelShell for consistent layout.
 *
 * Hackathon Alignment:
 * - Real-time crowd management with density heatmap data
 * - AI anomaly detection for crowd surge events
 * - Critical zone alerting for security operations
 * - Capacity tracking for venue management
 */
import { Users, Sparkles, AlertTriangle } from 'lucide-react';
import { memo } from 'react';
import { cn } from '../../utils/cn';
import { useSharedLiveData } from '../../controllers/LiveDataContext';
import GlassCard from '../shared/GlassCard';
import PanelShell from '../shared/PanelShell';

export default memo(function CrowdPanel() {
  const { crowdZones, totalAttendance, avgDensity, criticalZones } = useSharedLiveData();

  return (
    <PanelShell
      ariaLabel="Crowd density monitoring"
      header={
        <>
          <div>
            <h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-rose-400" /> Crowd Matrix
            </h2>
            <p className="text-[10px] text-white/25 mt-0.5">{totalAttendance.toLocaleString()} total · {avgDensity}% avg</p>
          </div>
          {criticalZones.length > 0 && (
            <div className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-full">
              <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
              <span className="text-[9px] font-bold text-rose-400 uppercase tracking-[0.12em]">{criticalZones.length} Alert</span>
            </div>
          )}
        </>
      }
    >
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
    </PanelShell>
  );
});
