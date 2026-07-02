// src/app/en/passenger/wallet/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Plus, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Badge } from "@/shared/components/ui/index";
import { useAppDispatch, useAppSelector } from "@/store";
import { setWallet, addTransaction } from "@/store/slices/walletSlice";
import { useToast } from "@/shared/components/feedback/Toast";
import { mockWallet } from "@/lib/mock-data";
import { formatPrice, formatDate, getTransactionLabel } from "@/lib/utils";

type Locale = "en" | "fa";

const quickAmounts = [100000, 200000, 500000, 1000000];

export default function WalletPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isFa = locale === "fa";
  
  const dispatch = useAppDispatch();
  const toast = useToast();
  const wallet = useAppSelector((s) => s.wallet.wallet);
  const [depositAmount, setDepositAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  useEffect(() => {
    if (!wallet) dispatch(setWallet(mockWallet));
  }, [dispatch, wallet]);

  const handleDeposit = async () => {
    const amount = parseInt(depositAmount);
    if (!amount || amount < 10000) {
      toast.error(isFa ? "حداقل مبلغ ۱۰,۰۰۰ تومان است" : "Minimum amount is 10,000 T");
      return;
    }
    setIsDepositing(true);
    await new Promise((r) => setTimeout(r, 1500));
    dispatch(addTransaction({
      id: crypto.randomUUID(),
      type: "deposit",
      amount,
      status: "completed",
      description: isFa ? "شارژ کیف پول از درگاه" : "Wallet top-up",
      createdAt: new Date().toISOString(),
    }));
    toast.success(isFa ? `${formatPrice(amount, locale)} به کیف پول اضافه شد` : `${formatPrice(amount, locale)} added to wallet`);
    setDepositAmount("");
    setShowDeposit(false);
    setIsDepositing(false);
  };

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "کیف پول" : "Wallet"}>
      <div className="max-w-xl" dir={isFa ? "rtl" : "ltr"}>
        {/* Balance card */}
        <div className="wallet-card mb-5 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle, black 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          />
          <div className="relative z-10">
            <p
              className="text-xs font-bold text-bg/60 mb-2 tracking-wide"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "موجودی کیف پول" : "WALLET BALANCE"}
            </p>
            <div
              className="text-[36px] font-black text-bg leading-none mb-4"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {wallet ? formatPrice(wallet.balance, locale) : "—"}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeposit(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-black/10 text-bg text-xs font-bold hover:bg-black/20 transition-colors"
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                <Plus size={12} />
                {isFa ? "شارژ کن" : "Deposit"}
              </button>
            </div>
          </div>
        </div>

        {/* Deposit form */}
        {showDeposit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-glass border border-bdr mb-5"
          >
            <p
              className="text-sm font-bold text-fg mb-3"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "مبلغ شارژ" : "Deposit Amount"}
            </p>
            <div className="flex gap-2 mb-3 flex-wrap">
              {quickAmounts.map((a) => (
                <button
                  key={a}
                  onClick={() => setDepositAmount(String(a))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    depositAmount === String(a)
                      ? "bg-fg text-bg border-fg"
                      : "bg-glass text-fg3 border-bdr hover:border-bdr2"
                  }`}
                  style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                >
                  {formatPrice(a, locale)}
                </button>
              ))}
            </div>
            <Input
              type="number"
              placeholder={isFa ? "یا مبلغ دلخواه وارد کن (تومان)" : "Or enter custom amount (T)"}
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="mb-3"
            />
            <div className="flex gap-2">
              <Button className="flex-1" loading={isDepositing} onClick={handleDeposit}>
                {isFa ? "شارژ کیف پول" : "Top Up"}
              </Button>
              <Button variant="ghost" onClick={() => setShowDeposit(false)}>
                {isFa ? "انصراف" : "Cancel"}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Transactions */}
        <div>
          <p
            className="text-xs font-bold text-fg3 mb-3 tracking-wide"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "تراکنش‌های اخیر" : "RECENT TRANSACTIONS"}
          </p>
          <div className="flex flex-col gap-2">
            {wallet?.transactions.map((tx) => {
              const info = getTransactionLabel(tx.type, locale);
              const isPositive = tx.amount > 0;
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-glass border border-bdr"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isPositive ? "bg-green-500/10" : "bg-red-500/10"
                  }`}>
                    {isPositive
                      ? <ArrowDownLeft size={15} className="text-green-400" />
                      : <ArrowUpRight size={15} className="text-red-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[13px] font-semibold text-fg truncate"
                      style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                    >
                      {locale === "fa" ? info.fa : info.en}
                    </p>
                    <p className="text-[11px] text-fg4">{formatDate(tx.createdAt, locale)}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-[14px] font-extrabold ${info.color}`}
                      style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                    >
                      {info.sign}{formatPrice(Math.abs(tx.amount), locale)}
                    </p>
                    <Badge variant={tx.status === "completed" ? "green" : tx.status === "failed" ? "red" : "yellow"} className="text-[9px]">
                      {tx.status === "completed" ? (isFa ? "موفق" : "Done") : tx.status === "pending" ? (isFa ? "در انتظار" : "Pending") : (isFa ? "ناموفق" : "Failed")}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}