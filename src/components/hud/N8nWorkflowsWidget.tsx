import React from "react";
import { N8nWorkflow } from "@/types/widgets";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { GitFork, CheckCircle2, Play } from "lucide-react";

interface N8nWorkflowsWidgetProps {
  workflows: N8nWorkflow[];
  className?: string;
}

export const N8nWorkflowsWidget: React.FC<N8nWorkflowsWidgetProps> = ({
  workflows,
  className,
}) => {
  return (
    <GlassCard
      headerTitle="n8n WORKFLOW AUTOMATIONS"
      headerTag="ACTIVE DISPATCH"
      className={className}
    >
      <div className="space-y-2.5">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.2)] transition-colors font-mono text-xs"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <GitFork className="w-4 h-4 text-[#7B2CBF] shrink-0" />
              <div className="min-w-0">
                <div className="font-semibold text-[#E2E8F0] truncate">{wf.name}</div>
                <div className="text-[10px] text-[#A5F3FC]/50 flex items-center space-x-2">
                  <span>Trigger: {wf.triggerType}</span>
                  <span>·</span>
                  <span>Last run: {wf.lastRunTimestamp}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0">
              <div className="hidden sm:flex flex-col items-end text-[10px] text-[#A5F3FC]/70">
                <span className="flex items-center space-x-1 text-[#00E5FF]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{wf.successRate}% Success</span>
                </span>
                <span>{wf.totalRuns.toLocaleString()} Runs</span>
              </div>
              <GlowBadge
                label={wf.status}
                variant={wf.status === "active" ? "cyan" : "standby"}
                size="sm"
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
