"use client";

import React, { useState } from "react";
import { SidebarNav } from "./SidebarNav";
import { HeaderHUD } from "./HeaderHUD";
import { FooterHUD } from "./FooterHUD";
import { Menu, X } from "lucide-react";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#02040a] text-[#E2E8F0] flex flex-col font-sans relative overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-[#00E5FF]">
      {/* Sci-Fi Background Glow Elements */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none -z-10 [transform:translateZ(0)] [contain:strict]" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7B2CBF]/8 rounded-full blur-[100px] pointer-events-none -z-10 [transform:translateZ(0)] [contain:strict]" />

      {/* Header HUD */}
      <HeaderHUD />

      {/* Main Wrapper */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <SidebarNav />
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-16 right-4 z-50 p-3 rounded-full bg-[#02040a]/95 border border-[#00E5FF]/60 text-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.5)] backdrop-blur-md cursor-pointer hover:bg-[rgba(0,229,255,0.2)] transition-all"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-[#02040a]/90 backdrop-blur-md flex">
            <div className="w-72 max-w-[80vw] h-full">
              <SidebarNav onItemClick={() => setMobileMenuOpen(false)} />
            </div>
            <div
              className="flex-1 h-full"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-32 sm:pb-28 lg:pb-8 space-y-6 [transform:translateZ(0)] [will-change:scroll-position]">
          {children}
        </main>
      </div>

      {/* Footer HUD */}
      <FooterHUD />
    </div>
  );
};
