"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const currentTheme = resolvedTheme || theme || "light";
    setTheme(currentTheme === "dark" ? "light" : "dark");
  }, [theme, resolvedTheme, setTheme]);

  if (!mounted) {
    return (
      <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
        <div className="w-5 h-5" />
      </div>
    );
  }

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-slate-600 dark:text-slate-300 transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
      aria-label="Toggle Theme"
      type="button"
    >
      {isDark ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-slate-700 dark:text-slate-300" />
      )}
    </button>
  );
}
