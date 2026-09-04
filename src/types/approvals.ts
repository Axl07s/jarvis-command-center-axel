export type ApprovalPriority = "critical" | "high" | "medium" | "low";
export type ApprovalStatus = "pending" | "approved" | "rejected" | "escalated";

export interface ApprovalItem {
  id: string;
  sourceAgent: string;
  actionTitle: string;
  description: string;
  priority: ApprovalPriority;
  status: ApprovalStatus;
  requestedAt: string;
  targetService: string; // e.g. "Supabase Auth", "Shopify API", "n8n Workflow"
  estimatedImpact: string;
  payloadSummary: Record<string, string | number | boolean>;
}

export interface ApprovalQueueSummary {
  pendingCount: number;
  criticalPending: number;
  approvedToday: number;
  rejectedToday: number;
  avgResolutionTimeMinutes: number;
}
