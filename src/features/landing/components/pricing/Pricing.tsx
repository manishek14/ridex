// src/features/landing/components/pricing/Pricing.tsx
"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useReveal } from "@/shared/hooks/useReveal";

interface PlanContent {
  name: string;
  price: string;
  priceNote: string;
  cta: string;
  features: string[];
}

interface Plan {
  id: string;
  fa: PlanContent;
  en: PlanContent;
  highlight: boolean;
  href: string;
}

interface PricingProps {
  locale?: string;
}

const plans: Plan[] = [
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
    <section
      ref={revealRef}
      id="pricing"
      className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-[76px]"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="rv d1 mb-8 sm:mb-12 text-center">
        <p className="text-[10.5px] font-bold tracking-[3px] uppercase text-fg4 mb-3">
          {isFa ? "قیمت‌ها" : "PRICING"}
        </p>
        <h2
          className="text-[clamp(28px,3.8vw,48px)] font-black tracking-tight leading-[1.05] mb-3 text-fg"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {isFa ? "شفاف و منصفانه" : "Transparent & Fair"}
        </h2>
        <p
          className="text-[15px] text-fg3 max-w-[440px] mx-auto"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {isFa
            ? "قیمت رو قبل از سفر می‌بینی — بدون هزینه پنهان."
            : "See the price before you ride — no hidden fees."}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {plans.map((plan, i) => {
          const d: PlanContent = isFa ? plan.fa : plan.en;
          const isFree = plan.id === "free";
          return (
            <div
              key={plan.id}
              className={`rv d${i + 1} relative rounded-2xl flex flex-col border transition-all duration-300 ${
                plan.highlight
                  ? "bg-fg border-fg mt-0 md:-mt-3"
                  : "bg-glass border-bdr hover:border-bdr2 hover:bg-glass2"
              } ${
                isFree ? "md:scale-[1.04] md:shadow-[0_18px_45px_-20px_rgba(0,0,0,0.4)] md:py-2" : ""
              }`}
            >
              {/* Popular badge — inside card, not overflowing */}
              {plan.highlight && (
                <div
                  className="text-center py-2 border-b text-[11px] font-bold tracking-wide"
                  style={{
                    borderColor: "color-mix(in srgb, var(--bg) 12%, transparent)",
                    color: "color-mix(in srgb, var(--bg) 60%, transparent)",
                    fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined,
                  }}
                >
                  {isFa ? "✦ پرطرفدار" : "✦ Popular"}
                </div>
              )}

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Plan name */}
                <p
                  className={`text-[11px] font-bold tracking-[2px] uppercase mb-4 ${
                    plan.highlight ? "text-bg/60" : "text-fg4"
                  }`}
                  style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                >
                  {d.name}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span
                    className={`text-[36px] sm:text-[40px] font-black tracking-tight leading-none ${
                      plan.highlight ? "text-bg" : "text-fg"
                    }`}
                    style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                  >
                    {d.price}
                  </span>
                  <span
                    className={`text-[13px] ms-1 ${
                      plan.highlight ? "text-bg/60" : "text-fg3"
                    }`}
                    style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                  >
                    {d.priceNote}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {d.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        size={13}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.highlight ? "text-bg" : "text-fg2"
                        }`}
                      />
                      <span
                        className={`text-[13px] ${
                          plan.highlight ? "text-bg/80" : "text-fg2"
                        }`}
                        style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={`/${locale}${plan.href}`}
                  className={`block text-center py-3 rounded-xl text-[13px] font-bold no-underline transition-all duration-200 ${
                    plan.highlight
                      ? "bg-bg text-fg hover:opacity-90"
                      : "bg-glass2 text-fg border border-bdr2 hover:bg-fg hover:text-bg hover:border-fg"
                  }`}
                  style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                >
                  {d.cta}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
