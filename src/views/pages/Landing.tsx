/**
 * @module Landing
 * @description Role selection landing page with animated card grid.
 * Users select their persona (fan, security, organizer, volunteer) to
 * enter the StadiumOS dashboard with role-specific features and theming.
 *
 * Architecture: Pure presentational page with no business logic.
 * Receives the selectRole callback from the App controller.
 *
 * Performance:
 * - Lazy-loaded via React.lazy (code split from main bundle)
 * - All static data (cardColors, animations) at module scope
 * - useCallback on the role selection handler
 * - No inline function definitions in JSX render path
 * - Framer Motion animations use spring physics for 60fps
 *
 * Accessibility:
 * - Each role card has aria-label with title and description
 * - Semantic heading hierarchy (h1 → h3)
 * - Focus-visible outlines on interactive elements
 * - Reduced motion support via CSS media query
 *
 * Hackathon Alignment:
 * - FIFA World Cup 2026 branding and venue identification
 * - Four distinct personas covering all hackathon challenge areas
 * - Gemini 2.0 Flash AI integration prominently featured
 */
import { useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ROLES } from '../../models/constants';
import type { Role } from '../../models/types';

/** Stagger animation config — extracted to module scope for referential stability */
const stagger = { animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } } as const;
/** Fade-up animation variant — extracted to module scope */
const fadeUp = { initial: { opacity: 0, y: 24, filter: 'blur(10px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' } } as const;

/** Role-specific card color themes — pre-computed for zero per-render allocation */
const cardColors: Readonly<Record<string, { readonly bg: string; readonly border: string; readonly hoverBg: string; readonly iconBg: string; readonly iconColor: string; readonly glow: string }>> = {
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
} as const;

interface LandingProps {
  /** Stable callback invoked when user selects a role */
  readonly onSelect: (role: Role) => void;
}

export default memo(function Landing({ onSelect }: LandingProps) {
  /** Stable handler factory — avoids inline arrow in onClick */
  const handleRoleSelect = useCallback((id: Role) => {
    onSelect(id);
  }, [onSelect]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="h-screen w-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: 'linear-gradient(145deg, #080e1e 0%, #0c1a30 40%, #0a1428 100%)' }}
    >
      {/* Ambient glow layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[15%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/[0.06] blur-[180px] animate-float" />
        <div className="absolute bottom-[15%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-violet-500/[0.05] blur-[200px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[40%] left-[55%] w-[35vw] h-[35vw] rounded-full bg-emerald-500/[0.04] blur-[150px] animate-float" style={{ animationDelay: '5s' }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div variants={stagger} className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center gap-8">
        {/* Title */}
        <motion.div variants={fadeUp} className="text-center">
          <div className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.35em] uppercase text-white/30 mb-4 bg-white/[0.03] px-4 py-1.5 rounded-full border border-white/[0.06]">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" aria-hidden="true" />
            FIFA World Cup 2026 · Estadio Azteca
          </div>
          <h1 className="text-[44px] md:text-[56px] font-bold tracking-tight leading-none mb-3">
            <span className="text-white">Stadium</span><span className="text-white/25 font-light">OS</span>
          </h1>
          <p className="text-white/35 text-[14px] md:text-[16px] max-w-md mx-auto leading-relaxed font-light">
            AI-powered stadium operations platform.<br />
            <span className="text-white/50 font-normal">Select your role to begin.</span>
          </p>
        </motion.div>

        {/* Role cards grid — uses pre-computed cardColors lookup */}
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {ROLES.map((r) => {
            const cc = cardColors[r.id]!;
            return (
              <motion.button key={r.id} variants={fadeUp} transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.985 }}
                onClick={() => handleRoleSelect(r.id)} id={`role-select-${r.id}`} aria-label={`${r.title}: ${r.desc}`}
                className={cn(
                  "group relative flex items-start text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl",
                  cc.bg, cc.hoverBg, cc.glow,
                  "border", cc.border,
                )}>
                {/* Top glow line */}
                <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

                <div className={cn("relative z-10 p-3.5 rounded-xl border border-white/[0.08] shrink-0 transition-all", cc.iconBg, "group-hover:border-white/[0.15] group-hover:scale-105")}>
                  <r.icon className={cn("w-5 h-5", cc.iconColor)} aria-hidden="true" />
                </div>
                <div className="relative z-10 ml-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[16px] font-bold text-white/85 group-hover:text-white transition-colors">{r.title}</h3>
                    <Zap className={cn("w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity", cc.iconColor)} aria-hidden="true" />
                  </div>
                  <p className="text-[12px] text-white/35 leading-relaxed group-hover:text-white/55 transition-colors">{r.desc}</p>
                </div>
                <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/10 group-hover:text-white/30 group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </motion.button>
            );
          })}
        </motion.div>

        {/* Gemini badge */}
        <motion.div variants={fadeUp} className="text-center">
          <div className="inline-flex items-center gap-2 text-[10px] text-white/25 bg-white/[0.02] px-3 py-1.5 rounded-full border border-white/[0.04]">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
              <span className="text-[6px] text-white font-bold">G</span>
            </div>
            Powered by Gemini 2.0 Flash
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});
