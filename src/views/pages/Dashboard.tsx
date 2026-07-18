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
  if (role === 'fan') {
    if (activeNav === 'nav') return <WayfindingPanel />;
    if (activeNav === 'ticket') return <TicketPanel />;
    if (activeNav === 'transport') return <TransportPanel />;
    if (activeNav === 'access') return <AccessibilityPanel />;
  }
  if (role === 'security') {
    if (activeNav === 'evac') return <SecurityPanel />;
    if (activeNav === 'crowd' || activeNav === 'cctv') return <CrowdPanel />;
  }
  if (role === 'organizer') {
    if (activeNav === 'sustain') return <SustainabilityPanel />;
    if (activeNav === 'staff') return <CrowdPanel />;
    if (activeNav === 'overview') return <TransportPanel />;
  }
  if (role === 'volunteer') {
    if (activeNav === 'tasks' || activeNav === 'translate') return <VolunteerPanel />;
    if (activeNav === 'nav') return <WayfindingPanel />;
  }
  return <AIChat role={role} />;
}
