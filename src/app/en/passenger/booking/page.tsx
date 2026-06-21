"use client";

import { useState } from "react";
import { MapPin, Navigation, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/store";
import { setOrigin, setDestination, setRideType, setSearching, setCurrentRide } from "@/store/slices/rideSlice";
import { useToast } from "@/shared/components/feedback/Toast";
import { mockRides, mockDrivers } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import type { RideType } from "@/types";

const rideTypes: { type: RideType; icon: string; fa: string; en: string; baseFare: number; eta: number }[] = [
  { type: "go",      icon: "🚗", fa: "RideX Go",   en: "RideX Go",   baseFare: 75000,  eta: 3  },
  { type: "pool",    icon: "🚐", fa: "Pool",        en: "Pool",       baseFare: 40000,  eta: 5  },
  { type: "premium", icon: "✦",  fa: "Premium",     en: "Premium",    baseFare: 145000, eta: 6  },
  { type: "moto",    icon: "🛺", fa: "موتور",      en: "Moto",       baseFare: 35000,  eta: 2  },
  { type: "send",    icon: "📦", fa: "Send",        en: "Send",       baseFare: 55000,  eta: 4  },
];

export default function BookingPage() {
  const locale : any = "en";
  const isFa = locale === "fa";
  const dispatch = useAppDispatch();
  const toast = useToast();
  const booking = useAppSelector((s) => s.ride.booking);
  const isSearching = useAppSelector((s) => s.ride.isSearching);

  const [originText, setOriginText] = useState("");
  const [destText, setDestText] = useState("");

  const selectedType = booking.selectedType;
  const selectedRideType = rideTypes.find((r) => r.type === selectedType)!;

  const handleBook = async () => {
    if (!originText || !destText) {
      toast.error(isFa ? "مبدا و مقصد را وارد کن" : "Enter origin and destination");
      return;
    }
    dispatch(setSearching(true));

    // Set mock locations
    dispatch(setOrigin({ lat: 35.6892, lng: 51.389, address: originText }));
    dispatch(setDestination({ lat: 35.72, lng: 51.335, address: destText }));

    // Simulate finding a driver
    await new Promise((r) => setTimeout(r, 2500));
    dispatch(setCurrentRide({
      ...mockRides[0],
      id: `r_${Date.now()}`,
      type: selectedType,
      status: "found",
      driver: mockDrivers[0],
      origin: { lat: 35.6892, lng: 51.389, address: originText },
      destination: { lat: 35.72, lng: 51.335, address: destText },
      price: selectedRideType.baseFare,
      createdAt: new Date().toISOString(),
    }));
    toast.success(isFa ? "راننده پیدا شد! در راهه." : "Driver found! On the way.");
  };

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "رزرو سفر" : "Book a Ride"}>
      <div className="max-w-2xl" dir={isFa ? "rtl" : "ltr"}>
        {/* Ride type selector */}
        <div className="mb-5">
          <p
            className="text-xs font-bold text-[var(--fg3)] mb-3 tracking-wide"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "نوع سفر" : "RIDE TYPE"}
          </p>
          <div className="grid grid-cols-5 gap-2">
            {rideTypes.map((rt) => (
              <button
                key={rt.type}
                onClick={() => dispatch(setRideType(rt.type))}
                className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border transition-all duration-200 ${
                  selectedType === rt.type
                    ? "bg-[var(--fg)] border-[var(--fg)] text-[var(--bg)]"
                    : "bg-[var(--glass)] border-[var(--bdr)] text-[var(--fg3)] hover:border-[var(--bdr2)] hover:text-[var(--fg)]"
                }`}
              >
                <span className="text-xl">{rt.icon}</span>
                <span
                  className="text-[10px] font-semibold truncate w-full text-center"
                  style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                >
                  {isFa ? rt.fa : rt.en}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="p-5 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Navigation size={14} className="text-green-400" />
            </div>
            <input
              value={originText}
              onChange={(e) => setOriginText(e.target.value)}
              placeholder={isFa ? "مبدا — موقعیت فعلی شما" : "Origin — Your current location"}
              className="flex-1 bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--fg4)] outline-none"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            />
          </div>
          <div className="h-px bg-[var(--bdr)] mx-11" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <MapPin size={14} className="text-red-400" />
            </div>
            <input
              value={destText}
              onChange={(e) => setDestText(e.target.value)}
              placeholder={isFa ? "مقصد کجاست؟" : "Where to?"}
              className="flex-1 bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--fg4)] outline-none"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            />
          </div>
        </div>

        {/* Estimate card */}
        {originText && destText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] mb-4 grid grid-cols-3 gap-3"
          >
            {[
              { icon: <DollarSign size={14} />, label: isFa ? "تخمین قیمت" : "Est. Price", value: formatPrice(selectedRideType.baseFare, locale) },
              { icon: <Clock size={14} />, label: isFa ? "زمان انتظار" : "Wait Time", value: isFa ? `${selectedRideType.eta} دقیقه` : `${selectedRideType.eta} min` },
              { icon: <MapPin size={14} />, label: isFa ? "مسافت" : "Distance", value: isFa ? "~۵ کیلومتر" : "~5 km" },
            ].map((info, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-1 text-[var(--fg3)] mb-1">
                  {info.icon}
                  <span
                    className="text-[10px]"
                    style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                  >
                    {info.label}
                  </span>
                </div>
                <p
                  className="text-[13px] font-bold text-[var(--fg)]"
                  style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                >
                  {info.value}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Book button */}
        <Button
          size="lg"
          className="w-full"
          loading={isSearching}
          onClick={handleBook}
        >
          {isSearching
            ? (isFa ? "در حال جستجوی راننده..." : "Searching for driver...")
            : (isFa ? `رزرو ${selectedRideType.fa}` : `Book ${selectedRideType.en}`)}
        </Button>

        {isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center gap-3"
          >
            <div className="w-8 h-8 border-2 border-[var(--fg)] border-t-transparent rounded-full animate-spin flex-shrink-0" />
            <p
              className="text-sm text-[var(--fg3)]"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "داریم بهترین راننده رو پیدا می‌کنیم..." : "Finding the best driver for you..."}
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
