/**
 * @module LiveDataContext
 * @description Shared context for real-time stadium data.
 * Provides a single polling instance so multiple panels (CrowdPanel,
 * SustainabilityPanel, HomePanel, etc.) share the same data without
 * creating duplicate setInterval timers.
 *
 * Architecture: Sits between the useLiveData controller and View layer.
 * Eliminates N independent polling loops → 1 shared loop.
 *
 * Efficiency:
 * - Single 3-second polling interval shared across all consumer panels
 * - useLiveData internally uses useRef comparison to skip no-change updates
 * - Context value is the direct return of useLiveData (already reference-stable
 *   for unchanged data thanks to the split-state optimization)
 * - LiveDataProvider should be placed ABOVE the panel router but BELOW
 *   the Landing page to avoid polling during role selection
 *
 * Hackathon Alignment:
 * - Powers real-time crowd density heatmaps (CrowdPanel)
 * - Powers multi-modal transit status (TransportPanel)
 * - Powers sustainability KPIs (SustainabilityPanel)
 * - Powers queue time estimates (HomePanel, WayfindingPanel)
 * - Powers critical zone alerts (SecurityPanel)
 */
import { createContext, useContext, type ReactNode } from 'react';
import { useLiveData } from './useLiveData';
import type { LiveDataReturn } from '../models/types';

/**
 * React Context for live stadium data.
 * Null when no provider is present (error case).
 */
const LiveDataContext = createContext<LiveDataReturn | null>(null);

/**
 * Provides live stadium data to all child components via React Context.
 * Place this high in the component tree so all panels share one polling loop.
 *
 * @param {object} props - Provider props.
 * @param {ReactNode} props.children - Child components that may consume live data.
 * @param {number} [props.intervalMs=3000] - Polling interval in milliseconds.
 * @returns {React.JSX.Element} Context provider wrapping children.
 *
 * @example
 * <LiveDataProvider intervalMs={3000}>
 *   <Dashboard />
 * </LiveDataProvider>
 */
export function LiveDataProvider({ children, intervalMs = 3000 }: {
  readonly children: ReactNode;
  readonly intervalMs?: number;
}): React.JSX.Element {
  const data = useLiveData(intervalMs);

  return (
    <LiveDataContext.Provider value={data}>
      {children}
    </LiveDataContext.Provider>
  );
}

/**
 * Consumes shared live stadium data from the nearest LiveDataProvider.
 * Throws if used outside a provider — fail-fast to prevent silent bugs.
 *
 * @returns {LiveDataReturn} Current stadium data with computed aggregations.
 * @throws {Error} If called outside a LiveDataProvider.
 *
 * @example
 * function CrowdPanel() {
 *   const { crowdZones, criticalZones } = useSharedLiveData();
 *   return <ZoneGrid zones={crowdZones} alerts={criticalZones} />;
 * }
 */
export function useSharedLiveData(): LiveDataReturn {
  const ctx = useContext(LiveDataContext);
  if (!ctx) {
    throw new Error(
      'useSharedLiveData must be used within a LiveDataProvider. ' +
      'Ensure the component tree includes <LiveDataProvider> above this consumer.'
    );
  }
  return ctx;
}
