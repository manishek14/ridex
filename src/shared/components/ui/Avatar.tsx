// src/shared/components/ui/Avatar.tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
}

const sizeClasses = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name, src, size = "md", fallback, ...props }, ref) => {
    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const initials = name ? getInitials(name) : fallback || "?";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-full flex items-center justify-center font-bold bg-glass2 border border-bdr text-fg2 overflow-hidden flex-shrink-0",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
