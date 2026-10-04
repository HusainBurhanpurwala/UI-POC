import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SceneNavigatorProps {
  currentScene: number;
  totalScenes: number;
  onNext: () => void;
  onPrev: () => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  chapterTitle?: string;
  isArchiveMode?: boolean;
}

export const SceneNavigator: React.FC<SceneNavigatorProps> = ({
  currentScene,
  totalScenes,
  onNext,
  onPrev,
  canGoNext = true,
  canGoPrev = true,
  chapterTitle,
  isArchiveMode = false,
}) => {
  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't intercept when user is typing name
      }
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (canGoNext) {
          e.preventDefault();
          onNext();
        }
      } else if (e.key === 'ArrowLeft') {
        if (canGoPrev) {
          e.preventDefault();
          onPrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGoNext, canGoPrev, onNext, onPrev]);

  if (isArchiveMode) return null;

  return (
    <>
      {/* Discreet bottom contextual bar */}
      <footer className="fixed bottom-6 inset-x-0 z-40 flex items-center justify-between px-6 sm:px-12 pointer-events-none select-none">
        {/* Left: Previous scene trigger */}
        <div className="pointer-events-auto">
          {currentScene > 1 && canGoPrev && (
            <motion.button
              type="button"
              onClick={onPrev}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.95 }}
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'var(--color-world-card-bg)',
                borderColor: 'var(--color-world-card-border)',
                color: 'var(--color-world-primary)',
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border shadow-lg font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors"
              title="Previous chapter"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </motion.button>
          )}
        </div>

        {/* Center: Minimal abstract chapter indicator */}
        <div
          style={{
            backgroundColor: 'var(--color-world-card-bg)',
            borderColor: 'var(--color-world-card-border)',
          }}
          className="flex flex-col items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border shadow-sm transition-colors"
        >
          {chapterTitle && (
            <span
              style={{ color: 'var(--color-world-secondary)' }}
              className="font-editorial italic text-xs tracking-wider font-light"
            >
              {chapterTitle}
            </span>
          )}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 7 }).map((_, idx) => {
              const actIndex = Math.floor((currentScene - 1) / 7);
              const isActive = actIndex === idx;
              return (
                <span
                  key={idx}
                  style={
                    isActive
                      ? {
                          backgroundColor: 'var(--color-world-accent)',
                          boxShadow: '0 0 10px var(--color-world-accent)',
                        }
                      : {
                          backgroundColor: 'var(--color-world-card-border)',
                        }
                  }
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    isActive ? 'w-7' : 'w-1.5 opacity-60'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Right: Next scene trigger */}
        <div className="pointer-events-auto">
          {currentScene < totalScenes && canGoNext && (
            <motion.button
              type="button"
              onClick={onNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'var(--color-world-accent)',
                borderColor: 'var(--color-world-card-border)',
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md border text-warm-white hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(92,23,36,0.5)] font-mono text-xs uppercase tracking-widest cursor-pointer group"
              title="Continue"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          )}
        </div>
      </footer>
    </>
  );
};
