import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '@/audio/audioEngine';

interface WaxSealEnvelopeProps {
  recipientName: string;
  onOpen?: () => void;
  isOpen?: boolean;
}

export const WaxSealEnvelope: React.FC<WaxSealEnvelopeProps> = ({
  recipientName,
  onOpen,
  isOpen: controlledIsOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (!isOpen) {
      soundEngine.playPaperSound();
      setInternalIsOpen(true);
      onOpen?.();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 select-none">
      {/* Outer Envelope Wrapper */}
      <div className="relative w-80 sm:w-96 h-56 sm:h-64 rounded-sm bg-[#e8ded3] envelope-shadow border border-[#d6c7b7]/60 overflow-visible transition-all">
        {/* Envelope paper texture & watermark */}
        <div className="absolute inset-0 bg-[#f4ebe1] opacity-90 rounded-sm" />
        
        {/* Interior pocket lining (deep burgundy paper) */}
        <div className="absolute inset-0 bg-burgundy/15 rounded-sm" />

        {/* Envelope back folds (triangular flaps) */}
        <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none">
          {/* Left triangle flap */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#ece1d6] border-r border-[#d4c3b2]/40"
            style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
          />
          {/* Right triangle flap */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#e5d9cd] border-l border-[#d4c3b2]/40"
            style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
          />
          {/* Bottom flap */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#f0e6dc] border-t border-[#d8c8b7]/40 shadow-sm"
            style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
          />
        </div>

        {/* Letter paper peeking out / sliding upward */}
        <motion.div
          animate={isOpen ? { y: -80, opacity: 1 } : { y: 0, opacity: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 120 }}
          className="absolute left-4 right-4 top-2 h-44 sm:h-48 rounded bg-[#FFFDFC] border border-[#d4c5b5] shadow-md p-4 text-ink flex flex-col justify-between"
        >
          <div className="border-b border-[#ebdcd0] pb-2 flex justify-between items-center text-xs font-mono tracking-widest text-[#9E4F60]">
            <span>CONFIDENTIAL</span>
            <span>FOR YOUR EYES ONLY</span>
          </div>
          <div className="text-center font-handwritten text-2xl text-burgundy my-auto">
            To: {recipientName || 'You'}
          </div>
          <div className="text-[10px] font-mono text-[#9E4F60]/60 text-right">
            01.10.2026
          </div>
        </motion.div>

        {/* Top Triangular Flap */}
        <motion.div
          animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#e0d3c5] border-b border-[#caa99a]/50 shadow-md cursor-pointer"
        >
          <div
            className="w-full h-full bg-[#ebdcd0]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        </motion.div>

        {/* Wax Seal Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              type="button"
              onClick={handleOpen}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0, filter: 'blur(6px)' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-burgundy shadow-[0_6px_20px_rgba(92,23,36,0.6)] border-2 border-[#8B1E2D] cursor-pointer"
              title="Click to break seal and read"
            >
              {/* Wax Seal Embossed Details */}
              <div className="w-11 h-11 rounded-full border border-warm-white/30 flex items-center justify-center bg-gradient-to-tr from-[#300B13] via-[#5C1724] to-[#8B1E2D]">
                <span className="font-editorial italic text-warm-white text-base select-none">
                  TC
                </span>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Helper Text */}
      <motion.p
        animate={{ opacity: isOpen ? 0 : [0.4, 0.9, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mt-6 text-xs tracking-widest uppercase font-mono text-dusty-rose/70"
      >
        {isOpen ? 'Letter Opened' : 'Tap the wax seal to open'}
      </motion.p>
    </div>
  );
};
