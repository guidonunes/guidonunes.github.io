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

        // Light Mode "Glass"
        "bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl",

        // Dark Mode "Glass"
        "dark:bg-zinc-900/70 dark:border-white/10 dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]",

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
