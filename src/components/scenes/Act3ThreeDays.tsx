import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextSplitReveal } from '@/components/animmaster/TextSplitReveal';
import { soundEngine } from '@/audio/audioEngine';

interface Act3ThreeDaysProps {
  scene: number;
  onNext: () => void;
}

export const Act3ThreeDays: React.FC<Act3ThreeDaysProps> = ({ scene }) => {
  const [photoRevealed, setPhotoRevealed] = useState(false);

  // SCENE 17: THE DISTANCE
  if (scene === 17) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 select-none">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-dusty-rose/70 mb-12">
          ACT III · THE COLLAPSE OF DISTANCE
        </span>

        {/* Two points merging into one */}
        <div className="flex items-center justify-center gap-12 sm:gap-28 mb-14 h-20">
          <motion.div
            animate={{ x: [0, 25, 50], opacity: [0.7, 1, 0.8] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatType: 'reverse' }}
            className="w-4 h-4 rounded-full bg-dusty-rose shadow-[0_0_20px_rgba(201,130,145,0.9)]"
          />
          <motion.div
            animate={{ x: [0, -25, -50], opacity: [0.7, 1, 0.8] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatType: 'reverse' }}
            className="w-4 h-4 rounded-full bg-blush shadow-[0_0_20px_rgba(234,209,213,0.9)]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="font-editorial text-3xl sm:text-5xl text-warm-white font-light tracking-wide"
        >
          And then you were finally here.
        </motion.p>
      </div>
    );
  }

  // SCENE 18: THE FIRST MOMENT
  if (scene === 18) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-lg mx-auto px-4 select-none">
        {/* Artistic Polaroid-style memory frame */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.94 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.6 }}
          className="p-5 sm:p-7 bg-[#FFFDFC] shadow-[0_25px_60px_rgba(0,0,0,0.4)] rounded-sm text-ink max-w-xs sm:max-w-sm w-full mb-8 rotate-1 border border-[#e8dcd0] relative"
        >
          {/* Subtle washi tape at top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#EAD1D5]/60 backdrop-blur-sm -rotate-2 border-l border-r border-[#C98291]/30 shadow-sm" />

          <div className="aspect-[4/3] bg-gradient-to-tr from-[#300B13] via-[#5C1724] to-[#12090B] rounded-sm flex items-center justify-center relative overflow-hidden p-6 text-center shadow-inner">
            <span className="font-handwritten text-3xl text-blush drop-shadow-md">
              The first moment
            </span>
          </div>
          <div className="mt-4 flex justify-between items-center font-mono text-[10px] text-ink/70">
            <span>24.09.2026 · 10:24 AM</span>
            <span className="uppercase tracking-widest text-[#9E4F60]">FIRST GLANCE</span>
          </div>
        </motion.div>

        <TextSplitReveal
          text="I remember this moment."
          className="font-editorial italic text-2xl sm:text-4xl text-warm-white font-light"
        />
      </div>
    );
  }

  // SCENE 19: DAY ONE
  if (scene === 19) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-red/80 mb-4">
          Chapter 03 · Part I
        </span>

        <h2 className="font-editorial text-5xl sm:text-7xl text-ivory mb-6 font-light">
          The First Morning.
        </h2>

        <p className="font-editorial text-xl sm:text-2xl text-dusty-rose/90 leading-relaxed font-light">
          Seeing you in person wasn't strange at all. It was like continuing a sentence we started months ago.
        </p>
      </div>
    );
  }

  // SCENE 20: THE FIRST FEW HOURS
  if (scene === 20) {
    const hours = [
      'We talked.',
      'We laughed.',
      'We went somewhere.',
      'We did absolutely nothing.',
      'And somehow it was enough.',
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-md mx-auto px-4 space-y-4">
        {hours.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.4, duration: 0.8 }}
            className={`font-editorial text-2xl sm:text-3xl ${
              idx === hours.length - 1 ? 'text-blush italic pt-4' : 'text-ivory/80 font-light'
            }`}
          >
            {line}
          </motion.div>
        ))}
      </div>
    );
  }

  // SCENE 21: DAY TWO
  if (scene === 21) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 select-none">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent-red/90 mb-4 block">
          Chapter 03 · Part II
        </span>

        <h2 className="font-editorial text-5xl sm:text-7xl text-warm-white mb-6 font-light drop-shadow-[0_0_35px_rgba(201,130,145,0.3)]">
          Day Two.
        </h2>

        <p className="font-editorial text-xl sm:text-2xl text-warm-white/90 leading-relaxed font-light">
          Less nervous. More familiar. Walking together without having to think about where we were going.
        </p>
      </div>
    );
  }

  // SCENE 22: THINGS I REMEMBER (Tactile Washi-Tape Memory Cards)
  if (scene === 22) {
    const memories = [
      { text: 'I remember the way you looked here.', angle: '-rotate-1', tapeAngle: 'rotate-2' },
      { text: 'I remember this conversation in the car.', angle: 'rotate-1', tapeAngle: '-rotate-3' },
      { text: 'I remember this quiet silence between us.', angle: 'rotate-1', tapeAngle: 'rotate-1' },
      { text: 'I remember laughing until our stomachs hurt.', angle: '-rotate-1', tapeAngle: '-rotate-2' },
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4 select-none">
        <h3 className="font-editorial text-3xl sm:text-5xl text-warm-white mb-2 font-light">
          Things I Remember
        </h3>
        <p className="font-mono text-xs text-dusty-rose/80 uppercase tracking-widest mb-8">
          The unrecorded fragments
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {memories.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`p-6 rounded-sm bg-[#FFFDFC] text-ink shadow-[0_15px_35px_rgba(0,0,0,0.35)] border border-[#e5d5c5] text-left relative ${m.angle} transition-shadow hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]`}
            >
              {/* Washi Tape Strip at top */}
              <div
                className={`absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#EAD1D5]/70 backdrop-blur-sm ${m.tapeAngle} border-l border-r border-[#C98291]/40 shadow-sm pointer-events-none`}
              />

              <div className="font-mono text-[9px] uppercase tracking-widest text-[#9E4F60]/70 mb-2">
                FRAGMENT #{String(idx + 1).padStart(2, '0')}
              </div>
              <p className="font-editorial italic text-lg sm:text-xl text-ink/90 leading-snug">
                "{m.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // SCENE 23: A MOMENT I KEPT (Interactive Draggable & Flippable Polaroid)
  if (scene === 23) {
    const handleFlip = () => {
      soundEngine.playPaperSound();
      setPhotoRevealed(!photoRevealed);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-md mx-auto px-4 select-none">
        {/* Draggable Polaroid Card with 3D Flip */}
        <motion.div
          drag
          dragConstraints={{ left: -60, right: 60, top: -40, bottom: 40 }}
          dragElastic={0.2}
          whileDrag={{ scale: 1.06, cursor: 'grabbing', zIndex: 50 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleFlip}
          className="relative cursor-grab active:cursor-grabbing mb-8 max-w-xs w-full select-none"
          style={{ perspective: '1000px' }}
        >
          {/* Top Washi Tape Strip */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#EAD1D5]/80 backdrop-blur-sm -rotate-2 border-l border-r border-[#C98291]/40 shadow-md z-30 pointer-events-none" />

          {/* Flip Container */}
          <motion.div
            animate={{ rotateY: photoRevealed ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-full"
          >
            {/* FRONT SIDE (The Polaroid Photo) */}
            <div
              style={{ backfaceVisibility: 'hidden' }}
              className="p-5 bg-[#FFFDFC] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#e5d5c5] text-ink -rotate-1"
            >
              {/* Photo Area with 35mm Amber Grain Texture */}
              <div className="aspect-[4/3] bg-gradient-to-tr from-[#240B13] via-[#4A1622] to-[#120508] rounded-sm flex flex-col items-center justify-center p-6 text-center shadow-inner relative overflow-hidden border border-[#5C1B2B]/40">
                {/* Ambient photo light flare */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl" />
                <span className="font-handwritten text-3xl sm:text-4xl text-blush drop-shadow-md">
                  Right here with you.
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-dusty-rose/70 mt-2">
                  Golden hour in the city
                </span>
              </div>

              {/* Polaroid Footer */}
              <div className="mt-4 flex justify-between items-center font-mono text-[10px] text-ink/70">
                <span>Preserved · 25.09.2026</span>
                <span className="uppercase tracking-widest text-[#9E4F60] font-medium">
                  TAP TO READ BACK
                </span>
              </div>
            </div>

            {/* BACK SIDE (Handwritten Note on Parchment) */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              className="absolute inset-0 p-6 bg-[#FAF5EE] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#e0cfbe] text-ink flex flex-col justify-between"
            >
              <div className="border-b border-[#e5d5c5] pb-2 flex justify-between items-center font-mono text-[9px] text-[#9E4F60]/80">
                <span>FIELD NOTE #03</span>
                <span>25.09.2026 · 7:14 PM</span>
              </div>

              <div className="my-auto py-2">
                <p className="font-handwritten text-2xl text-burgundy leading-snug">
                  "We walked without checking a map. I looked over at you and thought: I don't want this evening to ever end."
                </p>
              </div>

              <div className="text-right font-mono text-[9px] text-ink/50 uppercase tracking-widest">
                Tap to flip back
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Drag & Tap Helper Pill */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-dusty-rose/80 mb-4">
          <span>DRAG TO HOLD</span>
          <span>·</span>
          <span>TAP TO FLIP</span>
        </div>

        <TextSplitReveal
          text="I kept this one."
          className="font-editorial italic text-3xl sm:text-4xl text-warm-white font-light"
        />
      </div>
    );
  }

  // SCENE 24: DAY THREE
  if (scene === 24) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
        <span className="font-mono text-xs uppercase tracking-widest text-dusty-rose/60 mb-4">
          Chapter 03 · The Final Day
        </span>

        <h2 className="font-editorial text-5xl sm:text-7xl text-ivory mb-6 font-light">
          Day Three.
        </h2>

        <p className="font-editorial text-xl sm:text-2xl text-dusty-rose/90 leading-relaxed font-light">
          The shadows grew longer. We didn't talk about leaving, but it hung softly in the air between us.
        </p>
      </div>
    );
  }

  // SCENE 25: TOO SHORT
  if (scene === 25) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 space-y-6">
        <p className="font-editorial text-2xl sm:text-4xl text-ivory/90 font-light">
          Three days sounded like a lot before they started.
        </p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.2 }}
          className="font-editorial italic text-2xl sm:text-3xl text-dusty-rose"
        >
          Then they weren't.
        </motion.p>
      </div>
    );
  }

  // SCENE 26: THE LAST NIGHT
  if (scene === 26) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
        <span className="font-mono text-xs uppercase tracking-widest text-dusty-rose/60 mb-6">
          The Last Night
        </span>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="font-editorial italic text-2xl sm:text-4xl text-ivory leading-relaxed font-light"
        >
          "I knew the days were ending while I was still inside them."
        </motion.p>
      </div>
    );
  }

  // SCENE 27: THEN YOU LEFT
  if (scene === 27) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-md mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7] }}
          transition={{ duration: 2 }}
          className="font-editorial text-4xl sm:text-5xl text-dusty-rose/80 font-light mb-4"
        >
          And then you left.
        </motion.h2>
        <p className="font-mono text-xs uppercase tracking-widest text-dusty-rose/40">
          The silence returned
        </p>
      </div>
    );
  }

  // SCENE 28: BUT NOTHING WENT BACK TO NORMAL
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="font-editorial text-3xl sm:text-4xl text-ivory font-light leading-relaxed mb-4"
      >
        Except things weren't quite the same anymore.
      </motion.p>
      <span className="font-editorial italic text-xl text-dusty-rose/70">
        You were everywhere now.
      </span>
    </div>
  );
};
