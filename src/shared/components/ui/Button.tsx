// src/shared/components/ui/Button.tsx
"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-btn-bg text-btn-fg border-none hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-glass text-fg2 border border-bdr hover:bg-glass2 hover:text-fg hover:border-bdr2",
        ghost:
          "bg-transparent text-fg3 border border-bdr hover:text-fg hover:border-bdr2 hover:bg-glass",
        glass:
          "bg-glass text-fg2 border border-bdr2 hover:bg-glass2 hover:text-fg backdrop-blur-md",
        danger:
          "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30",
        success:
          "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20",
        icon: "bg-glass border border-bdr text-fg3 hover:text-fg hover:border-bdr2 hover:bg-glass2",
      },
      size: {
        xs: "px-2.5 py-1.5 text-xs rounded-lg",
        sm: "px-3.5 py-2 text-sm rounded-[9px]",
        md: "px-5 py-2.5 text-sm rounded-[10px]",
        lg: "px-6 py-3 text-base rounded-xl",
        xl: "px-8 py-3.5 text-base rounded-xl",
        icon: "w-9 h-9 rounded-[9px]",
        "icon-lg": "w-10 h-10 rounded-[10px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { 
      className, 
      variant, 
      size, 
      fullWidth,
      loading, 
      leftIcon, 
      rightIcon, 
      children, 
      disabled, 
      ...props 
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";