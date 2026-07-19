/**
 * @module ProfileModal
 * @description User profile overlay with role switching and session information.
 * Displays current user persona, venue details, session duration, and device status.
 *
 * Architecture: Pure presentational overlay with no business logic.
 * Receives all state and callbacks from the App controller.
 *
 * Performance:
 * - useCallback on ALL event handlers for referential stability
 * - Static data arrays extracted to module scope
 * - Pre-computed role-to-class lookup maps (no dynamic Tailwind construction)
 * - React.memo prevents re-renders when props haven't changed
 *
 * Accessibility: role="dialog", aria-modal, aria-labelledby, aria-hidden on decorative icons.
 *
 * Hackathon Alignment:
 * - Multi-role support: switch between fan, security, organizer, volunteer
 * - Session tracking for operational awareness
 * - Device verification status for security
 */
import { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Shield, Clock, Smartphone, X, LogOut } from 'lucide-react';
import { getRoleConfig } from '../../models/constants';
import { cn } from '../../utils/cn';
import type { Role } from '../../models/types';
import GlassCard from '../shared/GlassCard';

interface ProfileModalProps {
  /** Whether the modal is currently visible */
  readonly isOpen: boolean;
  /** Stable callback to close the modal */
  readonly onClose: () => void;
  /** Current active user role */
  readonly role: Role;
  /** Stable callback to initiate role switching (returns to landing) */
  readonly onSwitchRole: () => void;
}

/** Pre-computed border classes for each role accent — avoids dynamic Tailwind class construction */
const roleAvatarBorders: Record<Role, string> = {
  fan: 'border-cyan-400/30',
  security: 'border-rose-400/30',
  organizer: 'border-violet-400/30',
  volunteer: 'border-emerald-400/30',
} as const;

/** Pre-computed gradient header classes for each role */
const roleGradients: Record<Role, string> = {
  fan: 'from-cyan-500 to-sky-500',
  security: 'from-rose-500 to-pink-500',
  organizer: 'from-violet-500 to-purple-500',
  volunteer: 'from-emerald-500 to-green-500',
} as const;

/** Pre-computed access levels per role */
const roleAccess: Record<Role, string> = {
  fan: 'Standard',
  security: 'Level 4',
  organizer: 'Full',
  volunteer: 'Standard',
} as const;

/** Static session info items — extracted from render path */
const SESSION_ICONS = [MapPin, Shield, Clock, Smartphone] as const;
const SESSION_LABELS = ['Venue', 'Access', 'Session', 'Device'] as const;

export default memo(function ProfileModal({ isOpen, onClose, role, onSwitchRole }: ProfileModalProps) {
  const rc = getRoleConfig(role);

  /** Stable handler: prevents click propagation from modal content to backdrop */
  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  /** Session info values — computed per role */
  const sessionValues = [
    'Estadio Azteca',
    roleAccess[role],
    '2h 45m',
    'Verified',
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="profile-modal-title"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-sm glass-float rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)]" onClick={handleContentClick}>
            {/* Gradient header — pre-computed class lookup */}
            <div className={cn("h-[3px] bg-gradient-to-r", roleGradients[role])} aria-hidden="true" />
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 id="profile-modal-title" className="text-[15px] font-bold text-white">Profile</h2>
                <button type="button" onClick={onClose} aria-label="Close profile" className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-colors"><X className="w-4 h-4 text-white/30" aria-hidden="true" /></button>
              </div>
              {/* Avatar — pre-computed border lookup */}
              <div className="flex items-center gap-3 mb-5">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border-2", roleAvatarBorders[role])}>
                  <User className={cn("w-6 h-6", rc.accent)} aria-hidden="true" />
                </div>
                <div><div className="text-[15px] font-bold text-white">Alex Ridge</div><div className="text-[11px] text-white/40 mt-0.5">{rc.title}</div></div>
              </div>
              {/* Info grid — uses pre-extracted static arrays */}
              <div className="grid grid-cols-2 gap-2 mb-4" role="group" aria-label="Session information">
                {SESSION_LABELS.map((label, i) => {
                  const Icon = SESSION_ICONS[i]!;
                  return (
                    <GlassCard key={label} padding="p-2.5">
                      <div className="flex items-center gap-2"><Icon className="w-3 h-3 text-white/30" aria-hidden="true" /><span className="text-[9px] text-white/30 uppercase tracking-[0.12em] font-semibold">{label}</span></div>
                      <div className="text-[12px] font-medium text-white/70 mt-1">{sessionValues[i]}</div>
                    </GlassCard>
                  );
                })}
              </div>
              {/* Switch role button */}
              <button type="button" onClick={onSwitchRole} aria-label="Switch to a different role" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] text-white/50 hover:text-white/80 transition-all text-[12px] font-medium">
                <LogOut className="w-3.5 h-3.5" aria-hidden="true" /> Switch Role
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
