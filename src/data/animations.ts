// Extracted from App.tsx lines 16-42

export const T = {
  spring: { type: 'spring' as const, stiffness: 350, damping: 35, mass: 1 },
  softSpring: { type: 'spring' as const, stiffness: 200, damping: 40, mass: 1 },
  slowSpring: { type: 'spring' as const, stiffness: 100, damping: 30, mass: 1 },
};

export const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 15, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' }
  },
  panel: {
    initial: { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, scale: 0.98, filter: 'blur(5px)' }
  },
  slideLeft: {
    initial: { opacity: 0, x: 20, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: -20, filter: 'blur(5px)' }
  },
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.05 } }
  }
};
