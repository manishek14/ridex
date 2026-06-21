"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface ServicesProps {
  locale?: string;
}

const services = [
  {
    icon: "🚗",
    fa: { name: "RideX Go", desc: "سریع‌ترین مسیر با قیمت مناسب. ایده‌آل برای سفرهای روزانه." },
    en: { name: "RideX Go", desc: "Fastest route at the best price. Ideal for daily commutes." },
    tag: "go",
    highlight: false,
  },
  {
    icon: "🚐",
    fa: { name: "RideX Pool", desc: "سفر مشترک، هزینه کمتر. برای مسافران هم‌مسیر." },
    en: { name: "RideX Pool", desc: "Shared rides, lower cost. For passengers on the same route." },
    tag: "pool",
    highlight: false,
  },
  {
    icon: "✦",
    fa: { name: "Premium", desc: "خودروهای لوکس، خدمات VIP. برای لحظه‌های خاص." },
    en: { name: "Premium", desc: "Luxury cars, VIP service. For special occasions." },
    tag: "premium",
    highlight: true,
  },
  {
    icon: "🛺",
    fa: { name: "RideX Moto", desc: "موتور با سرعت بالا در ترافیک. رسیدن آن تایم. ." },
    en: { name: "RideX Moto", desc: "Fast motorcycle through traffic. On time, always." },
    tag: "moto",
    highlight: false,
  },
  {
    icon: "📦",
    fa: { name: "RideX Send", desc: "ارسال بسته در 15 دقیقه. سریع، ایمن، قابل ردیابی." },
    en: { name: "RideX Send", desc: "Same-day package delivery. Fast, safe, trackable." },
    tag: "send",
    highlight: false,
  },
  {
    icon: "🏢",
    fa: { name: "Business", desc: "راهکار سازمانی برای تیم‌ها. مدیریت متمرکز سفرها." },
    en: { name: "Business", desc: "Corporate solution for teams. Centralized trip management." },
    tag: "business",
    highlight: false,
  },
];

export function Services({ locale = "fa" }: ServicesProps) {
  const isFa = locale === "fa";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".rv");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        }),
      { threshold: 0.07 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="services"
      className="max-w-[1180px] mx-auto px-10 py-[76px]"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="rv d1 mb-12">
        <p className="text-[10.5px] font-bold tracking-[3px] uppercase text-[var(--fg4)] mb-3">
          {isFa ? "خدمات" : "SERVICES"}
        </p>
        <h2
          className="text-[clamp(28px,3.8vw,48px)] font-black tracking-tight leading-[1.05] mb-3 text-[var(--fg)]"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {isFa ? "هر سفر، یک راه‌حل" : "Every trip, one solution"}
        </h2>
        <p
          className="text-[15px] text-[var(--fg3)] max-w-[480px]"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {isFa
            ? "از موتور در ترافیک تا سواری لوکس VIP — حتی در شرایط بدون اینترنت ما کنارتیم."
            : "From a fast motorcycle in traffic to VIP luxury — we've got every need covered."}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((svc, i) => {
          const d = isFa ? svc.fa : svc.en;
          return (
            <div
              key={svc.tag}
              className={`rv d${Math.min(i + 1, 4)} group relative rounded-2xl p-[26px] border transition-all duration-300 cursor-pointer overflow-hidden ${
                svc.highlight
                  ? "bg-[var(--fg)] border-[var(--fg)] text-[var(--bg)]"
                  : "bg-[var(--glass)] border-[var(--bdr)] hover:bg-[var(--glass2)] hover:border-[var(--bdr2)] hover:-translate-y-0.5"
              }`}
            >
              {svc.highlight && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/10 text-[10px] font-bold tracking-wide text-black/60">
                  {isFa ? "پرطرفدار" : "Popular"}
                </div>
              )}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5 transition-transform duration-200 group-hover:-translate-y-0.5 ${
                  svc.highlight ? "bg-black/10" : "bg-[var(--glass2)]"
                }`}
              >
                {svc.icon}
              </div>
              <h3
                className={`text-[18px] font-extrabold mb-2 ${
                  svc.highlight ? "text-[var(--bg)]" : "text-[var(--fg)]"
                }`}
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {d.name}
              </h3>
              <p
                className={`text-[13px] leading-[1.65] mb-5 ${
                  svc.highlight ? "text-[var(--bg)]/70" : "text-[var(--fg3)]"
                }`}
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {d.desc}
              </p>
              <Link
                href={`/${locale}/passenger/booking?type=${svc.tag}`}
                className={`inline-flex items-center gap-1 text-[12.5px] font-semibold no-underline transition-all duration-150 ${
                  svc.highlight
                    ? "text-[var(--bg)] hover:gap-2"
                    : "text-[var(--fg3)] hover:text-[var(--fg)] hover:gap-2"
                }`}
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {isFa ? "رزرو کن" : "Book Now"}
                <span>{isFa ? "←" : "→"}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
