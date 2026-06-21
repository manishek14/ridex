// src/features/admin/components/AdminLiveMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { NESHAN_CONFIG } from "@/config/constants";
import { mockDrivers, mockRides } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Users, Car, AlertTriangle, X } from "lucide-react";

// ✅ اضافه کردن type declaration برای window.L
declare global {
  interface Window {
    L: any;
  }
}

// ✅ اصلاح Entity اینترفیس
interface Entity {
  entityType: "driver" | "ride";
  data: any;
}

export function AdminLiveMap({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const initMap = () => {
    if (!mapRef.current || mapInstance.current || !window.L) return;

    const L = window.L;
    mapInstance.current = new L.Map(mapRef.current, {
      center: [NESHAN_CONFIG.DEFAULT_CENTER.lat, NESHAN_CONFIG.DEFAULT_CENTER.lng],
      zoom: 12,
    });

    L.tileLayer("https://static.neshan.org/sdk/leaflet/1.4.0/layers/standard/{z}/{x}/{y}.png", {
      attribution: "&copy; Neshan Maps",
    }).addTo(mapInstance.current);

    // ✅ Add Mock Drivers to Map
    mockDrivers.forEach((driver) => {
      if (!driver.location) return;

      const marker = L.marker([driver.location.lat, driver.location.lng], {
        icon: L.divIcon({
          className: "admin-driver-marker",
          html: `<div class="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">🚗</div>`
        })
      }).addTo(mapInstance.current);

      marker.on("click", () => {
        setSelectedEntity({
          entityType: "driver",
          data: driver
        });
      });
    });

    // ✅ Add Mock Active Rides to Map
    mockRides.forEach((ride) => {
      const marker = L.marker([ride.origin.lat, ride.origin.lng], {
        icon: L.divIcon({
          className: "admin-ride-marker",
          html: `<div class="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white">📍</div>`
        })
      }).addTo(mapInstance.current);

      marker.on("click", () => {
        setSelectedEntity({
          entityType: "ride",
          data: ride
        });
      });
    });
  };

  useEffect(() => {
    if (isLoaded) initMap();
  }, [isLoaded]);

  return (
    <div className="relative w-full h-[600px] rounded-[32px] overflow-hidden border border-[var(--bdr)] shadow-2xl bg-[var(--bg2)]">
      <Script
        src="https://static.neshan.org/sdk/leaflet/1.4.0/leaflet.js"
        onLoad={() => setIsLoaded(true)}
      />
      <div ref={mapRef} className="w-full h-full" />

      {/* Map Stats Overlay */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-3">
        <div className="p-4 rounded-2xl bg-[var(--bg2)]/80 backdrop-blur-xl border border-[var(--bdr)] shadow-xl min-w-[180px]">
          <div className="flex items-center gap-3 mb-3">
            <Activity size={18} className="text-green-500" />
            <h4 className="text-xs font-black uppercase tracking-widest">{isFa ? "وضعیت زنده" : "Live Status"}</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[var(--fg4)]">{isFa ? "رانندگان آنلاین" : "Online Drivers"}</span>
              <span className="text-xs font-black text-green-500">۸۵۰</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-[var(--fg4)]">{isFa ? "سفرهای فعال" : "Active Rides"}</span>
              <span className="text-xs font-black text-blue-500">۳۴۲</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Entity Details Panel */}
      <AnimatePresence>
        {selectedEntity && (
          <motion.div
            initial={{ opacity: 0, x: isFa ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isFa ? -100 : 100 }}
            className={`absolute top-6 ${isFa ? "left-6" : "right-6"} bottom-6 w-80 z-20 p-6 rounded-[32px] bg-[var(--bg2)]/90 backdrop-blur-2xl border border-[var(--bdr)] shadow-2xl overflow-y-auto`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black">
                {selectedEntity.entityType === "driver" 
                  ? (isFa ? "جزئیات راننده" : "Driver Details") 
                  : (isFa ? "جزئیات سفر" : "Ride Details")}
              </h3>
              <button 
                onClick={() => setSelectedEntity(null)} 
                className="p-2 rounded-xl bg-[var(--glass)] hover:bg-[var(--bdr)] transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {selectedEntity.entityType === "driver" ? (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--glass)] flex items-center justify-center text-2xl">👨‍✈️</div>
                  <div>
                    <h4 className="font-black">{selectedEntity.data.user?.name || "راننده"}</h4>
                    <p className="text-xs text-[var(--fg4)]">{selectedEntity.data.vehicle?.model || "خودرو"}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
                    <p className="text-[9px] font-bold text-[var(--fg4)] uppercase">{isFa ? "امتیاز" : "Rating"}</p>
                    <p className="text-sm font-black text-orange-500">⭐ {selectedEntity.data.rating || 0}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)]">
                    <p className="text-[9px] font-bold text-[var(--fg4)] uppercase">{isFa ? "سفرها" : "Rides"}</p>
                    <p className="text-sm font-black">{selectedEntity.data.totalRides || 0}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-[10px] font-black text-blue-500 uppercase mb-2">{isFa ? "مسیر سفر" : "Ride Route"}</p>
                  <p className="text-xs font-bold mb-1 truncate">🏁 {selectedEntity.data.destination?.address || "مقصد"}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[var(--fg4)]">{isFa ? "قیمت سفر" : "Price"}</span>
                    <span>{selectedEntity.data.price?.toLocaleString() || 0} {isFa ? "تومان" : "IRT"}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[var(--fg4)]">{isFa ? "وضعیت" : "Status"}</span>
                    <span className="text-green-500">{isFa ? "در جریان" : "Active"}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg2)]/50 backdrop-blur-sm z-20">
          <div className="w-8 h-8 border-4 border-[var(--fg)] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}