// src/app/en/admin/support/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { LifeBuoy, Clock } from "lucide-react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Badge } from "@/shared/components/ui/index";
import { mockTickets } from "@/lib/mock-data";
import { timeAgo } from "@/lib/utils";
import type { SupportTicket } from "@/types";

type Locale = "en" | "fa";

const statusConfig = {
  open:        { fa: "باز",       en: "Open",        v: "red"     as const },
  in_progress: { fa: "در بررسی",  en: "In Progress", v: "yellow"  as const },
  resolved:    { fa: "حل‌شده",    en: "Resolved",    v: "green"   as const },
  closed:      { fa: "بسته",      en: "Closed",      v: "default" as const },
};

const priorityConfig = {
  high:   { fa: "فوری",   en: "High",   icon: "🔴" },
  medium: { fa: "متوسط",  en: "Medium", icon: "🟡" },
  low:    { fa: "پایین",  en: "Low",    icon: "🟢" },
};

export default function AdminSupportPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isFa = locale === "fa";
  
  const [activeTicket, setActiveTicket] = useState<SupportTicket | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filters = [
    { value: "all",        fa: "همه",       en: "All"         },
    { value: "open",       fa: "باز",       en: "Open"        },
    { value: "in_progress",fa: "در بررسی",  en: "In Progress" },
    { value: "resolved",   fa: "حل‌شده",    en: "Resolved"    },
  ];

  const filtered = filter === "all" ? mockTickets : mockTickets.filter(t => t.status === filter);

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "پشتیبانی" : "Support"}>
      <div dir={isFa ? "rtl" : "ltr"} className="flex gap-4 h-[calc(100vh-130px)]">
        {/* Ticket list */}
        <div className="w-full lg:w-[360px] flex flex-col flex-shrink-0">
          {/* Filter */}
          <div className="flex gap-1 mb-3 p-1 rounded-xl bg-glass border border-bdr">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`flex-1 py-1.5 rounded-lg text-[10.5px] font-semibold transition-all ${
                  filter === f.value ? "bg-fg text-bg" : "text-fg4 hover:text-fg3"
                }`}
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {isFa ? f.fa : f.en}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {filtered.map((ticket) => {
              const sc = statusConfig[ticket.status];
              const pc = priorityConfig[ticket.priority];
              return (
                <div
                  key={ticket.id}
                  onClick={() => setActiveTicket(ticket)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                    activeTicket?.id === ticket.id
                      ? "bg-glass2 border-bdr2"
                      : "bg-glass border-bdr hover:border-bdr2"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-fg4">#{ticket.id}</span>
                    <Badge variant={sc.v} className="text-[9px]">{isFa ? sc.fa : sc.en}</Badge>
                  </div>
                  <p className="text-[13px] font-semibold text-fg mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                    {pc.icon} {ticket.subject}
                  </p>
                  <p className="text-[11.5px] text-fg3 line-clamp-2 mb-2" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                    {ticket.message}
                  </p>
                  <div className="flex items-center gap-1 text-fg4">
                    <Clock size={10} />
                    <span className="text-[10.5px]">{timeAgo(ticket.createdAt, locale)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticket detail */}
        <div className="flex-1 hidden lg:flex flex-col">
          {activeTicket ? (
            <div className="p-5 rounded-2xl bg-glass border border-bdr h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] text-fg4 mb-1">#{activeTicket.id}</p>
                  <h3 className="text-base font-bold text-fg" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                    {activeTicket.subject}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <Badge variant={statusConfig[activeTicket.status].v}>
                    {isFa ? statusConfig[activeTicket.status].fa : statusConfig[activeTicket.status].en}
                  </Badge>
                  <Badge variant={activeTicket.priority === "high" ? "red" : activeTicket.priority === "medium" ? "yellow" : "green"}>
                    {isFa ? priorityConfig[activeTicket.priority].fa : priorityConfig[activeTicket.priority].en}
                  </Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-glass2 border border-bdr flex-1 mb-4">
                <p className="text-sm text-fg2 leading-[1.7]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                  {activeTicket.message}
                </p>
                <p className="text-[10.5px] text-fg4 mt-3">{timeAgo(activeTicket.createdAt, locale)}</p>
              </div>

              {/* Reply box */}
              <div className="flex gap-2">
                <textarea
                  placeholder={isFa ? "پاسخ بده..." : "Reply..."}
                  rows={2}
                  className="flex-1 input-field resize-none text-sm"
                  style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
                />
                <button className="px-4 py-2 rounded-xl bg-btn-bg text-btn-fg text-sm font-bold hover:opacity-88 transition-opacity self-end">
                  {isFa ? "ارسال" : "Send"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <LifeBuoy size={40} className="text-fg4 mb-3" />
              <p className="text-sm text-fg4" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                {isFa ? "یک تیکت انتخاب کن" : "Select a ticket to view"}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}