/**
 * JARVIS COMMAND CENTER — MASTER TEMPLATE CONFIGURATION
 * 
 * Central configuration file for branding, module activation, agent roster,
 * visual theme, voice synthesis settings, and external integration contracts.
 * Modify this single file to rebrand or deploy new command center instances.
 */

export interface JarvisAgentConfig {
  id: string;
  name: string;
  role: string;
  department: "core" | "operations" | "finance" | "intelligence" | "security";
  model: string;
  status: "active" | "idle" | "busy" | "offline";
  pingMs: number;
}

export interface JarvisModuleConfig {
  id: string;
  name: string;
  route: string;
  enabled: boolean;
  badge?: string;
  description: string;
}

export interface JarvisMasterConfig {
  system: {
    name: string;
    version: string;
    clusterId: string;
    organization: string;
    classification: string;
    tagline: string;
  };
  theme: {
    primaryColor: string; // Electric Cyan
    secondaryColor: string; // Neon Violet
    accentCyanGlow: string;
    backgroundColor: string; // Deep Space Navy
    surfaceColor: string;
    statusSuccess: string;
    statusWarning: string;
    statusDanger: string;
  };
  modules: {
    chiefBrain: JarvisModuleConfig;
    agentNetwork: JarvisModuleConfig;
    approvals: JarvisModuleConfig;
    finance: JarvisModuleConfig;
    knowledge: JarvisModuleConfig;
    security: JarvisModuleConfig;
    voice: JarvisModuleConfig;
  };
  agents: JarvisAgentConfig[];
  voice: {
    defaultProvider: "elevenlabs" | "synthetic";
    defaultVoiceId: string;
    defaultSpeechRate: number;
    availableVoices: {
      id: string;
      name: string;
      role: string;
      accent: string;
      lang: string;
    }[];
  };
  integrations: {
    supabase: {
      enabled: boolean;
      endpointConfigKey: string;
      syncIntervalSeconds: number;
    };
    n8n: {
      enabled: boolean;
      webhookUrlConfigKey: string;
      activeWorkflows: number;
    };
    obsidian: {
      enabled: boolean;
      vaultSyncPath: string;
      totalIndexedNotes: number;
    };
    elevenlabs: {
      enabled: boolean;
      modelId: string;
      streamingLatencyOptimization: number;
    };
  };
}

