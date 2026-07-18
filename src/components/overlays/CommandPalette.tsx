import { useState, useMemo } from 'react';
import { Search, Navigation, ShieldAlert, Users, Volume2, Sparkles, Train, Accessibility, HeartPulse } from 'lucide-react';

interface CommandAction {
  icon: React.ElementType;
  label: string;
  desc: string;
  action: string; // nav target id
}

const ALL_ACTIONS: CommandAction[] = [
  { icon: Navigation, label: 'Find nearest accessible exit', desc: 'Wayfinding', action: 'nav' },
  { icon: ShieldAlert, label: 'Trigger Evacuation Protocol Alpha', desc: 'Security', action: 'evac' },
  { icon: Users, label: 'Redistribute staff to North Gate', desc: 'Operations', action: 'staff' },
  { icon: Volume2, label: 'Broadcast multilingual announcement', desc: 'Communications', action: 'translate' },
  { icon: Sparkles, label: 'Ask AI for crowd prediction', desc: 'AI Intelligence', action: 'ai' },
  { icon: Train, label: 'Check transport status', desc: 'Transportation', action: 'transport' },
  { icon: Accessibility, label: 'Find wheelchair accessible route', desc: 'Accessibility', action: 'access' },
  { icon: HeartPulse, label: 'Locate nearest medical station', desc: 'Medical', action: 'ai' },
];

// Based on App.tsx lines 158-198 — same visual design, now with working search + action execution
export default function CommandPalette({ isOpen, onClose, onAction }: { isOpen: boolean; onClose: () => void; onAction: (navId: string) => void }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return ALL_ACTIONS;
    const q = query.toLowerCase();
    return ALL_ACTIONS.filter(a =>
      a.label.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = (action: CommandAction) => {
    onAction(action.action);
    setQuery('');
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && filtered.length > 0) {
      handleSelect(filtered[0]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-[#050505]/60 backdrop-blur-md transition-opacity" role="dialog" aria-label="Command palette" aria-modal="true">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/[0.1] rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-6 py-5 border-b border-white/[0.08]">
          <Search className="w-5 h-5 text-white/40 mr-4" />
          <input 
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search venue, trigger protocols, or ask AI..." 
            id="command-palette-input"
            aria-label="Search commands"
            className="flex-1 bg-transparent border-none text-white/90 text-lg focus:outline-none placeholder:text-white/30"
          />
          <div className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.05] rounded-[6px] border border-white/[0.1]">
            <span className="text-[10px] text-white/40 font-semibold tracking-widest">ESC</span>
          </div>
        </div>
        <div className="p-4 max-h-[400px] overflow-y-auto">
          <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-4 mb-2">
            {query ? `${filtered.length} Results` : 'Suggested Actions'}
          </div>
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-[13px] text-white/30">No matching commands found.</div>
          )}
          {filtered.map((action, i) => (
            <button
              key={i}
              onClick={() => handleSelect(action)}
              className="w-full flex items-center px-4 py-3 rounded-[16px] hover:bg-white/[0.04] transition-colors group text-left"
            >
              <div className="p-2 bg-white/[0.03] rounded-[10px] border border-white/[0.05] group-hover:bg-white/[0.08] transition-colors">
                <action.icon className="w-4 h-4 text-white/50 group-hover:text-white/90" />
              </div>
              <div className="ml-4 flex-1">
                <div className="text-[14px] font-medium text-white/80 group-hover:text-white">{action.label}</div>
                <div className="text-[11px] text-white/40 mt-0.5">{action.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
