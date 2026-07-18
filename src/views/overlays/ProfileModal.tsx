/* View: Profile Modal */
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Shield, Clock, Smartphone, X, LogOut } from 'lucide-react';
import { getRoleConfig } from '../../models/constants';
import { cn } from '../../utils/cn';
import type { Role } from '../../models/types';
import GlassCard from '../shared/GlassCard';

export default function ProfileModal({ isOpen, onClose, role, onSwitchRole }: { isOpen: boolean; onClose: () => void; role: Role; onSwitchRole: () => void }) {
  const rc = getRoleConfig(role);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-sm glass-float rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]" onClick={e => e.stopPropagation()}>
            {/* Gradient header */}
            <div className={cn("h-[3px] bg-gradient-to-r", role === 'fan' ? 'from-cyan-500 to-sky-500' : role === 'security' ? 'from-rose-500 to-pink-500' : role === 'organizer' ? 'from-violet-500 to-purple-500' : 'from-emerald-500 to-green-500')} />
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-bold text-white">Profile</h2>
                <button onClick={onClose} className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-colors"><X className="w-4 h-4 text-white/30" /></button>
              </div>
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-5">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border-2", `border-${rc.accent.replace('text-', '')}/30`)}>
                  <User className={cn("w-6 h-6", rc.accent)} />
                </div>
                <div><div className="text-[15px] font-bold text-white">Alex Ridge</div><div className="text-[11px] text-white/40 mt-0.5">{rc.title}</div></div>
              </div>
              {/* Info grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { icon: MapPin, label: 'Venue', value: 'Estadio Azteca' },
                  { icon: Shield, label: 'Access', value: role === 'security' ? 'Level 4' : role === 'organizer' ? 'Full' : 'Standard' },
                  { icon: Clock, label: 'Session', value: '2h 45m' },
                  { icon: Smartphone, label: 'Device', value: 'Verified' },
                ].map(item => (
                  <GlassCard key={item.label} padding="p-2.5">
                    <div className="flex items-center gap-2"><item.icon className="w-3 h-3 text-white/30" /><span className="text-[9px] text-white/30 uppercase tracking-[0.12em] font-semibold">{item.label}</span></div>
                    <div className="text-[12px] font-medium text-white/70 mt-1">{item.value}</div>
                  </GlassCard>
                ))}
              </div>
              {/* Switch role */}
              <button onClick={onSwitchRole} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-white/50 hover:text-white/80 transition-all text-[12px] font-medium">
                <LogOut className="w-3.5 h-3.5" /> Switch Role
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
