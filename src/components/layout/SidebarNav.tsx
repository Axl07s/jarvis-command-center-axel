"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { jarvisConfig } from "@/config/jarvis.config";
import { cn } from "@/lib/utils";
import {
  Brain,
  Network,
  CheckSquare,
  DollarSign,
  BookOpen,
  Shield,
  Volume2,
  Terminal,
} from "lucide-react";

export const SidebarNav: React.FC<{ onItemClick?: () => void }> = ({
  onItemClick,
}) => {
  const pathname = usePathname();
  const { pendingApprovalsCount } = useApp();

  const navItems = [
    {
      name: jarvisConfig.modules.chiefBrain.name,
      href: jarvisConfig.modules.chiefBrain.route,
      icon: <Brain className="w-4 h-4" />,
      badge: jarvisConfig.modules.chiefBrain.badge,
      enabled: jarvisConfig.modules.chiefBrain.enabled,
    },
    {
      name: jarvisConfig.modules.agentNetwork.name,
      href: jarvisConfig.modules.agentNetwork.route,
      icon: <Network className="w-4 h-4" />,
      badge: jarvisConfig.modules.agentNetwork.badge,
      enabled: jarvisConfig.modules.agentNetwork.enabled,
    },
    {
      name: jarvisConfig.modules.approvals.name,
      href: jarvisConfig.modules.approvals.route,
      icon: <CheckSquare className="w-4 h-4" />,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} PENDING` : "CLEARED",
      badgeVariant: pendingApprovalsCount > 0 ? "warning" : "nominal",
      enabled: jarvisConfig.modules.approvals.enabled,
    },
    {
      name: jarvisConfig.modules.finance.name,
      href: jarvisConfig.modules.finance.route,
      icon: <DollarSign className="w-4 h-4" />,
      enabled: jarvisConfig.modules.finance.enabled,
    },
    {
      name: jarvisConfig.modules.knowledge.name,
      href: jarvisConfig.modules.knowledge.route,
      icon: <BookOpen className="w-4 h-4" />,
      enabled: jarvisConfig.modules.knowledge.enabled,
    },
    {
      name: jarvisConfig.modules.security.name,
      href: jarvisConfig.modules.security.route,
      icon: <Shield className="w-4 h-4" />,
      badge: jarvisConfig.modules.security.badge,
      enabled: jarvisConfig.modules.security.enabled,
    },
    {
      name: jarvisConfig.modules.voice.name,
      href: jarvisConfig.modules.voice.route,
      icon: <Volume2 className="w-4 h-4" />,
      badge: "TTS READY",
      enabled: jarvisConfig.modules.voice.enabled,
    },
  ].filter((item) => item.enabled !== false);

  return (
    <aside className="w-full lg:w-64 flex flex-col justify-between h-full bg-[#02040a]/90 backdrop-blur-xl border-r border-[rgba(0,229,255,0.15)] p-4 select-none">
      {/* Brand Header */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 px-2 py-1">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[#00E5FF]/40 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
            <Terminal className="w-4 h-4 text-[#00E5FF]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF] animate-ping" />
          </div>
          <div>
            <h1 className="text-sm font-mono font-bold tracking-widest text-[#E2E8F0] uppercase">
              {jarvisConfig.system.name}
            </h1>
            <p className="text-[10px] font-mono text-[#00E5FF] tracking-wider">
              {jarvisConfig.system.clusterId} · v{jarvisConfig.system.version}
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="text-[10px] font-mono font-semibold tracking-widest text-[#A5F3FC]/40 uppercase px-3 py-1">
            NAVIGATION MODULES
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onItemClick}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-lg font-mono text-xs font-medium tracking-wider transition-all duration-200 group",
                    isActive
                      ? "bg-[rgba(0,229,255,0.12)] text-[#00E5FF] border border-[rgba(0,229,255,0.4)] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                      : "text-[#E2E8F0]/70 hover:text-[#A5F3FC] hover:bg-[rgba(0,229,255,0.05)] border border-transparent"
                  )}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <span
                      className={cn(
                        "transition-transform duration-200 group-hover:scale-110",
                        isActive ? "text-[#00E5FF]" : "text-[#A5F3FC]/60"
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "text-[9px] font-mono tracking-widest px-1.5 py-0.5 rounded uppercase shrink-0 transition-colors",
                        item.badgeVariant === "warning"
                          ? "bg-[rgba(123,44,191,0.2)] text-[#D8B4FE] border border-[rgba(123,44,191,0.5)] shadow-[0_0_8px_rgba(123,44,191,0.3)]"
                          : isActive
                          ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40"
                          : "bg-[rgba(255,255,255,0.04)] text-[#A5F3FC]/50 border border-[rgba(0,229,255,0.1)]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="pt-4 border-t border-[rgba(0,229,255,0.1)] space-y-2">
        <div className="p-2.5 rounded-lg bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.1)] text-xs font-mono">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#A5F3FC]/60">BACKEND STATE</span>
            <span className="text-[#00E5FF] font-semibold flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
              <span>MOCK READY</span>
            </span>
          </div>
          <p className="text-[10px] text-[#E2E8F0]/40 mt-1">
            Contracts decoupled in /types & /mocks
          </p>
        </div>
      </div>
    </aside>
  );
};
