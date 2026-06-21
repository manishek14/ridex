import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  id: string;
  type: "ride" | "wallet" | "promo" | "system";
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationState {
  items: Notification[];
  unreadCount: number;
}

const initialState: NotificationState = {
  items: [
    {
      id: "n1", type: "ride", title: "سفر تموم شد",
      message: "سفر شما به میدان آزادی با موفقیت انجام شد. امتیاز بده!",
      isRead: false, createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "n2", type: "promo", title: "تخفیف ویژه",
      message: "۳۰٪ تخفیف روی سفرهای پریمیوم تا آخر هفته",
      isRead: false, createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "n3", type: "wallet", title: "کیف پول شارژ شد",
      message: "۵۰۰,۰۰۰ تومان به کیف پول شما اضافه شد",
      isRead: true, createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
  unreadCount: 2,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<Notification, "id" | "isRead">>) {
      const notif: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        isRead: false,
      };
      state.items.unshift(notif);
      state.unreadCount += 1;
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notif = state.items.find((n) => n.id === action.payload);
      if (notif && !notif.isRead) {
        notif.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead(state) {
      state.items.forEach((n) => { n.isRead = true; });
      state.unreadCount = 0;
    },
    clearAll(state) {
      state.items = [];
      state.unreadCount = 0;
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead, clearAll } =
  notificationSlice.actions;
export default notificationSlice.reducer;
