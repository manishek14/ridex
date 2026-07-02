import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "green" | "red" | "yellow" | "blue" | "purple" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: "bg-glass2 text-fg3 border border-bdr",
  green: "bg-green-500/10 text-green-400 border border-green-500/20",
  red: "bg-red-500/10 text-red-400 border border-red-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  // Aliases for compatibility
  secondary: "bg-glass2 text-fg3 border border-bdr",
  destructive: "bg-red-500/10 text-red-400 border border-red-500/20",
  outline: "border border-bdr text-fg2",
  success: "bg-green-500/10 text-green-400 border border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  error: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-fg4",
  green: "bg-green-400",
  red: "bg-red-400",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  purple: "bg-purple-400",
  secondary: "bg-fg4",
  destructive: "bg-red-400",
  outline: "bg-fg4",
  success: "bg-green-400",
  warning: "bg-yellow-400",
  error: "bg-red-400",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", dot, children, ...props }, ref) => (
    <span
      ref={ref}
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
          dotColors[variant],
        )} />
      )}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";
