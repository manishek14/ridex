"use client";

import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Card, Badge } from "@/shared/components/ui/index";
import { mockEmployees, mockRides } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { Users, TrendingUp, Wallet, Car } from "lucide-react";
import Link from "next/link";

export default function BusinessDashboardPage() {
  const locale = "en";
  const isFa = locale === "fa";
  const monthlyBudget = 10000000;
  const usedBudget = mockEmployees.reduce((s, e) => s + e.usedAmount, 0);
  const pct = Math.round((usedBudget / monthlyBudget) * 100);

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "داشبورد سازمانی" : "Business Dashboard"}>
      <div dir={isFa ? "rtl" : "ltr"}>
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { icon: <Users size={16} />, label: isFa ? "کارمندان فعال" : "Active Employees", value: mockEmployees.filter(e => e.isActive).length, color: "text-blue-400" },
            { icon: <Car size={16} />,   label: isFa ? "سفرهای این ماه" : "Monthly Trips",   value: mockRides.filter(r => r.status === "completed").length, color: "text-green-400" },
            { icon: <Wallet size={16} />,label: isFa ? "هزینه استفاده‌شده" : "Budget Used",   value: formatPrice(usedBudget, locale), color: "text-yellow-400" },
            { icon: <TrendingUp size={16} />, label: isFa ? "درصد مصرف" : "Budget Usage", value: `${pct}%`, color: "text-purple-400" },
          ].map((s, i) => (
            <Card key={i} hover>
              <div className={`mb-2 ${s.color}`}>{s.icon}</div>
              <div className="text-[20px] font-black text-[var(--fg)] leading-none mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {s.value}
              </div>
              <p className="text-[11px] text-[var(--fg3)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Budget bar */}
        <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "بودجه ماهانه" : "Monthly Budget"}
            </p>
            <span className="text-xs text-[var(--fg4)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {formatPrice(usedBudget, locale)} / {formatPrice(monthlyBudget, locale)}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-[var(--glass2)] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${pct > 80 ? "bg-red-400" : pct > 60 ? "bg-yellow-400" : "bg-green-400"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-[var(--fg4)]">{pct}% {isFa ? "استفاده‌شده" : "used"}</span>
            <span className="text-[10px] text-[var(--fg4)]">{100 - pct}% {isFa ? "باقی‌مانده" : "remaining"}</span>
          </div>
        </div>

        {/* Employees table */}
        <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-bold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "کارمندان" : "Employees"}
            </p>
            <Link href={`/${locale}/business/employees`} className="text-xs text-[var(--fg4)] hover:text-[var(--fg)] no-underline transition-colors">
              {isFa ? "مدیریت" : "Manage"}
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "نام" : "Name"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "بخش" : "Dept."}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "هزینه" : "Spent"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "سقف" : "Limit"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "وضعیت" : "Status"}</th>
                </tr>
              </thead>
              <tbody>
                {mockEmployees.map((emp) => {
                  const empPct = Math.round((emp.usedAmount / emp.monthlyLimit) * 100);
                  return (
                    <tr key={emp.id}>
                      <td>
                        <p className="text-[13px] font-semibold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{emp.user.name}</p>
                      </td>
                      <td className="text-[12px] text-[var(--fg3)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{emp.department}</td>
                      <td className="text-[12px]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{formatPrice(emp.usedAmount, locale)}</td>
                      <td className="text-[12px] text-[var(--fg4)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{formatPrice(emp.monthlyLimit, locale)}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-[var(--glass2)]">
                            <div
                              className={`h-full rounded-full ${empPct > 80 ? "bg-red-400" : "bg-green-400"}`}
                              style={{ width: `${empPct}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-[var(--fg4)] w-8 text-right">{empPct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
