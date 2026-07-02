// src/app/fa/business/billing/page.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  Search,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Badge } from "@/shared/components/ui/Badge";

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const invoices = [
    { id: "INV-001", date: "۱۴۰۴/۰۱/۱۵", amount: 3420000, status: "paid", description: "سفرهای فروردین ماه" },
    { id: "INV-002", date: "۱۴۰۴/۰۲/۰۵", amount: 2800000, status: "paid", description: "سفرهای اردیبهشت ماه" },
    { id: "INV-003", date: "۱۴۰۴/۰۳/۰۱", amount: 4100000, status: "pending", description: "سفرهای خرداد ماه" },
    { id: "INV-004", date: "۱۴۰۴/۰۳/۲۰", amount: 2300000, status: "overdue", description: "سفرهای تیر ماه" },
    { id: "INV-005", date: "۱۴۰۴/۰۴/۱۰", amount: 3800000, status: "pending", description: "سفرهای مرداد ماه" },
  ];

  const statusConfig = {
    paid: { label: "پرداخت شده", variant: "success" as const, icon: CheckCircle },
    pending: { label: "در انتظار", variant: "warning" as const, icon: Clock },
    overdue: { label: "تأخیر", variant: "error" as const, icon: AlertCircle },
  };

  const totalPaid = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.amount, 0);
  const totalPending = invoices.filter(i => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-fg">صورتحساب و پرداخت‌ها</h1>
          <p className="text-sm text-fg3">مدیریت صورت‌حساب‌ها و پرداخت‌های سازمانی</p>
        </div>
        <Button>
          <Download size={16} className="mr-2" />
          دانلود گزارش
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-glass border border-bdr rounded-xl p-4">
          <p className="text-xs text-fg4">کل صورت‌حساب‌ها</p>
          <p className="text-xl font-black text-fg">{invoices.length}</p>
        </div>
        <div className="bg-glass border border-bdr rounded-xl p-4">
          <p className="text-xs text-fg4">پرداخت شده</p>
          <p className="text-xl font-black text-green-400">{totalPaid.toLocaleString()} T</p>
        </div>
        <div className="bg-glass border border-bdr rounded-xl p-4">
          <p className="text-xs text-fg4">در انتظار</p>
          <p className="text-xl font-black text-yellow-400">{totalPending.toLocaleString()} T</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="جستجو در صورت‌حساب‌ها..."
            leftIcon={<Search size={14} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none px-4 py-2 pr-8 rounded-xl bg-glass border border-bdr text-fg text-sm font-medium cursor-pointer hover:bg-glass2 transition-colors"
          >
            <option value="all">همه</option>
            <option value="paid">پرداخت شده</option>
            <option value="pending">در انتظار</option>
            <option value="overdue">تأخیر</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-fg3 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-glass border border-bdr rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bdr">
                <th className="text-right p-4 text-xs font-semibold text-fg4 uppercase tracking-wider">شماره</th>
                <th className="text-right p-4 text-xs font-semibold text-fg4 uppercase tracking-wider">تاریخ</th>
                <th className="text-right p-4 text-xs font-semibold text-fg4 uppercase tracking-wider hidden md:table-cell">توضیحات</th>
                <th className="text-right p-4 text-xs font-semibold text-fg4 uppercase tracking-wider">مبلغ</th>
                <th className="text-right p-4 text-xs font-semibold text-fg4 uppercase tracking-wider">وضعیت</th>
                <th className="text-right p-4 text-xs font-semibold text-fg4 uppercase tracking-wider">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, index) => {
                const config = statusConfig[inv.status as keyof typeof statusConfig];
                const Icon = config.icon;
                return (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-bdr hover:bg-bg2 transition-colors"
                  >
                    <td className="p-4">
                      <p className="text-sm font-semibold text-fg">{inv.id}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-fg2">{inv.date}</p>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <p className="text-sm text-fg2">{inv.description}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-bold text-fg">{inv.amount.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
                        <Icon size={12} />
                        {config.label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="ghost">
                        <FileText size={14} className="mr-1" />
                        مشاهده
                      </Button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}