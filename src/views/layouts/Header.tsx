/* View: Header — Top status bar */
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Globe, Eye, Bell, MapPin, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { GlobalMode } from '../../models/types';

interface HeaderProps {
  mode: GlobalMode;
  onOpenSearch: () => void;
}

export default function Header({ mode, onOpenSearch }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-[52px] w-full flex items-center justify-between px-4 z-30 relative shrink-0 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
      style={{ background: 'rgba(18,34,64,0.4)', backdropFilter: 'blur(40px)' }}
    >
      {/* Bottom border */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-px transition-colors duration-700",
        mode === 'emergency' ? "bg-gradient-to-r from-transparent via-rose-500/25 to-transparent" : "bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
      )} />
      {mode === 'emergency' && <div className="absolute inset-0 bg-rose-500/[0.015] animate-pulse pointer-events-none" />}

      {/* Search */}
      <div className="flex-1 max-w-md">
        <button onClick={onOpenSearch} id="search-trigger" aria-label="Search (Ctrl+K)"
          className="w-full rounded-xl pl-3.5 pr-10 py-1.5 text-left group flex items-center bg-white/[0.025] border border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all">
          <Search className="w-3.5 h-3.5 text-white/25 group-hover:text-white/40 mr-2.5 shrink-0" />
          <span className="text-[12px] text-white/25 group-hover:text-white/40 font-medium truncate">Search venue, protocols, or ask AI...</span>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-white/[0.035] px-1.5 py-0.5 rounded-md border border-white/[0.05]">
            <Command className="w-2.5 h-2.5 text-white/25" /><span className="text-[9px] font-bold text-white/25">K</span>
          </div>
        </button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 ml-4">
        <AnimatePresence mode="wait">
          {mode === 'emergency' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="hidden md:flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-xl border-glow-rose">
              <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
              <span className="text-[9px] font-bold text-rose-400 tracking-[0.18em] uppercase">Protocol Alpha</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
              <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping opacity-30" />
            </div>
            <span className="text-[9px] font-semibold text-white/30 tracking-[0.15em] uppercase">World Cup 2026</span>
          </div>
          <div className="w-px h-3 bg-white/[0.05]" />
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-white/25" />
            <span className="text-[9px] font-semibold text-white/30 tracking-[0.15em] uppercase">Estadio Azteca</span>
          </div>
        </div>

        <div className="w-px h-3.5 bg-white/[0.05] hidden md:block" />

        {/* Icons */}
        <div className="flex items-center gap-0">
          {[Globe, Eye, Bell].map((Icon, i) => (
            <button key={i} id={`topbar-action-${i}`} aria-label={['Language', 'Accessibility', 'Alerts'][i]}
              className="p-2 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/[0.04] transition-all relative">
              <Icon className="w-3.5 h-3.5" />
              {i === 2 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_5px_rgba(251,113,133,0.5)]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
