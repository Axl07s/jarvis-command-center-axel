"use client";

import React, { useState, useEffect } from "react";
import { jarvisConfig } from "@/config/jarvis.config";
import { Activity, Clock, ShieldCheck, Terminal } from "lucide-react";

export const FooterHUD: React.FC = () => {
  const [time, setTime] = useState("10:24:17 AM");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full flex flex-wrap items-center justify-between gap-4 px-4 pr-16 sm:pr-4 lg:px-8 py-3 bg-[#02040a]/90 backdrop-blur-md border-t border-[rgba(0,229,255,0.15)] text-xs font-mono text-[#A5F3FC]/70 select-none z-20">
      <div className="flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] animate-pulse" />
        <span className="text-[#E2E8F0] font-bold">SYSTEM STATUS:</span>
        <span className="text-[#00E5FF]">{jarvisConfig.system.organization} · NOMINAL</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 lg:gap-8 text-[11px]">
        <div className="flex items-center space-x-1.5">
          <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>LAST UPDATED: <strong className="text-[#E2E8F0]">Just now</strong></span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span>TIME: <strong className="text-[#00E5FF] tabular-nums">{time}</strong></span>
        </div>

        <div className="flex items-center space-x-1.5">
          <span>UPTIME: <strong className="text-[#E2E8F0]">6d 12h 42m</strong></span>
        </div>

        <div className="flex items-center space-x-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#7B2CBF]" />
          <span>BUILD: <strong className="text-[#7B2CBF]">v{jarvisConfig.system.version}</strong></span>
        </div>
      </div>
    </footer>
  );
};
