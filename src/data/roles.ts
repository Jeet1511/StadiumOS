import { Ticket, Shield, Activity, Users } from 'lucide-react';
import type { RoleDef } from '../types';

// Extracted from App.tsx lines 107-112
export const ROLES: RoleDef[] = [
  { id: 'fan', title: 'Fan Experience', desc: 'Wayfinding, tickets, and food delivery', icon: Ticket, color: 'text-zinc-300' },
  { id: 'security', title: 'Security Ops', desc: 'Threat detection and crowd control', icon: Shield, color: 'text-rose-400' },
  { id: 'organizer', title: 'Command Center', desc: 'Venue oversight and global metrics', icon: Activity, color: 'text-indigo-400' },
  { id: 'volunteer', title: 'Staff Workspace', desc: 'Task deployment and multilingual support', icon: Users, color: 'text-emerald-400' },
];
