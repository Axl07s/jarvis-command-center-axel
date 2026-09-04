"use client";

import React, { useState } from "react";
import { knowledgeVaultsMock, recentKnowledgeNotesMock } from "@/mocks/knowledgeMock";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatMetric } from "@/components/ui/StatMetric";
import { GlowBadge } from "@/components/ui/GlowBadge";
import {
  BookOpen,
  Search,
  Sparkles,
  Database,
  Network,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isReindexing, setIsReindexing] = useState(false);
  const [reindexProgress, setReindexProgress] = useState(0);
  const [reindexSuccess, setReindexSuccess] = useState(false);

  const handleReindex = () => {
    if (isReindexing) return;
    setIsReindexing(true);
    setReindexSuccess(false);
    setReindexProgress(15);

    const interval = setInterval(() => {
      setReindexProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsReindexing(false);
            setReindexSuccess(true);
            setReindexProgress(100);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const filteredNotes = recentKnowledgeNotesMock.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.vault.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-6">
      {/* Top Knowledge Vaults Summary */}
      <GlassCard
        headerTitle="KNOWLEDGE & RESEARCH VAULTS"
        headerTag="OBSIDIAN + VECTOR MEMORY"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatMetric
            label="INDEXED VAULTS"
            value={knowledgeVaultsMock.length}
            subtext="4 Active Obsidian Vaults"
            variant="cyan"
          />
          <StatMetric
            label="TOTAL ATOMIC NOTES"
            value="1,428"
            subtext="Markdown & Frontmatter"
            variant="violet"
          />
          <StatMetric
            label="EMBEDDING VECTORS"
            value="14,280"
            subtext="pgvector / Supabase"
            variant="cyan"
          />
          <StatMetric
            label="GRAPH DENSITY"
            value="8.4 links/note"
            subtext="Semantic Knowledge Graph"
            variant="violet"
          />
        </div>
      </GlassCard>

      {/* Main Knowledge Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Notes Stream & Vault Directory */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard
            headerTitle="INDEXED KNOWLEDGE ARTIFACTS"
            headerTag={`${filteredNotes.length} MATCHING NOTES`}
          >
            <div className="space-y-4 font-mono text-xs">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] hover:border-[#00E5FF]/30 transition-all shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 text-sm font-bold text-[#00E5FF]">
                      <BookOpen className="w-4 h-4 shrink-0" />
                      <span>{note.title}</span>
                    </div>
                    <span className="text-[10px] text-[#D8B4FE] px-2 py-0.5 rounded bg-[rgba(123,44,191,0.15)] border border-[rgba(123,44,191,0.3)] uppercase shrink-0">
                      {note.vault}
                    </span>
                  </div>

                  <p className="text-xs text-[#E2E8F0]/70 mt-2 font-sans">
                    {note.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between mt-4 pt-2 border-t border-[rgba(0,229,255,0.06)] text-[11px] text-[#A5F3FC]/50 gap-2">
                    <span className="flex items-center space-x-1 text-[#00E5FF]">
                      <Network className="w-3.5 h-3.5" />
                      <span>{note.linkedConcepts} Concepts Mapped</span>
                    </span>
                    <span>Last synchronized: {note.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Semantic Query & Interactive Re-indexing Interface */}
        <div className="lg:col-span-1">
          <GlassCard
            headerTitle="VECTOR MEMORY QUERY"
            headerTag="SEMANTIC BUS"
          >
            <div className="space-y-4 font-mono text-xs">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search neural memory & vaults..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[rgba(0,229,255,0.04)] border border-[rgba(0,229,255,0.2)] text-[#E2E8F0] placeholder-[#A5F3FC]/30 text-xs focus:outline-none focus:border-[#00E5FF] shadow-inner"
                />
                <Search className="w-4 h-4 text-[#00E5FF] absolute left-3 top-3" />
              </div>

              <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.02)] border border-[rgba(0,229,255,0.08)] space-y-2">
                <div className="flex items-center space-x-1.5 text-[10px] text-[#00E5FF] uppercase font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TOP SEMANTIC MATCH (0.941 SIMILARITY)</span>
                </div>
                <div className="font-semibold text-[#E2E8F0]">
                  Jarvis Multi-Agent Bus Consensus Protocol v2
                </div>
                <p className="text-[11px] text-[#A5F3FC]/60">
                  Defines zero-trust state verification across the 9 agents before committing writes to Supabase.
                </p>
              </div>

              {/* Interactive Re-indexing Feedback Section */}
              <div className="space-y-2 pt-2 border-t border-[rgba(0,229,255,0.08)]">
                {isReindexing && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] text-[#00E5FF]">
                      <span className="flex items-center space-x-1">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>INDEXING 1,428 NODES...</span>
                      </span>
                      <span className="font-bold">{reindexProgress}%</span>
                    </div>
                    <div className="w-full bg-[rgba(255,255,255,0.05)] h-2 rounded-full overflow-hidden border border-[rgba(0,229,255,0.2)]">
                      <div
                        className="h-full bg-gradient-to-r from-[#00E5FF] to-[#7B2CBF] transition-all duration-200"
                        style={{ width: `${reindexProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {reindexSuccess && !isReindexing && (
                  <div className="p-2.5 rounded-lg bg-[rgba(16,185,129,0.1)] border border-[#10B981]/40 text-[#10B981] flex items-center space-x-2 text-[11px] animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>VAULT RE-INDEXED: 1,428 NOTES & VECTORS IN SYNC</span>
                  </div>
                )}

                <button
                  onClick={handleReindex}
                  disabled={isReindexing}
                  className="w-full py-2.5 rounded-lg bg-[rgba(0,229,255,0.12)] border border-[rgba(0,229,255,0.4)] text-[#00E5FF] font-semibold hover:bg-[rgba(0,229,255,0.25)] transition-all shadow-[0_0_15px_rgba(0,229,255,0.2)] cursor-pointer disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isReindexing ? "animate-spin" : ""}`} />
                  <span>{isReindexing ? "RE-INDEXING IN PROGRESS..." : "RE-INDEX KNOWLEDGE VAULT"}</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
