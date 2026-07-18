/**
 * @module useAppState
 * @description Central application state controller (MVC pattern).
 * Manages role-based views, navigation, map layers, and emergency modes.
 *
 * Hackathon Alignment:
 * - Navigation & wayfinding state management
 * - Crowd management layer toggling
 * - Emergency evacuation mode switching
 * - Multi-role support (fan, security, organizer, volunteer)
 */
import { useState, useCallback, useEffect } from 'react';
import type { Role, AppView, GlobalMode, Layer } from '../models/types';

export function useAppState() {
  const [view, setView] = useState<AppView>('landing');
  const [role, setRole] = useState<Role>('fan');
  const [activeNav, setActiveNav] = useState('home');
  const [globalMode, setGlobalMode] = useState<GlobalMode>('normal');
  const [activeLayers, setActiveLayers] = useState<Set<Layer>>(new Set(['ai']));
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setCommandPaletteOpen(o => !o); }
      if (e.key === 'Escape') { setCommandPaletteOpen(false); setProfileOpen(false); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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

  const toggleLayer = useCallback((l: Layer) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(l)) next.delete(l); else next.add(l);
      return next;
    });
  }, []);

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
