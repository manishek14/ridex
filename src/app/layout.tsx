import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import "../styles/globals.css";
import { vazirmatn } from "./fonts";
import { Providers } from "@/providers";
import { ToastContainer } from "@/shared/components/feedback/Toast";

export const metadata: Metadata = {
  title: { default: "RideX — حمل‌ونقل هوشمند", template: "%s | RideX" },
  description: "رزرو سفر در چند ثانیه، راننده تأیید‌شده، قیمت شفاف",
  keywords: ["تاکسی", "سرویس", "ridex", "ride", "taxi", "iran"],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/icon-144.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ✅ چون الان middleware فقط redirect(locale-prefix) می‌کند و x-pathname set نمی‌کند
// و صفحات ما جدا هستند (src/app/fa/page.tsx و src/app/en/page.tsx)، در RootLayout
// فقط fa را پیش‌فرض می‌گذاریم.
type Locale = "fa" | "en";

async function getTheme(): Promise<"dark" | "light"> {
  try {
    const cookieStore = await cookies();
    const theme = cookieStore.get("theme")?.value;
    if (theme === "dark" || theme === "light") return theme;
    return "dark";
  } catch {
    return "dark";
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getTheme();

  // RootLayout فقط HTML اسکلت می‌سازد؛ locale را از route می‌گیریم.
  // چون الان مسیرهای app به صورت /fa و /en جدا هستند، اینجا پیش‌فرض خنثی می‌گذاریم.
  return (
    <html
      lang={"fa"}
      dir={"rtl"}
      suppressHydrationWarning
      className={vazirmatn.variable}
      data-theme={theme}
    >
      <body className={vazirmatn.variable} suppressHydrationWarning>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}

