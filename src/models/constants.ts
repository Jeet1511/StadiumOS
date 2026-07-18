/* ═══════════════════════════════════════════════════════
   StadiumOS — Model Layer: Constants & Configuration
   Role configs, navigation, layers, POIs.
   ═══════════════════════════════════════════════════════ */

import {
  Ticket, Shield, Activity, Users, Home, ShieldAlert, Eye,
  AlertTriangle, Map, Globe, Sparkles, Navigation, Accessibility,
  Train, Sparkle, Clock, HeartPulse
} from 'lucide-react';
import type { RoleConfig, NavItem, LayerDef, POI } from './types';

// ── Role Configurations ────────────────────────────────
export const ROLES: RoleConfig[] = [
  {
    id: 'fan',
    title: 'Fan Experience',
    subtitle: 'Smart Stadium Assistant',
    desc: 'AI-powered navigation, smart ticketing, food & real-time wayfinding',
    icon: Ticket,
    accent: 'text-cyan-400',
    accentHex: '#22d3ee',
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    bgTint: 'bg-cyan-500',
  },
  {
    id: 'security',
    title: 'Security Command',
    subtitle: 'Threat Intelligence Center',
    desc: 'Crowd density analysis, threat detection & evacuation management',
    icon: Shield,
    accent: 'text-rose-400',
    accentHex: '#fb7185',
    gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    bgTint: 'bg-rose-500',
  },
  {
    id: 'organizer',
    title: 'Operations Center',
    subtitle: 'Venue Command & Control',
    desc: 'Staff deployment, sustainability, revenue & logistics intelligence',
    icon: Activity,
    accent: 'text-violet-400',
    accentHex: '#a78bfa',
    gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
    bgTint: 'bg-violet-500',
  },
  {
    id: 'volunteer',
    title: 'Staff Workspace',
    subtitle: 'Field Coordination Hub',
    desc: 'Task prioritization, multilingual support & incident coordination',
    icon: Users,
    accent: 'text-emerald-400',
    accentHex: '#34d399',
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    bgTint: 'bg-emerald-500',
  },
];

export function getRoleConfig(role: string): RoleConfig {
  return ROLES.find(r => r.id === role) ?? ROLES[0];
}

// ── Navigation per Role ────────────────────────────────
export function getNavItems(role: string): NavItem[] {
  const base: NavItem[] = [{ id: 'home', icon: Home, label: 'Home' }];

  switch (role) {
    case 'security':
      return [...base,
        { id: 'ai', icon: ShieldAlert, label: 'Threat Intel', highlight: true },
        { id: 'crowd', icon: Users, label: 'Crowd Matrix' },
        { id: 'cctv', icon: Eye, label: 'CCTV Feeds' },
        { id: 'evac', icon: AlertTriangle, label: 'Evacuation' },
      ];
    case 'organizer':
      return [...base,
        { id: 'ai', icon: Activity, label: 'Command AI', highlight: true },
        { id: 'overview', icon: Map, label: 'Venue Overview' },
        { id: 'staff', icon: Users, label: 'Staff Deploy' },
        { id: 'sustain', icon: Globe, label: 'Sustainability' },
      ];
    case 'volunteer':
      return [...base,
        { id: 'ai', icon: Sparkle, label: 'Task AI', highlight: true },
        { id: 'tasks', icon: AlertTriangle, label: 'My Tasks' },
        { id: 'translate', icon: Globe, label: 'Translation' },
        { id: 'nav', icon: Navigation, label: 'Wayfinding' },
      ];
    default: // fan
      return [...base,
        { id: 'ai', icon: Sparkles, label: 'FanPilot AI', highlight: true },
        { id: 'ticket', icon: Ticket, label: 'My Ticket' },
        { id: 'nav', icon: Navigation, label: 'Wayfinding' },
        { id: 'access', icon: Accessibility, label: 'Accessibility' },
        { id: 'transport', icon: Train, label: 'Transit Hub' },
      ];
  }
}

// ── Map Layer Definitions ──────────────────────────────
export const LAYERS: LayerDef[] = [
  { id: 'ai', label: 'AI Insights', icon: Sparkles },
  { id: 'crowd', label: 'Crowd Density', icon: Users },
  { id: 'queue', label: 'Gate Wait Times', icon: Clock },
  { id: 'medical', label: 'Medical', icon: HeartPulse },
];

// ── Points of Interest ─────────────────────────────────
export const POIS: POI[] = [
  { id: 'g-n', type: 'Gate', label: 'Gate N', x: 500, y: 150 },
  { id: 'g-s', type: 'Gate', label: 'Gate S', x: 500, y: 850 },
  { id: 'g-e', type: 'Gate', label: 'Gate E', x: 850, y: 500 },
  { id: 'g-w', type: 'Gate', label: 'Gate W', x: 150, y: 500 },
  { id: 't-metro', type: 'Metro', label: 'Metro Station', x: 120, y: 120 },
  { id: 't-bus', type: 'Bus', label: 'Bus Hub', x: 880, y: 120 },
  { id: 't-park', type: 'Parking', label: 'Parking A', x: 880, y: 880 },
  { id: 't-taxi', type: 'Taxi', label: 'Taxi Stand', x: 120, y: 880 },
  { id: 'f-1', type: 'Food', label: 'Food Court A', x: 300, y: 250 },
  { id: 'f-2', type: 'Food', label: 'Food Court B', x: 700, y: 750 },
  { id: 'm-1', type: 'Medical', label: 'First Aid N', x: 700, y: 250 },
  { id: 'm-2', type: 'Medical', label: 'First Aid S', x: 300, y: 750 },
  { id: 'r-1', type: 'Restroom', label: 'WC 1', x: 220, y: 400 },
  { id: 'r-2', type: 'Restroom', label: 'WC 2', x: 780, y: 600 },
  { id: 'r-3', type: 'Restroom', label: 'WC 3', x: 220, y: 600 },
  { id: 'r-4', type: 'Restroom', label: 'WC 4', x: 780, y: 400 },
  { id: 'merch-1', type: 'Merch', label: 'Mega Store', x: 500, y: 220 },
  { id: 'v-1', type: 'Volunteer', label: 'Info Booth', x: 500, y: 780 },
  { id: 'e-1', type: 'Emergency', label: 'Evac Route Alpha', x: 150, y: 300 },
  { id: 'a-1', type: 'Accessible', label: 'Elevator Bank A', x: 380, y: 280 },
];
