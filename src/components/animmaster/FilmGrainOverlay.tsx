import React, { useEffect, useRef } from 'react';

export const FilmGrainOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth / 2);
    let height = (canvas.height = window.innerHeight / 2);

    const handleResize = () => {
      width = canvas.width = window.innerWidth / 2;
      height = canvas.height = window.innerHeight / 2;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      const imgData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imgData.data.buffer);
      const len = buffer.length;

      for (let i = 0; i < len; i++) {
        // High-speed noise generation: 8-bit mono noise
        const gray = (Math.random() * 255) | 0;
        // Alpha ~ 12-18 (very subtle grain)
        buffer[i] = (16 << 24) | (gray << 16) | (gray << 8) | gray;
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-40 mix-blend-screen"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
