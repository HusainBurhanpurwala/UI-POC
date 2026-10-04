import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextSplitReveal } from '@/components/animmaster/TextSplitReveal';
import { TactileButton } from '@/components/vengeance/TactileButton';
import { soundEngine } from '@/audio/audioEngine';

interface Act2TheQuestionProps {
  scene: number;
  onNext: () => void;
}

export const Act2TheQuestion: React.FC<Act2TheQuestionProps> = ({ scene, onNext }) => {
  const [yesRevealed, setYesRevealed] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [selectedNormal, setSelectedNormal] = useState<number[]>([]);

  // Reset or initialize state per scene
  useEffect(() => {
    if (scene === 12) {
      setYesRevealed(false);
      setHoldProgress(0);
    }
  }, [scene]);

  // SCENE 09: SOMETHING CHANGED
  if (scene === 9) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 select-none">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="font-mono text-xs uppercase tracking-widest text-dusty-rose/70 mb-6"
        >
          For almost two months...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-mono text-5xl sm:text-7xl text-warm-white font-light tracking-wider mb-8 drop-shadow-[0_0_35px_rgba(255,163,181,0.4)]"
        >
          <span className="text-blush font-normal">65</span> DAYS
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.5 }}
          className="font-editorial text-3xl sm:text-5xl text-warm-white font-light tracking-wide"
        >
          ...and then something changed.
        </motion.h3>
      </div>
    );
  }

  // SCENE 10: 01.09.2026
  if (scene === 10) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4 select-none">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-red/90 mb-6 block">
          THE TURNING POINT
        </span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="font-editorial text-6xl sm:text-8xl text-warm-white tracking-tight font-normal mb-8 drop-shadow-[0_0_35px_rgba(201,130,145,0.4)]"
        >
          01.09.2026
        </motion.h1>

        <TextSplitReveal
          text="The day you asked me something."
          className="font-editorial italic text-2xl sm:text-3xl text-blush/90 font-light"
          delay={0.8}
        />
      </div>
    );
  }

  // SCENE 11: THE QUESTION
  if (scene === 11) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 select-none">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-wine/50 to-almost-black/80 border border-dusty-rose/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-dusty-rose/80 mb-6 block">
            September 1, 2026 · The Turning Point
          </span>
          <p className="font-editorial italic text-3xl sm:text-5xl text-warm-white leading-relaxed font-light drop-shadow-md">
            "Will you be mine?"
          </p>
          <div className="mt-8 flex justify-center items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-red animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-dusty-rose/80">
              everything stopped
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // SCENE 12: THE LONGEST SECOND (Interactive Press & Hold)
  if (scene === 12) {
    const handleHoldStart = () => {
      if (yesRevealed) return;
      soundEngine.playGentleClick();

      let current = 0;
      const interval = setInterval(() => {
        current += 5;
        setHoldProgress(Math.min(current, 100));

        if (current >= 100) {
          clearInterval(interval);
          setYesRevealed(true);
          soundEngine.playGentleClick();
        }
      }, 50);

      const cancelHold = () => {
        clearInterval(interval);
        window.removeEventListener('pointerup', cancelHold);
        window.removeEventListener('touchend', cancelHold);
        setHoldProgress((prev) => (prev >= 100 ? 100 : 0));
      };

      window.addEventListener('pointerup', cancelHold);
      window.addEventListener('touchend', cancelHold);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-md mx-auto px-4 select-none">
        {/* Suspense counter */}
        <div className="font-mono text-2xl sm:text-3xl text-dusty-rose/80 tracking-widest mb-8">
          00:00:00<span className="animate-pulse text-accent-red">_</span>
        </div>

        <AnimatePresence mode="wait">
          {yesRevealed ? (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="font-editorial text-7xl sm:text-9xl text-warm-white tracking-tight font-light mb-4 drop-shadow-[0_0_50px_rgba(255,253,252,0.65)]">
                Yes.
              </h1>
              <p className="font-editorial italic text-2xl sm:text-3xl text-blush tracking-wide">
                The easiest answer in the world.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="holding"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              {/* Radial Progress Ring Touch Target */}
              <div
                onPointerDown={handleHoldStart}
                onClick={() => {
                  setYesRevealed(true);
                  soundEngine.playGentleClick();
                }}
                className="relative w-36 h-36 flex items-center justify-center cursor-pointer group active:scale-95 transition-transform"
                title="Press and hold"
              >
                {/* SVG Progress Circle */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  {/* Background Track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="rgba(201, 130, 145, 0.2)"
                    strokeWidth="3"
                  />
                  {/* Animated Progress Arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#FF4D6D"
                    strokeWidth="4"
                    strokeDasharray="276.46"
                    strokeDashoffset={276.46 - (276.46 * holdProgress) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-75"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(255, 77, 109, 0.8))',
                    }}
                  />
                </svg>

                {/* Center Pulsing Tactile Heart Core */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-wine/70 to-almost-black/80 border border-dusty-rose/40 flex flex-col items-center justify-center shadow-lg group-hover:border-blush/60 transition-colors">
                  <span className="w-3 h-3 rounded-full bg-accent-red shadow-[0_0_12px_rgba(255,77,109,0.9)] animate-ping mb-1" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-dusty-rose/80">
                    {holdProgress > 0 ? `${holdProgress}%` : 'HOLD'}
                  </span>
                </div>
              </div>

              <motion.p
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-dusty-rose/80"
              >
                Press & hold to answer
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // SCENE 13: SOMETHING HAD A NAME NOW
  if (scene === 13) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4 select-none">
        <div className="grid grid-cols-2 gap-8 sm:gap-16 w-full border-b border-dusty-rose/25 pb-8 mb-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-dusty-rose/70 mb-2">
              Before
            </div>
            <div className="font-mono text-2xl sm:text-4xl text-warm-white/90">28.06.2026</div>
          </div>
          <div className="border-l border-dusty-rose/25 pl-8 sm:pl-16">
            <div className="font-mono text-xs uppercase tracking-widest text-accent-red mb-2">
              After
            </div>
            <div className="font-mono text-2xl sm:text-4xl text-warm-white font-medium drop-shadow-[0_0_20px_rgba(255,163,181,0.5)]">
              01.09.2026
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="space-y-3"
        >
          <p className="font-editorial text-2xl sm:text-4xl text-warm-white font-light">
            We were already becoming something.
          </p>
          <p className="font-editorial italic text-xl sm:text-2xl text-blush">
            September 1st just gave it a name.
          </p>
        </motion.div>
      </div>
    );
  }

  // SCENE 14: SEPTEMBER
  if (scene === 14) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 select-none">
        <span className="font-mono text-xs uppercase tracking-widest text-dusty-rose/70 mb-6">
          The Month of Anticipation
        </span>

        <h2 className="font-editorial text-5xl sm:text-7xl text-warm-white mb-8 font-light drop-shadow-md">
          September
        </h2>

        <p className="font-editorial text-xl sm:text-2xl text-dusty-rose/95 leading-relaxed font-light mb-6">
          Late night phone calls, waiting for notifications, and counting down the days until we would finally be in the same city.
        </p>
      </div>
    );
  }

  // SCENE 15: THINGS THAT BECAME NORMAL
  if (scene === 15) {
    const normals = [
      'Talking every single day.',
      'Checking my phone just to see your message.',
      'Knowing what you are about to say before you say it.',
      'Having someone to tell every tiny thing to.',
    ];

    const toggleNormal = (idx: number) => {
      soundEngine.playGentleClick();
      setSelectedNormal((prev) =>
        prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
      );
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
        <h3 className="font-editorial text-3xl sm:text-4xl text-ivory mb-2 font-light">
          Things That Became Normal
        </h3>
        <p className="font-mono text-xs text-dusty-rose/60 uppercase tracking-widest mb-8">
          The rituals that quietly formed
        </p>

        <div className="w-full space-y-3">
          {normals.map((text, idx) => {
            const isSelected = selectedNormal.includes(idx);
            return (
              <motion.div
                key={idx}
                onClick={() => toggleNormal(idx)}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-lg border text-left cursor-pointer transition-all duration-300 flex items-center justify-between ${
                  isSelected
                    ? 'bg-burgundy/30 border-dusty-rose/60 text-ivory shadow-md'
                    : 'bg-wine/20 border-dusty-rose/20 text-ivory/70 hover:border-dusty-rose/40'
                }`}
              >
                <span className="font-editorial text-lg sm:text-xl font-light">{text}</span>
                <span className="text-xs font-mono text-dusty-rose/60 ml-2">
                  {isSelected ? '✓' : '+'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // SCENE 16: BEFORE WE MET
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-lg mx-auto px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="font-mono text-xs uppercase tracking-widest text-dusty-rose/60 mb-6"
      >
        Anticipation
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="font-editorial text-6xl sm:text-8xl text-ivory font-light mb-8"
      >
        Soon.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="font-editorial italic text-xl sm:text-2xl text-dusty-rose/80"
      >
        The screen was about to become a person.
      </motion.p>
    </div>
  );
};
