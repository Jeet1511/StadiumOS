import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Zap } from 'lucide-react';
import { useAI } from '../../hooks/useAI';
import type { Role } from '../../types';

export default function AIPanel({ role }: { role: Role }) {
  const { messages, isLoading, send } = useAI(role);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    send(input);
    setInput('');
  };

  const roleConfig = {
    fan: { title: 'FanPilot AI', subtitle: 'Your personal stadium assistant', chips: ["Navigate to my seat", "Shortest food queue near me", "When should I leave for metro?", "Accessible route options"] },
    security: { title: 'ThreatShield AI', subtitle: 'Security intelligence engine', chips: ["Crowd anomaly scan", "Gate N density analysis", "Evacuation readiness report", "Deploy units recommendation"] },
    organizer: { title: 'CommandCenter AI', subtitle: 'Operational intelligence', chips: ["Stadium status overview", "Staff redeployment plan", "Energy optimization report", "Post-match egress strategy"] },
    volunteer: { title: 'TaskPilot AI', subtitle: 'Smart task management', chips: ["Prioritize my tasks", "Translate to Arabic", "Report accessibility issue", "Shortest path to assignment"] },
  };

  const config = roleConfig[role];

  return (
    <div className="w-[340px] xl:w-[420px] h-full bg-black/30 backdrop-blur-2xl border-l border-white/[0.08] flex flex-col z-40 hidden md:flex relative" role="complementary" aria-label="AI assistant panel">
      
      <div className="p-6 border-b border-white/[0.08] relative z-10 flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            {config.title}
          </h2>
          <p className="text-[11px] text-white/50 mt-1 tracking-wide">{config.subtitle} · Gemini 2.0 Flash</p>
        </div>
        <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/25 px-2.5 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 relative z-10">
        {messages.length === 0 && (
          <>
            <div className="flex justify-start">
              <div className="bg-gradient-to-br from-purple-500/15 to-transparent text-white text-[13px] p-5 rounded-[20px] rounded-tl-[4px] max-w-[100%] border border-purple-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.3)] leading-relaxed">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-[11px] font-bold text-purple-400 uppercase tracking-widest">GenAI Powered</span>
                </div>
                <p className="text-white/80 text-[13px] leading-relaxed">
                  I'm connected to live stadium data — crowd density, queue times, transport status, and facility availability. Ask me anything or tap a suggestion below.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-1">
              {config.chips.map((text) => (
                <button key={text} onClick={() => send(text)}
                  className="bg-white/[0.04] border border-white/[0.1] text-white/70 text-[12px] font-medium px-4 py-2.5 rounded-full hover:bg-white/[0.08] hover:text-white hover:border-white/[0.2] transition-all duration-300 whitespace-nowrap hover:-translate-y-0.5">
                  {text}
                </button>
              ))}
            </div>
          </>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={
              msg.role === 'user'
                ? "bg-white/[0.06] text-white text-[13px] px-5 py-3.5 rounded-[18px] rounded-tr-[4px] max-w-[85%] border border-white/[0.08] leading-relaxed"
                : "bg-gradient-to-br from-purple-500/12 to-transparent text-white text-[13px] p-5 rounded-[20px] rounded-tl-[4px] max-w-[100%] border border-purple-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.2)] leading-relaxed"
            }>
              {msg.content || (msg.isStreaming && (
                <span className="inline-flex gap-1.5">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              ))}
              {msg.isStreaming && msg.content && (
                <span className="inline-block w-0.5 h-4 bg-purple-400 animate-pulse ml-0.5 align-text-bottom" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 relative z-10 border-t border-white/[0.08] bg-black/40">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Ask ${config.title}...`}
            id="ai-chat-input"
            aria-label="Chat with AI"
            disabled={isLoading}
            className="w-full bg-white/[0.04] border border-white/[0.12] rounded-[14px] pl-5 pr-14 py-3.5 text-[13px] focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 text-white placeholder:text-white/30 transition-all disabled:opacity-40"
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} id="ai-send-btn" aria-label="Send message"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 text-white/50 hover:text-purple-400 hover:bg-purple-500/15 rounded-[10px] transition-all disabled:opacity-20">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
