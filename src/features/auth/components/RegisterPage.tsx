"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/store";
import { loginSuccess, setLoading } from "@/store/slices/authSlice";
import { authService } from "@/services/authService";
import { registerSchema } from "@/features/auth/schemas";
import type { RegisterFormData } from "@/features/auth/schemas";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useToast } from "@/shared/components/feedback/Toast";

export function RegisterPage({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";
  const [showPass, setShowPass] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    dispatch(setLoading(true));
    try {
      const result = await authService.register(data);
      dispatch(loginSuccess(result));
      toast.success(isFa ? "ثبت‌نام موفق! خوش آمدی 🎉" : "Registration successful! Welcome 🎉");
      router.push(`/${locale}/passenger/dashboard`);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : isFa ? "خطا در ثبت‌نام" : "Registration failed");
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 bg-[var(--bg)]"
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
        className="relative w-full max-w-[420px]"
      >
        <div className="bg-[var(--bg2)] border border-[var(--bdr)] rounded-2xl p-8">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 mb-8 no-underline w-fit">
            <div className="w-8 h-8 rounded-xl bg-[var(--fg)] flex items-center justify-center text-sm font-black text-[var(--bg)]">R</div>
            <span className="text-lg font-extrabold text-[var(--fg)] tracking-tight">RideX</span>
          </Link>

          <h1
            className="text-2xl font-black text-[var(--fg)] mb-1"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "ساخت حساب جدید" : "Create your account"}
          </h1>
          <p
            className="text-sm text-[var(--fg3)] mb-6"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "اولین سفرت رو با ۳۰٪ تخفیف تجربه کن" : "Experience your first ride with 30% off"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={isFa ? "نام کامل" : "Full Name"}
              placeholder={isFa ? "علی محمدی" : "John Doe"}
              leftIcon={<User size={14} />}
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label={isFa ? "ایمیل" : "Email"}
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail size={14} />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label={isFa ? "شماره موبایل" : "Phone"}
              type="tel"
              placeholder="09121234567"
              leftIcon={<Phone size={14} />}
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              label={isFa ? "رمز عبور" : "Password"}
              type={showPass ? "text" : "password"}
              placeholder="حداقل ۸ کاراکتر"
              leftIcon={<Lock size={14} />}
              rightIcon={
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label={isFa ? "تکرار رمز عبور" : "Confirm Password"}
              type="password"
              placeholder="••••••••"
              leftIcon={<Lock size={14} />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            {/* Terms */}
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="mt-0.5 accent-[var(--fg)]"
                {...register("agreeTerms")}
              />
              <span
                className="text-xs text-[var(--fg3)] leading-[1.5]"
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {isFa ? "با " : "I agree to "}
                <Link href="#" className="text-[var(--fg2)] underline no-underline hover:text-[var(--fg)]">
                  {isFa ? "شرایط استفاده" : "Terms of Service"}
                </Link>
                {isFa ? " و " : " and "}
                <Link href="#" className="text-[var(--fg2)] underline no-underline hover:text-[var(--fg)]">
                  {isFa ? "حریم خصوصی" : "Privacy Policy"}
                </Link>
                {isFa ? " موافقم" : ""}
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-xs text-red-400">{errors.agreeTerms.message}</p>
            )}

            <Button type="submit" className="w-full" size="lg" loading={isSubmitting}>
              {isFa ? "ساخت حساب" : "Create Account"}
            </Button>
          </form>

          <p
            className="text-center text-xs text-[var(--fg4)] mt-5"
            style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
          >
            {isFa ? "حساب داری؟" : "Have an account?"}{" "}
            <Link
              href={`/${locale}/login`}
              className="text-[var(--fg2)] font-semibold hover:text-[var(--fg)] no-underline transition-colors"
            >
              {isFa ? "وارد شو" : "Login"}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
