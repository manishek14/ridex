// src/app/fa/passenger/booking/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Car,
  Bike,
  Sparkles,
  Clock,
  Wallet,
  User,
  Star,
  Shield,
  Phone,
  MessageCircle,
  Gauge,
  Users,
  LogOut,
  Settings
} from "lucide-react";
import { NeshanMap } from "@/features/ride/components/NeshanMap";
import { Button } from "@/shared/components/ui/Button";
import { useAppSelector, useAppDispatch } from "@/store";
import { logout } from "@/store/slices/authSlice";

interface RideOption {
  id: string;
  name: string;
  nameFa: string;
  icon: React.ReactNode;
  eta: string;
  price: number;
  description: string;
  descriptionFa: string;
  color: string;
  bgColor: string;
  borderColor: string;
  capacity: number;
}

export default function BookingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [selectedRide, setSelectedRide] = useState<string>("go");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showDriver, setShowDriver] = useState(false);
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

  const rideOptions: RideOption[] = [
    {
      id: "moto",
      name: "Moto",
      nameFa: "موتور",
      icon: <Bike size={20} />,
      eta: "۲ دقیقه",
      price: 35000,
      description: "سریع در ترافیک",
      descriptionFa: "سریع در ترافیک",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      capacity: 1,
    },
    {
      id: "go",
      name: "Go",
      nameFa: "گو",
      icon: <Car size={20} />,
      eta: "۳ دقیقه",
      price: 45000,
      description: "اقتصادی",
      descriptionFa: "اقتصادی",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      capacity: 4,
    },
    {
      id: "premium",
      name: "Premium",
      nameFa: "لوکس",
      icon: <Sparkles size={20} />,
      eta: "۵ دقیقه",
      price: 85000,
      description: "لوکس و VIP",
      descriptionFa: "لوکس و VIP",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      capacity: 4,
    },
  ];

  const selectedOption = rideOptions.find(r => r.id === selectedRide);

  const handleRequestRide = () => {
    if (!origin || !destination) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowDriver(true);
    }, 2000);
  };

  const handleCancelRide = () => {
    setShowDriver(false);
    setIsSearching(false);
  };

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

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* ===== HEADER با دکمه پروفایل ===== */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h1 className="text-xl font-black text-fg tracking-tight">
          {showDriver ? "🚗 در حال حرکت" : "📍 سفر"}
        </h1>
        
        {/* ✅ Avatar with Dropdown */}
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          >
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute top-10 right-0 w-48 bg-bg2 border border-bdr rounded-xl shadow-2xl py-2 z-50">
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

      {/* ===== MAP ===== */}
      <div className="relative w-full h-[280px] mx-auto px-4">
        <div className="w-full h-full rounded-2xl overflow-hidden border border-bdr">
          <NeshanMap />
        </div>
      </div>

      {/* ===== LOCATION INPUTS ===== */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-bg2 rounded-2xl border border-bdr p-4 shadow-xl">
          <div className="relative">
            <div className="absolute left-4 top-3 bottom-3 flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-bg2" />
              <div className="w-0.5 flex-1 bg-bdr2" />
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-bg2" />
            </div>
            <div className="space-y-0 pl-9">
              <input
                type="text"
                placeholder={origin || "کجا هستید؟"}
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full py-3 text-sm font-medium bg-transparent border-none outline-none text-fg placeholder:text-fg4 border-b border-bdr"
              />
              <input
                type="text"
                placeholder={destination || "کجا می‌روید؟"}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full py-3 text-sm font-medium bg-transparent border-none outline-none text-fg placeholder:text-fg4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM SHEET ===== */}
      <div className="flex-1 px-4 pt-4 pb-6">
        <div className="bg-bg2 rounded-2xl border border-bdr p-4 space-y-4">
          
          {/* DRIVER INFO */}
          <AnimatePresence>
            {showDriver && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-bdr rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl font-black text-white">
                      A
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 border-bg2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-fg">احمد رضایی</p>
                      <div className="flex items-center gap-0.5">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-semibold text-fg">4.92</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-fg3">
                      <span>شاسی‌بلند</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Shield size={10} className="text-green-400" />
                        تایید شده
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-bold text-green-400">
                      <Clock size={14} />
                      ۳ دقیقه
                    </div>
                    <p className="text-[10px] text-fg4">تا رسیدن</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                    <Phone size={14} className="mr-1" />
                    تماس
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">
                    <MessageCircle size={14} className="mr-1" />
                    پیام
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex-1 text-xs text-red-400 border-red-400/30 hover:bg-red-400/10"
                    onClick={handleCancelRide}
                  >
                    لغو
                  </Button>
                </div>

                <div className="w-full h-1.5 rounded-full bg-bdr overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-green-400"
                  />
                </div>
                <p className="text-[10px] text-fg4 text-center">
                  راننده در مسیر شماست • ۶ دقیقه تا مقصد
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* RIDE OPTIONS */}
          {!showDriver && (
            <>
              <div className="flex gap-2">
                {rideOptions.map((option) => {
                  const isSelected = selectedRide === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedRide(option.id)}
                      className={`
                        flex-1 py-3 px-2 rounded-xl text-center transition-all duration-200 border-2
                        ${isSelected 
                          ? `${option.bgColor} ${option.borderColor} border-fg` 
                          : "bg-glass border-bdr hover:border-bdr2"
                        }
                      `}
                    >
                      <div className={`mx-auto ${isSelected ? option.color : "text-fg3"}`}>
                        {option.icon}
                      </div>
                      <p className={`text-xs font-bold mt-1 ${isSelected ? "text-fg" : "text-fg3"}`}>
                        {option.nameFa}
                      </p>
                      <p className={`text-[10px] font-bold ${isSelected ? "text-fg" : "text-fg3"}`}>
                        {option.price.toLocaleString()} T
                      </p>
                      <p className="text-[9px] text-fg4">{option.eta}</p>
                    </button>
                  );
                })}
              </div>

              {/* RIDE DETAILS */}
              {selectedOption && (
                <motion.div
                  key={selectedOption.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between p-3 rounded-xl bg-glass border border-bdr">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Wallet size={16} className="text-green-400" />
                      </div>
                      <div>
                        <p className="text-xs text-fg4">پرداخت از</p>
                        <p className="text-sm font-bold text-fg">کیف پول</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-fg">
                        {selectedOption.price.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-fg4">تومان</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-fg4 px-1 py-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Gauge size={12} />
                        ۴.۲ کیلومتر
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {selectedOption.eta}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {selectedOption.capacity} نفر
                      </span>
                    </div>
                  </div>

                  <Button
                    fullWidth
                    size="lg"
                    className="w-full text-base font-bold h-14 rounded-2xl"
                    disabled={!origin || !destination}
                    onClick={handleRequestRide}
                  >
                    {!origin || !destination 
                      ? "📍 لطفاً مبدا و مقصد را وارد کنید" 
                      : `🚀 درخواست ${selectedOption.nameFa}`
                    }
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}