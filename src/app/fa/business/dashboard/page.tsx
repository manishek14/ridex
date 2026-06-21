// src/app/fa/business/dashboard/page.tsx
"use client";

import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { BusinessStats } from "@/features/business/components/BusinessStats";
import { EmployeeList } from "@/features/business/components/EmployeeList";
import { 
  Building2, 
  ShieldCheck,
  Download,
  Calendar,
  TrendingUp,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export default function BusinessDashboardPage() {
  const locale = "fa";
  const isFa = locale === "fa";

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "پنل سازمانی" : "Business Panel"}>
      <div className="w-full px-4 md:px-6 py-4 md:py-6 space-y-6" dir={isFa ? "rtl" : "ltr"}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 md:p-6 rounded-2xl bg-[var(--bg2)] border border-[var(--bdr)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-[var(--fg)]/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center shadow-2xl flex-shrink-0">
              <Building2 size={24} className="md:hidden" />
              <Building2 size={28} className="hidden md:block" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-[var(--fg)]">
                شرکت فناوری نوین
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded-lg bg-[var(--glass)] border border-[var(--bdr)] text-[10px] font-bold text-[var(--fg4)]">
                  شناسه: ۸۴۹۲۰
                </span>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-green-500" />
                  <span className="text-[10px] font-bold text-green-500">تایید شده</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full sm:w-auto">
            <div className="text-center sm:text-left">
              <p className="text-[10px] font-black text-[var(--fg4)] uppercase tracking-widest">
                اعتبار سازمانی
              </p>
              <p className="text-lg md:text-xl font-black text-[var(--fg)]">
                ۱۲,۵۰۰,۰۰۰
                <span className="text-xs font-bold mr-1 opacity-60">تومان</span>
              </p>
            </div>
            <Button className="rounded-xl py-2.5 px-6 w-full sm:w-auto">
              شارژ پنل
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <BusinessStats locale={locale} />

        {/* Main Content - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 p-4 md:p-5 rounded-2xl bg-[var(--bg2)] border border-[var(--bdr)]">
            <EmployeeList locale={locale} />
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[var(--fg)] text-[var(--bg)]">
              <h3 className="text-xs font-black uppercase tracking-widest mb-4 opacity-70">
                اقدامات سریع
              </h3>
              <div className="space-y-2.5">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all group">
                  <span className="text-xs font-bold">گزارش مالی</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all group">
                  <span className="text-xs font-bold">لیست سفرها</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all group">
                  <span className="text-xs font-bold">خروجی اکسل</span>
                  <Download size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] text-center">
                <Calendar size={16} className="mx-auto text-[var(--fg3)] mb-1" />
                <p className="text-lg font-black text-[var(--fg)]">۱۴ روز</p>
                <p className="text-[9px] text-[var(--fg4)]">روز کاری</p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] text-center">
                <TrendingUp size={16} className="mx-auto text-green-400 mb-1" />
                <p className="text-lg font-black text-[var(--fg)]">+۲۳٪</p>
                <p className="text-[9px] text-[var(--fg4)]">رشد ماهانه</p>
              </div>
            </div>

            <button className="w-full p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm hover:bg-blue-500/20 transition-all flex items-center justify-center gap-2">
              <Plus size={16} />
              افزودن کارمند
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}