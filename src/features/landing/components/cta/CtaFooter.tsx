"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface CtaProps {
  locale?: string;
}

export function Cta({ locale = "fa" }: CtaProps) {
  const isFa = locale === "fa";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="rv max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-[76px]" dir={isFa ? "rtl" : "ltr"}>
      <div className="relative rounded-[28px] overflow-hidden border border-bdr bg-bg2 p-8 sm:p-[60px] text-center">
        {/* BG dots */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, var(--bdr2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
        <div className="relative z-10">
          <p className="text-[10.5px] font-bold tracking-[3px] uppercase text-fg4 mb-4">
            {isFa ? "شروع کن" : "GET STARTED"}
          </p>
          <h2
            className="text-[clamp(32px,4.5vw,60px)] font-black tracking-tight leading-[1.05] mb-5 text-fg"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "آماده اولین سفری؟" : "Ready for your first ride?"}
          </h2>
          <p
            className="text-[15px] text-fg3 mb-9 max-w-[420px] mx-auto leading-[1.7]"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa
              ? "همین الان ثبت‌نام کن و اولین سفرت رو با ۳۰٪ تخفیف تجربه کن."
              : "Sign up now and experience your first ride with 30% off."}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href={`/${locale}/register`}
              className="px-8 py-3.5 rounded-xl text-[14px] font-bold bg-btn-bg text-btn-fg hover:opacity-88 hover:-translate-y-0.5 transition-all duration-200 no-underline"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? " شروع رایگان " : "Start for Free"}
            </Link>
            <Link
              href={`/${locale}/download`}
              className="px-6 py-3.5 rounded-xl text-[14px] font-semibold bg-glass border border-bdr2 text-fg2 hover:text-fg hover:bg-glass2 backdrop-blur-md transition-all duration-200 no-underline"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "دانلود اپ" : "Download App"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
interface FooterProps {
  locale?: string;
}

export function Footer({ locale = "fa" }: FooterProps) {
  const isFa = locale === "fa";

  const cols = isFa
    ? [
        { title: "محصول", links: [{ l: "سرویس‌ها", h: "#services" }, { l: "قیمت‌ها", h: "#pricing" }, { l: "دانلود", h: `/${locale}/download` }, { l: "وبلاگ", h: `/${locale}/blog` }] },
        { title: "شرکت",  links: [{ l: "درباره ما", h: `/${locale}/about` }, { l: "تماس", h: `/${locale}/contact` }, { l: "راننده شو", h: `/${locale}/driver` }, { l: "سازمانی", h: `/${locale}/business` }] },
        { title: "پشتیبانی", links: [{ l: "مرکز راهنما", h: "#" }, { l: "تیکت پشتیبانی", h: "#" }, { l: "حریم خصوصی", h: "#" }, { l: "شرایط استفاده", h: "#" }] },
      ]
    : [
        { title: "Product", links: [{ l: "Services", h: "#services" }, { l: "Pricing", h: "#pricing" }, { l: "Download", h: `/${locale}/download` }, { l: "Blog", h: `/${locale}/blog` }] },
        { title: "Company", links: [{ l: "About Us", h: `/${locale}/about` }, { l: "Contact", h: `/${locale}/contact` }, { l: "Become a Driver", h: `/${locale}/driver` }, { l: "Business", h: `/${locale}/business` }] },
        { title: "Support", links: [{ l: "Help Center", h: "#" }, { l: "Support Ticket", h: "#" }, { l: "Privacy Policy", h: "#" }, { l: "Terms of Use", h: "#" }] },
      ];

  return (
    <footer
      className="border-t border-bdr mt-0"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-fg flex items-center justify-center text-[13px] font-black text-bg">
                R
              </div>
              <span className="text-base font-extrabold tracking-tight text-fg">RideX</span>
            </div>
            <p
              className="text-[12.5px] text-fg3 leading-[1.7] mb-4"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa
                ? "حمل‌ونقل هوشمند برای ایران. سریع، ایمن، قابل اعتماد."
                : "Smart transport for Iran. Fast, safe, reliable."}
            </p>
            <div className="flex gap-2">
              {["𝕏", "in", "ig"].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-lg bg-glass border border-bdr text-[11px] font-bold text-fg3 hover:text-fg hover:border-bdr2 transition-all duration-150"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <p
                className="text-[11px] font-bold tracking-[1.5px] uppercase text-fg3 mb-4"
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.l}>
                    <Link
                      href={link.h}
                      className="text-[13px] text-fg3 hover:text-fg transition-colors duration-150 no-underline"
                      style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                    >
                      {link.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-7 border-t border-bdr flex flex-col md:flex-row items-center justify-between gap-3">
          <p
            className="text-[12px] text-fg4"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa
              ? "© 1405 رایدکس. تمامی حقوق محفوظ است."
              : "© 2026 RideX. All rights reserved."}
          </p>
          <div className="flex gap-2">
            <Link
              href={`/fa`}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 no-underline ${
                isFa
                  ? "bg-glass2 border border-bdr2 text-fg"
                  : "text-fg4 hover:text-fg3"
              }`}
            >
              فارسی
            </Link>
            <Link
              href={`/en`}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-150 no-underline ${
                !isFa
                  ? "bg-glass2 border border-bdr2 text-fg"
                  : "text-fg4 hover:text-fg3"
              }`}
            >
              English
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
