"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 0.8,
      }}
      className={cn(
        // Base Layout - Responsive padding, allow overflow for image on md screens
        "relative overflow-visible md:overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-0 lg:p-0",

        // Light Mode "Glass" - Enhanced frosted glass effect
        "bg-white/40 backdrop-blur-2xl border border-white/10 shadow-2xl ring-1 ring-white/10",
        "hover:bg-white/50 hover:border-white/40 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:ring-white/30",
        "transition-all duration-300 ease-out",

        // Dark Mode "Glass" - Enhanced frosted glass effect
        "dark:bg-zinc-900/50 dark:backdrop-blur-2xl dark:border-white/20 dark:shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)] dark:ring-1 dark:ring-cyan-500/10",
        "dark:hover:bg-zinc-900/60 dark:hover:border-white/10 dark:hover:shadow-[0_20px_80px_-10px_rgba(59,130,246,0.5)] dark:hover:ring-cyan-500/20",

        className
      )}
      {...(props as HTMLMotionProps<"div">)}
    >
      <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {children}
    </motion.div>
  );
}
