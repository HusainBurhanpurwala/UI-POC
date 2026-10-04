import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
}

export const MagneticCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const followerConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const followerX = useSpring(-100, followerConfig);
  const followerY = useSpring(-100, followerConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let lastSparkTime = 0;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const now = performance.now();
      // Emit delicate stardust spark every 60ms when cursor moves
      if (now - lastSparkTime > 60) {
        lastSparkTime = now;
        trailIdRef.current += 1;
        const newPoint: TrailPoint = {
          id: trailIdRef.current,
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: Math.random() * 2.5 + 1.2,
          alpha: Math.random() * 0.5 + 0.3,
        };

        setTrail((prev) => [...prev.slice(-12), newPoint]);
      }

      const target = e.target as HTMLElement;
      const isInteractive = Boolean(
        target.closest('button, a, input, textarea, [role="button"], .interactive')
      );
      setIsPointer(isInteractive);
    };

    // Fade trail points
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((p) => ({ ...p, alpha: p.alpha - 0.05, size: p.size * 0.94 }))
          .filter((p) => p.alpha > 0.05)
      );
    }, 40);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, followerX, followerY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Delicate Stardust Trail */}
      {trail.map((point) => (
        <div
          key={point.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: point.x,
            top: point.y,
            width: point.size,
            height: point.size,
            backgroundColor: '#FFD1DA',
            boxShadow: '0 0 6px rgba(255, 209, 218, 0.8)',
            opacity: point.alpha,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.04s, transform 0.04s',
          }}
        />
      ))}

      {/* Outer ambient blur halo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 56 : 38,
          height: isPointer ? 56 : 38,
          backgroundColor: isPointer ? 'rgba(217, 38, 64, 0.2)' : 'rgba(234, 209, 213, 0.09)',
          filter: 'blur(8px)',
          transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease',
        }}
      />

      {/* Core fine cursor point */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 9 : 5,
          height: isPointer ? 9 : 5,
          backgroundColor: isPointer ? '#FF4D6D' : '#FFFDFC',
          boxShadow: isPointer
            ? '0 0 14px rgba(255, 77, 109, 0.9)'
            : '0 0 8px rgba(255, 253, 252, 0.8)',
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        }}
      />
    </div>
  );
};
