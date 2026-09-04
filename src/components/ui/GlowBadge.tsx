import React from "react";
import { cn } from "@/lib/utils";

interface GlowBadgeProps {
  label: string;
  variant?: "cyan" | "violet" | "pale" | "standby";
  pulsing?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
  label,
  variant = "cyan",
  pulsing = false,
  className,
  size = "md",
}) => {
  const variantStyles = {
    cyan: "text-[#00E5FF] bg-[rgba(0,229,255,0.08)] border-[rgba(0,229,255,0.3)] shadow-[0_0_10px_rgba(0,229,255,0.2)]",
    violet: "text-[#D8B4FE] bg-[rgba(123,44,191,0.15)] border-[rgba(123,44,191,0.4)] shadow-[0_0_10px_rgba(123,44,191,0.25)]",
    pale: "text-[#A5F3FC] bg-[rgba(165,243,252,0.06)] border-[rgba(165,243,252,0.2)]",
    standby: "text-[#94A3B8] bg-[rgba(148,163,184,0.05)] border-[rgba(148,163,184,0.2)]",
  };

  const dotColors = {
    cyan: "bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]",
    violet: "bg-[#7B2CBF] shadow-[0_0_8px_#7B2CBF]",
    pale: "bg-[#A5F3FC] shadow-[0_0_6px_#A5F3FC]",
    standby: "bg-[#94A3B8]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center space-x-1.5 font-mono uppercase tracking-widest border rounded-full font-medium select-none",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        variantStyles[variant],
        className
      )}
    >
      <span
        className={cn(
          "rounded-full inline-block",
          size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
          dotColors[variant],
          pulsing && "animate-ping opacity-75"
        )}
      />
      <span>{label}</span>
    </span>
  );
};
