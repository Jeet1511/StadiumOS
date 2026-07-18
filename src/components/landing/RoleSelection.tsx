import { motion } from 'framer-motion';
import { Activity, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { T, animations } from '../../data/animations';
import { ROLES } from '../../data/roles';
import type { Role } from '../../types';

export default function RoleSelection({ onSelect }: { onSelect: (role: Role) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(20px)' }} transition={{ duration: 0.8 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#06060e] overflow-hidden"
      role="main" aria-label="Role selection"
    >
      {/* Rich ambient background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-indigo-600/[0.06] blur-[200px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-purple-600/[0.05] blur-[180px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-cyan-500/[0.02] blur-[250px]" />
      </div>

      <motion.div variants={animations.staggerContainer} initial="initial" animate="animate" className="relative z-10 max-w-5xl w-full px-8 flex flex-col items-center">
        <motion.div variants={animations.fadeUp} transition={T.softSpring} className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 shadow-[0_8px_32px_rgba(99,102,241,0.15)] backdrop-blur-xl">
          <Activity className="w-8 h-8 text-indigo-400" />
        </motion.div>
        <motion.h1 variants={animations.fadeUp} transition={T.softSpring} className="text-[42px] font-semibold text-white tracking-tight mb-3">Stadium<span className="font-light text-indigo-400/60">OS</span></motion.h1>
        <motion.p variants={animations.fadeUp} transition={T.softSpring} className="text-white/50 text-[15px] mb-14 tracking-wide font-medium">GenAI Operations Platform · FIFA World Cup 2026</motion.p>
        
        <motion.div variants={animations.staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {ROLES.map((r) => (
            <motion.button
              variants={animations.fadeUp} transition={T.spring}
              whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.98 }}
              key={r.id} onClick={() => onSelect(r.id)}
              id={`role-select-${r.id}`} aria-label={`${r.title}: ${r.desc}`}
              className="group relative flex items-start text-left p-7 bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-400 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.08)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={cn("p-3.5 rounded-xl bg-[#0a0a16] border border-white/[0.06]", r.color)}>
                <r.icon className="w-5 h-5" />
              </div>
              <div className="ml-5 flex-1">
                <h3 className="text-lg font-semibold text-white/90 mb-1.5 group-hover:text-white transition-colors">{r.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed font-medium group-hover:text-white/60 transition-colors">{r.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/15 group-hover:text-white/50 group-hover:translate-x-1 transition-all self-center" />
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
