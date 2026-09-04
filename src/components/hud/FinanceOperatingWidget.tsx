"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { DollarSign, CheckSquare } from "lucide-react";
import { useApp } from "@/context/AppContext";

export const FinanceOperatingWidget: React.FC = () => {
  const { approvals, pendingApprovalsCount } = useApp();

  const highPriorityPendingCount = approvals.filter(
    (a) => a.status === "pending" && (a.priority === "high" || a.priority === "critical")
  ).length;

  return (
    <div className="space-y-4">
      {/* 1. Monthly Spend */}
      <GlassCard
        headerTitle="FINANCE & OPERATING"
        headerTag="ACTIVE"
      >
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#A5F3FC]/70">
              <DollarSign className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Monthly Spend</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] text-[#00E5FF]">
              DEMO
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="text-xl font-bold text-[#E2E8F0] tracking-tight">
              $X,XXX
            </div>
            <div className="text-[10px] text-[#00E5FF]">
              vs last month +12.4% ↗
            </div>
          </div>

          {/* Sparkline */}
          <div className="flex items-end space-x-1 h-6 pt-1">
            {[30, 45, 40, 60, 55, 75, 90, 85].map((val, idx) => (
              <div
                key={idx}
                style={{ height: `${val}%` }}
                className="flex-1 bg-gradient-to-t from-[#7B2CBF] to-[#00E5FF] rounded-t-sm"
              />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* 2. Upcoming Renewals */}
      <GlassCard headerTitle="UPCOMING RENEWALS" headerTag="NEXT 30 DAYS">
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-[#E2E8F0]">5</div>
            <div className="text-right">
              <div className="text-[10px] text-[#A5F3FC]/50">Total (Demo)</div>
              <div className="text-sm font-bold text-[#00E5FF]">$X,XXX</div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end space-x-1.5 h-8 pt-1">
            {[40, 70, 30, 90, 60, 45, 80].map((val, idx) => (
              <div
                key={idx}
                style={{ height: `${val}%` }}
                className="flex-1 bg-[#00E5FF]/40 hover:bg-[#00E5FF] rounded-t-sm transition-colors"
              />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* 3. Approval Queue (Synchronized with AppContext and LocalStorage) */}
      <GlassCard
        headerTitle="APPROVAL QUEUE"
        headerTag={pendingApprovalsCount > 0 ? "REQUIRES ATTENTION" : "CLEARED"}
      >
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-[#E2E8F0] flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-[#00E5FF]" />
              <span>{pendingApprovalsCount}</span>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#A5F3FC]/50">High Priority</div>
              <div className={`text-sm font-bold ${highPriorityPendingCount > 0 ? "text-[#7B2CBF]" : "text-[#00E5FF]"}`}>
                {highPriorityPendingCount}
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end space-x-1.5 h-8 pt-1">
            {[60, 30, 85, 40, 100, 50].map((val, idx) => (
              <div
                key={idx}
                style={{ height: `${pendingApprovalsCount > 0 ? val : 10}%` }}
                className={`flex-1 rounded-t-sm transition-all ${
                  pendingApprovalsCount > 0
                    ? "bg-[#7B2CBF]/50 hover:bg-[#7B2CBF]"
                    : "bg-[#00E5FF]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
