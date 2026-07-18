import { Accessibility, Sparkles, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AccessibilityPanel() {
  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-[#151d2e]/95 backdrop-blur-2xl border-l border-white/[0.06] flex flex-col z-40 hidden md:flex" role="complementary" aria-label="Accessibility">
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-slate-200 flex items-center gap-2">
            <Accessibility className="w-4 h-4 text-sky-400" /> Accessible Navigation
          </h2>
          <p className="text-[11px] text-slate-500 mt-1">Barrier-free route to your seat</p>
        </div>
        <div className="flex items-center gap-1.5 bg-sky-500/12 border border-sky-500/20 px-2.5 py-1.5 rounded-full">
          <CheckCircle className="w-3 h-3 text-sky-400" />
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Clear</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        <div className="bg-[#1a2438] rounded-2xl p-5 border border-sky-500/15">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">♿ Accessible Route</span>
            <span className="text-[14px] font-semibold text-sky-400">7 min</span>
          </div>
          <div className="space-y-4">
            {[
              { step: 1, text: "♿ Wheelchair Ramp at Gate S", detail: "Ground-level entry, no stairs. 4 min queue." },
              { step: 2, text: "South concourse → East junction", detail: "Level ground, wide corridor (2.4m). 80m." },
              { step: 3, text: "Elevator Bank A to Level 1", detail: "Accessible elevator, fits wheelchair + companion." },
              { step: 4, text: "North concourse to Section 112", detail: "Level 1 corridor, handrails present. 120m." },
              { step: 5, text: "♿ Accessible seating area", detail: "Row F companion space. Clear sightline to pitch." },
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border flex-shrink-0 mt-0.5",
                  i === 0 ? "bg-sky-500/20 border-sky-500/30 text-sky-400" : "bg-white/[0.04] border-white/[0.06] text-slate-500"
                )}>{s.step}</div>
                <div>
                  <div className="text-[13px] font-medium text-slate-200">{s.text}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold px-1">Nearby Facilities</div>
        {[
          { label: 'Elevator Bank A (East)', detail: 'Level 0 → Level 1 · No wait' },
          { label: 'Wheelchair Ramp Gate S', detail: 'Ground level entry · Clear path' },
          { label: 'Accessible Restroom WC-1', detail: 'East concourse · 2 min queue' },
          { label: 'Hearing Loop Zone', detail: 'Sections 110–115 · Active now' },
        ].map(f => (
          <div key={f.label} className="bg-[#1a2438] rounded-xl p-4 border border-white/[0.06] flex items-center justify-between">
            <div>
              <div className="text-[12px] font-medium text-slate-200">{f.label}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{f.detail}</div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-green-500/10 border border-green-500/20 text-green-400 flex-shrink-0">OK</span>
          </div>
        ))}
        <div className="bg-sky-500/8 border border-sky-500/15 rounded-2xl p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-semibold text-sky-200 mb-1">AI Accessibility Insight</div>
            <div className="text-[11px] text-sky-300/70 leading-relaxed">All elevators operational. Gate S wheelchair ramp is the smoothest entry — zero steps, level concourse the entire way to the elevator.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
