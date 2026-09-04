import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "glow-cyan" | "glow-violet" | "hud-angled";
  headerTitle?: string;
  headerTag?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = "default",
  headerTitle,
  headerTag,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-xl backdrop-blur-sm bg-[rgba(2,4,10,0.88)] border transition-[border-color,box-shadow,background-color] duration-200 [transform:translateZ(0)] [contain:content]",
        "border-[rgba(0,229,255,0.15)] hover:border-[rgba(0,229,255,0.35)]",
        variant === "glow-cyan" && "shadow-[0_0_25px_rgba(0,229,255,0.15)] border-[rgba(0,229,255,0.3)]",
        variant === "glow-violet" && "shadow-[0_0_25px_rgba(123,44,191,0.2)] border-[rgba(123,44,191,0.3)]",
        className
      )}
      {...props}
    >
      {/* Sci-Fi HUD Corner Accents */}
      <div className="absolute -top-[1px] -left-[1px] w-2.5 h-2.5 border-t-2 border-l-2 border-[#00E5FF] rounded-tl-sm pointer-events-none" />
      <div className="absolute -top-[1px] -right-[1px] w-2.5 h-2.5 border-t-2 border-r-2 border-[#00E5FF] rounded-tr-sm pointer-events-none" />
      <div className="absolute -bottom-[1px] -left-[1px] w-2.5 h-2.5 border-b-2 border-l-2 border-[#7B2CBF] rounded-bl-sm pointer-events-none" />
      <div className="absolute -bottom-[1px] -right-[1px] w-2.5 h-2.5 border-b-2 border-r-2 border-[#00E5FF] rounded-br-sm pointer-events-none" />

      {/* Header bar if provided */}
      {headerTitle && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(0,229,255,0.12)] bg-[rgba(0,229,255,0.02)]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
            <h3 className="text-xs font-mono font-semibold tracking-wider text-[#A5F3FC] uppercase">
              {headerTitle}
            </h3>
          </div>
          {headerTag && (
            <span className="text-[10px] font-mono tracking-widest text-[#E2E8F0]/50 uppercase px-2 py-0.5 rounded bg-[rgba(0,229,255,0.06)] border border-[rgba(0,229,255,0.15)]">
              {headerTag}
            </span>
          )}
        </div>
      )}

      <div className="p-4">{children}</div>
    </div>
  );
};
