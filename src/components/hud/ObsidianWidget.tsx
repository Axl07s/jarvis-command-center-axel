import React from "react";
import { ObsidianMemoryNode } from "@/types/widgets";
import { GlassCard } from "@/components/ui/GlassCard";
import { BookOpen, Network, Clock } from "lucide-react";

interface ObsidianWidgetProps {
  nodes: ObsidianMemoryNode[];
  className?: string;
}

export const ObsidianWidget: React.FC<ObsidianWidgetProps> = ({
  nodes,
  className,
}) => {
  return (
    <GlassCard
      headerTitle="OBSIDIAN NEURAL MEMORY"
      headerTag="3 VAULTS INDEXED"
      className={className}
    >
      <div className="space-y-2.5">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="p-2.5 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.25)] transition-colors font-mono text-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[#00E5FF] font-semibold truncate">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{node.title}</span>
              </div>
              <span className="text-[10px] text-[#7B2CBF] px-1.5 py-0.5 rounded bg-[rgba(123,44,191,0.1)] border border-[rgba(123,44,191,0.2)] uppercase">
                {node.vault}
              </span>
            </div>

            <p className="text-[11px] text-[#A5F3FC]/60 mt-1 line-clamp-1">
              {node.summary}
            </p>

            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[rgba(0,229,255,0.06)] text-[10px] text-[#A5F3FC]/50">
              <span className="flex items-center space-x-1">
                <Network className="w-3 h-3 text-[#00E5FF]" />
                <span>{node.linkedConcepts} Connected Concepts</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{node.lastUpdated}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
