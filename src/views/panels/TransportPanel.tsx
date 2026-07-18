/* View: Transport Panel */
import { Train, Bus, Car, MapPin, Clock, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import GlassCard from '../shared/GlassCard';

const options = [
  { icon: Train, label: 'Metro L3 · Estadio Azteca', time: '2 min walk', status: 'Running', next: '3 min', ok: true },
  { icon: Bus, label: 'Bus Route 47 · Gate W', time: '5 min walk', status: 'Delayed 4m', next: '12 min', ok: false },
  { icon: Car, label: 'Parking Lot A · South', time: '8 min walk', status: '82% full', next: '', ok: false },
  { icon: Car, label: 'Taxi Stand · Gate E', time: '3 min walk', status: 'Available', next: '~5 min', ok: true },
];

export default function TransportPanel() {
  return (
    <div className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative" style={{ background: 'rgba(4,8,15,0.9)', backdropFilter: 'blur(40px)' }}>
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.06] to-white/[0.03]" />
      <div className="p-4 shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2"><Train className="w-3.5 h-3.5 text-blue-400" /> Transit Hub</h2>
        <p className="text-[10px] text-white/25 mt-0.5">Real-time transport connections</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
        {options.map(o => (
          <GlassCard key={o.label} padding="p-3.5" className="hover:border-white/[0.1]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05]"><o.icon className="w-3.5 h-3.5 text-white/50" /></div>
                <div><div className="text-[12px] font-medium text-white/70">{o.label}</div><div className="text-[10px] text-white/25 mt-0.5 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{o.time}</div></div>
              </div>
              <span className={cn("text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-md border shrink-0", o.ok ? "bg-emerald-500/8 border-emerald-500/15 text-emerald-400" : "bg-amber-500/8 border-amber-500/15 text-amber-400")}>{o.status}</span>
            </div>
            {o.next && <div className="mt-2.5 pt-2 border-t border-white/[0.03] flex items-center gap-1 text-[10px] text-white/25"><Clock className="w-2.5 h-2.5" />Next: {o.next}</div>}
          </GlassCard>
        ))}
        <GlassCard padding="p-3.5" className="border-blue-500/10">
          <div className="flex items-start gap-2.5"><Sparkles className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" /><div><div className="text-[11px] font-semibold text-blue-200 mb-1">AI Transport Insight</div><div className="text-[10px] text-blue-300/50 leading-relaxed">Metro L3 is the fastest post-match exit. Leave at 85th minute to avoid the rush. Bus 47 is delayed on Calzada de Tlalpan.</div></div></div>
        </GlassCard>
      </div>
    </div>
  );
}
