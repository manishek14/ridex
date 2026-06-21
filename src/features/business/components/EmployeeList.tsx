"use client";

import { motion } from "framer-motion";
import { User, MoreVertical, Plus, Search } from "lucide-react";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";

const employees = [
  { id: "1", name: "علی محمدی", role: "مدیر فنی", credit: 500000, rides: 12, status: "active" },
  { id: "2", name: "مریم رضایی", role: "طراح UI/UX", credit: 300000, rides: 8, status: "active" },
  { id: "3", name: "رضا حسینی", role: "توسعه‌دهنده", credit: 200000, rides: 5, status: "inactive" },
  { id: "4", name: "سارا امینی", role: "مدیر محصول", credit: 450000, rides: 15, status: "active" },
];

export function EmployeeList({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";

  return (
    <div className="space-y-6" dir={isFa ? "rtl" : "ltr"}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
          {isFa ? "مدیریت کارمندان" : "Employee Management"}
        </h3>
        <div className="flex gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg4)]" size={16} />
            <input 
              type="text" 
              placeholder={isFa ? "جستجوی کارمند..." : "Search employee..."}
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-[var(--bg2)] border border-[var(--bdr)] text-xs outline-none focus:border-[var(--fg)] transition-all"
            />
          </div>
          <Button className="rounded-xl flex items-center gap-2">
            <Plus size={16} />
            <span className="text-xs font-bold">{isFa ? "افزودن" : "Add"}</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-[10px] font-black text-[var(--fg4)] uppercase tracking-widest border-b border-[var(--bdr)]">
              <th className="text-right pb-4 pr-4">{isFa ? "کارمند" : "Employee"}</th>
              <th className="text-right pb-4">{isFa ? "نقش" : "Role"}</th>
              <th className="text-right pb-4">{isFa ? "اعتبار باقی‌مانده" : "Credit Left"}</th>
              <th className="text-right pb-4">{isFa ? "سفرهای ماه" : "Monthly Rides"}</th>
              <th className="text-right pb-4">{isFa ? "وضعیت" : "Status"}</th>
              <th className="text-right pb-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--bdr)]">
            {employees.map((emp, i) => (
              <motion.tr 
                key={emp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group hover:bg-[var(--glass)] transition-colors"
              >
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={emp.name} size="sm" />
                    <span className="text-sm font-bold text-[var(--fg)]">{emp.name}</span>
                  </div>
                </td>
                <td className="py-4 text-xs text-[var(--fg3)] font-medium">{emp.role}</td>
                <td className="py-4 text-sm font-black text-[var(--fg)]">
                  {new Intl.NumberFormat(isFa ? "fa-IR" : "en-US").format(emp.credit)}
                  <span className="text-[9px] mr-1 opacity-50">{isFa ? "تومان" : "IRT"}</span>
                </td>
                <td className="py-4 text-sm font-bold text-[var(--fg2)]">{emp.rides}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${
                    emp.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    {emp.status === "active" ? (isFa ? "فعال" : "Active") : (isFa ? "غیرفعال" : "Inactive")}
                  </span>
                </td>
                <td className="py-4 text-left pl-4">
                  <button className="text-[var(--fg4)] hover:text-[var(--fg)]">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
