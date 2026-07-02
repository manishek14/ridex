// src/features/landing/components/bento-features/BentoFeatures.tsx
"use client";

import { useEffect, useRef } from "react";

interface BentoFeaturesProps {
  locale?: string;
}

export function BentoFeatures({ locale = "fa" }: BentoFeaturesProps) {
  const isFa = locale === "fa";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".rv");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.07 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const t = isFa
    ? {
        tag: "ویژگی‌ها",
        title: "همه چیز در یک جا",
        subtitle: "بدون نیاز به چند اپ. RideX همه چیز را پوشش می‌دهد.",
        live: "زنده",
        mapTitle: "نقشه هوشمند",
        mapDesc: "یکپارچه با نشان — دقیق‌ترین نقشه ایران",
        walletTitle: "کیف پول",
        walletBalance: "۱,۲۳۳,۰۰۰",
        walletLabel: "تومان موجودی",
        items: [
          { icon: "📍", title: "ردیابی لحظه‌ای", desc: "موقعیت راننده را در لحظه روی نقشه ببین." },
          { icon: "💳", title: "کیف پول یکپارچه", desc: "یه بار شارژ کن، همیشه سریع پرداخت کن." },
          { icon: "⭐", title: "امتیازدهی منصفانه", desc: "بعد از هر سفر راننده را ارزیابی کن." },
          { icon: "🔔", title: "اعلان آنی", desc: "وضعیت سفر را لحظه به لحظه بدان." },
          { icon: "🌙", title: "حالت شبانه", desc: "طراحی دارک که چشم‌نواز و راحته." },
          { icon: "📊", title: "گزارش هزینه", desc: "تاریخچه کامل سفرها و هزینه‌ها." },
        ],
      }
    : {
        tag: "FEATURES",
        title: "Everything in One Place",
        subtitle: "No need for multiple apps. RideX covers everything.",
        live: "Live",
        mapTitle: "Smart Map",
        mapDesc: "Integrated with Neshan — Iran's most accurate map",
        walletTitle: "Wallet",
        walletBalance: "1,233,000",
        walletLabel: "T balance",
        items: [
          { icon: "📍", title: "Live Tracking", desc: "See the driver's location on the map in real time." },
          { icon: "💳", title: "Integrated Wallet", desc: "Charge once, pay fast every time." },
          { icon: "⭐", title: "Fair Rating", desc: "Rate your driver after every ride." },
          { icon: "🔔", title: "Instant Alerts", desc: "Know your ride status every second." },
          { icon: "🌙", title: "Dark Mode", desc: "Eye-friendly design for day and night." },
          { icon: "📊", title: "Cost Reports", desc: "Full history of trips and expenses." },
        ],
      };

  return (
    <section
      ref={ref}
      id="features"
      className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-[76px]"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="rv d1 mb-8 sm:mb-12 text-center">
        <p className="text-[10.5px] font-bold tracking-[3px] uppercase text-fg4 mb-3">{t.tag}</p>
        <h2
          className="text-[clamp(28px,3.8vw,48px)] font-black tracking-tight leading-[1.05] mb-3 text-fg"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {t.title}
        </h2>
        <p
          className="text-[15px] text-fg3 max-w-[480px] mx-auto"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {t.subtitle}
        </p>
      </div>

      {/* Bento Grid — 3 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Big map card — spans 2 cols */}
        <div className="rv d1 sm:col-span-2 rounded-2xl bg-glass border border-bdr p-6 min-h-[220px] relative overflow-hidden group hover:border-bdr2 transition-all duration-300">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {t.live}
            </div>
            <h3
              className="text-xl font-extrabold text-fg mb-2"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {t.mapTitle}
            </h3>
            <p
              className="text-sm text-fg3"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {t.mapDesc}
            </p>
          </div>
          {/* Decorative dots */}
          <div
            className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, var(--bdr2) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Car dots */}
          {[
            { top: "45%", left: "30%", delay: "0s" },
            { top: "60%", left: "55%", delay: "1s" },
            { top: "35%", left: "65%", delay: "2s" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-6 h-6 rounded-full bg-bg2 border border-bdr2 flex items-center justify-center text-xs animate-[float_5s_ease-in-out_infinite]"
              style={{ top: pos.top, left: pos.left, animationDelay: pos.delay }}
            >
              🚗
            </div>
          ))}
        </div>

        {/* Wallet card — dark bg, light text */}
        <div className="rv d2 rounded-2xl border border-bdr p-6 relative overflow-hidden group min-h-[220px] bg-bg3 hover:border-bdr2 transition-all duration-300">
          {/* Gradient overlay for visual depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="text-2xl mb-3">💳</div>
            <h3
              className="text-lg font-extrabold text-fg mb-2"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {t.walletTitle}
            </h3>
            <div
              className="text-2xl sm:text-3xl font-black text-fg mb-1"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {t.walletBalance}
            </div>
            <div className="text-sm text-fg3">
              {t.walletLabel}
            </div>
          </div>
        </div>

        {/* 6 small feature cards */}
        {t.items.map((item, i) => (
          <div
            key={i}
            className={`rv d${Math.min(i + 1, 4)} rounded-2xl bg-glass border border-bdr p-5 hover:bg-glass2 hover:border-bdr2 hover:-translate-y-0.5 transition-all duration-200`}
          >
            <div className="w-10 h-10 rounded-xl bg-glass2 flex items-center justify-center text-lg mb-3">
              {item.icon}
            </div>
            <h4
              className="text-[14px] font-bold text-fg mb-1.5"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {item.title}
            </h4>
            <p
              className="text-[12px] text-fg3 leading-[1.65]"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
