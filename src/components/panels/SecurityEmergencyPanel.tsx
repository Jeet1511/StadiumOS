import { ShieldAlert, Users, Navigation, AlertTriangle, Shield } from 'lucide-react';

// Extracted from App.tsx lines 443-503 — zero visual changes
export default function SecurityEmergencyPanel() {
  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-white/[0.01] backdrop-blur-3xl border-l border-red-500/20 flex flex-col z-40 hidden md:flex relative shadow-[-20px_0_40px_-20px_rgba(239,68,68,0.1)]" role="complementary" aria-label="Security emergency panel">
      <div className="absolute inset-0 bg-gradient-to-l from-red-500/5 to-transparent pointer-events-none" />
      
      <div className="p-6 border-b border-white/[0.05] relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-red-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Active Protocol: Alpha
          </h2>
          <p className="text-[11px] text-white/50 mt-1.5 tracking-wide">Evacuation Sequence Initiated</p>
        </div>
        <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 px-2.5 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Live</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative z-10">
        <div className="bg-[#050505]/80 rounded-[16px] p-5 border border-red-500/20 shadow-[inset_0_2px_15px_rgba(239,68,68,0.1)]">
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-4">Critical Objectives</div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-red-500/10 border border-red-500/20 p-3 rounded-[12px]">
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-red-400" />
                <span className="text-[12px] font-medium text-white/90">Evacuate Sector 100</span>
              </div>
              <span className="text-[11px] text-red-400 font-bold">45%</span>
            </div>
            <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.05] p-3 rounded-[12px]">
              <div className="flex items-center gap-3">
                <Navigation className="w-4 h-4 text-white/40" />
                <span className="text-[12px] font-medium text-white/70">Clear West Gates</span>
              </div>
              <span className="text-[11px] text-white/40 font-bold">Pending</span>
            </div>
            <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.05] p-3 rounded-[12px]">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-white/40" />
                <span className="text-[12px] font-medium text-white/70">Deploy Medics to Gate N</span>
              </div>
              <span className="text-[11px] text-white/40 font-bold">Pending</span>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-[16px] p-5">
           <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-3">AI Threat Assessment</div>
           <p className="text-[12px] text-white/70 leading-relaxed mb-4">
             Density anomaly detected at Gate N. Evacuation flow restricted. Recommend deploying perimeter control units from Gate S to assist.
           </p>
           <button id="dispatch-units-btn" className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[12px] font-semibold py-3 rounded-[10px] transition-all duration-300 border border-red-500/30 flex items-center justify-center gap-2">
             <Shield className="w-3.5 h-3.5" /> Dispatch Units
           </button>
        </div>
      </div>
    </div>
  );
}
