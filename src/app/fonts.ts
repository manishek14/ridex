// src/app/fonts.ts
import localFont from "next/font/local";

// ── VAZIRMATN (فارسی) ────────────────────────────────────────
export const vazirmatn = localFont({
  src: [
    {
      path: "../../public/fonts/Vazirmatn-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Vazirmatn-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Tahoma", "sans-serif"],
});

// ── ENGLISH FALLBACK ─────────────────────────────────────────
// از next/font/google استفاده نمی‌کنیم چون در محیط‌های بدون
// دسترسی به اینترنت در زمان build باعث کرش می‌شود.
// به‌جایش از فونت‌های سیستمی استاندارد استفاده می‌کنیم.
export const interFallback = "system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif";
