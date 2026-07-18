/* View: Security Panel */
import { ShieldAlert, Users, Navigation, AlertTriangle, Shield, Sparkles } from 'lucide-react';
import GlassCard from '../shared/GlassCard';
import StatusBadge from '../shared/StatusBadge';
import { cn } from '../../utils/cn';

const objectives = [
  { icon: Users, text: 'Evacuate North Sector 100', pct: '45%', urgent: true },
  { icon: Navigation, text: 'Clear West Gates', pct: 'Pending', urgent: false },
  { icon: AlertTriangle, text: 'Deploy Medics to Gate N', pct: 'Pending', urgent: false },
];

export default function SecurityPanel() {
  return (
    <div className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative shadow-[-4px_0_24px_rgba(0,0,0,0.2)]" style={{ background: 'rgba(18,34,64,0.55)', backdropFilter: 'blur(40px)' }}>
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-rose-500/[0.05] via-rose-500/[0.1] to-rose-500/[0.05]" />
      <div className="p-4 flex items-center justify-between shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-rose-500/10 to-transparent" />
        <div><h2 className="text-[13px] font-semibold text-rose-400 flex items-center gap-2"><ShieldAlert className="w-3.5 h-3.5" /> Protocol: Alpha</h2><p className="text-[10px] text-white/25 mt-0.5">Evacuation sequence initiated</p></div>
        <StatusBadge label="Live" color="rose" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
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
          <button className="w-full bg-rose-500/10 hover:bg-rose-500/18 text-rose-400 text-[12px] font-semibold py-3 rounded-xl transition-all border border-rose-500/15 flex items-center justify-center gap-2">
            <Shield className="w-3.5 h-3.5" /> Dispatch Units
          </button>
        </GlassCard>
        <GlassCard padding="p-3.5" className="border-rose-500/10">
          <div className="flex items-start gap-2.5"><Sparkles className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" /><div><div className="text-[11px] font-semibold text-rose-200 mb-1">AI Anomaly Alert</div><div className="text-[10px] text-rose-300/50 leading-relaxed">Gate N crowd surge detected — divert incoming fans to Gate E/W. Deploy 4 additional units to north perimeter.</div></div></div>
        </GlassCard>
      </div>
    </div>
  );
}
