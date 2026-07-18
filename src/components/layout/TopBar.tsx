import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Globe, Eye, Bell, MapPin, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { T } from '../../data/animations';
import type { Role, GlobalMode } from '../../types';

export default function TopBar({ onOpenCommandPalette, role: _role, mode }: { onOpenCommandPalette: () => void; role: Role; mode: GlobalMode }) {
  return (
    <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={T.spring}
      className={cn("h-14 w-full bg-[#111827]/80 backdrop-blur-xl border-b flex items-center justify-between px-5 z-30 relative transition-colors duration-1000",
        mode === 'emergency' ? "border-rose-500/20" : "border-white/[0.06]"
      )} role="banner">
      {mode === 'emergency' && <div className="absolute inset-0 bg-rose-500/[0.03] animate-pulse pointer-events-none" />}

      <div className="flex-1 max-w-lg relative z-10">
        <button onClick={onOpenCommandPalette} id="search-trigger" aria-label="Search (Ctrl+K)"
          className="w-full bg-[#1a2438] border border-white/[0.06] rounded-xl pl-4 pr-12 py-2 text-left hover:border-white/[0.1] transition-all group flex items-center relative">
          <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400 mr-3" />
          <span className="text-[12px] text-slate-500 group-hover:text-slate-400 font-medium">Search venue, protocols, or ask AI...</span>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#0f1523] px-1.5 py-0.5 rounded-md border border-white/[0.06]">
            <Command className="w-2.5 h-2.5 text-slate-500" /><span className="text-[9px] font-bold text-slate-500">K</span>
          </div>
        </button>
      </div>

      <div className="flex items-center gap-4 ml-5 relative z-10">
        <AnimatePresence mode="wait">
          {mode === 'emergency' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="hidden md:flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg">
              <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
              <span className="text-[9px] font-bold text-rose-400 tracking-widest uppercase">Protocol Alpha</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase">World Cup 2026</span>
          </div>
          <div className="w-px h-3.5 bg-white/[0.06]" />
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase">Estadio Azteca</span>
          </div>
        </div>
        <div className="w-px h-4 bg-white/[0.06] hidden md:block" />
        <div className="flex items-center gap-0.5">
          {[Globe, Eye, Bell].map((Icon, i) => (
            <button key={i} id={`topbar-${i}`} aria-label={['Language', 'Accessibility', 'Alerts'][i]} className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] transition-colors relative">
              <Icon className="w-4 h-4" />
              {i === 2 && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
