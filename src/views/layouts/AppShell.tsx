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
    <div className="flex h-screen w-screen text-slate-200 font-sans overflow-hidden selection:bg-cyan-500/20 relative pt-[48px]" style={{ background: 'linear-gradient(145deg, #080e1e 0%, #0c1a30 40%, #0a1428 100%)' }}>
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none mt-[48px]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 25% 25%, rgba(6,182,212,0.06) 0%, transparent 50%), radial-gradient(ellipse at 75% 75%, rgba(139,92,246,0.05) 0%, transparent 50%)' }} />
        <div className={cn(
          "absolute top-[10%] left-[15%] w-[45vw] h-[45vw] rounded-full blur-[180px] animate-float transition-colors duration-2000",
          mode === 'emergency' ? 'bg-rose-500/[0.08]' : 'bg-cyan-500/[0.06]'
        )} />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-violet-500/[0.05] blur-[200px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] left-[60%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/[0.04] blur-[150px] animate-float" style={{ animationDelay: '5s' }} />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
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
