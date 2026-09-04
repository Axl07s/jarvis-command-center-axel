import { VoiceEngineConfig, VoiceSampleItem } from "@/types/voice";

export const defaultVoiceConfig: VoiceEngineConfig = {
  provider: "mock",
  voiceId: "21m00Tcm4TlvDq8ikWAM",
  voiceName: "Jarvis Prime (English Male)",
  model: "eleven_multilingual_v2",
  stability: 0.75,
  similarityBoost: 0.85,
  isVoiceActive: true,
  volume: 85,
  isMuted: false,
};

export const sampleVoicePhrases: VoiceSampleItem[] = [
  {
    id: "sample-1",
    title: "System Initialization (English Male)",
    text: "Good afternoon, Commander. All nine agent subsystems are operational. Global backbone latency is twelve milliseconds. Ready for your command.",
    durationEstimateSeconds: 6.2,
  },
  {
    id: "sample-2",
    title: "Analytical Neural Telemetry (English Female)",
    text: "All neural telemetry channels and zero-trust security postures are synchronized. Operational parameters are within optimal thresholds.",
    durationEstimateSeconds: 5.8,
  },
  {
    id: "sample-3",
    title: "Protocolo de Control (Español / España)",
    text: "Buenas tardes, Comandante. Todos los sistemas neuronales de Jarvis están operativos y listos para ejecutar sus instrucciones.",
    durationEstimateSeconds: 6.0,
  },
  {
    id: "sample-4",
    title: "Lyrical Song Cadence Test (Calm Pacing)",
    text: "Ground Control to Major Tom. Take your protein pills and put your helmet on. Ten, nine, eight, seven, six, five, four, three, two, one. Liftoff.",
    durationEstimateSeconds: 8.5,
  },
];
