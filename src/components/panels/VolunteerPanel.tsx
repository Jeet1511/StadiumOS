import { useState } from 'react';
import { Users, Globe, AlertTriangle, Clock, Sparkles, CheckCircle, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { getVolunteerTasks } from '../../data/simulation';

export default function VolunteerPanel() {
  const [tasks] = useState(getVolunteerTasks());

  const priorityColors = {
    high: 'text-red-400 bg-red-500/10 border-red-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    low: 'text-white/40 bg-white/[0.03] border-white/[0.05]',
  };

  const statusIcons = {
    active: <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />,
    pending: <Circle className="w-3.5 h-3.5 text-amber-400" />,
    done: <CheckCircle className="w-3.5 h-3.5 text-green-400" />,
  };

  const activeCount = tasks.filter(t => t.status === 'active').length;
  const pendingCount = tasks.filter(t => t.status === 'pending').length;

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-white/[0.01] backdrop-blur-3xl border-l border-white/[0.05] flex flex-col z-40 hidden md:flex relative shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.5)]" role="complementary" aria-label="Volunteer tasks panel">
      <div className="absolute inset-0 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="p-6 border-b border-white/[0.05] relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white/90 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            My Tasks
          </h2>
          <p className="text-[11px] text-white/40 mt-1.5 tracking-wide">{activeCount} active • {pendingCount} pending</p>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-full">
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">On Shift</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 relative z-10">
        {/* Shift timer */}
        <div className="bg-[#050505]/80 rounded-[16px] p-4 border border-white/[0.05] shadow-[inset_0_2px_15px_rgba(0,0,0,0.4)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[12px] font-medium text-white/80">Shift Progress</div>
              <div className="text-[10px] text-white/40">Started 2h 45m ago</div>
            </div>
          </div>
          <div className="text-[18px] font-light text-emerald-400">5:15<span className="text-[11px] text-white/40 ml-1">left</span></div>
        </div>

        {/* Task list */}
        {tasks.map((task) => (
          <div key={task.id} className={cn(
            "bg-[#050505]/80 rounded-[16px] p-4 border shadow-[inset_0_2px_15px_rgba(0,0,0,0.4)] hover:border-white/[0.1] transition-colors",
            task.status === 'done' ? 'border-white/[0.03] opacity-50' : 'border-white/[0.05]'
          )}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">{statusIcons[task.status]}</div>
                <div>
                  <div className={cn("text-[13px] font-medium mb-1", task.status === 'done' ? 'text-white/50 line-through' : 'text-white/90')}>{task.title}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest">{task.zone}</div>
                </div>
              </div>
              <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-[6px] border flex-shrink-0", priorityColors[task.priority])}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}

        {/* Quick actions */}
        <div className="bg-[#050505]/80 rounded-[16px] p-5 border border-white/[0.05] shadow-[inset_0_2px_15px_rgba(0,0,0,0.4)]">
          <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-3">Quick Actions</div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Globe, label: 'Translate', color: 'text-blue-400 hover:bg-blue-500/10' },
              { icon: AlertTriangle, label: 'Report', color: 'text-red-400 hover:bg-red-500/10' },
            ].map(a => (
              <button key={a.label} className={cn("flex items-center gap-2 p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05] transition-colors text-[12px] font-medium", a.color)}>
                <a.icon className="w-4 h-4" /> {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[16px] p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-medium text-emerald-100 mb-1">AI Task Priority</div>
            <div className="text-[11px] text-emerald-300/70 leading-relaxed">Wheelchair assistance at Gate N is time-sensitive. Arabic translation at WC 1 requested 2 minutes ago — consider heading there after Gate N.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
