"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { approvalsMock } from "@/mocks/approvalsMock";
import { ApprovalItem } from "@/types/approvals";

interface AppContextType {
  approvals: ApprovalItem[];
  pendingApprovalsCount: number;
  resolveApproval: (id: string, action: "approved" | "rejected") => void;
  resetApprovals: () => void;
  isImmersiveOpen: boolean;
  setIsImmersiveOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [approvals, setApprovals] = useState<ApprovalItem[]>(approvalsMock);
  const [isImmersiveOpen, setIsImmersiveOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted approvals from localStorage on mount
  useEffect(() => {
    try {
      const savedApprovals = localStorage.getItem("jarvis_approvals_state");
      if (savedApprovals) {
        setApprovals(JSON.parse(savedApprovals));
      }
    } catch {}
    setIsHydrated(true);
  }, []);

  // Persist approvals to localStorage whenever changed
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("jarvis_approvals_state", JSON.stringify(approvals));
      } catch {}
    }
  }, [approvals, isHydrated]);

  const resolveApproval = (id: string, action: "approved" | "rejected") => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action } : item))
    );
  };

  const resetApprovals = () => {
    setApprovals(approvalsMock);
    try {
      localStorage.removeItem("jarvis_approvals_state");
    } catch {}
  };

  const pendingApprovalsCount = approvals.filter((i) => i.status === "pending").length;

  return (
    <AppContext.Provider
      value={{
        approvals,
        pendingApprovalsCount,
        resolveApproval,
        resetApprovals,
        isImmersiveOpen,
        setIsImmersiveOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
