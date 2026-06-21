// src/declarations.d.ts

// ============================================================
//  فایل‌های فونت
// ============================================================
declare module "*.woff2" {
  const src: string;
  export default src;
}
declare module "*.woff" {
  const src: string;
  export default src;
}
declare module "*.ttf" {
  const src: string;
  export default src;
}

// ============================================================
//  فایل‌های SVG (به عنوان کامپوننت React)
// ============================================================
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export { ReactComponent };
  const src: string;
  export default src;
}

// ============================================================
//  فایل‌های تصویر
// ============================================================
declare module "*.png" { const src: string; export default src; }
declare module "*.jpg" { const src: string; export default src; }
declare module "*.jpeg" { const src: string; export default src; }
declare module "*.webp" { const src: string; export default src; }

// ============================================================
//  ✅ فایل‌های CSS (اضافه شده)
// ============================================================
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}

// ============================================================
//  ✅ Side-effect imports (برای فایل‌هایی که فقط import می‌شوند)
// ============================================================
// این برای import "../styles/globals.css" کار می‌کند
declare module "*.css" {
  const content: void;
  export default content;
}