"use client";

import React, { useState } from "react";
import { jarvisAgentsMock, agentNetworkSummaryMock } from "@/mocks/agentsMock";
import { JarvisAgentNode } from "@/types/agents";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { StatMetric } from "@/components/ui/StatMetric";
import { Network, Activity, Cpu, HardDrive, CheckCircle2, Zap, Loader2, Check, Shield } from "lucide-react";

export default function AgentNetworkPage() {
  const [selectedAgent, setSelectedAgent] = useState<JarvisAgentNode>(
    jarvisAgentsMock[0]
  );
  const [diagnosticState, setDiagnosticState] = useState<"idle" | "running" | "passed">("idle");

  const handleRunDiagnostic = () => {
    if (diagnosticState !== "idle") return;
    setDiagnosticState("running");

    setTimeout(() => {
      setDiagnosticState("passed");
      setTimeout(() => {
        setDiagnosticState("idle");
      }, 2500);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Network Telemetry Banner */}
      <GlassCard
        headerTitle="AGENT NETWORK MESH OVERVIEW"
        headerTag="9 NODES SYNCHRONIZED"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatMetric
            label="TOTAL ACTIVE NODES"
            value={`${agentNetworkSummaryMock.activeNodes} / ${agentNetworkSummaryMock.totalNodes}`}
            subtext="Cluster Health 98.8%"
            variant="cyan"
          />
          <StatMetric
            label="PROCESSING NODES"
            value={agentNetworkSummaryMock.processingNodes}
            subtext="Concurrent Tasks"
            variant="violet"
          />
          <StatMetric
            label="AVERAGE LATENCY"
            value={agentNetworkSummaryMock.averageLatencyMs}
            unit="ms"
            subtext="Inter-node Bus"
            variant="cyan"
          />
          <StatMetric
            label="GLOBAL THROUGHPUT"
            value={agentNetworkSummaryMock.globalThroughputTps}
            unit="tps"
            subtext="Transactions / Sec"
            variant="violet"
          />
        </div>
      </GlassCard>

      {/* 9-Node Grid + Inspector Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: 9 Agents Cards (Chief Brain Core on top spanning 2 cols, 8 nodes below in 4x2) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {jarvisAgentsMock.map((agent, index) => {
            const isSelected = selectedAgent.id === agent.id;
            const isMaster = index === 0; // Chief Brain Core

            return (
              <div
                key={agent.id}
                onClick={() => {
                  setSelectedAgent(agent);
                  setDiagnosticState("idle");
                }}
                className={`p-4 rounded-xl backdrop-blur-md cursor-pointer transition-all duration-300 border ${
                  isMaster ? "sm:col-span-2" : ""
                } ${
                  isSelected
                    ? "bg-[rgba(0,229,255,0.08)] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.25)]"
                    : "bg-[rgba(2,4,10,0.88)] border-[rgba(0,229,255,0.15)] hover:border-[rgba(0,229,255,0.35)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
                    <span className="font-mono text-xs font-bold text-[#E2E8F0] tracking-wide">
                      {agent.codename}
                    </span>
                    {isMaster && (
                      <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded bg-[rgba(123,44,191,0.25)] border border-[rgba(123,44,191,0.5)] text-[#D8B4FE] uppercase">
                        MASTER ORCHESTRATOR
                      </span>
                    )}
                  </div>
                  <GlowBadge
                    label={agent.status}
                    variant={agent.status === "active" ? "cyan" : "standby"}
                    size="sm"
                  />
                </div>

                <h3 className="font-mono text-sm font-semibold text-[#A5F3FC] mt-2 truncate">
                  {agent.name}
                </h3>
                <p className="text-[11px] font-mono text-[#E2E8F0]/50 line-clamp-1 mt-0.5">
                  {agent.role}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-[rgba(0,229,255,0.08)] text-[10px] font-mono text-[#A5F3FC]/70">
                  <span className="flex items-center space-x-1">
                    <Activity className="w-3 h-3 text-[#00E5FF]" />
                    <span>Load: {agent.activityLevel}%</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Cpu className="w-3 h-3 text-[#A5F3FC]" />
                    <span>RAM: {agent.memoryUsageMb}MB</span>
                  </span>
                  <span className="flex items-center space-x-1 justify-end sm:justify-end col-span-2 sm:col-span-1">
                    <Zap className="w-3 h-3 text-[#7B2CBF]" />
                    <span>Ping: {agent.latencyMs}ms</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 1 Col: Agent Deep Inspector */}
        <div className="lg:col-span-1">
          <GlassCard
            headerTitle="NODE INSPECTOR"
            headerTag={selectedAgent.codename}
            className="sticky top-6"
          >
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="text-[10px] text-[#A5F3FC]/50 uppercase tracking-wider">
                  SELECTED COMPONENT
                </div>
                <h3 className="text-base font-bold text-[#00E5FF] mt-0.5">
                  {selectedAgent.name}
                </h3>
                <p className="text-xs text-[#E2E8F0]/70 mt-1">
                  {selectedAgent.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[rgba(0,229,255,0.1)]">
                <div className="flex justify-between py-1 border-b border-[rgba(0,229,255,0.06)]">
                  <span className="text-[#A5F3FC]/60">CATEGORY</span>
                  <span className="text-[#E2E8F0] font-semibold uppercase">
                    {selectedAgent.category}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[rgba(0,229,255,0.06)]">
                  <span className="text-[#A5F3FC]/60">MEMORY ALLOCATED</span>
                  <span className="text-[#E2E8F0] font-semibold">
                    {selectedAgent.memoryUsageMb} MB
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[rgba(0,229,255,0.06)]">
                  <span className="text-[#A5F3FC]/60">TASKS COMPLETED</span>
                  <span className="text-[#00E5FF] font-semibold">
                    {selectedAgent.tasksCompleted.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#A5F3FC]/60">LAST EXECUTION</span>
                  <span className="text-[#A5F3FC]">{selectedAgent.lastExecution}</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleRunDiagnostic}
                  disabled={diagnosticState === "running"}
                  className={`w-full py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                    diagnosticState === "running"
                      ? "bg-[#7B2CBF]/30 border border-[#7B2CBF] text-[#D8B4FE] shadow-[0_0_15px_rgba(123,44,191,0.3)] cursor-wait"
                      : diagnosticState === "passed"
                      ? "bg-[#00E5FF]/25 border border-[#00E5FF] text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                      : "bg-[rgba(0,229,255,0.12)] border border-[rgba(0,229,255,0.4)] text-[#00E5FF] hover:bg-[rgba(0,229,255,0.22)] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  }`}
                >
                  {diagnosticState === "running" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#D8B4FE]" />
                      <span>RUNNING DIAGNOSTIC PING...</span>
                    </>
                  ) : diagnosticState === "passed" ? (
                    <>
                      <Check className="w-4 h-4 text-[#00E5FF]" />
                      <span>NODE INTEGRITY 100% (PASS)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-[#00E5FF]" />
                      <span>EXECUTE DIAGNOSTIC PING</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
