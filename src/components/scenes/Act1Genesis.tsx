import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TextSplitReveal } from '@/components/animmaster/TextSplitReveal';
import { TactileButton } from '@/components/vengeance/TactileButton';
import { soundEngine } from '@/audio/audioEngine';

interface Act1GenesisProps {
  scene: number;
  visitorName: string;
  setVisitorName: (name: string) => void;
  onNext: () => void;
}

export const Act1Genesis: React.FC<Act1GenesisProps> = ({
  scene,
  visitorName,
  setVisitorName,
  onNext,
}) => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [tempName, setTempName] = useState(visitorName);
  const [nameSubmitted, setNameSubmitted] = useState(Boolean(visitorName));
  const [discoveredItems, setDiscoveredItems] = useState<number[]>([]);

  // SCENE 01: THE 3D CINEMATIC ARCHITECTURAL DOORWAY
  if (scene === 1) {
    const [doorHovered, setDoorHovered] = useState(false);

    const handleDoorClick = () => {
      soundEngine.playGentleClick();
      setDoorOpen(true);
      setTimeout(() => {
        onNext();
      }, 1600);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] text-center max-w-xl mx-auto px-4 select-none">
        {/* Intro whisper text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.2 }}
          className="mb-10 sm:mb-12"
        >
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-dusty-rose/70 block mb-3">
            A PRIVATE EXPERIENCE · FOR YOU
          </span>
          <p className="font-editorial italic text-3xl sm:text-5xl text-warm-white/95 font-light tracking-wide">
            "I made something for you."
          </p>
        </motion.div>

        {/* 3D Architectural Portal Container */}
        <div
          className="relative flex flex-col items-center cursor-pointer group"
          onClick={handleDoorClick}
          onMouseEnter={() => {
            setDoorHovered(true);
            soundEngine.playPaperSound();
          }}
          onMouseLeave={() => setDoorHovered(false)}
        >
          {/* Volumetric Floor Light Projection that expands as doors swing open */}
          <motion.div
            animate={{
              opacity: doorOpen ? 0.95 : doorHovered ? 0.6 : 0.25,
              scaleX: doorOpen ? 3.2 : doorHovered ? 1.6 : 1,
              scaleY: doorOpen ? 2.2 : 1,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-10 w-44 sm:w-56 h-14 bg-gradient-to-t from-blush/40 via-dusty-rose/25 to-transparent rounded-full blur-2xl pointer-events-none"
          />

          {/* Surrounding Ambient Rose Aura */}
          <motion.div
            animate={{
              scale: doorOpen ? 1.4 : doorHovered ? 1.15 : 1,
              opacity: doorOpen ? 0.8 : doorHovered ? 0.45 : 0.25,
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 -m-16 bg-dusty-rose/25 rounded-full blur-3xl pointer-events-none"
          />

          {/* Architectural Archway Frame with 3D Perspective */}
          <div
            className="relative w-44 h-64 sm:w-52 sm:h-72 rounded-t-[100px] sm:rounded-t-[120px] p-[3px] bg-gradient-to-b from-[#EAD1D5] via-[#A85868] to-[#2B0E16] shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden"
            style={{ perspective: '1200px' }}
          >
            {/* Interior Radiant Light Chamber (Revealed as doors open) */}
            <div className="absolute inset-0 rounded-t-[97px] sm:rounded-t-[117px] bg-gradient-to-b from-[#FFFDFC] via-[#FCECEF] to-[#C98291] flex flex-col items-center justify-center overflow-hidden">
              {/* Radial Light Burst Behind Doors */}
              <motion.div
                animate={{
                  opacity: doorOpen ? 1 : doorHovered ? 0.85 : 0.6,
                  scale: doorOpen ? 1.3 : 1,
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#FFFDFC_0%,#F5CAD2_40%,#C98291_80%,#691829_100%)]"
              />

              {/* Luminous Core Ray */}
              <div className="absolute inset-y-0 w-8 bg-warm-white/90 blur-md" />

              {/* Entering Whisper Message */}
              {doorOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="z-10 text-center px-4"
                >
                  <span className="font-editorial italic text-sm sm:text-base text-burgundy font-medium tracking-widest block">
                    Welcome inside
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wine/80">
                    Entering...
                  </span>
                </motion.div>
              )}
            </div>

            {/* 3D Doors Wrapper */}
            <div
              className="absolute inset-0 flex"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* LEFT 3D DOOR PANEL */}
              <motion.div
                animate={{
                  rotateY: doorOpen ? -88 : doorHovered ? -22 : -4,
                }}
                transition={{ duration: doorOpen ? 1.4 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                }}
                className="w-1/2 h-full rounded-tl-[97px] sm:rounded-tl-[117px] bg-gradient-to-r from-[#1E0911] via-[#2B0E18] to-[#1A080F] border-r border-[#EAD1D5]/20 shadow-2xl relative flex items-center justify-end pr-2 overflow-hidden"
              >
                {/* Wood/Velvet Inset Molding Lines */}
                <div className="absolute inset-2 rounded-tl-[85px] border border-dusty-rose/15 pointer-events-none" />
                <div className="absolute bottom-4 left-2 right-2 h-24 rounded border border-dusty-rose/10 pointer-events-none" />

                {/* Left Brass Knob / Pull Ring */}
                <div className="relative w-3 h-3 rounded-full bg-gradient-to-tr from-[#8B6E4E] via-[#E8D4A8] to-[#FFF0D0] shadow-[0_2px_6px_rgba(0,0,0,0.6)] border border-[#5E4830] flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#3B2C1C]" />
                </div>
              </motion.div>

              {/* RIGHT 3D DOOR PANEL */}
              <motion.div
                animate={{
                  rotateY: doorOpen ? 88 : doorHovered ? 22 : 4,
                }}
                transition={{ duration: doorOpen ? 1.4 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                }}
                className="w-1/2 h-full rounded-tr-[97px] sm:rounded-tr-[117px] bg-gradient-to-l from-[#1E0911] via-[#2B0E18] to-[#1A080F] border-l border-[#EAD1D5]/20 shadow-2xl relative flex items-center justify-start pl-2 overflow-hidden"
              >
                {/* Wood/Velvet Inset Molding Lines */}
                <div className="absolute inset-2 rounded-tr-[85px] border border-dusty-rose/15 pointer-events-none" />
                <div className="absolute bottom-4 left-2 right-2 h-24 rounded border border-dusty-rose/10 pointer-events-none" />

                {/* Right Brass Knob / Pull Ring */}
                <div className="relative w-3 h-3 rounded-full bg-gradient-to-tr from-[#8B6E4E] via-[#E8D4A8] to-[#FFF0D0] shadow-[0_2px_6px_rgba(0,0,0,0.6)] border border-[#5E4830] flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#3B2C1C]" />
                </div>
              </motion.div>
            </div>

            {/* Fine Arch Rim Highlight */}
            <div className="absolute inset-0 rounded-t-[100px] sm:rounded-t-[120px] border-t border-l border-r border-warm-white/40 pointer-events-none" />
          </div>

          {/* Interactive Tactile Push Prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: doorOpen ? 0 : [0.65, 1, 0.65] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.8 }}
            className="mt-8 flex items-center gap-3 px-5 py-2.5 rounded-full bg-wine/30 border border-dusty-rose/30 shadow-lg backdrop-blur-sm group-hover:border-blush/60 group-hover:bg-wine/45 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-blush shadow-[0_0_8px_rgba(234,209,213,0.9)] animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-dusty-rose/90 group-hover:text-warm-white transition-colors">
              {doorHovered ? 'Push to enter' : 'Touch the door to step inside'}
            </span>
          </motion.div>
        </div>
      </div>
    );
  }

  // SCENE 02: WHO ARE YOU?
  if (scene === 2) {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!tempName.trim()) return;
      soundEngine.playGentleClick();
      setVisitorName(tempName.trim());
      setNameSubmitted(true);
      setTimeout(() => {
        onNext();
      }, 1400);
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-lg mx-auto px-4 select-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-dusty-rose/80 block mb-2">
            ACT I · THE THRESHOLD
          </span>
          <p className="font-editorial text-lg text-dusty-rose font-light tracking-wide">
            Before you go any further...
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-editorial text-4xl sm:text-6xl text-warm-white mb-10 font-normal tracking-wide"
        >
          Tell me who you are.
        </motion.h2>

        {!nameSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full flex flex-col items-center gap-8"
          >
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="your name"
                autoFocus
                className="w-full bg-transparent border-b-2 border-dusty-rose/50 py-3 text-center font-editorial text-3xl text-warm-white placeholder:text-dusty-rose/40 focus:border-warm-white focus:outline-none transition-all duration-300"
              />
            </div>

            <TactileButton variant="primary" className="mt-2">
              Enter →
            </TactileButton>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="font-handwritten text-4xl sm:text-6xl text-blush tracking-wide mb-2 drop-shadow-[0_0_20px_rgba(234,209,213,0.6)]">
              I thought it was you.
            </p>
            <TactileButton variant="primary" onClick={onNext} className="mt-4">
              Step Inside →
            </TactileButton>
          </motion.div>
        )}
      </div>
    );
  }

  // SCENE 03: THE DATE (28.06.2026)
  if (scene === 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 select-none">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-dusty-rose/80 mb-8"
        >
          CHAPTER 01 · THE GENESIS
        </motion.span>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4 }}
          className="flex items-center justify-center gap-3 sm:gap-6 font-mono text-5xl sm:text-7xl font-light text-warm-white tracking-tight mb-10 py-5 px-8 rounded-2xl bg-wine/30 border border-dusty-rose/30 shadow-2xl backdrop-blur-md"
        >
          <span>28</span>
          <span className="text-dusty-rose/40 font-thin">/</span>
          <span>06</span>
          <span className="text-dusty-rose/40 font-thin">/</span>
          <span className="text-blush font-normal">2026</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="font-editorial text-3xl sm:text-4xl text-warm-white font-light mb-6 tracking-wide"
        >
          This is where it started.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.2 }}
          className="space-y-2 text-dusty-rose font-editorial text-xl italic tracking-wider"
        >
          <p>Not with a question.</p>
          <p>Not with a meeting.</p>
          <p className="text-warm-white font-normal not-italic pt-2 text-2xl">
            Just a conversation.
          </p>
        </motion.div>
      </div>
    );
  }

  // SCENE 04: THE FIRST CONVERSATION
  if (scene === 4) {
    const whispers = [
      { text: 'hi...', top: '12%', left: '18%' },
      { text: 'so...', top: '22%', left: '68%' },
      { text: 'what are you doing?', top: '48%', left: '22%' },
      { text: 'wait...', top: '38%', left: '72%' },
      { text: 'tell me.', top: '72%', left: '30%' },
      { text: 'haha.', top: '68%', left: '65%' },
      { text: 'okay.', top: '85%', left: '46%' },
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-2xl mx-auto px-4 relative select-none">
        {/* Floating conversational fragments */}
        <div className="h-64 w-full relative mb-6">
          {whispers.map((w, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: [0.4, 0.95, 0.4],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4.5 + idx * 0.4,
                repeat: Infinity,
                delay: idx * 0.35,
              }}
              style={{ top: w.top, left: w.left }}
              className="absolute px-4 py-2 rounded-full bg-wine/30 border border-dusty-rose/30 backdrop-blur-md shadow-lg"
            >
              <span className="font-editorial italic text-xl sm:text-2xl text-blush">
                "{w.text}"
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1.2 }}
        >
          <h3 className="font-editorial text-3xl sm:text-5xl text-warm-white mb-3 font-light tracking-wide">
            And somehow, we kept talking.
          </h3>
          <p className="font-mono text-xs text-dusty-rose/70 uppercase tracking-[0.2em]">
            Hours dissolving into late evenings
          </p>
        </motion.div>
      </div>
    );
  }

  // SCENE 05: ONE CONVERSATION BECAME ANOTHER
  if (scene === 5) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4 relative select-none">
        {/* Whisper background matrix */}
        <div className="absolute inset-0 opacity-15 pointer-events-none flex flex-wrap gap-4 text-xs font-mono text-dusty-rose p-6 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="animate-pulse">
              [23:42] did you sleep? • [00:15] tell me about your day • [01:03] one more minute •
            </span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4 }}
          className="font-editorial text-3xl sm:text-5xl text-warm-white leading-relaxed font-light z-10 tracking-wide"
        >
          I didn't notice when talking to you became{' '}
          <span className="italic text-blush font-normal">
            part of my everyday routine.
          </span>
        </motion.p>
      </div>
    );
  }

  // SCENE 06: TIME STARTED DISAPPEARING
  if (scene === 6) {
    const dates = ['28 June', '29 June', '30 June', 'July', 'August'];

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4 select-none">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-dusty-rose/70 mb-8">
          Time slipping past like pages in the wind
        </span>

        {/* Film frames strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 py-8 border-y border-dusty-rose/20 w-full mb-10">
          {dates.map((d, idx) => (
            <motion.div
              key={d}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.25, duration: 0.8 }}
              className="px-5 py-3 bg-wine/30 rounded-lg border border-dusty-rose/30 font-editorial text-xl sm:text-2xl text-warm-white backdrop-blur-sm shadow-md"
            >
              {d}
            </motion.div>
          ))}
        </div>

        <TextSplitReveal
          text="The days began to blur into a single continuous conversation."
          className="font-editorial italic text-2xl sm:text-3xl text-dusty-rose font-light"
        />
      </div>
    );
  }

  // SCENE 07: THE LITTLE THINGS
  if (scene === 7) {
    const littleThings = [
      { id: 1, title: 'The way you laugh', desc: 'Unfiltered, catching me off guard every single time.' },
      { id: 2, title: 'Your pauses', desc: 'When you take a breath right before saying something honest.' },
      { id: 3, title: 'The quiet details', desc: 'Things you remembered that I thought only I noticed.' },
    ];

    const toggleDiscovery = (id: number) => {
      soundEngine.playGentleClick();
      if (!discoveredItems.includes(id)) {
        setDiscoveredItems([...discoveredItems, id]);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4 select-none">
        <h3 className="font-editorial text-4xl sm:text-5xl text-warm-white mb-2 font-light tracking-wide">
          The Little Things
        </h3>
        <p className="font-mono text-xs text-dusty-rose/70 uppercase tracking-[0.2em] mb-10">
          Tap the fragments to uncover them
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full mb-8">
          {littleThings.map((item) => {
            const isRevealed = discoveredItems.includes(item.id);
            return (
              <motion.div
                key={item.id}
                onClick={() => toggleDiscovery(item.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between min-h-[160px] ${
                  isRevealed
                    ? 'bg-wine/40 border-dusty-rose/60 text-warm-white shadow-xl'
                    : 'bg-wine/20 border-dusty-rose/25 text-dusty-rose/70 hover:border-dusty-rose/50 backdrop-blur-sm'
                }`}
              >
                <div className="font-editorial text-xl text-warm-white font-medium">
                  {item.title}
                </div>
                <div className="text-sm font-editorial italic text-blush mt-3">
                  {isRevealed ? item.desc : 'Tap to uncover...'}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // SCENE 08: SOMEWHERE BETWEEN
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4 select-none">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="font-editorial text-2xl sm:text-3xl text-dusty-rose/90 italic mb-4 font-light tracking-wide"
      >
        I don't know when it happened.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="font-editorial text-lg text-dusty-rose/70 mb-10 tracking-widest uppercase font-mono text-xs"
      >
        There wasn't a particular day.
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.4 }}
        className="font-editorial text-3xl sm:text-5xl text-warm-white leading-relaxed font-light tracking-wide"
      >
        Somewhere between all those conversations...{' '}
        <span className="text-blush italic font-normal">
          you became part of my everyday life.
        </span>
      </motion.h2>
    </div>
  );
};
