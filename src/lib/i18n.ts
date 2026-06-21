// src/lib/i18n.ts
// این فایل دیگر به next-intl وابسته نیست؛ چون locale یک پوشه واقعی
// (fa/ و en/) است نه یک سگمنت پویا، فقط ثابت‌ها و کمک‌تابع‌های ساده
// زبان اینجا نگه‌داری می‌شوند.

export const locales = ["fa", "en"] as const;
export const defaultLocale = "fa" as const;

export type Locale = (typeof locales)[number];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
