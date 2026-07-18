import { Navigation, Users, Ticket, Home, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

// Extracted from App.tsx lines 379-441 — zero visual changes
export default function FanWayfindingPanel() {
  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-white/[0.01] backdrop-blur-3xl border-l border-white/[0.05] flex flex-col z-40 hidden md:flex relative shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.5)]" role="complementary" aria-label="Wayfinding panel">
      <div className="absolute inset-0 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="p-6 border-b border-white/[0.05] relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white/90 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-400" />
            Live Wayfinding
          </h2>
          <p className="text-[11px] text-white/40 mt-1.5 tracking-wide">Navigating to Section 112</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10">
        <div className="bg-[#050505]/80 rounded-[16px] p-5 border border-white/[0.05] shadow-[inset_0_2px_15px_rgba(0,0,0,0.4)]">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.05]">
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">Est. Time</div>
              <div className="text-[18px] font-light text-white/90">4 min</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-1">Distance</div>
              <div className="text-[18px] font-light text-white/90">320m</div>
            </div>
          </div>
          
          <div className="space-y-6">
            {[
              { icon: Navigation, text: "Head straight towards Gate N", detail: "120m • Minimal crowd", active: true },
              { icon: Users, text: "Turn right at Food Court B", detail: "Avoid Food Court A due to high density", active: false },
              { icon: Ticket, text: "Scan ticket at Portal 4", detail: "Have QR code ready", active: false },
              { icon: Home, text: "Arrive at Section 112, Row F", detail: "Seat 24", active: false }
            ].map((step, i) => (
              <div key={i} className={cn("flex gap-4 relative", step.active ? "opacity-100" : "opacity-40")}>
                {i < 3 && <div className="absolute left-[11px] top-8 bottom-[-16px] w-px bg-white/[0.1]" />}
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center relative z-10 flex-shrink-0",
                  step.active ? "bg-blue-500/20 border border-blue-500/30 text-blue-400" : "bg-white/[0.05] border border-white/[0.1] text-white/40"
                )}>
                  <step.icon className="w-3 h-3" />
                </div>
                <div>
                  <div className={cn("text-[13px] font-medium mb-1", step.active ? "text-white" : "text-white/80")}>{step.text}</div>
                  <div className="text-[11px] text-white/50">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-[16px] p-4 flex items-start gap-3">
           <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
           <div>
             <div className="text-[12px] font-medium text-blue-100 mb-1">AI Route Optimized</div>
             <div className="text-[11px] text-blue-300/70 leading-relaxed">Your route was dynamically adjusted to bypass a 14-minute queue at the North Concourse.</div>
           </div>
        </div>
      </div>
    </div>
  );
}
