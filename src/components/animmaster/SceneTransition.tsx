import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SceneTransitionProps {
  sceneKey: string | number;
  children: React.ReactNode;
}

/**
 * Cinematic Depth-of-Field & Aperture Morphing Transition
 * Completely eliminates standard page scrolling feel by rack-focusing
 * between memory dimensions using focal scale and optical blur.
 */
export const SceneTransition: React.FC<SceneTransitionProps> = ({
  sceneKey,
  children,
}) => {
  const variants = {
    initial: {
      opacity: 0,
      scale: 0.94,
      filter: 'blur(14px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 1.06,
      filter: 'blur(16px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-8 py-12 md:py-16 selection:bg-burgundy selection:text-warm-white"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
