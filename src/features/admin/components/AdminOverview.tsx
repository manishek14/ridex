"use client";

import { motion } from "motion/react";
import { Users, Car, MapPin, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function AdminOverview({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";

  const stats = [
    { label: isFa ? "کل کاربران" : "Total Users", value: "۱۲,۸۴۰", trend: "+۱۲٪", isUp: true, icon: <Users size={20} />, color: "blue" },
    { label: isFa ? "رانندگان آنلاین" : "Active Drivers", value: "۸۵۰", trend: "+۵٪", isUp: true, icon: <Car size={20} />, color: "green" },
    { label: isFa ? "سفرهای در جریان" : "Live Rides", value: "۳۴۲", trend: "-۲٪", isUp: false, icon: <MapPin size={20} />, color: "purple" },
    { label: isFa ? "درآمد امروز" : "Daily Revenue", value: "۴۲,۵۰۰,۰۰۰", unit: isFa ? "تومان" : "IRT", trend: "+۱۵٪", isUp: true, icon: <DollarSign size={20} />, color: "orange" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" dir={isFa ? "rtl" : "ltr"}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-[32px] bg-bg2 border border-bdr hover:border-bdr2 transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-2xl bg-glass border border-bdr flex items-center justify-center group-hover:bg-fg group-hover:text-bg transition-all">
              {stat.icon}
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black ${stat.isUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
              {stat.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {stat.trend}
            </div>
          </div>
          <p className="text-xs font-bold text-fg4 mb-1 uppercase tracking-widest">{stat.label}</p>
          <div className="flex items-baseline gap-1">
            <h4 className="text-2xl font-black text-fg" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {stat.value}
            </h4>
            {stat.unit && <span className="text-[10px] font-bold text-fg4">{stat.unit}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
