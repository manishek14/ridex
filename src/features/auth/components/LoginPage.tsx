"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch } from "@/store";
import { loginSuccess, setLoading } from "@/store/slices/authSlice";
import { authService } from "@/services/authService";
import { emailLoginSchema, phoneLoginSchema, otpSchema } from "@/features/auth/schemas";
import type { EmailLoginFormData, PhoneLoginFormData, OtpFormData } from "@/features/auth/schemas";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useToast } from "@/shared/components/feedback/Toast";
import { useAuthOtp } from "../hooks/useAuthOtp";

type Tab = "email" | "phone";

export function LoginPage({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";
  const [tab, setTab] = useState<Tab>("phone");
  const [showPass, setShowPass] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  const {
    phase,
    currentPhone,
    countdown,
    sendOtp,
    verifyOtp,
    setPhase,
    reset: resetOtp
  } = useAuthOtp({ locale });

  // ── FORMS ──────────────────────────────────────────────────
  const emailForm = useForm<EmailLoginFormData>({
    resolver: zodResolver(emailLoginSchema),
  });

  const phoneForm = useForm<PhoneLoginFormData>({
    resolver: zodResolver(phoneLoginSchema),
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  // ── HANDLERS ───────────────────────────────────────────────
  const onEmailSubmit = async (data: EmailLoginFormData) => {
    dispatch(setLoading(true));
    try {
      const result = await authService.loginWithEmail(data.email, data.password);
      dispatch(loginSuccess(result));
      toast.success(isFa ? "ورود موفق!" : "Login successful!");
      router.push(`/${locale}/${result.user.role}/dashboard`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : isFa ? "خطا در ورود" : "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onPhoneSubmit = async (data: PhoneLoginFormData) => {
    await sendOtp(data.phone);
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    await verifyOtp(data.otp);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg)]"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, var(--bdr2) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[400px]"
      >
        <div className="bg-[var(--bg2)] border border-[var(--bdr)] rounded-2xl p-8">
          <Link href={`/${locale}`} className="flex items-center gap-2 mb-8 no-underline w-fit">
            <div className="w-8 h-8 rounded-xl bg-[var(--fg)] flex items-center justify-center text-sm font-black text-[var(--bg)]">R</div>
            <span className="text-lg font-extrabold text-[var(--fg)] tracking-tight">RideX</span>
          </Link>

          <h1 className="text-2xl font-black text-[var(--fg)] mb-1" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "خوش برگشتی" : "Welcome back"}
          </h1>
          <p className="text-sm text-[var(--fg3)] mb-6" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "به حساب RideX خود وارد شو" : "Sign in to your RideX account"}
          </p>

          {/* Tab Switcher */}
          <div className="flex p-1 rounded-xl bg-[var(--glass)] border border-[var(--bdr)] mb-6">
            {(["phone", "email"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); resetOtp(); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  tab === t ? "bg-[var(--fg)] text-[var(--bg)]" : "text-[var(--fg3)] hover:text-[var(--fg)]"
                }`}
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {t === "phone" ? <Phone size={12} /> : <Mail size={12} />}
                {t === "phone" ? (isFa ? "موبایل" : "Phone") : (isFa ? "ایمیل" : "Email")}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === "email" ? (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                className="space-y-4"
              >
                <Input
                  label={isFa ? "ایمیل" : "Email"}
                  type="email"
                  placeholder="you@example.com"
                  leftIcon={<Mail size={14} />}
                  error={emailForm.formState.errors.email?.message}
                  {...emailForm.register("email")}
                />
                <Input
                  label={isFa ? "رمز عبور" : "Password"}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  leftIcon={<Lock size={14} />}
                  rightIcon={
                    <button type="button" onClick={() => setShowPass(!showPass)}>
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  }
                  error={emailForm.formState.errors.password?.message}
                  {...emailForm.register("password")}
                />
                <div className="flex justify-end">
                  <Link href={`/${locale}/forgot-password`} className="text-xs text-[var(--fg3)] hover:text-[var(--fg)] no-underline">
                    {isFa ? "رمز عبور را فراموش کردم" : "Forgot password?"}
                  </Link>
                </div>
                <Button type="submit" className="w-full" loading={emailForm.formState.isSubmitting}>
                  {isFa ? "ورود" : "Login"}
                </Button>
              </motion.form>
            ) : (
              <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <AnimatePresence mode="wait">
                  {phase === "phone" ? (
                    <motion.form key="p-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                      <Input
                        label={isFa ? "شماره موبایل" : "Phone Number"}
                        type="tel"
                        placeholder="09121234567"
                        leftIcon={<Phone size={14} />}
                        error={phoneForm.formState.errors.phone?.message}
                        {...phoneForm.register("phone")}
                      />
                      <Button type="submit" className="w-full" loading={phoneForm.formState.isSubmitting}>
                        {isFa ? "ارسال کد تأیید" : "Send Verification Code"}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.form key="o-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
                      <p className="text-xs text-[var(--fg3)] mb-2">{isFa ? `کد به ${currentPhone} ارسال شد` : `Code sent to ${currentPhone}`}</p>
                      <Input
                        label={isFa ? "کد تأیید" : "Verification Code"}
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        className="text-center tracking-[8px] text-lg font-bold"
                        error={otpForm.formState.errors.otp?.message}
                        {...otpForm.register("otp")}
                      />
                      <div className="text-center">
                        {countdown > 0 ? (
                          <p className="text-xs text-[var(--fg4)]">{isFa ? `ارسال مجدد: ${countdown} ثانیه` : `Resend in: ${countdown}s`}</p>
                        ) : (
                          <button type="button" onClick={() => phoneForm.handleSubmit(onPhoneSubmit)()} className="text-xs text-[var(--fg2)] underline hover:text-[var(--fg)] transition-colors">
                            {isFa ? "ارسال مجدد کد" : "Resend code"}
                          </button>
                        )}
                      </div>
                      <Button type="submit" className="w-full" loading={otpForm.formState.isSubmitting}>
                        {isFa ? "تأیید و ورود" : "Verify & Login"}
                      </Button>
                      <button type="button" onClick={() => setPhase("phone")} className="w-full text-xs text-[var(--fg4)] hover:text-[var(--fg3)]">
                        {isFa ? "← ویرایش شماره" : "← Change number"}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-xs text-[var(--fg4)] mt-6">
            {isFa ? "حساب نداری؟" : "No account?"}{" "}
            <Link href={`/${locale}/register`} className="text-[var(--fg2)] font-semibold hover:text-[var(--fg)] no-underline transition-colors">
              {isFa ? "ثبت‌نام کن" : "Register"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
