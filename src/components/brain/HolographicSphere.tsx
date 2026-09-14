"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { JarvisVoiceState } from "@/types/brain";

interface HolographicSphereProps {
  state: JarvisVoiceState;
  size?: number;
  audioAnalyser?: AnalyserNode | null;
}

export const HolographicSphere: React.FC<HolographicSphereProps> = ({ state, size = 460, audioAnalyser }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseOffsetRef = useRef({ x: 0, y: 0 });
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseOffsetRef.current = { x, y };
  };

  const handleMouseLeave = () => {
    mouseOffsetRef.current = { x: 0, y: 0 };
  };

  // State-driven rotation speeds (seconds per full 360 turn)
  const rotationDurations = {
    listening: { r1: 32, r2: -42, r3: 24, r4: -56, r5: 18, r6: -70 },
    processing: { r1: 6, r2: -8, r3: 4.5, r4: -10, r5: 3.5, r6: -12 },
    speaking: { r1: 15, r2: -20, r3: 11, r4: -26, r5: 8.5, r6: -32 },
    idle: { r1: 60, r2: -80, r3: 45, r4: -100, r5: 35, r6: -120 },
  }[state];

  // Core pulse scaling
  const corePulseScale = {
    listening: [1, 1.04, 0.99, 1.03, 1],
    processing: [1, 1.14, 0.95, 1.10, 1],
    speaking: [1, 1.16, 1.03, 1.20, 1],
    idle: [1, 1.01, 1],
  }[state];

  const pulseDuration = {
    listening: 3.4,
    processing: 0.8,
    speaking: 1.2,
    idle: 5.5,
  }[state];

  // High-performance 60fps Canvas for Quantum Wireframe Lattice & Depth Energy Plasma
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.5) : 1;
    const canvasSize = size;
    canvas.width = canvasSize * dpr;
    canvas.height = canvasSize * dpr;
    ctx.scale(dpr, dpr);

    const cx = canvasSize / 2;
    const cy = canvasSize / 2;
    const coreRadius = canvasSize * 0.38;

    // 1. Adaptive 3D Holographic Wireframe Sphere Nodes (Optimized for Mobile/Desktop)
    const numNodes = Math.min(80, Math.max(50, Math.floor(canvasSize * 0.2)));
    const sphereNodes: { theta: number; phi: number; baseR: number; size: number; isCyan: boolean }[] = [];
    for (let i = 0; i < numNodes; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      sphereNodes.push({
        theta,
        phi,
        baseR: coreRadius * (0.65 + Math.random() * 0.35),
        size: Math.random() * 1.6 + 0.8,
        isCyan: Math.random() > 0.3,
      });
    }

    // 2. Pre-allocate Concentric Orbital Flux Photons
    const orbitalFlux: { radiusRatio: number; angle: number; speed: number; size: number; isCyan: boolean }[] = [];
    const fluxRadii = [0.22, 0.32, 0.42, 0.52, 0.62, 0.72, 0.82];
    for (let i = 0; i < 35; i++) {
      const radiusRatio = fluxRadii[Math.floor(Math.random() * fluxRadii.length)];
      orbitalFlux.push({
        radiusRatio,
        angle: Math.random() * Math.PI * 2,
        speed: (Math.random() * 0.35 + 0.15) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2 + 1,
        isCyan: Math.random() > 0.35,
      });
    }

    let rotY = 0;
    let rotX = 0;
    let lastTime = performance.now();

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.033);
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      const currentState = stateRef.current;
      const speedMultiplier = currentState === "processing" ? 3.0 : currentState === "speaking" ? 1.8 : 1.0;
      rotY += 0.35 * speedMultiplier * dt;
      rotX += 0.12 * speedMultiplier * dt;

      const tiltX = mouseOffsetRef.current.y * 0.5;
      const tiltY = mouseOffsetRef.current.x * 0.5;
      const effectiveRotX = rotX + tiltX;
      const effectiveRotY = rotY + tiltY;

      const cosY = Math.cos(effectiveRotY);
      const sinY = Math.sin(effectiveRotY);
      const cosX = Math.cos(effectiveRotX);
      const sinX = Math.sin(effectiveRotX);

      const fov = 380;
      const speakPulse = currentState === "speaking" ? 1 + Math.sin(currentTime * 0.007) * 0.08 : 1;

      // Draw 3D Holographic Wireframe Nodes (Lightweight & Smooth)
      for (let i = 0; i < sphereNodes.length; i++) {
        const node = sphereNodes[i];
        const r = node.baseR * speakPulse;
        const x0 = r * Math.sin(node.theta) * Math.cos(node.phi);
        const y0 = r * Math.sin(node.theta) * Math.sin(node.phi);
        const z0 = r * Math.cos(node.theta);

        // 3D Matrix Rotation
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        const scale = fov / (fov + z2 + 100);
        const projX = cx + x1 * scale;
        const projY = cy + y2 * scale;

        const depthAlpha = Math.max(0.15, Math.min(0.9, (z2 + coreRadius) / (2 * coreRadius)));
        const color = node.isCyan ? "#00E5FF" : "#7B2CBF";

        ctx.fillStyle = color;
        ctx.globalAlpha = depthAlpha * (currentState === "speaking" ? 1 : 0.85);

        ctx.beginPath();
        ctx.arc(projX, projY, node.size * scale * (currentState === "speaking" ? 1.3 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Orbital Flux Photons on Concentric Rings
      for (let i = 0; i < orbitalFlux.length; i++) {
        const flux = orbitalFlux[i];
        flux.angle += flux.speed * speedMultiplier * dt;
        const currentR = (canvasSize * 0.5 * flux.radiusRatio) * speakPulse;
        const fX = cx + Math.cos(flux.angle) * currentR;
        const fY = cy + Math.sin(flux.angle) * currentR;

        const fColor = flux.isCyan ? "#00E5FF" : "#7B2CBF";
        ctx.fillStyle = fColor;
        ctx.globalAlpha = 0.85 * (currentState === "speaking" ? 1 : 0.75);

        ctx.beginPath();
        ctx.arc(fX, fY, flux.size * (currentState === "speaking" ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: "100%", maxWidth: size, height: "auto", aspectRatio: "1 / 1" }}
      className="relative flex items-center justify-center select-none cursor-pointer will-change-transform transform-gpu max-h-[75vh]"
    >
      {/* 1. Deep Core Radiant Aura Bloom */}
      <motion.div
        animate={{
          scale: corePulseScale,
          opacity: state === "speaking" ? [0.85, 1, 0.85] : state === "processing" ? [0.8, 1, 0.8] : [0.55, 0.75, 0.55],
        }}
        transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-72 h-72 sm:w-84 sm:h-84 rounded-full bg-gradient-to-tr from-[#00E5FF]/70 via-[#7B2CBF]/45 to-transparent blur-3xl pointer-events-none transform-gpu"
      />

      {/* 2. Secondary Ambient Violet Halo */}
      <motion.div
        animate={{
          scale: state === "speaking" ? [1, 1.25, 1] : [1, 1.08, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: pulseDuration * 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-88 h-88 sm:w-96 sm:h-96 rounded-full bg-[#7B2CBF]/30 blur-2xl pointer-events-none transform-gpu"
      />

      {/* 3. High-Definition Concentric Precision Circular Multi-Ring SVG Reactor */}
      <svg
        viewBox="0 0 520 520"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible transform-gpu"
      >
        <defs>
          <linearGradient id="reactorCyanViolet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#00E5FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7B2CBF" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="reactorVioletCyan" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7B2CBF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#00E5FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7B2CBF" stopOpacity="0.25" />
          </linearGradient>

          <radialGradient id="portalCoreAperture" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="20%" stopColor="#00E5FF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#00E5FF" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#7B2CBF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="0" />
          </radialGradient>

          <filter id="cyanPortalGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="violetPortalGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* BASE GROUND HOLOGRAPHIC DISC (Pedestal perspective like Ref) */}
        {/* ------------------------------------------------------------- */}
        <g opacity="0.65">
          <ellipse
            cx="260"
            cy="410"
            rx="210"
            ry="46"
            fill="none"
            stroke="url(#reactorCyanViolet)"
            strokeWidth="1.5"
            strokeDasharray="16 8 4 8"
            className="animate-[spin_32s_linear_infinite]"
            style={{ transformOrigin: "260px 410px" }}
          />
          <ellipse
            cx="260"
            cy="410"
            rx="235"
            ry="52"
            fill="none"
            stroke="#7B2CBF"
            strokeWidth="1.2"
            strokeDasharray="60 30 15 30"
            opacity="0.5"
          />
          <ellipse
            cx="260"
            cy="410"
            rx="170"
            ry="38"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.8"
            strokeDasharray="6 12"
            opacity="0.75"
          />
        </g>

        {/* ============================================================= */}
        {/* RING 7: OUTER TELEMETRY COMPASS DIAL (Radius: 248px) */}
        {/* ============================================================= */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: Math.abs(rotationDurations.r6), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="260"
            cy="260"
            r="248"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="0.8"
            strokeDasharray="2 8"
            opacity="0.3"
          />
          <circle
            cx="260"
            cy="260"
            r="248"
            fill="none"
            stroke="url(#reactorCyanViolet)"
            strokeWidth="2.2"
            strokeDasharray="80 60 20 60"
            opacity="0.85"
          />
          <circle cx="508" cy="260" r="4" fill="#00E5FF" opacity="0.9" />
          <circle cx="12" cy="260" r="4" fill="#7B2CBF" opacity="0.9" />
          <circle cx="260" cy="12" r="3" fill="#00E5FF" opacity="0.85" />
          <circle cx="260" cy="508" r="3" fill="#7B2CBF" opacity="0.85" />
        </motion.g>

        {/* ============================================================= */}
        {/* RING 6: COUNTER-ROTATING ENERGY TRACK (Radius: 215px) */}
        {/* ============================================================= */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: Math.abs(rotationDurations.r4), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="260"
            cy="260"
            r="215"
            fill="none"
            stroke="url(#reactorVioletCyan)"
            strokeWidth="2.5"
            strokeDasharray="50 20 100 20 25 30"
            opacity={state === "speaking" ? 0.95 : 0.8}
          />
          {/* Scientific Chevron Brackets */}
          <path d="M 470 252 L 478 260 L 470 268" fill="none" stroke="#00E5FF" strokeWidth="2" />
          <path d="M 50 252 L 42 260 L 50 268" fill="none" stroke="#00E5FF" strokeWidth="2" />
          <circle cx="260" cy="45" r="3.5" fill="#00E5FF" />
          <circle cx="260" cy="475" r="3.5" fill="#7B2CBF" />
        </motion.g>

        {/* ============================================================= */}
        {/* RING 5: CLOCKWISE DENSE SEGMENTED ORBIT (Radius: 180px) */}
        {/* ============================================================= */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: Math.abs(rotationDurations.r2), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="260"
            cy="260"
            r="180"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.8"
            strokeDasharray="18 12 6 12"
            opacity={state === "speaking" ? 1 : 0.85}
            filter="url(#cyanPortalGlow)"
          />
          <circle cx="440" cy="260" r="5" fill="#00E5FF" filter="url(#cyanPortalGlow)" />
          <circle cx="80" cy="260" r="5" fill="#7B2CBF" filter="url(#violetPortalGlow)" />
        </motion.g>

        {/* ============================================================= */}
        {/* RING 4: CONCENTRIC PULSE RING (Radius: 155px) */}
        {/* ============================================================= */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: Math.abs(rotationDurations.r3), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="260"
            cy="260"
            r="155"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="1.6"
            strokeDasharray="12 8 4 8"
            opacity={state === "speaking" ? 0.95 : 0.75}
            filter="url(#cyanPortalGlow)"
          />
          <circle cx="415" cy="260" r="3" fill="#00E5FF" />
          <circle cx="105" cy="260" r="3" fill="#00E5FF" />
        </motion.g>

        {/* ============================================================= */}
        {/* RING 3: CONCENTRIC VIOLET HARMONIC RING (Radius: 140px) */}
        {/* ============================================================= */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: Math.abs(rotationDurations.r1), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="260"
            cy="260"
            r="140"
            fill="none"
            stroke="#7B2CBF"
            strokeWidth="1.6"
            strokeDasharray="28 16"
            opacity={state === "speaking" ? 0.9 : 0.65}
            filter="url(#violetPortalGlow)"
          />
          <circle cx="260" cy="120" r="3" fill="#7B2CBF" />
          <circle cx="260" cy="400" r="3" fill="#7B2CBF" />
        </motion.g>

        {/* ============================================================= */}
        {/* RING 2: FAST COUNTER-ROTATING SLIT CONTAINMENT (Radius: 125px) */}
        {/* ============================================================= */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: Math.abs(rotationDurations.r5), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="260"
            cy="260"
            r="125"
            fill="none"
            stroke="url(#reactorCyanViolet)"
            strokeWidth="3.2"
            strokeDasharray="32 16 64 16"
            opacity="0.95"
            filter="url(#cyanPortalGlow)"
          />
          <circle cx="385" cy="260" r="4" fill="#00E5FF" />
          <circle cx="135" cy="260" r="4" fill="#7B2CBF" />
        </motion.g>

        {/* ============================================================= */}
        {/* RING 1: INNER HIGH-ENERGY REACTION APERTURE (Radius: 90px) */}
        {/* ============================================================= */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: Math.abs(rotationDurations.r1) * 0.7, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "260px 260px" }}
        >
          <circle
            cx="260"
            cy="260"
            r="90"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2.8"
            strokeDasharray="10 8 24 8"
            opacity="1"
            filter="url(#cyanPortalGlow)"
          />
          <circle cx="350" cy="260" r="3.5" fill="#FFFFFF" />
          <circle cx="170" cy="260" r="3.5" fill="#FFFFFF" />
          <circle cx="260" cy="350" r="3.5" fill="#00E5FF" />
          <circle cx="260" cy="170" r="3.5" fill="#00E5FF" />
        </motion.g>

        {/* ============================================================= */}
        {/* RADIANT LUMINOUS PORTAL CORE (Depth Gradient & Iris) */}
        {/* ============================================================= */}
        <motion.circle
          cx="260"
          cy="260"
          r={state === "processing" ? 68 : state === "speaking" ? 64 : 56}
          fill="url(#portalCoreAperture)"
          filter="url(#cyanPortalGlow)"
          animate={{
            scale: corePulseScale,
            opacity: state === "speaking" ? [0.95, 1, 0.95] : [0.85, 1, 0.85],
          }}
          transition={{ duration: pulseDuration, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "260px 260px" }}
        />

        {/* Geometric Telemetry Iris Center */}
        <circle cx="260" cy="260" r="32" fill="#00E5FF" opacity="0.85" />
        <circle cx="260" cy="260" r="20" fill="#02040a" />
        <circle cx="260" cy="260" r="10" fill="#FFFFFF" filter="url(#cyanPortalGlow)" />
      </svg>

      {/* 4. Canvas Wireframe Lattice & Flux Photons */}
      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="absolute inset-0 pointer-events-none z-10 transform-gpu"
      />

      {/* 5. Floating High-Contrast Core HUD Badge & Telemetry */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center pointer-events-none px-4">
        <div className="px-5 py-2.5 rounded-2xl bg-[#02040a]/94 border border-[#00E5FF]/50 backdrop-blur-xl shadow-[0_0_35px_rgba(2,4,10,0.95),0_0_20px_rgba(0,229,255,0.3)] flex flex-col items-center">
          <h2 className="text-base sm:text-lg font-mono font-extrabold tracking-widest text-[#FFFFFF] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            JARVIS
          </h2>
          <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#00E5FF] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            CHIEF BRAIN
          </span>
          <div className="mt-2 flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[rgba(0,229,255,0.12)] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] animate-pulse" />
            <span className="text-[9px] font-mono font-bold text-[#A5F3FC] uppercase tracking-wider">
              {state === "speaking" ? "SPEAKING ACTIVE" : state === "processing" ? "SYNTHESIZING..." : "SYSTEM ONLINE"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
