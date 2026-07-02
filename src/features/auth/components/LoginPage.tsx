"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
      const roleMap: Record<string, string> = { guest: "passenger", passenger: "passenger", driver: "driver", business: "business", admin: "admin", superadmin: "admin" };
      router.push(`/${locale}/${roleMap[result.user.role] ?? "passenger"}/dashboard`);
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
      className="min-h-screen flex items-center justify-center px-4 bg-bg relative overflow-hidden"
      dir={isFa ? "rtl" : "ltr"}
    >
      {/* Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--fg) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      
      {/* Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[440px] z-10"
      >
        <div className="bg-bg2/80 backdrop-blur-xl border border-bdr2 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <Link href={`/${locale}`} className="flex items-center gap-2 mb-8 no-underline w-fit group">
            <div className="w-9 h-9 rounded-xl bg-fg flex items-center justify-center text-sm font-black text-bg transition-transform group-hover:scale-110">R</div>
            <span className="text-xl font-extrabold text-fg tracking-tight">RideX</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-fg mb-2" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "خوش برگشتی" : "Welcome back"}
            </h1>
            <p className="text-[15px] text-fg3" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "به حساب RideX خود وارد شو" : "Sign in to your RideX account"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 rounded-2xl bg-glass border border-bdr mb-8">
            {(["phone", "email"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); resetOtp(); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                  tab === t ? "bg-fg text-bg shadow-lg" : "text-fg3 hover:text-fg hover:bg-glass2"
                }`}
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {t === "phone" ? <Phone size={14} /> : <Mail size={14} />}
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
                className="space-y-5"
              >
                <Input
                  label={isFa ? "ایمیل" : "Email"}
                  type="email"
                  placeholder="you@example.com"
                  leftIcon={<Mail size={16} />}
                  error={emailForm.formState.errors.email?.message}
                  {...emailForm.register("email")}
                />
                <div className="space-y-1.5">
                  <Input
                    label={isFa ? "رمز عبور" : "Password"}
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    leftIcon={<Lock size={16} />}
                    rightIcon={
                      <button type="button" onClick={() => setShowPass(!showPass)} className="hover:text-fg transition-colors">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                    error={emailForm.formState.errors.password?.message}
                    {...emailForm.register("password")}
                  />
                  <div className="flex justify-end">
                    <Link href={`/${locale}/forgot-password`} className="text-xs text-fg3 hover:text-fg no-underline transition-colors">
                      {isFa ? "رمز عبور را فراموش کردم" : "Forgot password?"}
                    </Link>
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full h-12 text-base font-bold" loading={emailForm.formState.isSubmitting}>
                  {isFa ? "ورود" : "Login"}
                </Button>
              </motion.form>
            ) : (
              <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <AnimatePresence mode="wait">
                  {phase === "phone" ? (
                    <motion.form key="p-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-5">
                      <Input
                        label={isFa ? "شماره موبایل" : "Phone Number"}
                        type="tel"
                        placeholder="09121234567"
                        leftIcon={<Phone size={16} />}
                        error={phoneForm.formState.errors.phone?.message}
                        {...phoneForm.register("phone")}
                      />
                      <Button type="submit" size="lg" className="w-full h-12 text-base font-bold" loading={phoneForm.formState.isSubmitting}>
                        {isFa ? "ارسال کد تأیید" : "Send Verification Code"}
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.form key="o-f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-5">
                      <div className="text-center mb-2">
                        <p className="text-sm text-fg3">{isFa ? `کد به ${currentPhone} ارسال شد` : `Code sent to ${currentPhone}`}</p>
                      </div>
                      <Input
                        label={isFa ? "کد تأیید" : "Verification Code"}
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        className="text-center tracking-[12px] text-xl font-black h-14"
                        error={otpForm.formState.errors.otp?.message}
                        {...otpForm.register("otp")}
                      />
                      <div className="text-center">
                        {countdown > 0 ? (
                          <p className="text-xs text-fg4">{isFa ? `ارسال مجدد: ${countdown} ثانیه` : `Resend in: ${countdown}s`}</p>
                        ) : (
                          <button type="button" onClick={() => phoneForm.handleSubmit(onPhoneSubmit)()} className="text-xs text-fg2 font-bold underline hover:text-fg transition-colors">
                            {isFa ? "ارسال مجدد کد" : "Resend code"}
                          </button>
                        )}
                      </div>
                      <Button type="submit" size="lg" className="w-full h-12 text-base font-bold" loading={otpForm.formState.isSubmitting}>
                        {isFa ? "تأیید و ورود" : "Verify & Login"}
                      </Button>
                      <button type="button" onClick={() => setPhase("phone")} className="w-full text-xs text-fg4 hover:text-fg3 transition-colors">
                        {isFa ? "← ویرایش شماره" : "← Change number"}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-bdr text-center">
            <p className="text-sm text-fg4">
              {isFa ? "حساب نداری؟" : "No account?"}{" "}
              <Link href={`/${locale}/register`} className="text-fg font-bold hover:underline no-underline transition-colors">
                {isFa ? "ثبت‌نام کن" : "Register"}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
