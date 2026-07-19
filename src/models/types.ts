/**
 * @module types
 * @description Model Layer — TypeScript type definitions for StadiumOS.
 * Defines all interfaces and type aliases used across the application,
 * following strict typing for the MVC architecture.
 *
 * Architecture: This module is the foundation of the Model layer.
 * All data structures flow from these definitions into Controllers and Views.
 *
 * Hackathon Alignment:
 * - Multi-role support (fan, security, organizer, volunteer)
 * - Real-time crowd management data structures
 * - AI chat with streaming support
 * - Transportation, sustainability, and accessibility tracking
 */

import type React from 'react';

// ── App State ──────────────────────────────────────────

/** User persona roles in the stadium operations system. */
export type Role = 'fan' | 'security' | 'organizer' | 'volunteer';

/** Top-level application view state. */
export type AppView = 'landing' | 'main';

/** Global operational mode affecting UI theme and alerts. */
export type GlobalMode = 'normal' | 'emergency' | 'accessibility';

/** Map overlay layer identifiers for the digital twin. */
export type Layer = 'crowd' | 'navigation' | 'accessibility' | 'medical' | 'security' | 'transportation' | 'queue' | 'ai';

// ── UI Configuration ───────────────────────────────────

/**
 * Configuration for each user role in the stadium system.
 * Controls the visual theme, icon, and description displayed throughout the UI.
 */
export interface RoleConfig {
  /** Unique role identifier */
  readonly id: Role;
  /** Display title for the role (e.g., "Fan Experience") */
  readonly title: string;
  /** Subtitle shown in sidebar (e.g., "Smart Stadium Assistant") */
  readonly subtitle: string;
  /** Detailed description for role selection */
  readonly desc: string;
  /** Lucide icon component for the role */
  readonly icon: React.ElementType;
  /** Tailwind text color class (e.g., "text-cyan-400") */
  readonly accent: string;
  /** Raw hex color for inline styles (e.g., "#22d3ee") */
  readonly accentHex: string;
  /** Tailwind gradient classes for backgrounds */
  readonly gradient: string;
  /** Subtle background tint class */
  readonly bgTint: string;
}

/**
 * Navigation menu item configuration.
 * Used in the sidebar to route between different stadium features.
 */
export interface NavItem {
  /** Unique navigation identifier (e.g., "home", "ai", "nav") */
  readonly id: string;
  /** Lucide icon component */
  readonly icon: React.ElementType;
  /** Display label */
  readonly label: string;
  /** Whether to show a highlight indicator (e.g., AI feature) */
  readonly highlight?: boolean;
}

/**
 * Map layer definition for the stadium digital twin.
 * Each layer can be toggled on/off to show different data overlays.
 */
export interface LayerDef {
  /** Layer identifier matching the Layer type */
  readonly id: Layer;
  /** Human-readable layer name */
  readonly label: string;
  /** Lucide icon component for the toggle button */
  readonly icon: React.ElementType;
}

/**
 * Point of Interest in the stadium.
 * Represents facilities, gates, and services placed on the SVG map.
 */
export interface POI {
  /** Unique POI identifier (e.g., "g-n" for Gate North) */
  readonly id: string;
  /** Category type (e.g., "Gate", "Food", "Medical", "Accessible") */
  readonly type: string;
  /** Display label on the map */
  readonly label: string;
  /** X coordinate in SVG viewport (0-1000) */
  readonly x: number;
  /** Y coordinate in SVG viewport (0-1000) */
  readonly y: number;
}

// ── Chat ───────────────────────────────────────────────

/**
 * Chat message in the AI conversation.
 * Supports both user messages and AI streaming responses.
 */
export interface ChatMessage {
  /** Unique message identifier */
  readonly id: string;
  /** Message sender: user or AI assistant */
  readonly role: 'user' | 'assistant';
  /** Message text content (may be partial during streaming) */
  content: string;
  /** Unix timestamp when the message was created */
  readonly timestamp: number;
  /** Whether the AI is still generating this response */
  isStreaming?: boolean;
}

// ── Live Data ──────────────────────────────────────────

/**
 * Crowd density zone in the stadium.
 * Represents a section or concourse with real-time occupancy data.
 *
 * Hackathon Feature: Crowd management and anomaly detection.
 */
