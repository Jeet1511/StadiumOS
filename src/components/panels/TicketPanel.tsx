import { Ticket, MapPin, Clock, Sparkles, QrCode, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function TicketPanel() {
  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-black/30 backdrop-blur-2xl border-l border-white/[0.08] flex flex-col z-40 hidden md:flex relative" role="complementary" aria-label="My ticket panel">
      
      <div className="p-6 border-b border-white/[0.08] relative z-10">
        <h2 className="text-[15px] font-semibold text-white flex items-center gap-2">
          <Ticket className="w-4 h-4 text-amber-400" />
          Digital Ticket
        </h2>
        <p className="text-[11px] text-white/50 mt-1 tracking-wide">Scan at gate for entry</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 relative z-10">
        {/* Ticket Card */}
        <div className="bg-gradient-to-br from-amber-500/15 via-black/60 to-purple-500/10 rounded-[20px] p-6 border border-amber-500/25 shadow-[0_8px_30px_rgba(0,0,0,0.4)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/15 rounded-full blur-[50px]" />
          
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-1">Section</div>
              <div className="text-[22px] font-semibold text-white">112</div>
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-1">Row</div>
              <div className="text-[22px] font-semibold text-white">F</div>
            </div>
            <div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-1">Seat</div>
              <div className="text-[22px] font-semibold text-white">24</div>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-[14px] p-4 flex items-center justify-center">
            <div className="w-32 h-32 bg-black rounded-[8px] flex items-center justify-center relative">
              <QrCode className="w-24 h-24 text-white" />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent rounded-[8px] animate-[pulse_3s_ease-in-out_infinite]" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Ticket ID</span>
            <span className="text-[12px] font-mono text-white/80">WC26-MX-084200-F24</span>
          </div>
        </div>

        {/* Smart Entry Recommendation */}
        <div className="bg-black/40 rounded-[16px] p-5 border border-white/[0.08]">
          <div className="text-[11px] text-white/50 uppercase tracking-widest font-semibold mb-4">AI Smart Entry</div>
          
          <div className="space-y-3">
            {[
              { gate: 'Gate S', wait: '4 min', walk: '6 min', recommended: true },
              { gate: 'Gate W', wait: '4 min', walk: '8 min', recommended: false },
              { gate: 'Gate N', wait: '14 min', walk: '4 min', recommended: false },
            ].map(g => (
              <div key={g.gate} className={cn(
                "flex items-center justify-between p-3 rounded-[12px] border transition-colors",
                g.recommended
                  ? "bg-green-500/10 border-green-500/25"
                  : "bg-white/[0.02] border-white/[0.06] opacity-60"
              )}>
                <div className="flex items-center gap-3">
                  <MapPin className={cn("w-4 h-4", g.recommended ? "text-green-400" : "text-white/40")} />
                  <div>
                    <div className={cn("text-[13px] font-medium", g.recommended ? "text-white" : "text-white/70")}>{g.gate}</div>
                    <div className="text-[10px] text-white/40">{g.wait} wait · {g.walk} walk</div>
                  </div>
                </div>
                {g.recommended && (
                  <span className="text-[9px] font-bold text-green-400 bg-green-500/10 border border-green-500/25 px-2 py-1 rounded-md uppercase tracking-widest">Best</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Time info */}
        <div className="bg-black/40 rounded-[16px] p-4 border border-white/[0.08] flex items-center gap-4">
          <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-[12px] font-medium text-white/90">Gates opened at 16:00</div>
            <div className="text-[11px] text-white/50">Kickoff was at 18:00 · Currently 68th minute</div>
          </div>
        </div>

        <button className="w-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-[13px] font-semibold py-3.5 rounded-[14px] transition-all duration-300 border border-amber-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
          <Sparkles className="w-4 h-4" /> Navigate to My Seat <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
