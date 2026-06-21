"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Car, Gift, CreditCard } from "lucide-react";

interface Transaction {
  id: string;
  type: "ride" | "topup" | "gift" | "withdraw";
  amount: number;
  date: string;
  description: { fa: string; en: string };
}

const mockTransactions: Transaction[] = [
  { id: "1", type: "ride", amount: -25000, date: "۱۴۰۲/۰۴/۰۱ - ۱۲:۳۰", description: { fa: "هزینه سفر (رایدکس گو)", en: "Ride fare (RideX Go)" } },
  { id: "2", type: "topup", amount: 100000, date: "۱۴۰۲/۰۳/۲۸ - ۰۹:۱۵", description: { fa: "افزایش اعتبار کیف پول", en: "Wallet top-up" } },
  { id: "3", type: "gift", amount: 15000, date: "۱۴۰۲/۰۳/۲۵ - ۱۸:۴۵", description: { fa: "هدیه معرفی دوستان", en: "Referral gift" } },
  { id: "4", type: "ride", amount: -42000, date: "۱۴۰۲/۰۳/۲۲ - ۲۱:۰۰", description: { fa: "هزینه سفر (رایدکس لوکس)", en: "Ride fare (RideX Premium)" } },
  { id: "5", type: "withdraw", amount: -50000, date: "۱۴۰۲/۰۳/۲۰ - ۱۰:۰۰", description: { fa: "برداشت از اعتبار", en: "Withdrawal" } },
];

export function TransactionList({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";

  const getIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "ride": return <Car size={18} />;
      case "topup": return <ArrowDownLeft size={18} className="text-green-500" />;
      case "gift": return <Gift size={18} className="text-purple-500" />;
      case "withdraw": return <ArrowUpRight size={18} className="text-red-500" />;
      default: return <CreditCard size={18} />;
    }
  };

  return (
    <div className="space-y-4" dir={isFa ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
          {isFa ? "تراکنش‌های اخیر" : "Recent Transactions"}
        </h3>
        <button className="text-xs font-bold text-[var(--fg4)] hover:text-[var(--fg)] transition-colors">
          {isFa ? "مشاهده همه" : "View All"}
        </button>
      </div>

      <div className="space-y-2">
        {mockTransactions.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: isFa ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg2)] border border-[var(--bdr)] hover:border-[var(--bdr2)] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIcon(tx.type)}
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                  {isFa ? tx.description.fa : tx.description.en}
                </p>
                <p className="text-[10px] text-[var(--fg4)] font-medium">{tx.date}</p>
              </div>
            </div>
            <div className="text-left">
              <p className={`text-sm font-black ${tx.amount > 0 ? "text-green-500" : "text-[var(--fg)]"}`} style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {tx.amount > 0 ? "+" : ""}{new Intl.NumberFormat(isFa ? "fa-IR" : "en-US").format(tx.amount)}
              </p>
              <p className="text-[9px] font-bold text-[var(--fg4)] uppercase">
                {isFa ? "تومان" : "IRT"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
