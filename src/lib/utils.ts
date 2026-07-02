import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ── CLASS MERGE ──────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── PRICE FORMATTER ──────────────────────────────────────────
export function formatPrice(
  amount: number,
  locale: "fa" | "en" = "fa"
): string {
  if (locale === "fa") {
    const formatted = new Intl.NumberFormat("fa-IR").format(amount);
    return `${formatted} تومان`;
  }
  return new Intl.NumberFormat("en-US").format(amount) + " T";
}

// ── PERSIAN NUMBER ───────────────────────────────────────────
export function toPersianNum(num: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
}

// ── DATE FORMATTER ───────────────────────────────────────────
export function formatDate(dateStr: string, locale: "fa" | "en" = "fa"): string {
  const date = new Date(dateStr);
  if (locale === "fa") {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function timeAgo(dateStr: string, locale: "fa" | "en" = "fa"): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (locale === "fa") {
    if (diffMins < 1) return "همین الان";
    if (diffMins < 60) return `${toPersianNum(diffMins)} دقیقه پیش`;
    if (diffHours < 24) return `${toPersianNum(diffHours)} ساعت پیش`;
    return `${toPersianNum(diffDays)} روز پیش`;
  }

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

// ── DISTANCE ─────────────────────────────────────────────────
export function formatDistance(km: number, locale: "fa" | "en" = "fa"): string {
  if (locale === "fa") {
    return km < 1
      ? `${toPersianNum(Math.round(km * 1000))} متر`
      : `${toPersianNum(km.toFixed(1))} کیلومتر`;
  }
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`;
}

// ── RIDE STATUS LABEL ────────────────────────────────────────
export function getRideStatusLabel(status: string, locale: "fa" | "en" = "fa") {
  const map: Record<string, { fa: string; en: string; color: string }> = {
    searching:   { fa: "جستجوی راننده", en: "Searching",   color: "badge-yellow" },
    found:       { fa: "راننده پیدا شد", en: "Driver Found", color: "badge-blue"   },
    arriving:    { fa: "در راهه",        en: "Arriving",    color: "badge-blue"   },
    in_progress: { fa: "در حال سفر",    en: "In Progress", color: "badge-green"  },
    completed:   { fa: "تموم شد",       en: "Completed",   color: "badge-green"  },
    cancelled:   { fa: "لغو شد",        en: "Cancelled",   color: "badge-red"    },
  };
  return map[status] ?? { fa: status, en: status, color: "badge-gray" };
}

export function getRideTypeLabel(type: string, locale: "fa" | "en" = "fa") {
  const map: Record<string, { fa: string; en: string; icon: string }> = {
    go:      { fa: "RideX Go",      en: "RideX Go",      icon: "🚗" },
    pool:    { fa: "RideX Pool",    en: "RideX Pool",    icon: "🚐" },
    premium: { fa: "Premium",       en: "Premium",       icon: "✦" },
    moto:    { fa: "RideX Moto",    en: "RideX Moto",    icon: "🛺" },
    send:    { fa: "RideX Send",    en: "RideX Send",    icon: "📦" },
  };
  return map[type] ?? { fa: type, en: type, icon: "🚗" };
}

// ── TRANSACTION TYPE LABEL ───────────────────────────────────
export function getTransactionLabel(type: string, locale: "fa" | "en" = "fa") {
  const map: Record<string, { fa: string; en: string; sign: "+" | "-"; color: string }> = {
    deposit:      { fa: "شارژ کیف پول",     en: "Deposit",     sign: "+", color: "text-green-400" },
    withdraw:     { fa: "برداشت",            en: "Withdraw",    sign: "-", color: "text-red-400"   },
    ride_payment: { fa: "پرداخت سفر",       en: "Ride Payment",sign: "-", color: "text-red-400"   },
    ride_refund:  { fa: "استرداد سفر",      en: "Refund",      sign: "+", color: "text-green-400" },
    promo:        { fa: "تخفیف",            en: "Promo",       sign: "+", color: "text-yellow-400"},
  };
  return map[type] ?? { fa: type, en: type, sign: "+", color: "text-gray-400" };
}

// ── DEBOUNCE ─────────────────────────────────────────────────
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── TRUNCATE ─────────────────────────────────────────────────
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
}

// ── LOCAL STORAGE ────────────────────────────────────────────
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: unknown): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch { /* noop */ }
  },
  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
};
