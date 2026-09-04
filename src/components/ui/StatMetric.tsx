import React from "react";
import { cn } from "@/lib/utils";

interface StatMetricProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  progressPercent?: number;
  trend?: number[];
  variant?: "cyan" | "violet";
  className?: string;
}

export const StatMetric: React.FC<StatMetricProps> = ({
  label,
  value,
  unit,
  subtext,
  progressPercent,
  trend,
  variant = "cyan",
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)]", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono font-medium tracking-wider text-[#A5F3FC]/70 uppercase">
          {label}
        </span>
        {trend && trend.length > 0 && (
          <div className="flex items-end space-x-0.5 h-3">
            {trend.map((point, idx) => {
              const max = Math.max(...trend, 1);
              const heightPct = Math.max(15, (point / max) * 100);
              return (
                <div
                  key={idx}
                  style={{ height: `${heightPct}%` }}
                  className={cn(
                    "w-1 rounded-t-sm transition-all duration-300",
                    variant === "cyan" ? "bg-[#00E5FF]/60 hover:bg-[#00E5FF]" : "bg-[#7B2CBF]/70 hover:bg-[#7B2CBF]"
                  )}
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-1">
        <span className="text-xl md:text-2xl font-mono font-bold tracking-tight text-[#E2E8F0] tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-xs font-mono font-semibold text-[#00E5FF]/80">
            {unit}
          </span>
        )}
      </div>

      {progressPercent !== undefined && (
        <div className="w-full bg-[rgba(255,255,255,0.06)] h-1.5 rounded-full overflow-hidden mt-1 border border-[rgba(0,229,255,0.1)]">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              variant === "cyan"
                ? "bg-gradient-to-r from-[#00E5FF]/60 to-[#00E5FF] shadow-[0_0_8px_#00E5FF]"
                : "bg-gradient-to-r from-[#7B2CBF]/60 to-[#7B2CBF] shadow-[0_0_8px_#7B2CBF]"
            )}
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      )}

      {subtext && (
        <span className="text-[10px] font-mono text-[#A5F3FC]/50 truncate">
          {subtext}
        </span>
      )}
    </div>
  );
};
