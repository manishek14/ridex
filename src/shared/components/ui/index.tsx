"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

// ── RE-EXPORT DEDICATED COMPONENTS ───────────────────────────
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, type CardProps } from './Card';
export { Badge, type BadgeVariant, type BadgeProps } from './Badge';
export { Avatar, type AvatarProps } from './Avatar';

// ── SKELETON ─────────────────────────────────────────────────
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: string;
}

export function Skeleton({ className, rounded, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-glass2",
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
    <div className={cn("h-px bg-bdr w-full", className)} />
  );
}

// ── SECTION TAG ──────────────────────────────────────────────
export function SectionTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn(
      "text-[10.5px] font-bold tracking-[3px] uppercase text-fg4 mb-3",
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
      "text-[clamp(28px,3.8vw,48px)] font-black tracking-tight leading-[1.05] mb-3 text-fg",
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
