"use client";

import React, { useEffect, useRef } from "react";
import { JarvisVoiceState } from "@/types/brain";

interface ParticleFieldCanvasProps {
  state: JarvisVoiceState;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  angle: number;
  distance: number;
  speed: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

export const ParticleFieldCanvas: React.FC<ParticleFieldCanvasProps> = ({
  state,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.parentElement?.clientHeight || 600;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    // Generate particles
    const particleCount = 100;
    const particles: Particle[] = [];
    const colors = ["#00E5FF", "#00E5FF", "#7B2CBF", "#A5F3FC"];

    for (let i = 0; i < particleCount; i++) {
      const distance = 40 + Math.random() * (Math.min(width, height) * 0.42);
      particles.push({
        x: width / 2,
        y: height / 2,
        radius: Math.random() * 1.8 + 0.8,
        angle: Math.random() * Math.PI * 2,
        distance,
        speed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.04 + 0.02,
      });
    }

    let tick = 0;

    const render = () => {
      tick++;

      // Fast clear
      ctx.fillStyle = "rgba(2, 4, 10, 0.3)";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      let speedMult = 1;
      let waveDistort = 0;
      let clusterBias = 1;

      if (state === "processing") {
        speedMult = 3.0;
        waveDistort = Math.sin(tick * 0.1) * 12;
        clusterBias = 0.78;
      } else if (state === "speaking") {
        speedMult = 1.8;
        waveDistort = Math.sin(tick * 0.05) * 20;
        clusterBias = 1.15;
      } else if (state === "listening") {
        speedMult = 0.8;
        waveDistort = Math.sin(tick * 0.02) * 6;
        clusterBias = 1.0;
      } else {
        speedMult = 0.4;
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.angle += p.speed * speedMult;
        const currentDist = p.distance * clusterBias + waveDistort;

        const px = centerX + Math.cos(p.angle) * currentDist;
        const py = centerY + Math.sin(p.angle) * (currentDist * 0.85);

        const pulseAlpha = p.alpha * (0.6 + 0.4 * Math.sin(tick * p.pulseSpeed));
        const finalAlpha = Math.max(0.1, Math.min(1, pulseAlpha));

        // Outer glow circle (Fast GPU-friendly glow instead of expensive shadowBlur)
        ctx.beginPath();
        ctx.arc(px, py, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = finalAlpha * 0.25;
        ctx.fill();

        // Core particle point
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = finalAlpha;
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [state]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className || ""}`}
    />
  );
};
