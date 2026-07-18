import type React from 'react';

export type Layer = 'crowd' | 'navigation' | 'accessibility' | 'medical' | 'security' | 'transportation' | 'queue' | 'ai';
export type Role = 'fan' | 'security' | 'organizer' | 'volunteer';
export type AppView = 'landing' | 'main';
export type GlobalMode = 'normal' | 'emergency' | 'accessibility';

export interface POI {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
}

export interface LayerDef {
  id: Layer;
  label: string;
  icon: React.ElementType;
}

export interface RoleDef {
  id: Role;
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface CrowdZone {
  id: string;
  name: string;
  density: number; // 0-100
  trend: 'rising' | 'falling' | 'stable';
  capacity: number;
  current: number;
}

export interface TransportStatus {
  id: string;
  type: 'metro' | 'bus' | 'taxi' | 'parking';
  label: string;
  capacity: number; // 0-100 percentage used
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
