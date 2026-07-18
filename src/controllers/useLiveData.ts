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
 * - Real-time crowd management with density tracking
 * - Multi-modal transportation status monitoring
 * - Sustainability metrics for FIFA Green Score
 * - Queue time estimation for fan experience optimization
 * - Critical zone alerting for security operations
 *
 * Efficiency: Memoized computed values prevent unnecessary re-renders.
 * Uses setInterval for predictable polling cadence.
 */
import { useState, useEffect, useMemo } from 'react';
import { getCrowdZones, getTransportStatus, getSustainabilityMetrics, getQueueTimes } from '../models/simulation';
import type { CrowdZone, TransportStatus, SustainabilityMetric, LiveDataReturn } from '../models/types';

/** Density threshold above which a zone is classified as critical */
const CRITICAL_DENSITY_THRESHOLD = 85;

/**
 * Live data polling hook for real-time stadium metrics.
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
  const [crowdZones, setCrowdZones] = useState<CrowdZone[]>(getCrowdZones());
  const [transport, setTransport] = useState<TransportStatus[]>(getTransportStatus());
  const [sustainability, setSustainability] = useState<SustainabilityMetric[]>(getSustainabilityMetrics());
  const [queueTimes, setQueueTimes] = useState<Record<string, number>>(getQueueTimes());

  useEffect(() => {
    const timer = setInterval(() => {
      setCrowdZones(getCrowdZones());
      setTransport(getTransportStatus());
      setSustainability(getSustainabilityMetrics());
      setQueueTimes(getQueueTimes());
    }, intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);

  /** Total attendance across all crowd zones (memoized). */
  const totalAttendance = useMemo(
    () => crowdZones.reduce((s, z) => s + z.current, 0),
    [crowdZones]
  );

  /** Average density percentage across all zones (memoized). */
  const avgDensity = useMemo(
    () => Math.round(crowdZones.reduce((s, z) => s + z.density, 0) / (crowdZones.length || 1)),
    [crowdZones]
  );

  /** Zones exceeding the critical density threshold (memoized). */
  const criticalZones = useMemo(
    () => crowdZones.filter(z => z.density > CRITICAL_DENSITY_THRESHOLD),
    [crowdZones]
  );

  return { crowdZones, transport, sustainability, queueTimes, totalAttendance, avgDensity, criticalZones };
}
