/* ═══════════════════════════════════════════════════════
   StadiumOS — Root Application
   Thin router wiring Controllers → Views (MVC pattern)
   ═══════════════════════════════════════════════════════ */

import { AnimatePresence } from 'framer-motion';
import { useAppState } from './controllers/useAppState';
import { LAYERS } from './models/constants';
import { cn } from './utils/cn';

// Views — Layouts
import AppShell from './views/layouts/AppShell';
import Sidebar from './views/layouts/Sidebar';
import Header from './views/layouts/Header';

// Views — Pages
import Landing from './views/pages/Landing';
import { getActivePanel } from './views/pages/Dashboard';

// Views — Widgets
import StadiumMap from './views/widgets/StadiumMap';
import MatchTicker from './views/widgets/MatchTicker';

// Views — Overlays
import CommandPalette from './views/overlays/CommandPalette';
import ProfileModal from './views/overlays/ProfileModal';

export default function App() {
  const state = useAppState();

  // Landing screen
  if (state.view === 'landing') {
    return (
      <AnimatePresence mode="wait">
        <Landing onSelect={state.selectRole} />
      </AnimatePresence>
    );
  }

  // Main dashboard
  return (
    <AppShell
      mode={state.globalMode}
      sidebar={
        <Sidebar
          role={state.role}
          activeNav={state.activeNav}
          onNavigate={state.navigate}
          onProfileClick={() => state.setProfileOpen(true)}
        />
      }
      header={
        <Header
          mode={state.globalMode}
          onOpenSearch={() => state.setCommandPaletteOpen(true)}
        />
      }
      panel={getActivePanel(state.role, state.activeNav)}
    >
      {/* Stadium map + match ticker + layer toggles */}
      <StadiumMap activeLayers={state.activeLayers} activeNav={state.activeNav} />
      <MatchTicker />

      {/* Layer toggle bar */}
      <div className="absolute top-4 right-4 z-30 flex gap-1 glass-elevated rounded-2xl p-1.5 shadow-lg" role="group" aria-label="Map layers">
        {LAYERS.map(layer => {
          const on = state.activeLayers.has(layer.id);
          return (
            <button
              key={layer.id}
              onClick={() => state.toggleLayer(layer.id)}
              id={`layer-${layer.id}`}
              aria-pressed={on}
              title={layer.label}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold transition-all duration-200",
                on
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.08)]"
                  : "text-white/30 hover:bg-white/[0.05] hover:text-white/50 border border-transparent"
              )}
            >
              <layer.icon className={cn("w-3.5 h-3.5", on && "text-cyan-400")} />
              <span className="hidden xl:inline">{layer.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overlays */}
      <CommandPalette
        isOpen={state.commandPaletteOpen}
        onClose={() => state.setCommandPaletteOpen(false)}
        onAction={state.navigate}
      />
      <ProfileModal
        isOpen={state.profileOpen}
        onClose={() => state.setProfileOpen(false)}
        role={state.role}
        onSwitchRole={state.switchRole}
      />
    </AppShell>
  );
}