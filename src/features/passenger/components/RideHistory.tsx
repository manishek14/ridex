"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ChevronRight, Star } from "lucide-react";
import { mockRides } from "@/lib/mock-data";

export function RideHistory({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";

  return (
    <div className="space-y-6" dir={isFa ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
          {isFa ? "تاریخچه سفرها" : "Ride History"}
        </h3>
        <select className="bg-[var(--bg2)] border border-[var(--bdr)] rounded-lg text-xs font-bold p-2 outline-none">
          <option>{isFa ? "همه سفرها" : "All Rides"}</option>
          <option>{isFa ? "ماه اخیر" : "Last Month"}</option>
        </select>
      </div>

      <div className="space-y-4">
        {mockRides.map((ride, i) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-[24px] bg-[var(--bg2)] border border-[var(--bdr)] hover:border-[var(--bdr2)] transition-all group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-4">
                {/* Locations */}
                <div className="space-y-2 relative">
                  <div className="absolute top-2 bottom-2 right-[7px] w-0.5 bg-[var(--bdr)] md:right-[7px]" />
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-[var(--bg2)] z-10" />
                    <p className="text-xs font-bold text-[var(--fg)] truncate">{ride.origin.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500 border-4 border-[var(--bg2)] z-10" />
                    <p className="text-xs font-bold text-[var(--fg)] truncate">{ride.destination.address}</p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--fg4)] uppercase tracking-wider">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{isFa ? "۱۴ تیر ۱۴۰۲" : "July 5, 2023"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{isFa ? "۱۲:۳۰" : "12:30 PM"}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:flex-col md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-[var(--bdr)]">
                <div className="text-right">
                  <p className="text-lg font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                    {new Intl.NumberFormat(isFa ? "fa-IR" : "en-US").format(ride.price)}
                    <span className="text-[10px] mr-1 opacity-60">{isFa ? "تومان" : "IRT"}</span>
                  </p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <Star size={10} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold text-[var(--fg3)]">۵.۰</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase">
                    {isFa ? "تکمیل شده" : "Completed"}
                  </span>
                  <ChevronRight size={16} className="text-[var(--fg4)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
