import { motion } from 'framer-motion';
import { Activity, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { T, animations } from '../../data/animations';
import { ROLES } from '../../data/roles';
import type { Role } from '../../types';

// Extracted from App.tsx lines 106-156 — zero visual changes
export default function RoleSelection({ onSelect }: { onSelect: (role: Role) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(20px)' }} transition={{ duration: 0.8 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-[#030303] overflow-hidden"
      role="main"
      aria-label="Role selection screen"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-white/[0.02] blur-[200px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]" />
      </div>
      
      <motion.div variants={animations.staggerContainer} initial="initial" animate="animate" className="relative z-10 max-w-5xl w-full px-8 flex flex-col items-center">
        <motion.div variants={animations.fadeUp} transition={T.softSpring} className="w-16 h-16 rounded-[20px] bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
          <Activity className="w-8 h-8 text-white/80" />
        </motion.div>
        <motion.h1 variants={animations.fadeUp} transition={T.softSpring} className="text-[40px] font-light text-white tracking-tight mb-4">Stadium<span className="font-semibold text-white/50">OS</span></motion.h1>
        <motion.p variants={animations.fadeUp} transition={T.softSpring} className="text-white/40 text-[15px] mb-16 tracking-wide font-medium">Enterprise Operations Platform • FIFA World Cup 2026</motion.p>
        
        <motion.div variants={animations.staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {ROLES.map((r) => (
            <motion.button
              variants={animations.fadeUp}
              transition={T.spring}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              key={r.id}
              onClick={() => onSelect(r.id)}
              id={`role-select-${r.id}`}
              aria-label={`Select ${r.title} role: ${r.desc}`}
              className="group relative flex items-start text-left p-8 bg-white/[0.01] border border-white/[0.04] rounded-[24px] hover:bg-white/[0.03] hover:border-white/[0.1] transition-colors duration-500 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className={cn("p-4 rounded-[16px] bg-[#050505] border border-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]", r.color)}>
                <r.icon className="w-6 h-6" />
              </div>
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-medium text-white/90 mb-2 tracking-wide group-hover:text-white transition-colors">{r.title}</h3>
                <p className="text-[13px] text-white/40 leading-relaxed font-medium">{r.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all self-center" />
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
