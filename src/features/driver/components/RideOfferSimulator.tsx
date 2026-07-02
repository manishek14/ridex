"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Clock, DollarSign, X, Check, Car, PartyPopper } from "lucide-react";
import { useAppSelector } from "@/store";

interface RideOffer {
  id: string;
  passenger: string;
  pickup: string;
  dropoff: string;
  price: number; // toman
  distanceKm: number;
  etaMin: number;
}

const PASSENGERS = ["علی", "مریم", "رضا", "سارا", "حسین", "نگار", "محمد", "زهرا", "امیر", "فاطمه"];
const PICKUPS  = ["احمدآباد", "میدان آزادی", "ولیعصر", "تجریش", "خیابان وکیل‌آباد", "میدان امام", "بلوار سجاد", "خیابان ابن سینا"];
const DROPOFFS = ["حرم مطهر", "فرودگاه", "دانشگاه فردوسی", "پارک ملت", "بیمارستان رضوی", "ترمینال شرق", "بازار رضا", "مرکز خرید پروما"];

function randomOffer(): RideOffer {
  const pickup = PICKUPS[Math.floor(Math.random() * PICKUPS.length)];
  let dropoff = DROPOFFS[Math.floor(Math.random() * DROPOFFS.length)];
  if (dropoff === pickup) dropoff = DROPOFFS[(DROPOFFS.indexOf(dropoff) + 1) % DROPOFFS.length];
  const distanceKm = +(2 + Math.random() * 18).toFixed(1);
  return {
    id: crypto.randomUUID(),
    passenger: PASSENGERS[Math.floor(Math.random() * PASSENGERS.length)],
    pickup,
    dropoff,
    distanceKm,
    etaMin: Math.max(2, Math.round(distanceKm * 1.5)),
    price: Math.round((35_000 + distanceKm * 9_500) / 1000) * 1000,
  };
}

export function RideOfferSimulator() {
  const status = useAppSelector((s) => s.driver.status);
  const isOnline = status === "online";
  const [offer, setOffer] = useState<RideOffer | null>(null);
  const [accepted, setAccepted] = useState<RideOffer | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(15);

  const newOffer = useCallback(() => {
    setOffer(randomOffer());
    setSecondsLeft(15);
  }, []);

  // Generate offers periodically while online
  useEffect(() => {
    if (!isOnline) {
      setOffer(null);
      return;
    }
    if (offer || accepted) return;
    const t = setTimeout(newOffer, 3000 + Math.random() * 4000);
    return () => clearTimeout(t);
  }, [isOnline, offer, accepted, newOffer]);

  // Countdown / auto-reject
  useEffect(() => {
    if (!offer) return;
    if (secondsLeft <= 0) {
      setOffer(null);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [offer, secondsLeft]);

  const reject = () => setOffer(null);
  const accept = () => {
    if (!offer) return;
    setAccepted(offer);
    setOffer(null);
    setTimeout(() => setAccepted(null), 4500);
  };

  return (
    <>
      {/* Ride offer card */}
      <AnimatePresence>
        {offer && (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 250 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] w-[min(440px,calc(100vw-32px))] rounded-2xl bg-bg2 border border-bdr2 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
            dir="rtl"
            style={{ fontFamily: "Vazirmatn, sans-serif" }}
          >
            {/* Countdown bar */}
            <div className="h-1 bg-bdr">
              <motion.div
                key={offer.id + "-bar"}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 15, ease: "linear" }}
                className="h-full bg-emerald-400"
              />
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Car size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-fg">پیشنهاد سفر جدید</p>
                    <p className="text-[11px] text-fg4">از طرف {offer.passenger}</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-fg3 bg-glass border border-bdr px-2 py-1 rounded-md">
                  {secondsLeft}s
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] text-fg4">مبدأ</p>
                    <p className="text-fg2 font-semibold">{offer.pickup}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <MapPin size={14} className="text-red-400 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] text-fg4">مقصد</p>
                    <p className="text-fg2 font-semibold">{offer.dropoff}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-5">
                <div className="rounded-lg bg-glass border border-bdr p-2.5 text-center">
                  <p className="text-[10px] text-fg4 mb-0.5">مسافت</p>
                  <p className="text-sm font-extrabold text-fg">{offer.distanceKm} km</p>
                </div>
                <div className="rounded-lg bg-glass border border-bdr p-2.5 text-center">
                  <p className="text-[10px] text-fg4 mb-0.5 flex items-center justify-center gap-1">
                    <Clock size={10} /> زمان
                  </p>
                  <p className="text-sm font-extrabold text-fg">{offer.etaMin} دق</p>
                </div>
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-400/30 p-2.5 text-center">
                  <p className="text-[10px] text-emerald-300 mb-0.5 flex items-center justify-center gap-1">
                    <DollarSign size={10} /> کرایه
                  </p>
                  <p className="text-sm font-extrabold text-emerald-300">
                    {offer.price.toLocaleString()} ت
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reject}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-glass border border-bdr text-fg2 hover:text-fg hover:border-bdr2 font-semibold text-sm transition-all"
                >
                  <X size={14} />
                  رد
                </button>
                <button
                  onClick={accept}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-sm transition-all"
                >
                  <Check size={14} />
                  قبول سفر
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accepted confirmation popup */}
      <AnimatePresence>
        {accepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] flex items-center justify-center bg-black/45 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 18, stiffness: 280 }}
              className="bg-bg2 border border-bdr2 rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl"
              dir="rtl"
              style={{ fontFamily: "Vazirmatn, sans-serif" }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <PartyPopper size={28} />
              </div>
              <h3 className="text-xl font-black text-fg mb-2">سفر قبول شد ✓</h3>
              <p className="text-sm text-fg3 mb-4 leading-relaxed">
                {accepted.passenger} منتظر شماست. به سمت <span className="font-bold text-fg2">{accepted.pickup}</span> حرکت کنید.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg bg-glass border border-bdr p-3">
                  <p className="text-[10px] text-fg4">کرایه</p>
                  <p className="font-extrabold text-fg">{accepted.price.toLocaleString()} ت</p>
                </div>
                <div className="rounded-lg bg-glass border border-bdr p-3">
                  <p className="text-[10px] text-fg4">مقصد</p>
                  <p className="font-extrabold text-fg">{accepted.dropoff}</p>
                </div>
              </div>
              <button
                onClick={() => setAccepted(null)}
                className="mt-5 w-full py-3 rounded-xl bg-fg text-bg font-bold text-sm hover:opacity-90 transition-opacity"
              >
                باشه
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}