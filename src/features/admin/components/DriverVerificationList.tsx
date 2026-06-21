"use client";

import { motion } from "framer-motion";
import { Check, X, Eye, FileText, ShieldAlert } from "lucide-react";
import { Avatar } from "@/shared/components/ui/Avatar";

const pendingDrivers = [
  { id: "1", name: "کامران علوی", car: "پژو ۲۰۶ - سفید", date: "۱۰ دقیقه پیش", docs: ["گواهینامه", "کارت ماشین"] },
  { id: "2", name: "سوسن امینی", car: "تیبا ۲ - نوک‌مدادی", date: "۴۵ دقیقه پیش", docs: ["گواهینامه", "بیمه‌نامه"] },
  { id: "3", name: "مرتضی رستمی", car: "تارا - مشکی", date: "۲ ساعت پیش", docs: ["گواهینامه", "کارت ماشین", "بیمه‌نامه"] },
];

export function DriverVerificationList({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";

  return (
    <div className="space-y-6" dir={isFa ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-orange-500" size={24} />
          <h3 className="text-xl font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "تایید مدارک رانندگان" : "Driver Verifications"}
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase">
          {pendingDrivers.length} {isFa ? "مورد در انتظار" : "Pending"}
        </span>
      </div>

      <div className="space-y-4">
        {pendingDrivers.map((driver, i) => (
          <motion.div
            key={driver.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-[24px] bg-[var(--bg2)] border border-[var(--bdr)] hover:border-[var(--bdr2)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <Avatar name={driver.name} size="md" />
              <div>
                <h4 className="text-sm font-black text-[var(--fg)]">{driver.name}</h4>
                <p className="text-[11px] text-[var(--fg3)] font-medium">{driver.car}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {driver.docs.map((doc, j) => (
                <div key={j} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] text-[9px] font-bold text-[var(--fg4)]">
                  <FileText size={12} />
                  {doc}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-[var(--bdr)]">
              <button className="w-10 h-10 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center text-[var(--fg4)] hover:text-[var(--fg)] transition-all">
                <Eye size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                <X size={18} />
              </button>
              <button className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-all">
                <Check size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
