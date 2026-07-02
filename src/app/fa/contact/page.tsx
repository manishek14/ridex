// src/app/fa/contact/page.tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Headphones,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAppSelector } from "@/store";
import { useToast } from "@/shared/components/feedback/Toast";

export default function ContactPage() {
  const user = useAppSelector((state) => state.auth.user);
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactInfo = [
    { icon: Phone, label: "پشتیبانی", value: "۰۲۱-۱۲۳۴-۵۶۷۸", sub: "۲۴ ساعته" },
    { icon: Mail, label: "ایمیل", value: "support@ridex.ir", sub: "پاسخ در ۲۴ ساعت" },
    { icon: MapPin, label: "آدرس", value: "تهران، خیابان ولیعصر، ساختمان RideX", sub: "طبقه ۵" },
    { icon: Clock, label: "ساعت کاری", value: "شنبه تا چهارشنبه ۹ تا ۱۸", sub: "پشتیبانی ۲۴/۷" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("پیام شما با موفقیت ارسال شد!");
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

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
        <div className="flex items-center gap-2">
          {user && (
            <Link href="/fa/passenger/dashboard">
              <Button variant="ghost" size="sm">
                داشبورد
              </Button>
            </Link>
          )}
          <Link href="/fa">
            <Button variant="ghost" size="sm">
              بازگشت
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Headphones size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-fg">تماس با ما</h1>
          <p className="text-base text-fg3 max-w-md mx-auto">
            ما اینجا هستیم تا به شما کمک کنیم. هر سوال یا نظری دارید، با ما در میان بگذارید
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div
                key={index}
                className="bg-glass border border-bdr rounded-xl p-4 flex items-start gap-3 hover:bg-glass2 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-fg4">{info.label}</p>
                  <p className="text-sm font-semibold text-fg">{info.value}</p>
                  <p className="text-xs text-fg3">{info.sub}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-bg2 border border-bdr rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-fg mb-4 text-center">
            ارسال پیام
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="نام کامل"
                placeholder="نام خود را وارد کنید"
                required
              />
              <Input
                label="ایمیل"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <Input
              label="موضوع"
              placeholder="موضوع پیام"
              required
            />
            <div>
              <label className="text-xs font-medium text-fg3 block mb-1">
                متن پیام
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-xl bg-glass border border-bdr text-fg text-sm placeholder:text-fg4 outline-none focus:border-bdr2 transition-all min-h-[120px] resize-none"
                placeholder="پیام خود را بنویسید..."
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSuccess ? (
                <>
                  <CheckCircle size={16} className="mr-2" />
                  ارسال شد ✅
                </>
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  ارسال پیام
                </>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-3"
        >
          <p className="text-sm text-fg3">ما را در شبکه‌های اجتماعی دنبال کنید</p>
          <div className="flex justify-center gap-3">
            {["𝕏", "in", "ig", "📱", "🎵"].map((s, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-xl bg-glass border border-bdr text-fg3 hover:text-fg hover:border-bdr2 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}