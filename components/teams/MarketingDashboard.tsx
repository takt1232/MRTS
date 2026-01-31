"use client";

import { Clock, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react";
import StatCard from "@/components/StatCard";

export default function MarketingDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="All Pending"
          value="24"
          trend="+5 new today"
          icon={<Clock className="text-amber-500" size={20} />}
          bgColor="bg-amber-50"
        />
        <StatCard
          title="In Progress"
          value="15"
          trend="8 priority"
          icon={<TrendingUp className="text-blue-500" size={20} />}
          bgColor="bg-blue-50"
        />
        <StatCard
          title="Completed"
          value="128"
          trend="+12% this week"
          icon={<CheckCircle2 className="text-emerald-500" size={20} />}
          bgColor="bg-emerald-50"
        />
        <StatCard
          title="Triage Needed"
          value="4"
          trend="High priority"
          icon={<AlertCircle className="text-rose-500" size={20} />}
          bgColor="bg-rose-50"
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Global Request Queue
            </h2>
            <p className="text-sm text-gray-500">
              Manage and assign marketing requests from all teams.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
