// src/features/landing/components/numbers/Numbers.tsx
"use client";

import { useEffect, useRef, useState } from "react";

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
        { label: "کاربران فعال", value: counts.users, suffix: "+" },
        { label: "رانندگان", value: counts.drivers, suffix: "+" },
        { label: "سفرهای روزانه", value: counts.rides, suffix: "+" },
        { label: "شهرهای تحت پوشش", value: counts.cities, suffix: "" },
      ]
    : [
        { label: "Active Users", value: counts.users, suffix: "+" },
        { label: "Drivers", value: counts.drivers, suffix: "+" },
        { label: "Daily Rides", value: counts.rides, suffix: "+" },
        { label: "Cities Covered", value: counts.cities, suffix: "" },
      ];

  return (
    <section 
      ref={ref} 
      className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4 text-center">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8"
          >
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-[var(--fg)] leading-tight">
              {item.value.toLocaleString()}{item.suffix}
            </div>
            <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-[var(--fg3)]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}