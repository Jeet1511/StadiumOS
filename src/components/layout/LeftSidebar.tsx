import { motion } from 'framer-motion';
import { Home, ShieldAlert, Users, Eye, AlertTriangle, Activity, Map, Globe, Sparkles, Ticket, Navigation, Accessibility, Train, User, Shield } from 'lucide-react';
import { cn } from '../../utils/cn';
import { T } from '../../data/animations';
import type { Role } from '../../types';

interface NavItem { id: string; icon: React.ElementType; label: string; highlight?: boolean }

export default function LeftSidebar({ role, activeNav, onNavChange, onProfileClick }: { role: Role; activeNav: string; onNavChange: (id: string) => void; onProfileClick?: () => void }) {
  const getNav = (): NavItem[] => {
    const b: NavItem[] = [{ id: 'home', icon: Home, label: 'Home' }];
    if (role === 'security') return [...b, { id: 'ai', icon: ShieldAlert, label: 'Threat Intel', highlight: true }, { id: 'crowd', icon: Users, label: 'Crowd Matrix' }, { id: 'cctv', icon: Eye, label: 'CCTV Feeds' }, { id: 'evac', icon: AlertTriangle, label: 'Evacuation' }];
    if (role === 'organizer') return [...b, { id: 'ai', icon: Activity, label: 'Command AI', highlight: true }, { id: 'overview', icon: Map, label: 'Venue Overview' }, { id: 'staff', icon: Users, label: 'Staff Deploy' }, { id: 'sustain', icon: Globe, label: 'Sustainability' }];
    if (role === 'volunteer') return [...b, { id: 'ai', icon: Sparkles, label: 'Task AI', highlight: true }, { id: 'tasks', icon: AlertTriangle, label: 'My Tasks' }, { id: 'translate', icon: Globe, label: 'Translation' }, { id: 'nav', icon: Navigation, label: 'Wayfinding' }];
    return [...b, { id: 'ai', icon: Sparkles, label: 'FanPilot AI', highlight: true }, { id: 'ticket', icon: Ticket, label: 'My Ticket' }, { id: 'nav', icon: Navigation, label: 'Wayfinding' }, { id: 'access', icon: Accessibility, label: 'Accessibility' }, { id: 'transport', icon: Train, label: 'Transit Hub' }];
  };
  const nav = getNav();
  const rc: Record<Role, { accent: string; bg: string }> = { security: { accent: 'text-rose-400', bg: 'bg-rose-500' }, organizer: { accent: 'text-indigo-400', bg: 'bg-indigo-500' }, volunteer: { accent: 'text-emerald-400', bg: 'bg-emerald-500' }, fan: { accent: 'text-indigo-400', bg: 'bg-indigo-500' } };

  return (
    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={T.spring}
      className="w-20 lg:w-[240px] h-full bg-[#111827]/80 backdrop-blur-xl border-r border-white/[0.06] flex flex-col z-40" role="navigation">

      <div className="h-14 flex items-center justify-center lg:justify-start lg:px-5 border-b border-white/[0.06]">
        <div className={cn("w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0",
          role === 'security' ? "bg-rose-500/10 border-rose-500/20" : role === 'organizer' ? "bg-indigo-500/10 border-indigo-500/20" : role === 'volunteer' ? "bg-emerald-500/10 border-emerald-500/20" : "bg-indigo-500/10 border-indigo-500/20"
        )}>
          {role === 'security' ? <Shield className="w-4 h-4 text-rose-400" /> : role === 'organizer' ? <Activity className="w-4 h-4 text-indigo-400" /> : role === 'volunteer' ? <Users className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4 text-indigo-400" />}
        </div>
        <div className="ml-3 hidden lg:flex flex-col">
          <span className="font-semibold text-[14px] tracking-tight text-slate-200 leading-none">Stadium<span className="text-slate-500">OS</span></span>
          <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-1 font-semibold">
            {role === 'security' ? 'Security' : role === 'organizer' ? 'Operations' : role === 'volunteer' ? 'Staff' : 'Fan Experience'}
          </span>
        </div>
      </div>

      <div className="flex-1 py-4 flex flex-col gap-0.5 px-2.5 overflow-y-auto">
        {nav.map(item => {
          const active = activeNav === item.id;
          return (
            <button key={item.id} onClick={() => onNavChange(item.id)} id={`nav-${item.id}`} aria-current={active ? 'page' : undefined}
              className={cn("flex items-center p-2.5 rounded-lg transition-all duration-150 relative",
                active ? "bg-white/[0.06] text-slate-100" : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
              )}>
              {active && <motion.div layoutId="nav" className={cn("absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full", rc[role].bg)} />}
              <item.icon className={cn("w-[16px] h-[16px] flex-shrink-0 ml-1", active ? rc[role].accent : "")} />
              <span className="ml-3 font-medium hidden lg:block text-[12px]">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-2.5 border-t border-white/[0.06]">
        <button onClick={onProfileClick} id="nav-profile" className="flex items-center w-full p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group">
          <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
          </div>
          <div className="ml-3 hidden lg:flex flex-col text-left">
            <span className="text-[11px] font-medium text-slate-300">Alex Ridge</span>
            <span className="text-[9px] text-slate-500 tracking-widest uppercase font-semibold">{role === 'fan' ? 'Section 112' : 'Clearance 4'}</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
