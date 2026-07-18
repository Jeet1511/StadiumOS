import { motion } from 'framer-motion';
import {
  Home, ShieldAlert, Users, Eye, AlertTriangle, Activity, Map,
  Globe, Sparkles, Ticket, Navigation, Accessibility, Train,
  User, Shield
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { T } from '../../data/animations';
import type { Role } from '../../types';

interface NavItem { id: string; icon: React.ElementType; label: string; highlight?: boolean; }

export default function LeftSidebar({ role, activeNav, onNavChange }: { role: Role; activeNav: string; onNavChange: (id: string) => void }) {
  const getNavItems = (): NavItem[] => {
    const base: NavItem[] = [{ id: 'home', icon: Home, label: 'Home' }];
    if (role === 'security') return [...base, { id: 'ai', icon: ShieldAlert, label: 'Threat Intel', highlight: true }, { id: 'crowd', icon: Users, label: 'Crowd Matrix' }, { id: 'cctv', icon: Eye, label: 'CCTV Feeds' }, { id: 'evac', icon: AlertTriangle, label: 'Evacuation' }];
    if (role === 'organizer') return [...base, { id: 'ai', icon: Activity, label: 'Command AI', highlight: true }, { id: 'overview', icon: Map, label: 'Venue Overview' }, { id: 'staff', icon: Users, label: 'Staff Deploy' }, { id: 'sustain', icon: Globe, label: 'Sustainability' }];
    if (role === 'volunteer') return [...base, { id: 'ai', icon: Sparkles, label: 'Task AI', highlight: true }, { id: 'tasks', icon: AlertTriangle, label: 'My Tasks' }, { id: 'translate', icon: Globe, label: 'Translation' }, { id: 'nav', icon: Navigation, label: 'Wayfinding' }];
    return [...base, { id: 'ai', icon: Sparkles, label: 'FanPilot AI', highlight: true }, { id: 'ticket', icon: Ticket, label: 'My Ticket' }, { id: 'nav', icon: Navigation, label: 'Wayfinding' }, { id: 'access', icon: Accessibility, label: 'Accessibility' }, { id: 'transport', icon: Train, label: 'Transit Hub' }];
  };

  const navItems = getNavItems();
  const roleColors = { security: { accent: 'text-rose-400', bg: 'bg-rose-500', glow: 'rose' }, organizer: { accent: 'text-indigo-400', bg: 'bg-indigo-500', glow: 'indigo' }, volunteer: { accent: 'text-emerald-400', bg: 'bg-emerald-500', glow: 'emerald' }, fan: { accent: 'text-white', bg: 'bg-white', glow: 'white' } };
  const rc = roleColors[role];

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={T.spring}
      className="w-20 lg:w-[260px] h-full bg-black/40 backdrop-blur-2xl border-r border-white/[0.08] flex flex-col z-40 relative"
      role="navigation" aria-label="Main navigation"
    >
      <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/[0.08]">
        <div className={cn("w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0",
          role === 'security' ? "bg-rose-500/15 border-rose-500/25" : role === 'organizer' ? "bg-indigo-500/15 border-indigo-500/25" : role === 'volunteer' ? "bg-emerald-500/15 border-emerald-500/25" : "bg-white/[0.08] border-white/[0.12]"
        )}>
          {role === 'security' ? <Shield className="w-5 h-5 text-rose-400" /> : role === 'organizer' ? <Activity className="w-5 h-5 text-indigo-400" /> : role === 'volunteer' ? <Users className="w-5 h-5 text-emerald-400" /> : <Sparkles className="w-5 h-5 text-white/80" />}
        </div>
        <div className="ml-3 hidden lg:flex flex-col">
          <span className="font-semibold text-[15px] tracking-tight text-white leading-none">Stadium<span className="text-white/40">OS</span></span>
          <span className="text-[10px] text-white/50 uppercase tracking-widest mt-1 font-semibold">
            {role === 'security' ? 'Security Command' : role === 'organizer' ? 'Global Ops' : role === 'volunteer' ? 'Staff Portal' : 'Fan Experience'}
          </span>
        </div>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          const isHighlight = item.highlight && !isActive;
          return (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={item.id}
              onClick={() => onNavChange(item.id)} id={`nav-${item.id}`} aria-label={item.label} aria-current={isActive ? 'page' : undefined}
              className={cn(
                "flex items-center p-3 rounded-xl transition-colors duration-200 group relative",
                isActive ? "bg-white/[0.08] text-white border border-white/[0.08]" : "text-white/50 hover:bg-white/[0.04] hover:text-white/90 border border-transparent",
                isHighlight && `${rc.accent}/70 hover:${rc.accent}`
              )}>
              {isActive && (
                <motion.div layoutId="navIndicator" className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full", rc.bg)} />
              )}
              <item.icon className={cn("w-[18px] h-[18px] flex-shrink-0 ml-1.5 transition-colors", isActive ? rc.accent : "")} />
              <span className="ml-3 font-medium hidden lg:block whitespace-nowrap text-[13px]">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="p-3 border-t border-white/[0.08]">
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} id="nav-profile" aria-label="User profile" className="flex items-center w-full p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group">
          <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
            <User className="w-4 h-4 text-white/60 group-hover:text-white" />
          </div>
          <div className="ml-3 hidden lg:flex flex-col text-left">
            <span className="text-[12px] font-medium text-white/90">Alex Ridge</span>
            <span className="text-[10px] text-white/50 tracking-widest uppercase font-semibold">{role === 'fan' ? 'Section 112' : 'Clearance 4'}</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}
