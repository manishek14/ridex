// src/features/driver/services/driverService.ts
import type { Driver } from "@/types";
import { mockDrivers } from "@/lib/mock-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const driverService = {
  // ── دریافت اطلاعات راننده ──────────────────────────────
  async getDriver(driverId: string): Promise<Driver | null> {
    await delay(500);
    const driver = mockDrivers.find((d) => d.id === driverId);
    return driver || null;
  },

  // ── تغییر وضعیت آنلاین/آفلاین ──────────────────────────
  async toggleStatus(driverId: string): Promise<{ status: "online" | "offline" | "busy" }> {
    await delay(400);
    const driver = mockDrivers.find((d) => d.id === driverId);
    if (!driver) throw new Error("راننده یافت نشد");
    
    const newStatus = driver.status === "online" ? "offline" : "online";
    driver.status = newStatus;
    return { status: newStatus };
  },

  // ── دریافت آمار راننده ──────────────────────────────────
  async getStats(driverId: string) {
    await delay(600);
    return {
      totalRides: 1842,
      completedRides: 1780,
      cancelledRides: 62,
      totalEarnings: 12450000,
      averageRating: 4.92,
      onlineStatus: "online" as const,
    };
  },
};