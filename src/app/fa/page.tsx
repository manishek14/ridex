import type { Metadata } from "next";
import { Navbar } from "@/features/landing/components/navbar/Navbar";
import { Hero } from "@/features/landing/components/hero/Hero";
import { Ticker } from "@/features/landing/components/ticker/Ticker";
import { Numbers } from "@/features/landing/components/numbers/Numbers";
import { Services } from "@/features/landing/components/services/Services";
import { AiShowcase } from "@/features/landing/components/ai-showcase/AiShowcase";
import { BentoFeatures } from "@/features/landing/components/bento-features/BentoFeatures";
import { Pricing } from "@/features/landing/components/pricing/Pricing";
import { Cta, Footer } from "@/features/landing/components/cta/CtaFooter";

export const metadata: Metadata = {
  title: "RideX — حمل‌ونقل هوشمند",
  description: "رزرو سفر در چند ثانیه، راننده تأیید‌شده، قیمت شفاف",
};

export default function LandingPage() {
  const locale = "fa";

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <Ticker locale={locale} />
        <Numbers locale={locale} />
        <Services locale={locale} />
        <AiShowcase locale={locale} />
        <BentoFeatures locale={locale} />
        <Pricing locale={locale} />
        <Cta locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
