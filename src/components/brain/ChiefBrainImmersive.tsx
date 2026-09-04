"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HolographicSphere } from "./HolographicSphere";
import { useVoiceEngine } from "@/hooks/useVoiceEngine";
import { X, Radio, Activity, Send, Volume2, Loader2 } from "lucide-react";

interface ChiefBrainImmersiveProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChiefBrainImmersive: React.FC<ChiefBrainImmersiveProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    voiceState,
    setVoiceState,
    isPlaying,
    isProcessing,
    speak,
    stop,
    selectedVoiceId,
    analyserRef,
    currentEngine,
  } = useVoiceEngine();

  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [customQuery, setCustomQuery] = useState("");
  const [activeDialogue, setActiveDialogue] = useState("Certainly. All nine agent subsystems are synchronized and ready.");

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle ESC key to close modal cleanly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        stop();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, stop]);

  // When modal opens, trigger initial greeting synthesis
  useEffect(() => {
    if (isOpen) {
      const greeting = "Immersive neural interface activated. Jarvis core telemetry online.";
      setActiveDialogue(greeting);
      speak(greeting, selectedVoiceId);
    }
  }, [isOpen]);

  const handleSendQuery = (phrase?: string) => {
    const textToSend = phrase || customQuery || "All agent network nodes report nominal operation.";
    setActiveDialogue(textToSend);
    setCustomQuery("");
    speak(textToSend, selectedVoiceId);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[99999] w-full h-full bg-[#02040a] flex flex-col justify-between p-3 sm:p-6 lg:p-8 select-none overflow-y-auto overscroll-contain [transform:translateZ(0)]"
        >
        {/* Lightweight Ambient Glow */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,229,255,0.15)_0%,rgba(123,44,191,0.08)_45%,#02040a_80%)] pointer-events-none -z-10" />

        {/* Top Autonomous HUD Bar */}
        <header className="relative z-30 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-[#02040a]/95 border border-[rgba(0,229,255,0.3)] shadow-[0_0_35px_rgba(0,229,255,0.15)] shrink-0">
          {/* Left Title & Status */}
          <div className="flex items-center space-x-2.5 font-mono text-xs">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[#00E5FF]/50 shadow-[0_0_12px_rgba(0,229,255,0.3)] shrink-0">
              <Radio className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
            </div>
            <div>
              <div className="font-bold text-[#E2E8F0] tracking-widest uppercase flex items-center space-x-1.5 text-[11px] sm:text-xs">
                <span>JARVIS // IMMERSIVE VOCAL MATRIX</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-[#A5F3FC]/50 tracking-wider truncate">
                ENGINE: {currentEngine === "elevenlabs" ? "ELEVENLABS" : "NATURAL SYNTH"}
              </div>
            </div>
          </div>

          {/* Center Voice State Switcher Pills */}
          <div className="flex items-center space-x-1 p-1 rounded-xl bg-[rgba(0,0,0,0.6)] border border-[rgba(0,229,255,0.2)] font-mono text-xs">
            <button
              onClick={() => {
                stop();
                setVoiceState("listening");
              }}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all flex items-center space-x-1 text-[10px] sm:text-xs ${
                voiceState === "listening"
                  ? "bg-[#00E5FF]/25 text-[#00E5FF] font-bold border border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                  : "text-[#E2E8F0]/60 hover:text-[#A5F3FC] border border-transparent"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
              <span>LISTENING</span>
            </button>

            <button
              onClick={() => setVoiceState("processing")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all flex items-center space-x-1 text-[10px] sm:text-xs ${
                voiceState === "processing"
                  ? "bg-[#7B2CBF]/35 text-[#D8B4FE] font-bold border border-[#7B2CBF]/60 shadow-[0_0_15px_rgba(123,44,191,0.4)]"
                  : "text-[#E2E8F0]/60 hover:text-[#A5F3FC] border border-transparent"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B2CBF] animate-ping" />
              <span>PROCESSING</span>
            </button>

            <button
              onClick={() => handleSendQuery("Synthesizing live vocal telemetry on demand.")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all flex items-center space-x-1 text-[10px] sm:text-xs ${
                voiceState === "speaking"
                  ? "bg-[#00E5FF]/25 text-[#00E5FF] font-bold border border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                  : "text-[#E2E8F0]/60 hover:text-[#A5F3FC] border border-transparent"
              }`}
            >
              <Activity className="w-3 h-3 text-[#00E5FF]" />
              <span>SPEAKING</span>
            </button>
          </div>

          {/* Right Clock & Prominent Close Button */}
          <div className="flex items-center space-x-2 sm:space-x-3 font-mono text-xs">
            <span className="hidden md:inline-block text-[11px] text-[#A5F3FC]/60 tracking-wider tabular-nums">
              {currentTime}
            </span>
            <button
              onClick={() => {
                stop();
                onClose();
              }}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.5)] text-[#FCA5A5] hover:bg-[#EF4444]/30 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] font-mono text-xs font-bold cursor-pointer"
              aria-label="Exit Immersive Mode"
            >
              <X className="w-3.5 h-3.5" />
              <span>EXIT (ESC)</span>
            </button>
          </div>
        </header>

        {/* Center: Scaled Responsive Neural Reactor Core */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-[220px] sm:min-h-[340px] my-2 max-w-[420px] mx-auto shrink-0">
          <HolographicSphere state={voiceState} size={380} audioAnalyser={analyserRef.current} />
        </div>

        {/* Bottom Dialogue Box, Quick Prompts & Interactive Input */}
        <footer className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-2.5 z-30 pb-6 sm:pb-2 shrink-0">
          {/* Quick Vocal Prompts */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-[11px]">
            <button
              onClick={() => handleSendQuery("Running agent diagnostic scan. All nine nodes operational.")}
              className="px-2.5 py-1 rounded-lg bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.2)] text-[#A5F3FC] hover:bg-[rgba(0,229,255,0.18)] hover:border-[#00E5FF]/50 transition-all cursor-pointer active:scale-95"
            >
              Diagnostic Scan
            </button>
            <button
              onClick={() => handleSendQuery("Zero trust security perimeter verified. Twelve credentials active.")}
              className="px-2.5 py-1 rounded-lg bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.2)] text-[#A5F3FC] hover:bg-[rgba(0,229,255,0.18)] hover:border-[#00E5FF]/50 transition-all cursor-pointer active:scale-95"
            >
              Security Check
            </button>
            <button
              onClick={() => handleSendQuery("Buenas tardes. Todos los sistemas neuronales están sincronizados.")}
              className="px-2.5 py-1 rounded-lg bg-[rgba(123,44,191,0.1)] border border-[rgba(123,44,191,0.3)] text-[#D8B4FE] hover:bg-[rgba(123,44,191,0.25)] hover:border-[#7B2CBF] transition-all cursor-pointer active:scale-95"
            >
              Saludo Español
            </button>
          </div>

          {/* Dialogue Display Box */}
          <div className="w-full p-3 sm:p-4 rounded-2xl bg-[#02040a]/95 border border-[rgba(0,229,255,0.3)] shadow-[0_0_35px_rgba(0,229,255,0.2)] text-center font-mono">
            <div className="flex justify-center space-x-1.5 mb-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${voiceState === "speaking" ? "bg-[#00E5FF] animate-ping" : "bg-[#00E5FF]"}`} />
              <span className={`w-1.5 h-1.5 rounded-full ${voiceState === "processing" ? "bg-[#7B2CBF] animate-ping" : "bg-[#7B2CBF]"}`} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-[#E2E8F0] tracking-wide font-medium leading-relaxed">
              {isPlaying || isProcessing
                ? activeDialogue
                : voiceState === "speaking"
                ? activeDialogue
                : voiceState === "processing"
                ? "Synthesizing multi-agent parameters and indexing neural memory..."
                : activeDialogue || "Listening for vocal telemetry or system command..."}
            </p>
          </div>

          {/* Interactive Speech Query Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="w-full flex items-center space-x-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Type phrase or command to transmit..."
                className="w-full bg-[rgba(2,4,10,0.92)] border border-[rgba(0,229,255,0.3)] rounded-xl px-3.5 py-2 sm:py-2.5 text-xs font-mono text-[#E2E8F0] placeholder-[#A5F3FC]/40 focus:outline-none focus:border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.1)]"
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex items-center space-x-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[rgba(0,229,255,0.15)] border border-[#00E5FF]/60 text-[#00E5FF] text-xs font-mono font-bold hover:bg-[#00E5FF]/30 transition-all shadow-[0_0_15px_rgba(0,229,255,0.25)] cursor-pointer disabled:opacity-50 shrink-0 active:scale-95"
            >
              {isProcessing ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isPlaying ? (
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>{isProcessing ? "SYNTH..." : isPlaying ? "STOP" : "TRANSMIT"}</span>
            </button>
          </form>
        </footer>
      </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
