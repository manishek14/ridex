// src/features/landing/components/footer/Footer.tsx
"use client";

import Link from "next/link";

interface FooterProps {
  locale?: string;
}

export function Footer({ locale = "fa" }: FooterProps) {
  const isFa = locale === "fa";

  const cols = isFa
    ? [
        {
          title: "محصول",
          links: [
            { l: "سرویس‌ها", h: "#services" },
            { l: "قیمت‌ها", h: "#pricing" },
            { l: "دانلود", h: `/${locale}/download` },
            { l: "وبلاگ", h: `/${locale}/blog` },
          ],
        },
        {
          title: "شرکت",
          links: [
            { l: "درباره ما", h: `/${locale}/about` },
            { l: "تماس", h: `/${locale}/contact` },
            { l: "راننده شو", h: `/${locale}/driver` },
            { l: "سازمانی", h: `/${locale}/business` },
          ],
        },
        {
          title: "پشتیبانی",
          links: [
            { l: "مرکز راهنما", h: "#" },
            { l: "تیکت پشتیبانی", h: "#" },
            { l: "حریم خصوصی", h: "#" },
            { l: "شرایط استفاده", h: "#" },
          ],
        },
      ]
    : [
        {
          title: "Product",
          links: [
            { l: "Services", h: "#services" },
            { l: "Pricing", h: "#pricing" },
            { l: "Download", h: `/${locale}/download` },
            { l: "Blog", h: `/${locale}/blog` },
          ],
        },
        {
          title: "Company",
          links: [
            { l: "About Us", h: `/${locale}/about` },
            { l: "Contact", h: `/${locale}/contact` },
            { l: "Become a Driver", h: `/${locale}/driver` },
            { l: "Business", h: `/${locale}/business` },
          ],
        },
        {
          title: "Support",
          links: [
            { l: "Help Center", h: "#" },
            { l: "Support Ticket", h: "#" },
            { l: "Privacy Policy", h: "#" },
            { l: "Terms of Use", h: "#" },
          ],
        },
      ];

  return (
    <footer className="border-t border-bdr mt-0" dir={isFa ? "rtl" : "ltr"}>
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
            <p className="text-[12.5px] text-fg3 leading-[1.7] mb-4">
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
              <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-fg3 mb-4">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.l}>
                    <Link
                      href={link.h}
                      className="text-[13px] text-fg3 hover:text-fg transition-colors duration-150 no-underline"
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
          <p className="text-[12px] text-fg4">
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