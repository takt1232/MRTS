"use client";

import { Package, Rocket, Layers, BarChart3 } from "lucide-react";
import StatCard from "@/components/StatCard";

export default function ProductDashboard() {
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
          title="Feature Requests"
          value="18"
          trend="+4 since Monday"
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

      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Product Assets</h2>
            <p className="text-sm text-gray-500">
              Manage assets and requests for upcoming product launches.
            </p>
          </div>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Manage Folders
          </button>
        </div>
      </div>
    </div>
  );
}
