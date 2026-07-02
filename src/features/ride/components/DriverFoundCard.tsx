// src/features/ride/components/DriverFoundCard.tsx
"use client";

import { Car, MapPin, Star, Phone, Clock, Navigation, Shield } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";

interface DriverFoundCardProps {
  driverName: string;
  driverPhone: string;
  driverRating: number;
  carModel: string;
  carPlate: string;
  carColor: string;
  eta: number;
  price: number;
  driverImage?: string;
  onCancel?: () => void;
  onCall?: () => void;
  onTrack?: () => void;
  locale?: string;
}

export function DriverFoundCard({
  driverName,
  driverPhone,
  driverRating,
  carModel,
  carPlate,
  carColor,
  eta,
  price,
  driverImage,
  onCancel,
  onCall,
  onTrack,
  locale = "fa",
}: DriverFoundCardProps) {
  const isFa = locale === "fa";

  return (
    <div
      className="w-full max-w-[420px] bg-bg2 border border-bdr rounded-[24px] shadow-2xl overflow-hidden"
    >
      {/* Header - Driver Info */}
      <div className="p-5 border-b border-bdr bg-glass">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fg to-fg2 flex items-center justify-center text-2xl font-black text-bg relative">
              {driverName.charAt(0).toUpperCase()}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 border-bg2" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-fg flex items-center gap-2">
                {driverName}
                <Shield size={14} className="text-blue-400" />
              </h3>
              <div className="flex items-center gap-2 text-xs text-fg3 flex-wrap">
                <div className="flex items-center gap-0.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-fg">{driverRating}</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Car size={10} />
                  {carColor} {carModel}
                </span>
                <span>•</span>
                <span className="font-mono text-[10px] bg-glass px-1.5 py-0.5 rounded">
                  {carPlate}
                </span>
              </div>
            </div>
          </div>

          {/* ETA Badge */}
          <Badge variant="success" className="flex items-center gap-1.5 px-3 py-1.5 text-sm">
            <Clock size={14} />
            {isFa ? `${eta} دقیقه` : `${eta} min`}
          </Badge>
        </div>
      </div>

      {/* Body - Price & Actions */}
      <div className="p-5 space-y-4">
        {/* Price */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-glass border border-bdr">
          <span className="text-sm text-fg3">
            {isFa ? "هزینه تخمینی سفر" : "Estimated Ride Cost"}
          </span>
          <div className="text-right">
            <span className="text-2xl font-black text-fg">
              {price.toLocaleString()}
            </span>
            <span className="text-xs text-fg4 mr-1">
              {isFa ? "تومان" : "T"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            className="w-full text-base"
            size="lg"
            onClick={onTrack}
          >
            <Navigation size={18} className="mr-2" />
            {isFa ? "ردیابی سفر" : "Track Ride"}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={onCall}
            >
              <Phone size={14} className="mr-1.5" />
              {isFa ? "تماس با راننده" : "Call Driver"}
            </Button>
            <Button
              variant="ghost"
              className="flex-1 text-red-400 border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
              onClick={onCancel}
            >
              {isFa ? "لغو سفر" : "Cancel Ride"}
            </Button>
          </div>
        </div>

        {/* Warning Note */}
        <p className="text-[10px] text-fg4 text-center">
          {isFa
            ? "با لغو سفر، ممکن است هزینه‌ای از کیف پول شما کسر شود."
            : "Cancelling may incur a fee from your wallet."}
        </p>
      </div>

      {/* Footer - Route Info */}
      <div className="px-5 py-3 border-t border-bdr bg-glass/50 flex items-center justify-between text-xs text-fg4">
        <div className="flex items-center gap-2">
          <MapPin size={12} />
          <span>{isFa ? "در مسیر شما" : "On your route"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Shield size={10} />
          <span>{isFa ? "تأیید شده" : "Verified"}</span>
        </div>
      </div>
    </div>
  );
}