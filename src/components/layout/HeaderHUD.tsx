"use client";

import React, { useState, useEffect } from "react";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { jarvisConfig } from "@/config/jarvis.config";
import { Activity, Shield } from "lucide-react";

export const HeaderHUD: React.FC = () => {
  const [timeString, setTimeString] = useState<string>("00:00:00 UTC");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-4 lg:px-8 py-3.5 bg-[#02040a]/80 backdrop-blur-md border-b border-[rgba(0,229,255,0.15)] z-20 select-none">
      {/* Left HUD Details */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#E2E8F0] uppercase">
            CLUSTER: {jarvisConfig.system.clusterId}
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-4 text-xs font-mono text-[#A5F3FC]/60">
          <span className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span>LATENCY: 12ms</span>
          </span>
          <span>·</span>
          <span className="flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-[#7B2CBF]" />
            <span>POSTURE: {jarvisConfig.system.classification}</span>
          </span>
        </div>
      </div>

      {/* Right HUD Readouts & Clock */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="hidden sm:block text-right">
          <div className="text-xs font-mono font-bold text-[#A5F3FC] tracking-wider tabular-nums">
            {timeString}
          </div>
          <div className="text-[10px] font-mono text-[#E2E8F0]/40 uppercase tracking-widest">
            SYNCHRONIZED BUS
          </div>
        </div>

        <GlowBadge label="LIVE HUD" variant="cyan" size="sm" pulsing />
      </div>
    </header>
  );
};
