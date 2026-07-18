import { useState } from 'react';
import { Ticket, MapPin, Clock, Sparkles, QrCode, ArrowRight, Search, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

// Parse ticket number format: WC26-{VENUE}-{ATTENDANCE}-{ROW}{SEAT}
function parseTicket(id: string): { section: number; row: string; seat: number } | null {
  const match = id.trim().toUpperCase().match(/^WC26-[A-Z]{2}-(\d{6})-([A-Z])(\d+)$/);
  if (!match) return null;
  const seatNum = parseInt(match[3], 10);
  const rowLetter = match[2];
  // Section derived from first 3 digits of attendance code
  const section = Math.min(parseInt(match[1].slice(0, 3), 10) % 200, 199) + 100;
  return { section, row: rowLetter, seat: seatNum };
}

export default function TicketPanel() {
  const [ticketInput, setTicketInput] = useState('');
  const [ticket, setTicket] = useState<{ id: string; section: number; row: string; seat: number } | null>(
    { id: 'WC26-MX-084200-F24', section: 112, row: 'F', seat: 24 }
  );
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const parsed = parseTicket(ticketInput);
    if (parsed) {
      setTicket({ id: ticketInput.trim().toUpperCase(), ...parsed });
      setError('');
    } else {
      setError('Invalid format. Use: WC26-MX-XXXXXX-X00');
    }
  };

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-[#151d2e]/95 backdrop-blur-2xl border-l border-white/[0.06] flex flex-col z-40 hidden md:flex" role="complementary" aria-label="Ticket panel">
      <div className="p-5 border-b border-white/[0.06]">
        <h2 className="text-[14px] font-semibold text-slate-200 flex items-center gap-2">
          <Ticket className="w-4 h-4 text-amber-400" /> Digital Ticket
        </h2>
        <p className="text-[11px] text-slate-500 mt-1">Enter your ticket to find your seat</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
        {/* Ticket Input */}
        <div className="bg-[#1a2438] rounded-2xl p-4 border border-white/[0.06]">
          <label className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-2">Enter Ticket Number</label>
          <div className="flex gap-2">
            <input
              type="text" value={ticketInput} onChange={(e) => setTicketInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="WC26-MX-084200-F24"
              className="flex-1 bg-[#0f1523] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[13px] font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
            <button onClick={handleSubmit} className="px-3 py-2.5 bg-indigo-500/15 border border-indigo-500/25 rounded-xl text-indigo-400 hover:bg-indigo-500/25 transition-all">
              <Search className="w-4 h-4" />
            </button>
          </div>
          {error && <p className="text-[11px] text-red-400 mt-2">{error}</p>}
          <p className="text-[10px] text-slate-600 mt-2">Demo: <span className="text-slate-500 font-mono cursor-pointer hover:text-indigo-400 transition-colors" onClick={() => setTicketInput('WC26-MX-084200-F24')}>WC26-MX-084200-F24</span></p>
        </div>

        {ticket && (
          <>
            {/* Active Ticket */}
            <div className="bg-gradient-to-br from-amber-500/10 via-[#1a2438] to-indigo-500/5 rounded-2xl p-5 border border-amber-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-[40px]" />
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-[11px] font-bold text-green-400 uppercase tracking-widest">Verified</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  { label: 'Section', value: ticket.section },
                  { label: 'Row', value: ticket.row },
                  { label: 'Seat', value: ticket.seat },
                ].map(d => (
                  <div key={d.label}>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">{d.label}</div>
                    <div className="text-[22px] font-semibold text-white">{d.value}</div>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-3 flex items-center justify-center">
                <div className="w-28 h-28 bg-black rounded-lg flex items-center justify-center relative">
                  <QrCode className="w-20 h-20 text-white" />
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">ID</span>
                <span className="text-[11px] font-mono text-slate-400">{ticket.id}</span>
              </div>
            </div>

            {/* Smart Entry */}
            <div className="bg-[#1a2438] rounded-2xl p-4 border border-white/[0.06]">
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-3">AI Smart Entry</div>
              {[
                { gate: 'Gate S', wait: '4 min', walk: '6 min', best: true },
                { gate: 'Gate W', wait: '4 min', walk: '8 min', best: false },
                { gate: 'Gate N', wait: '14 min', walk: '4 min', best: false },
              ].map(g => (
                <div key={g.gate} className={cn(
                  "flex items-center justify-between p-3 rounded-xl border mb-2 last:mb-0 transition-colors",
                  g.best ? "bg-green-500/8 border-green-500/20" : "bg-transparent border-white/[0.04] opacity-50"
                )}>
                  <div className="flex items-center gap-3">
                    <MapPin className={cn("w-4 h-4", g.best ? "text-green-400" : "text-slate-500")} />
                    <div>
                      <div className={cn("text-[12px] font-medium", g.best ? "text-slate-200" : "text-slate-400")}>{g.gate}</div>
                      <div className="text-[10px] text-slate-500">{g.wait} wait · {g.walk} walk</div>
                    </div>
                  </div>
                  {g.best && <span className="text-[9px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-md uppercase tracking-widest">Best</span>}
                </div>
              ))}
            </div>

            {/* Time */}
            <div className="bg-[#1a2438] rounded-xl p-3.5 border border-white/[0.06] flex items-center gap-3">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-[12px] font-medium text-slate-300">Gates opened at 16:00</div>
                <div className="text-[10px] text-slate-500">Kickoff at 18:00 · Currently 68th minute</div>
              </div>
            </div>

            <button className="w-full bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 text-[13px] font-semibold py-3 rounded-xl transition-all border border-indigo-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]">
              <Sparkles className="w-4 h-4" /> Navigate to My Seat <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
