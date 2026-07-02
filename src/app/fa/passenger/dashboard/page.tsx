// src/app/fa/passenger/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { 
  Car, 
  Wallet, 
  Star, 
  MapPin,
  User,
  LogOut,
  Settings
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useState, useEffect, useRef } from "react";

export default function PassengerDashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // بستن منو با کلیک خارج از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stats = [
    { label: "سفرهای این ماه", value: "3", icon: Car, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "کل هزینه‌ها", value: "292,000", icon: Wallet, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "میانگین امتیاز", value: "4.7", icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  ];

  const recentRides = [
    { id: "r1", origin: "صادقیه، تهران", destination: "بهشتی، تهران", price: 85000, date: "۱۱ روز پیش", status: "completed" },
    { id: "r2", origin: "ونک، تهران", destination: "سعادت‌آباد، تهران", price: 62000, date: "۱۴ روز پیش", status: "completed" },
    { id: "r3", origin: "تجریش، تهران", destination: "مرزداران، تهران", price: 45000, date: "۱۸ روز پیش", status: "cancelled" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push("/fa/login");
  };

  const handleProfile = () => {
    router.push("/fa/passenger/profile");
    setShowMenu(false);
  };

  const handleSettings = () => {
    router.push("/fa/passenger/settings");
    setShowMenu(false);
  };

  const userName = user?.name ? user.name.split(" ")[0] : "کاربر";

  return (
    <div className="w-full min-h-screen bg-bg">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        
        {/* Header - ریسپانسیو */}
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-black text-fg truncate">
              سلام، {userName}
            </h1>
            <p className="text-sm text-fg3 truncate">امروز کجا می‌ری؟</p>
          </div>

          {/* Avatar with Dropdown - ریسپانسیو */}
          <div className="relative flex-shrink-0" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-base hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50"
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute top-11 sm:top-12 right-0 w-48 bg-bg2 border border-bdr rounded-xl shadow-2xl py-2 z-50">
                <button
                  onClick={handleProfile}
                  className="w-full px-4 py-2.5 text-sm text-fg hover:bg-glass transition-colors flex items-center gap-2 text-right"
                >
                  <User size={14} />
                  پروفایل
                </button>
                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-2.5 text-sm text-fg hover:bg-glass transition-colors flex items-center gap-2 text-right"
                >
                  <Settings size={14} />
                  تنظیمات
                </button>
                <div className="h-px bg-bdr my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2 text-right"
                >
                  <LogOut size={14} />
                  خروج
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Action - ریسپانسیو */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-bdr rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
        >
          <div>
            <p className="text-sm sm:text-base font-bold text-fg">🚀 رزرو سریع سفر</p>
            <p className="text-xs text-fg3">یک سفر جدید در کمترین زمان</p>
          </div>
          <Link href="/fa/passenger/booking" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-5 py-2.5 bg-btn-bg text-btn-fg rounded-xl text-sm font-bold hover:opacity-90 transition-all">
              رزرو کن
            </button>
          </Link>
        </motion.div>

        {/* Stats - ریسپانسیو با grid مناسب */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-glass border border-bdr rounded-xl p-3 sm:p-4 text-center"
              >
                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl ${stat.bg} flex items-center justify-center mx-auto mb-1.5 sm:mb-2`}>
                  <Icon size={14} className={stat.color} />
                </div>
                <p className="text-base sm:text-xl font-black text-fg">{stat.value}</p>
                <p className="text-[8px] sm:text-[10px] text-fg4">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Rides - ریسپانسیو */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-fg">آخرین سفرها</h3>
            <Link href="/fa/passenger/rides" className="text-xs text-fg3 hover:text-fg transition-colors">
              مشاهده همه
            </Link>
          </div>
          <div className="space-y-2">
            {recentRides.map((ride, index) => (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/fa/passenger/rides/${ride.id}`}
                  className="block bg-glass border border-bdr rounded-xl p-3 sm:p-4 hover:bg-glass2 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-bg2 flex items-center justify-center flex-shrink-0">
                        <MapPin size={14} className="text-fg3" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-fg truncate">
                          {ride.origin} → {ride.destination}
                        </p>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-fg4">
                          <span>{ride.date}</span>
                          <span>•</span>
                          <span className={ride.status === "cancelled" ? "text-red-400" : "text-green-400"}>
                            {ride.status === "completed" ? "تکمیل شد" : "لغو شد"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-fg">
                        {ride.price.toLocaleString()}
                      </p>
                      <p className="text-[8px] sm:text-[10px] text-fg4">تومان</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}