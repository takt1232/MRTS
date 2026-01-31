"use client";

import { Team } from "@/types";
import {
  LogOut,
  LayoutDashboard,
  ClipboardList,
  Users,
  Settings,
  Plus,
  Search,
  Bell,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/(auth)/actions";
import { useState } from "react";
import MarketingDashboard from "@/components/teams/MarketingDashboard";
import SalesDashboard from "@/components/teams/SalesDashboard";
import ProductDashboard from "@/components/teams/ProductDashboard";

interface DashboardClientProps {
  team: Team;
}

export default function DashboardClient({ team }: DashboardClientProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    await logoutAction();
    router.refresh();
  };

  const renderDashboard = () => {
    const role = team.role.toLowerCase();

    if (role.includes("marketing") || role === "admin") {
      return <MarketingDashboard />;
    }
    if (role.includes("sales")) {
      return <SalesDashboard />;
    }
    if (role.includes("product")) {
      return <ProductDashboard />;
    }

    // Default to a basic view or Marketing if unknown
    return <MarketingDashboard />;
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
              <span className="text-white font-black text-xl italic tracking-tighter">
                M
              </span>
            </div>
            <span className="font-black text-2xl tracking-tighter text-gray-900">
              MRTS
            </span>
          </div>

          <nav className="space-y-1">
            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Overview"
              active
            />
            <SidebarItem icon={<ClipboardList size={18} />} label="Requests" />
            <SidebarItem icon={<Users size={18} />} label="Team" />
            <SidebarItem icon={<Settings size={18} />} label="Settings" />
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 mb-3 border border-gray-100/50">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black text-xs shadow-inner">
              {team.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-gray-900 truncate leading-none mb-1">
                {team.name}
              </p>
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none">
                {team.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <LogOut
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Find requests, assets, or projects..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-gray-100 rounded-2xl text-sm transition-all focus:ring-4 focus:ring-black/5 outline-none font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 ml-4">
            <button className="p-3 text-gray-400 hover:bg-gray-50 rounded-2xl transition-colors relative">
              <Bell size={22} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl hover:bg-gray-800 text-sm font-black transition-all shadow-xl shadow-black/10 active:scale-95">
              <Plus size={20} />
              Create New
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-10 lg:p-14">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-black/5 text-[10px] font-black uppercase tracking-widest text-gray-600 mb-6">
                Dashboard Overview
              </div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                Welcome, {team.name}
              </h1>
              <p className="text-gray-400 mt-3 text-xl font-medium max-w-2xl leading-relaxed">
                Your localized workspace for the{" "}
                <span className="text-gray-900 font-bold">{team.role}</span>{" "}
                team. Track, manage, and scale your marketing impact.
              </p>
            </div>

            <div className="relative">{renderDashboard()}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-5 py-4 text-sm font-bold rounded-2xl transition-all ${
        active
          ? "bg-black text-white shadow-xl shadow-black/20 scale-[1.02]"
          : "text-gray-500 hover:bg-gray-50 hover:text-black"
      }`}
    >
      {icon}
      {label}
    </a>
  );
}
