"use client";

import { Menu, Bell, Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { toggleTheme } from "@/store/slices/themeSlice";
import { Avatar } from "@/shared/components/ui/index";
import Link from "next/link";

interface DashboardHeaderProps {
  title?: string;
  locale?: string;
}

export function DashboardHeader({ title, locale = "fa" }: DashboardHeaderProps) {
  const isFa = locale === "fa";
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const resolved = useAppSelector((s) => s.theme.resolved);
  const unreadCount = useAppSelector((s) => s.notification.unreadCount);

  return (
    <header
      className="h-[64px] flex items-center px-5 border-b border-[var(--bdr)] bg-[var(--bg2)] sticky top-0 z-30"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* Hamburger */}
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="lg:hidden w-9 h-9 rounded-[9px] bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center text-[var(--fg3)] hover:text-[var(--fg)] hover:border-[var(--bdr2)] transition-all mr-2"
      >
        <Menu size={16} />
      </button>

      {/* Title */}
      {title && (
        <h1
          className="text-[15px] font-bold text-[var(--fg)] hidden sm:block"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {title}
        </h1>
      )}

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-9 h-9 rounded-[9px] bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center text-[var(--fg3)] hover:text-[var(--fg)] hover:border-[var(--bdr2)] transition-all"
        >
          {resolved === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Notifications */}
        <Link
          href={`/${locale}/passenger/notifications`}
          className="relative w-9 h-9 rounded-[9px] bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center text-[var(--fg3)] hover:text-[var(--fg)] hover:border-[var(--bdr2)] transition-all no-underline"
        >
          <Bell size={15} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        {/* Avatar */}
        {user && (
          <Link href={`/${locale}/${user.role}/profile`} className="no-underline">
            <Avatar name={user.name} size="sm" />
          </Link>
        )}
      </div>
    </header>
  );
}
