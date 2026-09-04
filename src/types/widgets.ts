export interface DockerContainer {
  id: string;
  name: string;
  image: string;
  status: "running" | "restarting" | "stopped";
  cpuPercent: number;
  memoryMb: number;
  uptime: string;
  port: string;
}

export interface N8nWorkflow {
  id: string;
  name: string;
  status: "active" | "inactive" | "error";
  totalRuns: number;
  successRate: number; // percentage
  lastRunTimestamp: string;
  triggerType: "webhook" | "cron" | "event";
}

export interface ObsidianMemoryNode {
  id: string;
  title: string;
  vault: string;
  linkedConcepts: number;
  lastUpdated: string;
  category: "knowledge" | "decision" | "architecture" | "archive";
  summary: string;
}

export interface ShopifyPerformanceData {
  dailyRevenue: number;
  orderCount: number;
  conversionRate: number;
  cartAbandonmentRate: number;
  activeSessions: number;
  syncStatus: "synced" | "syncing" | "error";
}

export interface AgentActivityLog {
  id: string;
  agentName: string;
  action: string;
  target: string;
  timestamp: string;
  status: "success" | "warning" | "in_progress";
}
