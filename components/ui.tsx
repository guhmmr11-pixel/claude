import Link from "next/link";
import type { Route } from "next";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", className)}>
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link
      href={href as Route}
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-slateblue text-white hover:bg-slateblue/90"
          : "bg-slateblue/8 text-slateblue hover:bg-slateblue/12"
      )}
    >
      {children}
    </Link>
  );
}
