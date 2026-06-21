"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Star, MapPin } from "lucide-react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Badge } from "@/shared/components/ui/index";
import { useAppDispatch, useAppSelector } from "@/store";
import { setRideHistory } from "@/store/slices/rideSlice";
import { mockRides } from "@/lib/mock-data";
import { formatPrice, formatDate, getRideStatusLabel, getRideTypeLabel } from "@/lib/utils";
import type { RideStatus } from "@/types";

const filters: { value: RideStatus | "all"; fa: string; en: string }[] = [
  { value: "all", fa: "همه", en: "All" },
  { value: "completed", fa: "تموم‌شده", en: "Completed" },
  { value: "cancelled", fa: "لغو‌شده", en: "Cancelled" },
];

export default function PassengerRidesPage() {
  const locale = "en";
  const isFa = locale === "fa";
  const dispatch = useAppDispatch();
  const rides = useAppSelector((s) => s.ride.history);
  const [filter, setFilter] = useState<RideStatus | "all">("all");

  useEffect(() => {
    if (!rides.length) dispatch(setRideHistory(mockRides));
  }, [dispatch, rides.length]);

  const filtered = filter === "all" ? rides : rides.filter((r) => r.status === filter);

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "سفرهای من" : "My Rides"}>
      <div className="max-w-2xl" dir={isFa ? "rtl" : "ltr"}>
        {/* Filter tabs */}
        <div className="flex gap-1.5 mb-5 p-1 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] w-fit">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                filter === f.value
                  ? "bg-[var(--fg)] text-[var(--bg)]"
                  : "text-[var(--fg3)] hover:text-[var(--fg)]"
              }`}
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? f.fa : f.en}
            </button>
          ))}
        </div>

        {/* Rides list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">🚗</div>
            <p
              className="text-sm text-[var(--fg3)]"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "سفری وجود ندارد" : "No rides found"}
            </p>
            <Link
              href={`/${locale}/passenger/booking`}
              className="inline-block mt-4 px-4 py-2 rounded-xl bg-[var(--fg)] text-[var(--bg)] text-sm font-bold no-underline"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "رزرو اولین سفر" : "Book first ride"}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((ride) => {
              const statusInfo = getRideStatusLabel(ride.status, locale);
              const typeInfo = getRideTypeLabel(ride.type, locale);
              return (
                <Link
                  key={ride.id}
                  href={`/${locale}/passenger/rides/${ride.id}`}
                  className="block p-4 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] hover:bg-[var(--glass2)] hover:border-[var(--bdr2)] transition-all duration-150 no-underline"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[var(--glass2)] flex items-center justify-center text-xl">
                        {typeInfo.icon}
                      </div>
                      <div>
                        <p
                          className="text-[13px] font-bold text-[var(--fg)]"
                          style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                        >
                          {isFa ? typeInfo.fa : typeInfo.en}
                        </p>
                        <p className="text-[11px] text-[var(--fg4)] flex items-center gap-1">
                          <Clock size={10} />
                          {formatDate(ride.createdAt, locale)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-[15px] font-extrabold text-[var(--fg)]"
                        style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                      >
                        {formatPrice(ride.price, locale)}
                      </p>
                      <Badge
                        variant={
                          ride.status === "completed" ? "green" :
                          ride.status === "cancelled" ? "red" : "blue"
                        }
                        className="text-[10px] mt-0.5"
                      >
                        {statusInfo[locale === "fa" ? "fa" : "en"]}
                      </Badge>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex flex-col gap-1.5 px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      <p
                        className="text-[12px] text-[var(--fg3)] truncate"
                        style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                      >
                        {ride.origin.address}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                      <p
                        className="text-[12px] text-[var(--fg3)] truncate"
                        style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                      >
                        {ride.destination.address}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  {ride.rating && (
                    <div className="mt-2.5 flex items-center gap-1 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          fill={i < ride.rating! ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                      <span className="text-[10px] text-[var(--fg4)] mr-0.5">
                        {isFa ? "امتیاز داده شده" : "Rated"}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
