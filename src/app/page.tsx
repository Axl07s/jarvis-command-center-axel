"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChiefBrainCenterpiece } from "@/components/brain/ChiefBrainCenterpiece";
import { ChiefBrainImmersive } from "@/components/brain/ChiefBrainImmersive";
import { FinanceOperatingWidget } from "@/components/hud/FinanceOperatingWidget";
import { ShopifyWidget } from "@/components/hud/ShopifyWidget";
import { AgentSummaryWidget } from "@/components/hud/AgentSummaryWidget";
import { shopifyPerformanceMock } from "@/mocks/widgetsMock";
import { GitFork, Server, Sparkles, Activity, Maximize2 } from "lucide-react";

export default function ChiefBrainDashboardPage() {
  const { isImmersiveOpen, setIsImmersiveOpen } = useApp();

  // Low-profile, extra-compact Top Metrics
  const topMetrics = [
    {
      id: "n8n",
      name: "n8n Workflows",
      icon: <GitFork className="w-3.5 h-3.5 text-[#7B2CBF]" />,
      mainLabel: "Workflows",
      mainVal: "24 / 36",
      subLabel: "Load",
      subVal: "98.6%",
    },
    {
      id: "docker",
      name: "Docker Health",
      icon: <Server className="w-3.5 h-3.5 text-[#00E5FF]" />,
      mainLabel: "Containers",
      mainVal: "18 / 24",
      subLabel: "Load",
      subVal: "32%",
    },
    {
      id: "obsidian",
      name: "Obsidian Memory",
      icon: <Sparkles className="w-3.5 h-3.5 text-[#7B2CBF]" />,
      mainLabel: "Vault",
      mainVal: "Healthy",
      subLabel: "Files",
      subVal: "12,842",
    },
    {
      id: "activity",
      name: "Agent Activity",
      icon: <Activity className="w-3.5 h-3.5 text-[#00E5FF]" />,
      mainLabel: "Agents Online",
      mainVal: "5 / 7",
      subLabel: "Tasks",
      subVal: "1,248",
    },
  ];

  return (
    <div className="space-y-3.5 max-w-[1720px] mx-auto pb-4">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-xl bg-[rgba(0,229,255,0.1)] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
          </div>
          <div>
            <h1 className="text-base md:text-lg font-mono font-bold tracking-widest text-[#E2E8F0] uppercase">
              JARVIS COMMAND CENTER
            </h1>
            <p className="text-[11px] font-mono text-[#00E5FF]/70">
              AUTONOMOUS AGENT ORCHESTRATION & NEURAL TELEMETRY
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsImmersiveOpen(true)}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[rgba(0,229,255,0.12)] border border-[rgba(0,229,255,0.5)] text-[#00E5FF] font-mono text-xs font-bold hover:bg-[rgba(0,229,255,0.25)] transition-all shadow-[0_0_20px_rgba(0,229,255,0.25)]"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>IMMERSIVE VOICE MODE</span>
          </button>
        </div>
      </div>

      {/* 1. Ultra-Compact Top Metric Ribbon (Low visual weight) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {topMetrics.map((m) => (
          <GlassCard key={m.id} className="p-2 sm:p-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 font-mono text-xs">
              <div className="flex items-center space-x-1.5 min-w-0">
                <div className="p-1 rounded-md bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.2)] shrink-0">
                  {m.icon}
                </div>
                <span className="font-bold text-[#E2E8F0] text-[10px] sm:text-[11px] truncate">{m.name}</span>
              </div>
              <div className="flex items-baseline space-x-1 sm:text-right shrink-0">
                <span className="text-xs sm:text-sm font-bold text-[#00E5FF]">{m.mainVal}</span>
                <span className="text-[9px] sm:text-[10px] text-[#A5F3FC]/50">({m.subVal})</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* 2. Main Central Section: Chief Brain Centerpiece (Hero) & Right Finance Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Dominant Chief Brain Centerpiece (8-9 cols) */}
        <div className="xl:col-span-8 2xl:col-span-9">
          <ChiefBrainCenterpiece onTriggerVoiceMode={() => setIsImmersiveOpen(true)} />
        </div>

        {/* Right-Side Low-Weight Finance & Operating Panel (3-4 cols) */}
        <div className="xl:col-span-4 2xl:col-span-3">
          <FinanceOperatingWidget />
        </div>
      </div>

      {/* 3. Lower Section: Left-Side Compact Agent Summary & Shopify Performance */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* Lower Left Area: Agent Summary & Compact Shopify side by side (8-9 cols) */}
        <div className="xl:col-span-8 2xl:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Compact Agent Summary Widget */}
          <AgentSummaryWidget />

          {/* Compact Shopify Performance Module (Moved to Lower-Left) */}
          <ShopifyWidget data={shopifyPerformanceMock} />
        </div>

        {/* Lower Right Area: System Telemetry Info (3-4 cols) */}
        <div className="xl:col-span-4 2xl:col-span-3">
          <GlassCard headerTitle="SYSTEM HUD TELEMETRY" headerTag="LIVE AUDIT">
            <div className="space-y-1.5 font-mono text-[11px] text-[#A5F3FC]/70">
              <div className="flex justify-between py-0.5 border-b border-[rgba(0,229,255,0.06)]">
                <span>VIEWPORT INTEGRATION</span>
                <span className="text-[#00E5FF] font-bold">ZERO SCROLLBAR</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[rgba(0,229,255,0.06)]">
                <span>CHIEF BRAIN CORE</span>
                <span className="text-[#00E5FF] font-bold">380-420PX HOLOGRAPHIC</span>
              </div>
              <div className="flex justify-between py-0.5 border-b border-[rgba(0,229,255,0.06)]">
                <span>AUDIO SPECTRUM BUS</span>
                <span className="text-[#00E5FF] font-bold">WEB AUDIO API REALTIME</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span>AGENT MESH</span>
                <span className="text-[#7B2CBF] font-bold">9 NODES BOUND</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Full-Screen Immersive Voice Mode Overlay */}
      <ChiefBrainImmersive
        isOpen={isImmersiveOpen}
        onClose={() => setIsImmersiveOpen(false)}
      />
    </div>
  );
}
