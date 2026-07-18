import type { POI } from '../types';

// Extracted from App.tsx lines 68-89
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
