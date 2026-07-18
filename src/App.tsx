import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from './utils/cn';
import { LAYERS } from './data/layers';
import type { Layer, Role, AppView, GlobalMode } from './types';

import RoleSelection from './components/landing/RoleSelection';
import LeftSidebar from './components/layout/LeftSidebar';
import TopBar from './components/layout/TopBar';
import StadiumCanvas from './components/stadium/StadiumCanvas';
import LiveMatchWidget from './components/stadium/LiveMatchWidget';
import CommandPalette from './components/overlays/CommandPalette';
import ProfileModal from './components/overlays/ProfileModal';

import AIPanel from './components/panels/AIPanel';
import FanWayfindingPanel from './components/panels/FanWayfindingPanel';
import SecurityEmergencyPanel from './components/panels/SecurityEmergencyPanel';
import TicketPanel from './components/panels/TicketPanel';
import TransportPanel from './components/panels/TransportPanel';
import SustainabilityPanel from './components/panels/SustainabilityPanel';
import VolunteerPanel from './components/panels/VolunteerPanel';
import CrowdMatrixPanel from './components/panels/CrowdMatrixPanel';
import AccessibilityPanel from './components/panels/AccessibilityPanel';

function getActivePanel(role: Role, activeNav: string) {
  if (role === 'fan') {
    if (activeNav === 'nav') return <FanWayfindingPanel />;
    if (activeNav === 'ticket') return <TicketPanel />;
    if (activeNav === 'transport') return <TransportPanel />;
    if (activeNav === 'access') return <AccessibilityPanel />;
  }
  if (role === 'security') {
    if (activeNav === 'evac') return <SecurityEmergencyPanel />;
    if (activeNav === 'crowd' || activeNav === 'cctv') return <CrowdMatrixPanel />;
  }
  if (role === 'organizer') {
    if (activeNav === 'sustain') return <SustainabilityPanel />;
    if (activeNav === 'staff') return <CrowdMatrixPanel />;
    if (activeNav === 'overview') return <TransportPanel />;
  }
  if (role === 'volunteer') {
    if (activeNav === 'tasks' || activeNav === 'translate') return <VolunteerPanel />;
    if (activeNav === 'nav') return <FanWayfindingPanel />;
  }
  return <AIPanel role={role} />;
}

export default function App() {
  const [activeLayers, setActiveLayers] = useState<Set<Layer>>(new Set(['ai']));
  const [view, setView] = useState<AppView>('landing');
  const [role, setRole] = useState<Role>('fan');
  const [activeNav, setActiveNav] = useState<string>('home');
  const [globalMode, setGlobalMode] = useState<GlobalMode>('normal');
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setCommandPaletteOpen(o => !o); }
      if (e.key === 'Escape') { setCommandPaletteOpen(false); setProfileOpen(false); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const handleRoleSelect = (r: Role) => {
    setRole(r); setView('main'); setActiveNav('home'); setGlobalMode('normal');
    setActiveLayers(new Set(r === 'security' ? ['security','crowd','ai'] : r === 'organizer' ? ['queue','transportation','ai'] : ['ai','navigation']));
  };

  const handleNavChange = (id: string) => {
    setActiveNav(id);
    const m: Record<string, { mode: GlobalMode; layers: Layer[] }> = {
      evac: { mode: 'emergency', layers: ['security','crowd'] }, nav: { mode: 'normal', layers: ['navigation'] },
      transport: { mode: 'normal', layers: ['transportation'] }, access: { mode: 'normal', layers: ['accessibility'] },
      crowd: { mode: 'normal', layers: ['crowd'] },
    };
    const c = m[id];
    if (c) { setGlobalMode(c.mode); setActiveLayers(new Set(c.layers)); } else { setGlobalMode('normal'); }
  };

  const toggleLayer = (l: Layer) => { setActiveLayers(p => { const n = new Set(p); if (n.has(l)) n.delete(l); else n.add(l); return n; }); };

  if (view === 'landing') return <AnimatePresence mode="wait"><RoleSelection onSelect={handleRoleSelect} /></AnimatePresence>;

  return (
    <div className="flex h-screen w-screen bg-[#0c1220] text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} onAction={handleNavChange} />
      <ProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} role={role} onSwitchRole={() => { setView('landing'); setProfileOpen(false); }} />

      {/* Ambient — subtle warm blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={cn("absolute top-[-10%] left-[10%] w-[40%] h-[40%] rounded-full blur-[180px] transition-colors duration-1000",
          globalMode === 'emergency' ? 'bg-red-600/8' : 'bg-indigo-600/[0.04]')} />
        <div className="absolute bottom-[-10%] right-[10%] w-[35%] h-[35%] rounded-full bg-slate-600/[0.03] blur-[180px]" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <LeftSidebar role={role} activeNav={activeNav} onNavChange={handleNavChange} onProfileClick={() => setProfileOpen(true)} />
        <div className="flex-1 flex flex-col relative min-w-0">
          <TopBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} role={role} mode={globalMode} />
          <div className="flex-1 relative overflow-hidden">
            <StadiumCanvas activeLayers={activeLayers} />
            <LiveMatchWidget />
            {/* Overlay toggles */}
            {/* Compact overlay toggles */}
            <div className="absolute top-4 right-4 z-30 flex gap-1.5 bg-[#131b2c]/90 backdrop-blur-xl border border-white/[0.06] rounded-xl p-1.5 shadow-lg" role="group" aria-label="Map layers">
              {LAYERS.map(layer => {
                const on = activeLayers.has(layer.id);
                return (
                  <button key={layer.id} onClick={() => toggleLayer(layer.id)} id={`layer-${layer.id}`} aria-pressed={on} title={layer.label}
                    className={cn("flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium transition-all",
                      on ? "bg-white/[0.08] text-slate-200" : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                    )}>
                    <layer.icon className={cn("w-3.5 h-3.5", on && "text-indigo-400")} />
                    <span className="hidden xl:inline">{layer.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {getActivePanel(role, activeNav)}
      </div>
    </div>
  );
}