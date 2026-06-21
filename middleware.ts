// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["fa", "en"] as const;
const DEFAULT_LOCALE = "fa" as const;

function hasLocalePrefix(pathname: string) {
  return SUPPORTED_LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // اگر مسیر هیچ پیشوندی نداشت (/ یا هر چیز دیگری)، هدایت کن به /fa/...
  if (!hasLocalePrefix(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // فقط روت‌های صفحه‌ای؛ _next و فایل‌های استاتیک رو کامل ignore کن
    "/((?!api|_next|favicon.ico|icons|fonts|manifest|.*\\..*).*)",
  ],
};