export const jarvisConfig: JarvisMasterConfig = {
  system: {
    name: "JARVIS COMMAND CENTER",
    version: "2.4.0-PROD",
    clusterId: "JARVIS-ALPHA",
    organization: "LO PERSONAL ECOSYSTEM",
    classification: "ZERO-TRUST SECURE",
    tagline: "Autonomous Agent Orchestration & Real-Time Intelligence HUD",
  },
  theme: {
    primaryColor: "#00E5FF", // Electric Cyan
    secondaryColor: "#7B2CBF", // Neon Violet
    accentCyanGlow: "rgba(0, 229, 255, 0.4)",
    backgroundColor: "#02040a", // Deep Navy
    surfaceColor: "rgba(2, 4, 10, 0.85)",
    statusSuccess: "#10B981",
    statusWarning: "#F59E0B",
    statusDanger: "#EF4444",
  },
  modules: {
    chiefBrain: {
      id: "chief-brain",
      name: "Chief Brain & Health",
      route: "/",
      enabled: true,
      badge: "CORE",
      description: "Dominant 5-orbit central reactor, system telemetry, and voice synthesis portal.",
    },
    agentNetwork: {
      id: "agent-network",
      name: "Agent Network",
      route: "/agent-network",
      enabled: true,
      badge: "9 NODES",
      description: "Autonomous mesh grid monitoring 9 specialized intelligent agent subsystems.",
    },
    approvals: {
      id: "approvals",
      name: "Approval Queue",
      route: "/approvals",
      enabled: true,
      badge: "PENDING",
      description: "Human-in-the-loop security authorization queue for high-impact operations.",
    },
    finance: {
      id: "finance",
      name: "Finance & Operations",
      route: "/finance",
      enabled: true,
      description: "Real-time token burn rates, API expense forecasting, and e-commerce telemetry.",
    },
    knowledge: {
      id: "knowledge",
      name: "Knowledge & Research",
      route: "/knowledge",
      enabled: true,
      description: "Multi-vault vector index, Obsidian bi-directional sync, and document search.",
    },
    security: {
      id: "security",
      name: "Security & Credentials",
      route: "/security",
      enabled: true,
      badge: "SECURE",
      description: "Zero-trust posture matrix, API key rotation, firewall telemetry, and audit logs.",
    },
    voice: {
      id: "voice",
      name: "Voice Status & Synth",
      route: "/voice",
      enabled: true,
      badge: "SYNTH",
      description: "Interactive multi-voice console, speech pacing controls, and Web Audio spectrum analyzer.",
    },
  },
  agents: [
    { id: "agent-01", name: "Chief Brain (Jarvis Core)", role: "Master Coordinator & Decision Engine", department: "core", model: "claude-3-7-sonnet", status: "active", pingMs: 12 },
    { id: "agent-02", name: "Scout Prime", role: "Real-time Market & Lead Scraper", department: "intelligence", model: "gpt-4o", status: "active", pingMs: 24 },
    { id: "agent-03", name: "Ledger Sentinel", role: "Financial Ledger & Token Cost Auditor", department: "finance", model: "deepseek-r1", status: "active", pingMs: 18 },
    { id: "agent-04", name: "Archivist Node", role: "Obsidian Vault & Vector Index Sync", department: "intelligence", model: "text-embedding-3-large", status: "active", pingMs: 31 },
    { id: "agent-05", name: "Gatekeeper Guardian", role: "Human-in-the-loop Approval Evaluator", department: "security", model: "claude-3-5-sonnet", status: "active", pingMs: 15 },
    { id: "agent-06", name: "Pipeline Orchestrator", role: "n8n Webhook & Task Scheduler", department: "operations", model: "gemini-2.5-pro", status: "active", pingMs: 28 },
    { id: "agent-07", name: "Shield Zero", role: "Credential Vault & Threat Detector", department: "security", model: "mistral-large", status: "active", pingMs: 9 },
    { id: "agent-08", name: "Commerce Bridge", role: "Shopify Store Telemetry & Order Bus", department: "operations", model: "gpt-4o-mini", status: "active", pingMs: 42 },
    { id: "agent-09", name: "Neural Voice Dispatch", role: "ElevenLabs Stream & Multilingual TTS", department: "core", model: "eleven_multilingual_v2", status: "active", pingMs: 19 },
  ],
  voice: {
    defaultProvider: "synthetic",
    defaultVoiceId: "21m00Tcm4TlvDq8ikWAM",
    defaultSpeechRate: 0.85,
    availableVoices: [
      { id: "21m00Tcm4TlvDq8ikWAM", name: "Jarvis Prime (English Male)", role: "Human Male Voice", accent: "English / British & US", lang: "en-US" },
      { id: "EXAVITQu4vr4xnSDxMaL", name: "FRIDAY Neural (English Female)", role: "Human Female Voice", accent: "English / American", lang: "en-US" },
      { id: "es-female-voice-01", name: "Elena (Spanish Voice / España)", role: "Habla Hispana / Español", accent: "Spanish / Natural", lang: "es-ES" },
    ],
  },
  integrations: {
    supabase: {
      enabled: true,
      endpointConfigKey: "NEXT_PUBLIC_SUPABASE_URL",
      syncIntervalSeconds: 15,
    },
    n8n: {
      enabled: true,
      webhookUrlConfigKey: "N8N_WEBHOOK_URL",
      activeWorkflows: 14,
    },
    obsidian: {
      enabled: true,
      vaultSyncPath: "/vaults/jarvis-master",
      totalIndexedNotes: 1420,
    },
    elevenlabs: {
      enabled: true,
      modelId: "eleven_multilingual_v2",
      streamingLatencyOptimization: 3,
    },
  },
};
