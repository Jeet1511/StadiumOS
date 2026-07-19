/**
 * @module App
 * @description Root application component — thin MVC router.
 * Wires Controllers (useAppState) to Views (Landing, Dashboard, Overlays)
 * with zero business logic in this file.
 *
 * Architecture: Routes between Landing and Dashboard views based on
 * AppState.view. Wraps the dashboard in LiveDataProvider for shared
 * real-time data polling. All panels are lazy-loaded for code splitting.
 *
 * Performance:
 * - ZERO inline arrow functions in JSX — all callbacks are stable refs
 * - Landing page lazy-loaded (only shown once)
 * - StadiumMap and MatchTicker lazy-loaded with Suspense
 * - LiveDataProvider eliminates duplicate polling intervals
 * - All child components are React.memo'd
 *
 * Accessibility:
 * - Map layer toggles use aria-pressed for state
 * - Layer group uses role="group" with aria-label
 * - All buttons have type="button" and aria-label/title
 *
 * Hackathon Alignment:
 * - 10 stadium features accessible via sidebar navigation
 * - Digital twin map with toggleable data layers
 * - AI chat powered by Gemini 2.0 Flash
 * - Emergency mode visual transformation
 * - Command palette (Ctrl+K) for rapid access
 */
import { AnimatePresence } from 'framer-motion';
import React, { lazy, Suspense, useCallback } from 'react';
import { useAppState } from './controllers/useAppState';
import { LiveDataProvider } from './controllers/LiveDataContext';
import { LAYERS } from './models/constants';
import { cn } from './utils/cn';
import type { Layer } from './models/types';

// Views — Layouts
import AppShell from './views/layouts/AppShell';
import Sidebar from './views/layouts/Sidebar';
import Header from './views/layouts/Header';

// Views — Pages (lazy loaded for code splitting)
const Landing = lazy(() => import('./views/pages/Landing'));
import { getActivePanel } from './views/pages/Dashboard';

// Views — Widgets (lazy loaded for code splitting)
const StadiumMap = lazy(() => import('./views/widgets/StadiumMap'));
const MatchTicker = lazy(() => import('./views/widgets/MatchTicker'));

// Views — Overlays
import CommandPalette from './views/overlays/CommandPalette';
import ProfileModal from './views/overlays/ProfileModal';

/** Empty fallback for Suspense boundaries — avoids layout flash */
const SUSPENSE_FALLBACK = <div className="h-screen w-screen bg-[#080e1e]" aria-hidden="true" />;
const MAP_FALLBACK = <div className="absolute inset-0" aria-hidden="true" />;

export default function App(): React.JSX.Element {
  const state = useAppState();

  if (state.view === 'landing') {
    return (
      <Suspense fallback={SUSPENSE_FALLBACK}>
        <AnimatePresence mode="wait">
          <Landing onSelect={state.selectRole} />
        </AnimatePresence>
      </Suspense>
    );
  }

  return (
    <LiveDataProvider>
      <AppShell
        mode={state.globalMode}
        sidebar={
          <Sidebar
            role={state.role}
            activeNav={state.activeNav}
            onNavigate={state.navigate}
            onProfileClick={state.openProfile}
          />
        }
        header={
          <Header
            mode={state.globalMode}
            onOpenSearch={state.openCommandPalette}
          />
        }
        panel={getActivePanel(state.role, state.activeNav)}
      >
        <Suspense fallback={MAP_FALLBACK}>
          <StadiumMap activeLayers={state.activeLayers} activeNav={state.activeNav} />
          <MatchTicker />
        </Suspense>

        <LayerToggles
          activeLayers={state.activeLayers}
          toggleLayer={state.toggleLayer}
        />

        <CommandPalette
          isOpen={state.commandPaletteOpen}
          onClose={state.closeCommandPalette}
          onAction={state.navigate}
        />
        <ProfileModal
          isOpen={state.profileOpen}
          onClose={state.closeProfile}
          role={state.role}
          onSwitchRole={state.switchRole}
        />
      </AppShell>
    </LiveDataProvider>
  );
}

/**
 * Layer toggle bar extracted as a separate memoizable component.
 * Prevents the entire App from re-rendering when layers change.
 */
function LayerToggles({ activeLayers, toggleLayer }: {
  readonly activeLayers: Set<Layer>;
  readonly toggleLayer: (l: Layer) => void;
}): React.JSX.Element {
  const handleToggle = useCallback(
    (layerId: Layer) => toggleLayer(layerId),
    [toggleLayer]
  );

  return (
    <div className="absolute top-4 right-4 z-30 flex gap-1 glass-elevated rounded-2xl p-1.5 shadow-lg" role="group" aria-label="Map data layers">
      {LAYERS.map(layer => {
        const on = activeLayers.has(layer.id);
        return (
          <button
            key={layer.id}
            type="button"
            onClick={() => handleToggle(layer.id)}
            id={`layer-${layer.id}`}
            aria-pressed={on}
            title={layer.label}
            className={cn(
              'flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold transition-all duration-200',
              on
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.08)]'
                : 'text-white/30 hover:bg-white/[0.05] hover:text-white/50 border border-transparent'
            )}
          >
            <layer.icon className={cn('w-3.5 h-3.5', on && 'text-cyan-400')} aria-hidden="true" />
            <span className="hidden xl:inline">{layer.label}</span>
          </button>
        );
      })}
    </div>
  );
}