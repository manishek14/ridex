// src/app/en/passenger/profile/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Camera, Mail, Phone, User, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { DashboardLayout } from "@/shared/components/layout/DashboardLayout";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Avatar, Badge } from "@/shared/components/ui/index";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateUser } from "@/store/slices/authSlice";
import { useToast } from "@/shared/components/feedback/Toast";

type Locale = "en" | "fa";

export default function ProfilePage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isFa = locale === "fa";
  
  const dispatch = useAppDispatch();
  const toast = useToast();
  const user = useAppSelector((s) => s.auth.user);
  const [isSaving, setIsSaving] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user?.name ?? "", email: user?.email ?? "" },
  });

  const onSave = async (data: { name: string; email: string }) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    dispatch(updateUser(data));
    toast.success(isFa ? "پروفایل بروز شد" : "Profile updated");
    setIsSaving(false);
  };

  if (!user) return null;

  return (
    <DashboardLayout locale={locale} pageTitle={isFa ? "پروفایل" : "Profile"}>
      <div className="max-w-lg" dir={isFa ? "rtl" : "ltr"}>
        {/* Avatar section */}
        <div className="flex items-center gap-4 mb-8 p-5 rounded-2xl bg-glass border border-bdr">
          <div className="relative">
            <Avatar name={user.name} size="xl" />
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-fg text-bg flex items-center justify-center border-2 border-bg2 hover:opacity-88 transition-opacity">
              <Camera size={12} />
            </button>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-fg" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {user.name}
            </h3>
            <p className="text-xs text-fg4 mt-0.5">{user.phone}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant={user.isVerified ? "green" : "yellow"} dot>
                {user.isVerified ? (isFa ? "تأیید‌شده" : "Verified") : (isFa ? "در انتظار تأیید" : "Pending")}
              </Badge>
              <Badge variant="blue">
                {isFa ? "مسافر" : "Passenger"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="p-5 rounded-2xl bg-glass border border-bdr space-y-4">
            <p className="text-xs font-bold text-fg3 tracking-wide" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "اطلاعات شخصی" : "PERSONAL INFO"}
            </p>
            <Input
              label={isFa ? "نام کامل" : "Full Name"}
              leftIcon={<User size={14} />}
              error={errors.name?.message}
              {...register("name", { required: isFa ? "نام الزامی است" : "Name required" })}
            />
            <Input
              label={isFa ? "ایمیل" : "Email"}
              type="email"
              leftIcon={<Mail size={14} />}
              error={errors.email?.message}
              {...register("email")}
            />
            <div>
              <label className="text-xs font-semibold text-fg3 tracking-wide block mb-1.5">
                {isFa ? "شماره موبایل" : "Phone"}
              </label>
              <div className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-[10px] bg-glass border border-bdr text-sm text-fg3">
                <Phone size={14} />
                <span>{user.phone}</span>
                <Badge variant="green" className="mr-auto text-[9px]">
                  {isFa ? "تأیید‌شده" : "Verified"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="p-5 rounded-2xl bg-glass border border-bdr">
            <p className="text-xs font-bold text-fg3 tracking-wide mb-4" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
              {isFa ? "امنیت" : "SECURITY"}
            </p>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2.5">
                <Shield size={15} className="text-fg4" />
                <span className="text-sm text-fg2" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                  {isFa ? "تغییر رمز عبور" : "Change Password"}
                </span>
              </div>
              <Button variant="ghost" size="sm">
                {isFa ? "تغییر" : "Change"}
              </Button>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" loading={isSaving}>
            {isFa ? "ذخیره تغییرات" : "Save Changes"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}