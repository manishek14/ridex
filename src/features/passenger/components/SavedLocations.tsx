"use client";

import { motion } from "framer-motion";
import { Home, Briefcase, Heart, Plus, MapPin, MoreVertical } from "lucide-react";

const locations = [
  { id: "1", type: "home", title: { fa: "خانه", en: "Home" }, address: { fa: "تهران، خیابان آزادی، کوچه گل‌ها", en: "Azadi St, Golha Alley, Tehran" } },
  { id: "2", type: "work", title: { fa: "محل کار", en: "Work" }, address: { fa: "سعادت آباد، میدان کاج، برج تجاری", en: "Kaj Sq, Commercial Tower, Saadat Abad" } },
  { id: "3", type: "favorite", title: { fa: "باشگاه", en: "Gym" }, address: { fa: "پاسداران، بوستان دوم، پلاک ۱۰", en: "Pasdaran, 2nd Boostan, No 10" } },
];

export function SavedLocations({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";

  const getIcon = (type: string) => {
    switch (type) {
      case "home": return <Home size={18} />;
      case "work": return <Briefcase size={18} />;
      default: return <Heart size={18} />;
    }
  };

  return (
    <div className="space-y-6" dir={isFa ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
          {isFa ? "مکان‌های منتخب" : "Saved Locations"}
        </h3>
        <button className="w-8 h-8 rounded-full bg-[var(--fg)] text-[var(--bg)] flex items-center justify-center hover:scale-110 transition-transform">
          <Plus size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((loc, i) => (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-[24px] bg-[var(--bg2)] border border-[var(--bdr)] hover:border-[var(--bdr2)] transition-all group relative overflow-hidden"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--glass)] border border-[var(--bdr)] flex items-center justify-center text-[var(--fg2)] group-hover:bg-[var(--fg)] group-hover:text-[var(--bg)] transition-all">
                  {getIcon(loc.type)}
                </div>
                <div>
                  <h4 className="text-sm font-black text-[var(--fg)]" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
                    {isFa ? loc.title.fa : loc.title.en}
                  </h4>
                  <p className="text-[11px] text-[var(--fg4)] font-medium mt-0.5 line-clamp-1">{isFa ? loc.address.fa : loc.address.en}</p>
                </div>
              </div>
              <button className="text-[var(--fg4)] hover:text-[var(--fg)]">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[var(--fg3)] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              <MapPin size={10} />
              <span>{isFa ? "مشاهده روی نقشه" : "View on Map"}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
