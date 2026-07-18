import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

type GlassLevel = 'surface' | 'elevated' | 'float';

interface GlassCardProps {
  children: ReactNode;
  level?: GlassLevel;
  className?: string;
  padding?: string;
  onClick?: () => void;
  id?: string;
}

export default function GlassCard({ children, level = 'surface', className, padding = 'p-5', onClick, id }: GlassCardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={cn(
        'rounded-2xl transition-all duration-300',
        level === 'surface' && 'glass-surface',
        level === 'elevated' && 'glass-elevated',
        level === 'float' && 'glass-float',
        padding,
        onClick && 'cursor-pointer hover:border-white/[0.12]',
        className
      )}
    >
      {children}
    </div>
  );
}
