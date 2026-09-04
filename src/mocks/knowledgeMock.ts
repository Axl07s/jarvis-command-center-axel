export interface KnowledgeVault {
  id: string;
  name: string;
  noteCount: number;
  lastSynced: string;
  status: "synced" | "syncing" | "idle";
}

export interface KnowledgeNote {
  id: string;
  title: string;
  vault: string;
  summary: string;
  linkedConcepts: number;
  lastUpdated: string;
}

export const knowledgeVaultsMock: KnowledgeVault[] = [
  {
    id: "v-01",
    name: "Core_System_Specs",
    noteCount: 428,
    lastSynced: "2m ago",
    status: "synced",
  },
  {
    id: "v-02",
    name: "Finance_&_Operations",
    noteCount: 312,
    lastSynced: "15m ago",
    status: "synced",
  },
  {
    id: "v-03",
    name: "Research_AI_Papers",
    noteCount: 540,
    lastSynced: "1h ago",
    status: "synced",
  },
  {
    id: "v-04",
    name: "Security_Protocols",
    noteCount: 148,
    lastSynced: "4h ago",
    status: "synced",
  },
];

export const recentKnowledgeNotesMock: KnowledgeNote[] = [
  {
    id: "obs-01",
    title: "Jarvis Neural Architecture Specs v2",
    vault: "Core_System",
    linkedConcepts: 18,
    lastUpdated: "2026-08-26 14:10",
    summary: "Complete blueprint for 9-agent decoupled mesh, master template configuration, and ElevenLabs voice stream bus.",
  },
  {
    id: "obs-02",
    title: "Q3 Operational Financial Guardrails",
    vault: "Finance_Ops",
    linkedConcepts: 9,
    lastUpdated: "2026-08-26 18:30",
    summary: "LLM token rate limiting, cloud compute tiers, and contingency budgets.",
  },
  {
    id: "obs-03",
    title: "Autonomous Multi-Agent Consensus Framework",
    vault: "Research_AI",
    linkedConcepts: 34,
    lastUpdated: "2026-08-26 11:45",
    summary: "Vector-indexed papers and competitive analysis across autonomous agent frameworks and state machines.",
  },
  {
    id: "obs-04",
    title: "Zero-Trust Security Perimeter & mTLS Guidelines",
    vault: "Security_Protocols",
    linkedConcepts: 12,
    lastUpdated: "2026-08-25 09:15",
    summary: "Automated rotation policies for 12 server-side API credentials and hardware MFA enforcement.",
  },
];
