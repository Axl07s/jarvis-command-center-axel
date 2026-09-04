import { ApprovalItem, ApprovalQueueSummary } from "@/types/approvals";

export const approvalsMock: ApprovalItem[] = [
  {
    id: "appr-8821",
    sourceAgent: "Financial Operations Agent (LEDGER-09)",
    actionTitle: "Increase LLM Token Quota for Research Pipeline",
    description: "Automatic request to expand daily OpenAI token threshold from $50.00 to $120.00 for deep knowledge indexing.",
    priority: "high",
    status: "pending",
    requestedAt: "2026-08-21 15:20:11 UTC",
    targetService: "OpenAI API Gateway",
    estimatedImpact: "+$70.00/day estimated burn",
    payloadSummary: {
      newLimitUsd: 120,
      previousLimitUsd: 50,
      autoRollbackHours: 24,
    },
  },
  {
    id: "appr-8822",
    sourceAgent: "Shopify Commerce Tracker (MERCURY-05)",
    actionTitle: "Trigger Flash Promotion Campaign Sync",
    description: "Automated batch discount activation for 48 inventory items with 25% price reduction rule.",
    priority: "medium",
    status: "pending",
    requestedAt: "2026-08-21 15:12:45 UTC",
    targetService: "Shopify GraphQL Admin",
    estimatedImpact: "Affects 48 products in Catalog",
    payloadSummary: {
      discountPercent: 25,
      affectedSKUs: 48,
      durationHours: 12,
    },
  },
  {
    id: "appr-8823",
    sourceAgent: "Security Vault (AEGIS-08)",
    actionTitle: "Rotate Supabase Service Role Key",
    description: "Scheduled 30-day credential rotation and zero-downtime client re-authentication.",
    priority: "critical",
    status: "pending",
    requestedAt: "2026-08-21 14:58:00 UTC",
    targetService: "Supabase Vault",
    estimatedImpact: "Re-authenticates 4 background microservices",
    payloadSummary: {
      targetKey: "service_role_secret",
      propagationGracePeriodSec: 120,
    },
  },
];

export const approvalQueueSummaryMock: ApprovalQueueSummary = {
  pendingCount: 3,
  criticalPending: 1,
  approvedToday: 14,
  rejectedToday: 1,
  avgResolutionTimeMinutes: 4.2,
};
