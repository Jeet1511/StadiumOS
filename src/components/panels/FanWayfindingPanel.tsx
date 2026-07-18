import { Navigation, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FanWayfindingPanel() {
  const steps = [
    { icon: "🚪", text: "Enter via Gate S", detail: "4 min queue · South entrance", active: true, distance: "0m" },
    { icon: "➡️", text: "Follow south concourse west", detail: "Level ground, wide corridor", active: false, distance: "80m" },
    { icon: "↗️", text: "Turn north at west junction", detail: "Bypass Food Court A (congested)", active: false, distance: "160m" },
    { icon: "➡️", text: "Continue north along west concourse", detail: "Low density corridor", active: false, distance: "240m" },
    { icon: "🎫", text: "Scan ticket at Section 112 portal", detail: "Have QR code ready", active: false, distance: "300m" },
    { icon: "🏟️", text: "Arrive: Row F, Seat 24", detail: "Aisle seat, left side", active: false, distance: "320m" },
  ];

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-[#151d2e]/95 backdrop-blur-2xl border-l border-white/[0.06] flex flex-col z-40 hidden md:flex" role="complementary" aria-label="Wayfinding">
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-slate-200 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-indigo-400" /> AI Wayfinding
          </h2>
          <p className="text-[11px] text-slate-500 mt-1">Gate S → Section 112</p>
        </div>
        <div className="flex items-center gap-1.5 bg-indigo-500/12 border border-indigo-500/20 px-2.5 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Active</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        <div className="bg-[#1a2438] rounded-2xl p-5 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.05]">
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Total Distance</div>
              <div className="text-[20px] font-semibold text-white">320m</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Est. Time</div>
              <div className="text-[20px] font-semibold text-white">4 min</div>
            </div>
          </div>

          <div className="space-y-5">
            {steps.map((step, i) => (
              <div key={i} className={cn("flex gap-4 relative", step.active ? "opacity-100" : "opacity-60")}>
                {i < 5 && <div className="absolute left-[11px] top-8 bottom-[-12px] w-px bg-white/[0.06]" />}
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[11px] relative z-10 flex-shrink-0",
                  step.active ? "bg-indigo-500/20 border border-indigo-500/30" : "bg-white/[0.04] border border-white/[0.06]"
                )}>{step.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={cn("text-[13px] font-medium", step.active ? "text-slate-100" : "text-slate-300")}>{step.text}</span>
                    <span className="text-[10px] text-slate-600 font-mono">{step.distance}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-500/8 border border-indigo-500/15 rounded-2xl p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-semibold text-indigo-200 mb-1">AI Route Optimization</div>
            <div className="text-[11px] text-indigo-300/70 leading-relaxed">This route avoids Gate N (14 min queue) and Food Court A (congested). Gate S has only 4 min wait, saving 10 minutes.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
