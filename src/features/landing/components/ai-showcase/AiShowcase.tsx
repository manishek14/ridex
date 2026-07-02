// src/features/landing/components/ai-showcase/AiShowcase.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface AiShowcaseProps {
  locale?: string;
}

const aiFeatures = [
  {
    fa: { title: "بهینه‌سازی مسیر", desc: "هوش مصنوعی ترافیک را پیش‌بینی می‌کند و سریع‌ترین مسیر را انتخاب می‌کند." },
    en: { title: "Route Optimization", desc: "AI predicts traffic and selects the fastest route in real time." },
    icon: "🗺",
  },
  {
    fa: { title: "تطابق هوشمند", desc: "الگوریتم ما بهترین راننده در کمترین زمان را برای شما پیدا می‌کند." },
    en: { title: "Smart Matching", desc: "Our algorithm finds the best driver for you in the shortest time." },
    icon: "⚡",
  },
  {
    fa: { title: "قیمت‌گذاری پویا", desc: "قیمت‌گذاری بر اساس تقاضا، ترافیک و شرایط واقعی بازار." },
    en: { title: "Dynamic Pricing", desc: "Pricing based on demand, traffic and real market conditions." },
    icon: "💡",
  },
  {
    fa: { title: "دستیار مکالمه", desc: "دستیار هوشمند ۲۴/۷ برای پشتیبانی و راهنمایی فوری." },
    en: { title: "Chat Assistant", desc: "Smart 24/7 assistant for immediate support and guidance." },
    icon: "🤖",
  },
];

const chatMessages = [
  { role: "user", fa: "یه تاکسی میخوام برم میدان آزادی", en: "I need a taxi to Freedom Square", delay: 0.5 },
  {
    role: "ai",
    fa: "سلام! ۳ راننده نزدیک شما هستن. ارزان‌ترین گزینه ۱۲,۰۰۰ تومانه، ETA ۳ دقیقه. رزرو می‌کنم؟",
    en: "Hi! 3 drivers are near you. Cheapest option is 12,000T, ETA 3 min. Shall I book?",
    delay: 1.5,
  },
  { role: "user", fa: "آره، بزن بریم!", en: "Yes, let's go!", delay: 3 },
  { role: "ai", fa: "✅ رزرو شد. احمد رضایی در راهه — ۳ دقیقه دیگه اینجاست.", en: "✅ Booked. Ahmad Rezaei is on the way — arriving in 3 min.", delay: 4.5 },
];

export function AiShowcase({ locale = "fa" }: AiShowcaseProps) {
  const isFa = locale === "fa";
  const ref = useRef<HTMLElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            chatMessages.forEach((msg, i) => {
              setTimeout(() => setVisibleMessages((v) => Math.max(v, i + 1)), msg.delay * 1000);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll(".rv");
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="ai"
      className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-[76px]"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left - Text */}
        <div>
          <div className="rv d1">
            <p className="text-[10.5px] font-bold tracking-[3px] uppercase text-fg4 mb-3">
              {isFa ? "هوش مصنوعی" : "AI-POWERED"}
            </p>
            <h2
              className="text-[clamp(28px,3.8vw,48px)] font-black tracking-tight leading-[1.05] mb-4 text-fg"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "هوشمند، سریع، دقیق" : "Intelligent, Fast, Precise"}
            </h2>
            <p
              className="text-[15px] text-fg3 mb-8 leading-[1.75]"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa
                ? "موتور هوش مصنوعی RideX هر روز میلیون‌ها داده را تحلیل می‌کند تا سفر شما سریع‌تر، ارزان‌تر و مطمئن‌تر باشد."
                : "RideX's AI engine analyzes millions of data points daily to make your ride faster, cheaper, and safer."}
            </p>
          </div>
          <div className="rv d2 grid grid-cols-2 gap-3">
            {aiFeatures.map((f, i) => {
              const d = isFa ? f.fa : f.en;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-glass border border-bdr hover:bg-glass2 hover:border-bdr2 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg bg-glass2 flex items-center justify-center text-base mb-3">
                    {f.icon}
                  </div>
                  <h4
                    className="text-[13px] font-bold text-fg mb-1"
                    style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                  >
                    {d.title}
                  </h4>
                  <p
                    className="text-[11.5px] text-fg3 leading-[1.6]"
                    style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                  >
                    {d.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - Chat UI */}
        <div className="rv d2">
          <div className="rounded-2xl bg-bg2 border border-bdr overflow-hidden">
            {/* Chat header */}
            <div className="px-4 py-3 border-b border-bdr flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span
                className="text-xs font-semibold text-fg3"
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {isFa ? "دستیار هوشمند RideX" : "RideX AI Assistant"}
              </span>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 min-h-[240px]" dir={isFa ? "rtl" : "ltr"}>
              {chatMessages.slice(0, visibleMessages).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? (isFa ? "justify-start" : "justify-end") : (isFa ? "justify-end" : "justify-start")}`}
                  style={{ animation: "slideUp 0.35s ease-out" }}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2 rounded-xl text-[12.5px] leading-[1.6] ${
                      msg.role === "user"
                        ? "bg-glass2 border border-bdr text-fg2"
                        : "bg-fg text-bg"
                    }`}
                    style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                  >
                    {isFa ? msg.fa : msg.en}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {visibleMessages < chatMessages.length && visibleMessages > 0 && visibleMessages % 2 === 1 && (
                <div className={`flex ${isFa ? "justify-end" : "justify-start"}`}>
                  <div className="flex gap-1 px-3.5 py-2 rounded-xl bg-fg/10 border border-bdr">
                    {[0, 1, 2].map((j) => (
                      <span
                        key={j}
                        className="w-1.5 h-1.5 rounded-full bg-fg3 animate-[pulse2_1.2s_ease-in-out_infinite]"
                        style={{ animationDelay: `${j * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-bdr flex gap-2">
              <input
                className="flex-1 py-2 px-3.5 rounded-lg text-xs bg-glass border border-bdr text-fg placeholder:text-fg4 outline-none"
                placeholder={isFa ? "مقصد خود را بنویسید..." : "Type your destination..."}
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                readOnly
              />
              <button className="px-3 py-2 rounded-lg bg-btn-bg text-btn-fg text-xs font-bold">
                {isFa ? "ارسال" : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}