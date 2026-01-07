import * as React from "react";
import { cn } from "@/lib/utils"; // We'll create this helper in a second

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        // Base Layout
        "relative overflow-hidden rounded-3xl p-0 ps-12",

        // Light Mode "Glass" - Enhanced frosted glass effect
        "bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl ring-1 ring-white/20",

        // Dark Mode "Glass" - Enhanced frosted glass effect
        "dark:bg-zinc-900/50 dark:backdrop-blur-2xl dark:border-white/20 dark:shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)] dark:ring-1 dark:ring-cyan-500/10",

        // Transition
        "transition-all duration-500 ease-out",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {children}
    </div>
  );
}
