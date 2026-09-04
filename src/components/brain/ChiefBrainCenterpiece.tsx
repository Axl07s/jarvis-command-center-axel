"use client";

import React from "react";
import { HolographicSphere } from "./HolographicSphere";
import { VoiceStateControls } from "./VoiceStateControls";
import { useVoiceEngine } from "@/hooks/useVoiceEngine";
import { Maximize2, Cpu, Volume2, Loader2, Sparkles } from "lucide-react";

interface ChiefBrainCenterpieceProps {
  onTriggerVoiceMode?: () => void;
}

export const ChiefBrainCenterpiece: React.FC<ChiefBrainCenterpieceProps> = ({
  onTriggerVoiceMode,
}) => {
  const {
    voiceState,
    setVoiceState,
    isPlaying,
    isProcessing,
    speak,
    stop,
    selectedVoiceId,
    setSelectedVoiceId,
    availableVoices,
    analyserRef,
    currentEngine,
  } = useVoiceEngine();

  const handleTriggerSynthesis = () => {
    if (isPlaying || isProcessing) {
      stop();
    } else {
      speak("Jarvis Chief Brain operational. Neural telemetry and ElevenLabs voice bus synchronized.", selectedVoiceId);
    }
  };

  return (
    <div className="relative w-full min-h-[440px] xl:min-h-[500px] rounded-3xl bg-[rgba(2,4,10,0.88)] border border-[rgba(0,229,255,0.25)] backdrop-blur-md p-3.5 sm:p-5 lg:p-6 flex flex-col items-center justify-between overflow-hidden shadow-[0_0_55px_rgba(0,229,255,0.1)] [transform:translateZ(0)]">
      {/* Sci-Fi HUD Corner Brackets */}
      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-[#00E5FF] rounded-tl-md" />
      <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-[#00E5FF] rounded-tr-md" />
      <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-[#7B2CBF] rounded-bl-md" />
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-[#00E5FF] rounded-br-md" />

      {/* Top Header Row inside Centerpiece */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs z-20">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.3)] text-[#00E5FF] shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-extrabold tracking-widest text-[#E2E8F0] uppercase text-xs sm:text-sm">
              JARVIS CHIEF BRAIN
            </h2>
            <p className="text-[10px] text-[#00E5FF]/70">
              NEURAL TELEMETRY & ELEVENLABS TTS MATRIX
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Voice Personality Selector */}
          <select
            value={selectedVoiceId}
            onChange={(e) => setSelectedVoiceId(e.target.value)}
            className="w-full sm:w-auto bg-[rgba(2,4,10,0.9)] border border-[rgba(0,229,255,0.3)] text-[#00E5FF] text-[11px] font-mono rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.15)] cursor-pointer"
            aria-label="Select Voice Personality"
          >
            {availableVoices.map((v) => (
              <option key={v.id} value={v.id} className="bg-[#02040a] text-[#E2E8F0]">
                {v.name} ({v.role})
              </option>
            ))}
          </select>

          <div className="w-full sm:w-auto flex items-center gap-2">
            {/* Test Synthesis Button */}
            <button
              onClick={handleTriggerSynthesis}
              className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                isPlaying
                  ? "bg-[rgba(123,44,191,0.25)] border-[#7B2CBF] text-[#D8B4FE] shadow-[0_0_15px_rgba(123,44,191,0.4)]"
                  : isProcessing
                  ? "bg-[rgba(0,229,255,0.2)] border-[#00E5FF] text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] animate-pulse"
                  : "bg-[rgba(0,229,255,0.06)] border-[rgba(0,229,255,0.25)] text-[#A5F3FC]/80 hover:bg-[rgba(0,229,255,0.15)]"
              }`}
            >
              {isProcessing ? (
                <Loader2 className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" />
              ) : isPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
              )}
              <span>
                {isProcessing ? "SYNTH..." : isPlaying ? "LIVE" : "TEST TTS"}
              </span>
            </button>

            {onTriggerVoiceMode && (
              <button
                onClick={onTriggerVoiceMode}
                className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.4)] text-[#00E5FF] text-[11px] font-bold hover:bg-[rgba(0,229,255,0.2)] transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)]"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="truncate">IMMERSIVE VOICE MODE</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Central Canvas: Large Centered Self-Contained Neural Reactor Core */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center py-2 my-1 max-w-[440px] mx-auto">
        <HolographicSphere state={voiceState} size={440} audioAnalyser={analyserRef.current} />
      </div>

      {/* Bottom Voice State Controls & Telemetry Status */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[rgba(0,229,255,0.1)] z-20 font-mono">
        <div className="text-[11px] text-[#A5F3FC]/60 flex items-center space-x-2">
          <span>STATE:</span>
          <span className="font-bold text-[#00E5FF] uppercase tracking-wider">
            {voiceState}
          </span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(0,229,255,0.1)] border border-[#00E5FF]/30 text-[#00E5FF]">
            {currentEngine === "elevenlabs" ? "ELEVENLABS" : "SYNTH ENGINE"}
          </span>
        </div>

        <VoiceStateControls currentState={voiceState} onStateChange={setVoiceState} />

        <div className="text-[10px] text-[#A5F3FC]/40 text-right hidden lg:block">
          <div>FREQ: {voiceState === "speaking" ? "142.8 Hz" : voiceState === "processing" ? "98.4 Hz" : "42.0 Hz"}</div>
          <div>AUDIO BUS: {isPlaying ? "LIVE ELEVENLABS" : "READY"}</div>
        </div>
      </div>
    </div>
  );
};
