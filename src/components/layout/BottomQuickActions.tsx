import { Ticket, Coffee, Bath, AlertTriangle, Volume2, Train } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function BottomQuickActions({ onAction }: { onAction: (id: string) => void }) {
  const actions = [
    { id: 'seat', icon: Ticket, label: 'My Seat' },
    { id: 'food', icon: Coffee, label: 'Food' },
    { id: 'restroom', icon: Bath, label: 'Restrooms' },
    { id: 'emergency', icon: AlertTriangle, label: 'Emergency', isDanger: true },
    { id: 'translate', icon: Volume2, label: 'Translate' },
    { id: 'transport', icon: Train, label: 'Transport' },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4 flex justify-center">
      <div className="bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 flex items-center gap-1 shadow-[0_16px_40px_rgba(0,0,0,0.6)]" role="toolbar" aria-label="Quick actions">
        {actions.map((action) => (
          <button key={action.id} id={`quick-${action.id}`} aria-label={action.label}
            onClick={() => onAction(action.id)}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 px-5 py-3 min-w-[90px] rounded-xl transition-all duration-200 group",
              action.isDanger ? "hover:bg-red-500/15" : "hover:bg-white/[0.08] hover:-translate-y-0.5"
            )}>
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              action.isDanger ? "bg-red-500/15 text-red-400 group-hover:bg-red-500/25" : "bg-white/[0.06] text-white/50 group-hover:bg-white/[0.12] group-hover:text-white"
            )}>
              <action.icon className="w-4 h-4" />
            </div>
            <span className={cn(
              "text-[10px] font-semibold uppercase tracking-widest transition-colors",
              action.isDanger ? "text-red-400/80" : "text-white/50 group-hover:text-white/90"
            )}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
