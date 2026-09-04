import React from "react";
import { AgentActivityLog } from "@/types/widgets";
import { GlassCard } from "@/components/ui/GlassCard";
import { Activity, ArrowRight } from "lucide-react";

interface AgentActivityWidgetProps {
  logs: AgentActivityLog[];
  className?: string;
}

export const AgentActivityWidget: React.FC<AgentActivityWidgetProps> = ({
  logs,
  className,
}) => {
  return (
    <GlassCard
      headerTitle="AGENT ACTIVITY BUS"
      headerTag="EVENT STREAM"
      className={className}
    >
      <div className="space-y-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-center justify-between p-2 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.06)] font-mono text-xs"
          >
            <div className="flex items-center space-x-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] shrink-0" />
              <span className="font-semibold text-[#00E5FF] truncate">{log.agentName}:</span>
              <span className="text-[#E2E8F0]/80 truncate">{log.action}</span>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-[#A5F3FC]/50 shrink-0">
              <span className="hidden sm:inline-block text-[#7B2CBF]">{log.target}</span>
              <ArrowRight className="w-2.5 h-2.5" />
              <span>{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
