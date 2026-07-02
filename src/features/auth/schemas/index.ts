import { z } from "zod";

export const emailLoginSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

export const phoneLoginSchema = z.object({
  phone: z
    .string()
    .regex(/^09[0-9]{9}$/, "شماره موبایل نامعتبر است"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "کد تأیید باید ۶ رقم باشد")
    .regex(/^[0-9]+$/, "فقط اعداد مجاز است"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
    email: z.string().email("ایمیل نامعتبر است"),
    phone: z.string().regex(/^09[0-9]{9}$/, "شماره موبایل نامعتبر است"),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine((v) => v === true, "پذیرش شرایط الزامی است"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

export type EmailLoginFormData = z.infer<typeof emailLoginSchema>;
export type PhoneLoginFormData = z.infer<typeof phoneLoginSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
