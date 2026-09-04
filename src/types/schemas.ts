/**
 * DECOUPLED DATA CONTRACTS & JSON SCHEMAS
 * 
 * Standardized TypeScript contracts for external backend integration
 * (Supabase PostgreSQL, n8n webhook payloads, Obsidian vaults, and ElevenLabs).
 */

export interface DecoupledAgentNode {
  id: string;
  name: string;
  role: string;
  department: "core" | "operations" | "finance" | "intelligence" | "security";
  model: string;
  status: "active" | "idle" | "busy" | "offline";
  pingMs: number;
  memoryUsageMb: number;
  tasksCompleted: number;
  uptimePercent: number;
  lastActiveIso: string;
}

export interface DecoupledApprovalRequest {
  id: string;
  title: string;
  agentId: string;
  agentName: string;
  actionType: "EXECUTE_TRANSACTION" | "MODIFY_CREDENTIAL" | "DATABASE_MIGRATION" | "DELETE_RESOURCE" | "PUBLISH_CAMPAIGN";
  riskLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  details: string;
  payload: Record<string, unknown>;
  requestedAtIso: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "ESCALATED";
  resolvedAtIso?: string;
  resolvedBy?: string;
}

export interface DecoupledFinanceSummary {
  currentDailySpendUsd: number;
  monthlyBudgetUsd: number;
  projectedMonthlySpendUsd: number;
  tokensConsumedToday: number;
  burnRatePerMinuteUsd: number;
  providers: {
    name: string;
    model: string;
    spendUsd: number;
    tokens: number;
    percentage: number;
  }[];
  shopifyTelemetry: {
    grossRevenueTodayUsd: number;
    ordersCountToday: number;
    conversionRatePercent: number;
    inventoryAlertsCount: number;
  };
}

export interface DecoupledKnowledgeVault {
  id: string;
  name: string;
  vaultType: "obsidian" | "supabase_vector" | "local_fs";
  totalNotes: number;
  lastSyncIso: string;
  syncStatus: "synced" | "syncing" | "error";
  topics: string[];
  recentFiles: {
    id: string;
    path: string;
    title: string;
    wordCount: number;
    lastModifiedIso: string;
  }[];
}

export interface DecoupledSecurityIncident {
  id: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  sourceIp: string;
  eventType: string;
  status: "BLOCKED" | "MITIGATED" | "INVESTIGATING";
  timestampIso: string;
  details: string;
}

export interface DecoupledVoiceTelemetry {
  state: "listening" | "processing" | "speaking" | "idle";
  activeVoiceId: string;
  activeVoiceName: string;
  speechRate: number;
  volume: number;
  isMuted: boolean;
  engine: "elevenlabs" | "synthetic";
  lastSpokenPhrase?: string;
}
