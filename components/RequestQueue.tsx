"use client";

import {
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Search,
  Calendar,
  User,
  Phone,
  Lock,
} from "lucide-react";
import { MarketingRequest, Team } from "@/types";

interface RequestQueueProps {
  requests: MarketingRequest[];
  team: Team;
  title?: string;
  description?: string;
}

export default function RequestQueue({
  requests,
  team,
  title = "Request Queue",
  description = "Detailed overview of all project requests.",
}: RequestQueueProps) {
  const isAdmin = team.role === "admin";
  const getStatusColor = (status: MarketingRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "approved":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "in_progress":
        return "bg-indigo-50 text-indigo-600 border-indigo-100";
      case "completed":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "rejected":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const getPriorityColor = (priority: MarketingRequest["priority"]) => {
    switch (priority) {
      case "urgent":
        return "text-rose-600 bg-rose-50";
      case "high":
        return "text-orange-600 bg-orange-50";
      case "medium":
        return "text-blue-600 bg-blue-50";
      case "low":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] shadow-sm overflow-hidden">
      <div className="px-10 py-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {description}
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search queue..."
            className="pl-11 pr-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-gray-100 rounded-2xl text-xs transition-all focus:ring-4 focus:ring-black/5 outline-none font-bold min-w-[240px]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Request Details
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Status
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Department
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Priority
              </th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Due Date
              </th>
              <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-10 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                      <Clock className="text-gray-300" size={32} />
                    </div>
                    <p className="text-gray-400 font-bold text-lg">
                      No requests found
                    </p>
                    <p className="text-gray-300 text-sm">
                      New requests will appear here once created.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-10 py-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-tighter">
                          #{request.tracking_code}
                        </span>
                        <h3 className="font-black text-gray-900 text-sm group-hover:text-black transition-colors">
                          {request.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-1">
                          <User size={12} /> {request.requester_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={12} /> {request.requester_phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(request.status)}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${request.status === "pending" ? "animate-pulse" : ""} bg-current`}
                      />
                      {request.status.replace("_", " ")}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                      {request.department}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div
                      className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getPriorityColor(request.priority)}`}
                    >
                      {request.priority}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-bold text-xs text-gray-500">
                    {request.due_date ? (
                      <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-300" />
                        {new Date(request.due_date).toLocaleDateString()}
                      </span>
                    ) : (
                      "No date set"
                    )}
                  </td>
                  <td className="px-10 py-6 text-right">
                    {!isAdmin && request.status !== "pending" ? (
                      <div
                        className="inline-flex p-2 text-gray-300 cursor-not-allowed"
                        title="Locked: Only pending requests can be edited by regular users"
                      >
                        <Lock size={18} />
                      </div>
                    ) : (
                      <button className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all text-gray-400 hover:text-gray-900 border border-transparent hover:border-gray-100">
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
