/* View: Command Palette */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation, Shield, Sparkles, Globe, Ticket, AlertTriangle, Train, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const commands = [
  { id: 'find-seat', icon: Ticket, label: 'Find my seat', category: 'Navigation', color: 'text-amber-400' },
  { id: 'nearest-food', icon: Navigation, label: 'Nearest food court', category: 'Navigation', color: 'text-cyan-400' },
  { id: 'nearest-restroom', icon: Navigation, label: 'Nearest restroom', category: 'Navigation', color: 'text-cyan-400' },
  { id: 'crowd-status', icon: Shield, label: 'Check crowd density', category: 'Operations', color: 'text-rose-400' },
  { id: 'ask-ai', icon: Sparkles, label: 'Ask StadiumOS AI', category: 'AI', color: 'text-violet-400' },
  { id: 'translate', icon: Globe, label: 'Translation assist', category: 'Multilingual', color: 'text-emerald-400' },
  { id: 'emergency', icon: AlertTriangle, label: 'Emergency protocols', category: 'Security', color: 'text-rose-400' },
  { id: 'transport', icon: Train, label: 'Transit connections', category: 'Transport', color: 'text-blue-400' },
];

export default function CommandPalette({ isOpen, onClose, onAction }: { isOpen: boolean; onClose: () => void; onAction: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (isOpen) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 100); } }, [isOpen]);

  const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()) || c.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-lg glass-float rounded-2xl overflow-hidden border-glow-cyan shadow-[0_20px_60px_rgba(0,0,0,0.4)]" onClick={e => e.stopPropagation()}>
            {/* Colorful gradient top bar */}
            <div className="h-[3px] bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500" />
            <div className="p-3 flex items-center gap-3 border-b border-white/[0.06]">
              <Search className="w-4 h-4 text-cyan-400 shrink-0" />
              <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search commands, venues, or ask AI..." className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/30 focus:outline-none" />
              <button onClick={onClose} className="p-1 hover:bg-white/[0.06] rounded-lg transition-colors"><X className="w-3.5 h-3.5 text-white/30" /></button>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1.5">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center"><Sparkles className="w-6 h-6 text-violet-400 mx-auto mb-2" /><div className="text-[12px] text-white/40">No results for "{query}"</div><div className="text-[10px] text-white/20 mt-1">Try asking AI instead</div></div>
              ) : filtered.map(cmd => (
                <button key={cmd.id} onClick={() => { onAction(cmd.id); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all text-left group">
                  <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-white/[0.12] transition-colors"><cmd.icon className={cn("w-3.5 h-3.5", cmd.color)} /></div>
                  <div className="flex-1"><div className="text-[12px] font-medium text-white/80 group-hover:text-white transition-colors">{cmd.label}</div><div className="text-[9px] text-white/25 uppercase tracking-[0.12em] mt-0.5">{cmd.category}</div></div>
                </button>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-[9px] text-white/20">↑↓ Navigate</span><span className="text-[9px] text-white/20">ESC Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
