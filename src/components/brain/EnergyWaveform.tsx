"use client";

import React, { useEffect, useRef } from "react";
import { JarvisVoiceState } from "@/types/brain";

interface EnergyWaveformProps {
  state: JarvisVoiceState;
  className?: string;
  height?: number;
  audioAnalyser?: AnalyserNode | null;
}

export const EnergyWaveform: React.FC<EnergyWaveformProps> = ({
  state,
  className,
  height = 180,
  audioAnalyser,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    let displayWidth = canvas.parentElement?.clientWidth || 1000;
    let displayHeight = height;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      displayWidth = canvas.parentElement.clientWidth;
      displayHeight = height;
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    const bufferLength = audioAnalyser ? audioAnalyser.frequencyBinCount : 0;
    const dataArray = audioAnalyser ? new Uint8Array(bufferLength) : null;

    let lastTime = performance.now();
    let step = 0;

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.033);
      lastTime = currentTime;
      step += dt * 60;

      ctx.clearRect(0, 0, displayWidth, displayHeight);

      const centerY = displayHeight / 2;

      let audioVolume = 0;
      if (audioAnalyser && dataArray) {
        audioAnalyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        audioVolume = sum / (dataArray.length * 255);
      }

      // Configuration per Voice State
      let baseFreq = 0.016;
      let baseAmp = 18;
      let speed = 0.045;
      let waveLines = 5;

      if (state === "speaking") {
        baseFreq = 0.022;
        const speechPulse = Math.sin(step * 0.08) * Math.cos(step * 0.035);
        const liveAudioBoost = audioVolume > 0 ? audioVolume * 35 : 0;
        baseAmp = 26 + speechPulse * 12 + liveAudioBoost;
        speed = 0.10;
        waveLines = 5;
      } else if (state === "processing") {
        baseFreq = 0.038;
        baseAmp = 18 + Math.sin(step * 0.18) * 8;
        speed = 0.14;
        waveLines = 4;
      } else if (state === "listening") {
        baseFreq = 0.016;
        baseAmp = 12 + Math.sin(step * 0.04) * 4;
        speed = 0.035;
        waveLines = 3;
      } else {
        baseFreq = 0.012;
        baseAmp = 8;
        speed = 0.02;
        waveLines = 2;
      }

      const stepPhase = step * speed;

      // Draw multi-layered traversing horizontal frequency lines
      for (let w = 0; w < waveLines; w++) {
        ctx.beginPath();
        const offset = w * (Math.PI / 3);
        const lineAlpha = state === "speaking" ? 0.9 - w * 0.12 : 0.8 - w * 0.18;
        const isCyan = w % 2 === 0;
        const color = isCyan ? "#00E5FF" : "#7B2CBF";

        for (let x = 0; x < displayWidth; x += 3) {
          const normX = x / displayWidth;
          // Smooth Quadratic Cosine envelope — strictly contained within reactor diameter
          const distFromCenter = Math.abs(normX - 0.5);
          const envelope = Math.max(0, Math.pow(Math.cos(distFromCenter * Math.PI), 2.2));

          let freqVal = 0;
          if (dataArray && bufferLength > 0) {
            const binIdx = Math.floor(normX * bufferLength) % bufferLength;
            freqVal = (dataArray[binIdx] / 255) * 22;
          }

          // Asymmetric modulation: harmonic violet pulses on left, electric high-frequency cyan spikes on right
          const edgeMod = normX > 0.5 ? 1 + (normX - 0.5) * 0.8 * Math.sin(step * 0.15 + x * 0.04) : 1;

          const y =
            centerY +
            Math.sin(x * baseFreq + stepPhase + offset) *
              (baseAmp + freqVal) *
              envelope *
              edgeMod *
              (1 + Math.sin(step * 0.05 + x * 0.008) * 0.25);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = w === 0 ? (state === "speaking" ? 3.5 : 2.4) : (state === "speaking" ? 1.8 : 1.2);
        ctx.globalAlpha = Math.max(0.15, lineAlpha);
        ctx.shadowBlur = state === "speaking" ? (isCyan ? 16 : 10) : 8;
        ctx.shadowColor = color;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [state, height, audioAnalyser]);

  return (
    <div className={`relative w-full overflow-hidden will-change-transform transform-gpu ${className || ""}`} style={{ height }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none opacity-95 transform-gpu"
      />
    </div>
  );
};
