import { FinanceOverview } from "@/types/finance";

export const financeOverviewMock: FinanceOverview = {
  monthlyBudget: 2500,
  currentSpend: 1142.8,
  projectedSpend: 2180.0,
  apiTokensCost: 485.2,
  computeCost: 410.6,
  automationCost: 247.0,
  currency: "USD",
  categories: [
    { name: "OpenAI / Claude LLM Inference", amount: 485.2, percentage: 42.4, provider: "OpenAI / Anthropic" },
    { name: "AWS / Vercel Edge Compute", amount: 410.6, percentage: 35.9, provider: "Vercel + AWS" },
    { name: "ElevenLabs Voice Stream", amount: 142.0, percentage: 12.4, provider: "ElevenLabs" },
    { name: "n8n Cloud & Microservices", amount: 105.0, percentage: 9.3, provider: "n8n + Supabase" },
  ],
};
