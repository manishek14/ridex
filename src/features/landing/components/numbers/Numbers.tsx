// src/features/landing/components/numbers/Numbers.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Car, Map, Building2 } from "lucide-react";

interface NumbersProps {
  locale?: string;
}

export function Numbers({ locale = "fa" }: NumbersProps) {
  const isFa = locale === "fa";
  const [counts, setCounts] = useState({ users: 0, drivers: 0, rides: 0, cities: 0 });
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const targets = { users: 50842, drivers: 14320, rides: 8741, cities: 27 };
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCounts({
        users: Math.floor(progress * targets.users),
        drivers: Math.floor(progress * targets.drivers),
        rides: Math.floor(progress * targets.rides),
        cities: Math.floor(progress * targets.cities),
      });
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [isVisible]);

  const items = isFa
    ? [
        { label: "کاربران فعال", value: counts.users, suffix: "+", Icon: Users,    accent: "from-blue-500/30 to-blue-500/0" },
        { label: "رانندگان",       value: counts.drivers, suffix: "+", Icon: Car,    accent: "from-emerald-500/30 to-emerald-500/0" },
        { label: "سفرهای روزانه",  value: counts.rides, suffix: "+", Icon: Map,    accent: "from-amber-500/30 to-amber-500/0" },
        { label: "شهرهای تحت پوشش", value: counts.cities, suffix: "", Icon: Building2, accent: "from-fuchsia-500/30 to-fuchsia-500/0" },
      ]
    : [
        { label: "Active Users", value: counts.users, suffix: "+", Icon: Users,    accent: "from-blue-500/30 to-blue-500/0" },
        { label: "Drivers",      value: counts.drivers, suffix: "+", Icon: Car,    accent: "from-emerald-500/30 to-emerald-500/0" },
        { label: "Daily Rides",  value: counts.rides, suffix: "+", Icon: Map,    accent: "from-amber-500/30 to-amber-500/0" },
        { label: "Cities Covered", value: counts.cities, suffix: "", Icon: Building2, accent: "from-fuchsia-500/30 to-fuchsia-500/0" },
      ];

  return (
    <section 
      ref={ref} 
      className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.Icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-bdr bg-bg2 p-5 sm:p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-bdr2 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)]"
            >
              {/* accent glow */}
              <div
                className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${item.accent} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-glass border border-bdr flex items-center justify-center text-fg2">
                  <Icon size={18} />
                </div>
                <span className="text-[10px] font-bold tracking-widest text-fg4 uppercase">
                  {isFa ? "زنده" : "Live"}
                </span>
              </div>
              <div
                className="relative text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-fg leading-none tracking-tight"
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {item.value.toLocaleString()}
                <span className="text-fg3 text-xl ms-0.5">{item.suffix}</span>
              </div>
              <p
                className="relative mt-2 text-xs sm:text-sm text-fg3"
                style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}