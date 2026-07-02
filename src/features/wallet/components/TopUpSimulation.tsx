"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { useAppDispatch } from "@/store";
import { updateBalance } from "@/store/slices/walletSlice";
import { useToast } from "@/shared/components/feedback/Toast";

const amounts = [50000, 100000, 200000, 500000];

export function TopUpSimulation({ locale = "fa", onClose }: { locale?: string; onClose: () => void }) {
  const isFa = locale === "fa";
  const [selectedAmount, setSelectedAmount] = useState(amounts[1]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleTopUp = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      dispatch(updateBalance(selectedAmount));
      setIsProcessing(false);
      setIsSuccess(true);
      toast.success(isFa ? "اعتبار با موفقیت افزایش یافت" : "Balance topped up successfully");
      setTimeout(onClose, 2000);
    }, 2000);
  };

  return (
    <div className="p-6 bg-bg2 border border-bdr rounded-[28px] shadow-2xl max-w-[400px] w-full" dir={isFa ? "rtl" : "ltr"}>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-xl font-black text-fg mb-6" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "افزایش اعتبار" : "Top Up Wallet"}
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {amounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelectedAmount(amount)}
                  className={`p-4 rounded-2xl border transition-all ${
                    selectedAmount === amount 
                      ? "bg-fg border-fg text-bg" 
                      : "bg-glass border-bdr text-fg hover:border-bdr2"
                  }`}
                >
                  <p className="text-sm font-black">{new Intl.NumberFormat(isFa ? "fa-IR" : "en-US").format(amount)}</p>
                  <p className="text-[10px] opacity-60 font-bold">{isFa ? "تومان" : "IRT"}</p>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-glass border border-bdr mb-6 flex items-center gap-3">
              <ShieldCheck size={20} className="text-green-500" />
              <p className="text-[11px] text-fg3 leading-relaxed">
                {isFa 
                  ? "این یک شبیه‌ساز است و هیچ تراکنش واقعی انجام نمی‌شود." 
                  : "This is a simulation. No real payment will be processed."}
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={onClose} className="flex-1 rounded-xl">
                {isFa ? "انصراف" : "Cancel"}
              </Button>
              <Button onClick={handleTopUp} loading={isProcessing} className="flex-[2] rounded-xl">
                {isFa ? "تأیید و پرداخت" : "Confirm & Pay"}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success" 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="flex flex-col items-center py-8 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white mb-6 shadow-2xl shadow-green-500/20">
              <Check size={40} />
            </div>
            <h3 className="text-2xl font-black text-fg mb-2" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "پرداخت موفق!" : "Payment Successful!"}
            </h3>
            <p className="text-sm text-fg3">
              {isFa ? "موجودی شما با موفقیت به‌روزرسانی شد." : "Your balance has been updated."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
