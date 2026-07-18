import { Train, Bus, Car, MapPin, Clock, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function TransportPanel() {
  const options = [
    { icon: Train, label: 'Metro L3 · Estadio Azteca', time: '2 min walk', status: 'Running', next: '3 min', statusColor: 'green' },
    { icon: Bus, label: 'Bus Route 47 · Gate W', time: '5 min walk', status: 'Delayed 4m', next: '12 min', statusColor: 'amber' },
    { icon: Car, label: 'Parking Lot A · South', time: '8 min walk', status: '82% full', next: '', statusColor: 'amber' },
    { icon: Car, label: 'Taxi Stand · Gate E', time: '3 min walk', status: 'Available', next: '~5 min', statusColor: 'green' },
  ];

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-[#151d2e]/95 backdrop-blur-2xl border-l border-white/[0.06] flex flex-col z-40 hidden md:flex">
      <div className="p-5 border-b border-white/[0.06]">
        <h2 className="text-[14px] font-semibold text-slate-200 flex items-center gap-2"><Train className="w-4 h-4 text-blue-400" /> Transit Hub</h2>
        <p className="text-[11px] text-slate-500 mt-1">Real-time transport connections</p>
      </div>
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {options.map(o => (
          <div key={o.label} className="bg-[#1a2438] rounded-xl p-4 border border-white/[0.06] hover:border-white/[0.1] transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]"><o.icon className="w-4 h-4 text-slate-300" /></div>
                <div>
                  <div className="text-[13px] font-medium text-slate-200">{o.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5"><MapPin className="w-3 h-3" />{o.time}</div>
                </div>
              </div>
              <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border flex-shrink-0",
                o.statusColor === 'green' ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-amber-500/10 border-amber-500/20 text-amber-400"
              )}>{o.status}</span>
            </div>
            {o.next && <div className="mt-3 pt-3 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] text-slate-500"><Clock className="w-3 h-3" />Next: {o.next}</div>}
          </div>
        ))}
        <div className="bg-blue-500/8 border border-blue-500/15 rounded-2xl p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-semibold text-blue-200 mb-1">AI Transport Insight</div>
            <div className="text-[11px] text-blue-300/70 leading-relaxed">Metro L3 is the fastest post-match exit. Leave at 85th minute to avoid the rush. Bus 47 is delayed due to traffic on Calzada de Tlalpan.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
