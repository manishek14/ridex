// src/app/en/admin/dashboard/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Card, Badge } from "@/shared/components/ui/index";
import { mockAdminStats, mockRides, mockUsers, mockTickets, mockRevenueChart } from "@/lib/mock-data";
import { formatPrice, toPersianNum, timeAgo, getRideStatusLabel } from "@/lib/utils";
import { Users, Car, TrendingUp, DollarSign, ArrowUp, LifeBuoy } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import Link from "next/link";

export default function AdminDashboardPage() {
  // ✅ دریافت locale از URL
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const isFa = locale === "fa";

  const stats = mockAdminStats;

  const statCards = [
    {
      icon: <Users size={18} />,
      label: isFa ? "کل کاربران" : "Total Users",
      value: isFa ? toPersianNum(stats.totalUsers.toLocaleString()) : stats.totalUsers.toLocaleString(),
      growth: stats.userGrowth,
      color: "text-blue-400", bg: "bg-blue-500/10",
    },
    {
      icon: <Car size={18} />,
      label: isFa ? "رانندگان فعال" : "Active Drivers",
      value: isFa ? toPersianNum(stats.activeDrivers.toLocaleString()) : stats.activeDrivers.toLocaleString(),
      growth: stats.driverGrowth,
      color: "text-green-400", bg: "bg-green-500/10",
    },
    {
      icon: <TrendingUp size={18} />,
      label: isFa ? "سفرهای امروز" : "Today's Rides",
      value: isFa ? toPersianNum(stats.todayRides.toLocaleString()) : stats.todayRides.toLocaleString(),
      growth: stats.ridesGrowth,
      color: "text-purple-400", bg: "bg-purple-500/10",
    },
    {
      icon: <DollarSign size={18} />,
      label: isFa ? "درآمد امروز" : "Today's Revenue",
      value: formatPrice(stats.todayRevenue, locale),
      growth: stats.revenueGrowth,
      color: "text-yellow-400", bg: "bg-yellow-500/10",
    },
  ];

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "داشبورد ادمین" : "Admin Dashboard"}>
      <div dir={isFa ? "rtl" : "ltr"}>
        {/* Stat cards */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
          {statCards.map((s, i) => (
            <Card key={i} hover>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
                  {s.icon}
                </div>
                <div className="flex items-center gap-1 text-green-400 text-xs font-semibold">
                  <ArrowUp size={11} />
                  {s.growth}%
                </div>
              </div>
              <div className="text-[22px] font-black text-[var(--fg)] leading-none mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {s.value}
              </div>
              <p className="text-[11px] text-[var(--fg3)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Revenue chart - 2 cols */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {isFa ? "درآمد ماهانه" : "Monthly Revenue"}
              </p>
              <span className="text-xs text-[var(--fg4)] px-2 py-1 rounded-lg bg-[var(--glass2)]">
                {isFa ? "۶ ماه اخیر" : "Last 6 months"}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={mockRevenueChart} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="adminRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--fg)" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="var(--fg)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--fg4)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "var(--bg2)", border: "1px solid var(--bdr)", borderRadius: 10, fontSize: 11 }}
                  formatter={(v: number) => [formatPrice(v, locale), isFa ? "درآمد" : "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--fg)" strokeWidth={1.5} fill="url(#adminRevGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Rides chart - 1 col */}
          <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
            <p className="text-sm font-bold text-[var(--fg)] mb-4" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "تعداد سفرها" : "Ride Volume"}
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={mockRevenueChart} barSize={18} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: "var(--fg4)" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "var(--bg2)", border: "1px solid var(--bdr)", borderRadius: 10, fontSize: 11 }}
                  formatter={(v: number) => [v.toLocaleString(), isFa ? "سفر" : "Rides"]}
                />
                <Bar dataKey="rides" radius={[4, 4, 0, 0]} fill="var(--fg)" opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent rides */}
          <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {isFa ? "آخرین سفرها" : "Recent Rides"}
              </p>
              <Link href={`/${locale}/admin/rides`} className="text-xs text-[var(--fg4)] hover:text-[var(--fg)] no-underline transition-colors">
                {isFa ? "همه" : "View all"}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {mockRides.slice(0, 4).map((ride) => {
                const st = getRideStatusLabel(ride.status, locale);
                return (
                  <div key={ride.id} className="flex items-center gap-3 py-2 border-b border-[var(--bdr)] last:border-none">
                    <div className="w-8 h-8 rounded-xl bg-[var(--glass2)] flex items-center justify-center text-sm flex-shrink-0">🚗</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-semibold text-[var(--fg)] truncate" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                        {ride.destination.address}
                      </p>
                      <p className="text-[10.5px] text-[var(--fg4)]">{timeAgo(ride.createdAt, locale)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-bold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                        {formatPrice(ride.price, locale)}
                      </p>
                      <Badge variant={ride.status === "completed" ? "green" : ride.status === "cancelled" ? "red" : "blue"} className="text-[9px]">
                        {st[locale === "fa" ? "fa" : "en"]}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Support tickets */}
          <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {isFa ? "تیکت‌های پشتیبانی" : "Support Tickets"}
              </p>
              <Link href={`/${locale}/admin/support`} className="text-xs text-[var(--fg4)] hover:text-[var(--fg)] no-underline transition-colors">
                {isFa ? "همه" : "View all"}
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {mockTickets.map((ticket) => {
                const statusMap: Record<string, { fa: string; en: string; v: "green"|"red"|"yellow"|"blue"|"default" }> = {
                  open:        { fa: "باز",          en: "Open",        v: "red"     },
                  in_progress: { fa: "در بررسی",     en: "In Progress", v: "yellow"  },
                  resolved:    { fa: "حل‌شده",       en: "Resolved",    v: "green"   },
                  closed:      { fa: "بسته",         en: "Closed",      v: "default" },
                };
                const s = statusMap[ticket.status];
                const pMap: Record<string, string> = { high: "!",  medium: "⚡", low: "·" };
                return (
                  <div key={ticket.id} className="flex items-start gap-2.5 py-2.5 border-b border-[var(--bdr)] last:border-none">
                    <div className="w-8 h-8 rounded-xl bg-[var(--glass2)] flex items-center justify-center text-sm flex-shrink-0">
                      <LifeBuoy size={14} className="text-[var(--fg3)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12.5px] font-semibold text-[var(--fg)] truncate" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                        {pMap[ticket.priority]} {ticket.subject}
                      </p>
                      <p className="text-[10.5px] text-[var(--fg4)]">{timeAgo(ticket.createdAt, locale)}</p>
                    </div>
                    <Badge variant={s.v} className="text-[9px] flex-shrink-0">
                      {isFa ? s.fa : s.en}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
