// src/features/driver/hooks/useDriver.ts
"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/store";
import { driverService } from "../services/driverService";
import type { Driver } from "@/types";

export function useDriver() {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchDriver = async () => {
      try {
        // در حالت واقعی، driverId از user گرفته می‌شود
        const driverId = "d1"; // موقت
        const data = await driverService.getDriver(driverId);
        setDriver(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطا در دریافت اطلاعات راننده");
      } finally {
        setLoading(false);
      }
    };

    fetchDriver();
  }, [user]);

  const toggleStatus = async () => {
    if (!driver) return;
    try {
      const newStatus = driver.status === "online" ? "offline" : "online";
      setDriver({ ...driver, status: newStatus });
      return { status: newStatus };
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در تغییر وضعیت");
      throw err;
    }
  };

  return {
    driver,
    loading,
    error,
    toggleStatus,
    refetch: async () => {
      if (user) {
        setLoading(true);
        try {
          const driverId = "d1";
          const data = await driverService.getDriver(driverId);
          setDriver(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "خطا در دریافت اطلاعات راننده");
        } finally {
          setLoading(false);
        }
      }
    },
  };
}