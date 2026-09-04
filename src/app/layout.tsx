import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "JARVIS Command Center | Autonomous Operations",
  description:
    "Premium futuristic Jarvis AI command-center frontend with Chief Brain neural core and multi-agent telemetry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#02040a] min-h-screen text-[#E2E8F0]">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
