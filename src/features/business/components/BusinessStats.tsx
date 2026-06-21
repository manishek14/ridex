"use client";

import { motion } from "framer-motion";
import { Users, Car, CreditCard, TrendingUp } from "lucide-react";

export function BusinessStats({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";
  
  const stats = [
    { label: isFa ? "تعداد کارمندان" : "Total Employees", value: "۴۲", icon: <Users className="text-blue-500" />, color: "blue" },
    { label: isFa ? "سفرهای این ماه" : "Rides This Month", value: "۱۵۶", icon: <Car className="text-green-500" />, color: "green" },
    { label: isFa ? "هزینه کل (ماه)" : "Total Spent (Month)", value: "۳,۴۵۰,۰۰۰", unit: isFa ? "تومان" : "IRT", icon: <CreditCard className="text-purple-500" />, color: "purple" },
    { label: isFa ? "رشد نسبت به ماه قبل" : "Growth vs Last Month", value: "+۱۸٪", icon: <TrendingUp className="text-orange-500" />, color: "orange" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" dir={isFa ? "rtl" : "ltr"}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-[24px] bg-[var(--bg2)] border border-[var(--bdr)] hover:border-[var(--bdr2)] transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            {stat.icon}
          </div>
          <p className="text-xs font-bold text-[var(--fg4)] mb-1 uppercase tracking-wider">{stat.label}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {stat.value}
            </span>
            {stat.unit && <span className="text-[10px] font-bold text-[var(--fg4)]">{stat.unit}</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
