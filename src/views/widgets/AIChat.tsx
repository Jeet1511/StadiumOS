/* View: AI Chat — Conversational panel */
import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAI } from '../../controllers/useAI';
import { getRoleConfig } from '../../models/constants';
import StatusBadge from '../shared/StatusBadge';
import type { Role } from '../../models/types';

function getRoleGreeting(role: Role) {
  if (role === 'security') return "Security AI active. Access to CCTV, crowd density maps, and evacuation protocols. What do you need?";
  if (role === 'organizer') return "Operations AI online. Staffing, energy, sustainability metrics, and logistics at your disposal.";
  if (role === 'volunteer') return "Task AI ready. I can help with translations, task priorities, and venue navigation.";
  return "Welcome to Estadio Azteca! I can help you find your seat, get food, check wait times, and navigate the stadium.";
}

const quickQuestions: Record<string, string[]> = {
  fan: ['Where is my seat?', 'Nearest food?', 'Halftime?'],
  security: ['Gate N status?', 'Deploy to NW?', 'Threat level?'],
  organizer: ['Staff overview', 'Energy use?', 'Gate flow?'],
  volunteer: ['My tasks?', 'Translate help', 'Report issue'],
};

export default function AIChat({ role }: { role: Role }) {
  const { messages, isLoading, send } = useAI(role);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const rc = getRoleConfig(role);
  const badgeColor = role === 'security' ? 'rose' : role === 'organizer' ? 'violet' : role === 'volunteer' ? 'emerald' : 'cyan';
  const title = role === 'security' ? 'Threat Intel AI' : role === 'organizer' ? 'Command AI' : role === 'volunteer' ? 'Task AI' : 'FanPilot AI';

  const allMessages = messages.length > 0 ? messages : [{ id: 'greeting', role: 'assistant' as const, content: getRoleGreeting(role), timestamp: Date.now() }];

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    send(input.trim());
    setInput('');
  };

  return (
    <div className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative"
      style={{ background: 'rgba(4,8,15,0.9)', backdropFilter: 'blur(40px)' }}>
      {/* Left border */}
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.06] to-white/[0.03]" />

      {/* Header */}
      <div className="p-4 flex items-center justify-between shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div>
          <h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2">
            <Sparkles className={cn("w-3.5 h-3.5", rc.accent)} /> {title}
          </h2>
          <p className="text-[10px] text-white/25 mt-0.5 font-medium">Gemini 2.0 Flash · Context-aware</p>
        </div>
        <StatusBadge label="Online" color={badgeColor} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {allMessages.map((m, i) => (
          <div key={m.id || i} className={cn("flex gap-2.5", m.role === 'user' && "flex-row-reverse")}>
            <div className={cn(
              "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
              m.role === 'assistant' ? "bg-white/[0.04] border border-white/[0.06]" : "bg-white/[0.06] border border-white/[0.08]"
            )}>
              {m.role === 'assistant' ? <Bot className={cn("w-3 h-3", rc.accent)} /> : <User className="w-3 h-3 text-white/50" />}
            </div>
            <div className={cn(
              "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed",
              m.role === 'assistant'
                ? "bg-white/[0.03] text-white/80 border border-white/[0.05] rounded-tl-md"
                : "bg-cyan-500/8 text-cyan-50 border border-cyan-500/12 rounded-tr-md"
            )}>
              {m.content || (m.isStreaming && (
                <div className="flex gap-1">{[0,1,2].map(j => (
                  <div key={j} className="w-1.5 h-1.5 bg-white/30 rounded-full" style={{ animation: `typing-bounce 0.6s ${j * 0.15}s ease-in-out infinite` }} />
                ))}</div>
              ))}
            </div>
          </div>
        ))}
        {isLoading && messages.length > 0 && messages[messages.length-1]?.role !== 'assistant' && (
          <div className="flex gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
              <Bot className={cn("w-3 h-3 animate-pulse", rc.accent)} />
            </div>
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl rounded-tl-md px-3.5 py-2.5">
              <div className="flex gap-1">{[0,1,2].map(j => (
                <div key={j} className="w-1.5 h-1.5 bg-white/30 rounded-full" style={{ animation: `typing-bounce 0.6s ${j * 0.15}s ease-in-out infinite` }} />
              ))}</div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-3 shrink-0 relative">
        <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div className="flex gap-2 mt-1">
          <input
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={role === 'security' ? 'Ask about threats, protocols...' : 'Ask about the venue, directions...'}
            className="flex-1 bg-white/[0.025] border border-white/[0.06] rounded-xl px-3.5 py-2 text-[12px] text-white/80 placeholder:text-white/20 focus:outline-none focus:border-cyan-500/25 transition-all"
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()}
            className="px-3 py-2 rounded-xl transition-all disabled:opacity-20 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20">
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-1.5 mt-2">
          {(quickQuestions[role] || quickQuestions.fan).map(q => (
            <button key={q} onClick={() => setInput(q)}
              className="text-[9px] text-white/25 bg-white/[0.02] border border-white/[0.04] px-2 py-1 rounded-lg hover:bg-white/[0.05] hover:text-white/50 transition-all">
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
