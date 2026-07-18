import { Sparkles, Users, Clock, HeartPulse } from 'lucide-react';
import type { LayerDef } from '../types';

// Map-only overlays. Wayfinding/Accessibility/Transport/Security are in sidebar.
export const LAYERS: LayerDef[] = [
  { id: 'ai', label: 'AI Insights', icon: Sparkles },
  { id: 'crowd', label: 'Crowd Density', icon: Users },
  { id: 'queue', label: 'Gate Wait Times', icon: Clock },
  { id: 'medical', label: 'Medical', icon: HeartPulse },
];