export interface CrowdZone {
  /** Zone identifier (e.g., "north-100", "concourse-n") */
  readonly id: string;
  /** Human-readable zone name */
  readonly name: string;
  /** Current density percentage (0-100) */
  density: number;
  /** Density trend direction */
  readonly trend: 'rising' | 'falling' | 'stable';
  /** Maximum zone capacity */
  readonly capacity: number;
  /** Current headcount in the zone */
  current: number;
}

/**
 * Transportation service status.
 * Tracks real-time availability of transit options near the stadium.
 *
 * Hackathon Feature: Multi-modal transport integration.
 */
export interface TransportStatus {
  /** Transport service identifier */
  readonly id: string;
  /** Transport modality */
  readonly type: 'metro' | 'bus' | 'taxi' | 'parking';
  /** Service name (e.g., "Metro Line 3") */
  readonly label: string;
  /** Current capacity utilization percentage */
  capacity: number;
  /** Estimated time of arrival/departure */
  eta: string;
  /** Current operational status */
  readonly status: 'operational' | 'delayed' | 'full';
}

/**
 * Sustainability metric for environmental impact tracking.
 * Monitors energy, water, waste, and carbon footprint.
 *
 * Hackathon Feature: FIFA Green Score compliance.
 */
export interface SustainabilityMetric {
  /** Metric name (e.g., "Energy Usage") */
  readonly label: string;
  /** Current metric value */
  value: number;
  /** Maximum/target value */
  readonly max: number;
  /** Unit of measurement (e.g., "kWh", "L", "%") */
  readonly unit: string;
  /** Value trend direction */
  readonly trend: 'up' | 'down' | 'stable';
}

/**
 * Volunteer task assignment.
 * Priority-ranked tasks for field coordinators during the event.
 *
 * Hackathon Feature: Volunteer task management with multilingual support.
 */
export interface VolunteerTask {
  /** Task identifier */
  readonly id: string;
  /** Task description */
  readonly title: string;
  /** Stadium zone where the task is located */
  readonly zone: string;
  /** Task urgency level */
  readonly priority: 'high' | 'medium' | 'low';
  /** Current task status */
  status: 'pending' | 'active' | 'done';
  /** Unix timestamp when the task was assigned */
  readonly assignedAt: number;
}

/** Return type for the useAppState controller hook. */
export interface AppStateReturn {
  readonly view: AppView;
  readonly role: Role;
  readonly activeNav: string;
  readonly globalMode: GlobalMode;
  readonly activeLayers: Set<Layer>;
  readonly commandPaletteOpen: boolean;
  readonly profileOpen: boolean;
  readonly selectRole: (r: Role) => void;
  readonly navigate: (id: string) => void;
  readonly toggleLayer: (l: Layer) => void;
  readonly switchRole: () => void;
  readonly setCommandPaletteOpen: (open: boolean) => void;
  readonly setProfileOpen: (open: boolean) => void;
  /** Stable callback: opens profile modal without creating new function ref */
  readonly openProfile: () => void;
  /** Stable callback: closes profile modal without creating new function ref */
  readonly closeProfile: () => void;
  /** Stable callback: opens command palette without creating new function ref */
  readonly openCommandPalette: () => void;
  /** Stable callback: closes command palette without creating new function ref */
  readonly closeCommandPalette: () => void;
}

/** Return type for the useAI controller hook. */
export interface AIStateReturn {
  readonly messages: ChatMessage[];
  readonly isLoading: boolean;
  readonly send: (text: string) => Promise<void>;
  readonly clear: () => void;
}

/** Return type for the useLiveData controller hook. */
export interface LiveDataReturn {
  crowdZones: CrowdZone[];
  transport: TransportStatus[];
  sustainability: SustainabilityMetric[];
  queueTimes: Record<string, number>;
  totalAttendance: number;
  avgDensity: number;
  criticalZones: CrowdZone[];
}

/** Return type for the useMatchClock controller hook. */
export interface MatchClockReturn {
  readonly min: number;
  readonly sec: number;
  readonly matchTime: string;
  readonly clockTime: string;
  readonly now: Date;
}
