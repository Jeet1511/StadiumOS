/**
 * @module PanelShell
 * @description Shared layout shell for all context panels in the dashboard.
 * Provides the consistent glass-morphism container, left border accent,
 * header section with title/icon, and scrollable content area.
 *
 * Architecture: Eliminates duplication across 8+ panel components by
 * extracting the shared layout pattern into a single reusable component.
 *
 * Accessibility: Semantic region landmark with aria-label for screen readers.
 * Performance: CSS containment via glass-morphism classes.
 */
import { memo } from 'react';
import type { ReactNode } from 'react';

interface PanelShellProps {
  /** Panel content rendered in the scrollable body */
  readonly children: ReactNode;
  /** Header section rendered above the scrollable content */
  readonly header: ReactNode;
  /** Optional accent color for the left border glow (e.g., 'rose') */
  readonly accent?: 'cyan' | 'rose' | 'emerald' | 'violet' | 'sky' | 'blue' | 'amber';
  /** Accessible label for the panel region */
  readonly ariaLabel?: string;
}

const accentBorders: Record<string, string> = {
  cyan: 'from-white/[0.03] via-white/[0.06] to-white/[0.03]',
  rose: 'from-rose-500/[0.05] via-rose-500/[0.1] to-rose-500/[0.05]',
  emerald: 'from-white/[0.03] via-white/[0.06] to-white/[0.03]',
  violet: 'from-white/[0.03] via-white/[0.06] to-white/[0.03]',
  sky: 'from-white/[0.03] via-white/[0.06] to-white/[0.03]',
  blue: 'from-white/[0.03] via-white/[0.06] to-white/[0.03]',
  amber: 'from-white/[0.03] via-white/[0.06] to-white/[0.03]',
};

const PanelShell = memo(function PanelShell({ children, header, accent = 'cyan', ariaLabel }: PanelShellProps) {
  return (
    <div
      className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative shadow-[-4px_0_24px_rgba(0,0,0,0.2)]"
      style={{ background: 'rgba(18,34,64,0.55)', backdropFilter: 'blur(40px)' }}
      role="region"
      aria-label={ariaLabel}
    >
      {/* Left border accent */}
      <div className={`absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b ${accentBorders[accent] ?? accentBorders.cyan}`} />

      {/* Header */}
      <div className="p-4 flex items-center justify-between shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        {header}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
        {children}
      </div>
    </div>
  );
});

export default PanelShell;
