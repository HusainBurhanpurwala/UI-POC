import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '@/audio/audioEngine';
import { motion } from 'framer-motion';

export const AudioToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(soundEngine.getIsMuted());
  }, []);

  const handleToggle = () => {
    const unmuted = soundEngine.toggleMute();
    setIsMuted(!unmuted);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
      <motion.button
        type="button"
        onClick={handleToggle}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-almost-black/80 backdrop-blur-md border border-dusty-rose/20 text-dusty-rose/80 hover:text-ivory hover:border-dusty-rose/50 transition-colors shadow-lg cursor-pointer"
        title={isMuted ? 'Enable ambient sound' : 'Mute sound'}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-3.5 h-3.5 opacity-60" />
            <span className="font-mono text-[10px] tracking-widest uppercase opacity-60 hidden sm:inline">
              Sound Off
            </span>
          </>
        ) : (
          <>
            <Volume2 className="w-3.5 h-3.5 text-accent-red animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-ivory/90 hidden sm:inline">
              Sound On
            </span>
            {/* Ambient soundwave mini animation */}
            <div className="flex items-end gap-0.5 h-2.5 ml-1">
              <span className="w-0.5 bg-dusty-rose rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-full" />
              <span className="w-0.5 bg-dusty-rose rounded-full animate-[pulse_1.1s_ease-in-out_infinite] h-2/3" />
              <span className="w-0.5 bg-dusty-rose rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-4/5" />
            </div>
          </>
        )}
      </motion.button>
    </div>
  );
};
