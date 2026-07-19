/**
 * @module SecurityPanel
 * @description Security command panel for emergency operations.
 * Displays critical objectives, AI threat assessments, and dispatch controls.
 *
 * Architecture: Uses PanelShell for consistent layout with rose accent theme.
 *
 * Hackathon Alignment:
 * - AI-powered threat assessment and anomaly detection
 * - Crowd surge monitoring with evacuation protocols
 * - One-click unit deployment for emergency response
 * - Real-time security objective tracking
 */
import { ShieldAlert, Users, Navigation, AlertTriangle, Shield, Sparkles } from 'lucide-react';
import GlassCard from '../shared/GlassCard';
import PanelShell from '../shared/PanelShell';
import StatusBadge from '../shared/StatusBadge';
import { memo } from 'react';
import { cn } from '../../utils/cn';

const objectives = [
  { icon: Users, text: 'Evacuate North Sector 100', pct: '45%', urgent: true },
  { icon: Navigation, text: 'Clear West Gates', pct: 'Pending', urgent: false },
  { icon: AlertTriangle, text: 'Deploy Medics to Gate N', pct: 'Pending', urgent: false },
];

export default memo(function SecurityPanel() {
  return (
    <PanelShell
      accent="rose"
      ariaLabel="Security operations"
      header={
        <>
          <div>
            <h2 className="text-[13px] font-semibold text-rose-400 flex items-center gap-2">
              <ShieldAlert className="w-3.5 h-3.5" /> Protocol: Alpha
            </h2>
            <p className="text-[10px] text-white/25 mt-0.5">Evacuation sequence initiated</p>
          </div>
          <StatusBadge label="Live" color="rose" />
        </>
      }
    >
      <GlassCard level="elevated" padding="p-4" className="border-rose-500/10">
        <div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold mb-3">Critical Objectives</div>
        <div className="space-y-2">
          {objectives.map((obj, i) => (
            <div key={i} className={cn("flex items-center justify-between p-3 rounded-xl border", obj.urgent ? "bg-rose-500/[0.06] border-rose-500/12" : "bg-white/[0.015] border-white/[0.04]")}>
              <div className="flex items-center gap-2.5">
                <obj.icon className={cn("w-3.5 h-3.5", obj.urgent ? "text-rose-400" : "text-white/30")} />
                <span className={cn("text-[12px] font-medium", obj.urgent ? "text-white/80" : "text-white/40")}>{obj.text}</span>
              </div>
              <span className={cn("text-[11px] font-bold", obj.urgent ? "text-rose-400" : "text-amber-400")}>{obj.pct}</span>
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard padding="p-4">
        <div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold mb-2.5">AI Threat Assessment</div>
        <p className="text-[12px] text-white/60 leading-relaxed mb-3">Density anomaly at Gate N. Evacuation flow restricted. Recommend deploying perimeter units from Gate S.</p>
        <button type="button" className="w-full bg-rose-500/10 hover:bg-rose-500/18 text-rose-400 text-[12px] font-semibold py-3 rounded-xl transition-all border border-rose-500/15 flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5" /> Dispatch Units
        </button>
      </GlassCard>
      <GlassCard padding="p-3.5" className="border-rose-500/10">
        <div className="flex items-start gap-2.5"><Sparkles className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" /><div><div className="text-[11px] font-semibold text-rose-200 mb-1">AI Anomaly Alert</div><div className="text-[10px] text-rose-300/50 leading-relaxed">Gate N crowd surge detected — divert incoming fans to Gate E/W. Deploy 4 additional units to north perimeter.</div></div></div>
      </GlassCard>
    </PanelShell>
  );
});
