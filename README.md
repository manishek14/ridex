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
ridex/
├── .eslintrc.json
├── .gitignore
├── README.md
├── middleware.ts
├── next.config.ts
├── next-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
│
├── public/
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── manifest.json
│   ├── fonts/
│   │   ├── Vazirmatn-Regular.woff2
│   │   ├── Vazirmatn-Bold.woff2
│   │   ├── Vazirmatn-ExtraBold.woff2
│   │   └── Vazirmatn-Black.woff2
│   └── icons/
│       └── icon-144.png
│
└── src/
    ├── declarations.d.ts
    │
    ├── app/
    │   ├── layout.tsx                  # Root layout
    │   ├── page.tsx                    # ریدایرکت → /fa
    │   ├── global-error.tsx
    │   │
    │   ├── api/
    │   │   └── auth/                   # 🟡 خالی
    │   │
    │   ├── fa/                         # ⭐ صفحات فارسی
    │   │   ├── page.tsx                # لندینگ‌پیج اصلی
    │   │   ├── about/
    │   │   │   └── page.tsx
    │   │   ├── blog/
    │   │   │   └── page.tsx
    │   │   ├── business/
    │   │   │   ├── page.tsx            # ریدایرکت → dashboard
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── employees/
    │   │   │   │   └── page.tsx
    │   │   │   ├── billing/
    │   │   │   │   └── page.tsx
    │   │   │   ├── reports/
    │   │   │   │   └── page.tsx
    │   │   │   └── settings/
    │   │   │       └── page.tsx
    │   │   ├── contact/
    │   │   │   └── page.tsx
    │   │   ├── download/
    │   │   │   └── page.tsx
    │   │   ├── driver/
    │   │   │   ├── page.tsx            # ریدایرکت → dashboard
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── rides/
    │   │   │   │   └── page.tsx
    │   │   │   ├── earnings/
    │   │   │   │   └── page.tsx
    │   │   │   ├── wallet/
    │   │   │   │   └── page.tsx
    │   │   │   └── profile/
    │   │   │       └── page.tsx
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   ├── passenger/
    │   │   │   ├── dashboard/
    │   │   │   │   └── page.tsx
    │   │   │   ├── booking/
    │   │   │   │   └── page.tsx
    │   │   │   ├── rides/
    │   │   │   │   ├── page.tsx
    │   │   │   │   └── [id]/
    │   │   │   │       └── page.tsx
    │   │   │   ├── wallet/
    │   │   │   │   └── page.tsx
    │   │   │   ├── profile/
    │   │   │   │   └── page.tsx
    │   │   │   ├── notifications/
    │   │   │   │   └── page.tsx
    │   │   │   └── settings/
    │   │   │       └── page.tsx
    │   │   ├── pricing/
    │   │   │   └── page.tsx
    │   │   ├── register/
    │   │   │   └── page.tsx
    │   │   └── wallet/
    │   │       └── page.tsx
    │   │
    │   └── en/                         # ⭐ صفحات انگلیسی (ساختار مشابه fa)
    │
    ├── features/
    │   ├── landing/
    │   │   └── components/
    │   │       ├── index.ts
    │   │       ├── navbar/
    │   │       │   └── Navbar.tsx
    │   │       ├── hero/
    │   │       │   └── Hero.tsx
    │   │       ├── ticker/
    │   │       │   └── Ticker.tsx
    │   │       ├── numbers/
    │   │       │   └── Numbers.tsx
    │   │       ├── services/
    │   │       │   └── Services.tsx
    │   │       ├── ai-showcase/
    │   │       │   └── AiShowcase.tsx
    │   │       ├── bento-features/
    │   │       │   └── BentoFeatures.tsx
    │   │       ├── pricing/
    │   │       │   └── Pricing.tsx
    │   │       ├── cta/
    │   │       │   └── CtaFooter.tsx
    │   │       └── footer/
    │   │           └── Footer.tsx
    │   │
    │   ├── auth/
    │   │   ├── components/
    │   │   │   ├── LoginPage.tsx
    │   │   │   └── RegisterPage.tsx
    │   │   ├── schemas/
    │   │   │   └── index.ts
    │   │   └── hooks/
    │   │       ├── useAuth.ts
    │   │       └── useLogin.ts
    │   │
    │   ├── ride/
    │   │   ├── components/
    │   │   │   ├── RideDetails.tsx
    │   │   │   ├── RideBookingForm.tsx
    │   │   │   ├── NeshanMap.tsx
    │   │   │   └── DriverFoundCard.tsx
    │   │   ├── hooks/
    │   │   │   ├── useRide.ts
    │   │   │   ├── useBooking.ts
    │   │   │   └── useRideHistory.ts
    │   │   ├── services/
    │   │   │   └── rideService.ts
    │   │   ├── schemas/
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   │
    │   ├── wallet/
    │   │   ├── components/
    │   │   │   ├── WalletBalance.tsx
    │   │   │   └── WalletTransactions.tsx
    │   │   ├── hooks/
    │   │   │   ├── useWallet.ts
    │   │   │   └── useTransactions.ts
    │   │   ├── services/
    │   │   │   └── walletService.ts
    │   │   ├── schemas/
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   │
    │   ├── passenger/
    │   │   ├── components/
    │   │   │   ├── PassengerDashboard.tsx
    │   │   │   └── PassengerRides.tsx
    │   │   ├── hooks/
    │   │   │   ├── usePassenger.ts
    │   │   │   └── usePassengerRides.ts
    │   │   ├── services/
    │   │   │   └── passengerService.ts
    │   │   └── index.ts
    │   │
    │   ├── driver/
    │   │   ├── components/
    │   │   │   ├── DriverDashboard.tsx
    │   │   │   ├── DriverRides.tsx
    │   │   │   ├── DriverEarnings.tsx
    │   │   │   └── DriverProfile.tsx
    │   │   ├── hooks/
    │   │   │   ├── useDriver.ts
    │   │   │   └── useDriverRides.ts
    │   │   ├── services/
    │   │   │   └── driverService.ts
    │   │   └── index.ts
    │   │
    │   ├── business/
    │   │   ├── components/
    │   │   │   ├── BusinessDashboard.tsx
    │   │   │   ├── EmployeeList.tsx
    │   │   │   └── BusinessStats.tsx
    │   │   ├── hooks/
    │   │   │   ├── useBusiness.ts
    │   │   │   └── useEmployees.ts
    │   │   ├── services/
    │   │   │   └── businessService.ts
    │   │   └── index.ts
    │   │
    │   └── admin/
    │       ├── components/
    │       │   ├── AdminDashboard.tsx
    │       │   ├── AdminUsers.tsx
    │       │   └── AdminRides.tsx
    │       ├── hooks/
    │       │   └── useAdmin.ts
    │       ├── services/
    │       │   └── adminService.ts
    │       └── index.ts
    │
    ├── shared/
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── index.tsx           # Card, Badge, Avatar export hub
    │   │   │   ├── Button.tsx
    │   │   │   ├── Input.tsx
    │   │   │   ├── Card.tsx
    │   │   │   ├── Badge.tsx
    │   │   │   ├── Avatar.tsx
    │   │   │   ├── Checkbox.tsx
    │   │   │   ├── Dialog.tsx
    │   │   │   ├── Loader.tsx
    │   │   │   └── Tabs.tsx
    │   │   ├── layout/
    │   │   │   ├── Sidebar.tsx
    │   │   │   ├── DashboardHeader.tsx
    │   │   │   └── DashboardLayout.tsx
    │   │   ├── navigation/
    │   │   │   ├── index.ts
    │   │   │   └── Breadcrumb.tsx
    │   │   └── feedback/
    │   │       └── Toast.tsx
    │   │
    │   ├── hooks/
    │   │   ├── index.ts
    │   │   ├── useDebounce.ts
    │   │   ├── useFetch.ts
    │   │   ├── useLocalStorage.ts
    │   │   └── useMediaQuery.ts
    │   │
    │   └── utils/
    │       └── index.ts
    │
    ├── store/
    │   ├── index.ts
    │   ├── api/
    │   │   └── index.ts
    │   └── slices/
    │       ├── authSlice.ts
    │       ├── themeSlice.ts
    │       ├── uiSlice.ts
    │       ├── rideSlice.ts
    │       ├── walletSlice.ts
    │       ├── driverSlice.ts
    │       └── notificationSlice.ts
    │
    ├── providers/
    │   └── index.tsx
    │
    ├── services/
    │   ├── authService.ts
    │   └── index.ts
    │
    ├── locales/
    │   ├── fa/
    │   │   └── index.ts
    │   └── en/
    │       └── index.ts
    │
    ├── types/
    │   └── index.ts
    │
    ├── config/
    │   └── constants.ts
    │
    ├── lib/
    │   ├── i18n.ts
    │   ├── api-client.ts
    │   ├── mock-data.ts
    │   ├── utils.ts
    │   └── error-handler.ts
    │
    └── styles/
        └── globals.css
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
