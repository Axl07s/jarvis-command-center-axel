export interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "nominal" | "warning" | "critical";
  trend: number[]; // Sparkline history
  details?: string;
}

export interface SystemHealthData {
  cpuUsage: SystemMetric;
  memoryUsage: SystemMetric;
  gpuMemory: SystemMetric;
  networkLatency: SystemMetric;
  uptimeSeconds: number;
  quantumEfficiency: number;
  activeContainers: number;
  unresolvedAlerts: number;
  lastDiagnosticTimestamp: string;
}
