"use client";

import { motion } from "framer-motion";
import { Plus, Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useAppSelector } from "@/store";
import { Button } from "@/shared/components/ui/Button";

export function WalletBalance({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";
  const { balance } = useAppSelector((s) => s.wallet);

  return (
    <div className="p-8 rounded-[32px] bg-[var(--fg)] text-[var(--bg)] relative overflow-hidden group" dir={isFa ? "rtl" : "ltr"}>
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] -mr-32 -mt-32 rounded-full" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-[60px] -ml-24 -mb-24 rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4 opacity-70">
            <Wallet size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">
              {isFa ? "موجودی کیف پول" : "Wallet Balance"}
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black tracking-tight"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {new Intl.NumberFormat(isFa ? "fa-IR" : "en-US").format(balance)}
            </motion.span>
            <span className="text-lg font-bold opacity-60">
              {isFa ? "تومان" : "IRT"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button 
            className="bg-[var(--bg)] text-[var(--fg)] hover:bg-[var(--bg)]/90 px-6 py-6 rounded-2xl shadow-xl flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="font-black">{isFa ? "افزایش اعتبار" : "Top Up"}</span>
          </Button>
          <div className="flex gap-2">
            <button className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <ArrowUpRight size={24} />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <ArrowDownLeft size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/10 relative z-10 flex gap-8">
        <div>
          <p className="text-[10px] font-bold opacity-50 uppercase tracking-tighter mb-1">
            {isFa ? "درآمد ماهانه" : "Monthly Income"}
          </p>
          <p className="text-sm font-bold">+۲,۴۵۰,۰۰۰</p>
        </div>
        <div>
          <p className="text-[10px] font-bold opacity-50 uppercase tracking-tighter mb-1">
            {isFa ? "هزینه ماهانه" : "Monthly Spending"}
          </p>
          <p className="text-sm font-bold">-۸۴۰,۰۰۰</p>
        </div>
      </div>
    </div>
  );
}
