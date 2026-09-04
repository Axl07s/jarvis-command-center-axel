"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { StatMetric } from "@/components/ui/StatMetric";
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, RotateCcw } from "lucide-react";

export default function ApprovalsPage() {
  const { approvals, pendingApprovalsCount, resolveApproval, resetApprovals } = useApp();
  const [resetNotice, setResetNotice] = useState(false);

  const handleReset = () => {
    resetApprovals();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-6">
      {/* Top Approvals Metric Banner */}
      <GlassCard
        headerTitle="PRIVILEGED APPROVAL QUEUE"
        headerTag="HUMAN-IN-THE-LOOP"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatMetric
            label="PENDING APPROVALS"
            value={pendingApprovalsCount}
            subtext="Awaiting Decision"
            variant="cyan"
          />
          <StatMetric
            label="CRITICAL PRIORITY"
            value={
              approvals.filter(
                (i) => i.status === "pending" && i.priority === "critical"
              ).length
            }
            subtext="High Risk Gating"
            variant="violet"
          />
          <StatMetric
            label="RESOLVED OPERATIONS"
            value={approvals.filter((i) => i.status !== "pending").length}
            subtext="Persisted in State"
            variant="cyan"
          />
          <StatMetric
            label="SECURITY POSTURE"
            value="ACTIVE"
            subtext="Zero-Trust Enforced"
            variant="violet"
          />
        </div>
      </GlassCard>

      {/* Persistence Bar & Queue Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="text-xs font-mono text-[#A5F3FC]/70 flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
          <span>Queue state automatically saved to LocalStorage across sessions.</span>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[rgba(123,44,191,0.12)] border border-[rgba(123,44,191,0.35)] text-[#D8B4FE] text-xs font-mono font-bold hover:bg-[rgba(123,44,191,0.25)] transition-all cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{resetNotice ? "QUEUE RESET TO DEMO DEFAULT" : "RESET DEMO QUEUE"}</span>
        </button>
      </div>

      {/* Approval Cards List */}
      <div className="space-y-4">
        {approvals.map((item) => {
          const isPending = item.status === "pending";
          return (
            <GlassCard
              key={item.id}
              headerTitle={item.actionTitle}
              headerTag={item.sourceAgent}
              variant={
                item.priority === "critical"
                  ? "glow-violet"
                  : item.priority === "high"
                  ? "glow-cyan"
                  : "default"
              }
            >
              <div className="space-y-4 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <GlowBadge
                      label={`PRIORITY: ${item.priority}`}
                      variant={item.priority === "critical" ? "violet" : "cyan"}
                      size="sm"
                    />
                    <span className="text-[#A5F3FC]/50 text-[11px]">
                      Requested at: {item.requestedAt}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[#A5F3FC]/60">STATUS:</span>
                    <span
                      className={`font-bold uppercase ${
                        item.status === "approved"
                          ? "text-[#00E5FF]"
                          : item.status === "rejected"
                          ? "text-[#7B2CBF]"
                          : "text-[#A5F3FC]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#E2E8F0] leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Target & Impact Readout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)]">
                  <div>
                    <span className="text-[10px] text-[#A5F3FC]/50 uppercase">
                      TARGET SERVICE
                    </span>
                    <div className="font-semibold text-[#00E5FF] mt-0.5">
                      {item.targetService}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#A5F3FC]/50 uppercase">
                      ESTIMATED IMPACT
                    </span>
                    <div className="font-semibold text-[#A5F3FC] mt-0.5">
                      {item.estimatedImpact}
                    </div>
                  </div>
                </div>

                {/* Decision Actions */}
                {isPending ? (
                  <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[rgba(0,229,255,0.1)]">
                    <button
                      onClick={() => resolveApproval(item.id, "rejected")}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[rgba(123,44,191,0.15)] border border-[rgba(123,44,191,0.4)] text-[#D8B4FE] hover:bg-[rgba(123,44,191,0.3)] transition-colors cursor-pointer"
                    >
                      <XCircle className="w-4 h-4 text-[#7B2CBF]" />
                      <span>REJECT OPERATION</span>
                    </button>
                    <button
                      onClick={() => resolveApproval(item.id, "approved")}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[rgba(0,229,255,0.15)] border border-[rgba(0,229,255,0.5)] text-[#00E5FF] hover:bg-[rgba(0,229,255,0.25)] transition-colors shadow-[0_0_15px_rgba(0,229,255,0.25)] cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00E5FF]" />
                      <span>AUTHORIZE & EXECUTE</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-right text-[11px] text-[#A5F3FC]/60 italic pt-2">
                    Action recorded in immutable security audit log and saved to localStorage.
                  </div>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
