"use client";

import React, { useState } from "react";
import { financeOverviewMock } from "@/mocks/financeMock";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatMetric } from "@/components/ui/StatMetric";
import { GlowBadge } from "@/components/ui/GlowBadge";
import {
  DollarSign,
  PieChart,
  TrendingUp,
  CreditCard,
  Zap,
  ShieldAlert,
  ArrowUpRight,
  Clock,
  Coins,
  Cpu,
} from "lucide-react";

export default function FinancePage() {
  const budgetUsagePercent =
    (financeOverviewMock.currentSpend / financeOverviewMock.monthlyBudget) * 100;

  const [activeLedgerFilter, setActiveLedgerFilter] = useState<"all" | "llm" | "compute" | "ecom">("all");

  const recentTransactions = [
    { id: "tx-881", agent: "Chief Brain Core", type: "llm", model: "claude-3-7-sonnet", tokens: "42,850", cost: "$0.64", time: "1m ago", status: "cleared" },
    { id: "tx-882", agent: "Scout Prime", type: "llm", model: "gpt-4o", tokens: "18,200", cost: "$0.18", time: "4m ago", status: "cleared" },
    { id: "tx-883", agent: "Ledger Sentinel", type: "llm", model: "deepseek-r1", tokens: "94,100", cost: "$0.22", time: "9m ago", status: "cleared" },
    { id: "tx-884", agent: "Pipeline Orchestrator", type: "compute", model: "n8n Webhook Bus", tokens: "N/A", cost: "$0.04", time: "14m ago", status: "cleared" },
    { id: "tx-885", agent: "Commerce Bridge", type: "ecom", model: "Shopify Webhook Relay", tokens: "1,200", cost: "$0.02", time: "22m ago", status: "cleared" },
    { id: "tx-886", agent: "Neural Voice Dispatch", type: "llm", model: "ElevenLabs Stream", tokens: "2,400 chars", cost: "$0.09", time: "28m ago", status: "cleared" },
  ];

  const filteredTransactions = activeLedgerFilter === "all"
    ? recentTransactions
    : recentTransactions.filter((tx) => tx.type === activeLedgerFilter);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-6">
      {/* Top Financial Telemetry Banner */}
      <GlassCard
        headerTitle="FINANCE & OPERATIONAL RESOURCE CONTROL"
        headerTag="REAL-TIME TELEMETRY BUS"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatMetric
            label="CURRENT MONTH SPEND"
            value={`$${financeOverviewMock.currentSpend.toFixed(2)}`}
            subtext={`Budget: $${financeOverviewMock.monthlyBudget.toFixed(2)}`}
            progressPercent={budgetUsagePercent}
            variant="cyan"
          />
          <StatMetric
            label="PROJECTED MONTH-END"
            value={`$${financeOverviewMock.projectedSpend.toFixed(2)}`}
            subtext="Within 92% Budget Target"
            variant="violet"
          />
          <StatMetric
            label="LLM TOKEN CONSUMPTION"
            value={`$${financeOverviewMock.apiTokensCost.toFixed(2)}`}
            subtext="OpenAI, Anthropic & DeepSeek"
            variant="cyan"
          />
          <StatMetric
            label="INFRASTRUCTURE COMPUTE"
            value={`$${financeOverviewMock.computeCost.toFixed(2)}`}
            subtext="Vercel Edge & Cloud Workers"
            variant="violet"
          />
        </div>
      </GlassCard>

      {/* Row 2: Service Allocation & Guardrail Circuit Breakers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard
          headerTitle="SERVICE COST ALLOCATION"
          headerTag="4 CORE VENDORS"
        >
          <div className="space-y-4 font-mono text-xs">
            {financeOverviewMock.categories.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#E2E8F0] font-semibold">{cat.name}</span>
                  <span className="text-[#00E5FF] font-bold">
                    ${cat.amount.toFixed(2)} ({cat.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-[rgba(255,255,255,0.05)] h-2 rounded-full overflow-hidden border border-[rgba(0,229,255,0.1)]">
                  <div
                    className="h-full bg-gradient-to-r from-[#00E5FF]/60 to-[#7B2CBF] rounded-full shadow-[0_0_8px_#00E5FF]"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <div className="text-[10px] text-[#A5F3FC]/50">
                  Provider: {cat.provider}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Operational Financial Controls */}
        <GlassCard
          headerTitle="OPERATING THRESHOLDS & GUARDRAILS"
          headerTag="AUTO-CIRCUIT BREAKER"
        >
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] flex justify-between items-center">
              <div>
                <div className="text-[#E2E8F0] font-semibold">Daily Token Spend Hard Cap</div>
                <div className="text-[10px] text-[#A5F3FC]/50">Prevents runaway agent loops</div>
              </div>
              <span className="text-sm font-bold text-[#00E5FF]">$80.00 / day</span>
            </div>

            <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] flex justify-between items-center">
              <div>
                <div className="text-[#E2E8F0] font-semibold">ElevenLabs Voice Quota</div>
                <div className="text-[10px] text-[#A5F3FC]/50">Monthly character allowance</div>
              </div>
              <span className="text-sm font-bold text-[#7B2CBF]">500,000 chars</span>
            </div>

            <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] flex justify-between items-center">
              <div>
                <div className="text-[#E2E8F0] font-semibold">Auto-Approval Ceiling</div>
                <div className="text-[10px] text-[#A5F3FC]/50">Operations requiring Arbiter review</div>
              </div>
              <span className="text-sm font-bold text-[#A5F3FC]">&gt; $25.00</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Row 3 (Desktop Density): Live Token Transaction Ledger & Autonomous ROI Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-Time Transaction Ledger (2 cols) */}
        <div className="lg:col-span-2">
          <GlassCard
            headerTitle="REAL-TIME AGENT TOKEN TRANSACTION LEDGER"
            headerTag="LIVE FEED"
          >
            <div className="space-y-3 font-mono text-xs">
              {/* Filter Tabs */}
              <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,229,255,0.08)]">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setActiveLedgerFilter("all")}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                      activeLedgerFilter === "all"
                        ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40"
                        : "text-[#A5F3FC]/50 hover:text-[#A5F3FC]"
                    }`}
                  >
                    ALL EVENTS
                  </button>
                  <button
                    onClick={() => setActiveLedgerFilter("llm")}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                      activeLedgerFilter === "llm"
                        ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40"
                        : "text-[#A5F3FC]/50 hover:text-[#A5F3FC]"
                    }`}
                  >
                    LLM TOKENS
                  </button>
                  <button
                    onClick={() => setActiveLedgerFilter("compute")}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                      activeLedgerFilter === "compute"
                        ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40"
                        : "text-[#A5F3FC]/50 hover:text-[#A5F3FC]"
                    }`}
                  >
                    COMPUTE
                  </button>
                </div>
                <span className="text-[10px] text-[#A5F3FC]/40">AUTO-AUDITED</span>
              </div>

              {/* Transactions List */}
              <div className="space-y-2">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-2.5 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] hover:border-[#00E5FF]/30 transition-all flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="p-1.5 rounded-lg bg-[rgba(0,229,255,0.06)] border border-[#00E5FF]/20 shrink-0">
                        <Cpu className="w-3.5 h-3.5 text-[#00E5FF]" />
                      </div>
                      <div className="truncate">
                        <div className="text-[#E2E8F0] font-semibold truncate flex items-center space-x-1.5">
                          <span>{tx.agent}</span>
                          <span className="text-[10px] text-[#A5F3FC]/40">· {tx.model}</span>
                        </div>
                        <div className="text-[10px] text-[#A5F3FC]/50">
                          Tokens/Chars: {tx.tokens} · {tx.time}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-[#00E5FF]">{tx.cost}</div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(16,185,129,0.1)] text-[#10B981] font-bold">
                        CLEARED
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Autonomous ROI & Efficiency Card (1 col) */}
        <div className="lg:col-span-1">
          <GlassCard
            headerTitle="AUTONOMOUS VALUE MULTIPLIER"
            headerTag="SAVINGS METRIC"
          >
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[rgba(123,44,191,0.08)] border border-[rgba(123,44,191,0.3)]">
                <div className="text-[10px] text-[#D8B4FE]/70 uppercase">ESTIMATED HUMAN EQUIVALENT</div>
                <div className="text-2xl font-bold text-[#D8B4FE] mt-1">$4,850.00</div>
                <div className="text-[10px] text-[#A5F3FC]/50 mt-1">Based on 148 automated agent task hours</div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[rgba(0,229,255,0.08)] text-[11px]">
                <div className="flex justify-between py-1 border-b border-[rgba(0,229,255,0.04)]">
                  <span className="text-[#A5F3FC]/60">Total Cloud & API Spend</span>
                  <span className="text-[#00E5FF] font-bold">${financeOverviewMock.currentSpend.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[rgba(0,229,255,0.04)]">
                  <span className="text-[#A5F3FC]/60">Net Operational Savings</span>
                  <span className="text-[#10B981] font-bold">+$4,668.60</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#A5F3FC]/60">Operational Efficiency</span>
                  <span className="text-[#00E5FF] font-bold">96.2% ROI</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.1)] text-[10px] text-[#A5F3FC]/60 flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                <span>All agent queries routed through dynamic cost-optimized model tiers.</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
