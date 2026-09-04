"use client";

import React from "react";
import { motion } from "framer-motion";
import { JarvisVoiceState } from "@/types/brain";

interface NeuralCoreRingsProps {
  state: JarvisVoiceState;
}

export const NeuralCoreRings: React.FC<NeuralCoreRingsProps> = ({ state }) => {
  // Rotation speeds per state
  const rotationDurations = {
    listening: { r1: 30, r2: -38, r3: 20, r4: -50, r5: 14 },
    processing: { r1: 5.5, r2: -7, r3: 4, r4: -9, r5: 3 },
    speaking: { r1: 14, r2: -18, r3: 9, r4: -24, r5: 7 },
    idle: { r1: 50, r2: -65, r3: 32, r4: -85, r5: 22 },
  }[state];

  const pulseScale = {
    listening: [1, 1.05, 0.98, 1.04, 1],
    processing: [1, 1.15, 0.94, 1.12, 1],
    speaking: [1, 1.18, 1.04, 1.22, 1],
    idle: [1, 1.02, 1],
  }[state];

  const pulseDuration = {
    listening: 3.2,
    processing: 0.75,
    speaking: 1.1,
    idle: 5.0,
  }[state];

  return (
    <div className="relative w-[340px] h-[340px] md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] flex items-center justify-center select-none">
      {/* Central Ambient Glow */}
      <motion.div
        animate={{
          scale: pulseScale,
          opacity: state === "processing" ? [0.75, 1, 0.75] : state === "speaking" ? [0.8, 1, 0.8] : [0.45, 0.7, 0.45],
        }}
        transition={{
          duration: pulseDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[#00E5FF]/50 via-[#7B2CBF]/40 to-transparent blur-3xl pointer-events-none transform-gpu"
      />

      <svg
        viewBox="0 0 600 600"
        className="w-full h-full overflow-visible pointer-events-none transform-gpu"
      >
        <defs>
          <linearGradient id="immCyanViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7B2CBF" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="immVioletCyan" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B2CBF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#00E5FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7B2CBF" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="immCoreRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#00E5FF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#7B2CBF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="0" />
          </radialGradient>

          <filter id="glowFilterImm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ring 5 (Outer Perimeter Track with Nodes) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: Math.abs(rotationDurations.r4), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle
            cx="300"
            cy="300"
            r="275"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.8"
            strokeDasharray="2 10"
            opacity="0.35"
          />
          <circle
            cx="300"
            cy="300"
            r="275"
            fill="none"
            stroke="url(#immCyanViolet)"
            strokeWidth="2"
            strokeDasharray="75 60 20 60"
            opacity="0.8"
            filter="url(#glowFilterImm)"
          />
          <circle cx="575" cy="300" r="4.5" fill="#00E5FF" filter="url(#glowFilterImm)" />
          <circle cx="25" cy="300" r="4" fill="#7B2CBF" filter="url(#glowFilterImm)" />
          <circle cx="300" cy="25" r="3" fill="#00E5FF" opacity="0.8" />
          <circle cx="300" cy="575" r="3" fill="#7B2CBF" opacity="0.8" />
        </motion.g>

        {/* Ring 4 (Counter-Rotating Track with Brackets) */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: Math.abs(rotationDurations.r2), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle
            cx="300"
            cy="300"
            r="230"
            fill="none"
            stroke="url(#immVioletCyan)"
            strokeWidth="2.5"
            strokeDasharray="55 22 110 22 25 35"
            opacity={state === "speaking" ? 0.95 : 0.8}
            filter="url(#glowFilterImm)"
          />
          <path d="M 530 290 L 540 300 L 530 310" fill="none" stroke="#00E5FF" strokeWidth="2.2" />
          <path d="M 70 290 L 60 300 L 70 310" fill="none" stroke="#00E5FF" strokeWidth="2.2" />
          <circle cx="300" cy="70" r="4" fill="#00E5FF" />
          <circle cx="300" cy="530" r="4" fill="#7B2CBF" />
        </motion.g>

        {/* Ring 3 (Clockwise Dense Segmented Orbital) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: Math.abs(rotationDurations.r1), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle
            cx="300"
            cy="300"
            r="185"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.8"
            strokeDasharray="16 12 5 12"
            opacity={state === "speaking" ? 0.95 : 0.85}
            filter="url(#glowFilterImm)"
          />
          <circle cx="485" cy="300" r="5.5" fill="#00E5FF" filter="url(#glowFilterImm)" />
          <circle cx="115" cy="300" r="5.5" fill="#7B2CBF" filter="url(#glowFilterImm)" />
        </motion.g>

        {/* Ring 2 (Fast Counter-Rotating Slit Ring) */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: Math.abs(rotationDurations.r3), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle
            cx="300"
            cy="300"
            r="138"
            fill="none"
            stroke="url(#immCyanViolet)"
            strokeWidth="3.2"
            strokeDasharray="35 18 68 18"
            opacity="0.9"
            filter="url(#glowFilterImm)"
          />
          <circle cx="438" cy="300" r="4" fill="#00E5FF" />
          <circle cx="162" cy="300" r="4" fill="#7B2CBF" />
        </motion.g>

        {/* Ring 1 (Inner High-Energy Containment Ring) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: Math.abs(rotationDurations.r5), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "300px 300px" }}
        >
          <circle
            cx="300"
            cy="300"
            r="98"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2.5"
            strokeDasharray="10 8 22 8"
            opacity="0.95"
            filter="url(#glowFilterImm)"
          />
          <circle cx="398" cy="300" r="3" fill="#FFFFFF" />
          <circle cx="202" cy="300" r="3" fill="#FFFFFF" />
          <circle cx="300" cy="398" r="3" fill="#00E5FF" />
          <circle cx="300" cy="202" r="3" fill="#00E5FF" />
        </motion.g>

        {/* Luminous Energy Reactor Core */}
        <motion.circle
          cx="300"
          cy="300"
          r={state === "processing" ? 64 : state === "speaking" ? 62 : 54}
          fill="url(#immCoreRadial)"
          filter="url(#glowFilterImm)"
          animate={{
            scale: pulseScale,
            opacity: state === "speaking" ? [0.95, 1, 0.95] : [0.85, 1, 0.85],
          }}
          transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "300px 300px" }}
        />

        {/* Central Geometric Iris & Telemetry Marker */}
        <circle cx="300" cy="300" r="28" fill="#00E5FF" opacity="0.85" />
        <circle cx="300" cy="300" r="16" fill="#02040a" />
        <circle cx="300" cy="300" r="8" fill="#FFFFFF" filter="url(#glowFilterImm)" />
      </svg>
    </div>
  );
};
