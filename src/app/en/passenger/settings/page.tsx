// src/app/en/passenger/settings/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleTheme } from "@/store/slices/themeSlice";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import Link from "next/link";
import { Moon, Sun, Globe, Bell, Shield, Trash2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Locale = "en" | "fa";

interface SettingRowProps {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  action?: React.ReactNode;
  danger?: boolean;
  href?: string;
  onClick?: () => void;
}

function SettingRow({ icon, label, sub, action, danger, href, onClick }: SettingRowProps) {
  const content = (
    <div className={cn(
      "flex items-center gap-3 p-3.5 rounded-xl transition-all duration-150",
      danger ? "hover:bg-red-500/5" : "hover:bg-glass",
      (href || onClick) && "cursor-pointer"
    )}
      onClick={onClick}
    >
      <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
        danger ? "bg-red-500/10 text-red-400" : "bg-glass2 text-fg3"
      )}>
        {icon}
      </div>
      <div className="flex-1">
        <p className={cn("text-sm font-semibold", danger ? "text-red-400" : "text-fg")}>{label}</p>
        {sub && <p className="text-xs text-fg4 mt-0.5">{sub}</p>}
      </div>
      {action ?? (href ? <ChevronLeft size={14} className="text-fg4" /> : null)}
    </div>
  );

  if (href) return <Link href={href} className="no-underline block">{content}</Link>;
  return content;
}

export default function SettingsPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isFa = locale === "fa";
  
  const dispatch = useAppDispatch();
  const resolved = useAppSelector((s) => s.theme.resolved);

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "تنظیمات" : "Settings"}>
      <div className="max-w-lg" dir={isFa ? "rtl" : "ltr"}>
        {/* Appearance */}
        <div className="mb-4">
          <p className="text-xs font-bold text-fg4 tracking-widest mb-2 px-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "ظاهر" : "APPEARANCE"}
          </p>
          <div className="rounded-2xl bg-glass border border-bdr overflow-hidden">
            <SettingRow
              icon={resolved === "dark" ? <Moon size={16} /> : <Sun size={16} />}
              label={isFa ? "تم برنامه" : "App Theme"}
              sub={resolved === "dark" ? (isFa ? "تاریک" : "Dark") : (isFa ? "روشن" : "Light")}
              action={
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className={cn(
                    "w-11 h-6 rounded-full border transition-all duration-300 relative",
                    resolved === "dark" ? "bg-fg border-fg" : "bg-glass2 border-bdr2"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 w-5 h-5 rounded-full bg-bg transition-all duration-300",
                    resolved === "dark" ? "left-[22px]" : "left-0.5"
                  )} />
                </button>
              }
            />
          </div>
        </div>

        {/* Language */}
        <div className="mb-4">
          <p className="text-xs font-bold text-fg4 tracking-widest mb-2 px-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "زبان" : "LANGUAGE"}
          </p>
          <div className="rounded-2xl bg-glass border border-bdr overflow-hidden">
            <SettingRow icon={<Globe size={16} />} label={isFa ? "زبان برنامه" : "App Language"}
              sub={isFa ? "فارسی" : "English"}
              action={
                <div className="flex gap-1.5">
                  {[{ code: "fa", label: "فارسی" }, { code: "en", label: "EN" }].map((lang) => (
                    <Link key={lang.code} href={`/${lang.code}`}
                      className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold no-underline transition-all",
                        locale === lang.code ? "bg-fg text-bg" : "bg-glass2 text-fg3 hover:text-fg"
                      )}>
                      {lang.label}
                    </Link>
                  ))}
                </div>
              }
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-4">
          <p className="text-xs font-bold text-fg4 tracking-widest mb-2 px-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "اعلان‌ها" : "NOTIFICATIONS"}
          </p>
          <div className="rounded-2xl bg-glass border border-bdr overflow-hidden divide-y divide-bdr">
            {[
              { label: isFa ? "اعلان سفر" : "Ride notifications", sub: isFa ? "وضعیت راننده و سفر" : "Driver & ride status" },
              { label: isFa ? "پیشنهادها و تخفیف" : "Offers & discounts", sub: isFa ? "کدهای تخفیف و پروموشن" : "Promo codes & offers" },
              { label: isFa ? "اعلان کیف پول" : "Wallet notifications", sub: isFa ? "تراکنش‌های مالی" : "Financial transactions" },
            ].map((item, i) => (
              <SettingRow
                key={i}
                icon={<Bell size={16} />}
                label={item.label}
                sub={item.sub}
                action={
                  <div className="w-11 h-6 rounded-full bg-fg border border-fg relative">
                    <span className="absolute top-0.5 left-[22px] w-5 h-5 rounded-full bg-bg" />
                  </div>
                }
              />
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="mb-4">
          <p className="text-xs font-bold text-fg4 tracking-widest mb-2 px-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "حریم خصوصی" : "PRIVACY"}
          </p>
          <div className="rounded-2xl bg-glass border border-bdr overflow-hidden divide-y divide-bdr">
            <SettingRow icon={<Shield size={16} />} label={isFa ? "حریم خصوصی" : "Privacy Policy"} href="#" />
            <SettingRow icon={<Shield size={16} />} label={isFa ? "شرایط استفاده" : "Terms of Service"} href="#" />
          </div>
        </div>

        {/* Danger */}
        <div>
          <p className="text-xs font-bold text-fg4 tracking-widest mb-2 px-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "حساب" : "ACCOUNT"}
          </p>
          <div className="rounded-2xl bg-glass border border-bdr overflow-hidden">
            <SettingRow
              icon={<Trash2 size={16} />}
              label={isFa ? "حذف حساب" : "Delete Account"}
              sub={isFa ? "این عمل غیرقابل بازگشت است" : "This action is irreversible"}
              danger
              onClick={() => alert(isFa ? "برای حذف حساب با پشتیبانی تماس بگیر" : "Contact support to delete account")}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}