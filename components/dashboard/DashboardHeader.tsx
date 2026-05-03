"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, PanelLeft } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/home": "Home",
  "/my-books": "My Books",
  "/exchanges": "Exchanges",
  "/community": "Community",
  "/profile": "Profile",
  "/settings": "Settings",
};

interface DashboardHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function DashboardHeader({
  collapsed,
  onToggle,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-16 border-b border-primary/20 bg-primary flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="p-2 cursor-pointer rounded-xl hover:bg-background text-background hover:text-foreground transition-colors"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft size={18} />
        </button>

        <h1 className="font-serif text-xl text-background">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-36"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-background transition-colors">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
        </button>
      </div>
    </header>
  );
}
