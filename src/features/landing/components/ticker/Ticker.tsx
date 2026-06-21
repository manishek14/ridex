// src/features/landing/components/ticker/Ticker.tsx
"use client";

interface TickerProps {
  locale?: string;
}

export function Ticker({ locale = "fa" }: TickerProps) {
  const isFa = locale === "fa";
  const items = isFa
    ? ["۸۰۰+ شهر فعال", "انتظار ۳.۲ دقیقه", "۵۰ میلیون سفر", "امتیاز ۴.۹ از ۵", "پشتیبانی ۲۴/۷", "نقشه نشان یکپارچه"]
    : ["800+ active cities", "3.2 min avg wait", "50M rides", "4.9/5 rating", "24/7 support", "Neshan Maps integrated"];

  const all = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-[var(--bdr)] py-2 sm:py-2.5 bg-[var(--bg2)]">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 26s linear infinite" }}
        dir={isFa ? "rtl" : "ltr"}
      >
        {all.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 md:px-[34px] text-[10px] sm:text-[11.5px] font-medium text-[var(--fg3)] flex-shrink-0"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {item}
            <span className="text-[var(--fg4)]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}