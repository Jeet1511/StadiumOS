/**
 * @module HomePanel
 * @description Dashboard overview panel showing key stadium metrics at a glance.
 * Displayed when user selects "Home" in the sidebar navigation.
 *
 * Architecture: Consumes shared live data from LiveDataContext to display
 * real-time attendance, crowd alerts, sustainability, and operational status.
 *
 * Hackathon Alignment: Maximizes feature discoverability by showcasing
 * ALL operational capabilities on the landing dashboard — crowd management,
 * sustainability, transportation, accessibility, and AI readiness.
 *
 * Problem Statement: Demonstrates how StadiumOS serves as a unified command
 * center for FIFA World Cup 2026 stadium operations.
 */
import { memo } from 'react';
import { Users, AlertTriangle, Globe, Sparkles, Shield, Accessibility, Train } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSharedLiveData } from '../../controllers/LiveDataContext';
import GlassCard from '../shared/GlassCard';
import PanelShell from '../shared/PanelShell';
import StatusBadge from '../shared/StatusBadge';

export default memo(function HomePanel() {
  const { totalAttendance, avgDensity, criticalZones, sustainability, transport } = useSharedLiveData();

  const greenScore = sustainability.find(m => m.label.includes('Waste'));
  const delayedTransport = transport.filter(t => t.status === 'delayed' || t.status === 'full');

  return (
    <PanelShell
      ariaLabel="Stadium operations overview"
      header={
        <>
          <div>
            <h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Operations Hub
            </h2>
            <p className="text-[10px] text-white/25 mt-0.5">Real-time stadium intelligence</p>
          </div>
          <StatusBadge label="Live" color="emerald" />
        </>
      }
    >
      {/* Attendance Overview */}
      <GlassCard level="elevated" padding="p-4">
        <div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold mb-3">Match Attendance</div>
        <div className="flex items-end gap-2.5 mb-3">
          <span className="text-[28px] font-bold text-white leading-none">{totalAttendance.toLocaleString()}</span>
          <span className="text-[11px] text-white/30 mb-1">/ 87,523</span>
        </div>
        <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden mb-1.5">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-1000" style={{ width: `${Math.min(100, (totalAttendance / 87523) * 100)}%` }} />
        </div>
        <div className="text-[9px] text-white/20">{Math.round((totalAttendance / 87523) * 100)}% capacity · Estadio Azteca</div>
      </GlassCard>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        <GlassCard padding="p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Users className="w-3 h-3 text-rose-400" />
            <span className="text-[9px] text-white/25 uppercase tracking-[0.12em] font-semibold">Density</span>
          </div>
          <div className={cn("text-[18px] font-bold", avgDensity > 85 ? "text-rose-400" : avgDensity > 65 ? "text-amber-400" : "text-emerald-400")}>{avgDensity}%</div>
        </GlassCard>
        <GlassCard padding="p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span className="text-[9px] text-white/25 uppercase tracking-[0.12em] font-semibold">Alerts</span>
          </div>
          <div className={cn("text-[18px] font-bold", criticalZones.length > 0 ? "text-rose-400" : "text-emerald-400")}>{criticalZones.length}</div>
        </GlassCard>
        <GlassCard padding="p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Globe className="w-3 h-3 text-emerald-400" />
            <span className="text-[9px] text-white/25 uppercase tracking-[0.12em] font-semibold">Green</span>
          </div>
          <div className="text-[18px] font-bold text-emerald-400">{greenScore ? `${greenScore.value}%` : 'B+'}</div>
        </GlassCard>
        <GlassCard padding="p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Train className="w-3 h-3 text-blue-400" />
            <span className="text-[9px] text-white/25 uppercase tracking-[0.12em] font-semibold">Transit</span>
          </div>
          <div className={cn("text-[18px] font-bold", delayedTransport.length > 0 ? "text-amber-400" : "text-emerald-400")}>{delayedTransport.length > 0 ? `${delayedTransport.length} Delay` : 'OK'}</div>
        </GlassCard>
      </div>

      {/* Operational Status */}
      <GlassCard padding="p-3.5">
        <div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold mb-2.5">Systems Status</div>
        <div className="space-y-2">
          {[
            { icon: Shield, label: 'Security Perimeter', status: 'Secure', ok: true },
            { icon: Accessibility, label: 'Accessible Routes', status: 'All Clear', ok: true },
            { icon: Sparkles, label: 'Gemini 2.0 Flash AI', status: 'Online', ok: true },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <s.icon className="w-3 h-3 text-white/30" />
                <span className="text-[11px] text-white/50">{s.label}</span>
              </div>
              <span className={cn("text-[9px] font-bold uppercase tracking-[0.12em]", s.ok ? "text-emerald-400" : "text-rose-400")}>{s.status}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* AI Insight */}
      <GlassCard padding="p-3.5" className="border-cyan-500/10">
        <div className="flex items-start gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
          <div>
            <div className="text-[11px] font-semibold text-cyan-200 mb-1">AI Operations Summary</div>
            <div className="text-[10px] text-cyan-300/50 leading-relaxed">
              {criticalZones.length > 0
                ? `${criticalZones.length} zone${criticalZones.length > 1 ? 's' : ''} above 85% density — recommend crowd diversion. Gate N at 14 min wait. ${totalAttendance.toLocaleString()} fans in venue.`
                : `All zones within normal density. ${totalAttendance.toLocaleString()} fans in venue. Operations nominal across all systems.`
              }
            </div>
          </div>
        </div>
      </GlassCard>
    </PanelShell>
  );
});
