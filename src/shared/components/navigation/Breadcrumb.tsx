// src/shared/components/navigation/Breadcrumb.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, separator = "/", ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1 text-sm text-fg3",
        className
      )}
      {...props}
    />
  )
);

Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  isCurrent?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, isCurrent, ...props }, ref) => (
    <li
      ref={ref}
      className={cn(
        "flex items-center gap-1",
        isCurrent && "text-fg font-semibold",
        className
      )}
      aria-current={isCurrent ? "page" : undefined}
      {...props}
    />
  )
);

BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, href, children, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(
        "hover:text-fg transition-colors no-underline",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
);

BreadcrumbLink.displayName = "BreadcrumbLink";

// ✅ اصلاح: اضافه کردن یک prop اختیاری به اینترفیس
export interface BreadcrumbSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  // اضافه کردن یک prop اختیاری برای جلوگیری از empty interface
  customIcon?: React.ReactNode;
}

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, children = "/", customIcon, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("text-fg4 select-none", className)}
      {...props}
    >
      {customIcon || children}
    </span>
  )
);

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";