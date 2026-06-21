"use client";

import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { AdminOverview } from "@/features/admin/components/AdminOverview";
import { DriverVerificationList } from "@/features/admin/components/DriverVerificationList";
import { AdminLiveMap } from "@/features/admin/components/AdminLiveMap";
import { motion } from "framer-motion";
import { ShieldCheck, Activity, Map, AlertCircle, TrendingUp, Users } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export default function AdminDashboardPage() {
  const locale = "fa";
  const isFa = locale === "fa";

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "پنل مدیریت رایدکس" : "RideX Admin Panel"}>
      <div className="max-w-[1400px] mx-auto space-y-10 pb-10" dir={isFa ? "rtl" : "ltr"}>
        
        {/* Admin Welcome Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-[32px] bg-[var(--fg)] text-[var(--bg)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center shadow-2xl">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {isFa ? "مدیریت کل سیستم" : "System Administration"}
              </h2>
              <p className="text-xs font-bold opacity-70 tracking-widest uppercase">
                {isFa ? "خوش آمدید، مدیر ارشد" : "Welcome, Super Admin"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[var(--fg)] bg-[var(--bg2)] flex items-center justify-center text-[10px] font-bold text-[var(--fg)]">
                  {i}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold opacity-80">{isFa ? "۴ مدیر آنلاین" : "4 Admins Online"}</p>
          </div>
        </div>

        {/* Stats Overview */}
        <AdminOverview locale={locale} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content: Driver Verifications & Live Activity */}
          <div className="lg:col-span-2 space-y-10">
            <section className="p-8 rounded-[32px] bg-[var(--bg2)] border border-[var(--bdr)]">
              <DriverVerificationList locale={locale} />
            </section>

            <section className="p-8 rounded-[32px] bg-[var(--bg2)] border border-[var(--bdr)]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Map className="text-blue-500" size={24} />
                  <h3 className="text-xl font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                    {isFa ? "نقشه زنده شهر" : "Live City Map"}
                  </h3>
                </div>
              </div>
              <div className="mb-8">
                <AdminLiveMap locale={locale} />
              </div>
              <div className="space-y-4">
                {[
                  { user: "رضا س.", action: isFa ? "سفر جدید شروع کرد" : "Started a new ride", time: "همین الان", type: "ride" },
                  { user: "مریم ک.", action: isFa ? "ثبت‌نام جدید انجام داد" : "Joined the platform", time: "۲ دقیقه پیش", type: "user" },
                  { user: "علی م.", action: isFa ? "درخواست واریز درآمد داد" : "Requested payout", time: "۵ دقیقه پیش", type: "finance" },
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${act.type === "ride" ? "bg-green-500" : act.type === "user" ? "bg-blue-500" : "bg-orange-500"}`} />
                      <p className="text-sm font-bold text-[var(--fg)]">
                        <span className="text-[var(--fg4)] ml-1">{act.user}</span> {act.action}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-[var(--fg4)]">{act.time}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: System Health & Alerts */}
          <div className="space-y-8">
            <div className="p-8 rounded-[32px] bg-red-500/5 border border-red-500/10">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-red-500" size={24} />
                <h3 className="text-sm font-black text-red-500 uppercase tracking-widest">{isFa ? "هشدارهای سیستمی" : "System Alerts"}</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-red-500/20">
                  <p className="text-xs font-bold text-[var(--fg)] mb-1">{isFa ? "ترافیک بالا در منطقه ۱" : "High Traffic in District 1"}</p>
                  <p className="text-[10px] text-[var(--fg4)]">{isFa ? "کمبود راننده در این منطقه گزارش شده است." : "Driver shortage reported in this area."}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-red-500/20">
                  <p className="text-xs font-bold text-[var(--fg)] mb-1">{isFa ? "تأخیر در درگاه پرداخت" : "Payment Gateway Delay"}</p>
                  <p className="text-[10px] text-[var(--fg4)]">{isFa ? "زمان پاسخگویی درگاه بانک ملت افزایش یافته است." : "Mellat Bank response time is high."}</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-[var(--glass)] border border-[var(--bdr)]">
              <h3 className="text-xs font-black text-[var(--fg4)] uppercase tracking-widest mb-6">{isFa ? "عملکرد کلی" : "Overall Performance"}</h3>
              <div className="space-y-6">
                {[
                  { label: isFa ? "رضایت کاربران" : "User Satisfaction", value: "۹۸٪", color: "green" },
                  { label: isFa ? "زمان پاسخگویی" : "Response Time", value: "۱.۲ ثانیه", color: "blue" },
                  { label: isFa ? "پایداری سیستم" : "System Uptime", value: "۹۹.۹٪", color: "purple" },
                ].map((p, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                      <span className="text-[var(--fg3)]">{p.label}</span>
                      <span className="text-[var(--fg)]">{p.value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[var(--bdr)] overflow-hidden">
                      <div className="h-full bg-[var(--fg)] w-[90%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
