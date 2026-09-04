export interface VoiceEngineConfig {
  provider: "elevenlabs" | "mock";
  voiceId: string;
  voiceName: string;
  model: string;
  stability: number; // 0.0 - 1.0
  similarityBoost: number; // 0.0 - 1.0
  isVoiceActive: boolean;
  volume: number; // 0 - 100
  isMuted: boolean;
}

export interface VoiceSampleItem {
  id: string;
  title: string;
  text: string;
  durationEstimateSeconds: number;
}
