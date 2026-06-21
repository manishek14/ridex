// src/features/driver/components/DriverProfile.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Car, 
  Palette, 
  CreditCard,
  Save,
  Loader2,
  Edit,
  X,
  Shield,
  Star,
  MapPin
} from "lucide-react";
import { useAppSelector } from "@/store";
import { useDriver } from "@/features/driver/hooks/useDriver";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Badge } from "@/shared/components/ui/Badge";
import { useToast } from "@/shared/components/feedback/Toast";
import { z } from "zod";

const driverProfileSchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  email: z.string().email("ایمیل نامعتبر است"),
  phone: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل نامعتبر است"),
  vehicleMake: z.string().min(2, "برند خودرو را وارد کنید"),
  vehicleModel: z.string().min(2, "مدل خودرو را وارد کنید"),
  vehicleYear: z.string().regex(/^[0-9]{4}$/, "سال خودرو را به درستی وارد کنید"),
  vehiclePlate: z.string().min(2, "شماره پلاک را وارد کنید"),
  vehicleColor: z.string().min(2, "رنگ خودرو را وارد کنید"),
});

type DriverProfileFormData = z.infer<typeof driverProfileSchema>;

interface DriverProfileProps {
  locale?: string;
}

export function DriverProfile({ locale = "fa" }: DriverProfileProps) {
  const isFa = locale === "fa";
  const { driver, loading } = useDriver();
  const user = useAppSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DriverProfileFormData>({
    resolver: zodResolver(driverProfileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      vehicleMake: driver?.vehicle?.make || "",
      vehicleModel: driver?.vehicle?.model || "",
      vehicleYear: driver?.vehicle?.year?.toString() || "",
      vehiclePlate: driver?.vehicle?.plate || "",
      vehicleColor: driver?.vehicle?.color || "",
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-2 border-[var(--fg)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const onSubmit = async (data: DriverProfileFormData) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(isFa ? "پروفایل با موفقیت به‌روزرسانی شد!" : "Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(isFa ? "خطا در به‌روزرسانی پروفایل" : "Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto px-4 py-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-[var(--fg)]">
          {isFa ? "پروفایل راننده" : "Driver Profile"}
        </h1>
        <Button
          variant={isEditing ? "ghost" : "primary"}
          onClick={() => {
            if (isEditing) {
              reset();
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? (
            <>
              <X size={16} className="mr-1" />
              {isFa ? "انصراف" : "Cancel"}
            </>
          ) : (
            <>
              <Edit size={16} className="mr-1" />
              {isFa ? "ویرایش" : "Edit"}
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-yellow-400">
            <Star size={14} />
            <span className="text-sm font-bold text-[var(--fg)]">4.92</span>
          </div>
          <p className="text-[10px] text-[var(--fg4)]">{isFa ? "امتیاز" : "Rating"}</p>
        </div>
        <div className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-blue-400">
            <Car size={14} />
            <span className="text-sm font-bold text-[var(--fg)]">1,842</span>
          </div>
          <p className="text-[10px] text-[var(--fg4)]">{isFa ? "سفر" : "Rides"}</p>
        </div>
        <div className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-green-400">
            <CreditCard size={14} />
            <span className="text-sm font-bold text-[var(--fg)]">12.4M</span>
          </div>
          <p className="text-[10px] text-[var(--fg4)]">{isFa ? "درآمد" : "Earnings"}</p>
        </div>
        <div className="bg-[var(--glass)] border border-[var(--bdr)] rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 text-purple-400">
            <Shield size={14} />
            <span className="text-sm font-bold text-green-400">{isFa ? "تأیید شده" : "Verified"}</span>
          </div>
          <p className="text-[10px] text-[var(--fg4)]">{isFa ? "وضعیت" : "Status"}</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-[var(--bg2)] border border-[var(--bdr)] rounded-2xl p-4 sm:p-6">
        {/* Avatar & Basic Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-[var(--bdr)]">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl font-black text-white flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase() || "D"}
          </div>
          <div>
            <p className="text-lg font-bold text-[var(--fg)]">{user?.name || "راننده"}</p>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--fg3)]">
              <Badge variant="success" className="text-xs">
                {isFa ? "راننده" : "Driver"}
              </Badge>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                تهران
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label={isFa ? "نام کامل" : "Full Name"}
              placeholder={isFa ? "نام خود را وارد کنید" : "Enter your name"}
              leftIcon={<User size={14} />}
              error={errors.name?.message}
              disabled={!isEditing}
              {...register("name")}
            />
            <Input
              label={isFa ? "ایمیل" : "Email"}
              placeholder="you@example.com"
              leftIcon={<Mail size={14} />}
              error={errors.email?.message}
              disabled={!isEditing}
              {...register("email")}
            />
          </div>

          <Input
            label={isFa ? "شماره موبایل" : "Phone"}
            placeholder="09121234567"
            leftIcon={<Phone size={14} />}
            error={errors.phone?.message}
            disabled={!isEditing}
            {...register("phone")}
          />

          <div className="pt-4 border-t border-[var(--bdr)]">
            <h3 className="text-sm font-semibold text-[var(--fg3)] mb-4 flex items-center gap-2">
              <Car size={16} />
              {isFa ? "اطلاعات خودرو" : "Vehicle Information"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={isFa ? "برند" : "Make"}
                placeholder={isFa ? "مثلاً: تویوتا" : "e.g.: Toyota"}
                error={errors.vehicleMake?.message}
                disabled={!isEditing}
                {...register("vehicleMake")}
              />
              <Input
                label={isFa ? "مدل" : "Model"}
                placeholder={isFa ? "مثلاً: کمری" : "e.g.: Camry"}
                error={errors.vehicleModel?.message}
                disabled={!isEditing}
                {...register("vehicleModel")}
              />
              <Input
                label={isFa ? "سال" : "Year"}
                placeholder="1400"
                error={errors.vehicleYear?.message}
                disabled={!isEditing}
                {...register("vehicleYear")}
              />
              <Input
                label={isFa ? "رنگ" : "Color"}
                placeholder={isFa ? "مثلاً: سفید" : "e.g.: White"}
                leftIcon={<Palette size={14} />}
                error={errors.vehicleColor?.message}
                disabled={!isEditing}
                {...register("vehicleColor")}
              />
            </div>
            <Input
              label={isFa ? "شماره پلاک" : "Plate Number"}
              placeholder={isFa ? "۱۲۳-الف-۴۵" : "123-AB-45"}
              leftIcon={<CreditCard size={14} />}
              error={errors.vehiclePlate?.message}
              disabled={!isEditing}
              {...register("vehiclePlate")}
            />
          </div>

          {/* Save Button */}
          {isEditing && (
            <Button type="submit" className="w-full" size="lg" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  {isFa ? "در حال ذخیره..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  {isFa ? "ذخیره تغییرات" : "Save Changes"}
                </>
              )}
            </Button>
          )}
        </form>
      </div>
    </motion.div>
  );
}