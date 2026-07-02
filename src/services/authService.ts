import type { User, AuthTokens } from "@/types";
import { mockCurrentUser } from "@/lib/mock-data";

// Simulate API delay
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ── AUTH SERVICE ─────────────────────────────────────────────
export const authService = {
  async loginWithEmail(
    email: string,
    password: string
  ): Promise<{ user: User; tokens: AuthTokens }> {
    await delay(1200);
    // Mock validation
    if (password.length < 8) throw new Error("رمز عبور اشتباه است");
    const tokens: AuthTokens = {
      accessToken: `mock_access_${Date.now()}`,
      refreshToken: `mock_refresh_${Date.now()}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    return { user: { ...mockCurrentUser, email }, tokens };
  },

  async sendOtp(phone: string): Promise<{ success: boolean; expiresIn: number }> {
    await delay(1000);
    console.log(`[DEV] OTP for ${phone}: 123456`);
    return { success: true, expiresIn: 120 };
  },

  async verifyOtp(
    phone: string,
    otp: string
  ): Promise<{ user: User; tokens: AuthTokens }> {
    await delay(1000);
    if (otp !== "123456") throw new Error("کد وارد شده اشتباه است");
    const tokens: AuthTokens = {
      accessToken: `mock_access_${Date.now()}`,
      refreshToken: `mock_refresh_${Date.now()}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    return { user: { ...mockCurrentUser, phone }, tokens };
  },

  async register(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<{ user: User; tokens: AuthTokens }> {
    await delay(1500);
    const user: User = {
      id: `u_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "passenger",
      isVerified: false,
      createdAt: new Date().toISOString(),
    };
    const tokens: AuthTokens = {
      accessToken: `mock_access_${Date.now()}`,
      refreshToken: `mock_refresh_${Date.now()}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    return { user, tokens };
  },

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    await delay(500);
    return {
      accessToken: `mock_access_${Date.now()}`,
      refreshToken: `mock_refresh_${Date.now()}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
  },
};
