"use client";

import React, { useState } from "react";
import { JarvisVoiceState } from "@/types/brain";
import { HolographicSphere } from "./HolographicSphere";
import { EnergyWaveform } from "./EnergyWaveform";
import { VoiceStateControls } from "./VoiceStateControls";
import { Brain, ShoppingCart, Users, Megaphone, Sparkles } from "lucide-react";

interface AgentNetworkCenterpieceProps {
  onTriggerVoiceMode?: () => void;
}

const leftAgents = [
  {
    id: "research",
    name: "Research Brain",
    desc: "Market & Product Research",
    icon: <Brain className="w-4 h-4 text-[#00E5FF]" />,
    status: "Online",
    trend: [30, 45, 60, 40, 75, 85],
  },
  {
    id: "store",
    name: "Store Brain",
    desc: "Store Operations & Inventory",
    icon: <ShoppingCart className="w-4 h-4 text-[#00E5FF]" />,
    status: "Online",
    trend: [50, 40, 65, 55, 70, 90],
  },
  {
    id: "crm",
    name: "CRM Brain",
    desc: "Customer Insights & Support",
    icon: <Users className="w-4 h-4 text-[#00E5FF]" />,
    status: "Online",
    trend: [35, 55, 45, 60, 50, 80],
  },
  {
    id: "ads",
    name: "Ads Brain",
    desc: "Ad Campaigns & Optimization",
    icon: <Megaphone className="w-4 h-4 text-[#00E5FF]" />,
    status: "Online",
    trend: [40, 50, 70, 60, 85, 95],
  },
  {
    id: "obsidian",
    name: "Obsidian Knowledge Brain",
    desc: "Knowledge Base & Memory",
    icon: <Sparkles className="w-4 h-4 text-[#7B2CBF]" />,
    status: "Online",
    trend: [60, 55, 75, 80, 70, 88],
  },
];

export const AgentNetworkCenterpiece: React.FC<AgentNetworkCenterpieceProps> = ({
  onTriggerVoiceMode,
}) => {
  const [voiceState, setVoiceState] = useState<JarvisVoiceState>("listening");

  return (
    <div className="relative w-full rounded-2xl bg-[rgba(2,4,10,0.85)] border border-[rgba(0,229,255,0.2)] backdrop-blur-md p-4 lg:p-6 overflow-hidden">
      {/* Sci-Fi HUD Corner Accents */}
      <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#00E5FF] rounded-tl-sm" />
      <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#00E5FF] rounded-tr-sm" />
      <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#7B2CBF] rounded-bl-sm" />
      <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#00E5FF] rounded-br-sm" />

      {/* Grid Layout: Left Agents + Center Holographic Sphere + Right Waveform Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: 5 Agents (4 cols) */}
        <div className="lg:col-span-5 space-y-2.5 z-20">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#A5F3FC] tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
            <span>AGENT NETWORK</span>
          </div>

          {leftAgents.map((agent) => (
            <div
              key={agent.id}
              className="group relative flex items-center justify-between p-2.5 rounded-xl bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.12)] hover:border-[#00E5FF]/60 hover:bg-[rgba(0,229,255,0.08)] transition-all duration-300 font-mono text-xs"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 rounded-lg bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.2)] shrink-0">
                  {agent.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-[#E2E8F0] truncate group-hover:text-[#00E5FF] transition-colors">
                    {agent.name}
                  </div>
                  <div className="text-[10px] text-[#A5F3FC]/50 truncate">
                    {agent.desc}
                  </div>
                  <div className="text-[9px] text-[#00E5FF]/80 flex items-center space-x-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_4px_#00E5FF]" />
                    <span>Status: {agent.status}</span>
                  </div>
                </div>
              </div>

              {/* Mini Sparkline */}
              <div className="hidden sm:flex items-end space-x-0.5 h-5 shrink-0 pl-2">
                {agent.trend.map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${val}%` }}
                    className="w-1 bg-[#7B2CBF] group-hover:bg-[#00E5FF] rounded-t-sm transition-all"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Center & Right: Holographic Sphere with Waveforms (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[380px]">
          {/* Central Holographic Sphere with interactive mouse parallax */}
          <div className="relative z-20 flex flex-col items-center">
            <HolographicSphere state={voiceState} />
          </div>

          {/* Right Extending Waveform Energy */}
          <div className="w-full mt-4">
            <EnergyWaveform state={voiceState} />
          </div>

          {/* Bottom Interactive Voice State Selector */}
          <div className="mt-2 z-20 flex flex-wrap items-center justify-center gap-3">
            <VoiceStateControls currentState={voiceState} onStateChange={setVoiceState} />
            {onTriggerVoiceMode && (
              <button
                onClick={onTriggerVoiceMode}
                className="px-3 py-1.5 rounded-lg bg-[rgba(123,44,191,0.2)] border border-[rgba(123,44,191,0.5)] text-[#D8B4FE] font-mono text-xs font-semibold hover:bg-[rgba(123,44,191,0.4)] transition-all shadow-[0_0_15px_rgba(123,44,191,0.3)]"
              >
                FULLSCREEN VOICE MODE (REF 1)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
