/* View: Sidebar — Glass navigation */
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { getNavItems, getRoleConfig } from '../../models/constants';
import type { Role } from '../../models/types';

interface SidebarProps {
  role: Role;
  activeNav: string;
  onNavigate: (id: string) => void;
  onProfileClick: () => void;
}

export default function Sidebar({ role, activeNav, onNavigate, onProfileClick }: SidebarProps) {
  const nav = getNavItems(role);
  const rc = getRoleConfig(role);

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="w-[68px] lg:w-[220px] h-full flex flex-col z-40 relative"
      style={{ background: 'rgba(4,8,15,0.92)', backdropFilter: 'blur(40px)' }}
      role="navigation"
    >
      {/* Right edge line */}
      <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.07] to-white/[0.03]" />

      {/* Logo */}
      <div className="h-[60px] flex items-center justify-center lg:justify-start lg:px-4 relative shrink-0">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className={cn("w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 relative overflow-hidden", `border-${rc.accent.replace('text-', '')}/20`)}>
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
              onClick={() => onNavigate(item.id)}
              id={`nav-${item.id}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                "flex items-center p-2 lg:p-2.5 rounded-xl transition-all duration-200 relative group",
                active ? "bg-white/[0.06] text-white" : "text-white/30 hover:bg-white/[0.03] hover:text-white/55"
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
        <button onClick={onProfileClick} id="nav-profile" className="flex items-center w-full p-2 lg:p-2.5 rounded-xl hover:bg-white/[0.04] transition-all group mt-2">
          <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto lg:mx-0">
            <User className="w-3.5 h-3.5 text-white/35 group-hover:text-white/60 transition-colors" />
          </div>
          <div className="ml-2.5 hidden lg:flex flex-col text-left">
            <span className="text-[11px] font-medium text-white/60 group-hover:text-white/80 transition-colors">Alex Ridge</span>
            <span className="text-[8px] text-white/20 tracking-[0.15em] uppercase font-semibold mt-0.5">
              {role === 'fan' ? 'Section 112' : role === 'security' ? 'Clearance 4' : role === 'organizer' ? 'Manager' : 'Volunteer'}
            </span>
          </div>
        </button>
      </div>
    </motion.aside>
  );
}
