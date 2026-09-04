"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { JarvisVoiceState } from "@/types/brain";

export interface VoicePreset {
  id: string;
  name: string;
  role: string;
  accent: string;
}

export const AVAILABLE_VOICES: VoicePreset[] = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Jarvis Prime (English Male)", role: "Human Male Voice", accent: "English / Natural Male" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "FRIDAY Neural (English Female)", role: "Human Female Voice", accent: "English / Natural Female" },
  { id: "es-female-voice-01", name: "Elena (Spanish Voice / España)", role: "Habla Hispana / Español", accent: "Spanish / Natural" },
];

export function useVoiceEngine() {
  const [voiceState, setVoiceState] = useState<JarvisVoiceState>("listening");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedVoiceId, setSelectedVoiceId] = useState(AVAILABLE_VOICES[0].id);
  const [volume, setVolume] = useState(85);
  const [speechRate, setSpeechRate] = useState(0.85); // Pacing rate (0.6x - 1.2x, default 0.85x)
  const [isMuted, setIsMuted] = useState(false);
  const [currentEngine, setCurrentEngine] = useState<"elevenlabs" | "synthetic">("synthetic");
  const [loadedVoices, setLoadedVoices] = useState<SpeechSynthesisVoice[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const speechRateRef = useRef(speechRate);
  const selectedVoiceIdRef = useRef(selectedVoiceId);
  const isMutedRef = useRef(isMuted);
  const volumeRef = useRef(volume);

  // Synchronize refs with state to prevent stale closure issues
  useEffect(() => {
    speechRateRef.current = speechRate;
  }, [speechRate]);

  useEffect(() => {
    selectedVoiceIdRef.current = selectedVoiceId;
  }, [selectedVoiceId]);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  // Cache browser voices reliably across browsers
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const updateVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        setLoadedVoices(voices);
      }
    };

    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Initialize or get AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;

      const gain = ctx.createGain();
      gain.gain.value = isMutedRef.current ? 0 : volumeRef.current / 100;

      gain.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      gainNodeRef.current = gain;
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    return { ctx: audioContextRef.current, analyser: analyserRef.current, gain: gainNodeRef.current };
  }, []);

  // Update volume in real-time
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0 : volume / 100,
        audioContextRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  // Stop any playing audio
  const stop = useCallback(() => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch {}
      currentSourceRef.current = null;
    }
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsProcessing(false);
    setVoiceState("listening");
  }, []);

  // Synthesize and speak text
  const speak = useCallback(
    async (text: string, voiceId?: string, overrideRate?: number) => {
      stop();
      setIsProcessing(true);
      setVoiceState("processing");

      const voice = voiceId || selectedVoiceIdRef.current;
      const targetRate = typeof overrideRate === "number" ? overrideRate : speechRateRef.current;

      try {
        const res = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, voiceId: voice }),
        });

        const contentType = res.headers.get("Content-Type") || "";

        if (contentType.includes("audio/mpeg") || contentType.includes("audio/mp3")) {
          // 1. ElevenLabs Live Audio Stream returned
          setCurrentEngine("elevenlabs");
          const arrayBuffer = await res.arrayBuffer();
          const { ctx, gain } = getAudioContext();

          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;

          if (gain) {
            source.connect(gain);
          }

          currentSourceRef.current = source;
          setIsProcessing(false);
          setIsPlaying(true);
          setVoiceState("speaking");

          source.onended = () => {
            setIsPlaying(false);
            setVoiceState("listening");
            currentSourceRef.current = null;
          };

          source.start(0);
        } else {
          // 2. Synthetic Browser / Web Speech Fallback Mode
          setCurrentEngine("synthetic");
          setIsProcessing(false);
          setIsPlaying(true);
          setVoiceState("speaking");

          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            // Fetch live voice list
            const currentVoices = loadedVoices.length > 0 ? loadedVoices : window.speechSynthesis.getVoices();

            // Set speech rate directly from live targetRate
            utterance.rate = targetRate;

            if (voice === "es-female-voice-01") {
              // Spanish Natural Voice Profile
              utterance.lang = "es-ES";
              utterance.pitch = 1.0;
              const spanishVoice =
                currentVoices.find((v) => v.lang.toLowerCase().startsWith("es-es")) ||
                currentVoices.find((v) => v.lang.toLowerCase().startsWith("es")) ||
                currentVoices.find((v) => v.name.toLowerCase().includes("spanish") || v.name.toLowerCase().includes("helena") || v.name.toLowerCase().includes("sabina") || v.name.toLowerCase().includes("monica") || v.name.toLowerCase().includes("laura"));
              if (spanishVoice) utterance.voice = spanishVoice;
            } else if (voice === "EXAVITQu4vr4xnSDxMaL") {
              // English Female Voice Profile
              utterance.lang = "en-US";
              utterance.pitch = 1.12;
              const femaleVoice =
                currentVoices.find((v) => (v.lang.toLowerCase().startsWith("en") && (v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("jenny") || v.name.toLowerCase().includes("karen") || v.name.toLowerCase().includes("victoria") || v.name.toLowerCase().includes("aria")))) ||
                currentVoices.find((v) => v.lang.toLowerCase().startsWith("en-us")) ||
                currentVoices.find((v) => v.lang.toLowerCase().startsWith("en"));
              if (femaleVoice) utterance.voice = femaleVoice;
            } else {
              // Jarvis Prime - English Male Voice Profile
              utterance.lang = "en-US";
              utterance.pitch = 0.95;
              const maleVoice =
                currentVoices.find((v) => (v.lang.toLowerCase().startsWith("en") && (v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("george") || v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("mark") || v.name.toLowerCase().includes("guy") || v.name.toLowerCase().includes("daniel")))) ||
                currentVoices.find((v) => v.lang.toLowerCase().startsWith("en-gb")) ||
                currentVoices.find((v) => v.lang.toLowerCase().startsWith("en"));
              if (maleVoice) utterance.voice = maleVoice;
            }

            utterance.volume = isMutedRef.current ? 0 : volumeRef.current / 100;

            utterance.onend = () => {
              setIsPlaying(false);
              setVoiceState("listening");
            };

            utterance.onerror = () => {
              setIsPlaying(false);
              setVoiceState("listening");
            };

            window.speechSynthesis.speak(utterance);
          } else {
            setTimeout(() => {
              setIsPlaying(false);
              setVoiceState("listening");
            }, 3000);
          }
        }
      } catch (error) {
        console.warn("[Voice Synthesis Fallback Triggered]:", error);
        setIsProcessing(false);
        setIsPlaying(false);
        setVoiceState("listening");
      }
    },
    [getAudioContext, loadedVoices, stop]
  );

  return {
    voiceState,
    setVoiceState,
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
    analyserRef,
    availableVoices: AVAILABLE_VOICES,
  };
}
