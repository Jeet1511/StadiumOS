/* View: App Shell — Main layout grid */
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';
import type { GlobalMode } from '../../models/types';

interface AppShellProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  panel: ReactNode;
  mode: GlobalMode;
}

export default function AppShell({ sidebar, header, children, panel, mode }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen text-slate-200 font-sans overflow-hidden selection:bg-cyan-500/20 relative" style={{ background: '#04080f' }}>
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 25% 25%, rgba(6,182,212,0.025) 0%, transparent 55%), radial-gradient(ellipse at 75% 75%, rgba(139,92,246,0.018) 0%, transparent 55%)' }} />
        <div className={cn(
          "absolute top-[-8%] left-[12%] w-[38%] h-[38%] rounded-full blur-[200px] animate-float transition-colors duration-2000",
          mode === 'emergency' ? 'bg-rose-500/[0.05]' : 'bg-cyan-500/[0.02]'
        )} />
        <div className="absolute bottom-[-8%] right-[12%] w-[32%] h-[32%] rounded-full bg-violet-500/[0.015] blur-[180px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[45%] left-[55%] w-[22%] h-[22%] rounded-full bg-emerald-500/[0.01] blur-[150px] animate-float" style={{ animationDelay: '7s' }} />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.006]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
        {/* Emergency scanline */}
        {mode === 'emergency' && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 h-[300%] bg-gradient-to-b from-transparent via-rose-500/[0.015] to-transparent animate-scanline" />
          </div>
        )}
      </div>

      {/* Layout grid */}
      <div className="relative z-10 flex h-full w-full">
        {sidebar}
        <div className="flex-1 flex flex-col relative min-w-0">
          {header}
          <div className="flex-1 relative overflow-hidden">
            {children}
          </div>
        </div>
        {panel}
      </div>
    </div>
  );
}
