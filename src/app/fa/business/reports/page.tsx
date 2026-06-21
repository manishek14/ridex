// src/app/fa/business/reports/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Users,
  DollarSign,
  PieChart,
  FileText,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";

export default function ReportsPage() {
  const [period, setPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const departments = [
    { name: "مهندسی", spent: 3420000, employees: 4 },
    { name: "بازاریابی", spent: 2800000, employees: 3 },
    { name: "منابع انسانی", spent: 1200000, employees: 2 },
    { name: "مالی", spent: 950000, employees: 2 },
    { name: "فروش", spent: 2200000, employees: 3 },
  ];

  const totalSpent = departments.reduce((sum, d) => sum + d.spent, 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[var(--fg)]">گزارش‌های سازمانی</h1>
          <p className="text-sm text-[var(--fg3)]">تحلیل هزینه‌ها و عملکرد سازمان</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-1">
            {(["monthly", "quarterly", "yearly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  period === p
                    ? "bg-[var(--fg)] text-[var(--bg)]"
                    : "text-[var(--fg3)] hover:text-[var(--fg)]"
                }`}
              >
                {p === "monthly" ? "ماهانه" : p === "quarterly" ? "فصلی" : "سالانه"}
              </button>
            ))}
          </div>
          <Button variant="ghost">
            <Download size={14} className="mr-1" />
            خروجی
          </Button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-4">
          <p className="text-xs text-[var(--fg4)]">هزینه کل</p>
          <p className="text-xl font-black text-[var(--fg)]">{totalSpent.toLocaleString()} T</p>
        </div>
        <div className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-4">
          <p className="text-xs text-[var(--fg4)]">کارمندان</p>
          <p className="text-xl font-black text-[var(--fg)]">{departments.reduce((sum, d) => sum + d.employees, 0)}</p>
        </div>
        <div className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-4">
          <p className="text-xs text-[var(--fg4)]">میانگین هزینه هر کارمند</p>
          <p className="text-xl font-black text-[var(--fg)]">{(totalSpent / departments.reduce((sum, d) => sum + d.employees, 0)).toLocaleString()} T</p>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[var(--fg3)] mb-4 flex items-center gap-2">
          <PieChart size={16} />
          هزینه بر اساس بخش
        </h3>
        <div className="space-y-3">
          {departments.map((dept, index) => {
            const percent = (dept.spent / totalSpent) * 100;
            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[var(--fg)]">{dept.name}</span>
                  <span className="text-[var(--fg3)]">
                    {dept.spent.toLocaleString()} T ({dept.employees} کارمند)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--bg3)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`h-full rounded-full ${
                      index === 0 ? "bg-blue-400" :
                      index === 1 ? "bg-purple-400" :
                      index === 2 ? "bg-cyan-400" :
                      index === 3 ? "bg-green-400" :
                      "bg-yellow-400"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}