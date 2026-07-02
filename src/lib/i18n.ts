// src/lib/i18n.ts
export const locales = ["fa", "en"] as const;
export const defaultLocale = "fa" as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// ❌ حذف getRequestConfig