import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from './utils/cn';
import { LAYERS } from './data/layers';
import type { Layer, Role, AppView, GlobalMode } from './types';

// Components
import RoleSelection from './components/landing/RoleSelection';
import LeftSidebar from './components/layout/LeftSidebar';
import TopBar from './components/layout/TopBar';
import BottomQuickActions from './components/layout/BottomQuickActions';
import StadiumCanvas from './components/stadium/StadiumCanvas';
import LiveMatchWidget from './components/stadium/LiveMatchWidget';
import CommandPalette from './components/overlays/CommandPalette';

// Panels
import AIPanel from './components/panels/AIPanel';
import FanWayfindingPanel from './components/panels/FanWayfindingPanel';
import SecurityEmergencyPanel from './components/panels/SecurityEmergencyPanel';
import TicketPanel from './components/panels/TicketPanel';
import TransportPanel from './components/panels/TransportPanel';
import SustainabilityPanel from './components/panels/SustainabilityPanel';
import VolunteerPanel from './components/panels/VolunteerPanel';
import CrowdMatrixPanel from './components/panels/CrowdMatrixPanel';
import AccessibilityPanel from './components/panels/AccessibilityPanel';

// Resolve which panel to show based on role + active nav
function getActivePanel(role: Role, activeNav: string) {
  // Fan panels
  if (role === 'fan') {
    if (activeNav === 'nav') return <FanWayfindingPanel />;
    if (activeNav === 'ticket') return <TicketPanel />;
    if (activeNav === 'transport') return <TransportPanel />;
    if (activeNav === 'access') return <AccessibilityPanel />;
  }
  // Security panels
  if (role === 'security') {
    if (activeNav === 'evac') return <SecurityEmergencyPanel />;
    if (activeNav === 'crowd') return <CrowdMatrixPanel />;
  }
  // Organizer panels
  if (role === 'organizer') {
    if (activeNav === 'sustain') return <SustainabilityPanel />;
    if (activeNav === 'staff') return <CrowdMatrixPanel />;
    if (activeNav === 'overview') return <TransportPanel />;
  }
  // Volunteer panels
  if (role === 'volunteer') {
    if (activeNav === 'tasks') return <VolunteerPanel />;
    if (activeNav === 'translate') return <VolunteerPanel />;
    if (activeNav === 'nav') return <FanWayfindingPanel />;
  }
  // Default: AI panel (works for all roles)
  return <AIPanel role={role} />;
}

export default function App() {
  const [activeLayers, setActiveLayers] = useState<Set<Layer>>(new Set(['ai']));
  const [view, setView] = useState<AppView>('landing');
  const [role, setRole] = useState<Role>('fan');
  const [activeNav, setActiveNav] = useState<string>('home');
  const [globalMode, setGlobalMode] = useState<GlobalMode>('normal');
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen(o => !o);
      }
      if (e.key === 'Escape') setCommandPaletteOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setView('main');
    setActiveNav('home');
    setGlobalMode('normal');
    if (selectedRole === 'security') {
      setActiveLayers(new Set(['security', 'crowd', 'ai']));
    } else if (selectedRole === 'organizer') {
      setActiveLayers(new Set(['queue', 'transportation', 'ai']));
    } else {
      setActiveLayers(new Set(['ai', 'navigation']));
    }
  };

  const handleNavChange = (id: string) => {
    setActiveNav(id);
    if (id === 'evac' && role === 'security') {
      setGlobalMode('emergency');
      setActiveLayers(new Set(['security', 'crowd']));
    } else if (id === 'nav' && (role === 'fan' || role === 'volunteer')) {
      setGlobalMode('normal');
      setActiveLayers(new Set(['navigation']));
    } else if (id === 'transport') {
      setGlobalMode('normal');
      setActiveLayers(new Set(['transportation']));
    } else if (id === 'access') {
      setGlobalMode('normal');
      setActiveLayers(new Set(['accessibility']));
    } else if (id === 'crowd') {
      setGlobalMode('normal');
      setActiveLayers(new Set(['crowd']));
    } else {
      setGlobalMode('normal');
    }
  };

  const handleCommandAction = (navId: string) => {
    handleNavChange(navId);
  };

  const toggleLayer = (layer: Layer) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(layer)) next.delete(layer);
      else next.add(layer);
      return next;
    });
  };

  if (view === 'landing') {
    return (
      <AnimatePresence mode="wait">
        <RoleSelection onSelect={handleRoleSelect} />
      </AnimatePresence>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#050505] text-white/90 font-sans overflow-hidden selection:bg-blue-500/30 relative">
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} onAction={handleCommandAction} />
      
      {/* Ambient background lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-1000">
        <div className={cn("absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] mix-blend-screen transition-colors duration-1000", globalMode === 'emergency' ? 'bg-red-600/10' : 'bg-blue-600/5')} />
        <div className={cn("absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] mix-blend-screen transition-colors duration-1000", globalMode === 'emergency' ? 'bg-red-400/5' : 'bg-blue-400/5')} />
        <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-[100px]" />
      </div>

      <div className="relative z-10 flex h-full w-full">
        <LeftSidebar role={role} activeNav={activeNav} onNavChange={handleNavChange} />
        <div className="flex-1 flex flex-col relative min-w-0">
          <TopBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} role={role} mode={globalMode} />
          <div className="flex-1 relative overflow-hidden">
            <StadiumCanvas activeLayers={activeLayers} />
            <LiveMatchWidget />
            {/* Layer toggle panel */}
            <div className="absolute top-8 right-8 z-30 bg-white/[0.01] backdrop-blur-3xl border border-white/[0.08] rounded-[24px] p-2 flex flex-col gap-1 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]" role="group" aria-label="Map layer toggles">
               <div className="px-4 py-3 border-b border-white/[0.05] mb-2 flex items-center justify-between">
                 <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">Global Overlays</span>
               </div>
               {LAYERS.map(layer => {
                 const isActive = activeLayers.has(layer.id);
                 return (
                   <button
                     key={layer.id}
                     onClick={() => toggleLayer(layer.id)}
                     id={`layer-${layer.id}`}
                     aria-label={`Toggle ${layer.label} layer`}
                     aria-pressed={isActive}
                     className={cn(
                       "flex items-center gap-3 px-4 py-3 rounded-[16px] text-[12px] font-medium transition-all",
                       isActive 
                         ? layer.id === 'ai' 
                            ? "bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
                            : "bg-white/[0.06] text-white/90 border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" 
                         : "text-white/40 hover:bg-white/[0.03] hover:text-white/80 border border-transparent"
                     )}
                   >
                     <layer.icon className={cn("w-4 h-4", isActive ? (layer.id === 'ai' ? "text-purple-400" : "text-white/90") : "")} />
                     {layer.label}
                   </button>
                 );
               })}
            </div>
            <BottomQuickActions />
          </div>
        </div>
        {getActivePanel(role, activeNav)}
      </div>
    </div>
  );
}