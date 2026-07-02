// ── USER & AUTH ──────────────────────────────────────────────
export type UserRole = "guest" | "passenger" | "driver" | "business" | "admin" | "superadmin";

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ── RIDE ─────────────────────────────────────────────────────
export type RideType = "go" | "pool" | "premium" | "moto" | "send";
export type RideStatus =
  | "searching"
  | "found"
  | "arriving"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Location {
  lat: number;
  lng: number;
  address: string;
  name?: string;
}

export interface Ride {
  id: string;
  type: RideType;
  status: RideStatus;
  origin: Location;
  destination: Location;
  driver?: Driver;
  passenger: User;
  price: number;
  distance: number; // km
  duration: number; // minutes
  eta?: number; // minutes
  rating?: number;
  createdAt: string;
  completedAt?: string;
  cancelReason?: string;
}

// ── DRIVER ───────────────────────────────────────────────────
export type DriverStatus = "online" | "offline" | "busy";

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  plate: string;
  color: string;
}

export interface Driver {
  id: string;
  user: User;
  vehicle: Vehicle;
  status: DriverStatus;
  rating: number;
  totalRides: number;
  earnings: number;
  location?: Location;
}

// ── WALLET ───────────────────────────────────────────────────
export type TransactionType = "deposit" | "withdraw" | "ride_payment" | "ride_refund" | "promo";
export type TransactionStatus = "pending" | "completed" | "failed";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description: string;
  createdAt: string;
  referenceId?: string;
}

export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  currency: "IRR" | "IRT";
  transactions: Transaction[];
}

// ── BUSINESS ─────────────────────────────────────────────────
export interface Employee {
  id: string;
  user: User;
  department: string;
  monthlyLimit: number;
  usedAmount: number;
  isActive: boolean;
}

export interface BusinessAccount {
  id: string;
  companyName: string;
  adminUser: User;
  employees: Employee[];
  monthlyBudget: number;
  usedBudget: number;
  plan: "basic" | "pro" | "enterprise";
}

// ── ADMIN ────────────────────────────────────────────────────
export interface AdminStats {
  totalUsers: number;
  activeDrivers: number;
  todayRides: number;
  todayRevenue: number;
  userGrowth: number;
  driverGrowth: number;
  ridesGrowth: number;
  revenueGrowth: number;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}

// ── UI ───────────────────────────────────────────────────────
export type Theme = "dark" | "light" | "system";
export type Locale = "fa" | "en" | "ar";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  message?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export type SortDirection = "asc" | "desc";
