/* View: Accessibility Panel */
import { Accessibility, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import GlassCard from '../shared/GlassCard';
import StatusBadge from '../shared/StatusBadge';

const route = [
  { step: 1, text: "♿ Wheelchair Ramp at Gate S", detail: "Ground-level entry, no stairs. 4 min queue." },
  { step: 2, text: "South concourse → East junction", detail: "Level ground, wide corridor (2.4m). 80m." },
  { step: 3, text: "Elevator Bank A to Level 1", detail: "Accessible elevator, fits wheelchair + companion." },
  { step: 4, text: "North concourse to Section 112", detail: "Level 1 corridor, handrails present. 120m." },
  { step: 5, text: "♿ Accessible seating area", detail: "Row F companion space. Clear sightline to pitch." },
];

const facilities = [
  { label: 'Elevator Bank A (East)', detail: 'Level 0 → Level 1 · No wait' },
  { label: 'Wheelchair Ramp Gate S', detail: 'Ground level entry · Clear path' },
  { label: 'Accessible Restroom WC-1', detail: 'East concourse · 2 min queue' },
  { label: 'Hearing Loop Zone', detail: 'Sections 110–115 · Active now' },
];

export default function AccessibilityPanel() {
  return (
    <div className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative shadow-[-4px_0_24px_rgba(0,0,0,0.2)]" style={{ background: 'rgba(18,34,64,0.55)', backdropFilter: 'blur(40px)' }}>
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.06] to-white/[0.03]" />
      <div className="p-4 flex items-center justify-between shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div><h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2"><Accessibility className="w-3.5 h-3.5 text-sky-400" /> Accessible Navigation</h2><p className="text-[10px] text-white/25 mt-0.5">Barrier-free route to your seat</p></div>
        <StatusBadge label="Clear" color="cyan" pulse={false} />
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <GlassCard level="elevated" padding="p-4" className="border-sky-500/10">
          <div className="flex justify-between mb-3"><span className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold">♿ Accessible Route</span><span className="text-[13px] font-semibold text-sky-400">7 min</span></div>
          <div className="space-y-3.5">
            {route.map((s, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold border shrink-0 mt-0.5", i === 0 ? "bg-sky-500/15 border-sky-500/25 text-sky-400" : "bg-white/[0.03] border-white/[0.05] text-white/30")}>{s.step}</div>
                <div><div className="text-[12px] font-medium text-white/70">{s.text}</div><div className="text-[10px] text-white/25 mt-0.5">{s.detail}</div></div>
              </div>
            ))}
          </div>
        </GlassCard>
        <div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold px-1">Nearby Facilities</div>
        {facilities.map(f => (
          <GlassCard key={f.label} padding="p-3" className="flex items-center justify-between">
            <div><div className="text-[11px] font-medium text-white/60">{f.label}</div><div className="text-[9px] text-white/20 mt-0.5">{f.detail}</div></div>
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-md bg-emerald-500/8 border border-emerald-500/15 text-emerald-400 shrink-0">OK</span>
          </GlassCard>
        ))}
        <GlassCard padding="p-3.5" className="border-sky-500/10">
          <div className="flex items-start gap-2.5"><Sparkles className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" /><div><div className="text-[11px] font-semibold text-sky-200 mb-1">AI Accessibility Insight</div><div className="text-[10px] text-sky-300/50 leading-relaxed">All elevators operational. Gate S wheelchair ramp is the smoothest entry — zero steps, level concourse the entire way.</div></div></div>
        </GlassCard>
      </div>
    </div>
  );
}
