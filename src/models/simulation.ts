/**
 * @module simulation
 * @description Model Layer — Live stadium data simulation engine.
 * Generates realistic, time-varying stadium metrics using sinusoidal functions.
 * Simulates real-time IoT data feeds for the hackathon demo.
 *
 * Architecture: Pure functions with no side effects. Each function generates
 * a snapshot of the current stadium state based on the system clock.
 *
 * Hackathon Alignment:
 * - Real-time crowd density monitoring (crowd management)
 * - Transportation status tracking (multi-modal transit)
 * - Sustainability metrics (FIFA Green Score)
 * - Volunteer task management (field coordination)
 * - Queue time estimation (fan experience optimization)
 */

import type { CrowdZone, TransportStatus, SustainabilityMetric, VolunteerTask } from './types';

// ── Constants ──────────────────────────────────────────

/** @internal Density threshold percentages for crowd classification */
export const DENSITY_THRESHOLDS = {
  CRITICAL: 85,
  HIGH: 65,
  MODERATE: 40,
} as const;

/** Standard stadium section capacity */
const SECTION_CAPACITY = {
  NORTH_SOUTH_100: 12000,
  EAST_WEST_100: 10000,
  NORTH_SOUTH_200: 15000,
  CONCOURSE: 5000,
} as const;

/** Maximum energy/water/waste values for sustainability tracking */
const SUSTAINABILITY_LIMITS = {
  MAX_ENERGY_KWH: 600,
  MAX_WATER_L: 4000,
  MAX_WASTE_DIVERSION_PCT: 100,
  MAX_CARBON_OFFSET_PCT: 100,
} as const;

// ── Helpers ────────────────────────────────────────────

/**
 * Adds random jitter to a base value, clamped between 0 and 100.
 * Creates realistic fluctuation in simulated metrics.
 *
 * @param {number} base - The center value to jitter around.
 * @param {number} range - Maximum deviation from the base value.
 * @returns {number} Jittered value clamped to [0, 100].
 */
function jitter(base: number, range: number): number {
  return Math.max(0, Math.min(100, base + (Math.random() - 0.5) * range));
}

// ── Crowd Zone Data ────────────────────────────────────

/**
 * Generates current crowd density data for all stadium zones.
 * Uses time-based sinusoidal functions to simulate realistic crowd movement.
 *
 * @returns {CrowdZone[]} Array of 8 crowd zones with real-time density data.
 *
 * @example
 * const zones = getCrowdZones();
 * const critical = zones.filter(z => z.density > 85);
 */
export function getCrowdZones(): CrowdZone[] {
  const t = Date.now() / 60000;
  return [
    { id: 'north-100', name: 'North 100', density: jitter(78 + Math.sin(t * 0.3) * 12, 8), trend: 'rising', capacity: SECTION_CAPACITY.NORTH_SOUTH_100, current: Math.floor(9200 + Math.sin(t * 0.3) * 1400) },
    { id: 'south-100', name: 'South 100', density: jitter(52 + Math.cos(t * 0.2) * 10, 6), trend: 'stable', capacity: SECTION_CAPACITY.NORTH_SOUTH_100, current: Math.floor(6300 + Math.cos(t * 0.2) * 1200) },
    { id: 'east-100', name: 'East 100', density: jitter(65 + Math.sin(t * 0.4) * 8, 5), trend: 'falling', capacity: SECTION_CAPACITY.EAST_WEST_100, current: Math.floor(6500 + Math.sin(t * 0.4) * 800) },
    { id: 'west-100', name: 'West 100', density: jitter(43 + Math.cos(t * 0.35) * 7, 4), trend: 'stable', capacity: SECTION_CAPACITY.EAST_WEST_100, current: Math.floor(4300 + Math.cos(t * 0.35) * 700) },
    { id: 'north-200', name: 'North 200', density: jitter(88 + Math.sin(t * 0.25) * 6, 5), trend: 'rising', capacity: SECTION_CAPACITY.NORTH_SOUTH_200, current: Math.floor(13200 + Math.sin(t * 0.25) * 900) },
    { id: 'south-200', name: 'South 200', density: jitter(35 + Math.cos(t * 0.3) * 10, 6), trend: 'falling', capacity: SECTION_CAPACITY.NORTH_SOUTH_200, current: Math.floor(5250 + Math.cos(t * 0.3) * 1500) },
    { id: 'concourse-n', name: 'N. Concourse', density: jitter(91 + Math.sin(t * 0.5) * 5, 3), trend: 'rising', capacity: SECTION_CAPACITY.CONCOURSE, current: Math.floor(4550 + Math.sin(t * 0.5) * 250) },
    { id: 'concourse-s', name: 'S. Concourse', density: jitter(40 + Math.cos(t * 0.4) * 8, 5), trend: 'stable', capacity: SECTION_CAPACITY.CONCOURSE, current: Math.floor(2000 + Math.cos(t * 0.4) * 400) },
  ];
}

// ── Transport Status ───────────────────────────────────

/**
 * Generates current transportation service status for all transit options.
 * Simulates metro, bus, taxi, and parking availability near the stadium.
 *
 * @returns {TransportStatus[]} Array of 6 transport services with real-time status.
 */
