import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLiveCounter } from '@/hooks/useLiveCounters';
import { STORY_CONFIG } from '@/config/storyConfig';
import { InteractiveDrawer } from '@/components/vengeance/InteractiveDrawer';
import { WaxSealEnvelope } from '@/components/vengeance/WaxSealEnvelope';
import { TextSplitReveal } from '@/components/animmaster/TextSplitReveal';
import { soundEngine } from '@/audio/audioEngine';

interface Act4TheArchiveProps {
  scene: number;
  visitorName: string;
  onNext: () => void;
}

export const Act4TheArchive: React.FC<Act4TheArchiveProps> = ({ scene, visitorName }) => {
  // Live counters for the 3 key dates
  const talkCounter = useLiveCounter(STORY_CONFIG.dates.firstConversation);
  const askedCounter = useLiveCounter(STORY_CONFIG.dates.askedOut);
  const meetCounter = useLiveCounter(STORY_CONFIG.dates.meetingStart);

  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [secondPageVisible, setSecondPageVisible] = useState(false);
  const [countdownNum, setCountdownNum] = useState(3);
  const [countdownDone, setCountdownDone] = useState(false);

  useEffect(() => {
    if (scene === 32) {
      setCountdownNum(3);
      setCountdownDone(false);
      const timer1 = setTimeout(() => setCountdownNum(2), 1000);
      const timer2 = setTimeout(() => setCountdownNum(1), 2000);
      const timer3 = setTimeout(() => setCountdownDone(true), 3000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [scene]);

  // SCENE 29: THREE CLOCKS
  if (scene === 29) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-4xl mx-auto px-4">
        <span className="font-mono text-xs uppercase tracking-widest text-dusty-rose/60 mb-8">
          The Living Counters · Asia/Kolkata
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
          {/* Clock 1: 28 June 2026 */}
          <div className="p-6 rounded-xl bg-wine/30 border border-dusty-rose/20 text-center flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-dusty-rose/70">
                Chapter 01
              </span>
              <h4 className="font-editorial text-xl text-ivory mt-1 mb-4">
                Since We Started Talking
              </h4>
              <div className="font-mono text-xs text-dusty-rose/50 mb-3">28.06.2026</div>
            </div>
            <div className="grid grid-cols-4 gap-2 font-mono py-2 bg-almost-black/40 rounded border border-dusty-rose/10">
              <div>
                <div className="text-xl text-ivory">{talkCounter.days}</div>
                <div className="text-[9px] text-dusty-rose/50">DAYS</div>
              </div>
              <div>
                <div className="text-xl text-ivory">{talkCounter.hours}</div>
                <div className="text-[9px] text-dusty-rose/50">HRS</div>
              </div>
              <div>
                <div className="text-xl text-ivory">{talkCounter.minutes}</div>
                <div className="text-[9px] text-dusty-rose/50">MIN</div>
              </div>
              <div>
                <div className="text-xl text-accent-red font-semibold">{talkCounter.seconds}</div>
                <div className="text-[9px] text-dusty-rose/50">SEC</div>
              </div>
            </div>
          </div>

          {/* Clock 2: 01 September 2026 */}
          <div className="p-6 rounded-xl bg-burgundy/25 border border-burgundy/40 text-center flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent-red/80">
                Chapter 02
              </span>
              <h4 className="font-editorial text-xl text-ivory mt-1 mb-4">
                Since You Asked Me Out
              </h4>
              <div className="font-mono text-xs text-dusty-rose/50 mb-3">01.09.2026</div>
            </div>
            <div className="grid grid-cols-4 gap-2 font-mono py-2 bg-almost-black/40 rounded border border-burgundy/20">
              <div>
                <div className="text-xl text-ivory">{askedCounter.days}</div>
                <div className="text-[9px] text-dusty-rose/50">DAYS</div>
              </div>
              <div>
                <div className="text-xl text-ivory">{askedCounter.hours}</div>
                <div className="text-[9px] text-dusty-rose/50">HRS</div>
              </div>
              <div>
                <div className="text-xl text-ivory">{askedCounter.minutes}</div>
                <div className="text-[9px] text-dusty-rose/50">MIN</div>
              </div>
              <div>
                <div className="text-xl text-accent-red font-semibold">{askedCounter.seconds}</div>
                <div className="text-[9px] text-dusty-rose/50">SEC</div>
              </div>
            </div>
          </div>

          {/* Clock 3: The Meeting Date */}
          <div className="p-6 rounded-xl bg-wine/30 border border-dusty-rose/20 text-center flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-dusty-rose/70">
                Chapter 03
              </span>
              <h4 className="font-editorial text-xl text-ivory mt-1 mb-4">
                Since We Met
              </h4>
              <div className="font-mono text-xs text-dusty-rose/50 mb-3">24.09.2026</div>
            </div>
            <div className="grid grid-cols-4 gap-2 font-mono py-2 bg-almost-black/40 rounded border border-dusty-rose/10">
              <div>
                <div className="text-xl text-ivory">{meetCounter.days}</div>
                <div className="text-[9px] text-dusty-rose/50">DAYS</div>
              </div>
              <div>
                <div className="text-xl text-ivory">{meetCounter.hours}</div>
                <div className="text-[9px] text-dusty-rose/50">HRS</div>
              </div>
              <div>
                <div className="text-xl text-ivory">{meetCounter.minutes}</div>
                <div className="text-[9px] text-dusty-rose/50">MIN</div>
              </div>
              <div>
                <div className="text-xl text-accent-red font-semibold">{meetCounter.seconds}</div>
                <div className="text-[9px] text-dusty-rose/50">SEC</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCENE 30: THINGS YOU PROBABLY DON'T REMEMBER
  if (scene === 30) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
        <h3 className="font-editorial text-3xl sm:text-5xl text-ivory mb-2 font-light">
          You probably don't remember this.
        </h3>
        <p className="font-editorial italic text-2xl text-dusty-rose mb-10">
          ...but I do.
        </p>

        <div className="space-y-4 w-full text-left">
          {STORY_CONFIG.forgottenMemories.map((mem, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.3, duration: 0.8 }}
              className="p-5 rounded-lg bg-wine/25 border border-dusty-rose/20 text-ivory/90 font-editorial text-lg"
            >
              <div className="font-mono text-[10px] text-dusty-rose/50 uppercase tracking-widest mb-1">
                Memory {idx + 1}
              </div>
              {mem.detail}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // SCENE 31: THINGS I NEVER TOLD YOU
  if (scene === 31) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4">
        <h3 className="font-editorial text-3xl sm:text-5xl text-ivory mb-2 font-light">
          Things I Never Told You
        </h3>
        <p className="font-mono text-xs text-dusty-rose/60 uppercase tracking-widest mb-10">
          Open an envelope to read
        </p>

        <InteractiveDrawer notes={STORY_CONFIG.unsaidEnvelopes} />
      </div>
    );
  }

  // SCENE 32: IF I COULD SAVE ONE SECOND
  if (scene === 32) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-lg mx-auto px-4">
        <p className="font-editorial text-2xl sm:text-3xl text-ivory mb-8 font-light">
          If I could keep only one second from those three days...
        </p>

        {!countdownDone ? (
          <motion.div
            key={countdownNum}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="font-mono text-7xl sm:text-9xl text-accent-red font-light"
          >
            {countdownNum}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="p-6 bg-[#FFFDFC] rounded-sm vintage-shadow text-ink max-w-xs w-full"
          >
            <div className="aspect-[4/3] bg-burgundy rounded-sm flex items-center justify-center p-4 text-warm-white font-editorial italic text-lg">
              The moment you smiled at me.
            </div>
            <div className="mt-3 font-mono text-[10px] text-ink/60 uppercase tracking-widest">
              It would be this one.
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  // SCENE 33: THE THINGS THAT STAYED
  if (scene === 33) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4 space-y-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="font-editorial text-3xl sm:text-4xl text-ivory/80 font-light"
        >
          The photos aren't what stayed.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="font-editorial italic text-3xl sm:text-5xl text-blush"
        >
          The feeling did.
        </motion.p>
      </div>
    );
  }

  // SCENE 34: THE ENVELOPE
  if (scene === 34) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
        <h3 className="font-editorial text-3xl sm:text-4xl text-ivory mb-2 font-light">
          A Letter For You
        </h3>
        <p className="font-mono text-xs text-dusty-rose/60 uppercase tracking-widest mb-8">
          A physical keepsake in a digital space
        </p>

        <WaxSealEnvelope
          recipientName={visitorName}
          isOpen={envelopeOpened}
          onOpen={() => setEnvelopeOpened(true)}
        />
      </div>
    );
  }

  // SCENE 35: THE LETTER
  if (scene === 35) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="w-full bg-[#FFFDFC] text-ink p-8 sm:p-12 rounded-sm paper-texture vintage-shadow border border-[#e8dcd0]"
        >
          {/* Header */}
          <div className="border-b border-[#e5d5c5] pb-4 mb-6 flex justify-between items-center text-xs font-mono text-[#9E4F60]">
            <span>OCTOBER 01, 2026</span>
            <span>PRIVATE & DEAR</span>
          </div>

          {/* Salutation */}
          <h2 className="font-handwritten text-4xl sm:text-5xl text-burgundy mb-6">
            {STORY_CONFIG.letter.salutation} {visitorName || 'my love'},
          </h2>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 font-editorial text-xl sm:text-2xl text-ink/90 leading-relaxed font-normal">
            {STORY_CONFIG.letter.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Closing */}
          <div className="mt-8 pt-6 border-t border-[#e5d5c5] text-right">
            <p className="font-handwritten text-3xl text-burgundy">
              {STORY_CONFIG.letter.closing}
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // SCENE 36: THE PART I COULDN'T SAY
  if (scene === 36) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-xl mx-auto px-4">
        <h3 className="font-editorial text-3xl sm:text-4xl text-ivory mb-6 font-light">
          {STORY_CONFIG.letter.postscriptIntro}
        </h3>

        {!secondPageVisible ? (
          <button
            type="button"
            onClick={() => {
              soundEngine.playPaperSound();
              setSecondPageVisible(true);
            }}
            className="px-6 py-3 rounded-full border border-dusty-rose/40 font-editorial text-lg text-ivory hover:bg-wine/40 transition-colors cursor-pointer"
          >
            Turn the page →
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="p-8 rounded-sm bg-[#FFFDFC] text-ink vintage-shadow border-l-4 border-burgundy max-w-md w-full text-left"
          >
            <p className="font-handwritten text-3xl text-burgundy leading-relaxed">
              "{STORY_CONFIG.letter.postscriptContent}"
            </p>
          </motion.div>
        )}
      </div>
    );
  }

  // SCENE 37: THE POSTMARK
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center max-w-2xl mx-auto px-4">
      <span className="font-mono text-xs uppercase tracking-widest text-dusty-rose/60 mb-6">
        The Stamps & Postmarks
      </span>

      <h3 className="font-editorial text-3xl sm:text-5xl text-ivory mb-10 font-light">
        Three Dates Sealed
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
        {STORY_CONFIG.letter.stamps.map((stamp, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 1.3, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: (idx - 1) * 3 }}
            transition={{ delay: idx * 0.4, type: 'spring', damping: 15 }}
            className="p-5 rounded-full border-2 border-dashed border-accent-red/60 text-accent-red/90 flex flex-col items-center justify-center aspect-square max-w-[160px] mx-auto bg-almost-black/50"
          >
            <span className="font-mono text-[9px] uppercase tracking-widest">{stamp.city}</span>
            <span className="font-mono text-base font-semibold my-1">{stamp.date}</span>
            <span className="font-mono text-[9px] tracking-tight">{stamp.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
