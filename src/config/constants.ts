// ── API BASE URL ─────────────────────────────────────────────
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.ridex.ir";

// ── SOCKET BASE URL ──────────────────────────────────────────
export const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "wss://socket.ridex.ir";

// ── AUTH ──────────────────────────────────────────────────────
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
  VERIFY_OTP: "/auth/verify-otp",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
};

// ── RIDES ─────────────────────────────────────────────────────
export const RIDE_ENDPOINTS = {
  CREATE: "/rides",
  LIST: "/rides",
  GET: (id: string) => `/rides/${id}`,
  CANCEL: (id: string) => `/rides/${id}/cancel`,
  COMPLETE: (id: string) => `/rides/${id}/complete`,
  UPDATE_STATUS: (id: string) => `/rides/${id}/status`,
};

// ── DRIVERS ───────────────────────────────────────────────────
export const DRIVER_ENDPOINTS = {
  LIST: "/drivers",
  GET: (id: string) => `/drivers/${id}`,
  STATS: "/drivers/stats",
  EARNINGS: "/drivers/earnings",
  VEHICLES: "/drivers/vehicles",
};

// ── PASSENGERS ────────────────────────────────────────────────
export const PASSENGER_ENDPOINTS = {
  PROFILE: "/passengers/profile",
  UPDATE_PROFILE: "/passengers/profile",
  RIDES: "/passengers/rides",
};

// ── PAYMENTS ──────────────────────────────────────────────────
export const PAYMENT_ENDPOINTS = {
  METHODS: "/payments/methods",
  ADD_METHOD: "/payments/methods",
  PROCESS: "/payments/process",
  HISTORY: "/payments/history",
};

// ── ADMIN ─────────────────────────────────────────────────────
export const ADMIN_ENDPOINTS = {
  USERS: "/admin/users",
  DRIVERS: "/admin/drivers",
  RIDES: "/admin/rides",
  PAYMENTS: "/admin/payments",
  REPORTS: "/admin/reports",
  SETTINGS: "/admin/settings",
};

// ── CACHE TTL (in seconds) ────────────────────────────────────
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
};

// ── RETRY CONFIG ──────────────────────────────────────────────
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  INITIAL_DELAY: 1000, // ms
  MAX_DELAY: 10000, // ms
};

// ── PAGINATION ────────────────────────────────────────────────
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// ── NESHAN MAP CONFIG ────────────────────────────────────────
export const NESHAN_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_NESHAN_API_KEY || "service.10aa36fa06eb446ba50e01486248c8b9",
  MAP_ID: "neshan-map",
  DEFAULT_CENTER: { lat: 35.6997, lng: 51.3380 }, // Tehran (Azadi Sq)
  DEFAULT_ZOOM: 14,
};
