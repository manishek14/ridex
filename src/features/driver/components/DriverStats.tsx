"use client";

import { motion } from "framer-motion";
import { TrendingUp, Star, Car, Wallet } from "lucide-react";
import { useAppSelector } from "@/store";

export function DriverStats({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";
  // In a real app, these would come from the store or API
  const stats = [
    {
      label: isFa ? "درآمد امروز" : "Today's Earnings",
      value: "۴۵۰,۰۰۰",
      unit: isFa ? "تومان" : "T",
      icon: <Wallet className="text-green-500" />,
      trend: "+۱۲٪",
      color: "green",
    },
    {
      label: isFa ? "امتیاز کلی" : "Overall Rating",
      value: "۴.۹",
      unit: "/ ۵",
      icon: <Star className="text-yellow-500" />,
      trend: "عالی",
      color: "yellow",
    },
    {
      label: isFa ? "سفرهای امروز" : "Today's Rides",
      value: "۱۲",
      unit: isFa ? "سفر" : "Rides",
      icon: <Car className="text-blue-500" />,
      trend: "+۳",
      color: "blue",
    },
    {
      label: isFa ? "زمان فعالیت" : "Active Time",
      value: "۶.۵",
      unit: isFa ? "ساعت" : "Hrs",
      icon: <TrendingUp className="text-purple-500" />,
      trend: "نرمال",
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" dir={isFa ? "rtl" : "ltr"}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-5 rounded-2xl bg-[var(--bg2)] border border-[var(--bdr)] hover:border-[var(--bdr2)] transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-[var(--glass)] text-[var(--fg3)] uppercase tracking-widest">
              {stat.trend}
            </span>
          </div>
          <div>
            <p className="text-xs font-bold text-[var(--fg4)] mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {stat.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-[var(--fg4)] uppercase">
                {stat.unit}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
