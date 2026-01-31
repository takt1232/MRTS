"use client";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  bgColor: string;
}

export default function StatCard({
  title,
  value,
  trend,
  icon,
  bgColor,
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`p-3 ${bgColor} rounded-xl group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        {trend && (
          <span
            className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              trend.includes("+")
                ? "bg-emerald-50 text-emerald-600"
                : trend.includes("-")
                  ? "bg-rose-50 text-rose-600"
                  : "bg-gray-50 text-gray-600"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
        <p className="text-3xl font-black text-gray-900 tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
