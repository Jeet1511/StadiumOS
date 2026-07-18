import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Globe, Eye, Bell, MapPin, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { T } from '../../data/animations';
import type { Role, GlobalMode } from '../../types';

export default function TopBar({ onOpenCommandPalette, role: _role, mode }: { onOpenCommandPalette: () => void; role: Role; mode: GlobalMode }) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={T.spring}
      className={cn(
        "h-16 w-full bg-black/40 backdrop-blur-2xl border-b flex items-center justify-between px-6 z-30 relative transition-colors duration-1000",
        mode === 'emergency' ? "border-rose-500/25" : "border-white/[0.08]"
      )}
      role="banner"
    >
      {mode === 'emergency' && (
        <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none" />
      )}

      <div className="flex-1 max-w-xl relative z-10">
        <motion.button
          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
          onClick={onOpenCommandPalette}
          id="search-trigger"
          aria-label="Open command palette (Ctrl+K)"
          className="w-full bg-white/[0.04] border border-white/[0.1] rounded-[12px] pl-4 pr-12 py-2.5 text-left focus:outline-none hover:border-white/[0.15] hover:bg-white/[0.06] transition-all group flex items-center"
        >
          <Search className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors mr-3" />
          <span className="text-[13px] text-white/40 group-hover:text-white/60 font-medium transition-colors tracking-wide">
            Search venue, protocols, or ask AI...
          </span>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity bg-black/60 px-2 py-1 rounded-md border border-white/[0.1]">
            <Command className="w-3 h-3 text-white/70" />
            <span className="text-[10px] font-bold text-white/70">K</span>
          </div>
        </motion.button>
      </div>

      <div className="flex items-center gap-5 ml-6 relative z-10">
        <AnimatePresence mode="wait">
          {mode === 'emergency' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="hidden md:flex items-center gap-2 bg-rose-500/15 border border-rose-500/25 px-3 py-1.5 rounded-lg">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span className="text-[10px] font-bold text-rose-400 tracking-widest uppercase">Protocol Alpha</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <span className="text-[11px] font-semibold text-white/60 tracking-widest uppercase">World Cup 2026</span>
          </div>
          <div className="w-px h-4 bg-white/[0.1]" />
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[11px] font-semibold text-white/60 tracking-widest uppercase">Estadio Azteca</span>
          </div>
        </div>
        <div className="w-px h-5 bg-white/[0.1] hidden md:block" />
        <div className="flex items-center gap-1">
          {[Globe, Eye, Bell].map((Icon, i) => (
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={i} id={`topbar-action-${i}`} aria-label={['Language', 'Accessibility', 'Notifications'][i]} className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors relative">
              <Icon className="w-[18px] h-[18px]" />
              {i === 2 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
