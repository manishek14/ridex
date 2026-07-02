// src/app/en/passenger/dashboard/page.tsx
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Car, Wallet, Star, ArrowLeft, Clock } from "lucide-react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Card } from "@/shared/components/ui/index";
import { useAppSelector, useAppDispatch } from "@/store";
import { setRideHistory } from "@/store/slices/rideSlice";
import { setWallet } from "@/store/slices/walletSlice";
import { mockRides, mockWallet } from "@/lib/mock-data";
import { formatPrice, getRideStatusLabel, timeAgo } from "@/lib/utils";

type Locale = "en" | "fa";

export default function PassengerDashboard() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isFa = locale === "fa";
  
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const wallet = useAppSelector((s) => s.wallet.wallet);
  const rides = useAppSelector((s) => s.ride.history);

  useEffect(() => {
    if (!rides.length) dispatch(setRideHistory(mockRides));
    if (!wallet) dispatch(setWallet(mockWallet));
  }, [dispatch, rides.length, wallet]);

  const completedRides = rides.filter((r) => r.status === "completed");
  const totalSpent = completedRides.reduce((sum, r) => sum + r.price, 0);
  const avgRating = completedRides.filter((r) => r.rating).reduce((sum, r, _, arr) => sum + (r.rating ?? 0) / arr.length, 0);

  const stats = [
    {
      icon: <Car size={18} />,
      label: isFa ? "سفرهای انجام‌شده" : "Completed Rides",
      value: isFa ? `${completedRides.length}` : `${completedRides.length}`,
      sub: isFa ? "این ماه" : "this month",
      color: "text-blue-400",
    },
    {
      icon: <Wallet size={18} />,
      label: isFa ? "موجودی کیف پول" : "Wallet Balance",
      value: wallet ? formatPrice(wallet.balance, locale) : "—",
      sub: isFa ? "قابل استفاده" : "available",
      color: "text-green-400",
    },
    {
      icon: <Star size={18} />,
      label: isFa ? "میانگین امتیاز" : "Avg. Rating",
      value: avgRating ? `★ ${avgRating.toFixed(1)}` : "—",
      sub: isFa ? "به رانندگان" : "to drivers",
      color: "text-yellow-400",
    },
    {
      icon: <MapPin size={18} />,
      label: isFa ? "کل هزینه‌ها" : "Total Spent",
      value: formatPrice(totalSpent, locale),
      sub: isFa ? "تا امروز" : "to date",
      color: "text-purple-400",
    },
  ];

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "داشبورد" : "Dashboard"}>
      {/* Welcome */}
      <div className="mb-6" dir={isFa ? "rtl" : "ltr"}>
        <h2
          className="text-xl font-black text-fg"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {isFa ? `سلام، ${user?.name ?? "کاربر"} 👋` : `Hi, ${user?.name ?? "User"} 👋`}
        </h2>
        <p
          className="text-sm text-fg3 mt-0.5"
          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
        >
          {isFa ? "امروز کجا می‌ری؟" : "Where are you going today?"}
        </p>
      </div>

      {/* Quick Book */}
      <div
        className="mb-6 p-5 rounded-2xl bg-fg relative overflow-hidden"
        dir={isFa ? "rtl" : "ltr"}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div>
            <p
              className="text-sm font-bold text-bg mb-1"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "رزرو سریع سفر" : "Quick Book a Ride"}
            </p>
            <p
              className="text-xs text-bg/60"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "راننده در ۳ دقیقه" : "Driver in 3 minutes"}
            </p>
          </div>
          <Link
            href={`/${locale}/passenger/booking`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg text-fg text-sm font-bold no-underline hover:opacity-88 transition-opacity"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            <MapPin size={14} />
            {isFa ? "رزرو کن" : "Book Now"}
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6" dir={isFa ? "rtl" : "ltr"}>
        {stats.map((s, i) => (
          <Card key={i} hover className="flex flex-col gap-2">
            <div className={`${s.color}`}>{s.icon}</div>
            <div
              className="text-[22px] font-black text-fg leading-none"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {s.value}
            </div>
            <div style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              <p className="text-[11px] font-semibold text-fg2">{s.label}</p>
              <p className="text-[10px] text-fg4">{s.sub}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Rides */}
      <div dir={isFa ? "rtl" : "ltr"}>
        <div className="flex items-center justify-between mb-3">
          <h3
            className="text-sm font-bold text-fg"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "آخرین سفرها" : "Recent Rides"}
          </h3>
          <Link
            href={`/${locale}/passenger/rides`}
            className="flex items-center gap-1 text-xs text-fg3 hover:text-fg no-underline transition-colors"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "همه" : "View all"}
            <ArrowLeft size={12} className={isFa ? "rotate-180" : ""} />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {rides.slice(0, 4).map((ride) => {
            const statusInfo = getRideStatusLabel(ride.status, locale);
            return (
              <Link
                key={ride.id}
                href={`/${locale}/passenger/rides/${ride.id}`}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-glass border border-bdr hover:bg-glass2 hover:border-bdr2 transition-all duration-150 no-underline group"
              >
                <div className="w-9 h-9 rounded-xl bg-glass2 flex items-center justify-center text-base flex-shrink-0">
                  🚗
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[13px] font-semibold text-fg truncate"
                    style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                  >
                    {ride.destination.address}
                  </p>
                  <p className="text-[11px] text-fg4 flex items-center gap-1 mt-0.5">
                    <Clock size={10} />
                    {timeAgo(ride.createdAt, locale)}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <span
                    className="text-[13px] font-bold text-fg"
                    style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                  >
                    {formatPrice(ride.price, locale)}
                  </span>
                  <span className={`badge ${statusInfo.color} text-[10px]`}>
                    {statusInfo[locale === "fa" ? "fa" : "en"]}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}