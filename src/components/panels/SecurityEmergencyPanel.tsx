import { ShieldAlert, Users, Navigation, AlertTriangle, Shield } from 'lucide-react';

export default function SecurityEmergencyPanel() {
  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-[#151d2e]/95 backdrop-blur-2xl border-l border-rose-500/15 flex flex-col z-40 hidden md:flex">
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-rose-400 flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Protocol: Alpha</h2>
          <p className="text-[11px] text-slate-500 mt-1">Evacuation sequence initiated</p>
        </div>
        <div className="flex items-center gap-1.5 bg-rose-500/12 border border-rose-500/20 px-2.5 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Live</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        <div className="bg-[#1a2438] rounded-2xl p-5 border border-rose-500/15">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-3">Critical Objectives</div>
          <div className="space-y-2">
            {[
              { icon: Users, text: 'Evacuate North Sector 100', pct: '45%', urgent: true },
              { icon: Navigation, text: 'Clear West Gates', pct: 'Pending', urgent: false },
              { icon: AlertTriangle, text: 'Deploy Medics to Gate N', pct: 'Pending', urgent: false },
            ].map((obj, i) => (
              <div key={i} className={`flex items-center justify-between p-3.5 rounded-xl border ${obj.urgent ? 'bg-rose-500/8 border-rose-500/15' : 'bg-white/[0.02] border-white/[0.05]'}`}>
                <div className="flex items-center gap-3">
                  <obj.icon className={`w-4 h-4 ${obj.urgent ? 'text-rose-400' : 'text-slate-500'}`} />
                  <span className={`text-[13px] font-medium ${obj.urgent ? 'text-slate-200' : 'text-slate-400'}`}>{obj.text}</span>
                </div>
                <span className={`text-[12px] font-bold ${obj.urgent ? 'text-rose-400' : 'text-amber-400'}`}>{obj.pct}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#1a2438] border border-white/[0.06] rounded-2xl p-5">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-3">AI Threat Assessment</div>
          <p className="text-[13px] text-slate-300 leading-relaxed mb-4">Density anomaly at Gate N. Evacuation flow restricted. Recommend deploying perimeter units from Gate S to assist.</p>
          <button className="w-full bg-rose-500/12 hover:bg-rose-500/20 text-rose-400 text-[13px] font-semibold py-3.5 rounded-xl transition-all border border-rose-500/20 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" /> Dispatch Units
          </button>
        </div>
      </div>
    </div>
  );
}
