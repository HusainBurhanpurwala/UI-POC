import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '@/audio/audioEngine';
import { MemoryNote } from '@/config/storyConfig';

interface InteractiveDrawerProps {
  notes: MemoryNote[];
}

export const InteractiveDrawer: React.FC<InteractiveDrawerProps> = ({ notes }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    soundEngine.playPaperSound();
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      {notes.map((note, index) => {
        const isOpen = selectedId === note.id;

        return (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative"
          >
            {/* Drawer Tab Header */}
            <button
              type="button"
              onClick={() => handleToggle(note.id)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-lg bg-wine/30 border border-dusty-rose/20 hover:border-dusty-rose/50 hover:bg-wine/50 transition-all duration-300 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-dusty-rose/60">
                  [{String(index + 1).padStart(2, '0')}]
                </span>
                <span className="font-editorial text-lg text-ivory/90 group-hover:text-ivory">
                  {note.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {note.tag && (
                  <span className="font-mono text-[11px] text-dusty-rose/50 tracking-wider">
                    {note.tag}
                  </span>
                )}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="text-dusty-rose/70 text-sm font-mono"
                >
                  +
                </motion.span>
              </div>
            </button>

            {/* Tactile Drawer Content Paper */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 p-6 rounded-md bg-[#FFFDFC] text-ink vintage-shadow border-l-4 border-burgundy">
                    <p className="font-handwritten text-2xl text-burgundy/90 leading-relaxed">
                      "{note.content}"
                    </p>
                    <div className="mt-3 text-right font-mono text-[10px] text-[#9E4F60]/70 uppercase tracking-widest">
                      Unsaid · Kept Close
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};
