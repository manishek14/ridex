// src/features/driver/components/DriverStatusToggle.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { setDriverStatus } from "@/store/slices/driverSlice";
import { Button } from "@/shared/components/ui/Button";
import { Power, PowerOff } from "lucide-react";

interface DriverStatusToggleProps {
  locale?: string;
}

export function DriverStatusToggle({ locale = "fa" }: DriverStatusToggleProps) {
  const dispatch = useAppDispatch();
  const { status, loading } = useAppSelector((state) => state.driver);
  const isOnline = status === "online";

  const handleToggle = () => {
    // ✅ اصلاح: استفاده از setDriverStatus
    dispatch(setDriverStatus(isOnline ? "offline" : "online"));
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-glass border border-bdr rounded-xl">
      <div className="flex-1">
        <p className="text-sm font-semibold text-fg">
          {isOnline ? "🟢 آنلاین" : "🔴 آفلاین"}
        </p>
        <p className="text-xs text-fg3">
          {isOnline 
            ? "در حال حاضر آماده پذیرش سفر هستید" 
            : "برای دریافت سفر، آنلاین شوید"}
        </p>
      </div>
      <Button
        onClick={handleToggle}
        disabled={loading}
        variant={isOnline ? "ghost" : "primary"}
        className={isOnline ? "border-red-400 text-red-400 hover:bg-red-400/10" : ""}
      >
        {isOnline ? (
          <>
            <PowerOff size={16} className="mr-2" />
            {locale === "fa" ? "آفلاین شو" : "Go Offline"}
          </>
        ) : (
          <>
            <Power size={16} className="mr-2" />
            {locale === "fa" ? "آنلاین شو" : "Go Online"}
          </>
        )}
      </Button>
    </div>
  );
}