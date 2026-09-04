import * as React from "react";
import { cn } from "@/lib/utils";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HEADINGS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Display({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("font-heading text-3xl sm:text-3xl lg:text-4xl 2xl:text-[3rem] font-light leading-[1.3] tracking-wider text-[#FBFBFB]", className)}
      {...props}
    />
  );
}

export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("font-heading text-4xl sm:text-5xl font-semibold leading-[1.15] tracking-tight text-slate-900", className)}
      {...props}
    />
  );
}

export function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("font-heading text-3xl 2xl:text-4xl font-normal leading-normal tracking-wider text-[#FBFBFB]", className)}
      {...props}
    />
  );
}

export function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-heading text-xl 2xl:text-xl font-medium leading-snug text-white", className)}
      {...props}
    />
  );
}

export function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn("font-body text-md md:text-xl 2xl:text-2xl font-normal leading-snug text-white", className)}
      {...props}
    />
  );
}

export function H5({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("font-heading text-lg sm:text-xl font-medium leading-snug text-slate-900", className)}
      {...props}
    />
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PARAGRAPH / TEXT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function P({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body font-light text-base lg:text-sm 2xl:text-lg  leading-normal text-[#555555]", className)}
      {...props}
    />
  );
}

export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body text-lg sm:text-xl leading-relaxed text-slate-500", className)}
      {...props}
    />
  );
}

export function Small({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body text-sm leading-relaxed text-slate-500", className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-body text-md font-light text-[#FFFFFF] tracking-wider", className)}
      {...props}
    />
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INLINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function Highlight({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-primary font-medium", className)}
      {...props}
    />
  );
}

export function Muted({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-sm text-slate-400", className)}
      {...props}
    />
  );
}