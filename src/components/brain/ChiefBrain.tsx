"use client";

import React, { useState } from "react";
import { JarvisVoiceState } from "@/types/brain";
import { voiceStateConfigs, initialBrainTelemetry } from "@/mocks/brainMock";
import { NeuralCoreRings } from "./NeuralCoreRings";
import { ParticleFieldCanvas } from "./ParticleFieldCanvas";
import { EnergyWaveform } from "./EnergyWaveform";
import { VoiceStateControls } from "./VoiceStateControls";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { Activity, Zap, Flame, Radio } from "lucide-react";

interface ChiefBrainProps {
  initialState?: JarvisVoiceState;
  onStateChange?: (state: JarvisVoiceState) => void;
  className?: string;
}

export const ChiefBrain: React.FC<ChiefBrainProps> = ({
  initialState = "listening",
  onStateChange,
  className,
}) => {
  const [currentState, setCurrentState] = useState<JarvisVoiceState>(initialState);
  const activeConfig = voiceStateConfigs[currentState] || voiceStateConfigs.listening;

  const handleStateSelect = (newState: JarvisVoiceState) => {
    setCurrentState(newState);
    onStateChange?.(newState);
  };

  // Dynamic telemetry derived from state
  const telemetry = {
    ...initialBrainTelemetry,
    neuralLoad:
      currentState === "processing"
        ? 86.4
        : currentState === "speaking"
        ? 62.1
        : 38.4,
    synapticRate:
      currentState === "processing"
        ? 12400
        : currentState === "speaking"
        ? 8900
        : 4820,
    coreTemperature:
      currentState === "processing"
        ? 58.2
        : currentState === "speaking"
        ? 49.0
        : 42.1,
    waveformFrequency:
      currentState === "processing"
        ? 340.5
        : currentState === "speaking"
        ? 210.0
        : 142.6,
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-between min-h-[560px] lg:min-h-[640px] rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(0,229,255,0.06)] via-[rgba(123,44,191,0.03)] to-[#02040a] border border-[rgba(0,229,255,0.2)] shadow-[0_0_40px_rgba(0,229,255,0.08)] ${
        className || ""
      }`}
    >
      {/* Sci-Fi HUD Ambient Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Top HUD Readout Bar */}
      <div className="w-full z-10 flex flex-wrap items-center justify-between gap-4 px-6 pt-5">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-pulse" />
          <div>
            <h2 className="text-sm font-mono font-bold tracking-widest text-[#E2E8F0] uppercase">
              JARVIS CHIEF BRAIN
            </h2>
            <p className="text-[11px] font-mono text-[#A5F3FC]/60">
              {activeConfig.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <GlowBadge
            label={activeConfig.label}
            variant={
              currentState === "processing"
                ? "violet"
                : currentState === "speaking"
                ? "cyan"
                : "pale"
            }
            pulsing={currentState !== "idle"}
          />
        </div>
      </div>

      {/* Central 3D / Layered Core Container */}
      <div className="relative w-full flex-1 flex items-center justify-center py-4">
        {/* Dynamic 2D Canvas Particle Field */}
        <ParticleFieldCanvas state={currentState} />

        {/* Layered Multi-Ring SVG Neural Geometry */}
        <NeuralCoreRings state={currentState} />

        {/* Telemetry Lateral Callouts */}
        <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col space-y-4">
          <div className="p-3 rounded-lg bg-[rgba(2,6,23,0.8)] border border-[rgba(0,229,255,0.15)] backdrop-blur-md">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#A5F3FC]/70 uppercase">
              <Activity className="w-3 h-3 text-[#00E5FF]" />
              <span>NEURAL LOAD</span>
            </div>
            <div className="text-lg font-mono font-bold text-[#E2E8F0] tabular-nums mt-0.5">
              {telemetry.neuralLoad}%
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[rgba(2,6,23,0.8)] border border-[rgba(0,229,255,0.15)] backdrop-blur-md">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#A5F3FC]/70 uppercase">
              <Zap className="w-3 h-3 text-[#7B2CBF]" />
              <span>SYNAPSE RATE</span>
            </div>
            <div className="text-lg font-mono font-bold text-[#E2E8F0] tabular-nums mt-0.5">
              {telemetry.synapticRate} <span className="text-xs text-[#A5F3FC]/60">Hz</span>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col space-y-4">
          <div className="p-3 rounded-lg bg-[rgba(2,6,23,0.8)] border border-[rgba(0,229,255,0.15)] backdrop-blur-md">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#A5F3FC]/70 uppercase">
              <Flame className="w-3 h-3 text-[#00E5FF]" />
              <span>CORE TEMP</span>
            </div>
            <div className="text-lg font-mono font-bold text-[#E2E8F0] tabular-nums mt-0.5">
              {telemetry.coreTemperature}°C
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[rgba(2,6,23,0.8)] border border-[rgba(0,229,255,0.15)] backdrop-blur-md">
            <div className="flex items-center space-x-2 text-[10px] font-mono text-[#A5F3FC]/70 uppercase">
              <Radio className="w-3 h-3 text-[#7B2CBF]" />
              <span>WAVE FREQ</span>
            </div>
            <div className="text-lg font-mono font-bold text-[#E2E8F0] tabular-nums mt-0.5">
              {telemetry.waveformFrequency} <span className="text-xs text-[#A5F3FC]/60">kHz</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Waveform + State Controller */}
      <div className="w-full z-10 flex flex-col items-center space-y-3 pb-6 px-6">
        {/* Real-time Dynamic Energy Waveform */}
        <EnergyWaveform state={currentState} />

        {/* State Switching Controls */}
        <VoiceStateControls
          currentState={currentState}
          onStateChange={handleStateSelect}
        />
      </div>
    </div>
  );
};
