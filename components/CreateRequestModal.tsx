"use client";

import { useState } from "react";
import { X, Loader2, Send } from "lucide-react";
import { createRequestAction } from "@/app/dashboard/actions";
import { Team } from "@/types";

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team;
}

export default function CreateRequestModal({
  isOpen,
  onClose,
  team,
}: CreateRequestModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createRequestAction(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      onClose();
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="px-8 py-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Create New Request
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              Standardize your request for the {team.name} team.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:shadow-md rounded-full transition-all text-gray-400 hover:text-gray-900"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 text-black">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Requester Name
              </label>
              <input
                required
                name="requester_name"
                defaultValue={team.name}
                className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-gray-100 rounded-2xl text-sm transition-all focus:ring-4 focus:ring-black/5 outline-none font-bold"
                placeholder="Who is requesting?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Contact Phone
              </label>
              <input
                required
                name="requester_phone"
                className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-gray-100 rounded-2xl text-sm transition-all focus:ring-4 focus:ring-black/5 outline-none font-bold"
                placeholder="Phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Project Title
            </label>
            <input
              required
              name="title"
              className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-gray-100 rounded-2xl text-sm transition-all focus:ring-4 focus:ring-black/5 outline-none font-bold"
              placeholder="e.g. Q1 Campaign Social Assets"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Description & Details
            </label>
            <textarea
              required
              name="description"
              rows={4}
              className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-gray-100 rounded-2xl text-sm transition-all focus:ring-4 focus:ring-black/5 outline-none font-medium resize-none"
              placeholder="Describe what you need, goals, and target audience..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Priority Level
              </label>
              <select
                name="priority"
                className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-gray-100 rounded-2xl text-sm transition-all focus:ring-4 focus:ring-black/5 outline-none font-bold appearance-none cursor-pointer"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                className="w-full px-5 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-gray-100 rounded-2xl text-sm transition-all focus:ring-4 focus:ring-black/5 outline-none font-bold appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-[10px] font-black uppercase tracking-widest text-emerald-600">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Auto-stamped: {team.code}
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 text-sm font-black transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Send size={20} />
              )}
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
