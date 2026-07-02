"use client";

import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { DriverStats } from "@/features/driver/components/DriverStats";
import { DriverStatusToggle } from "@/features/driver/components/DriverStatusToggle";
import { DriverEarningsChart } from "@/features/driver/components/DriverEarningsChart";
import { RideOfferSimulator } from "@/features/driver/components/RideOfferSimulator";
import { motion } from "motion/react";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DriverDashboardPage() {
  const locale = "fa";
  const isFa = locale === "fa";

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "داشبورد راننده" : "Driver Dashboard"}>
      <RideOfferSimulator />
      <div className="space-y-6 max-w-[1400px] mx-auto pb-10" dir={isFa ? "rtl" : "ltr"}>
        
        {/* Top Section: Status Toggle & Welcome */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DriverStatusToggle locale={locale} />
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-[24px] bg-fg text-bg flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {isFa ? "سلام، رضا علوی!" : "Hello, Reza Alavi!"}
              </h2>
              <p className="text-sm opacity-80 font-medium">
                {isFa ? "امروز تا الان روز پرکاری داشتی. خسته نباشی!" : "You've had a busy day so far. Keep it up!"}
              </p>
            </div>
            <Link 
              href={`/${locale}/driver/profile`}
              className="mt-6 flex items-center gap-2 text-sm font-bold group-hover:gap-4 transition-all"
            >
              {isFa ? "مشاهده پروفایل" : "View Profile"}
              <ArrowRight size={16} className={isFa ? "rotate-180" : ""} />
            </Link>
            <div className="absolute bottom-0 right-0 opacity-10 group-hover:scale-110 transition-transform">
              <Calendar size={120} />
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <DriverStats locale={locale} />

        {/* Middle Section: Chart & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DriverEarningsChart locale={locale} />
          </div>
          
          <div className="flex flex-col gap-6">
            {/* Recent Notifications */}
            <div className="p-6 rounded-[24px] bg-bg2 border border-bdr flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-fg" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                  {isFa ? "اعلان‌های اخیر" : "Recent Notifications"}
                </h3>
                <Bell size={18} className="text-fg4" />
              </div>
              <div className="space-y-4">
                {[
                  { title: isFa ? "واریز درآمد" : "Earnings Payout", time: "۲ ساعت پیش", icon: "💰" },
                  { title: isFa ? "امتیاز ۵ ستاره" : "5 Star Rating", time: "۵ ساعت پیش", icon: "⭐" },
                  { title: isFa ? "بروزرسانی قوانین" : "Terms Update", time: "دیروز", icon: "📄" },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-glass transition-colors cursor-pointer border border-transparent hover:border-bdr">
                    <div className="text-xl">{notif.icon}</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-fg">{notif.title}</p>
                      <p className="text-[10px] text-fg4">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-[24px] bg-glass border border-bdr">
               <h3 className="text-sm font-black text-fg4 uppercase tracking-widest mb-4">
                 {isFa ? "دسترسی سریع" : "Quick Actions"}
               </h3>
               <div className="grid grid-cols-2 gap-3">
                 <button className="p-3 rounded-xl bg-bg2 border border-bdr text-xs font-bold text-fg2 hover:text-fg hover:border-bdr2 transition-all">
                   {isFa ? "پشتیبانی" : "Support"}
                 </button>
                 <button className="p-3 rounded-xl bg-bg2 border border-bdr text-xs font-bold text-fg2 hover:text-fg hover:border-bdr2 transition-all">
                   {isFa ? "مدارک" : "Documents"}
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