export function getTransportStatus(): TransportStatus[] {
  const t = Date.now() / 60000;
  return [
    { id: 'metro', type: 'metro', label: 'Metro Line 3', capacity: jitter(62 + Math.sin(t * 0.2) * 15, 5), eta: `${Math.floor(3 + Math.random() * 4)} min`, status: 'operational' },
    { id: 'bus-a', type: 'bus', label: 'Shuttle Bus A', capacity: jitter(45 + Math.cos(t * 0.3) * 10, 8), eta: `${Math.floor(5 + Math.random() * 8)} min`, status: 'operational' },
    { id: 'bus-b', type: 'bus', label: 'Shuttle Bus B', capacity: jitter(80 + Math.sin(t * 0.4) * 10, 5), eta: `${Math.floor(8 + Math.random() * 6)} min`, status: 'delayed' },
    { id: 'taxi', type: 'taxi', label: 'Taxi Stand', capacity: jitter(30 + Math.cos(t * 0.25) * 15, 8), eta: `${Math.floor(2 + Math.random() * 5)} min`, status: 'operational' },
    { id: 'parking-a', type: 'parking', label: 'Parking A', capacity: jitter(72 + Math.sin(t * 0.15) * 8, 4), eta: '—', status: 'operational' },
    { id: 'parking-b', type: 'parking', label: 'Parking B', capacity: jitter(95 + Math.cos(t * 0.1) * 3, 2), eta: '—', status: 'full' },
  ];
}

// ── Sustainability Metrics ─────────────────────────────

/**
 * Generates current sustainability and environmental impact metrics.
 * Tracks energy, water, waste diversion, and carbon offset progress.
 *
 * @returns {SustainabilityMetric[]} Array of 4 environmental metrics.
 */
export function getSustainabilityMetrics(): SustainabilityMetric[] {
  const t = Date.now() / 60000;
  return [
    { label: 'Energy Usage', value: Math.floor(342 + Math.sin(t * 0.2) * 40), max: SUSTAINABILITY_LIMITS.MAX_ENERGY_KWH, unit: 'kWh', trend: 'up' },
    { label: 'Water Consumption', value: Math.floor(1800 + Math.cos(t * 0.15) * 200), max: SUSTAINABILITY_LIMITS.MAX_WATER_L, unit: 'L', trend: 'stable' },
    { label: 'Waste Diverted', value: Math.floor(67 + Math.sin(t * 0.3) * 5), max: SUSTAINABILITY_LIMITS.MAX_WASTE_DIVERSION_PCT, unit: '%', trend: 'up' },
    { label: 'Carbon Offset', value: Math.floor(42 + Math.cos(t * 0.25) * 8), max: SUSTAINABILITY_LIMITS.MAX_CARBON_OFFSET_PCT, unit: '%', trend: 'down' },
  ];
}

// ── Volunteer Tasks ────────────────────────────────────

/**
 * Generates the current volunteer task queue.
 * Tasks are priority-ranked with urgency indicators and zone assignments.
 *
 * @returns {VolunteerTask[]} Array of 5 volunteer tasks sorted by priority.
 */
export function getVolunteerTasks(): VolunteerTask[] {
  return [
    { id: 'vt-1', title: 'Assist wheelchair access at Gate N', zone: 'Gate N', priority: 'high', status: 'active', assignedAt: Date.now() - 300000 },
    { id: 'vt-2', title: 'Translate Arabic for family at WC 1', zone: 'WC 1', priority: 'high', status: 'pending', assignedAt: Date.now() - 120000 },
    { id: 'vt-3', title: 'Restock water station Food Court A', zone: 'Food Court A', priority: 'medium', status: 'pending', assignedAt: Date.now() - 600000 },
    { id: 'vt-4', title: 'Guide elderly group to Section 112', zone: 'Section 112', priority: 'medium', status: 'active', assignedAt: Date.now() - 180000 },
    { id: 'vt-5', title: 'Report broken handrail at Elevator Bank A', zone: 'Elevator Bank A', priority: 'low', status: 'done', assignedAt: Date.now() - 900000 },
  ];
}

// ── Queue Time Estimation ──────────────────────────────

/**
 * Generates current estimated wait times for facilities and gates.
 * Wait times fluctuate based on time-based sinusoidal functions.
 *
 * @returns {Record<string, number>} Map of POI id to estimated wait time in minutes.
 *
 * @example
 * const times = getQueueTimes();
 * // times['g-n'] might return 14 (minutes)
 */
export function getQueueTimes(): Record<string, number> {
  const t = Date.now() / 60000;
  return {
    'f-1': Math.floor(18 + Math.sin(t * 0.5) * 8),
    'f-2': Math.floor(3 + Math.cos(t * 0.4) * 2),
    'r-1': Math.floor(5 + Math.sin(t * 0.3) * 3),
    'r-2': Math.floor(2 + Math.cos(t * 0.35) * 1),
    'r-3': Math.floor(8 + Math.sin(t * 0.45) * 4),
    'r-4': Math.floor(3 + Math.cos(t * 0.25) * 2),
    'merch-1': Math.floor(12 + Math.sin(t * 0.2) * 5),
    'g-n': Math.floor(14 + Math.sin(t * 0.4) * 6),
    'g-s': Math.floor(6 + Math.cos(t * 0.3) * 3),
    'g-e': Math.floor(8 + Math.sin(t * 0.35) * 4),
    'g-w': Math.floor(4 + Math.cos(t * 0.45) * 2),
  };
}
