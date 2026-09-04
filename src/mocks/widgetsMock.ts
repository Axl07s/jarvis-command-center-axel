import {
  DockerContainer,
  N8nWorkflow,
  ObsidianMemoryNode,
  ShopifyPerformanceData,
  AgentActivityLog,
} from "@/types/widgets";

export const dockerContainersMock: DockerContainer[] = [
  {
    id: "cont-01",
    name: "jarvis-postgres-db",
    image: "postgres:16-alpine",
    status: "running",
    cpuPercent: 1.8,
    memoryMb: 245,
    uptime: "14d 8h",
    port: "5432:5432",
  },
  {
    id: "cont-02",
    name: "jarvis-redis-cache",
    image: "redis:7.2-alpine",
    status: "running",
    cpuPercent: 0.4,
    memoryMb: 82,
    uptime: "14d 8h",
    port: "6379:6379",
  },
  {
    id: "cont-03",
    name: "jarvis-n8n-worker",
    image: "n8nio/n8n:latest",
    status: "running",
    cpuPercent: 3.2,
    memoryMb: 410,
    uptime: "6d 12h",
    port: "5678:5678",
  },
  {
    id: "cont-04",
    name: "jarvis-vector-chroma",
    image: "chromadb/chroma:latest",
    status: "running",
    cpuPercent: 2.1,
    memoryMb: 520,
    uptime: "14d 8h",
    port: "8000:8000",
  },
];

export const n8nWorkflowsMock: N8nWorkflow[] = [
  {
    id: "wf-101",
    name: "Hourly Telemetry & Cost Aggregator",
    status: "active",
    totalRuns: 2840,
    successRate: 99.8,
    lastRunTimestamp: "12m ago",
    triggerType: "cron",
  },
  {
    id: "wf-102",
    name: "Shopify Order Webhook to Obsidian",
    status: "active",
    totalRuns: 1420,
    successRate: 100.0,
    lastRunTimestamp: "4m ago",
    triggerType: "webhook",
  },
  {
    id: "wf-103",
    name: "Security Key Expiration Alert",
    status: "active",
    totalRuns: 312,
    successRate: 100.0,
    lastRunTimestamp: "2h ago",
    triggerType: "cron",
  },
];

export const obsidianMemoryMock: ObsidianMemoryNode[] = [
  {
    id: "obs-01",
    title: "Jarvis Neural Architecture Specs v2",
    vault: "Core_System",
    linkedConcepts: 18,
    lastUpdated: "2026-08-21 14:10",
    category: "architecture",
    summary: "Complete blueprint for 9-agent decoupled mesh and ElevenLabs voice stream bus.",
  },
  {
    id: "obs-02",
    title: "Q3 Operational Financial Guardrails",
    vault: "Finance_Ops",
    linkedConcepts: 9,
    lastUpdated: "2026-08-20 18:30",
    category: "decision",
    summary: "LLM token rate limiting, cloud compute tiers, and contingency budgets.",
  },
  {
    id: "obs-03",
    title: "Market Intelligence & Research Findings",
    vault: "Research_AI",
    linkedConcepts: 34,
    lastUpdated: "2026-08-21 11:45",
    category: "knowledge",
    summary: "Vector-indexed papers and competitive analysis across autonomous agent frameworks.",
  },
];

export const shopifyPerformanceMock: ShopifyPerformanceData = {
  dailyRevenue: 4850.0,
  orderCount: 42,
  conversionRate: 3.84,
  cartAbandonmentRate: 64.2,
  activeSessions: 184,
  syncStatus: "synced",
};

export const agentActivityLogsMock: AgentActivityLog[] = [
  {
    id: "log-1",
    agentName: "Chief Brain Core",
    action: "Orchestrated global telemetry synchronization",
    target: "System Bus",
    timestamp: "15:32:01",
    status: "success",
  },
  {
    id: "log-2",
    agentName: "Voice Synthesis Engine",
    action: "Rendered audio buffer for vocal confirmation",
    target: "ElevenLabs Stream",
    timestamp: "15:31:40",
    status: "success",
  },
  {
    id: "log-3",
    agentName: "Approval Sentinel",
    action: "Queued privileged operation approval request",
    target: "Appr #8821",
    timestamp: "15:20:11",
    status: "warning",
  },
  {
    id: "log-4",
    agentName: "Docker Runtime Monitor",
    action: "Completed health check cycle on 4 containers",
    target: "Docker Daemon",
    timestamp: "15:15:00",
    status: "success",
  },
];
