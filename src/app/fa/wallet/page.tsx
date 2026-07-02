// src/app/fa/wallet/page.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true);
  const isFa = true;

  const transactions = [
    { id: 1, type: "deposit", amount: 500000, status: "completed", date: "۱۴۰۴/۰۱/۱۵", description: "شارژ کیف پول" },
    { id: 2, type: "withdraw", amount: 85000, status: "completed", date: "۱۴۰۴/۰۱/۱۶", description: "پرداخت سفر" },
    { id: 3, type: "deposit", amount: 25000, status: "pending", date: "۱۴۰۴/۰۱/۱۷", description: "کد تخفیف" },
    { id: 4, type: "withdraw", amount: 145000, status: "failed", date: "۱۴۰۴/۰۱/۱۸", description: "پرداخت سفر" },
    { id: 5, type: "deposit", amount: 1000000, status: "completed", date: "۱۴۰۴/۰۱/۱۹", description: "شارژ کیف پول" },
  ];

  const totalBalance = 1233000;
  const totalIncome = transactions.filter(t => t.type === "deposit" && t.status === "completed").reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "withdraw" && t.status === "completed").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-2 flex items-center justify-between">
        <Link href="/fa" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-xl bg-fg flex items-center justify-center text-sm font-black text-bg">
            R
          </div>
          <span className="text-lg font-extrabold text-fg tracking-tight">RideX</span>
        </Link>
        <Link href="/fa">
          <Button variant="ghost" size="sm">بازگشت</Button>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full space-y-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-fg to-fg2 rounded-2xl p-6 text-bg relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "radial-gradient(circle, var(--bg) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet size={20} className="opacity-70" />
                <p className="text-xs font-medium opacity-70">کیف پول</p>
              </div>
              <button onClick={() => setShowBalance(!showBalance)} className="opacity-70 hover:opacity-100">
                {showBalance ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="text-3xl font-black mt-2">
              {showBalance ? totalBalance.toLocaleString() : "••••••"}
            </p>
            <p className="text-xs opacity-70 mt-1">تومان</p>
            <div className="flex gap-3 mt-4">
              <Button className="flex-1 bg-bg text-fg hover:opacity-80">
                <Plus size={16} className="mr-1" />
                شارژ
              </Button>
              <Button className="flex-1 bg-bg text-fg hover:opacity-80">
                <Minus size={16} className="mr-1" />
                برداشت
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-glass border border-bdr rounded-xl p-4 text-center">
            <p className="text-xs text-fg4">کل واریز</p>
            <p className="text-xl font-black text-green-400">{totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-glass border border-bdr rounded-xl p-4 text-center">
            <p className="text-xs text-fg4">کل برداشت</p>
            <p className="text-xl font-black text-red-400">{totalExpense.toLocaleString()}</p>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-bg2 border border-bdr rounded-2xl p-5">
          <h3 className="text-sm font-bold text-fg mb-4">تاریخچه تراکنش‌ها</h3>
          <div className="space-y-3">
            {transactions.map((tx, index) => {
              const isDeposit = tx.type === "deposit";
              const isCompleted = tx.status === "completed";
              return (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-glass border border-bdr"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isDeposit ? "bg-green-500/10" : "bg-red-500/10"}`}>
                      {isDeposit ? <ArrowDownLeft size={16} className="text-green-400" /> : <ArrowUpRight size={16} className="text-red-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-fg">{tx.description}</p>
                      <div className="flex items-center gap-2 text-xs text-fg4">
                        <span>{tx.date}</span>
                        <span>•</span>
                        <Badge variant={isCompleted ? "success" : tx.status === "pending" ? "warning" : "error"} className="text-[10px]">
                          {isCompleted ? "تکمیل" : tx.status === "pending" ? "در انتظار" : "ناموفق"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${isDeposit ? "text-green-400" : "text-red-400"}`}>
                    {isDeposit ? "+" : "-"}{tx.amount.toLocaleString()}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}