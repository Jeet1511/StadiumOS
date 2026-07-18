/* Controller: Live Data Polling */
import { useState, useEffect } from 'react';
import { getCrowdZones, getTransportStatus, getSustainabilityMetrics, getQueueTimes } from '../models/simulation';
import type { CrowdZone, TransportStatus, SustainabilityMetric } from '../models/types';

export function useLiveData(intervalMs = 3000) {
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

  const totalAttendance = crowdZones.reduce((s, z) => s + z.current, 0);
  const avgDensity = Math.round(crowdZones.reduce((s, z) => s + z.density, 0) / (crowdZones.length || 1));
  const criticalZones = crowdZones.filter(z => z.density > 85);

  return { crowdZones, transport, sustainability, queueTimes, totalAttendance, avgDensity, criticalZones };
}
