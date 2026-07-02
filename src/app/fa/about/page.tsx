// src/app/fa/about/page.tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  Users,
  Globe,
  Shield,
  Zap,
  Heart,
  TrendingUp,
  MapPin,
  Phone,
  Award,
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
    <div className="min-h-screen bg-bg flex flex-col items-center" dir="rtl">
      {/* Header */}
      <header className="w-full max-w-5xl px-6 py-6 flex items-center justify-between z-10">
        <Link href="/fa" className="flex items-center gap-2 no-underline group">
          <div className="w-9 h-9 rounded-xl bg-fg flex items-center justify-center text-sm font-black text-bg transition-transform group-hover:scale-110">
            R
          </div>
          <span className="text-xl font-extrabold text-fg tracking-tight">RideX</span>
        </Link>
        <Link href="/fa">
          <Button variant="ghost" size="sm" className="rounded-xl px-5">
            بازگشت
          </Button>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-4xl px-6 py-10 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center shadow-2xl shadow-blue-500/20">
              <Globe size={48} className="text-white" />
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black text-fg tracking-tight">درباره RideX</h1>
            <p className="text-lg text-fg3 max-w-lg mx-auto leading-relaxed">
              ما در RideX به دنبال متحول کردن حمل‌ونقل شهری با فناوری هوشمند و ایجاد تجربه‌ای بی‌نقص هستیم.
            </p>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg2/50 backdrop-blur-xl border border-bdr rounded-3xl p-8 sm:p-10 space-y-6 shadow-xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            داستان ما
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-fg">چگونه شروع کردیم؟</h2>
            <p className="text-[15px] text-fg3 leading-[1.8]">
              RideX در سال ۱۴۰۰ با هدف ساده‌سازی حمل‌ونقل شهری آغاز به کار کرد. ما معتقدیم که
              هر سفر باید سریع، ایمن و مقرون‌به‌صرفه باشد. با استفاده از فناوری هوشمند و
              شبکه گسترده رانندگان، توانسته‌ایم تجربه‌ای متفاوت از حمل‌ونقل را برای
              میلیون‌ها کاربر در سراسر ایران فراهم کنیم.
            </p>
            <p className="text-[15px] text-fg3 leading-[1.8]">
              امروز، RideX یکی از بزرگ‌ترین پلتفرم‌های حمل‌ونقل هوشمند در ایران است و
              هر روز با تکیه بر دانش فنی تیم خود به بهبود خدمات ادامه می‌دهیم.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-glass border border-bdr rounded-2xl p-6 text-center hover:bg-glass2 hover:border-bdr2 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-glass2 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <p className="text-2xl font-black text-fg mb-1">{stat.value}</p>
                <p className="text-xs text-fg4 font-bold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-fg">ارزش‌های ما</h2>
            <p className="text-fg3">اصولی که ما را در این مسیر هدایت می‌کنند</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-bg2/40 border border-bdr rounded-2xl p-6 hover:bg-glass2 hover:border-bdr2 transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <Icon size={24} className="text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-fg mb-2">{value.label}</h3>
                  <p className="text-sm text-fg3 leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-fg">تیم ما</h2>
            <p className="text-fg3">افرادی که RideX را می‌سازند</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-glass border border-bdr rounded-2xl p-6 text-center hover:bg-glass2 hover:border-bdr2 transition-all group"
              >
                <div className="text-5xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
                  {member.image}
                </div>
                <h3 className="text-base font-bold text-fg mb-1">{member.name}</h3>
                <p className="text-xs text-fg4 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent border border-bdr2 rounded-[32px] p-8 sm:p-12 text-center space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full" />
          
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-fg">همراه ما باشید</h3>
            <p className="text-base text-fg3 max-w-md mx-auto">
              برای اطلاع از آخرین اخبار، به‌روزرسانی‌ها و تخفیف‌های ویژه، ما را دنبال کنید.
            </p>
          </div>

          <div className="relative z-10 flex justify-center gap-4">
            {["𝕏", "in", "ig", "📱"].map((s, i) => (
              <button
                key={i}
                className="w-12 h-12 rounded-2xl bg-bg2 border border-bdr text-fg3 hover:text-fg hover:border-fg hover:-translate-y-1 transition-all shadow-lg"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/fa/contact">
              <Button size="lg" className="w-full sm:w-auto rounded-2xl px-8">
                <Phone size={18} className="ml-2" />
                تماس با ما
              </Button>
            </Link>
            <Link href="/fa">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto rounded-2xl px-8">
                بازگشت به خانه
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer Spacer */}
      <footer className="py-10 text-center">
        <p className="text-xs text-fg4">© ۱۴۰۳ RideX — تمام حقوق محفوظ است</p>
      </footer>
    </div>
  );
}
