import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '@/audio/audioEngine';
import { useLiveCounter } from '@/hooks/useLiveCounters';
import { STORY_CONFIG } from '@/config/storyConfig';
import { AnatomicalHeart } from '@/components/scenes/AnatomicalHeart';

interface Act5TheHeartProps {
  scene: number;
  onNext: () => void;
}

export const Act5TheHeart: React.FC<Act5TheHeartProps> = ({ scene }) => {
  const [pulseScale, setPulseScale] = useState(1);
  const [heartPhase, setHeartPhase] = useState<'lub' | 'dub' | 'rest'>('rest');
  const [beatCount, setBeatCount] = useState(0);
  const [silenceCount, setSilenceCount] = useState(0);

  const talkCounter = useLiveCounter(STORY_CONFIG.dates.firstConversation);
  const askedCounter = useLiveCounter(STORY_CONFIG.dates.askedOut);
  const meetCounter = useLiveCounter(STORY_CONFIG.dates.meetingStart);

  useEffect(() => {
    if (scene === 38) {
      setBeatCount(0);
      const timer = setTimeout(() => {
        soundEngine.startHeartbeat();
        setSilenceCount(1);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }

    if (scene === 39 || scene === 40) {
      soundEngine.startHeartbeat();
    } else {
      soundEngine.stopHeartbeat();
    }

    return () => {
      soundEngine.stopHeartbeat();
    };
  }, [scene]);

  // Hook into procedural audio pulse event
  useEffect(() => {
    const unsubscribe = soundEngine.subscribePulse((phase) => {
      setHeartPhase(phase);
      setPulseScale(phase === 'lub' ? 1.14 : 1.07);

      if (phase === 'lub') {
        setBeatCount((prev) => prev + 1);
      }

      setTimeout(() => {
        setPulseScale(1);
        setHeartPhase('rest');
      }, 180);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (scene !== 39 && scene !== 40) return;

    // Autonomous heartbeat ticker: ensures continuous visual cardiac cycle and progression
    const tickInterval = setInterval(() => {
      setHeartPhase('lub');
      setPulseScale(1.15);
      setBeatCount((prev) => prev + 1);

      setTimeout(() => {
        setHeartPhase('dub');
        setPulseScale(1.08);
      }, 150);

      setTimeout(() => {
        setHeartPhase('rest');
        setPulseScale(1);
      }, 300);
    }, 1250);

    return () => clearInterval(tickInterval);
  }, [scene]);

  // Hindi text phrases revealed incrementally as heart beats
  const hindiWords = [
    { text: 'ये दिल', beatThreshold: 1 },
    { text: 'सिर्फ़', beatThreshold: 2 },
    { text: 'आपके लिए', beatThreshold: 3 },
    { text: 'धड़कता है।', beatThreshold: 4 },
  ];

  // SCENE 38: SILENCE
  if (scene === 38) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-md mx-auto px-4 select-none">
        <motion.div
          animate={{ opacity: silenceCount > 0 ? 0.9 : 0.4 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col items-center gap-8"
        >
          {silenceCount === 0 ? (
            <p className="font-editorial italic text-2xl sm:text-3xl text-dusty-rose/60 tracking-wider">
              Hold your breath.
            </p>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: pulseScale }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-accent-red shadow-[0_0_15px_rgba(217,38,64,0.9)] animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent-red/90">
                {heartPhase === 'lub' ? 'Thump' : heartPhase === 'dub' ? 'thump' : '...'}
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  // SCENE 39: THE ANATOMICAL HEART & SYNCHRONIZED CLIMAX
  if (scene === 39) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-3xl mx-auto px-4 py-6 relative select-none">
        {/* Intricate Anatomical Human Heart */}
        <div className="mb-2">
          <AnatomicalHeart pulseScale={pulseScale} phase={heartPhase} />
        </div>

        {/* Real-Time ECG Cardiac Rhythm Monitor Strip */}
        <div className="w-full max-w-md my-4 px-2">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-dusty-rose/80 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-ping" />
              <span>CARDIAC RHYTHM · 72 BPM</span>
            </div>
            <span className="text-blush/80">SYNCHRONIZED PULSE</span>
          </div>

          <div className="relative h-11 w-full rounded-md bg-[#18050B] border border-dusty-rose/30 overflow-hidden flex items-center shadow-inner">
            {/* Oscilloscope Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,130,145,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,130,145,0.08)_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

            {/* SVG ECG Waveform */}
            <svg className="w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
              {/* Dim Base Trace */}
              <path
                d="M 0 30 L 70 30 C 78 30, 82 24, 86 24 C 90 24, 94 30, 102 30 L 120 30 L 126 36 L 138 6 L 148 54 L 154 30 L 175 30 C 185 30, 192 18, 204 18 C 216 18, 222 30, 235 30 L 270 30 C 278 30, 282 24, 286 24 C 290 24, 294 30, 302 30 L 320 30 L 326 36 L 338 6 L 348 54 L 354 30 L 375 30 C 385 30, 392 18, 400 18"
                fill="none"
                stroke="rgba(255, 77, 109, 0.35)"
                strokeWidth="1.5"
              />
              {/* Luminous Active Wave during Pulse */}
              <motion.path
                animate={{
                  strokeOpacity: heartPhase === 'lub' ? 1 : heartPhase === 'dub' ? 0.8 : 0.45,
                  strokeWidth: heartPhase === 'lub' ? 2.5 : 1.5,
                  filter: heartPhase === 'lub' ? 'drop-shadow(0 0 8px rgba(255, 77, 109, 0.95))' : 'none',
                }}
                d="M 0 30 L 70 30 C 78 30, 82 24, 86 24 C 90 24, 94 30, 102 30 L 120 30 L 126 36 L 138 6 L 148 54 L 154 30 L 175 30 C 185 30, 192 18, 204 18 C 216 18, 222 30, 235 30 L 270 30 C 278 30, 282 24, 286 24 C 290 24, 294 30, 302 30 L 320 30 L 326 36 L 338 6 L 348 54 L 354 30 L 375 30 C 385 30, 392 18, 400 18"
                fill="none"
                stroke="#FF4D6D"
              />
            </svg>

            {/* Glowing Sweep Line */}
            <motion.div
              animate={{ x: ['-20%', '420%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-transparent via-[#FF4D6D]/40 to-transparent pointer-events-none"
            />
          </div>
        </div>

        {/* Text Appears In Lockstep With The Heartbeat */}
        <div className="min-h-[140px] flex flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 my-4">
            {hindiWords.map((item, idx) => {
              const isVisible = beatCount >= item.beatThreshold;

              return (
                <AnimatePresence key={idx}>
                  {isVisible && (
                    <motion.span
                      initial={{ opacity: 0, y: 18, scale: 0.82, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="font-devanagari-hero text-4xl sm:text-6xl text-warm-white tracking-wide font-normal inline-block"
                      style={{
                        textShadow:
                          heartPhase === 'lub'
                            ? '0 0 45px rgba(255, 74, 104, 0.95), 0 0 20px rgba(229, 56, 85, 0.85)'
                            : '0 0 25px rgba(184, 29, 53, 0.65)',
                        color: idx === 1 || idx === 3 ? '#FFE5EB' : '#FFFDFC',
                      }}
                    >
                      {item.text}
                    </motion.span>
                  )}
                </AnimatePresence>
              );
            })}
          </div>

          {/* Subtitle translation reveals after all 4 beats */}
          {beatCount >= 4 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="font-editorial italic text-2xl sm:text-3xl text-blush mt-4 tracking-wide drop-shadow-sm"
            >
              This heart beats only for you.
            </motion.p>
          )}
        </div>
      </div>
    );
  }

  // SCENE 40: THE HEARTBEAT COUNTER
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center max-w-4xl mx-auto px-4 py-8">
      {/* Miniature Pulsing Anatomical Heart */}
      <div className="mb-4">
        <AnatomicalHeart pulseScale={pulseScale * 0.75} phase={heartPhase} className="h-40" />
      </div>

      <motion.div
        animate={{ scale: pulseScale }}
        transition={{ duration: 0.15 }}
        className="font-mono text-xs uppercase tracking-widest text-accent-red mb-8 flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-accent-red animate-ping" />
        Synchronized Cardiac Pulse
      </motion.div>

      <h3 className="font-editorial text-3xl sm:text-5xl text-ivory mb-10 font-light">
        Every Beat Since The Beginning
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* Counter 1 */}
        <motion.div
          animate={{ scale: heartPhase === 'lub' ? 1.03 : 1 }}
          transition={{ duration: 0.15 }}
          className="p-6 rounded-xl bg-wine/30 border border-dusty-rose/30 text-center shadow-lg"
        >
          <div className="font-mono text-[10px] text-dusty-rose/60 uppercase">Started Talking</div>
          <div className="font-mono text-3xl text-ivory my-2">{talkCounter.days} DAYS</div>
          <div className="font-mono text-xs text-accent-red font-semibold">
            {talkCounter.hours}h {talkCounter.minutes}m {talkCounter.seconds}s
          </div>
        </motion.div>

        {/* Counter 2 */}
        <motion.div
          animate={{ scale: heartPhase === 'lub' ? 1.04 : 1 }}
          transition={{ duration: 0.15 }}
          className="p-6 rounded-xl bg-burgundy/40 border border-accent-red/40 text-center shadow-xl"
        >
          <div className="font-mono text-[10px] text-accent-red/80 uppercase">Asked Me Out</div>
          <div className="font-mono text-3xl text-warm-white my-2">{askedCounter.days} DAYS</div>
          <div className="font-mono text-xs text-accent-red font-semibold">
            {askedCounter.hours}h {askedCounter.minutes}m {askedCounter.seconds}s
          </div>
        </motion.div>

        {/* Counter 3 */}
        <motion.div
          animate={{ scale: heartPhase === 'lub' ? 1.03 : 1 }}
          transition={{ duration: 0.15 }}
          className="p-6 rounded-xl bg-wine/30 border border-dusty-rose/30 text-center shadow-lg"
        >
          <div className="font-mono text-[10px] text-dusty-rose/60 uppercase">Met In Person</div>
          <div className="font-mono text-3xl text-ivory my-2">{meetCounter.days} DAYS</div>
          <div className="font-mono text-xs text-accent-red font-semibold">
            {meetCounter.hours}h {meetCounter.minutes}m {meetCounter.seconds}s
          </div>
        </motion.div>
      </div>
    </div>
  );
};
