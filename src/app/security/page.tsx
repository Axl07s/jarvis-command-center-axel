"use client";

import React, { useState } from "react";
import { securityStatusMock } from "@/mocks/securityMock";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowBadge } from "@/components/ui/GlowBadge";
import { StatMetric } from "@/components/ui/StatMetric";
import { ShieldCheck, Key, Lock, AlertCircle, RefreshCw, Search, Shield, Filter } from "lucide-react";

export default function SecurityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"ALL" | "AI" | "OPS" | "INFRA">("ALL");

  const filteredCredentials = securityStatusMock.credentials.filter((cred) => {
    const matchesSearch =
      cred.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cred.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cred.scope.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === "AI") {
      return (
        cred.service.includes("ElevenLabs") ||
        cred.service.includes("OpenAI") ||
        cred.service.includes("Anthropic") ||
        cred.service.includes("DeepSeek")
      );
    }
    if (activeCategory === "OPS") {
      return (
        cred.service.includes("Shopify") ||
        cred.service.includes("n8n") ||
        cred.service.includes("Obsidian") ||
        cred.service.includes("GitHub")
      );
    }
    if (activeCategory === "INFRA") {
      return (
        cred.service.includes("Supabase") ||
        cred.service.includes("Vercel") ||
        cred.service.includes("Docker") ||
        cred.service.includes("Tailscale")
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-6">
      {/* Top Security Banner */}
      <GlassCard
        headerTitle="SECURITY POSTURE & CREDENTIAL STATUS"
        headerTag="ZERO-TRUST ACTIVE"
        variant="glow-cyan"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatMetric
            label="SYSTEM POSTURE"
            value="SECURE"
            subtext="Zero-Trust Perimeter"
            variant="cyan"
          />
          <StatMetric
            label="ACTIVE CREDENTIALS"
            value="12 / 12"
            subtext="Vaulted & Health Checked"
            variant="violet"
          />
          <StatMetric
            label="KEYS ROTATING SOON"
            value={securityStatusMock.credentialsExpiringSoon}
            subtext="Shopify Token (3d)"
            variant="cyan"
          />
          <StatMetric
            label="MFA & TLS ENFORCEMENT"
            value="100%"
            subtext="Hardware Keys & mTLS"
            variant="violet"
          />
        </div>
      </GlassCard>

      {/* Credentials Table & Audit Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard
            headerTitle="MANAGED SERVER-SIDE SECRETS"
            headerTag="12 VAULTED KEYS"
          >
            <div className="space-y-3 font-mono text-xs">
              {/* Filter Controls & Search */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[rgba(0,229,255,0.1)]">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setActiveCategory("ALL")}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeCategory === "ALL"
                        ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                        : "text-[#A5F3FC]/50 hover:text-[#A5F3FC]"
                    }`}
                  >
                    ALL (12)
                  </button>
                  <button
                    onClick={() => setActiveCategory("AI")}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeCategory === "AI"
                        ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                        : "text-[#A5F3FC]/50 hover:text-[#A5F3FC]"
                    }`}
                  >
                    AI & CORE (4)
                  </button>
                  <button
                    onClick={() => setActiveCategory("OPS")}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeCategory === "OPS"
                        ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                        : "text-[#A5F3FC]/50 hover:text-[#A5F3FC]"
                    }`}
                  >
                    OPERATIONS (4)
                  </button>
                  <button
                    onClick={() => setActiveCategory("INFRA")}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeCategory === "INFRA"
                        ? "bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                        : "text-[#A5F3FC]/50 hover:text-[#A5F3FC]"
                    }`}
                  >
                    INFRASTRUCTURE (4)
                  </button>
                </div>

                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 text-[#00E5FF] absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search secrets..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[rgba(2,4,10,0.8)] border border-[rgba(0,229,255,0.2)] text-[11px] text-[#E2E8F0] placeholder-[#A5F3FC]/40 focus:outline-none focus:border-[#00E5FF]"
                  />
                </div>
              </div>

              <p className="text-[10px] text-[#A5F3FC]/50">
                * Note: Real API keys and credentials are encrypted in server-side environment variables and are never rendered on the client.
              </p>

              {/* List of 12 Credentials */}
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {filteredCredentials.map((cred) => (
                  <div
                    key={cred.id}
                    className="p-2.5 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] hover:border-[rgba(0,229,255,0.3)] transition-all flex flex-wrap items-center justify-between gap-2"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <Key className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                      <div className="truncate">
                        <div className="font-semibold text-[#E2E8F0] truncate">{cred.name}</div>
                        <div className="text-[10px] text-[#A5F3FC]/50 truncate">
                          {cred.service} · Scope: {cred.scope}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0 ml-auto sm:ml-0">
                      <span className="text-[10px] text-[#A5F3FC]/60">
                        Rotated: {cred.lastRotated}
                      </span>
                      <GlowBadge
                        label={cred.status === "valid" ? "ACTIVE" : "EXPIRING"}
                        variant={cred.status === "valid" ? "cyan" : "violet"}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Security Audit Stream */}
        <div className="lg:col-span-1">
          <GlassCard
            headerTitle="IMMUTABLE AUDIT LOG"
            headerTag="LIVE STREAM"
          >
            <div className="space-y-3 font-mono text-xs">
              {securityStatusMock.recentAudits.map((aud) => (
                <div
                  key={aud.id}
                  className="p-2.5 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.06)] space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-[#00E5FF]">
                    <span className="font-bold">{aud.eventType}</span>
                    <span className="text-[#A5F3FC]/50">{aud.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-[#E2E8F0]/70">{aud.details}</p>
                  <div className="text-[9px] text-[#7B2CBF]">
                    Source: {aud.sourceIp}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
