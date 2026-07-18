import { Sparkles, Navigation, Users, Clock, Accessibility, HeartPulse, ShieldAlert, Train } from 'lucide-react';
import type { LayerDef } from '../types';

// Extracted from App.tsx lines 91-100
export const LAYERS: LayerDef[] = [
  { id: 'ai', label: 'AI Insights', icon: Sparkles },
  { id: 'navigation', label: 'Walking Routes', icon: Navigation },
  { id: 'crowd', label: 'Crowd Heatmap', icon: Users },
  { id: 'queue', label: 'Wait Times', icon: Clock },
  { id: 'accessibility', label: 'Accessible Routes', icon: Accessibility },
  { id: 'medical', label: 'Medical Stations', icon: HeartPulse },
  { id: 'security', label: 'Security & Emer.', icon: ShieldAlert },
  { id: 'transportation', label: 'Transport Status', icon: Train },
];
