import { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "@/store";
import { setLoading, loginSuccess } from "@/store/slices/authSlice";
import { authService } from "@/services/authService";
import { useToast } from "@/shared/components/feedback/Toast";
import { useRouter } from "next/navigation";

interface UseAuthOtpProps {
  locale: string;
  onSuccess?: (result: any) => void;
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
    let interval: NodeJS.Timeout;
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
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
    } catch (err: any) {
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
        router.push(`/${locale}/${result.user.role}/dashboard`);
      }
      return true;
    } catch (err: any) {
      toast.error(err instanceof Error ? err.message : isFa ? "کد اشتباه است" : "Invalid code");
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentPhone, dispatch, isFa, locale, onSuccess, router, toast]);

  const reset = useCallback(() => {
    setPhase("phone");
    setCountdown(0);
  }, []);

  return {
    phase,
    currentPhone,
    countdown,
    sendOtp,
    verifyOtp,
    reset,
    setPhase
  };
}
