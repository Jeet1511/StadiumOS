/* View: Wayfinding Panel */
import { Navigation, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import GlassCard from '../shared/GlassCard';
import StatusBadge from '../shared/StatusBadge';

const steps = [
  { icon: "🚪", text: "Enter via Gate S", detail: "4 min queue · South entrance", active: true, dist: "0m" },
  { icon: "➡️", text: "Follow south concourse west", detail: "Level ground, wide corridor", active: false, dist: "80m" },
  { icon: "↗️", text: "Turn north at west junction", detail: "Bypass Food Court A (congested)", active: false, dist: "160m" },
  { icon: "➡️", text: "Continue along west concourse", detail: "Low density corridor", active: false, dist: "240m" },
  { icon: "🎫", text: "Scan ticket at Section 112", detail: "Have QR code ready", active: false, dist: "300m" },
  { icon: "🏟️", text: "Arrive: Row F, Seat 24", detail: "Aisle seat, left side", active: false, dist: "320m" },
];

export default function WayfindingPanel() {
  return (
    <div className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative" style={{ background: 'rgba(4,8,15,0.9)', backdropFilter: 'blur(40px)' }}>
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.06] to-white/[0.03]" />
      <div className="p-4 flex items-center justify-between shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div><h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2"><Navigation className="w-3.5 h-3.5 text-cyan-400" /> AI Wayfinding</h2><p className="text-[10px] text-white/25 mt-0.5">Gate S → Section 112</p></div>
        <StatusBadge label="Active" color="cyan" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <GlassCard level="elevated" padding="p-4">
          <div className="flex justify-between mb-4 pb-3 border-b border-white/[0.04]">
            <div><div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold mb-1">Distance</div><div className="text-[20px] font-bold text-white">320m</div></div>
            <div className="text-right"><div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold mb-1">Est. Time</div><div className="text-[20px] font-bold text-white">4 min</div></div>
          </div>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className={cn("flex gap-3 relative", s.active ? "opacity-100" : "opacity-50")}>
                {i < 5 && <div className="absolute left-[11px] top-7 bottom-[-10px] w-px bg-white/[0.05]" />}
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] relative z-10 shrink-0", s.active ? "bg-cyan-500/15 border border-cyan-500/25" : "bg-white/[0.03] border border-white/[0.05]")}>{s.icon}</div>
                <div className="flex-1"><div className="flex justify-between"><span className={cn("text-[12px] font-medium", s.active ? "text-white/90" : "text-white/50")}>{s.text}</span><span className="text-[9px] text-white/20 font-mono">{s.dist}</span></div><div className="text-[10px] text-white/25 mt-0.5">{s.detail}</div></div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard padding="p-3.5" className="border-cyan-500/10">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
            <div><div className="text-[11px] font-semibold text-cyan-200 mb-1">AI Route Optimization</div><div className="text-[10px] text-cyan-300/50 leading-relaxed">This route avoids Gate N (14 min queue) and Food Court A. Gate S has only 4 min wait — saving 10 minutes.</div></div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
