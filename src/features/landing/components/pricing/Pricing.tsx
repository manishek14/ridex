"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useReveal } from "@/shared/hooks/useReveal";

interface PricingProps {
  locale?: string;
}

const plans = [
  {
    id: "free",
    fa: { name: "رایگان", price: "رایگان", priceNote: "همیشه", cta: "شروع کن", features: ["سرویس Go و Pool", "تا ۵ سفر در ماه", "پشتیبانی پیام", "ردیابی پایه"] },
    en: { name: "Free", price: "Free", priceNote: "forever", cta: "Get Started", features: ["Go & Pool service", "Up to 5 rides/month", "Chat support", "Basic tracking"] },
    highlight: false,
    href: "/register",
  },
  {
    id: "plus",
    fa: { name: "پلاس", price: "۴۹,۰۰۰", priceNote: "تومان در ماه", cta: "خرید اشتراک", features: ["همه سرویس‌ها بدون محدودیت", "سفرهای نامحدود", "پشتیبانی اولویت‌دار", "ردیابی پیشرفته", "تخفیف ۱۵٪ روی همه سفرها", "کد تخفیف ماهانه"] },
    en: { name: "Plus", price: "49,000", priceNote: "T/month", cta: "Subscribe", features: ["All services unlimited", "Unlimited rides", "Priority support", "Advanced tracking", "15% discount on all rides", "Monthly promo code"] },
    highlight: true,
    href: "/register?plan=plus",
  },
  {
    id: "business",
    fa: { name: "سازمانی", price: "سفارشی", priceNote: "بر اساس تیم", cta: "تماس بگیر", features: ["همه امکانات پلاس", "پنل مدیریت سازمانی", "گزارش‌های تفصیلی", "مدیریت کارمندان", "صورت‌حساب یکپارچه", "پشتیبانی اختصاصی", "SLA ۹۹.۹٪"] },
    en: { name: "Business", price: "Custom", priceNote: "per team", cta: "Contact Us", features: ["All Plus features", "Corporate admin panel", "Detailed reports", "Employee management", "Unified billing", "Dedicated support", "99.9% SLA"] },
    highlight: false,
    href: "/business",
  },
];

export function Pricing({ locale = "fa" }: PricingProps) {
  const isFa = locale === "fa";
  const revealRef = useReveal();

  return (
    <section ref={revealRef as any} id="pricing" className="max-w-[1180px] mx-auto px-10 py-[76px]" dir={isFa ? "rtl" : "ltr"}>
      <div className="rv d1 mb-12 text-center">
        <p className="text-[10.5px] font-bold tracking-[3px] uppercase text-[var(--fg4)] mb-3">{isFa ? "قیمت‌ها" : "PRICING"}</p>
        <h2 className="text-[clamp(28px,3.8vw,48px)] font-black tracking-tight leading-[1.05] mb-3 text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
          {isFa ? "شفاف و منصفانه" : "Transparent & Fair"}
        </h2>
        <p className="text-[15px] text-[var(--fg3)] max-w-[440px] mx-auto" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
          {isFa ? "قیمت رو قبل از سفر می‌بینی — بدون هزینه پنهان." : "See the price before you ride — no hidden fees."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan, i) => {
          const d = isFa ? plan.fa : plan.en;
          return (
            <div key={plan.id} className={`rv d${i + 1} relative rounded-2xl p-7 flex flex-col border transition-all duration-300 ${plan.highlight ? "bg-[var(--fg)] border-[var(--fg)] text-[var(--bg)] scale-[1.02]" : "bg-[var(--glass)] border-[var(--bdr)] hover:border-[var(--bdr2)] hover:bg-[var(--glass2)]"}`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[var(--bg)] text-[var(--fg)] text-[11px] font-bold whitespace-nowrap" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                  {isFa ? "✦ پرطرفدار" : "✦ Popular"}
                </div>
              )}
              <p className={`text-[11px] font-bold tracking-[2px] uppercase mb-3 ${plan.highlight ? "text-[var(--bg)]/60" : "text-[var(--fg4)]"}`}>{d.name}</p>
              <div className="mb-6">
                <span className={`text-[40px] font-black tracking-tight leading-none ${plan.highlight ? "text-[var(--bg)]" : "text-[var(--fg)]"}`} style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{d.price}</span>
                <span className={`text-[13px] mr-1 ${plan.highlight ? "text-[var(--bg)]/60" : "text-[var(--fg3)]"}`} style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{d.priceNote}</span>
              </div>
              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {d.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <Check size={13} className={`mt-0.5 flex-shrink-0 ${plan.highlight ? "text-[var(--bg)]" : "text-[var(--fg2)]"}`} />
                    <span className={`text-[13px] ${plan.highlight ? "text-[var(--bg)]/80" : "text-[var(--fg2)]"}`} style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}${plan.href}`} className={`block text-center py-3 rounded-xl text-[13px] font-bold no-underline transition-all duration-200 ${plan.highlight ? "bg-[var(--bg)] text-[var(--fg)] hover:opacity-88" : "bg-[var(--glass2)] text-[var(--fg)] border border-[var(--bdr2)] hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)]"}`} style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {d.cta}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
