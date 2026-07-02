"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Car, MapPin, Wallet, Bell, User, Settings,
  Users, DollarSign, BarChart2, LifeBuoy, LogOut, X,
  TrendingUp, Building2, FileText, CreditCard, UserCheck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { setSidebarOpen } from "@/store/slices/uiSlice";
import { Avatar } from "@/shared/components/ui/index";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

type NavItem = {
  label: { fa: string; en: string };
  href: string;
  icon: React.ReactNode;
};

function getNavItems(role: UserRole, locale: string): NavItem[] {
  const base = `/${locale}`;
  switch (role) {
    case "passenger":
      return [
        { label: { fa: "داشبورد", en: "Dashboard" }, href: `${base}/passenger/dashboard`, icon: <LayoutDashboard size={16} /> },
        { label: { fa: "رزرو سفر", en: "Book Ride" }, href: `${base}/passenger/booking`, icon: <MapPin size={16} /> },
        { label: { fa: "سفرهای من", en: "My Rides" }, href: `${base}/passenger/rides`, icon: <Car size={16} /> },
        { label: { fa: "کیف پول", en: "Wallet" }, href: `${base}/passenger/wallet`, icon: <Wallet size={16} /> },
        { label: { fa: "اعلان‌ها", en: "Notifications" }, href: `${base}/passenger/notifications`, icon: <Bell size={16} /> },
        { label: { fa: "پروفایل", en: "Profile" }, href: `${base}/passenger/profile`, icon: <User size={16} /> },
        { label: { fa: "تنظیمات", en: "Settings" }, href: `${base}/passenger/settings`, icon: <Settings size={16} /> },
      ];
    case "driver":
      return [
        { label: { fa: "داشبورد", en: "Dashboard" }, href: `${base}/driver/dashboard`, icon: <LayoutDashboard size={16} /> },
        { label: { fa: "سفرها", en: "Rides" }, href: `${base}/driver/rides`, icon: <Car size={16} /> },
        { label: { fa: "درآمد", en: "Earnings" }, href: `${base}/driver/earnings`, icon: <TrendingUp size={16} /> },
        { label: { fa: "کیف پول", en: "Wallet" }, href: `${base}/driver/wallet`, icon: <Wallet size={16} /> },
        { label: { fa: "پروفایل", en: "Profile" }, href: `${base}/driver/profile`, icon: <User size={16} /> },
      ];
    case "business":
      return [
        { label: { fa: "داشبورد", en: "Dashboard" }, href: `${base}/business/dashboard`, icon: <LayoutDashboard size={16} /> },
        { label: { fa: "کارمندان", en: "Employees" }, href: `${base}/business/employees`, icon: <Users size={16} /> },
        { label: { fa: "گزارش‌ها", en: "Reports" }, href: `${base}/business/reports`, icon: <FileText size={16} /> },
        { label: { fa: "صورت‌حساب", en: "Billing" }, href: `${base}/business/billing`, icon: <CreditCard size={16} /> },
        { label: { fa: "تنظیمات", en: "Settings" }, href: `${base}/business/settings`, icon: <Settings size={16} /> },
      ];
    case "admin":
    case "superadmin":
      return [
        { label: { fa: "داشبورد", en: "Dashboard" }, href: `${base}/admin/dashboard`, icon: <LayoutDashboard size={16} /> },
        { label: { fa: "کاربران", en: "Users" }, href: `${base}/admin/users`, icon: <Users size={16} /> },
        { label: { fa: "رانندگان", en: "Drivers" }, href: `${base}/admin/drivers`, icon: <UserCheck size={16} /> },
        { label: { fa: "سفرها", en: "Rides" }, href: `${base}/admin/rides`, icon: <Car size={16} /> },
        { label: { fa: "پرداخت‌ها", en: "Payments" }, href: `${base}/admin/payments`, icon: <DollarSign size={16} /> },
        { label: { fa: "گزارش‌ها", en: "Reports" }, href: `${base}/admin/reports`, icon: <BarChart2 size={16} /> },
        { label: { fa: "پشتیبانی", en: "Support" }, href: `${base}/admin/support`, icon: <LifeBuoy size={16} /> },
        { label: { fa: "تنظیمات", en: "Settings" }, href: `${base}/admin/settings`, icon: <Settings size={16} /> },
      ];
    default:
      return [];
  }
}

interface SidebarProps {
  locale?: string;
}

export function Sidebar({ locale = "fa" }: SidebarProps) {
  const isFa = locale === "fa";
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);
  const unreadCount = useAppSelector((s) => s.notification.unreadCount);

  const navItems = user ? getNavItems(user.role, locale) : [];

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = `/${locale}`;
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col p-4" dir={isFa ? "rtl" : "ltr"}>
      {/* Logo + close */}
      <div className="flex items-center justify-between mb-8 px-1">
        <Link href={`/${locale}`} className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg bg-fg flex items-center justify-center text-[13px] font-black text-bg">R</div>
          <span className="text-sm font-extrabold text-fg tracking-tight">RideX</span>
        </Link>
        <button
          onClick={() => dispatch(setSidebarOpen(false))}
          className="lg:hidden w-7 h-7 rounded-lg bg-glass border border-bdr flex items-center justify-center text-fg3 hover:text-fg"
        >
          <X size={14} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => dispatch(setSidebarOpen(false))}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 no-underline relative",
                isActive
                  ? "bg-fg text-bg"
                  : "text-fg3 hover:text-fg hover:bg-glass"
              )}
            >
              {item.icon}
              <span style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {isFa ? item.label.fa : item.label.en}
              </span>
              {item.href.includes("notifications") && unreadCount > 0 && (
                <span className="mr-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white min-w-[18px] text-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info + logout */}
      {user && (
        <div className="mt-4 pt-4 border-t border-bdr">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-glass transition-colors cursor-pointer mb-1">
            <Avatar name={user.name} size="sm" />
            <div className="flex-1 min-w-0">
              <p
                className="text-[12.5px] font-semibold text-fg truncate"
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {user.name}
              </p>
              <p className="text-[10.5px] text-fg4 truncate">{user.phone}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2.5 w-full rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 transition-all duration-150"
          >
            <LogOut size={15} />
            <span style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "خروج" : "Logout"}
            </span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="dashboard-sidebar hidden lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => dispatch(setSidebarOpen(false))}
            />
            <motion.aside
              initial={{ x: isFa ? 260 : -260 }}
              animate={{ x: 0 }}
              exit={{ x: isFa ? 260 : -260 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 z-50 w-[260px] bg-bg2 border-bdr shadow-2xl lg:hidden"
              style={{ [isFa ? "right" : "left"]: 0, borderWidth: isFa ? "0 0 0 1px" : "0 1px 0 0" }}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
