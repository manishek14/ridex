"use client";

import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "شنبه", income: 320000 },
  { name: "یکشنبه", income: 450000 },
  { name: "دوشنبه", income: 380000 },
  { name: "سه‌شنبه", income: 520000 },
  { name: "چهارشنبه", income: 480000 },
  { name: "پنجشنبه", income: 610000 },
  { name: "جمعه", income: 420000 },
];

const dataEn = [
  { name: "Sat", income: 320000 },
  { name: "Sun", income: 450000 },
  { name: "Mon", income: 380000 },
  { name: "Tue", income: 520000 },
  { name: "Wed", income: 480000 },
  { name: "Thu", income: 610000 },
  { name: "Fri", income: 420000 },
];

export function DriverEarningsChart({ locale = "fa" }: { locale?: string }) {
  const isFa = locale === "fa";
  const chartData = isFa ? data : dataEn;

  return (
    <div className="p-6 rounded-[24px] bg-bg2 border border-bdr h-[400px] flex flex-col" dir={isFa ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black text-fg" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "نمودار درآمد هفتگی" : "Weekly Earnings Chart"}
          </h3>
          <p className="text-xs text-fg4">{isFa ? "مجموع درآمد ۷ روز اخیر" : "Total income for last 7 days"}</p>
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-glass border border-bdr text-[11px] font-bold text-fg2">
          {isFa ? "تومان" : "IRT"}
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--fg)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--fg)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--bdr)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "var(--fg4)", fontSize: 10, fontWeight: "bold" }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "var(--fg4)", fontSize: 10, fontWeight: "bold" }} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "var(--bg2)", 
                borderColor: "var(--bdr)", 
                borderRadius: "12px",
                fontSize: "12px",
                color: "var(--fg)"
              }}
              itemStyle={{ color: "var(--fg)" }}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke="var(--fg)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorIncome)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
