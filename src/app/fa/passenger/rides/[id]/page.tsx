// src/app/fa/passenger/rides/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  Car,
  User,
  Phone,
  Calendar,
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  Share2,
  Navigation
} from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";

// Mock data (در واقع از API میاد)
const mockRideData = {
  id: "r1",
  origin: "صادقیه، تهران",
  destination: "بهشتی، تهران",
  price: 85000,
  date: "۱۱ روز پیش",
  status: "completed" as const,
  driverName: "احمد رضایی",
  driverPhone: "09121234567",
  driverRating: 4.92,
  carModel: "شاسی‌بلند",
  carPlate: "۱۲۳-الف-۴۵",
  rating: 5,
  distance: 8.4,
  duration: 22,
  time: "۱۰:۳۰ صبح",
};

export default function RideDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const rideId = params?.id as string || "r1";

  // در واقع از API میگیری
  const ride = mockRideData;

  const statusConfig = {
    completed: { label: "تکمیل شده", icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10" },
    cancelled: { label: "لغو شده", icon: XCircle, color: "text-red-400", bg: "bg-red-400/10" },
    pending: { label: "در انتظار", icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  };

  const status = statusConfig[ride.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-5">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm text-[var(--fg3)] hover:text-[var(--fg)] transition-colors"
      >
        <ChevronLeft size={18} />
        بازگشت
      </button>

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--bg2)] border border-[var(--bdr)] rounded-2xl p-5 space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--fg4)]">شماره سفر</p>
            <p className="text-sm font-bold text-[var(--fg)]">#{ride.id}</p>
          </div>
          <Badge variant={ride.status === "completed" ? "success" : ride.status === "cancelled" ? "error" : "warning"}>
            <StatusIcon size={12} className="mr-1" />
            {status.label}
          </Badge>
        </div>

        {/* Route */}
        <div className="relative py-2">
          <div className="absolute left-3 top-0 bottom-0 flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <div className="w-0.5 flex-1 bg-[var(--bdr2)]" />
            <div className="w-2 h-2 rounded-full bg-red-400" />
          </div>
          <div className="pl-8 space-y-4">
            <div>
              <p className="text-xs text-[var(--fg4)]">مبدا</p>
              <p className="text-sm font-semibold text-[var(--fg)]">{ride.origin}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--fg4)]">مقصد</p>
              <p className="text-sm font-semibold text-[var(--fg)]">{ride.destination}</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[var(--bdr)]">
          <div className="text-center">
            <p className="text-xs text-[var(--fg4)]">قیمت</p>
            <p className="text-lg font-black text-[var(--fg)]">{ride.price.toLocaleString()}</p>
            <p className="text-[9px] text-[var(--fg4)]">تومان</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[var(--fg4)]">مسافت</p>
            <p className="text-lg font-black text-[var(--fg)]">{ride.distance}</p>
            <p className="text-[9px] text-[var(--fg4)]">کیلومتر</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[var(--fg4)]">زمان</p>
            <p className="text-lg font-black text-[var(--fg)]">{ride.duration}</p>
            <p className="text-[9px] text-[var(--fg4)]">دقیقه</p>
          </div>
        </div>
      </motion.div>

      {/* Driver Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-[var(--glass)] border border-[var(--bdr)] rounded-2xl p-4 space-y-3"
      >
        <p className="text-xs font-bold text-[var(--fg4)] uppercase tracking-wider">اطلاعات راننده</p>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl font-black text-white">
              {ride.driverName.charAt(0)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 border-[var(--bg2)]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-[var(--fg)]">{ride.driverName}</p>
              <div className="flex items-center gap-0.5">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-semibold text-[var(--fg)]">{ride.driverRating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--fg3)]">
              <span>{ride.carModel}</span>
              <span>•</span>
              <span className="font-mono text-[10px] bg-[var(--bg2)] px-1.5 py-0.5 rounded">
                {ride.carPlate}
              </span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button className="w-9 h-9 rounded-full bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center hover:bg-[var(--glass2)] transition-colors">
              <Phone size={14} className="text-[var(--fg3)]" />
            </button>
            <button className="w-9 h-9 rounded-full bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center hover:bg-[var(--glass2)] transition-colors">
              <MessageCircle size={14} className="text-[var(--fg3)]" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Rating */}
      {ride.status === "completed" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--glass)] border border-[var(--bdr)] rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={star <= ride.rating ? "text-yellow-400 fill-yellow-400" : "text-[var(--bdr2)]"}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[var(--fg)]">{ride.rating}.0</span>
            </div>
            <button className="text-xs text-[var(--fg3)] hover:text-[var(--fg)] transition-colors">
              ویرایش
            </button>
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="ghost" className="flex-1">
          <Share2 size={14} className="mr-1" />
          اشتراک‌گذاری
        </Button>
        <Button variant="ghost" className="flex-1 border-red-400/30 text-red-400 hover:bg-red-400/10">
          <AlertCircle size={14} className="mr-1" />
          گزارش مشکل
        </Button>
      </div>
    </div>
  );
}