import type {
  User, Driver, Ride, Transaction, Wallet,
  Employee, AdminStats, SupportTicket
} from "@/types";

// ── USERS ────────────────────────────────────────────────────
export const mockUsers: User[] = [
  {
    id: "u1", name: "علی محمدی", phone: "09121234567",
    email: "ali@example.com", role: "passenger",
    isVerified: true, createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "u2", name: "سارا احمدی", phone: "09351234567",
    email: "sara@example.com", role: "driver",
    isVerified: true, createdAt: "2026-02-20T08:00:00Z",
  },
  {
    id: "u3", name: "رضا کریمی", phone: "09011234567",
    email: "reza@example.com", role: "passenger",
    isVerified: true, createdAt: "2026-03-05T12:00:00Z",
  },
  {
    id: "u4", name: "مریم حسینی", phone: "09171234567",
    role: "passenger", isVerified: false, createdAt: "2026-04-10T09:00:00Z",
  },
  {
    id: "u5", name: "احمد رضایی", phone: "09301234567",
    email: "ahmad@example.com", role: "driver",
    isVerified: true, createdAt: "2026-01-28T14:00:00Z",
  },
];

export const mockCurrentUser: User = {
  id: "u1",
  name: "علی محمدی",
  phone: "09121234567",
  email: "ali@example.com",
  role: "passenger",
  isVerified: true,
  createdAt: "2026-01-15T10:00:00Z",
};

// ── DRIVERS ──────────────────────────────────────────────────
export const mockDrivers: Driver[] = [
  {
    id: "d1",
    user: mockUsers[1],
    vehicle: { make: "Toyota", model: "Camry", year: 2020, plate: "۱۲۳-الف-۴۵", color: "سفید" },
    status: "online",
    rating: 4.92,
    totalRides: 1842,
    earnings: 12450000,
    location: { lat: 35.6892, lng: 51.3890, address: "تهران، میدان ونک" },
  },
  {
    id: "d2",
    user: mockUsers[4],
    vehicle: { make: "Peugeot", model: "207", year: 2019, plate: "۴۵۶-ب-۷۸", color: "نقره‌ای" },
    status: "busy",
    rating: 4.78,
    totalRides: 987,
    earnings: 7320000,
    location: { lat: 35.7000, lng: 51.4010, address: "تهران، سعادت‌آباد" },
  },
];

// ── RIDES ────────────────────────────────────────────────────
export const mockRides: Ride[] = [
  {
    id: "r1",
    type: "go",
    status: "completed",
    origin: { lat: 35.6892, lng: 51.3890, address: "میدان ونک، تهران" },
    destination: { lat: 35.7200, lng: 51.3350, address: "صادقیه، تهران" },
    driver: mockDrivers[0],
    passenger: mockCurrentUser,
    price: 85000,
    distance: 8.4,
    duration: 22,
    rating: 5,
    createdAt: "2026-06-10T08:30:00Z",
    completedAt: "2026-06-10T08:52:00Z",
  },
  {
    id: "r2",
    type: "premium",
    status: "completed",
    origin: { lat: 35.7140, lng: 51.4050, address: "شریعتی، تهران" },
    destination: { lat: 35.6900, lng: 51.3800, address: "بهشتی، تهران" },
    driver: mockDrivers[1],
    passenger: mockCurrentUser,
    price: 145000,
    distance: 5.2,
    duration: 18,
    rating: 4,
    createdAt: "2026-06-08T14:00:00Z",
    completedAt: "2026-06-08T14:18:00Z",
  },
  {
    id: "r3",
    type: "pool",
    status: "cancelled",
    origin: { lat: 35.6800, lng: 51.4200, address: "تجریش، تهران" },
    destination: { lat: 35.7100, lng: 51.3900, address: "مرزداران، تهران" },
    passenger: mockCurrentUser,
    price: 45000,
    distance: 12.1,
    duration: 35,
    createdAt: "2026-06-05T11:00:00Z",
    cancelReason: "راننده‌ای پیدا نشد",
  },
  {
    id: "r4",
    type: "go",
    status: "completed",
    origin: { lat: 35.7040, lng: 51.3980, address: "پونک، تهران" },
    destination: { lat: 35.6750, lng: 51.4100, address: "جردن، تهران" },
    driver: mockDrivers[0],
    passenger: mockCurrentUser,
    price: 62000,
    distance: 6.7,
    duration: 19,
    rating: 5,
    createdAt: "2026-06-01T09:15:00Z",
    completedAt: "2026-06-01T09:34:00Z",
  },
];

