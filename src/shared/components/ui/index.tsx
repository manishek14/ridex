"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

// ── CARD ─────────────────────────────────────────────────────
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
}

export function Card({ className, hover, glass, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--bdr)] p-5",
        glass
          ? "bg-[var(--glass)] backdrop-blur-md"
          : "bg-[var(--bg2)]",
        hover && "transition-all duration-200 hover:border-[var(--bdr2)] hover:bg-[var(--glass2)] hover:-translate-y-0.5 cursor-default",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// ── BADGE ────────────────────────────────────────────────────
type BadgeVariant = "default" | "green" | "red" | "yellow" | "blue" | "purple";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--glass2)] text-[var(--fg3)] border border-[var(--bdr)]",
  green:   "bg-green-500/10 text-green-400 border border-green-500/20",
  red:     "bg-red-500/10 text-red-400 border border-red-500/20",
  yellow:  "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  blue:    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  purple:  "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

export function Badge({ className, variant = "default", dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold",
        badgeClasses[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          "w-1.5 h-1.5 rounded-full",
          variant === "green" && "bg-green-400",
          variant === "red" && "bg-red-400",
          variant === "yellow" && "bg-yellow-400",
          variant === "blue" && "bg-blue-400",
          variant === "default" && "bg-[var(--fg4)]",
        )} />
      )}
      {children}
    </span>
  );
}

// ── AVATAR ───────────────────────────────────────────────────
interface AvatarProps {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export function Avatar({ name, src, size = "md", className }: AvatarProps) {
  const initials = name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold bg-[var(--glass2)] border border-[var(--bdr)] text-[var(--fg2)] overflow-hidden flex-shrink-0",
        sizeMap[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials ?? "?"}</span>
      )}
    </div>
  );
}

// ── SKELETON ─────────────────────────────────────────────────
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: string;
}

export function Skeleton({ className, rounded, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--glass2)]",
        rounded ?? "rounded-lg",
        className
      )}
      {...props}
    />
  );
}

// ── DIVIDER ──────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("h-px bg-[var(--bdr)] w-full", className)} />
  );
}

// ── SECTION TAG ──────────────────────────────────────────────
export function SectionTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn(
      "text-[10.5px] font-bold tracking-[3px] uppercase text-[var(--fg4)] mb-3",
      className
    )}>
      {children}
    </p>
  );
}

// ── SECTION HEADING ──────────────────────────────────────────
export function SectionHeading({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn(
      "text-[clamp(28px,3.8vw,48px)] font-black tracking-tight leading-[1.05] mb-3 text-[var(--fg)]",
      className
    )}>
      {children}
    </h2>
  );
}

// ── DIALOG ───────────────────────────────────────────────────
export { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from './Dialog';

// ── LOADER ───────────────────────────────────────────────────
export { Loader } from './Loader';

// ── CHECKBOX ─────────────────────────────────────────────────
export { Checkbox } from './Checkbox';

// ── TABS ─────────────────────────────────────────────────────
export { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from './Tabs';
