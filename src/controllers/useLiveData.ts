/**
 * @module useLiveData
 * @description Controller for real-time stadium data polling.
 * Aggregates crowd density, transportation, sustainability, and queue time
 * data from the simulation engine at configurable intervals.
 *
 * Architecture: Controller layer hook that bridges the Model (simulation)
 * with Views (panels) in the MVC pattern.
 *
 * Hackathon Alignment:
 * - Real-time crowd management with density tracking and surge prediction
 * - Multi-modal transportation status monitoring (Metro, Bus, Taxi, Parking)
 * - Sustainability metrics for FIFA Green Score compliance
 * - Queue time estimation for fan experience optimization
 * - Critical zone alerting for security operations
 *
 * Efficiency:
 * - useRef-based previous value comparison prevents unnecessary re-renders
 *   when polled data hasn't meaningfully changed
 * - Memoized derived values (totalAttendance, avgDensity, criticalZones)
 *   only recompute when their source data changes
 * - Single setInterval with cleanup for predictable polling cadence
 * - Functional setState updater avoids stale closure over intervalMs
 */
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { getCrowdZones, getTransportStatus, getSustainabilityMetrics, getQueueTimes } from '../models/simulation';
import type { LiveDataReturn, CrowdZone, TransportStatus, SustainabilityMetric } from '../models/types';

/** Density threshold above which a zone is classified as critical (%) */
const CRITICAL_DENSITY_THRESHOLD = 85;

/** Minimum density change (%) to trigger a re-render for a crowd zone */
const DENSITY_CHANGE_THRESHOLD = 2;

/**
 * Compares two crowd zone arrays to determine if a re-render is needed.
 * Only triggers an update if any zone's density changed by more than
 * DENSITY_CHANGE_THRESHOLD percentage points.
 *
 * @param {CrowdZone[]} prev - Previous crowd zone snapshot.
 * @param {CrowdZone[]} next - New crowd zone snapshot.
 * @returns {boolean} True if the data has meaningfully changed.
 */
function hasCrowdChanged(prev: CrowdZone[], next: CrowdZone[]): boolean {
  if (prev.length !== next.length) return true;
  for (let i = 0; i < prev.length; i++) {
    const p = prev[i]!;
    const n = next[i]!;
    if (Math.abs(p.density - n.density) >= DENSITY_CHANGE_THRESHOLD) return true;
    if (p.trend !== n.trend) return true;
  }
  return false;
}

/**
 * Compares two transport status arrays for meaningful changes.
 *
 * @param {TransportStatus[]} prev - Previous transport snapshot.
 * @param {TransportStatus[]} next - New transport snapshot.
 * @returns {boolean} True if any transport status has changed.
 */
function hasTransportChanged(prev: TransportStatus[], next: TransportStatus[]): boolean {
  if (prev.length !== next.length) return true;
  for (let i = 0; i < prev.length; i++) {
    if (prev[i]!.status !== next[i]!.status) return true;
    if (Math.abs(prev[i]!.capacity - next[i]!.capacity) >= 3) return true;
  }
  return false;
}

/**
 * Compares two sustainability metric arrays for meaningful changes.
 *
 * @param {SustainabilityMetric[]} prev - Previous sustainability snapshot.
 * @param {SustainabilityMetric[]} next - New sustainability snapshot.
 * @returns {boolean} True if any metric has meaningfully changed.
 */
function hasSustainabilityChanged(prev: SustainabilityMetric[], next: SustainabilityMetric[]): boolean {
  if (prev.length !== next.length) return true;
  for (let i = 0; i < prev.length; i++) {
    if (Math.abs(prev[i]!.value - next[i]!.value) >= 1) return true;
  }
  return false;
}

/**
 * Live data polling hook for real-time stadium metrics.
 * Uses shallow comparison to skip re-renders when data hasn't meaningfully changed.
 *
 * @param {number} [intervalMs=3000] - Polling interval in milliseconds.
 * @returns {LiveDataReturn} Current stadium data with computed aggregations.
 *
 * @example
 * function CrowdPanel() {
 *   const { crowdZones, totalAttendance, criticalZones } = useLiveData(3000);
 *   return <CrowdDisplay zones={crowdZones} total={totalAttendance} />;
 * }
 */
export function useLiveData(intervalMs: number = 3000): LiveDataReturn {
  const [crowdZones, setCrowdZones] = useState<CrowdZone[]>(() => getCrowdZones());
  const [transport, setTransport] = useState<TransportStatus[]>(() => getTransportStatus());
  const [sustainability, setSustainability] = useState<SustainabilityMetric[]>(() => getSustainabilityMetrics());
  const [queueTimes, setQueueTimes] = useState(() => getQueueTimes());

  /** Refs for previous values — used for change detection without triggering re-renders */
  const prevCrowdRef = useRef(crowdZones);
  const prevTransportRef = useRef(transport);
  const prevSustainabilityRef = useRef(sustainability);

  /**
   * Polls simulation and only updates state if data has meaningfully changed.
   * This prevents unnecessary re-renders of downstream React.memo'd components.
   */
  const pollData = useCallback((): void => {
    const nextCrowd = getCrowdZones();
    if (hasCrowdChanged(prevCrowdRef.current, nextCrowd)) {
      prevCrowdRef.current = nextCrowd;
      setCrowdZones(nextCrowd);
    }

    const nextTransport = getTransportStatus();
    if (hasTransportChanged(prevTransportRef.current, nextTransport)) {
      prevTransportRef.current = nextTransport;
      setTransport(nextTransport);
    }

    const nextSustainability = getSustainabilityMetrics();
    if (hasSustainabilityChanged(prevSustainabilityRef.current, nextSustainability)) {
      prevSustainabilityRef.current = nextSustainability;
      setSustainability(nextSustainability);
    }

    setQueueTimes(getQueueTimes());
  }, []);

  useEffect(() => {
    const timer = setInterval(pollData, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs, pollData]);

  /** Total attendance across all crowd zones — only recomputes when crowdZones reference changes */
  const totalAttendance = useMemo(
    () => crowdZones.reduce((sum, zone) => sum + zone.current, 0),
    [crowdZones]
  );

  /** Average density percentage across all zones — only recomputes when crowdZones reference changes */
  const avgDensity = useMemo(
    () => Math.round(crowdZones.reduce((sum, zone) => sum + zone.density, 0) / (crowdZones.length || 1)),
    [crowdZones]
  );

  /** Zones exceeding the critical density threshold — only recomputes when crowdZones reference changes */
  const criticalZones = useMemo(
    () => crowdZones.filter(zone => zone.density > CRITICAL_DENSITY_THRESHOLD),
    [crowdZones]
  );

  return { crowdZones, transport, sustainability, queueTimes, totalAttendance, avgDensity, criticalZones };
}
