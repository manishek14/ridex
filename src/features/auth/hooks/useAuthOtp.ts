// src/features/auth/hooks/useAuthOtp.ts
import { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "@/store";
import { setLoading, loginSuccess } from "@/store/slices/authSlice";
import { authService } from "@/services/authService";
import { useToast } from "@/shared/components/feedback/Toast";
import { useRouter } from "next/navigation";
import type { AuthTokens, User, UserRole } from "@/types";

// مپ ایمن نقش → سگمنت URL (از guest/superadmin محافظت می‌کنه)
const ROLE_ROUTE: Record<UserRole, string> = {
  guest:      "passenger",
  passenger:  "passenger",
  driver:     "driver",
  business:   "business",
  admin:      "admin",
  superadmin: "admin",
};

interface AuthResult {
  user: User;
  tokens: AuthTokens;
}

interface UseAuthOtpProps {
  locale: string;
  onSuccess?: (result: AuthResult) => void;
}

export function useAuthOtp({ locale, onSuccess }: UseAuthOtpProps) {
  const isFa = locale === "fa";
  const [phase, setPhase] = useState<"phone" | "otp">("phone");
  const [currentPhone, setCurrentPhone] = useState("");
  const [countdown, setCountdown] = useState(0);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => setCountdown((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const sendOtp = useCallback(async (phone: string) => {
    dispatch(setLoading(true));
    try {
      const { expiresIn } = await authService.sendOtp(phone);
      setCurrentPhone(phone);
      setPhase("otp");
      setCountdown(expiresIn || 120);
      toast.info(isFa ? `کد به ${phone} ارسال شد` : `Code sent to ${phone}`);
      return true;
    } catch {
      toast.error(isFa ? "خطا در ارسال کد" : "Failed to send code");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, isFa, toast]);

  const verifyOtp = useCallback(async (otp: string) => {
    dispatch(setLoading(true));
    try {
      const result = await authService.verifyOtp(currentPhone, otp);
      dispatch(loginSuccess(result));
      toast.success(isFa ? "ورود موفق!" : "Login successful!");

      if (onSuccess) {
        onSuccess(result);
      } else {
        const segment = ROLE_ROUTE[result.user.role] ?? "passenger";
        router.push(`/${locale}/${segment}/dashboard`);
      }
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : (isFa ? "کد اشتباه است" : "Invalid code");
      toast.error(msg);
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentPhone, dispatch, isFa, locale, onSuccess, router, toast]);

  const reset = useCallback(() => {
    setPhase("phone");
    setCountdown(0);
  }, []);

  return { phase, currentPhone, countdown, sendOtp, verifyOtp, reset, setPhase };
}
