"use client";

import { Target, Users, Zap, FileText } from "lucide-react";
import StatCard from "@/components/StatCard";

export default function SalesDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Leads"
          value="42"
          trend="+8 this week"
          icon={<Target className="text-indigo-500" size={20} />}
          bgColor="bg-indigo-50"
        />
        <StatCard
          title="Collateral Requests"
          value="7"
          trend="3 urgent"
          icon={<FileText className="text-orange-500" size={20} />}
          bgColor="bg-orange-50"
        />
        <StatCard
          title="Conversion Rate"
          value="18%"
          trend="+2% vs last month"
          icon={<Zap className="text-yellow-500" size={20} />}
          bgColor="bg-yellow-50"
        />
        <StatCard
          title="Team Members"
          value="12"
          icon={<Users className="text-slate-500" size={20} />}
          bgColor="bg-slate-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Recent Sales Requests
          </h2>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">
            Sales Resources
          </h2>
          <ul className="space-y-4">
            {[
              "Brand Guidelines",
              "Pricing Models",
              "Product One-Pagers",
              "Customer Success Stories",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <FileText size={16} className="text-gray-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
