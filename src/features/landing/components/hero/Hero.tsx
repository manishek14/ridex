// src/features/landing/components/hero/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const LeafletMiniMap = dynamic(() => import("@/shared/components/map/LeafletMiniMap").then(m => m.LeafletMiniMap), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 rounded-[26px] bg-bg2 border border-bdr animate-pulse" />
  ),
});

interface HeroProps {
  locale?: string;
}

export function Hero({ locale = "fa" }: HeroProps) {
  const isFa = locale === "fa";
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) setTimeout(() => el.classList.add("on"), 100);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rv min-h-[640px] sm:min-h-screen pt-[100px] pb-[56px] px-4 sm:px-6 md:px-10 max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center relative"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* Dot grid — clipped so it doesn't overflow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--bdr2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 90% at 50% 50%, black 20%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 90% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* ── LEFT: Text content ── */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7 bg-glass border border-bdr text-[12px] font-semibold text-fg2 tracking-[0.3px]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-fg animate-[pulse2_2s_ease-in-out_infinite]" />
          {isFa ? "۷۴۵۹ راننده آماده به خدمت" : "140,000 drivers online now"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[clamp(52px,6.5vw,84px)] font-black leading-[0.95] tracking-[-3px] mb-[22px] text-fg"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          <span className="block">{isFa ? "سفر." : "Ride."}</span>
          <span
            className="block"
            style={{ color: "transparent", WebkitTextStroke: "1.5px var(--fg3)" }}
          >
            {isFa ? "سریع‌تر و" : "Faster."}
          </span>
          <span className="block">{isFa ? "بهتر." : "Better."}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base text-fg3 leading-[1.75] max-w-[390px] mb-[34px]"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {isFa
            ? "رزرو در چند ثانیه، راننده تأیید‌شده، قیمت شفاف. حمل‌ونقل هوشمند برای هر روز."
            : "Book in seconds, verified driver, transparent pricing. Smart transport for every day."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 flex-wrap mb-11"
        >
          <Link
            href={`/${locale}/passenger/booking`}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-btn-bg text-btn-fg hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200 no-underline"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "رزرو سفر" : "Book a Ride"}
            <span>{isFa ? "←" : "→"}</span>
          </Link>
          <Link
            href={`/${locale}/driver`}
            className="px-5 py-[11px] rounded-xl text-sm font-semibold bg-glass text-fg2 border border-bdr2 hover:text-fg hover:bg-glass2 backdrop-blur-md transition-all duration-200 no-underline"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "راننده شو" : "Become a Driver"}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2 flex-wrap"
        >
          {[
            { icon: "★", text: isFa ? "۴.۹ امتیاز" : "4.9 Rating" },
            { icon: "🛡", text: isFa ? "تأیید‌شده" : "Verified" },
            { icon: "⚡", text: isFa ? "۳ دقیقه" : "3 min" },
          ].map((pill) => (
            <div
              key={pill.text}
              className="flex items-center gap-1.5 px-3.5 py-[7px] rounded-full bg-glass border border-bdr text-xs font-semibold text-fg2 backdrop-blur-md hover:bg-glass2 hover:border-bdr2 transition-all duration-150"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              <span>{pill.icon}</span>
              {pill.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Map card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative z-10 h-[340px] sm:h-[420px] md:h-[460px] hidden md:block"
      >
        <div className="absolute inset-0 rounded-[26px] overflow-hidden bg-bg2 border border-bdr">
          {/* Real Leaflet map (loaded client-side) */}
          <LeafletMiniMap isFa={isFa} />

          {/* Floating info cards (theme-aware) */}
          <div
            className="absolute top-3.5 end-3.5 z-[400] bg-bg2/95 backdrop-blur-xl border border-bdr2 rounded-xl p-2.5 px-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] animate-[float_5s_ease-in-out_infinite]"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-fg4 mb-0.5">ETA</div>
            <div className="text-[12.5px] font-extrabold text-fg">
              {isFa ? "۳ دقیقه" : "3 min"}
            </div>
          </div>

          <div
            className="absolute top-3.5 start-3.5 z-[400] bg-bg2/95 backdrop-blur-xl border border-bdr2 rounded-xl p-2.5 px-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] animate-[float_5s_ease-in-out_infinite] [animation-delay:-2.2s]"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            <div className="text-[9px] font-bold tracking-[1.5px] uppercase text-fg4 mb-0.5">
              {isFa ? "امتیاز" : "Rating"}
            </div>
            <div className="text-[12.5px] font-extrabold text-fg">★ 4.92</div>
          </div>

          {/* Bottom bar */}
          <div
            className="absolute bottom-3.5 start-3.5 end-3.5 z-[400] bg-bg2/95 backdrop-blur-xl border border-bdr2 rounded-[14px] p-[13px] px-[15px] flex items-center justify-between gap-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
            dir={isFa ? "rtl" : "ltr"}
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            <div>
              <div className="text-[9.5px] font-bold tracking-[1.5px] uppercase text-fg4 mb-0.5">
                {isFa ? "مقصد" : "Dest."}
              </div>
              <div className="text-[13px] font-bold text-fg">
                {isFa ? "میدان آزادی" : "Freedom Sq."}
              </div>
            </div>
            <div className="w-px h-7" style={{ background: "var(--bdr2)" }} />
            <div className="text-center">
              <div className="text-[15px] font-extrabold text-fg">{isFa ? "۱۲K" : "12K"}</div>
              <div className="text-[9.5px] text-fg3">{isFa ? "تومان" : "T"}</div>
            </div>
            <div className="w-px h-7" style={{ background: "var(--bdr2)" }} />
            <div className="text-center">
              <div className="text-[15px] font-extrabold text-fg">{isFa ? "۳ دق" : "3 min"}</div>
              <div className="text-[9.5px] text-fg3">{isFa ? "انتظار" : "wait"}</div>
            </div>
            <Link
              href={`/${locale}/passenger/booking`}
              className="px-4 py-2.5 rounded-[9px] bg-btn-bg text-btn-fg text-[12.5px] font-bold whitespace-nowrap hover:opacity-90 transition-opacity no-underline"
            >
              {isFa ? "رزرو" : "Book"}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
