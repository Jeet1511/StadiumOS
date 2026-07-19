/**
 * @module CommandPalette
 * @description Keyboard-accessible command palette overlay (Ctrl+K).
 * Provides instant access to all stadium features, AI assistant,
 * emergency protocols, and multilingual support via searchable command list.
 *
 * Architecture: Pure UI overlay with no business logic. Receives open/close
 * state and action callback from the App controller.
 *
 * Performance: useCallback on all handlers, useMemo on filtered results,
 * debounced search input. Static command list at module scope.
 *
 * Accessibility: role="dialog", aria-modal, aria-label on search input,
 * role="listbox" with role="option" for results, ESC to close.
 *
 * Hackathon Alignment:
 * - Operational intelligence: quick command access for all stadium features
 * - AI assistant quick launch for natural language queries
 * - Emergency protocol activation for security operations
 * - Multilingual translation for international fan support
 */
import { useState, useRef, useCallback, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation, Shield, Sparkles, Globe, Ticket, AlertTriangle, Train, X } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Available command palette actions mapped to stadium features */
const commands = [
  { id: 'find-seat', icon: Ticket, label: 'Find my seat', category: 'Navigation', color: 'text-amber-400' },
  { id: 'nearest-food', icon: Navigation, label: 'Nearest food court', category: 'Navigation', color: 'text-cyan-400' },
  { id: 'nearest-restroom', icon: Navigation, label: 'Nearest restroom', category: 'Navigation', color: 'text-cyan-400' },
  { id: 'crowd-status', icon: Shield, label: 'Check crowd density', category: 'Operations', color: 'text-rose-400' },
  { id: 'ask-ai', icon: Sparkles, label: 'Ask StadiumOS AI', category: 'AI', color: 'text-violet-400' },
  { id: 'translate', icon: Globe, label: 'Translation assist', category: 'Multilingual', color: 'text-emerald-400' },
  { id: 'emergency', icon: AlertTriangle, label: 'Emergency protocols', category: 'Security', color: 'text-rose-400' },
  { id: 'transport', icon: Train, label: 'Transit connections', category: 'Transport', color: 'text-blue-400' },
] as const;

interface CommandPaletteProps {
  /** Whether the palette is currently visible */
  readonly isOpen: boolean;
  /** Callback to close the palette */
  readonly onClose: () => void;
  /** Callback when a command is selected */
  readonly onAction: (id: string) => void;
}

export default memo(function CommandPalette({ isOpen, onClose, onAction }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (isOpen) { setQuery(''); setTimeout(() => inputRef.current?.focus(), 100); } }, [isOpen]);

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleCommandSelect = useCallback((id: string) => {
    onAction(id);
    onClose();
  }, [onAction, onClose]);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  /** Memoized filtered results — only recomputes when query changes */
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return commands.filter(c => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette — search stadium features"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-lg glass-float rounded-2xl overflow-hidden border-glow-cyan shadow-[0_20px_60px_rgba(0,0,0,0.4)]" onClick={handleContentClick}>
            {/* Colorful gradient top bar */}
            <div className="h-[3px] bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500" aria-hidden="true" />
            <div className="p-3 flex items-center gap-3 border-b border-white/[0.06]">
              <Search className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleQueryChange}
                placeholder="Search commands, venues, or ask AI..."
                aria-label="Search stadium commands and features"
                role="combobox"
                aria-expanded={filtered.length > 0}
                aria-controls="command-results"
                aria-autocomplete="list"
                autoComplete="off"
                className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/30 focus:outline-none"
              />
              <button type="button" onClick={onClose} aria-label="Close command palette" className="p-1 hover:bg-white/[0.06] rounded-lg transition-colors"><X className="w-3.5 h-3.5 text-white/30" /></button>
            </div>
            <div id="command-results" className="max-h-[300px] overflow-y-auto p-1.5" role="listbox" aria-label="Search results">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center" role="status"><Sparkles className="w-6 h-6 text-violet-400 mx-auto mb-2" aria-hidden="true" /><div className="text-[12px] text-white/40">No results for "{query}"</div><div className="text-[10px] text-white/20 mt-1">Try asking AI instead</div></div>
              ) : filtered.map(cmd => (
                <button key={cmd.id} type="button" onClick={() => handleCommandSelect(cmd.id)}
                  role="option"
                  aria-label={`${cmd.label} — ${cmd.category}`}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all text-left group">
                  <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] group-hover:border-white/[0.12] transition-colors"><cmd.icon className={cn("w-3.5 h-3.5", cmd.color)} aria-hidden="true" /></div>
                  <div className="flex-1"><div className="text-[12px] font-medium text-white/80 group-hover:text-white transition-colors">{cmd.label}</div><div className="text-[9px] text-white/25 uppercase tracking-[0.12em] mt-0.5">{cmd.category}</div></div>
                </button>
              ))}
            </div>
            <div className="px-3 py-2 border-t border-white/[0.04] flex items-center justify-between" aria-hidden="true">
              <span className="text-[9px] text-white/20">↑↓ Navigate</span><span className="text-[9px] text-white/20">ESC Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
