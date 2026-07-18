import { useState, useRef } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { sendMessage } from '../../services/ai-service';
import type { Role } from '../../types';

interface Msg { role: 'user' | 'ai'; text: string }

export default function AIPanel({ role }: { role: Role }) {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'ai', text: getRoleGreeting(role) }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setInput('');
    setMsgs(p => [...p, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const res = await sendMessage(q, role);
      setMsgs(p => [...p, { role: 'ai', text: res }]);
    } catch { setMsgs(p => [...p, { role: 'ai', text: 'Connection issue — please try again.' }]); }
    setLoading(false);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const title = role === 'security' ? 'Threat Intel AI' : role === 'organizer' ? 'Command AI' : role === 'volunteer' ? 'Task AI' : 'FanPilot AI';
  const accent = role === 'security' ? 'rose' : role === 'organizer' ? 'indigo' : role === 'volunteer' ? 'emerald' : 'indigo';

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-[#151d2e]/95 backdrop-blur-2xl border-l border-white/[0.06] flex flex-col z-40 hidden md:flex">
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h2 className="text-[14px] font-semibold text-slate-200 flex items-center gap-2">
            <Sparkles className={`w-4 h-4 text-${accent}-400`} /> {title}
          </h2>
          <p className="text-[11px] text-slate-500 mt-1">Gemini 2.0 Flash · Context-aware</p>
        </div>
        <div className={`flex items-center gap-1.5 bg-${accent}-500/12 border border-${accent}-500/20 px-2.5 py-1.5 rounded-full`}>
          <div className={`w-2 h-2 bg-${accent}-400 rounded-full animate-pulse`} />
          <span className={`text-[10px] font-bold text-${accent}-400 uppercase tracking-widest`}>Online</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {msgs.map((m, i) => (
          <div key={i} className={cn("flex gap-3", m.role === 'user' && "flex-row-reverse")}>
            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
              m.role === 'ai' ? `bg-${accent}-500/12 border border-${accent}-500/20` : "bg-white/[0.06] border border-white/[0.06]"
            )}>
              {m.role === 'ai' ? <Bot className={`w-3.5 h-3.5 text-${accent}-400`} /> : <User className="w-3.5 h-3.5 text-slate-400" />}
            </div>
            <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed",
              m.role === 'ai' ? "bg-[#1a2438] text-slate-200 border border-white/[0.05] rounded-tl-md" : "bg-indigo-500/12 text-indigo-100 border border-indigo-500/15 rounded-tr-md"
            )}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className={`w-7 h-7 rounded-lg bg-${accent}-500/12 border border-${accent}-500/20 flex items-center justify-center flex-shrink-0`}>
              <Bot className={`w-3.5 h-3.5 text-${accent}-400 animate-pulse`} />
            </div>
            <div className="bg-[#1a2438] border border-white/[0.05] rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1.5">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{animationDelay:`${i*150}ms`}} />)}</div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={role === 'security' ? 'Ask about threats, protocols...' : 'Ask about the venue, directions...'}
            className="flex-1 bg-[#1a2438] border border-white/[0.06] rounded-xl px-4 py-2.5 text-[13px] text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/30 transition-all" />
          <button onClick={send} disabled={loading || !input.trim()} className="px-3 py-2.5 bg-indigo-500/15 border border-indigo-500/25 rounded-xl text-indigo-400 hover:bg-indigo-500/25 transition-all disabled:opacity-30">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          {(role === 'fan' ? ['Where is my seat?', 'Nearest food?', 'Halftime?'] : role === 'security' ? ['Gate N status?', 'Deploy to NW?', 'Threat level?'] : ['Staff overview', 'Energy use?', 'Gate flow?']).map(q => (
            <button key={q} onClick={() => { setInput(q); }} className="text-[10px] text-slate-500 bg-white/[0.03] border border-white/[0.04] px-2.5 py-1.5 rounded-lg hover:bg-white/[0.06] hover:text-slate-300 transition-all">{q}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getRoleGreeting(role: Role) {
  if (role === 'security') return "Security AI ready. I have access to CCTV feeds, crowd density, and evacuation protocols. What do you need?";
  if (role === 'organizer') return "Operations AI online. I can help with staffing, energy, sustainability metrics, and logistics. How can I assist?";
  if (role === 'volunteer') return "Task AI here. I can help with translations, task priorities, and navigation. What do you need?";
  return "Welcome to Estadio Azteca! I can help you find your seat, get food, check wait times, and navigate the stadium. What would you like to know?";
}
