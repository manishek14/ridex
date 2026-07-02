"use client";

import { motion } from "motion/react";

export function RadarOverlay({ isFa = true }: { isFa?: boolean }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Pulse Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut",
          }}
          className="absolute w-[300px] h-[300px] rounded-full border-2 border-fg"
        />
      ))}

      {/* Center Glow */}
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-fg flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-bg border-t-transparent rounded-full"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 px-6 py-3 rounded-2xl bg-bg/90 backdrop-blur-xl border border-bdr shadow-2xl"
        >
          <p className="text-sm font-black text-fg whitespace-nowrap" style={{ fontFamily: isFa ? "Vazirmatn, sans-serif" : undefined }}>
            {isFa ? "در حال جستجوی بهترین راننده..." : "Finding the best driver..."}
          </p>
          <div className="flex justify-center gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-fg"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
