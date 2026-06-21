"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Badge } from "@/shared/components/ui/index";
import { mockRides } from "@/lib/mock-data";
import { formatPrice, formatDate, getRideStatusLabel, getRideTypeLabel } from "@/lib/utils";

export default function AdminRidesPage2() {
  const locale = "fa";
  const isFa = locale === "fa";
  const [search, setSearch] = useState("");

  const filtered = mockRides.filter(
    (r) =>
      r.origin.address.includes(search) ||
      r.destination.address.includes(search) ||
      r.id.includes(search)
  );

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "مدیریت سفرها" : "Rides"}>
      <div dir={isFa ? "rtl" : "ltr"}>
        {/* Search */}
        <div className="flex items-center gap-2 mb-5 px-3.5 py-2.5 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] focus-within:border-[var(--bdr2)] w-full max-w-sm">
          <Search size={14} className="text-[var(--fg4)] flex-shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isFa ? "جستجو..." : "Search..."}
            className="flex-1 bg-transparent text-sm text-[var(--fg)] placeholder:text-[var(--fg4)] outline-none"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          />
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[var(--bdr)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "ID" : "ID"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "نوع" : "Type"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "مبدا" : "Origin"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "مقصد" : "Dest."}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "مبلغ" : "Amount"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "وضعیت" : "Status"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "تاریخ" : "Date"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ride) => {
                  const st = getRideStatusLabel(ride.status, locale);
                  const tp = getRideTypeLabel(ride.type, locale);
                  return (
                    <tr key={ride.id}>
                      <td className="font-mono text-[11px] text-[var(--fg4)]">{ride.id}</td>
                      <td>
                        <span className="flex items-center gap-1 text-[12px]">
                          {tp.icon} <span style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? tp.fa : tp.en}</span>
                        </span>
                      </td>
                      <td className="text-[12px] max-w-[140px] truncate" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                        {ride.origin.address}
                      </td>
                      <td className="text-[12px] max-w-[140px] truncate" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                        {ride.destination.address}
                      </td>
                      <td className="text-[13px] font-semibold" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                        {formatPrice(ride.price, locale)}
                      </td>
                      <td>
                        <Badge variant={ride.status === "completed" ? "green" : ride.status === "cancelled" ? "red" : "blue"}>
                          {st[locale === "fa" ? "fa" : "en"]}
                        </Badge>
                      </td>
                      <td className="text-[11px] text-[var(--fg4)]">{formatDate(ride.createdAt, locale)}</td>
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
