"use client";

import { Package, Rocket, Layers, BarChart3 } from "lucide-react";
import StatCard from "@/components/StatCard";
import RequestQueue from "@/components/RequestQueue";
import { MarketingRequest, Team } from "@/types";

interface ProductDashboardProps {
  requests: MarketingRequest[];
  team: Team;
}

export default function ProductDashboard({
  requests,
  team,
}: ProductDashboardProps) {
  const pending = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Product Launches"
          value="3"
          trend="Next: Q3 Launch"
          icon={<Rocket className="text-purple-500" size={20} />}
          bgColor="bg-purple-50"
        />
        <StatCard
          title="Active Requests"
          value={pending.toString()}
          trend="Pending review"
          icon={<Layers className="text-blue-500" size={20} />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Design Assets"
          value="56"
          trend="Last updated 2h ago"
          icon={<Package className="text-cyan-500" size={20} />}
          bgColor="bg-cyan-50"
        />
        <StatCard
          title="Market Reach"
          value="14k"
          trend="+12% retention"
          icon={<BarChart3 className="text-emerald-500" size={20} />}
          bgColor="bg-emerald-50"
        />
      </div>

      <RequestQueue
        requests={requests}
        team={team}
        title="Product Launch Requests"
        description="Manage assets and requests for upcoming product launches."
      />
    </div>
  );
}
