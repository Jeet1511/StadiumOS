import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  label: string;
  color?: 'cyan' | 'rose' | 'emerald' | 'violet' | 'amber' | 'green';
  pulse?: boolean;
  className?: string;
}

const colorMap = {
  cyan:    'bg-cyan-500/12 border-cyan-500/25 text-cyan-400',
  rose:    'bg-rose-500/12 border-rose-500/25 text-rose-400',
  emerald: 'bg-emerald-500/12 border-emerald-500/25 text-emerald-400',
  violet:  'bg-violet-500/12 border-violet-500/25 text-violet-400',
  amber:   'bg-amber-500/12 border-amber-500/25 text-amber-400',
  green:   'bg-green-500/12 border-green-500/25 text-green-400',
};

const dotMap = {
  cyan: 'bg-cyan-400', rose: 'bg-rose-400', emerald: 'bg-emerald-400',
  violet: 'bg-violet-400', amber: 'bg-amber-400', green: 'bg-green-400',
};

export default function StatusBadge({ label, color = 'cyan', pulse = true, className }: StatusBadgeProps) {
  return (
    <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em]', colorMap[color], className)}>
      <div className="relative">
        <div className={cn('w-1.5 h-1.5 rounded-full', dotMap[color])} />
        {pulse && <div className={cn('absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping opacity-40', dotMap[color])} />}
      </div>
      {label}
    </div>
  );
}
