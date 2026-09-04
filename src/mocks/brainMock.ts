import { BrainTelemetry, VoiceStateConfig } from "@/types/brain";

export const initialBrainTelemetry: BrainTelemetry = {
  state: "listening",
  neuralLoad: 38.4,
  synapticRate: 4820,
  activeNodes: 9,
  coreTemperature: 42.1,
  waveformFrequency: 142.6,
  energyOutput: 890.4,
  statusMessage: "NEURAL CORE STANDBY — MONITORING SYSTEM BUS",
};

export const voiceStateConfigs: Record<string, VoiceStateConfig> = {
  listening: {
    state: "listening",
    label: "LISTENING",
    description: "Real-time acoustic detection & bus monitoring",
    ringSpeedMultiplier: 0.5,
    waveAmplitude: 0.6,
    particleSpeed: 0.7,
    pulseIntensity: 1.0,
    primaryGlow: "#00E5FF",
    accentGlow: "#7B2CBF",
  },
  processing: {
    state: "processing",
    label: "PROCESSING",
    description: "High-frequency neural synthesis & reasoning cycle",
    ringSpeedMultiplier: 2.8,
    waveAmplitude: 1.8,
    particleSpeed: 2.4,
    pulseIntensity: 1.8,
    primaryGlow: "#00E5FF",
    accentGlow: "#7B2CBF",
  },
  speaking: {
    state: "speaking",
    label: "SPEAKING",
    description: "Active vocal synthesis & harmonic wave output",
    ringSpeedMultiplier: 1.4,
    waveAmplitude: 2.2,
    particleSpeed: 1.5,
    pulseIntensity: 2.2,
    primaryGlow: "#00E5FF",
    accentGlow: "#7B2CBF",
  },
  idle: {
    state: "idle",
    label: "STANDBY",
    description: "Low-power idle state with ambient orbit",
    ringSpeedMultiplier: 0.3,
    waveAmplitude: 0.3,
    particleSpeed: 0.4,
    pulseIntensity: 0.6,
    primaryGlow: "#00E5FF",
    accentGlow: "#7B2CBF",
  },
};
