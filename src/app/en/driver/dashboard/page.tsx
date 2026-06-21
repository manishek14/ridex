"use client";

import { useEffect } from "react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Card, Badge } from "@/shared/components/ui/index";
import { useAppDispatch, useAppSelector } from "@/store";
import { setDriverProfile, setDriverStatus, setTodayStats } from "@/store/slices/driverSlice";
import { mockDrivers } from "@/lib/mock-data";
import { formatPrice, toPersianNum } from "@/lib/utils";
import { TrendingUp, Star, Car, Clock, Power, Navigation } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { mockDriverEarnings } from "@/lib/mock-data";
import type { DriverStatus } from "@/types";

const statusConfig = {
  online:  { label: { fa: "آنلاین",    en: "Online"  }, color: "green"  },
  offline: { label: { fa: "آفلاین",    en: "Offline" }, color: "default"},
  busy:    { label: { fa: "در سفر",   en: "On Ride" }, color: "blue"   },
} as const;

export default function DriverDashboard() {
  const locale = "en";
  const isFa = locale === "fa";
  const dispatch = useAppDispatch();
  const driver = useAppSelector((s) => s.driver);

  useEffect(() => {
    if (!driver.profile) {
      dispatch(setDriverProfile(mockDrivers[0]));
      dispatch(setTodayStats({ earnings: 1840000, rides: 9 }));
    }
  }, [dispatch, driver.profile]);

  const toggleStatus = () => {
    const next: DriverStatus = driver.status === "online" ? "offline" : "online";
    dispatch(setDriverStatus(next));
  };

  const stats = [
    { icon: <TrendingUp size={16} />, label: isFa ? "درآمد امروز" : "Today Earnings", value: formatPrice(driver.todayEarnings, locale), color: "text-green-400" },
    { icon: <Car         size={16} />, label: isFa ? "سفرهای امروز" : "Today Rides",    value: isFa ? toPersianNum(driver.todayRides) : driver.todayRides, color: "text-blue-400" },
    { icon: <Star        size={16} />, label: isFa ? "امتیاز"        : "Rating",         value: `★ ${driver.profile?.rating ?? "—"}`,  color: "text-yellow-400" },
    { icon: <Clock       size={16} />, label: isFa ? "آنلاین امروز"  : "Online Today",   value: isFa ? "۶ ساعت" : "6h",               color: "text-purple-400" },
  ];

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "داشبورد راننده" : "Driver Dashboard"}>
      <div dir={isFa ? "rtl" : "ltr"}>
        {/* Online/Offline toggle */}
        <div className="flex items-center justify-between mb-6 p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
          <div>
            <p className="text-sm font-bold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "وضعیت" : "Status"}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={statusConfig[driver.status].color as "green" | "default" | "blue"} dot>
                {isFa ? statusConfig[driver.status].label.fa : statusConfig[driver.status].label.en}
              </Badge>
              {driver.status === "online" && (
                <span className="text-xs text-[var(--fg4)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                  {isFa ? "در انتظار سفر جدید..." : "Waiting for rides..."}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={toggleStatus}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              driver.status === "online"
                ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                : "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
            }`}
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            <Power size={14} />
            {driver.status === "online"
              ? (isFa ? "آفلاین شو" : "Go Offline")
              : (isFa ? "آنلاین شو" : "Go Online")}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((s, i) => (
            <Card key={i} hover>
              <div className={`mb-2 ${s.color}`}>{s.icon}</div>
              <div className="text-[22px] font-black text-[var(--fg)] leading-none mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {s.value}
              </div>
              <p className="text-[11px] text-[var(--fg3)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Earnings chart */}
        <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] mb-6">
          <p className="text-sm font-bold text-[var(--fg)] mb-4" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "درآمد هفتگی" : "Weekly Earnings"}
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={mockDriverEarnings} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--fg)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="var(--fg)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--fg4)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ background: "var(--bg2)", border: "1px solid var(--bdr)", borderRadius: 10, fontSize: 12 }}
                labelStyle={{ color: "var(--fg3)" }}
                formatter={(v: number) => [formatPrice(v, locale), isFa ? "درآمد" : "Earnings"]}
              />
              <Area type="monotone" dataKey="earnings" stroke="var(--fg)" strokeWidth={1.5} fill="url(#earningsGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle info */}
        {driver.profile && (
          <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
            <p className="text-sm font-bold text-[var(--fg)] mb-4" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "مشخصات خودرو" : "Vehicle Info"}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: isFa ? "مدل" : "Model", value: `${driver.profile.vehicle.make} ${driver.profile.vehicle.model}` },
                { label: isFa ? "سال" : "Year", value: driver.profile.vehicle.year.toString() },
                { label: isFa ? "پلاک" : "Plate", value: driver.profile.vehicle.plate },
                { label: isFa ? "رنگ" : "Color", value: driver.profile.vehicle.color },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-xl bg-[var(--glass2)]">
                  <p className="text-[10px] text-[var(--fg4)] mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{item.label}</p>
                  <p className="text-sm font-semibold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
