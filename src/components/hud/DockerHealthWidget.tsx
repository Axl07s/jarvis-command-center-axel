import React from "react";
import { DockerContainer } from "@/types/widgets";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { Server, Cpu, HardDrive } from "lucide-react";

interface DockerHealthWidgetProps {
  containers: DockerContainer[];
  className?: string;
}

export const DockerHealthWidget: React.FC<DockerHealthWidgetProps> = ({
  containers,
  className,
}) => {
  return (
    <GlassCard
      headerTitle="DOCKER RUNTIME HEALTH"
      headerTag={`${containers.length} CONTAINERS`}
      className={className}
    >
      <div className="space-y-2.5">
        {containers.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors font-mono text-xs"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <Server className="w-4 h-4 text-[#00E5FF] shrink-0" />
              <div className="min-w-0">
                <div className="font-semibold text-[#E2E8F0] truncate">{c.name}</div>
                <div className="text-[10px] text-[#A5F3FC]/50 truncate">{c.image} · {c.port}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="hidden sm:flex items-center space-x-3 text-[10px] text-[#A5F3FC]/70">
                <span className="flex items-center space-x-1">
                  <Cpu className="w-3 h-3 text-[#00E5FF]" />
                  <span>{c.cpuPercent}%</span>
                </span>
                <span className="flex items-center space-x-1">
                  <HardDrive className="w-3 h-3 text-[#7B2CBF]" />
                  <span>{c.memoryMb}MB</span>
                </span>
              </div>
              <GlowBadge
                label={c.status}
                variant={c.status === "running" ? "cyan" : "violet"}
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
