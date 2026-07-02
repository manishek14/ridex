// src/features/landing/components/navbar/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale?: string;
}

export function Navbar({ locale = "fa" }: NavbarProps) {
  const dispatch = useAppDispatch();
  const resolved = useAppSelector((s) => s.theme.resolved);
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const user = useAppSelector((s) => s.auth.user);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isFa = locale === "fa";

  const links = isFa
    ? [
        { label: "خدمات", href: "#services" },
        { label: "هوش مصنوعی", href: "#ai" },
        { label: "قیمت‌ها", href: "#pricing" },
        { label: "درباره ما", href: `/${locale}/about` },
      ]
    : [
        { label: "Services", href: "#services" },
        { label: "AI", href: "#ai" },
        { label: "Pricing", href: "#pricing" },
        { label: "About", href: `/${locale}/about` },
      ];

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-3.5 left-1/2 -translate-x-1/2 z-[200]",
          "w-[calc(100%-40px)] max-w-[1100px] h-[54px] px-[18px]",
          "flex items-center justify-between",
          "border border-bdr rounded-2xl",
          "transition-all duration-300",
          scrolled
            ? "backdrop-blur-2xl bg-bg/85"
            : "backdrop-blur-2xl bg-bg/70",
          resolved === "light" && "bg-bg/70"
        )}
        dir={isFa ? "rtl" : "ltr"}
      >
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2 no-underline text-fg">
          <div className="w-7 h-7 rounded-lg bg-fg flex items-center justify-center text-[13px] font-black text-bg transition-all duration-300">
            R
          </div>
          <span className="text-base font-extrabold tracking-tight">RideX</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-0.5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-fg3 hover:text-fg hover:bg-glass transition-all duration-150 cursor-pointer no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-glass border border-bdr hover:bg-glass2 hover:border-bdr2 transition-all duration-200 cursor-pointer select-none"
            aria-label="Toggle theme"
          >
            <span className="text-[13px]">{resolved === "dark" ? "🌙" : "☀️"}</span>
            <div className="w-8 h-[18px] rounded-full bg-glass2 border border-bdr2 relative">
              <div
                className={cn(
                  "absolute top-0.5 w-3 h-3 rounded-full bg-fg transition-all duration-300",
                  resolved === "light" ? "left-[18px]" : "left-0.5"
                )}
              />
            </div>
          </button>

          {isAuthenticated && user ? (
            <>
              <Link
                href={`/${locale}/${({"guest":"passenger","passenger":"passenger","driver":"driver","business":"business","admin":"admin","superadmin":"admin"} as Record<string,string>)[user.role] ?? "passenger"}/dashboard`}
                className="hidden md:block px-3.5 py-1.5 rounded-[9px] text-[13px] font-semibold text-fg3 border border-bdr hover:text-fg hover:border-bdr2 transition-all duration-150 no-underline"
              >
                {isFa ? "داشبورد" : "Dashboard"}
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/${locale}/login`}
                className="hidden md:block px-3.5 py-1.5 rounded-[9px] text-[13px] font-semibold text-fg3 border border-bdr hover:text-fg hover:border-bdr2 transition-all duration-150 no-underline"
              >
                {isFa ? "ورود" : "Login"}
              </Link>
              <Link
                href={`/${locale}/register`}
                className="px-3.5 py-1.5 rounded-[9px] text-[13px] font-bold bg-btn-bg text-btn-fg border-none hover:opacity-88 hover:-translate-y-px transition-all duration-200 no-underline"
              >
                {isFa ? "شروع کن" : "Get Started"}
              </Link>
            </>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1 p-2 rounded-lg bg-glass border border-bdr"
            aria-label="Menu"
          >
            <span className={cn("w-4 h-0.5 bg-fg transition-all duration-200", mobileOpen && "rotate-45 translate-y-1.5")} />
            <span className={cn("w-4 h-0.5 bg-fg transition-all duration-200", mobileOpen && "opacity-0")} />
            <span className={cn("w-4 h-0.5 bg-fg transition-all duration-200", mobileOpen && "-rotate-45 -translate-y-1.5")} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[199] pt-20 px-5"
          dir={isFa ? "rtl" : "ltr"}
        >
          <div
            className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative bg-bg2 border border-bdr rounded-2xl p-5 flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-[15px] font-medium text-fg2 hover:bg-glass hover:text-fg transition-all duration-150 no-underline"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-bdr my-2" />
            {!isAuthenticated && (
              <>
                <Link
                  href={`/${locale}/login`}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-[15px] font-medium text-fg3 text-center border border-bdr no-underline"
                >
                  {isFa ? "ورود" : "Login"}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-[15px] font-bold bg-btn-bg text-btn-fg text-center no-underline"
                >
                  {isFa ? "شروع کن" : "Get Started"}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
