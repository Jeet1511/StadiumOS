/**
 * @module constants
 * @description Model Layer — Application constants and configuration.
 * Defines role configurations, navigation items, map layers, and points of interest.
 *
 * Architecture: Pure data module with no side effects. Consumed by Controllers
 * and Views to drive the role-adaptive UI system.
 *
 * Hackathon Alignment:
 * - 4 distinct user personas (fan, security, organizer, volunteer)
 * - 10 navigation features covering all hackathon challenge areas
 * - 4 real-time map layers for the digital twin
 * - 20 points of interest across the stadium
 */

import {
  Ticket, Shield, Activity, Users, Home,
  AlertTriangle, Globe, Sparkles, Navigation, Accessibility,
  Train, Clock, HeartPulse
} from 'lucide-react';
import type { RoleConfig, NavItem, LayerDef, POI } from './types';

// ── Role Configurations ────────────────────────────────

/**
 * All available user roles in the StadiumOS system.
 * Each role configures the UI theme, icon, and feature access.
 *
 * @example
 * ROLES.map(role => <RoleCard key={role.id} config={role} />)
 */
export const ROLES: readonly RoleConfig[] = [
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
] as const;

/**
 * Retrieves the configuration for a given role.
 * Falls back to the fan role for unknown identifiers.
 *
 * @param {string} role - Role identifier to look up.
 * @returns {RoleConfig} The matching role configuration.
 *
 * @example
 * const config = getRoleConfig('security');
 * // config.accent === 'text-rose-400'
 */
export function getRoleConfig(role: string): RoleConfig {
  return ROLES.find(r => r.id === role) ?? ROLES[0]!;
}

// ── Navigation (All features enabled for Hackathon Demo) ──

/**
 * Returns navigation menu items for a given role.
 * All roles currently share the same navigation for hackathon demo purposes.
 *
 * @param {string} _role - Role identifier (reserved for role-specific filtering).
 * @returns {readonly NavItem[]} Array of navigation items.
 *
 * @example
 * const items = getNavItems('fan');
 * // items[0].id === 'home'
 */
export function getNavItems(_role: string): readonly NavItem[] {
  return [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'ai', icon: Sparkles, label: 'FanPilot AI', highlight: true },
    { id: 'ticket', icon: Ticket, label: 'My Ticket' },
    { id: 'nav', icon: Navigation, label: 'Wayfinding' },
    { id: 'access', icon: Accessibility, label: 'Accessibility' },
    { id: 'transport', icon: Train, label: 'Transit Hub' },
    { id: 'evac', icon: AlertTriangle, label: 'Security & Evac' },
    { id: 'sustain', icon: Globe, label: 'Sustainability' },
    { id: 'crowd', icon: Users, label: 'Crowd Matrix' },
    { id: 'tasks', icon: Activity, label: 'Volunteer Tasks' },
  ] as const;
}

// ── Map Layer Definitions ──────────────────────────────

/**
 * Available map overlay layers for the stadium digital twin.
 * Each layer adds a data visualization on top of the SVG stadium map.
 */
export const LAYERS: readonly LayerDef[] = [
  { id: 'ai', label: 'AI Insights', icon: Sparkles },
  { id: 'crowd', label: 'Crowd Density', icon: Users },
  { id: 'queue', label: 'Gate Wait Times', icon: Clock },
  { id: 'medical', label: 'Medical', icon: HeartPulse },
] as const;

// ── Points of Interest ─────────────────────────────────

/**
 * All points of interest in the stadium.
 * Includes gates, transport hubs, food courts, medical stations,
 * restrooms, merchandise, volunteer stations, and accessibility features.
 *
 * Coordinates are in SVG viewport space (0-1000 on both axes).
 */
export const POIS: readonly POI[] = [
  // Gates
  { id: 'g-n', type: 'Gate', label: 'Gate N', x: 500, y: 150 },
  { id: 'g-s', type: 'Gate', label: 'Gate S', x: 500, y: 850 },
  { id: 'g-e', type: 'Gate', label: 'Gate E', x: 850, y: 500 },
  { id: 'g-w', type: 'Gate', label: 'Gate W', x: 150, y: 500 },
  // Transport
  { id: 't-metro', type: 'Metro', label: 'Metro Station', x: 120, y: 120 },
  { id: 't-bus', type: 'Bus', label: 'Bus Hub', x: 880, y: 120 },
  { id: 't-park', type: 'Parking', label: 'Parking A', x: 880, y: 880 },
  { id: 't-taxi', type: 'Taxi', label: 'Taxi Stand', x: 120, y: 880 },
  // Facilities
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
  // Safety & Accessibility
  { id: 'e-1', type: 'Emergency', label: 'Evac Route Alpha', x: 150, y: 300 },
  { id: 'a-1', type: 'Accessible', label: 'Elevator Bank A', x: 380, y: 280 },
] as const;
