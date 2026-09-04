export type AgentStatus = "active" | "standby" | "processing" | "syncing" | "offline";

export interface JarvisAgentNode {
  id: string;
  name: string;
  codename: string;
  role: string;
  category: "core" | "operations" | "intelligence" | "defense";
  status: AgentStatus;
  activityLevel: number; // 0-100%
  latencyMs: number;
  lastExecution: string;
  memoryUsageMb: number;
  tasksCompleted: number;
  description: string;
}

export interface AgentNetworkSummary {
  totalNodes: number;
  activeNodes: number;
  processingNodes: number;
  averageLatencyMs: number;
  globalThroughputTps: number;
}
