"use client";

import { useState } from "react";
import { CreditCard, ChevronDown, Info } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setRideStatus, setOrigin, setDestination } from "@/store/slices/rideSlice";
import { Button } from "@/shared/components/ui/Button";
import { AddressSearch } from "./AddressSearch";

const vehicleTypes = [
  { id: "go", name: { fa: "رایدکس گو", en: "RideX Go" }, price: 45000, eta: 3, icon: "🚗" },
  { id: "premium", name: { fa: "رایدکس لوکس", en: "RideX Premium" }, price: 85000, eta: 5, icon: "✨" },
  { id: "moto", name: { fa: "رایدکس موتور", en: "RideX Moto" }, price: 25000, eta: 2, icon: "🏍️" },
];

export function RideBookingCard({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";
  const dispatch = useAppDispatch();
  const { status, booking } = useAppSelector((s) => s.ride);
  const { origin, destination } = booking;
  const [selectedType, setSelectedType] = useState(vehicleTypes[0]);

  const handleRequest = () => {
    dispatch(setRideStatus("searching"));
  };

  return (
    <div className="w-full max-w-[420px] bg-bg2/80 backdrop-blur-xl border border-bdr rounded-[32px] shadow-2xl overflow-hidden" dir={isFa ? "rtl" : "ltr"}>
      <div className="p-6 space-y-6">
        {/* Location Selection */}
        <div className="space-y-3 relative">
          <div className="absolute top-[52px] bottom-[52px] right-[23px] w-0.5 bg-gradient-to-b from-green-500 to-red-500 z-0" />
          
          <AddressSearch 
            placeholder={isFa ? "کجا هستید؟ (مبدأ)" : "Where are you? (Origin)"}
            onSelect={(s) => dispatch(setOrigin({ address: s.title, lat: s.location.y, lng: s.location.x }))}
            locale={locale}
          />

          <AddressSearch 
            placeholder={isFa ? "کجا می‌روید؟ (مقصد)" : "Where to? (Destination)"}
            onSelect={(s) => dispatch(setDestination({ address: s.title, lat: s.location.y, lng: s.location.x }))}
            locale={locale}
          />
        </div>

        {/* Vehicle Types */}
        <div className="grid grid-cols-3 gap-3">
          {vehicleTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 ${
                selectedType.id === type.id 
                  ? "bg-fg border-fg text-bg shadow-lg scale-[1.02]" 
                  : "bg-glass border-bdr text-fg hover:border-bdr2"
              }`}
            >
              <span className="text-2xl mb-1">{type.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-tighter text-center">
                {isFa ? type.name.fa : type.name.en}
              </span>
              <span className="text-[10px] font-bold opacity-60">
                {type.eta} {isFa ? "دقیقه" : "min"}
              </span>
            </button>
          ))}
        </div>

        {/* Price & Payment */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-glass border border-bdr">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fg text-bg flex items-center justify-center">
              <CreditCard size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-fg4 uppercase">{isFa ? "روش پرداخت" : "Payment"}</p>
              <p className="text-xs font-black">{isFa ? "کیف پول" : "Wallet"}</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-xl font-black" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {new Intl.NumberFormat(isFa ? "fa-IR" : "en-US").format(selectedType.price)}
              <span className="text-[10px] mr-1 opacity-60">{isFa ? "تومان" : "IRT"}</span>
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          fullWidth 
          size="lg" 
          disabled={!origin || !destination}
          onClick={handleRequest}
          className="py-7 rounded-2xl text-lg font-black shadow-xl shadow-fg/10"
        >
          {isFa ? "درخواست رایدکس" : "Request RideX"}
        </Button>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-4 bg-fg/5 border-t border-bdr flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] font-bold text-fg4">
          <Info size={12} />
          <span>{isFa ? "قیمت‌ها بر اساس ترافیک زنده است" : "Prices based on live traffic"}</span>
        </div>
        <ChevronDown size={16} className="text-fg4" />
      </div>
    </div>
  );
}
