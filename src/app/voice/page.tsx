"use client";

import React, { useState } from "react";
import { sampleVoicePhrases } from "@/mocks/voiceMock";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { EnergyWaveform } from "@/components/brain/EnergyWaveform";
import { useVoiceEngine } from "@/hooks/useVoiceEngine";
import { Volume2, Play, Square, Sparkles, Send, Loader2, VolumeX, Gauge, Music } from "lucide-react";

export default function VoiceStatusPage() {
  const {
    voiceState,
    isPlaying,
    isProcessing,
    speak,
    stop,
    selectedVoiceId,
    setSelectedVoiceId,
    volume,
    setVolume,
    speechRate,
    setSpeechRate,
    isMuted,
    setIsMuted,
    currentEngine,
    availableVoices,
    analyserRef,
  } = useVoiceEngine();

  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);
  const [customText, setCustomText] = useState(
    "Ground Control to Major Tom. Take your protein pills and put your helmet on. Ten, nine, eight, seven, six, five, four, three, two, one. Liftoff."
  );

  const handlePlaySample = (id: string, text: string) => {
    if (activeSampleId === id && (isPlaying || isProcessing)) {
      stop();
      setActiveSampleId(null);
    } else {
      setActiveSampleId(id);
      speak(text, selectedVoiceId);
    }
  };

  const handleSynthesizeCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    setActiveSampleId("custom");
    speak(customText.trim(), selectedVoiceId);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-6">
      {/* Top Voice Telemetry Banner */}
      <GlassCard
        headerTitle="ELEVENLABS NEURAL TTS SYNTHESIS & VOICE STATUS"
        headerTag={isPlaying ? "TRANSMITTING AUDIO" : isProcessing ? "SYNTHESIZING..." : "STREAM READY"}
        variant="glow-cyan"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {/* Voice Engine Preset Selector */}
          <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)]">
            <span className="text-[10px] text-[#A5F3FC]/50 uppercase">ACTIVE VOICE PRESET</span>
            <select
              value={selectedVoiceId}
              onChange={(e) => setSelectedVoiceId(e.target.value)}
              className="w-full mt-1 bg-[rgba(2,4,10,0.9)] border border-[rgba(0,229,255,0.3)] text-[#00E5FF] text-xs font-mono rounded-lg px-2 py-1.5 focus:outline-none focus:border-[#00E5FF] cursor-pointer"
            >
              {availableVoices.map((v) => (
                <option key={v.id} value={v.id} className="bg-[#02040a] text-[#E2E8F0]">
                  {v.name} ({v.role})
                </option>
              ))}
            </select>
            <div className="text-[10px] text-[#A5F3FC]/50 mt-1.5">
              Engine: {currentEngine === "elevenlabs" ? "ElevenLabs Cloud" : "High-Fidelity Synth"}
            </div>
          </div>

          {/* Speech Rate / Pacing Control Slider */}
          <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#A5F3FC]/50 uppercase flex items-center space-x-1">
                <Gauge className="w-3 h-3 text-[#00E5FF]" />
                <span>SPEECH SPEED / PACING</span>
              </span>
              <span className="font-bold text-[#00E5FF]">{Math.round(speechRate * 100)}%</span>
            </div>
            <div className="flex items-center space-x-2 mt-1.5">
              <input
                type="range"
                min="0.6"
                max="1.2"
                step="0.05"
                value={speechRate}
                onChange={(e) => setSpeechRate(Number(e.target.value))}
                className="w-full accent-[#00E5FF] cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[9px] text-[#A5F3FC]/50 mt-1">
              <button
                type="button"
                onClick={() => setSpeechRate(0.75)}
                className={`hover:underline ${speechRate === 0.75 ? "text-[#00E5FF] font-bold" : ""}`}
              >
                0.75x (Lyrics)
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.85)}
                className={`hover:underline ${speechRate === 0.85 ? "text-[#00E5FF] font-bold" : ""}`}
              >
                0.85x (Calm)
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(1.0)}
                className={`hover:underline ${speechRate === 1.0 ? "text-[#00E5FF] font-bold" : ""}`}
              >
                1.0x (Fast)
              </button>
            </div>
          </div>

          {/* Active Voice State Badge */}
          <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)]">
            <span className="text-[10px] text-[#A5F3FC]/50 uppercase">REACTOR STATE</span>
            <div className="flex items-center space-x-2 mt-1.5">
              <GlowBadge
                label={isProcessing ? "PROCESSING" : isPlaying ? "SPEAKING" : "LISTENING"}
                variant={isPlaying ? "cyan" : isProcessing ? "violet" : "pale"}
                pulsing={isPlaying || isProcessing}
              />
            </div>
            <div className="text-[10px] text-[#A5F3FC]/50 mt-1.5">
              Status: {isProcessing ? "Fetching Stream" : isPlaying ? "Active Audio Output" : "Standby Acoustic Bus"}
            </div>
          </div>

          {/* Volume Control */}
          <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#A5F3FC]/50 uppercase">MASTER VOLUME</span>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-[10px] text-[#00E5FF] hover:underline flex items-center space-x-1"
              >
                {isMuted ? <VolumeX className="w-3 h-3 text-[#7B2CBF]" /> : <Volume2 className="w-3 h-3 text-[#00E5FF]" />}
                <span>{isMuted ? "MUTED" : "ACTIVE"}</span>
              </button>
            </div>
            <div className="flex items-center space-x-2 mt-1.5">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-[#00E5FF] cursor-pointer"
              />
              <span className="font-bold text-[#00E5FF]">{isMuted ? 0 : volume}%</span>
            </div>
            <div className="text-[10px] text-[#A5F3FC]/50 mt-1">
              Audio Bus: 48 kHz / 24-bit PCM
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Live Voice Synchronized Waveform */}
      <GlassCard
        headerTitle="LIVE VOCAL HARMONIC SPECTRUM & FREQUENCY MODULATION"
        headerTag={isPlaying ? "TRANSMITTING" : isProcessing ? "ANALYZING" : "STANDBY BUS"}
      >
        <EnergyWaveform state={voiceState} audioAnalyser={analyserRef.current} height={180} />
        <div className="flex justify-between items-center text-xs font-mono text-[#A5F3FC]/60 mt-2 pt-2 border-t border-[rgba(0,229,255,0.08)]">
          <span>Acoustic Carrier: {isPlaying ? "210.4 kHz Dynamic" : isProcessing ? "142.8 kHz Fast" : "42.0 kHz Base"}</span>
          <span className="text-[#00E5FF]">ENGINE: {currentEngine === "elevenlabs" ? "ELEVENLABS API STREAM" : "WEB AUDIO OSCILLATOR SYNTH"}</span>
        </div>
      </GlassCard>

      {/* Custom Text Synthesis Interactive Console */}
      <GlassCard
        headerTitle="CUSTOM TTS SYNTHESIS CONSOLE"
        headerTag="CALM CADENCE & SPEED TUNING"
      >
        <form onSubmit={handleSynthesizeCustom} className="space-y-3 font-mono text-xs">
          <p className="text-[11px] text-[#A5F3FC]/60">
            Type any custom phrase or song lyrics below and click &quot;SYNTHESIZE SPEECH&quot; to test speech pacing and voice differences:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter song lyrics or custom sentence to speak..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[rgba(0,0,0,0.6)] border border-[rgba(0,229,255,0.3)] text-[#E2E8F0] placeholder-[#A5F3FC]/30 text-xs font-mono focus:outline-none focus:border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.1)]"
            />
            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[rgba(0,229,255,0.15)] border border-[#00E5FF]/60 text-[#00E5FF] font-bold hover:bg-[rgba(0,229,255,0.25)] transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)] shrink-0 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#00E5FF]" />
                  <span>SYNTHESIZING...</span>
                </>
              ) : isPlaying && activeSampleId === "custom" ? (
                <>
                  <Square className="w-4 h-4 text-[#7B2CBF]" />
                  <span>STOP PLAYBACK</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#00E5FF]" />
                  <span>SYNTHESIZE SPEECH</span>
                </>
              )}
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Test Sample Phrases */}
      <GlassCard
        headerTitle="TEST JARVIS VOICE PRESETS & BENCHMARKS"
        headerTag="ELEVENLABS TTS MATRIX"
      >
        <div className="space-y-3 font-mono text-xs">
          <p className="text-[11px] text-[#A5F3FC]/60">
            Click &quot;TEST VOICE&quot; on any benchmark below to hear the distinct acoustic personalities and calm reading cadence:
          </p>

          {sampleVoicePhrases.map((phrase) => {
            const isCurrentActive = activeSampleId === phrase.id && (isPlaying || isProcessing);
            return (
              <div
                key={phrase.id}
                className="p-4 rounded-xl bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.1)] hover:border-[rgba(0,229,255,0.3)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    {phrase.id === "sample-3" ? (
                      <Music className="w-3.5 h-3.5 text-[#00E5FF]" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" />
                    )}
                    <span className="font-bold text-[#E2E8F0]">{phrase.title}</span>
                  </div>
                  <p className="text-xs text-[#A5F3FC]/80 italic">
                    &quot;{phrase.text}&quot;
                  </p>
                  <div className="text-[10px] text-[#A5F3FC]/40">
                    Est. Duration: {phrase.durationEstimateSeconds}s
                  </div>
                </div>

                <button
                  onClick={() => handlePlaySample(phrase.id, phrase.text)}
                  className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg font-semibold shrink-0 transition-all ${
                    isCurrentActive
                      ? "bg-[#7B2CBF]/30 border border-[#7B2CBF] text-[#D8B4FE] shadow-[0_0_15px_rgba(123,44,191,0.3)]"
                      : "bg-[#00E5FF]/15 border border-[#00E5FF]/50 text-[#00E5FF] hover:bg-[#00E5FF]/25 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  }`}
                >
                  {isCurrentActive && isProcessing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00E5FF]" />
                      <span>SYNTHESIZING...</span>
                    </>
                  ) : isCurrentActive && isPlaying ? (
                    <>
                      <Square className="w-3.5 h-3.5 text-[#7B2CBF]" />
                      <span>STOP TRANSMISSION</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>TEST VOICE</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
