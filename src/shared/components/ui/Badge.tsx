import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-blue-600 text-white": variant === "default",
          "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50": variant === "secondary",
          "bg-red-600 text-white": variant === "destructive",
          "border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-gray-50": variant === "outline",
          "bg-green-600 text-white": variant === "success",
          "bg-amber-600 text-white": variant === "warning",
        },
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
