"use client";

import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Card } from "@/shared/components/ui/index";
import { formatPrice } from "@/lib/utils";
import { mockDriverEarnings, mockRides } from "@/lib/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

export default function DriverEarningsPage() {
  const locale = "fa";
  const isFa = locale === "fa";

  const totalMonth = mockDriverEarnings.reduce((s, w) => s + w.earnings, 0);
  const completedRides = mockRides.filter((r) => r.status === "completed");

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "درآمد" : "Earnings"}>
      <div className="max-w-2xl" dir={isFa ? "rtl" : "ltr"}>
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: isFa ? "درآمد این ماه" : "This Month", value: formatPrice(totalMonth, locale), trend: "+18%" },
            { label: isFa ? "سفرهای موفق" : "Completed Rides", value: isFa ? `${completedRides.length} سفر` : `${completedRides.length} rides`, trend: "+12%" },
            { label: isFa ? "میانگین سفر" : "Avg per Ride", value: formatPrice(Math.round(totalMonth / Math.max(completedRides.length, 1)), locale), trend: "+5%" },
          ].map((s, i) => (
            <Card key={i} hover>
              <p className="text-[11px] text-[var(--fg4)] mb-2" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{s.label}</p>
              <p className="text-[18px] font-black text-[var(--fg)] leading-none mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{s.value}</p>
              <div className="flex items-center gap-1 text-green-400">
                <TrendingUp size={11} />
                <span className="text-[10px] font-semibold">{s.trend}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] mb-6">
          <p className="text-sm font-bold text-[var(--fg)] mb-4" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "درآمد هفتگی" : "Weekly Breakdown"}
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockDriverEarnings} barSize={32} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--fg4)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "var(--bg2)", border: "1px solid var(--bdr)", borderRadius: 10, fontSize: 12 }}
                formatter={(v: number) => [formatPrice(v, locale), isFa ? "درآمد" : "Earnings"]}
              />
              <Bar dataKey="earnings" radius={[8, 8, 0, 0]}>
                {mockDriverEarnings.map((_, i) => (
                  <Cell key={i} fill={i === mockDriverEarnings.length - 1 ? "var(--fg)" : "var(--glass2)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ride breakdown */}
        <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
          <p className="text-sm font-bold text-[var(--fg)] mb-4" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "آخرین سفرها" : "Recent Trips"}
          </p>
          <div className="flex flex-col gap-2">
            {completedRides.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2.5 border-b border-[var(--bdr)] last:border-none">
                <div>
                  <p className="text-[13px] font-semibold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                    {r.destination.address}
                  </p>
                  <p className="text-[11px] text-[var(--fg4)]">{r.distance} km · {r.duration} min</p>
                </div>
                <p className="text-[14px] font-extrabold text-green-400" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                  +{formatPrice(Math.round(r.price * 0.8), locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
