export type JarvisVoiceState = "listening" | "processing" | "speaking" | "idle";

export interface BrainTelemetry {
  state: JarvisVoiceState;
  neuralLoad: number; // percentage 0-100
  synapticRate: number; // Hz / ops
  activeNodes: number;
  coreTemperature: number; // Celsius
  waveformFrequency: number;
  energyOutput: number; // MW / arbitrary index
  statusMessage: string;
}

export interface VoiceStateConfig {
  state: JarvisVoiceState;
  label: string;
  description: string;
  ringSpeedMultiplier: number;
  waveAmplitude: number;
  particleSpeed: number;
  pulseIntensity: number;
  primaryGlow: string;
  accentGlow: string;
}
