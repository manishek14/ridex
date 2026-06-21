# RideX — پلتفرم حمل‌ونقل هوشمند

یک پلتفرم کامل ride-hailing مشابه Snapp/Uber ساخته‌شده با Next.js 15.

---

## 🚀 راه‌اندازی سریع

```bash
# 1. نصب وابستگی‌ها
npm install

# 2. اجرای محیط توسعه
npm run dev

# 3. باز کردن در مرورگر
# http://localhost:3000
```

---

## 📁 ساختار پروژه

```
src/
├── app/
│   └── [locale]/
│       ├── (public)/          # صفحه اصلی Landing
│       ├── (auth)/            # ورود و ثبت‌نام
│       ├── (passenger)/       # اپ مسافر
│       ├── (driver)/          # اپ راننده
│       ├── (business)/        # پنل سازمانی
│       └── (admin)/           # پنل ادمین
│
├── features/
│   ├── landing/               # کامپوننت‌های صفحه اصلی
│   ├── auth/                  # فرم‌ها و لاجیک احراز هویت
│   ├── ride/                  # سیستم رزرو سفر
│   ├── wallet/                # کیف پول
│   ├── passenger/             # ماژول مسافر
│   ├── driver/                # ماژول راننده
│   ├── business/              # ماژول سازمانی
│   └── admin/                 # ماژول ادمین
│
├── shared/
│   ├── components/
│   │   ├── ui/                # Button, Input, Card, Badge, Avatar...
│   │   ├── layout/            # Sidebar, DashboardHeader, DashboardLayout
│   │   ├── navigation/        # Navigation components
│   │   └── feedback/          # Toast notifications
│   └── hooks/                 # Custom hooks
│
├── store/                     # Redux Toolkit
│   └── slices/
│       ├── authSlice.ts
│       ├── themeSlice.ts
│       ├── uiSlice.ts
│       ├── rideSlice.ts
│       ├── walletSlice.ts
│       ├── driverSlice.ts
│       └── notificationSlice.ts
│
├── services/                  # API services (mock)
├── locales/fa & en/           # ترجمه‌ها
├── types/                     # TypeScript types
└── lib/                       # utils, mock-data, i18n
```

---

## 🎯 صفحات پیاده‌سازی‌شده

### Public Landing
- `/fa` یا `/en` — صفحه اصلی با Navbar، Hero، Services، AI، Pricing، CTA، Footer

### Auth
- `/fa/login` — ورود با Email یا OTP موبایل
- `/fa/register` — ثبت‌نام

### Passenger (مسافر)
- `/fa/passenger/dashboard` — داشبورد با آمار و آخرین سفرها
- `/fa/passenger/booking` — رزرو سفر با انتخاب نوع و مسیر
- `/fa/passenger/rides` — تاریخچه سفرها
- `/fa/passenger/wallet` — کیف پول و تراکنش‌ها
- `/fa/passenger/notifications` — اعلان‌ها
- `/fa/passenger/profile` — پروفایل
- `/fa/passenger/settings` — تنظیمات (تم، زبان، اعلان‌ها)

### Driver (راننده)
- `/fa/driver/dashboard` — داشبورد با toggle آنلاین/آفلاین
- `/fa/driver/earnings` — گزارش درآمد با چارت

### Business (سازمانی)
- `/fa/business/dashboard` — مدیریت بودجه و کارمندان

### Admin
- `/fa/admin/dashboard` — داشبورد با آمار کلی و چارت‌ها
- `/fa/admin/users` — مدیریت کاربران با جدول و جستجو
- `/fa/admin/rides` — مدیریت سفرها
- `/fa/admin/support` — تیکت‌های پشتیبانی

---

## 🛠 تکنولوژی‌ها

| Layer        | Tech                              |
|--------------|-----------------------------------|
| Framework    | Next.js 15 + App Router           |
| Language     | TypeScript (strict)               |
| Styling      | TailwindCSS + CSS Variables       |
| State        | Redux Toolkit                     |
| Forms        | React Hook Form + Zod             |
| i18n         | next-intl (FA + EN)               |
| Animation    | Framer Motion                     |
| Charts       | Recharts                          |
| Icons        | Lucide React                      |
| PWA          | manifest.json + next-pwa ready    |

---

## 🎨 Design System

- **Theme**: Dark/Light با CSS Variables
- **RTL/LTR**: کامل (فارسی RTL، انگلیسی LTR)
- **Fonts**: Vazirmatn (فارسی) + Inter (انگلیسی)
- **Colors**: بر اساس CSS Variables
- **Mobile First**: پشتیبانی کامل موبایل

---

## 📱 برای وصل کردن به Backend

فایل `src/services/authService.ts` را با API واقعی جایگزین کن.
همه mock data در `src/lib/mock-data.ts` قرار دارد.

---

## 🗺 نقشه

پروژه آماده وصل شدن به **Neshan Maps** است.
در صفحات مربوطه، کامپوننت نقشه را با SDK نشان جایگزین کن.

---

## License
MIT — RideX 2026
