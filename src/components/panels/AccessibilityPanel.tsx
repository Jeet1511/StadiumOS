import { Accessibility, Navigation, Sparkles, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AccessibilityPanel() {
  const features = [
    { label: 'Elevator Bank A', status: 'operational', detail: 'Near Section 112 • 0 wait', zone: 'North' },
    { label: 'Elevator Bank B', status: 'operational', detail: 'Near Section 200 • 2 min wait', zone: 'South' },
    { label: 'Wheelchair Ramp Gate S', status: 'operational', detail: 'Clear path • No congestion', zone: 'Gate S' },
    { label: 'Accessible Restroom WC 1', status: 'operational', detail: '3 min queue', zone: 'West' },
    { label: 'Hearing Loop Zone', status: 'operational', detail: 'Sections 110-115 active', zone: 'North' },
    { label: 'Sensory Room', status: 'available', detail: 'Level 2, Near Gate W', zone: 'West' },
  ];

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-white/[0.01] backdrop-blur-3xl border-l border-white/[0.05] flex flex-col z-40 hidden md:flex relative shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.5)]" role="complementary" aria-label="Accessibility panel">
      <div className="absolute inset-0 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="p-6 border-b border-white/[0.05] relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white/90 flex items-center gap-2">
            <Accessibility className="w-4 h-4 text-sky-400" />
            Accessibility
          </h2>
          <p className="text-[11px] text-white/40 mt-1.5 tracking-wide">Inclusive stadium navigation</p>
        </div>
        <div className="flex items-center gap-1 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1.5 rounded-full">
          <CheckCircle className="w-3 h-3 text-sky-400" />
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">All Clear</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 relative z-10">
        {/* Accessible route card */}
        <div className="bg-[#050505]/80 rounded-[16px] p-5 border border-sky-500/20 shadow-[inset_0_2px_15px_rgba(14,165,233,0.05)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-400" />
              <span className="text-[12px] font-medium text-white/90">Accessible Route to Seat</span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              "Gate S → Wheelchair Ramp (ground level)",
              "Elevator Bank A → Level 1",
              "Concourse N → Section 112 (accessible seating)",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border flex-shrink-0",
                  i === 0 ? "bg-sky-500/20 border-sky-500/30 text-sky-400" : "bg-white/[0.05] border-white/[0.1] text-white/40"
                )}>
                  {i + 1}
                </div>
                <span className="text-[12px] text-white/70">{step}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.05]">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">Est. Time</span>
            <span className="text-[16px] font-light text-sky-400">7 min</span>
          </div>
        </div>

        {/* Facility list */}
        <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold px-1">Accessible Facilities</div>
        {features.map((f) => (
          <div key={f.label} className="bg-[#050505]/80 rounded-[14px] p-4 border border-white/[0.05] shadow-[inset_0_2px_15px_rgba(0,0,0,0.4)] flex items-center justify-between">
            <div>
              <div className="text-[12px] font-medium text-white/80">{f.label}</div>
              <div className="text-[10px] text-white/40 mt-0.5">{f.detail}</div>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[6px] bg-green-500/10 border border-green-500/20 text-green-400 flex-shrink-0">
              {f.status}
            </span>
          </div>
        ))}

        <div className="bg-sky-500/10 border border-sky-500/20 rounded-[16px] p-4 flex items-start gap-3 mt-1">
          <Sparkles className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-medium text-sky-100 mb-1">AI Accessibility Insight</div>
            <div className="text-[11px] text-sky-300/70 leading-relaxed">All elevator banks operational. Recommended route via Gate S avoids stairs entirely. Hearing loop active in your section.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
