// src/app/fa/passenger/profile/page.tsx
"use client";

import { useParams } from "next/navigation";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { RideHistory } from "@/features/passenger/components/RideHistory";
import { SavedLocations } from "@/features/passenger/components/SavedLocations";
import { motion } from "framer-motion";
import { User, Settings, Shield, Bell, Camera } from "lucide-react";
import { Avatar } from "@/shared/components/ui/Avatar";
import { useAppSelector } from "@/store";

export default function PassengerProfilePage() {
  const params = useParams();
  const locale = (params?.locale as string) || "fa";
  const isFa = locale === "fa";
  const user = useAppSelector((s) => s.auth.user);

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "پروفایل من" : "My Profile"}>
      <div className="max-w-[1200px] mx-auto space-y-10 pb-10" dir={isFa ? "rtl" : "ltr"}>
        
        {/* Profile Header */}
        <section className="relative p-8 rounded-[32px] bg-[var(--bg2)] border border-[var(--bdr)] overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-32 bg-gradient-to-b from-[var(--fg)]/5 to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <Avatar 
                name={user?.name || "User"} 
                size="xl" 
                className="border-4 border-[var(--bg)] shadow-2xl" 
              />
              <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[var(--fg)] text-[var(--bg)] border-2 border-[var(--bg)] flex items-center justify-center hover:scale-110 transition-transform">
                <Camera size={14} />
              </button>
            </div>
            <div className="text-center md:text-right flex-1">
              <h2 className="text-3xl font-black text-[var(--fg)] mb-2" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {user?.name || (isFa ? "کاربر رایدکس" : "RideX User")}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="px-3 py-1 rounded-full bg-[var(--glass)] border border-[var(--bdr)] text-[10px] font-bold text-[var(--fg3)] uppercase tracking-widest">
                  {isFa ? `شماره: ${user?.phone || "—"}` : `Phone: ${user?.phone || "—"}`}
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                  {isFa ? "کاربر نقره‌ای" : "Silver Member"}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center text-[var(--fg3)] hover:text-[var(--fg)] transition-all">
                <Bell size={20} />
              </button>
              <button className="w-12 h-12 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center text-[var(--fg3)] hover:text-[var(--fg)] transition-all">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Ride History */}
          <div className="lg:col-span-2">
            <RideHistory locale={locale} />
          </div>

          {/* Right: Saved Locations & Stats */}
          <div className="space-y-10">
            <SavedLocations locale={locale} />
            
            {/* Quick Stats */}
            <div className="p-6 rounded-[28px] bg-[var(--glass)] border border-[var(--bdr)]">
              <h3 className="text-xs font-black text-[var(--fg4)] uppercase tracking-widest mb-6">{isFa ? "آمار سفرها" : "Ride Stats"}</h3>
              <div className="space-y-6">
                {[
                  { label: isFa ? "کل سفرها" : "Total Rides", value: "۱۴۸", color: "blue" },
                  { label: isFa ? "مسافت طی شده" : "Total Distance", value: "۸۵۰ کیلومتر", color: "green" },
                  { label: isFa ? "صرفه‌جویی با Pool" : "Saved with Pool", value: "۴۵۰,۰۰۰ تومان", color: "purple" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[var(--fg3)]">{stat.label}</p>
                    <p className="text-sm font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Settings Link */}
            <div className="p-6 rounded-[28px] bg-[var(--bg2)] border border-[var(--bdr)] flex items-center justify-between group cursor-pointer hover:border-[var(--fg)] transition-all">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-[var(--fg4)] group-hover:text-[var(--fg)]" />
                <span className="text-sm font-bold text-[var(--fg2)] group-hover:text-[var(--fg)]">{isFa ? "تنظیمات امنیتی" : "Security Settings"}</span>
              </div>
              <Settings size={16} className="text-[var(--fg4)]" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}