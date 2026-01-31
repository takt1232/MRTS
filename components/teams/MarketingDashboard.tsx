"use client";

import { Clock, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import StatCard from "@/components/StatCard";
import RequestQueue from "@/components/RequestQueue";
import { MarketingRequest, Team } from "@/types";

interface MarketingDashboardProps {
  requests: MarketingRequest[];
  team: Team;
}

export default function MarketingDashboard({
  requests,
  team,
}: MarketingDashboardProps) {
  const pending = requests.filter((r) => r.status === "pending").length;
  const inProgress = requests.filter((r) => r.status === "in_progress").length;
  const completed = requests.filter((r) => r.status === "completed").length;
  const urgent = requests.filter((r) => r.priority === "urgent").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="All Pending"
          value={pending.toString()}
          trend={`${
            requests.filter((r) => {
              const today = new Date().toISOString().split("T")[0];
              return r.created_at.startsWith(today);
            }).length
          } new today`}
          icon={<Clock className="text-amber-500" size={20} />}
          bgColor="bg-amber-50"
        />
        <StatCard
          title="In Progress"
          value={inProgress.toString()}
          trend={`${requests.filter((r) => r.priority === "high").length} high priority`}
          icon={<TrendingUp className="text-blue-500" size={20} />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Completed"
          value={completed.toString()}
          trend="Total delivered"
          icon={<CheckCircle2 className="text-emerald-500" size={20} />}
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Urgent Tasks"
          value={urgent.toString()}
          trend="Immediate action"
          icon={<AlertCircle className="text-rose-500" size={20} />}
          bgColor="bg-rose-50"
        />
      </div>

      <RequestQueue
        requests={requests}
        team={team}
        title="Global Request Queue"
        description="Manage and assign marketing requests from all teams."
      />
    </div>
  );
}
