export interface ExpenseCategory {
  name: string;
  amount: number;
  percentage: number;
  provider: string;
}

export interface FinanceOverview {
  monthlyBudget: number;
  currentSpend: number;
  projectedSpend: number;
  apiTokensCost: number;
  computeCost: number;
  automationCost: number;
  currency: string;
  categories: ExpenseCategory[];
}
