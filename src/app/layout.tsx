// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Providers } from "@/providers";
import { ToastContainer } from "@/shared/components/feedback/Toast";
import "../styles/globals.css";
import { vazirmatn } from "./fonts";

export const metadata: Metadata = {
  title: { default: "RideX — حمل‌ونقل هوشمند", template: "%s | RideX" },
  description: "رزرو سفر در چند ثانیه، راننده تأیید‌شده، قیمت شفاف",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={vazirmatn.variable}
      suppressHydrationWarning
    >
      <head>
        {/*
          Theme init — قبل از هر چیز اجرا می‌شه تا flash نداشته باشیم
          مقداردهی اولیه data-theme بر اساس localStorage یا prefers-color-scheme
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var theme=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
