"use client";

import { type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  locale?: string;
  pageTitle?: string;
}

export function DashboardLayout({ children, locale = "fa", pageTitle }: DashboardLayoutProps) {
  const isFa = locale === "fa";

  return (
    <div className="dashboard-layout" dir={isFa ? "rtl" : "ltr"}>
      <Sidebar locale={locale} />
      <main className="dashboard-main">
        <DashboardHeader locale={locale} title={pageTitle} />
        <div className="flex-1 p-5 md:p-6">{children}</div>
      </main>
    </div>
  );
}
