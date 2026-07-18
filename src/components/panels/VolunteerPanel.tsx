import { useState } from 'react';
import { Users, Globe, AlertTriangle, Clock, Sparkles, CheckCircle, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { getVolunteerTasks } from '../../data/simulation';

export default function VolunteerPanel() {
  const [tasks] = useState(getVolunteerTasks());
  const priorityColors = {
    high: 'text-red-400 bg-red-500/15 border-red-500/25',
    medium: 'text-amber-400 bg-amber-500/15 border-amber-500/25',
    low: 'text-white/50 bg-white/[0.04] border-white/[0.06]',
  };
  const statusIcons = {
    active: <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />,
    pending: <Circle className="w-3.5 h-3.5 text-amber-400" />,
    done: <CheckCircle className="w-3.5 h-3.5 text-green-400" />,
  };

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-black/30 backdrop-blur-2xl border-l border-white/[0.08] flex flex-col z-40 hidden md:flex relative" role="complementary" aria-label="Volunteer tasks">
      <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" /> My Tasks
          </h2>
          <p className="text-[11px] text-white/50 mt-1 tracking-wide">{tasks.filter(t=>t.status==='active').length} active · {tasks.filter(t=>t.status==='pending').length} pending</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">On Shift</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 relative z-10">
        <div className="bg-black/40 rounded-xl p-4 border border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-[12px] font-medium text-white">Shift Progress</div>
              <div className="text-[10px] text-white/40">Started 2h 45m ago</div>
            </div>
          </div>
          <div className="text-[18px] font-semibold text-emerald-400">5:15<span className="text-[11px] text-white/40 ml-1">left</span></div>
        </div>

        {tasks.map((task) => (
          <div key={task.id} className={cn("bg-black/40 rounded-xl p-4 border hover:border-white/[0.12] transition-colors",
            task.status === 'done' ? 'border-white/[0.04] opacity-50' : 'border-white/[0.08]')}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-1">{statusIcons[task.status]}</div>
                <div>
                  <div className={cn("text-[13px] font-medium", task.status === 'done' ? 'text-white/50 line-through' : 'text-white')}>{task.title}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">{task.zone}</div>
                </div>
              </div>
              <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border flex-shrink-0", priorityColors[task.priority])}>{task.priority}</span>
            </div>
          </div>
        ))}

        <div className="bg-black/40 rounded-xl p-4 border border-white/[0.08]">
          <div className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-3">Quick Actions</div>
          <div className="grid grid-cols-2 gap-2">
            {[{ icon: Globe, label: 'Translate', color: 'text-blue-400 hover:bg-blue-500/10' }, { icon: AlertTriangle, label: 'Report', color: 'text-red-400 hover:bg-red-500/10' }].map(a => (
              <button key={a.label} className={cn("flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] transition-colors text-[12px] font-medium", a.color)}>
                <a.icon className="w-4 h-4" /> {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-[12px] font-semibold text-emerald-200 mb-1">AI Task Priority</div>
            <div className="text-[11px] text-emerald-300/80 leading-relaxed">Wheelchair assist at Gate N is urgent — head there first. Arabic translation at WC-1 requested 2 min ago, do that next.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
