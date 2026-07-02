// src/app/en/admin/users/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Search, UserPlus, MoreHorizontal } from "lucide-react";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/Button";
import { Avatar, Badge } from "@/shared/components/ui/index";
import { mockUsers } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types";

// ✅ تعریف نوع Locale
type Locale = "en" | "fa";

const roleMap: Record<string, { fa: string; en: string; v: "green"|"blue"|"yellow"|"purple"|"default" }> = {
  passenger:  { fa: "مسافر",     en: "Passenger",  v: "blue"    },
  driver:     { fa: "راننده",    en: "Driver",     v: "green"   },
  business:   { fa: "سازمانی",   en: "Business",   v: "purple"  },
  admin:      { fa: "ادمین",     en: "Admin",      v: "yellow"  },
  superadmin: { fa: "سوپر ادمین",en: "SuperAdmin", v: "red" as "default" },
};

export default function AdminUsersPage() {
  // ✅ دریافت locale از URL با نوع صحیح
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isFa = locale === "fa";
  
  const [search, setSearch] = useState("");

  const filtered = mockUsers.filter((u) =>
    u.name.includes(search) || u.phone.includes(search) || (u.email ?? "").includes(search)
  );

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "مدیریت کاربران" : "Users"}>
      <div dir={isFa ? "rtl" : "ltr"}>
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] px-3.5 py-2.5 rounded-xl bg-glass border border-bdr focus-within:border-bdr2">
            <Search size={14} className="text-fg4 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isFa ? "جستجو نام، شماره، ایمیل..." : "Search name, phone, email..."}
              className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg4 outline-none"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            />
          </div>
          <Button leftIcon={<UserPlus size={14} />} size="sm">
            {isFa ? "افزودن کاربر" : "Add User"}
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: isFa ? "همه" : "All", count: mockUsers.length },
            { label: isFa ? "مسافران" : "Passengers", count: mockUsers.filter(u => u.role === "passenger").length },
            { label: isFa ? "رانندگان" : "Drivers", count: mockUsers.filter(u => u.role === "driver").length },
            { label: isFa ? "تأیید‌شده" : "Verified", count: mockUsers.filter(u => u.isVerified).length },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-xl bg-glass border border-bdr text-center">
              <p className="text-xl font-black text-fg" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{s.count}</p>
              <p className="text-[10.5px] text-fg4" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-bdr overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "کاربر" : "User"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "شماره" : "Phone"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "نقش" : "Role"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "وضعیت" : "Status"}</th>
                  <th style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{isFa ? "تاریخ ثبت" : "Joined"}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user: User) => {
                  const role = roleMap[user.role] ?? { fa: user.role, en: user.role, v: "default" as const };
                  return (
                    <tr key={user.id}>
                      <td>
                        <div className="flex items-center gap-2.5">
                          <Avatar name={user.name} size="sm" />
                          <div>
                            <p className="text-[13px] font-semibold text-fg" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>{user.name}</p>
                            <p className="text-[10.5px] text-fg4">{user.email ?? "—"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-[13px] font-mono">{user.phone}</td>
                      <td>
                        <Badge variant={role.v}>{isFa ? role.fa : role.en}</Badge>
                      </td>
                      <td>
                        <Badge variant={user.isVerified ? "green" : "yellow"} dot>
                          {user.isVerified ? (isFa ? "تأیید‌شده" : "Verified") : (isFa ? "در انتظار" : "Pending")}
                        </Badge>
                      </td>
                      <td className="text-[12px] text-fg4">{formatDate(user.createdAt, locale)}</td>
                      <td>
                        <button className="w-7 h-7 rounded-lg bg-glass border border-bdr flex items-center justify-center text-fg4 hover:text-fg hover:border-bdr2 transition-all">
                          <MoreHorizontal size={13} />
                        </button>
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