"use client";

import React from "react";
import { JarvisVoiceState } from "@/types/brain";
import { cn } from "@/lib/utils";
import { Mic, Cpu, Volume2, Power } from "lucide-react";

interface VoiceStateControlsProps {
  currentState: JarvisVoiceState;
  onStateChange: (state: JarvisVoiceState) => void;
  className?: string;
}

export const VoiceStateControls: React.FC<VoiceStateControlsProps> = ({
  currentState,
  onStateChange,
  className,
}) => {
  const states: { id: JarvisVoiceState; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: "listening",
      label: "LISTENING",
      icon: <Mic className="w-3.5 h-3.5" />,
      desc: "Acoustic Detection",
    },
    {
      id: "processing",
      label: "PROCESSING",
      icon: <Cpu className="w-3.5 h-3.5" />,
      desc: "Neural Synthesis",
    },
    {
      id: "speaking",
      label: "SPEAKING",
      icon: <Volume2 className="w-3.5 h-3.5" />,
      desc: "Harmonic Output",
    },
    {
      id: "idle",
      label: "STANDBY",
      icon: <Power className="w-3.5 h-3.5" />,
      desc: "Ambient Bus",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 p-2 rounded-xl bg-[rgba(2,4,10,0.92)] border border-[rgba(0,229,255,0.2)] backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.1)]",
        className
      )}
    >
      <span className="text-[10px] font-mono text-[#A5F3FC]/50 tracking-widest uppercase px-2 hidden sm:inline-block">
        MODE:
      </span>

      {states.map((item) => {
        const isActive = currentState === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onStateChange(item.id)}
            className={cn(
              "flex items-center space-x-2 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold tracking-wider transition-all duration-200 select-none",
              isActive
                ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/60 shadow-[0_0_15px_rgba(0,229,255,0.35)] scale-[1.02]"
                : "bg-transparent text-[#E2E8F0]/60 border border-transparent hover:text-[#A5F3FC] hover:bg-[rgba(0,229,255,0.06)] hover:border-[rgba(0,229,255,0.15)]"
            )}
          >
            <span
              className={cn(
                "transition-transform",
                isActive && "scale-110 text-[#00E5FF]"
              )}
            >
              {item.icon}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
