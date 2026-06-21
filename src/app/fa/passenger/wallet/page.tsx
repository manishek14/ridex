"use client";

import { useState } from "react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { WalletBalance } from "@/features/wallet/components/WalletBalance";
import { TransactionList } from "@/features/wallet/components/TransactionList";
import { TopUpSimulation } from "@/features/wallet/components/TopUpSimulation";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Shield, Info } from "lucide-react";

export default function PassengerWalletPage() {
  const locale = "fa";
  const isFa = locale === "fa";
  const [showTopUp, setShowTopUp] = useState(false);

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "کیف پول" : "Wallet"}>
      <div className="max-w-[1000px] mx-auto space-y-8 pb-10" dir={isFa ? "rtl" : "ltr"}>
        
        {/* Main Balance Card */}
        <section>
          <div onClick={() => setShowTopUp(true)} className="cursor-pointer">
            <WalletBalance locale={locale} />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Transactions */}
          <div className="lg:col-span-2">
            <TransactionList locale={locale} />
          </div>

          {/* Right Column: Cards & Info */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="p-6 rounded-[28px] bg-[var(--bg2)] border border-[var(--bdr)]">
              <h3 className="text-sm font-black text-[var(--fg)] uppercase tracking-widest mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-[var(--fg4)]" />
                {isFa ? "روش‌های پرداخت" : "Payment Methods"}
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-[8px] text-white font-bold">VISA</div>
                    <span className="text-xs font-bold text-[var(--fg2)]">**** ۴۳۲۱</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <button className="w-full py-3 rounded-xl border border-dashed border-[var(--bdr2)] text-xs font-bold text-[var(--fg4)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-all">
                  {isFa ? "+ افزودن کارت جدید" : "+ Add New Card"}
                </button>
              </div>
            </div>

            {/* Security Info */}
            <div className="p-6 rounded-[28px] bg-green-500/5 border border-green-500/10">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-green-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-black text-green-500 mb-1">{isFa ? "امنیت تراکنش‌ها" : "Secure Payments"}</h4>
                  <p className="text-[11px] text-[var(--fg3)] leading-relaxed">
                    {isFa 
                      ? "تمامی تراکنش‌های شما با پروتکل‌های امنیتی SSL رمزنگاری شده و محافظت می‌شوند." 
                      : "All transactions are encrypted and protected with SSL security protocols."}
                  </p>
                </div>
              </div>
            </div>

            {/* Help Info */}
            <div className="p-6 rounded-[28px] bg-[var(--glass)] border border-[var(--bdr)]">
              <div className="flex items-start gap-3">
                <Info size={20} className="text-[var(--fg4)] mt-0.5" />
                <p className="text-[11px] text-[var(--fg4)] leading-relaxed">
                  {isFa 
                    ? "در صورت بروز هرگونه مشکل در تراکنش‌ها، می‌توانید با پشتیبانی ۲۴ ساعته تماس بگیرید." 
                    : "For any transaction issues, contact our 24/7 support team."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Up Modal Overlay */}
        <AnimatePresence>
          {showTopUp && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--bg)]/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <TopUpSimulation locale={locale} onClose={() => setShowTopUp(false)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
