/**
 * @module Dashboard
 * @description Panel router for the main dashboard view.
 * Lazy-loads feature panels based on active navigation state and user role.
 *
 * Architecture: Maps navigation IDs to lazy-loaded panel components,
 * wrapped in Suspense for code splitting. Each panel is a separate chunk.
 *
 * Hackathon Alignment: All 10 hackathon features (navigation, crowd management,
 * accessibility, transportation, sustainability, AI chat, ticketing,
 * security, volunteer tasks, and operations overview) are routable panels.
 */
import { Suspense, lazy } from 'react';
import type { ReactNode } from 'react';
import type { Role } from '../../models/types';

const HomePanel = lazy(() => import('../panels/HomePanel'));
const AIChat = lazy(() => import('../widgets/AIChat'));
const WayfindingPanel = lazy(() => import('../panels/WayfindingPanel'));
const SecurityPanel = lazy(() => import('../panels/SecurityPanel'));
const TicketPanel = lazy(() => import('../panels/TicketPanel'));
const TransportPanel = lazy(() => import('../panels/TransportPanel'));
const SustainabilityPanel = lazy(() => import('../panels/SustainabilityPanel'));
const CrowdPanel = lazy(() => import('../panels/CrowdPanel'));
const VolunteerPanel = lazy(() => import('../panels/VolunteerPanel'));
const AccessibilityPanel = lazy(() => import('../panels/AccessibilityPanel'));

const panelFallback = <div className="h-full w-full" aria-hidden="true" />;

/**
 * Returns the appropriate panel component for the active navigation state.
 *
 * @param {Role} role - Current user role for context-adaptive panels.
 * @param {string} activeNav - Currently active navigation item ID.
 * @returns {ReactNode} The panel component wrapped in Suspense.
 */
export function getActivePanel(role: Role, activeNav: string): ReactNode {
  let panel: ReactNode;

  switch (activeNav) {
    case 'home':
      panel = <HomePanel />;
      break;
    case 'nav':
      panel = <WayfindingPanel />;
      break;
    case 'ticket':
      panel = <TicketPanel />;
      break;
    case 'transport':
      panel = <TransportPanel />;
      break;
    case 'access':
      panel = <AccessibilityPanel />;
      break;
    case 'evac':
      panel = <SecurityPanel />;
      break;
    case 'crowd':
      panel = <CrowdPanel />;
      break;
    case 'sustain':
      panel = <SustainabilityPanel />;
      break;
    case 'tasks':
      panel = <VolunteerPanel />;
      break;
    case 'ai':
    default:
      panel = <AIChat role={role} />;
      break;
  }

  return <Suspense fallback={panelFallback}>{panel}</Suspense>;
}
