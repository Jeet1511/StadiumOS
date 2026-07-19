/**
 * @module GlassCard
 * @description Reusable glass-morphism card component for the StadiumOS design system.
 * Provides three elevation levels (surface, elevated, float) with consistent
 * styling, rounded corners, and smooth transitions.
 *
 * Performance: React.memo prevents re-renders when props haven't changed.
 * Accessibility: Supports click handlers with cursor feedback.
 */
import { memo } from 'react';
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

type GlassLevel = 'surface' | 'elevated' | 'float';

interface GlassCardProps {
  /** Card content */
  readonly children: ReactNode;
  /** Glass-morphism elevation level */
  readonly level?: GlassLevel;
  /** Additional CSS class names */
  readonly className?: string;
  /** Padding utility class */
  readonly padding?: string;
  /** Optional click handler (adds cursor-pointer and hover effect) */
  readonly onClick?: () => void;
  /** Optional HTML id attribute */
  readonly id?: string;
}

const levelClasses: Record<GlassLevel, string> = {
  surface: 'glass-surface',
  elevated: 'glass-elevated',
  float: 'glass-float',
};

export default memo(function GlassCard({ children, level = 'surface', className, padding = 'p-5', onClick, id }: GlassCardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={cn(
        'rounded-2xl transition-all duration-300',
        levelClasses[level],
        padding,
        onClick && 'cursor-pointer hover:border-white/[0.12]',
        className
      )}
    >
      {children}
    </div>
  );
});
