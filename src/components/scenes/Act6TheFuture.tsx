import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STORY_CONFIG } from '@/config/storyConfig';
import { TextSplitReveal } from '@/components/animmaster/TextSplitReveal';
import { soundEngine } from '@/audio/audioEngine';
import { Sparkles } from 'lucide-react';

interface Act6TheFutureProps {
  scene: number;
  onEnterArchive: () => void;
  onNext: () => void;
}

export const Act6TheFuture: React.FC<Act6TheFutureProps> = ({ scene, onEnterArchive }) => {
  const [eggDiscovered, setEggDiscovered] = useState(false);

  // SCENE 41: THE UNWRITTEN PAGE
  if (scene === 41) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
        <div className="p-8 sm:p-12 rounded-sm bg-[#FFFDFC] text-ink vintage-shadow border border-[#e8dcd0] w-full text-left font-editorial">
          <p className="text-2xl sm:text-3xl text-ink/90 leading-relaxed font-normal mb-6">
            I don't know what happens next.
          </p>
          <p className="italic text-xl sm:text-2xl text-burgundy">
            And I think that's okay.<span className="inline-block w-2.5 h-6 bg-accent-red ml-2 animate-pulse align-middle" />
          </p>
        </div>
      </div>
    );
  }

  // SCENE 42: EMPTY FRAMES
  if (scene === 42) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-4xl mx-auto px-4">
        <h3 className="font-editorial text-3xl sm:text-5xl text-ivory mb-2 font-light">
          Frames Waiting For Us
        </h3>
        <p className="font-mono text-xs text-dusty-rose/60 uppercase tracking-widest mb-10">
          The memories not yet captured
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
          {STORY_CONFIG.emptyFrames.map((frame, idx) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-5 rounded border border-dashed border-dusty-rose/30 bg-wine/10 text-center flex flex-col justify-center items-center aspect-[4/3] group hover:border-dusty-rose/60 transition-colors"
            >
              <div className="font-editorial text-lg sm:text-xl text-ivory group-hover:text-blush transition-colors">
                {frame.title}
              </div>
              <div className="font-editorial italic text-xs text-dusty-rose/60 mt-2">
                {frame.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // SCENE 43: THE HIDDEN MEMORY
  if (scene === 43) {
    const handleEggClick = () => {
      soundEngine.playGentleClick();
      setEggDiscovered(!eggDiscovered);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-md mx-auto px-4">
        <span className="font-mono text-xs uppercase tracking-widest text-dusty-rose/60 mb-6">
          Wait.
        </span>

        <h3 className="font-editorial text-3xl sm:text-4xl text-ivory mb-8 font-light">
          You missed something.
        </h3>

        {/* Hidden Interactive Talisman */}
        <div className="relative my-4">
          <motion.button
            type="button"
            onClick={handleEggClick}
            whileHover={{ scale: 1.15, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full bg-wine/40 border border-dusty-rose/40 text-blush shadow-lg cursor-pointer"
            title="A secret waiting to be found"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
          </motion.button>
        </div>

        <AnimatePresence>
          {eggDiscovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-6 rounded-md bg-[#FFFDFC] text-ink vintage-shadow border-l-4 border-accent-red text-left max-w-sm"
            >
              <div className="font-mono text-[10px] text-accent-red font-semibold uppercase tracking-widest mb-1">
                {STORY_CONFIG.easterEgg.secretTitle}
              </div>
              <p className="font-handwritten text-2xl text-burgundy">
                "{STORY_CONFIG.easterEgg.secretMessage}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // SCENE 44: THE THREE DATES
  if (scene === 44) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 select-none">
        <div className="space-y-6 mb-10 w-full">
          <div>
            <div className="font-mono text-xs text-dusty-rose/80 uppercase tracking-widest">
              28.06.2026
            </div>
            <div className="font-editorial text-3xl text-warm-white mt-1">The conversation.</div>
          </div>
          <div className="text-dusty-rose/50 font-mono text-sm">↓</div>
          <div>
            <div className="font-mono text-xs text-accent-red uppercase tracking-widest">
              01.09.2026
            </div>
            <div className="font-editorial text-3xl text-blush font-medium mt-1">The question.</div>
          </div>
          <div className="text-dusty-rose/50 font-mono text-sm">↓</div>
          <div>
            <div className="font-mono text-xs text-dusty-rose/80 uppercase tracking-widest">
              24.09.2026
            </div>
            <div className="font-editorial text-3xl text-warm-white mt-1">The three days.</div>
          </div>
        </div>

        <TextSplitReveal
          text="Three dates. Three different versions of us."
          className="font-editorial italic text-2xl sm:text-3xl text-blush font-light"
        />
      </div>
    );
  }

  // SCENE 45: THE FINAL ANSWER
  if (scene === 45) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-lg mx-auto px-4 select-none">
        <p className="font-editorial text-2xl sm:text-3xl text-warm-white/90 font-light mb-8">
          I think I've been answering that question ever since.
        </p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="font-editorial text-8xl sm:text-9xl text-warm-white font-light drop-shadow-[0_0_40px_rgba(255,253,252,0.4)]"
        >
          Yes.
        </motion.h1>
      </div>
    );
  }

  // SCENE 46: THE FINAL PHOTOGRAPH
  if (scene === 46) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-md mx-auto px-4">
        <div className="p-6 bg-[#FFFDFC] rounded-sm vintage-shadow text-ink max-w-sm w-full mb-8">
          <div className="aspect-[4/3] bg-gradient-to-tr from-burgundy via-wine to-almost-black rounded-sm flex items-center justify-center p-6 text-center text-warm-white">
            <span className="font-editorial italic text-xl text-blush">
              Together
            </span>
          </div>
          <div className="mt-3 font-mono text-[10px] text-ink/60 text-center uppercase tracking-widest">
            Always & Forever
          </div>
        </div>

        <TextSplitReveal
          text="I'd like there to be many more."
          className="font-editorial italic text-2xl sm:text-3xl text-ivory/90"
        />
      </div>
    );
  }

  // SCENE 47: TO BE CONTINUED
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-xl mx-auto px-4">
      <div className="space-y-3 font-mono text-xs uppercase tracking-widest text-dusty-rose/60 mb-10">
        <p>28 June 2026 — Chapter One</p>
        <p>01 September 2026 — Chapter Two</p>
        <p>Three Days — Chapter Three</p>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="font-editorial text-5xl sm:text-7xl text-warm-white font-light mb-4 tracking-wide"
      >
        To be continued.
      </motion.h1>

      <div className="w-8 h-8 my-6 flex items-center justify-center text-accent-red opacity-80 text-xl font-editorial select-none">
        ✦
      </div>

      {/* Button to enter Post-Ending Ambient Exploration Mode */}
      <motion.button
        type="button"
        onClick={onEnterArchive}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="interactive px-8 py-3.5 rounded-full border border-dusty-rose/40 bg-gradient-to-r from-wine/50 via-burgundy/40 to-wine/50 text-warm-white hover:text-blush hover:border-blush/70 font-editorial text-xl tracking-wider shadow-[0_4px_25px_rgba(201,130,145,0.25)] hover:shadow-[0_6px_35px_rgba(201,130,145,0.45)] transition-all duration-300 cursor-pointer"
      >
        Stay a little longer →
      </motion.button>
    </div>
  );
};
