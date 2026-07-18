import { X, User, MapPin, Shield, Clock, LogOut } from 'lucide-react';
import type { Role } from '../../types';

const roleLabels: Record<Role, { title: string; badge: string; color: string }> = {
  fan: { title: 'Fan Experience', badge: 'General Admission', color: 'text-blue-400 bg-blue-500/15 border-blue-500/25' },
  security: { title: 'Security Command', badge: 'Clearance Level 4', color: 'text-rose-400 bg-rose-500/15 border-rose-500/25' },
  organizer: { title: 'Operations Manager', badge: 'Full Access', color: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/25' },
  volunteer: { title: 'Volunteer Staff', badge: 'Service Crew', color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/25' },
};

export default function ProfileModal({ isOpen, onClose, role, onSwitchRole }: { isOpen: boolean; onClose: () => void; role: Role; onSwitchRole: () => void }) {
  if (!isOpen) return null;
  const info = roleLabels[role];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-white">Profile</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.06] text-white/50 hover:text-white transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center">
              <User className="w-7 h-7 text-white/70" />
            </div>
            <div>
              <div className="text-[16px] font-semibold text-white">Alex Ridge</div>
              <div className="text-[12px] text-white/50 mt-0.5">{info.title}</div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Shield className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Access</span>
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${info.color}`}>{info.badge}</span>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Seat</span>
              </div>
              <div className="text-[14px] font-semibold text-white">Section 112, F-24</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Session</span>
              </div>
              <div className="text-[14px] font-semibold text-white">2h 45m</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">Venue</span>
              </div>
              <div className="text-[14px] font-semibold text-white">Estadio Azteca</div>
            </div>
          </div>

          {/* Ticket ID */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
            <span className="text-[11px] text-white/50 uppercase tracking-widest font-semibold">Ticket ID</span>
            <span className="text-[13px] font-mono text-white/80">WC26-MX-084200-F24</span>
          </div>

          {/* Switch Role */}
          <button onClick={onSwitchRole}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] transition-all text-[13px] font-medium">
            <LogOut className="w-4 h-4" /> Switch Role
          </button>
        </div>
      </div>
    </div>
  );
}
