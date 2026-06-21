import React from "react";
import { cn } from "@/lib/utils";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLNav> {}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn("flex items-center gap-2 text-sm", className)}
      {...props}
    />
  )
);
Breadcrumb.displayName = "Breadcrumb";

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isLast?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLDivElement, BreadcrumbItemProps>(
  ({ className, isLast, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {children}
      {!isLast && <span className="text-gray-400">/</span>}
    </div>
  )
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("text-blue-600 hover:underline dark:text-blue-400", className)}
    {...props}
  />
));
BreadcrumbLink.displayName = "BreadcrumbLink";
