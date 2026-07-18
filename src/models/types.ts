/* ═══════════════════════════════════════════════════════
   StadiumOS — Model Layer: Type Definitions
   All TypeScript interfaces for the application.
   ═══════════════════════════════════════════════════════ */

import type React from 'react';

// ── App State ──────────────────────────────────────────
export type Role = 'fan' | 'security' | 'organizer' | 'volunteer';
export type AppView = 'landing' | 'main';
export type GlobalMode = 'normal' | 'emergency' | 'accessibility';
export type Layer = 'crowd' | 'navigation' | 'accessibility' | 'medical' | 'security' | 'transportation' | 'queue' | 'ai';

// ── UI Configuration ───────────────────────────────────
export interface RoleConfig {
  id: Role;
  title: string;
  subtitle: string;
  desc: string;
  icon: React.ElementType;
  accent: string;       // tailwind text color
  accentHex: string;    // raw hex for inline styles
  gradient: string;     // tailwind gradient classes
  bgTint: string;       // subtle background tint
}

export interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  highlight?: boolean;
}

export interface LayerDef {
  id: Layer;
  label: string;
  icon: React.ElementType;
}

export interface POI {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
}

// ── Chat ───────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

// ── Live Data ──────────────────────────────────────────
export interface CrowdZone {
  id: string;
  name: string;
  density: number;
  trend: 'rising' | 'falling' | 'stable';
  capacity: number;
  current: number;
}

export interface TransportStatus {
  id: string;
  type: 'metro' | 'bus' | 'taxi' | 'parking';
  label: string;
  capacity: number;
  eta: string;
  status: 'operational' | 'delayed' | 'full';
}

export interface SustainabilityMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface VolunteerTask {
  id: string;
  title: string;
  zone: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'active' | 'done';
  assignedAt: number;
}
