// src/app/en/admin/rides/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Card, Badge } from "@/shared/components/ui/index";
import { mockRides } from "@/lib/mock-data";
import { formatPrice, getRideStatusLabel, timeAgo } from "@/lib/utils";
import { Search } from "lucide-react";

export default function AdminRidesPage() {
  // ✅ دریافت locale از URL
  const params = useParams();
  const locale : any = (params?.locale as string) || "en";
  const isFa = locale === "fa";

  const [search, setSearch] = useState("");

  const filtered = mockRides.filter(
    (r) =>
      r.origin.address.includes(search) ||
      r.destination?.address.includes(search) ||
      r.passenger.name.includes(search)
  );

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "مدیریت سفرها" : "Ride Management"}>
      <div dir={isFa ? "rtl" : "ltr"}>
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 text-[var(--fg4)]" style={{ left: isFa ? "12px" : "12px" }} />
          <input
            type="text"
            placeholder={isFa ? "جستجوی سفر..." : "Search rides..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] text-[var(--fg)] text-sm placeholder:text-[var(--fg4)] outline-none focus:border-[var(--bdr2)] transition-all"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          />
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--bdr)]">
                  <th className="text-right p-3 text-[10px] font-bold text-[var(--fg4)] uppercase tracking-wider">
                    {isFa ? "مسیر" : "Route"}
                  </th>
                  <th className="text-right p-3 text-[10px] font-bold text-[var(--fg4)] uppercase tracking-wider hidden md:table-cell">
                    {isFa ? "مسافر" : "Passenger"}
                  </th>
                  <th className="text-right p-3 text-[10px] font-bold text-[var(--fg4)] uppercase tracking-wider">
                    {isFa ? "قیمت" : "Price"}
                  </th>
                  <th className="text-right p-3 text-[10px] font-bold text-[var(--fg4)] uppercase tracking-wider hidden md:table-cell">
                    {isFa ? "تاریخ" : "Date"}
                  </th>
                  <th className="text-right p-3 text-[10px] font-bold text-[var(--fg4)] uppercase tracking-wider">
                    {isFa ? "وضعیت" : "Status"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 10).map((ride) => {
                  const st = getRideStatusLabel(ride.status, locale);
                  return (
                    <tr key={ride.id} className="border-b border-[var(--bdr)] hover:bg-[var(--glass2)] transition-colors">
                      <td className="p-3">
                        <p className="text-sm font-semibold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                          {ride.origin.address}
                        </p>
                        <p className="text-[10px] text-[var(--fg4)]">→ {ride.destination?.address}</p>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <p className="text-sm text-[var(--fg2)]">{ride.passenger.name}</p>
                      </td>
                      <td className="p-3">
                        <p className="text-sm font-bold text-[var(--fg)]">{formatPrice(ride.price, locale)}</p>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <p className="text-xs text-[var(--fg4)]">{timeAgo(ride.createdAt, locale)}</p>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={
                            ride.status === "completed"
                              ? "green"
                              : ride.status === "cancelled"
                              ? "red"
                              : "blue"
                          }
                          className="text-[10px]"
                        >
                          {isFa ? st.fa : st.en}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}