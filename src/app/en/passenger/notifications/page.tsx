"use client";

import { Bell, CheckCheck, Car, Wallet, Tag, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/Button";
import { useAppDispatch, useAppSelector } from "@/store";
import { markAsRead, markAllAsRead } from "@/store/slices/notificationSlice";
import { timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, React.ReactNode> = {
  ride:   <Car    size={15} className="text-blue-400"   />,
  wallet: <Wallet size={15} className="text-green-400"  />,
  promo:  <Tag    size={15} className="text-yellow-400" />,
  system: <Info   size={15} className="text-[var(--fg3)]" />,
};

const typeBg: Record<string, string> = {
  ride:   "bg-blue-500/10",
  wallet: "bg-green-500/10",
  promo:  "bg-yellow-500/10",
  system: "bg-[var(--glass2)]",
};

export default function NotificationsPage() {
  const locale : any = "en";
  const isFa = locale === "fa";
  const dispatch = useAppDispatch();
  const { items, unreadCount } = useAppSelector((s) => s.notification);

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "اعلان‌ها" : "Notifications"}>
      <div className="max-w-xl" dir={isFa ? "rtl" : "ltr"}>
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-[var(--fg4)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {unreadCount > 0
              ? (isFa ? `${unreadCount} اعلان خوانده‌نشده` : `${unreadCount} unread`)
              : (isFa ? "همه خوانده شد" : "All read")}
          </p>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<CheckCheck size={13} />}
              onClick={() => dispatch(markAllAsRead())}
            >
              {isFa ? "همه را خواندم" : "Mark all read"}
            </Button>
          )}
        </div>

        {/* List */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Bell size={36} className="text-[var(--fg4)] mx-auto mb-3" />
            <p className="text-sm text-[var(--fg3)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "اعلانی وجود ندارد" : "No notifications"}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="flex flex-col gap-2">
              {items.map((n) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => dispatch(markAsRead(n.id))}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-xl border transition-all duration-150 cursor-pointer",
                    n.isRead
                      ? "bg-[var(--glass)] border-[var(--bdr)]"
                      : "bg-[var(--glass2)] border-[var(--bdr2)]"
                  )}
                >
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", typeBg[n.type] ?? "bg-[var(--glass2)]")}>
                    {typeIcon[n.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                        {n.title}
                      </p>
                      {!n.isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[12px] text-[var(--fg3)] mt-0.5 leading-[1.5]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                      {n.message}
                    </p>
                    <p className="text-[10.5px] text-[var(--fg4)] mt-1.5">
                      {timeAgo(n.createdAt, locale)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </DashboardLayout>
  );
}
