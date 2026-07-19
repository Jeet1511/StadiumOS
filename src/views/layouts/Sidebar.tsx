/**
 * @module Sidebar
 * @description Glass-morphism navigation sidebar with role-adaptive theming.
 * Displays navigation items, role branding, and user profile section.
 *
 * Accessibility: role="navigation", aria-current for active page, keyboard accessible.
 * Performance: React.memo prevents re-renders when props haven't changed.
 *
 * Hackathon Alignment:
 * - 10 navigation features covering all FIFA hackathon challenge areas
 * - Role-adaptive branding (fan, security, organizer, volunteer)
 * - Quick profile access for role switching
 */
import { memo } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { getNavItems, getRoleConfig } from '../../models/constants';
import type { Role } from '../../models/types';

interface SidebarProps {
  /** Current active user role */
  readonly role: Role;
  /** Currently active navigation item ID */
  readonly activeNav: string;
  /** Callback when a navigation item is clicked */
  readonly onNavigate: (id: string) => void;
  /** Callback when the profile section is clicked */
  readonly onProfileClick: () => void;
}

/** Pre-computed border classes for each role accent — avoids dynamic Tailwind class construction */
const roleBorderClasses: Record<Role, string> = {
  fan: 'border-cyan-400/20',
  security: 'border-rose-400/20',
  organizer: 'border-violet-400/20',
  volunteer: 'border-emerald-400/20',
};

/** Pre-computed role subtitles for the profile section */
const roleSubtitles: Record<Role, string> = {
  fan: 'Section 112',
  security: 'Clearance 4',
  organizer: 'Manager',
  volunteer: 'Volunteer',
};

export default memo(function Sidebar({ role, activeNav, onNavigate, onProfileClick }: SidebarProps) {
  const nav = getNavItems(role);
  const rc = getRoleConfig(role);

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-[68px] lg:w-[220px] h-full flex flex-col z-40 relative shadow-[4px_0_24px_rgba(0,0,0,0.2)]"
      style={{ background: 'rgba(18,34,64,0.5)', backdropFilter: 'blur(40px)' }}
      role="navigation"
      aria-label="Stadium operations navigation"
    >
      {/* Right edge line */}
      <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.07] to-white/[0.03]" />

      {/* Logo */}
      <div className="h-[60px] flex items-center justify-center lg:justify-start lg:px-4 relative shrink-0">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className={cn("w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 relative overflow-hidden", roleBorderClasses[role])}>
          <div className="absolute inset-0 animate-glow opacity-25" style={{ background: `radial-gradient(circle, ${rc.accentHex}22, transparent)` }} />
          <rc.icon className={cn("w-4 h-4 relative z-10", rc.accent)} />
        </div>
        <div className="ml-2.5 hidden lg:flex flex-col">
          <span className="font-bold text-[14px] tracking-tight text-white leading-none">
            Stadium<span className="text-white/25 font-light">OS</span>
          </span>
          <span className="text-[8px] text-white/25 uppercase tracking-[0.2em] mt-1 font-semibold">{rc.subtitle}</span>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 py-3 flex flex-col gap-0.5 px-2 overflow-y-auto">
        {nav.map(item => {
          const active = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              id={`nav-${item.id}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                "flex items-center p-2 lg:p-2.5 rounded-xl transition-all duration-200 relative group",
                active ? "bg-white/[0.06] text-white" : "text-white/70 hover:bg-white/[0.03] hover:text-white/80"
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-indicator"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-5 rounded-r-full"
                  style={{ background: rc.accentHex, boxShadow: `0 0 10px ${rc.accentHex}60` }}
                />
              )}
              <item.icon className={cn("w-4 h-4 shrink-0 mx-auto lg:mx-0 lg:ml-1 transition-colors", active && rc.accent)} />
              <span className={cn("ml-2.5 font-medium hidden lg:block text-[12px]", active && "text-white/90")}>{item.label}</span>
              {item.highlight && !active && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full animate-pulse hidden lg:block" style={{ background: rc.accentHex, opacity: 0.4 }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Profile */}
      <div className="px-2 pb-3 relative shrink-0">
        <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <button
          type="button"
          onClick={onProfileClick}
          aria-label="Open user profile and role settings"
          className="flex items-center w-full px-4 py-4 hover:bg-white/[0.05] transition-colors outline-none cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.4)] group-hover:shadow-[0_0_16px_rgba(34,211,238,0.6)] transition-all">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="ml-3 hidden lg:flex flex-col items-start min-w-0">
            <span className="text-[13px] font-bold text-white truncate w-full leading-tight">Alex Ridge</span>
            <span className="text-[10px] text-white/80 font-semibold tracking-wider mt-0.5 uppercase">
              {roleSubtitles[role]}
            </span>
          </div>
        </button>
      </div>
    </motion.aside>
  );
});
