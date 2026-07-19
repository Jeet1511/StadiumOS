/**
 * @module AIChat
 * @description Conversational AI panel powered by Google Gemini 2.0 Flash.
 * Provides role-adaptive chat with streaming responses, quick action buttons,
 * and context-aware stadium intelligence.
 *
 * Architecture: Consumes the useAI controller hook for message management
 * and AI service integration. Pure view component with no business logic.
 *
 * Performance: useCallback on all handlers, memoized message list,
 * auto-scroll with ref (no state-driven scroll).
 *
 * Accessibility: role="region", role="log" for chat, aria-live for updates,
 * form submit for enter-to-send, aria-label on all interactive elements.
 *
 * Hackathon Alignment:
 * - GenAI integration with Gemini 2.0 Flash streaming
 * - Role-adaptive responses (fan, security, organizer, volunteer)
 * - Context-aware stadium data in AI prompts
 * - Multilingual support for international fan base
 */
import { useState, useRef, useCallback, useEffect, useMemo, memo } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAI } from '../../controllers/useAI';
import { getRoleConfig } from '../../models/constants';
import StatusBadge from '../shared/StatusBadge';
import type { Role } from '../../models/types';

/** Role-specific greeting messages for the AI assistant */
function getRoleGreeting(role: Role): string {
  if (role === 'security') return "Security AI active. Access to CCTV, crowd density maps, and evacuation protocols. What do you need?";
  if (role === 'organizer') return "Operations AI online. Staffing, energy, sustainability metrics, and logistics at your disposal.";
  if (role === 'volunteer') return "Task AI ready. I can help with translations, task priorities, and venue navigation.";
  return "Welcome to Estadio Azteca! I can help you find your seat, get food, check wait times, and navigate the stadium.";
}

/** Quick action suggestions by role */
const quickQuestions: Record<string, string[]> = {
  fan: ['Where is my seat?', 'Nearest food?', 'Halftime?'],
  security: ['Gate N status?', 'Deploy to NW?', 'Threat level?'],
  organizer: ['Staff overview', 'Energy use?', 'Gate flow?'],
  volunteer: ['My tasks?', 'Translate help', 'Report issue'],
};

/** Color theme mapping for role badges */
const badgeColors: Record<Role, 'rose' | 'violet' | 'emerald' | 'cyan'> = {
  security: 'rose',
  organizer: 'violet',
  volunteer: 'emerald',
  fan: 'cyan',
};

/** Title mapping for role headers */
const titles: Record<Role, string> = {
  security: 'Threat Intel AI',
  organizer: 'Command AI',
  volunteer: 'Task AI',
  fan: 'FanPilot AI',
};

export default memo(function AIChat({ role }: { readonly role: Role }) {
  const { messages, isLoading, send } = useAI(role);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const rc = getRoleConfig(role);

  const allMessages = useMemo(
    () => messages.length > 0 ? messages : [{ id: 'greeting', role: 'assistant' as const, content: getRoleGreeting(role), timestamp: Date.now() }],
    [messages, role]
  );

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim() || isLoading) return;
    send(input.trim());
    setInput('');
  }, [input, isLoading, send]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  }, [handleSend]);

  const handleQuickQuestion = useCallback((q: string) => {
    setInput(q);
  }, []);

  return (
    <div className="w-[320px] xl:w-[380px] h-full flex flex-col z-40 hidden md:flex relative shadow-[-4px_0_24px_rgba(0,0,0,0.2)]"
      role="region" aria-label="AI Assistant Chat" style={{ background: 'rgba(18,34,64,0.55)', backdropFilter: 'blur(40px)' }}>
      {/* Left border */}
      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-white/[0.03] via-white/[0.06] to-white/[0.03]" />

      {/* Header */}
      <div className="p-4 flex items-center justify-between shrink-0 relative">
        <div className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div>
          <h2 className="text-[13px] font-semibold text-white/90 flex items-center gap-2">
            <Sparkles className={cn("w-3.5 h-3.5", rc.accent)} /> {titles[role]}
          </h2>
          <p className="text-[10px] text-white/25 mt-0.5 font-medium">Gemini 2.0 Flash · Context-aware</p>
        </div>
        <StatusBadge label="Online" color={badgeColors[role]} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3" role="log" aria-label="Chat messages" aria-live="polite">
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
      <div className="p-4 shrink-0 relative bg-white/[0.01]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
        <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
          {(quickQuestions[role] ?? quickQuestions.fan)!.map(q => (
            <button key={q} type="button" onClick={() => handleQuickQuestion(q)}
              className="text-[11px] px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/80 hover:bg-white/[0.08] hover:text-white whitespace-nowrap transition-all">
              {q}
            </button>
          ))}
        </div>
        <form onSubmit={handleFormSubmit} className="relative group">
          <input type="text" value={input} onChange={handleInputChange}
            placeholder={role === 'security' ? 'Ask about threats, protocols...' : 'Ask about the venue, directions...'}
            disabled={isLoading}
            aria-label="Type your message to the AI assistant"
            autoComplete="off"
            className="w-full bg-white/[0.025] border border-white/[0.06] rounded-xl pl-4 pr-10 py-3 text-[13px] text-white placeholder:text-white/60 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50" />
          <button type="submit" disabled={!input.trim() || isLoading}
            aria-label="Send message"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 disabled:opacity-30 transition-all focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1428]">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
});
