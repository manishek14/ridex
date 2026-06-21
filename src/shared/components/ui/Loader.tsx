import React from "react";
import { cn } from "@/lib/utils";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
}

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, size = "md", variant = "spinner", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    };

    if (variant === "dots") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-1", className)}
          {...props}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "rounded-full bg-gray-600 dark:bg-gray-300 animate-bounce",
                size === "sm" && "w-1.5 h-1.5",
                size === "md" && "w-2 h-2",
                size === "lg" && "w-3 h-3"
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      );
    }

    if (variant === "pulse") {
      return (
        <div
          ref={ref}
          className={cn(
            "rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse",
            sizeClasses[size],
            className
          )}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Loader.displayName = "Loader";
