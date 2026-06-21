import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Vazirmatn", "sans-serif"],
        fa: ["Vazirmatn", "sans-serif"],
      },
      colors: {
        background: "var(--bg)",
        "background-2": "var(--bg2)",
        "background-3": "var(--bg3)",
        foreground: "var(--fg)",
        "foreground-2": "var(--fg2)",
        "foreground-3": "var(--fg3)",
        "foreground-4": "var(--fg4)",
        border: "var(--bdr)",
        "border-2": "var(--bdr2)",
        glass: "var(--glass)",
        "glass-2": "var(--glass2)",
        brand: {
          DEFAULT: "#ffffff",
          dark: "#000000",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        float: "float 5s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
        ticker: "ticker 26s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        ring: "ring 2.5s ease-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        ring: {
          "0%": { opacity: "0.7", transform: "translate(-50%,-50%) scale(0.7)" },
          "100%": { opacity: "0", transform: "translate(-50%,-50%) scale(1.3)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "390px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;
