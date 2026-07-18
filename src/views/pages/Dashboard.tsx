/* View: Dashboard — Panel router */
import type { Role } from '../../models/types';
import AIChat from '../widgets/AIChat';
import WayfindingPanel from '../panels/WayfindingPanel';
import SecurityPanel from '../panels/SecurityPanel';
import TicketPanel from '../panels/TicketPanel';
import TransportPanel from '../panels/TransportPanel';
import SustainabilityPanel from '../panels/SustainabilityPanel';
import CrowdPanel from '../panels/CrowdPanel';
import VolunteerPanel from '../panels/VolunteerPanel';
import AccessibilityPanel from '../panels/AccessibilityPanel';

export function getActivePanel(role: Role, activeNav: string) {
  switch (activeNav) {
    case 'nav': return <WayfindingPanel />;
    case 'ticket': return <TicketPanel />;
    case 'transport': return <TransportPanel />;
    case 'access': return <AccessibilityPanel />;
    case 'evac': return <SecurityPanel />;
    case 'crowd': return <CrowdPanel />;
    case 'sustain': return <SustainabilityPanel />;
    case 'tasks': return <VolunteerPanel />;
    case 'ai': return <AIChat role={role} />;
    default: return <AIChat role={role} />;
  }
}
