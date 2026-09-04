import React from "react";
import { SystemHealthData } from "@/types/system";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatMetric } from "@/components/ui/StatMetric";
import { Server, Activity, ShieldCheck, Clock } from "lucide-react";

interface SystemHealthGridProps {
  healthData: SystemHealthData;
  className?: string;
}

export const SystemHealthGrid: React.FC<SystemHealthGridProps> = ({
  healthData,
  className,
}) => {
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}d ${hours}h`;
  };

  return (
    <GlassCard
      headerTitle="SYSTEM HEALTH & CORE TELEMETRY"
      headerTag="DIAGNOSTIC NOMINAL"
      className={className}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatMetric
          label={healthData.cpuUsage.name}
          value={healthData.cpuUsage.value}
          unit={healthData.cpuUsage.unit}
          subtext={healthData.cpuUsage.details}
          progressPercent={healthData.cpuUsage.value}
          trend={healthData.cpuUsage.trend}
          variant="cyan"
        />

        <StatMetric
          label={healthData.memoryUsage.name}
          value={healthData.memoryUsage.value}
          unit={healthData.memoryUsage.unit}
          subtext={healthData.memoryUsage.details}
          progressPercent={healthData.memoryUsage.value}
          trend={healthData.memoryUsage.trend}
          variant="violet"
        />

        <StatMetric
          label={healthData.gpuMemory.name}
          value={healthData.gpuMemory.value}
          unit={healthData.gpuMemory.unit}
          subtext={healthData.gpuMemory.details}
          progressPercent={healthData.gpuMemory.value}
          trend={healthData.gpuMemory.trend}
          variant="cyan"
        />

        <StatMetric
          label={healthData.networkLatency.name}
          value={healthData.networkLatency.value}
          unit={healthData.networkLatency.unit}
          subtext={healthData.networkLatency.details}
          progressPercent={Math.min(100, (healthData.networkLatency.value / 50) * 100)}
          trend={healthData.networkLatency.trend}
          variant="violet"
        />
      </div>

      {/* Secondary Status Bar */}
      <div className="mt-4 pt-3 border-t border-[rgba(0,229,255,0.08)] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        <div className="flex items-center space-x-2 text-[#A5F3FC]/70">
          <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>UPTIME: <strong className="text-[#E2E8F0]">{formatUptime(healthData.uptimeSeconds)}</strong></span>
        </div>
        <div className="flex items-center space-x-2 text-[#A5F3FC]/70">
          <ShieldCheck className="w-3.5 h-3.5 text-[#7B2CBF]" />
          <span>QUANTUM: <strong className="text-[#E2E8F0]">{healthData.quantumEfficiency}%</strong></span>
        </div>
        <div className="flex items-center space-x-2 text-[#A5F3FC]/70">
          <Server className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>CONTAINERS: <strong className="text-[#E2E8F0]">{healthData.activeContainers} ONLINE</strong></span>
        </div>
        <div className="flex items-center space-x-2 text-[#A5F3FC]/70">
          <Activity className="w-3.5 h-3.5 text-[#A5F3FC]" />
          <span>ALERTS: <strong className="text-[#E2E8F0]">{healthData.unresolvedAlerts} ACTIVE</strong></span>
        </div>
      </div>
    </GlassCard>
  );
};
