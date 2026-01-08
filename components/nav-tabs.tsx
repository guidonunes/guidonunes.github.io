import { User, Code, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavTabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export function NavTabs({ activeTab, onChange }: NavTabsProps) {
  const tabs = [
    { id: "home", icon: <Home size={20} />, label: "Home" },
    { id: "about", icon: <User size={20} />, label: "About" },
    { id: "projects", icon: <Code size={20} />, label: "Projects" },
  ];

  return (
    <div className="absolute z-50 flex md:flex-col gap-4
      /* Position: Bottom on Mobile, Right on Desktop */
      bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          aria-label={tab.label}
          className={cn(
            "p-3 rounded-full transition-all duration-300 backdrop-blur-md border shadow-lg group relative",
            activeTab === tab.id
              ? "bg-white text-slate-900 border-white dark:bg-white dark:text-slate-900 scale-110" // Active State
              : "bg-white/10 text-slate-500 border-white/10 hover:bg-white/20 hover:scale-105 dark:text-slate-400" // Inactive State
          )}
        >
          {tab.icon}

          {/* Tooltip (Only visible on Desktop Hover) */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded bg-slate-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block pointer-events-none">
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}