// ── TRANSACTIONS ─────────────────────────────────────────────
export const mockTransactions: Transaction[] = [
  {
    id: "t1", type: "deposit", amount: 500000, status: "completed",
    description: "شارژ کیف پول از درگاه", createdAt: "2026-06-12T10:00:00Z",
  },
  {
    id: "t2", type: "ride_payment", amount: -85000, status: "completed",
    description: "پرداخت سفر r1", createdAt: "2026-06-10T08:52:00Z", referenceId: "r1",
  },
  {
    id: "t3", type: "ride_payment", amount: -145000, status: "completed",
    description: "پرداخت سفر r2", createdAt: "2026-06-08T14:18:00Z", referenceId: "r2",
  },
  {
    id: "t4", type: "promo", amount: 25000, status: "completed",
    description: "تخفیف کد معرفی دوستان", createdAt: "2026-06-07T16:00:00Z",
  },
  {
    id: "t5", type: "deposit", amount: 1000000, status: "completed",
    description: "شارژ کیف پول از درگاه", createdAt: "2026-06-01T11:00:00Z",
  },
  {
    id: "t6", type: "ride_payment", amount: -62000, status: "completed",
    description: "پرداخت سفر r4", createdAt: "2026-06-01T09:34:00Z", referenceId: "r4",
  },
];

export const mockWallet: Wallet = {
  id: "w1",
  userId: "u1",
  balance: 1233000,
  currency: "IRT",
  transactions: mockTransactions,
};

// ── EMPLOYEES ────────────────────────────────────────────────
export const mockEmployees: Employee[] = [
  {
    id: "e1",
    user: mockUsers[0],
    department: "مهندسی",
    monthlyLimit: 2000000,
    usedAmount: 850000,
    isActive: true,
  },
  {
    id: "e2",
    user: mockUsers[2],
    department: "بازاریابی",
    monthlyLimit: 1500000,
    usedAmount: 1200000,
    isActive: true,
  },
  {
    id: "e3",
    user: mockUsers[3],
    department: "منابع انسانی",
    monthlyLimit: 1000000,
    usedAmount: 320000,
    isActive: true,
  },
];

// ── ADMIN STATS ──────────────────────────────────────────────
export const mockAdminStats: AdminStats = {
  totalUsers: 50842,
  activeDrivers: 14320,
  todayRides: 8741,
  todayRevenue: 1284500000,
  userGrowth: 12.4,
  driverGrowth: 8.1,
  ridesGrowth: 15.6,
  revenueGrowth: 18.2,
};

// ── SUPPORT TICKETS ──────────────────────────────────────────
export const mockTickets: SupportTicket[] = [
  {
    id: "tk1",
    userId: "u1",
    subject: "مشکل در پرداخت سفر",
    message: "هزینه سفر دو بار از کیف پولم کسر شده",
    status: "open",
    priority: "high",
    createdAt: "2026-06-15T10:00:00Z",
    updatedAt: "2026-06-15T10:00:00Z",
  },
  {
    id: "tk2",
    userId: "u3",
    subject: "راننده مسیر اشتباه رفت",
    message: "راننده از مسیر کوتاه‌تر نرفت و هزینه بیشتری گرفته شد",
    status: "in_progress",
    priority: "medium",
    createdAt: "2026-06-14T14:30:00Z",
    updatedAt: "2026-06-15T09:00:00Z",
  },
  {
    id: "tk3",
    userId: "u4",
    subject: "بازگشت وجه",
    message: "سفرم لغو شد ولی وجه برگشت داده نشد",
    status: "resolved",
    priority: "medium",
    createdAt: "2026-06-12T16:00:00Z",
    updatedAt: "2026-06-13T11:00:00Z",
  },
];

// ── CHART DATA ───────────────────────────────────────────────
export const mockRevenueChart = [
  { month: "فروردین", revenue: 840000000, rides: 5200 },
  { month: "اردیبهشت", revenue: 920000000, rides: 5800 },
  { month: "خرداد", revenue: 1050000000, rides: 6400 },
  { month: "تیر", revenue: 1100000000, rides: 6900 },
  { month: "مرداد", revenue: 980000000, rides: 6100 },
  { month: "شهریور", revenue: 1280000000, rides: 7800 },
];

export const mockDriverEarnings = [
  { week: "هفته ۱", earnings: 1840000 },
  { week: "هفته ۲", earnings: 2100000 },
  { week: "هفته ۳", earnings: 1950000 },
  { week: "هفته ۴", earnings: 2380000 },
];
