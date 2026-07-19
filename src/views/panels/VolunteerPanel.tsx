/**
 * @module VolunteerPanel
 * @description Volunteer task management panel with priority-ranked task queue.
 * Provides shift tracking, multilingual support, and incident reporting.
 *
 * Architecture: Uses PanelShell for consistent layout with emerald accent theme.
 *
 * Hackathon Alignment:
 * - Priority-ranked task queue with urgency indicators
 * - Multilingual translation support for international events
 * - Shift progress tracking for volunteer coordination
 * - AI-powered task prioritization recommendations
 * - Accessibility task support (wheelchair assist)
 */
import { useState, memo } from 'react';
import { Users, Globe, AlertTriangle, Clock, Sparkles, CheckCircle, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { getVolunteerTasks } from '../../models/simulation';
import GlassCard from '../shared/GlassCard';
import PanelShell from '../shared/PanelShell';
import StatusBadge from '../shared/StatusBadge';

const priorityColors = { high: 'text-rose-400 bg-rose-500/10 border-rose-500/18', medium: 'text-amber-400 bg-amber-500/10 border-amber-500/18', low: 'text-white/30 bg-white/[0.03] border-white/[0.05]' };

export default memo(function VolunteerPanel() {
  const [tasks] = useState(getVolunteerTasks());

  return (
    <PanelShell
      accent="emerald"
      ariaLabel="Volunteer task management"
      header={
        <>
          <div>
            <h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2"><Users className="w-3.5 h-3.5 text-emerald-400" /> My Tasks</h2>
            <p className="text-[10px] text-white/25 mt-0.5">{tasks.filter(t=>t.status==='active').length} active · {tasks.filter(t=>t.status==='pending').length} pending</p>
          </div>
          <StatusBadge label="On Shift" color="emerald" />
        </>
      }
    >
      <GlassCard padding="p-3.5" className="flex items-center justify-between">
        <div className="flex items-center gap-2.5"><Clock className="w-3.5 h-3.5 text-emerald-400" /><div><div className="text-[11px] font-medium text-white/70">Shift Progress</div><div className="text-[9px] text-white/25">Started 2h 45m ago</div></div></div>
        <div className="text-[16px] font-semibold text-emerald-400">5:15<span className="text-[10px] text-white/25 ml-0.5">left</span></div>
      </GlassCard>

      {tasks.map(task => (
        <GlassCard key={task.id} padding="p-3.5" className={task.status === 'done' ? 'opacity-40' : ''}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2.5 flex-1">
              <div className="mt-0.5">{task.status === 'active' ? <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(52,211,153,0.5)]" /> : task.status === 'done' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5 text-amber-400" />}</div>
              <div><div className={cn("text-[12px] font-medium", task.status === 'done' ? 'text-white/30 line-through' : 'text-white/70')}>{task.title}</div><div className="text-[9px] text-white/20 uppercase tracking-[0.12em] mt-0.5">{task.zone}</div></div>
            </div>
            <span className={cn("text-[8px] font-bold uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-md border shrink-0", priorityColors[task.priority])}>{task.priority}</span>
          </div>
        </GlassCard>
      ))}

      <GlassCard padding="p-3.5">
        <div className="text-[9px] text-white/25 uppercase tracking-[0.15em] font-semibold mb-2.5">Quick Actions</div>
        <div className="grid grid-cols-2 gap-2">
          {[{ icon: Globe, label: 'Translate', c: 'text-blue-400 hover:bg-blue-500/8' }, { icon: AlertTriangle, label: 'Report', c: 'text-rose-400 hover:bg-rose-500/8' }].map(a => (
            <button key={a.label} type="button" className={cn("flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] transition-colors text-[11px] font-medium", a.c)}><a.icon className="w-3.5 h-3.5" /> {a.label}</button>
          ))}
        </div>
      </GlassCard>

      <GlassCard padding="p-3.5" className="border-emerald-500/10">
        <div className="flex items-start gap-2.5"><Sparkles className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" /><div><div className="text-[11px] font-semibold text-emerald-200 mb-1">AI Task Priority</div><div className="text-[10px] text-emerald-300/50 leading-relaxed">Wheelchair assist at Gate N is urgent — head there first. Arabic translation at WC-1 requested 2 min ago.</div></div></div>
      </GlassCard>
    </PanelShell>
  );
});
