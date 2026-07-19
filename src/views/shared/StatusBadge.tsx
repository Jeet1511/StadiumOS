/**
 * @module StatusBadge
 * @description Reusable status indicator badge with animated pulse dot.
 * Used across panels to show operational status (Online, Live, Active, etc.).
 *
 * Performance: React.memo prevents re-renders when props haven't changed.
 * Accessibility: Status is conveyed through text label (not color alone).
 */
import { memo } from 'react';
import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  /** Status text label */
  readonly label: string;
  /** Badge color theme */
  readonly color?: 'cyan' | 'rose' | 'emerald' | 'violet' | 'amber' | 'green';
  /** Whether to show the animated ping dot */
  readonly pulse?: boolean;
  /** Additional CSS class names */
  readonly className?: string;
}

const colorMap: Record<string, string> = {
  cyan:    'bg-cyan-500/12 border-cyan-500/25 text-cyan-400',
  rose:    'bg-rose-500/12 border-rose-500/25 text-rose-400',
  emerald: 'bg-emerald-500/12 border-emerald-500/25 text-emerald-400',
  violet:  'bg-violet-500/12 border-violet-500/25 text-violet-400',
  amber:   'bg-amber-500/12 border-amber-500/25 text-amber-400',
  green:   'bg-green-500/12 border-green-500/25 text-green-400',
};

const dotMap: Record<string, string> = {
  cyan: 'bg-cyan-400', rose: 'bg-rose-400', emerald: 'bg-emerald-400',
  violet: 'bg-violet-400', amber: 'bg-amber-400', green: 'bg-green-400',
};

export default memo(function StatusBadge({ label, color = 'cyan', pulse = true, className }: StatusBadgeProps) {
  return (
    <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-[0.15em]', colorMap[color], className)} role="status">
      <div className="relative">
        <div className={cn('w-1.5 h-1.5 rounded-full', dotMap[color])} />
        {pulse && <div className={cn('absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping opacity-40', dotMap[color])} />}
      </div>
      {label}
    </div>
  );
});
