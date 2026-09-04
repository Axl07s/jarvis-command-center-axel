import React from "react";
import { ShopifyPerformanceData } from "@/types/widgets";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatMetric } from "@/components/ui/StatMetric";
import { ShoppingBag, RefreshCw } from "lucide-react";

interface ShopifyWidgetProps {
  data: ShopifyPerformanceData;
  className?: string;
}

export const ShopifyWidget: React.FC<ShopifyWidgetProps> = ({
  data,
  className,
}) => {
  return (
    <GlassCard
      headerTitle="SHOPIFY COMMERCE TELEMETRY"
      headerTag="REAL-TIME SYNC"
      className={className}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <StatMetric
          label="DAILY REVENUE"
          value={`$${data.dailyRevenue.toLocaleString()}`}
          subtext={`${data.orderCount} Orders Today`}
          variant="cyan"
        />
        <StatMetric
          label="CONVERSION"
          value={`${data.conversionRate}%`}
          subtext="Storefront Average"
          variant="violet"
        />
        <StatMetric
          label="ABANDONMENT"
          value={`${data.cartAbandonmentRate}%`}
          subtext="Cart Funnel"
          variant="cyan"
        />
        <StatMetric
          label="ACTIVE SESSIONS"
          value={data.activeSessions}
          subtext="Live Shoppers"
          variant="violet"
        />
      </div>

      <div className="mt-3 pt-2.5 border-t border-[rgba(0,229,255,0.08)] flex items-center justify-between text-xs font-mono text-[#A5F3FC]/70">
        <div className="flex items-center space-x-1.5">
          <ShoppingBag className="w-3.5 h-3.5 text-[#00E5FF]" />
          <span>STORE STATUS: <strong className="text-[#00E5FF]">ONLINE & SYNCED</strong></span>
        </div>
        <div className="flex items-center space-x-1 text-[10px] text-[#A5F3FC]/50">
          <RefreshCw className="w-3 h-3 animate-spin text-[#00E5FF]" />
          <span>Polling interval: 30s</span>
        </div>
      </div>
    </GlassCard>
  );
};
