import React from 'react';
import { motion } from 'framer-motion';

interface AnatomicalHeartProps {
  pulseScale: number;
  phase: 'lub' | 'dub' | 'rest';
  className?: string;
}

/**
 * Detailed Anatomical Human Heart Vector Component
 * Features:
 * - Aortic arch with 3 major branching arteries (Brachiocephalic, Common Carotid, Left Subclavian)
 * - Superior & Inferior Vena Cava
 * - Pulmonary Artery Trunk and branches
 * - Left & Right Atria and muscular Ventricular walls
 * - Intricate Coronary Arteries and capillary glowing networks
 * - Organic dual-phase muscle morphing synchronized to lub-dub pulse
 */
export const AnatomicalHeart: React.FC<AnatomicalHeartProps> = ({
  pulseScale,
  phase,
  className = '',
}) => {
  const isPulsing = phase !== 'rest';
  const glowColor = phase === 'lub' ? 'rgba(217, 38, 64, 0.9)' : phase === 'dub' ? 'rgba(163, 29, 49, 0.7)' : 'rgba(92, 23, 36, 0.3)';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background Volumetric Glow Halo */}
      <motion.div
        animate={{
          scale: pulseScale * 1.35,
          opacity: isPulsing ? 0.85 : 0.25,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(92, 23, 36, 0.3) 45%, transparent 75%)`,
        }}
      />

      {/* SVG Anatomical Heart Illustration */}
      <motion.svg
        animate={{
          scale: pulseScale,
          rotate: phase === 'lub' ? -1.5 : phase === 'dub' ? 1 : 0,
        }}
        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        viewBox="0 0 400 480"
        className="w-56 h-64 sm:w-72 sm:h-80 drop-shadow-[0_0_35px_rgba(139,30,45,0.7)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for arterial blood flow and muscular depth */}
          <linearGradient id="aortaGradient" x1="160" y1="40" x2="260" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E53855" />
            <stop offset="50%" stopColor="#9E1E34" />
            <stop offset="100%" stopColor="#5C1724" />
          </linearGradient>

          <linearGradient id="muscleGradient" x1="120" y1="140" x2="280" y2="440" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A0E18" />
            <stop offset="35%" stopColor="#7A1828" />
            <stop offset="70%" stopColor="#300B13" />
            <stop offset="100%" stopColor="#150508" />
          </linearGradient>

          <linearGradient id="pulmonaryGradient" x1="140" y1="80" x2="230" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8A2846" />
            <stop offset="100%" stopColor="#3B0C16" />
          </linearGradient>

          <linearGradient id="arteryGlow" x1="150" y1="180" x2="260" y2="380" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF4A68" />
            <stop offset="50%" stopColor="#E02D4C" />
            <stop offset="100%" stopColor="#8A182B" />
          </linearGradient>

          <filter id="coronaryGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. SUPERIOR VENA CAVA (Upper Right/Back) */}
        <path
          d="M 135 60 C 135 40, 155 30, 165 30 C 175 30, 185 45, 182 85 C 180 115, 175 140, 168 160 C 158 145, 142 120, 138 90 Z"
          fill="url(#pulmonaryGradient)"
          stroke="#C98291"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />

        {/* 2. AORTIC ARCH & BRANCHING ARTERIES (Top Center) */}
        {/* Branch 1: Brachiocephalic Artery */}
        <path
          d="M 195 45 C 193 25, 200 15, 208 15 C 215 15, 220 28, 218 52 Z"
          fill="url(#aortaGradient)"
          stroke="#FF758F"
          strokeWidth="1.2"
        />
        {/* Branch 2: Left Common Carotid Artery */}
        <path
          d="M 226 50 C 226 30, 232 20, 240 20 C 248 20, 252 32, 248 58 Z"
          fill="url(#aortaGradient)"
          stroke="#FF758F"
          strokeWidth="1.2"
        />
        {/* Branch 3: Left Subclavian Artery */}
        <path
          d="M 255 65 C 258 45, 265 35, 274 35 C 282 35, 285 48, 278 78 Z"
          fill="url(#aortaGradient)"
          stroke="#FF758F"
          strokeWidth="1.2"
        />

        {/* The Great Aortic Arch Curved Trunk */}
        <path
          d="M 178 120 C 175 70, 205 38, 250 48 C 290 58, 305 105, 290 160 C 282 180, 272 200, 260 215 C 250 190, 252 145, 235 110 C 220 85, 195 85, 185 105 Z"
          fill="url(#aortaGradient)"
          stroke="#FFA3B5"
          strokeWidth="1.8"
        />

        {/* 3. PULMONARY ARTERY TRUNK (Crossing front of aorta) */}
        <path
          d="M 175 125 C 190 120, 225 125, 245 150 C 255 162, 250 185, 230 195 C 210 205, 185 200, 168 180 C 160 165, 162 140, 175 125 Z"
          fill="url(#pulmonaryGradient)"
          stroke="#C98291"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
        {/* Left Pulmonary Artery Branch */}
        <path
          d="M 245 150 C 275 145, 305 155, 318 170 C 310 182, 285 180, 255 172 Z"
          fill="url(#pulmonaryGradient)"
          stroke="#C98291"
          strokeWidth="1"
        />

        {/* 4. MAIN VENTRICULAR MASS & APEX (Muscular Body of the Heart) */}
        <path
          d="M 155 175 C 130 190, 105 225, 110 270 C 115 320, 135 365, 170 410 C 195 440, 220 465, 235 468 C 245 468, 255 450, 270 420 C 295 375, 325 320, 328 260 C 330 215, 308 185, 280 178 C 255 172, 230 185, 215 195 C 195 185, 175 172, 155 175 Z"
          fill="url(#muscleGradient)"
          stroke="#C98291"
          strokeWidth="2"
        />

        {/* Muscular shading striations and contours */}
        <g stroke="#9E4F60" strokeWidth="1" strokeOpacity="0.4" fill="none">
          <path d="M 130 240 C 145 280, 175 340, 220 420" />
          <path d="M 145 220 C 165 260, 195 330, 230 400" />
          <path d="M 305 240 C 285 285, 260 340, 240 420" />
          <path d="M 290 220 C 270 260, 250 320, 235 380" />
          <path d="M 180 200 C 190 240, 205 300, 225 360" />
        </g>

        {/* 5. CORONARY ARTERIES & VASCULAR TREE (Pulsing Blood Vessels) */}
        {/* Anterior Interventricular Artery (Main descending vessel to apex) */}
        <motion.path
          animate={{
            strokeWidth: isPulsing ? 3 : 2,
            strokeOpacity: isPulsing ? 1 : 0.75,
            filter: isPulsing ? 'url(#coronaryGlow)' : 'none',
          }}
          transition={{ duration: 0.15 }}
          d="M 215 195 C 220 225, 210 260, 225 295 C 235 320, 228 350, 232 385 C 235 410, 232 440, 235 468"
          stroke="url(#arteryGlow)"
          fill="none"
          strokeLinecap="round"
        />

        {/* Left Coronary Artery Branches */}
        <motion.path
          animate={{ strokeOpacity: isPulsing ? 0.95 : 0.6 }}
          d="M 225 295 C 245 305, 270 295, 290 310"
          stroke="url(#arteryGlow)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <motion.path
          animate={{ strokeOpacity: isPulsing ? 0.9 : 0.5 }}
          d="M 232 350 C 250 360, 270 365, 280 380"
          stroke="url(#arteryGlow)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <motion.path
          animate={{ strokeOpacity: isPulsing ? 0.85 : 0.4 }}
          d="M 245 305 C 255 325, 260 340, 268 355"
          stroke="url(#arteryGlow)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Right Coronary Artery Branches (Spreading across right ventricle) */}
        <motion.path
          animate={{ strokeOpacity: isPulsing ? 0.95 : 0.6 }}
          d="M 215 225 C 190 235, 165 240, 140 265"
          stroke="url(#arteryGlow)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        <motion.path
          animate={{ strokeOpacity: isPulsing ? 0.9 : 0.5 }}
          d="M 185 245 C 175 270, 160 300, 155 330"
          stroke="url(#arteryGlow)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        <motion.path
          animate={{ strokeOpacity: isPulsing ? 0.85 : 0.4 }}
          d="M 228 320 C 205 340, 185 365, 175 390"
          stroke="url(#arteryGlow)"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Intricate Micro-Capillary Network Dots */}
        <g fill="#FFA3B5" opacity={isPulsing ? 0.8 : 0.3}>
          <circle cx="218" cy="270" r="1.5" />
          <circle cx="230" cy="315" r="1.5" />
          <circle cx="275" cy="335" r="1.5" />
          <circle cx="165" cy="290" r="1.5" />
          <circle cx="190" cy="360" r="1.5" />
          <circle cx="233" cy="425" r="1.5" />
        </g>

        {/* Outer Fine Anatomical Etching Highlights */}
        <path
          d="M 115 260 C 120 310, 140 360, 175 405 C 195 430, 220 455, 235 465"
          stroke="#FFA3B5"
          strokeWidth="1"
          strokeOpacity="0.4"
          fill="none"
        />
        <path
          d="M 320 250 C 322 305, 295 365, 270 410"
          stroke="#FFA3B5"
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />
      </motion.svg>
    </div>
  );
};
