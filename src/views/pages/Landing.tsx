/* View: Landing — Bright & Colorful Role Selection */
import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ROLES } from '../../models/constants';
import type { Role } from '../../models/types';

const stagger = { animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } };
const fadeUp = { initial: { opacity: 0, y: 24, filter: 'blur(10px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' } };

const cardColors: Record<string, { bg: string; border: string; hoverBg: string; iconBg: string; iconColor: string; glow: string }> = {
  fan: {
    bg: 'bg-gradient-to-br from-cyan-500/[0.08] via-sky-500/[0.04] to-transparent',
    border: 'border-cyan-500/20 hover:border-cyan-400/40',
    hoverBg: 'hover:from-cyan-500/[0.14] hover:via-sky-500/[0.08]',
    iconBg: 'bg-gradient-to-br from-cyan-500/25 to-cyan-600/10',
    iconColor: 'text-cyan-300',
    glow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]',
  },
  security: {
    bg: 'bg-gradient-to-br from-rose-500/[0.08] via-pink-500/[0.04] to-transparent',
    border: 'border-rose-500/20 hover:border-rose-400/40',
    hoverBg: 'hover:from-rose-500/[0.14] hover:via-pink-500/[0.08]',
    iconBg: 'bg-gradient-to-br from-rose-500/25 to-rose-600/10',
    iconColor: 'text-rose-300',
    glow: 'hover:shadow-[0_0_40px_rgba(251,113,133,0.12)]',
  },
  organizer: {
    bg: 'bg-gradient-to-br from-violet-500/[0.08] via-purple-500/[0.04] to-transparent',
    border: 'border-violet-500/20 hover:border-violet-400/40',
    hoverBg: 'hover:from-violet-500/[0.14] hover:via-purple-500/[0.08]',
    iconBg: 'bg-gradient-to-br from-violet-500/25 to-violet-600/10',
    iconColor: 'text-violet-300',
    glow: 'hover:shadow-[0_0_40px_rgba(167,139,250,0.12)]',
  },
  volunteer: {
    bg: 'bg-gradient-to-br from-emerald-500/[0.08] via-green-500/[0.04] to-transparent',
    border: 'border-emerald-500/20 hover:border-emerald-400/40',
    hoverBg: 'hover:from-emerald-500/[0.14] hover:via-green-500/[0.08]',
    iconBg: 'bg-gradient-to-br from-emerald-500/25 to-emerald-600/10',
    iconColor: 'text-emerald-300',
    glow: 'hover:shadow-[0_0_40px_rgba(52,211,153,0.12)]',
  },
};

export default function Landing({ onSelect }: { onSelect: (role: Role) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(16px)' }} transition={{ duration: 0.7 }}
      className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #080e1e 0%, #0c1a30 40%, #0a1428 100%)' }}>

      {/* COLORFUL ambient mesh — vibrant blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/[0.07] blur-[180px] animate-float" />
        <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full bg-violet-500/[0.06] blur-[200px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-amber-500/[0.035] blur-[160px] animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[25%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-rose-500/[0.03] blur-[140px] animate-float" style={{ animationDelay: '6s' }} />
        <div className="absolute bottom-[30%] left-[8%] w-[25vw] h-[25vw] rounded-full bg-emerald-500/[0.04] blur-[130px] animate-float" style={{ animationDelay: '3s' }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div variants={stagger} initial="initial" animate="animate" className="relative z-10 max-w-[920px] w-full px-6 flex flex-col items-center">
        {/* Logo mark */}
        <motion.div variants={fadeUp} transition={{ type: 'spring', stiffness: 200, damping: 28 }}
          className="w-16 h-16 rounded-2xl glass-float border-glow-cyan flex items-center justify-center mb-6 relative overflow-hidden">
          <div className="absolute inset-0 animate-glow" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.18), transparent)' }} />
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="relative z-10">
            <circle cx="15" cy="15" r="11" stroke="url(#lg)" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="15" cy="15" r="5.5" stroke="url(#lg)" strokeWidth="1.2" fill="none" opacity="0.8" />
            <circle cx="15" cy="15" r="2" fill="#22d3ee" />
            <path d="M15 4v4M15 22v4M4 15h4M22 15h4" stroke="#22d3ee" strokeWidth="0.8" opacity="0.4" />
            <defs><linearGradient id="lg" x1="0" y1="0" x2="30" y2="30"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#a78bfa" /></linearGradient></defs>
          </svg>
        </motion.div>

        {/* Title — gradient shimmer */}
        <motion.h1 variants={fadeUp} transition={{ type: 'spring', stiffness: 200, damping: 28 }} className="text-[46px] font-extrabold tracking-tight mb-1.5 text-center">
          <span className="text-white">Stadium</span><span className="text-shimmer">OS</span>
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ type: 'spring', stiffness: 200, damping: 28 }} className="text-white/35 text-[13px] mb-2 tracking-[0.2em] font-semibold uppercase text-center">
          GenAI-Powered Stadium Intelligence
        </motion.p>
        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-12">
          <div className="h-[3px] w-16 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500 animate-gradient-x" />
          <span className="text-[10px] text-white/25 font-semibold tracking-[0.15em] uppercase">FIFA World Cup 2026</span>
          <div className="h-[3px] w-16 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-500 animate-gradient-x" />
        </motion.div>

        {/* COLORFUL Role cards grid */}
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {ROLES.map((r) => {
            const cc = cardColors[r.id];
            return (
              <motion.button key={r.id} variants={fadeUp} transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.985 }}
                onClick={() => onSelect(r.id)} id={`role-select-${r.id}`} aria-label={`${r.title}: ${r.desc}`}
                className={cn(
                  "group relative flex items-start text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl",
                  cc.bg, cc.hoverBg, cc.glow,
                  "border", cc.border,
                )}>
                {/* Top glow line */}
                <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className={cn("relative z-10 p-3.5 rounded-xl border border-white/[0.08] shrink-0 transition-all", cc.iconBg, "group-hover:border-white/[0.15] group-hover:scale-105")}>
                  <r.icon className={cn("w-5 h-5", cc.iconColor)} />
                </div>
                <div className="relative z-10 ml-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[16px] font-bold text-white/85 group-hover:text-white transition-colors">{r.title}</h3>
                    <Zap className={cn("w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity", cc.iconColor)} />
                  </div>
                  <p className="text-[12px] text-white/35 leading-relaxed group-hover:text-white/55 transition-colors">{r.desc}</p>
                </div>
                <ChevronRight className="relative z-10 w-4 h-4 text-white/15 group-hover:text-white/50 group-hover:translate-x-1 transition-all self-center shrink-0" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div variants={fadeUp} className="mt-10 flex items-center gap-2.5 text-white/20 text-[10px] tracking-[0.12em] uppercase font-semibold">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-30" />
          </div>
          Powered by Gemini 2.0 Flash
          <span className="text-white/10">·</span>
          Estadio Azteca, Mexico City
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
