/**
 * @module useAppState
 * @description Central application state controller (MVC Controller layer).
 * Manages role-based views, navigation routing, map layer toggling,
 * emergency mode switching, and keyboard accessibility shortcuts.
 *
 * Architecture: Single source of truth for all app-wide state.
 * Views consume this hook's return value to render the correct UI.
 *
 * Hackathon Alignment:
 * - Multi-role support: fan, security, organizer, volunteer personas
 * - Navigation & wayfinding state management
 * - Crowd management layer toggling for digital twin
 * - Emergency evacuation mode switching for safety protocols
 * - Accessibility mode support for inclusive stadium experience
 * - Keyboard shortcuts for operational efficiency (Ctrl+K search)
 */
import { useState, useCallback, useEffect } from 'react';
import type { Role, AppView, GlobalMode, Layer, AppStateReturn } from '../models/types';

/**
 * Central application state hook implementing the Controller in MVC.
 * Provides all state and actions needed by the View layer.
 *
 * @returns {AppStateReturn} Complete application state and action dispatchers.
 *
 * @example
 * function App() {
 *   const state = useAppState();
 *   if (state.view === 'landing') return <Landing onSelect={state.selectRole} />;
 *   return <Dashboard {...state} />;
 * }
 */
export function useAppState(): AppStateReturn {
  const [view, setView] = useState<AppView>('landing');
  const [role, setRole] = useState<Role>('fan');
  const [activeNav, setActiveNav] = useState('home');
  const [globalMode, setGlobalMode] = useState<GlobalMode>('normal');
  const [activeLayers, setActiveLayers] = useState<Set<Layer>>(new Set(['ai']));
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Keyboard shortcuts for operational efficiency
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setCommandPaletteOpen(o => !o); }
      if (e.key === 'Escape') { setCommandPaletteOpen(false); setProfileOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /**
   * Selects a user role and transitions from landing to main dashboard.
   * Configures role-specific default layers for the digital twin map.
   */
  const selectRole = useCallback((r: Role) => {
    setRole(r);
    setView('main');
    setActiveNav('home');
    setGlobalMode('normal');
    setActiveLayers(new Set(
      r === 'security' ? ['security', 'crowd', 'ai'] :
      r === 'organizer' ? ['queue', 'transportation', 'ai'] :
      ['ai', 'navigation']
    ));
  }, []);

  /**
   * Navigates to a feature panel and updates the global mode and layers.
   * Automatically activates emergency mode for evacuation view.
   */
  const navigate = useCallback((id: string) => {
    setActiveNav(id);
    const modeMap: Record<string, { mode: GlobalMode; layers: Layer[] }> = {
      evac: { mode: 'emergency', layers: ['security', 'crowd'] },
      nav: { mode: 'normal', layers: ['navigation'] },
      transport: { mode: 'normal', layers: ['transportation'] },
      access: { mode: 'normal', layers: ['accessibility'] },
      crowd: { mode: 'normal', layers: ['crowd'] },
    };
    const cfg = modeMap[id];
    if (cfg) { setGlobalMode(cfg.mode); setActiveLayers(new Set(cfg.layers)); }
    else { setGlobalMode('normal'); }
  }, []);

  /** Toggles a map layer on/off in the digital twin visualization. */
  const toggleLayer = useCallback((l: Layer) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(l)) next.delete(l); else next.add(l);
      return next;
    });
  }, []);

  /** Returns to the landing screen for role switching. */
  const switchRole = useCallback(() => {
    setView('landing');
    setProfileOpen(false);
  }, []);

  return {
    view, role, activeNav, globalMode, activeLayers,
    commandPaletteOpen, profileOpen,
    selectRole, navigate, toggleLayer, switchRole,
    setCommandPaletteOpen, setProfileOpen,
  };
}
