/**
 * Format currency with locale support
 */
export function formatCurrency(
  amount: number,
  locale: string = "fa",
  currency: string = "IRR"
): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format distance in kilometers
 */
export function formatDistance(km: number, locale: string = "fa"): string {
  if (km < 1) {
    const meters = Math.round(km * 1000);
    return locale === "fa" ? `${meters} متر` : `${meters}m`;
  }
  return locale === "fa"
    ? `${km.toFixed(1)} کیلومتر`
    : `${km.toFixed(1)} km`;
}

/**
 * Format time duration
 */
export function formatDuration(minutes: number, locale: string = "fa"): string {
  if (minutes < 60) {
    return locale === "fa" ? `${minutes} دقیقه` : `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (locale === "fa") {
    return mins > 0 ? `${hours} ساعت و ${mins} دقیقه` : `${hours} ساعت`;
  }
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Format date with locale support
 */
export function formatDate(date: Date | string, locale: string = "fa"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj);
}

/**
 * Format time (HH:MM)
 */
export function formatTime(date: Date | string, locale: string = "fa"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}
