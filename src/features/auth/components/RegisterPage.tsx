"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Phone, Lock, User } from "lucide-react";
import { motion } from "motion/react";
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
      className="min-h-screen flex items-center justify-center px-4 py-12 bg-bg relative overflow-hidden"
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
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[460px] z-10"
      >
        <div className="bg-bg2/80 backdrop-blur-xl border border-bdr2 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 mb-8 no-underline w-fit group">
            <div className="w-9 h-9 rounded-xl bg-fg flex items-center justify-center text-sm font-black text-bg transition-transform group-hover:scale-110">R</div>
            <span className="text-xl font-extrabold text-fg tracking-tight">RideX</span>
          </Link>

          <div className="mb-8">
            <h1
              className="text-2xl sm:text-3xl font-black text-fg mb-2"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "ساخت حساب جدید" : "Create your account"}
            </h1>
            <p
              className="text-[15px] text-fg3"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "اولین سفرت رو با ۳۰٪ تخفیف تجربه کن" : "Experience your first ride with 30% off"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-5">
              <Input
                label={isFa ? "نام کامل" : "Full Name"}
                placeholder={isFa ? "علی محمدی" : "John Doe"}
                leftIcon={<User size={16} />}
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label={isFa ? "ایمیل" : "Email"}
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail size={16} />}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                label={isFa ? "شماره موبایل" : "Phone"}
                type="tel"
                placeholder="09121234567"
                leftIcon={<Phone size={16} />}
                error={errors.phone?.message}
                {...register("phone")}
              />
              <Input
                label={isFa ? "رمز عبور" : "Password"}
                type={showPass ? "text" : "password"}
                placeholder={isFa ? "حداقل ۸ کاراکتر" : "At least 8 characters"}
                leftIcon={<Lock size={16} />}
                rightIcon={
                  <button type="button" onClick={() => setShowPass(!showPass)} className="hover:text-fg transition-colors">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
                error={errors.password?.message}
                {...register("password")}
              />
              <Input
                label={isFa ? "تکرار رمز عبور" : "Confirm Password"}
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock size={16} />}
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
              />
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer p-1">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-bdr accent-fg cursor-pointer"
                {...register("agreeTerms")}
              />
              <span
                className="text-xs text-fg3 leading-[1.6]"
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {isFa ? "با " : "I agree to "}
                <Link href="#" className="text-fg2 font-bold underline hover:text-fg transition-colors">
                  {isFa ? "شرایط استفاده" : "Terms of Service"}
                </Link>
                {isFa ? " و " : " and "}
                <Link href="#" className="text-fg2 font-bold underline hover:text-fg transition-colors">
                  {isFa ? "حریم خصوصی" : "Privacy Policy"}
                </Link>
                {isFa ? " RideX موافقم." : " of RideX."}
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-xs text-red-400 font-medium">{errors.agreeTerms.message}</p>
            )}

            <Button type="submit" size="lg" className="w-full h-12 text-base font-bold mt-2" loading={isSubmitting}>
              {isFa ? "ساخت حساب" : "Create Account"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-bdr text-center">
            <p
              className="text-sm text-fg4"
              style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
            >
              {isFa ? "حساب داری؟" : "Have an account?"}{" "}
              <Link
                href={`/${locale}/login`}
                className="text-fg font-bold hover:underline no-underline transition-colors"
              >
                {isFa ? "وارد شو" : "Login"}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
