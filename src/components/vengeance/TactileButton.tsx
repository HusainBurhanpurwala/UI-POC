import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '@/audio/audioEngine';

interface TactileButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'subtle' | 'primary' | 'minimal';
  className?: string;
  disabled?: boolean;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  onClick,
  children,
  variant = 'subtle',
  className = '',
  disabled = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.22;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    if (disabled) return;
    soundEngine.playGentleClick();
    onClick?.();
  };

  const variantStyles = {
    subtle:
      'border border-dusty-rose/30 bg-wine/20 text-ivory/90 hover:border-dusty-rose/60 hover:bg-wine/40 hover:text-ivory shadow-[0_4px_20px_rgba(0,0,0,0.25)]',
    primary:
      'border border-accent-red/40 bg-burgundy/80 text-warm-white hover:bg-burgundy hover:border-accent-red shadow-[0_8px_30px_rgba(92,23,36,0.35)]',
    minimal:
      'border-b border-dusty-rose/30 text-ivory/80 hover:text-ivory hover:border-dusty-rose/80 px-1 py-0.5 rounded-none',
  };

  return (
    <motion.button
      ref={buttonRef}
      disabled={disabled}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      className={`interactive relative inline-flex items-center justify-center rounded-full px-7 py-3 text-sm tracking-widest transition-colors duration-300 font-editorial uppercase cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
