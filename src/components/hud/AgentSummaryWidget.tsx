"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Brain, ShoppingCart, Users, Megaphone, Sparkles, ArrowRight, Activity } from "lucide-react";

export const AgentSummaryWidget: React.FC = () => {
  const activeAgents = [
    { name: "Research Brain", icon: <Brain className="w-3.5 h-3.5 text-[#00E5FF]" />, status: "Active", load: "94%" },
    { name: "Store Operations", icon: <ShoppingCart className="w-3.5 h-3.5 text-[#00E5FF]" />, status: "Active", load: "88%" },
    { name: "CRM & Support", icon: <Users className="w-3.5 h-3.5 text-[#00E5FF]" />, status: "Active", load: "76%" },
    { name: "Ad Campaigns", icon: <Megaphone className="w-3.5 h-3.5 text-[#00E5FF]" />, status: "Active", load: "91%" },
    { name: "Obsidian Knowledge", icon: <Sparkles className="w-3.5 h-3.5 text-[#7B2CBF]" />, status: "Active", load: "99%" },
  ];

  return (
    <GlassCard
      headerTitle="AGENT NETWORK SUMMARY"
      headerTag="9 NODES SYNCED"
      className="w-full"
    >
      <div className="space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between p-2 rounded-lg bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.12)]">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-[#00E5FF] animate-pulse" />
            <span className="text-[#E2E8F0] font-bold">Mesh Telemetry</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(0,229,255,0.1)] text-[#00E5FF] font-bold">
            5 / 7 ONLINE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {activeAgents.map((agent, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-lg bg-[rgba(2,4,10,0.6)] border border-[rgba(0,229,255,0.08)] hover:border-[#00E5FF]/40 transition-all"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <div className="p-1 rounded bg-[rgba(0,229,255,0.06)] shrink-0">
                  {agent.icon}
                </div>
                <span className="text-[11px] text-[#E2E8F0] font-medium truncate">
                  {agent.name}
                </span>
              </div>
              <span className="text-[10px] text-[#00E5FF] font-bold shrink-0 ml-1">
                {agent.load}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[rgba(0,229,255,0.08)] flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] text-[#A5F3FC]/50">
            For diagnostic node control & logs:
          </span>
          <Link
            href="/agent-network"
            className="flex items-center space-x-1 text-[11px] text-[#00E5FF] hover:text-[#A5F3FC] font-bold transition-colors group shrink-0 whitespace-nowrap"
          >
            <span>AGENT MESH PAGE</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </GlassCard>
  );
};
