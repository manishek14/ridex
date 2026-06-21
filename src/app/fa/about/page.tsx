// src/app/fa/about/page.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Users,
  Globe,
  Shield,
  Zap,
  Heart,
  Target,
  TrendingUp,
  CheckCircle,
  MapPin,
  Clock,
  Star,
  Phone,
  Mail,
  Award,
  Sparkles,
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export default function AboutPage() {
  const isFa = true;

  const stats = [
    { label: "کاربران فعال", value: "۵۰,۰۰۰+", icon: Users },
    { label: "رانندگان", value: "۱۴,۰۰۰+", icon: Users },
    { label: "سفرهای موفق", value: "۵۰M+", icon: TrendingUp },
    { label: "شهرهای تحت پوشش", value: "۲۷ شهر", icon: MapPin },
  ];

  const values = [
    { icon: Shield, label: "ایمنی", desc: "اولویت اول ما ایمنی شماست" },
    { icon: Zap, label: "سرعت", desc: "سفر در کمترین زمان ممکن" },
    { icon: Heart, label: "رضایت", desc: "تجربه‌ای لذت‌بخش برای شما" },
    { icon: Award, label: "کیفیت", desc: "بالاترین استانداردهای خدمات" },
  ];

  const team = [
    { name: "علی محمدی", role: "مدیرعامل", image: "👨‍💼" },
    { name: "سارا احمدی", role: "مدیر فنی", image: "👩‍💻" },
    { name: "رضا کریمی", role: "مدیر محصول", image: "👨‍💻" },
    { name: "مریم حسینی", role: "مدیر بازاریابی", image: "👩‍💼" },
  ];

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
        <Link href="/fa">
          <Button variant="ghost" size="sm">
            بازگشت
          </Button>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6 max-w-4xl mx-auto w-full space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Globe size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--fg)]">درباره RideX</h1>
          <p className="text-base text-[var(--fg3)] max-w-md mx-auto">
            ما در RideX به دنبال متحول کردن حمل‌ونقل شهری با فناوری هوشمند هستیم
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--glass)] border border-[var(--bdr)] rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-bold text-[var(--fg)]">داستان ما</h2>
          <p className="text-sm text-[var(--fg3)] leading-relaxed">
            RideX در سال ۱۴۰۰ با هدف ساده‌سازی حمل‌ونقل شهری آغاز به کار کرد. ما معتقدیم که
            هر سفر باید سریع، ایمن و مقرون‌به‌صرفه باشد. با استفاده از فناوری هوشمند و
            شبکه گسترده رانندگان، توانسته‌ایم تجربه‌ای متفاوت از حمل‌ونقل را برای
            میلیون‌ها کاربر در سراسر ایران فراهم کنیم.
          </p>
          <p className="text-sm text-[var(--fg3)] leading-relaxed">
            امروز، RideX یکی از بزرگ‌ترین پلتفرم‌های حمل‌ونقل هوشمند در ایران است و
            هر روز به بهبود خدمات خود ادامه می‌دهیم.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-4 text-center hover:bg-[var(--glass2)] transition-all"
              >
                <Icon size={20} className="mx-auto text-blue-400 mb-2" />
                <p className="text-xl font-black text-[var(--fg)]">{stat.value}</p>
                <p className="text-[10px] text-[var(--fg4)]">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-[var(--fg)] text-center">ارزش‌های ما</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-4 text-center hover:bg-[var(--glass2)] transition-all"
                >
                  <Icon size={24} className="mx-auto text-[var(--fg3)] mb-2" />
                  <p className="text-sm font-bold text-[var(--fg)]">{value.label}</p>
                  <p className="text-[10px] text-[var(--fg4)]">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-[var(--fg)] text-center">تیم ما</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-4 text-center hover:bg-[var(--glass2)] transition-all"
              >
                <div className="text-4xl mb-2">{member.image}</div>
                <p className="text-sm font-bold text-[var(--fg)]">{member.name}</p>
                <p className="text-[10px] text-[var(--fg4)]">{member.role}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-[var(--bdr)] rounded-2xl p-6 text-center space-y-4"
        >
          <h3 className="text-lg font-bold text-[var(--fg)]">همراه ما باشید</h3>
          <p className="text-sm text-[var(--fg3)]">
            برای اطلاع از آخرین اخبار و به‌روزرسانی‌ها، ما را در شبکه‌های اجتماعی دنبال کنید.
          </p>
          <div className="flex justify-center gap-3">
            {["𝕏", "in", "ig", "📱"].map((s, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] text-[var(--fg3)] hover:text-[var(--fg)] hover:border-[var(--bdr2)] transition-all"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link href="/fa/contact">
              <Button>
                <Phone size={16} className="mr-2" />
                تماس با ما
              </Button>
            </Link>
            <Link href="/fa">
              <Button variant="ghost">بازگشت به صفحه اصلی</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}