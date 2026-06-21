// src/app/fa/download/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Smartphone, 
  Download, 
  Apple, 
  Bot, 
  CheckCircle,
  Sparkles,
  Shield,
  Zap,
  MapPin,
  Users,
  Star
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { useAppSelector } from "@/store";
import Link from "next/link";

export default function DownloadPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [isCopied, setIsCopied] = useState(false);

  const features = [
    { icon: Zap, label: "سریع و روان" },
    { icon: Shield, label: "ایمن و مطمئن" },
    { icon: MapPin, label: "ردیابی لحظه‌ای" },
    { icon: Users, label: "پشتیبانی ۲۴/۷" },
    { icon: Star, label: "رانندگان حرفه‌ای" },
    { icon: Sparkles, label: "تجربه هوشمند" },
  ];

  const copyLink = () => {
    const url = "https://ridex.ir/download";
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-6 pb-2 flex items-center justify-between">
        <Link href="/fa" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-xl bg-[var(--fg)] flex items-center justify-center text-sm font-black text-[var(--bg)]">
            R
          </div>
          <span className="text-lg font-extrabold text-[var(--fg)] tracking-tight">RideX</span>
        </Link>
        {user && (
          <Link href="/fa/passenger/dashboard">
            <Button variant="ghost" size="sm">
              داشبورد
            </Button>
          </Link>
        )}
      </div>

      <div className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Smartphone size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--fg)]">
            دانلود اپلیکیشن RideX
          </h1>
          <p className="text-base text-[var(--fg3)] max-w-md mx-auto">
            حمل‌ونقل هوشمند در چند ثانیه. رزرو سفر، ردیابی لحظه‌ای و پرداخت آسان.
          </p>
        </motion.div>

        {/* QR Code Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="bg-[var(--bg2)] border border-[var(--bdr)] rounded-2xl p-6 text-center">
            <div className="w-40 h-40 mx-auto bg-[var(--glass)] rounded-xl border border-[var(--bdr)] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">📱</div>
                <p className="text-xs text-[var(--fg4)]">اسکن کنید</p>
              </div>
            </div>
            <p className="text-xs text-[var(--fg4)] mt-3">
              با دوربین گوشی اسکن کنید
            </p>
          </div>
        </motion.div>

        {/* Download Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          <Button className="w-full py-6 text-base gap-3 rounded-2xl bg-[var(--fg)] text-[var(--bg)] hover:opacity-90">
            <Apple size={24} />
            <div className="text-left">
              <p className="text-[10px] opacity-70">دانلود از</p>
              <p className="font-bold">App Store</p>
            </div>
          </Button>
          <Button className="w-full py-6 text-base gap-3 rounded-2xl bg-[var(--fg)] text-[var(--bg)] hover:opacity-90">
            <Bot size={24} />
            <div className="text-left">
              <p className="text-[10px] opacity-70">دانلود از</p>
              <p className="font-bold">Google Play</p>
            </div>
          </Button>
        </motion.div>

        {/* Link Copy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--glass)] border border-[var(--bdr)] rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="flex-1 bg-[var(--bg2)] rounded-xl px-4 py-3 text-sm text-[var(--fg3)] truncate font-mono">
            ridex.ir/download
          </div>
          <button
            onClick={copyLink}
            className="px-4 py-3 rounded-xl bg-[var(--fg)] text-[var(--bg)] font-bold text-sm hover:opacity-90 transition-all whitespace-nowrap"
          >
            {isCopied ? "✅ کپی شد" : "📋 کپی لینک"}
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-4 text-center hover:bg-[var(--glass2)] transition-all"
              >
                <Icon size={20} className="mx-auto text-[var(--fg3)] mb-2" />
                <span className="text-xs text-[var(--fg3)]">{feature.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--fg4)] pt-4 border-t border-[var(--bdr)]">
          نسخه ۲.۰.۰ • نیاز به اندروید ۸+ یا iOS ۱۴+
        </p>
      </div>
    </div>
  );
}