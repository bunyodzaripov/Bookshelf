"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  ArrowLeftRight,
  Users,
  User,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/home", icon: Home },
  { href: "/my-books", icon: BookOpen },
  { href: "/exchanges", icon: ArrowLeftRight },
  { href: "/community", icon: Users },
  { href: "/profile", icon: User },
];

interface DashboardSidebarProps {
  collapsed: boolean;
}

export default function DashboardSidebar({ collapsed }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`shrink-0 h-screen sticky top-0 flex flex-col items-center bg-card border-r border-border transition-all duration-300 py-4 ${
        collapsed ? "w-0 overflow-hidden border-none" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="mb-8">
        <Link href="/home">
          <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center">
            <BookOpen size={18} className="text-white" />
          </div>
        </Link>
      </div>

      {/* Nav items — o'rtada */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-2">
        {navItems.map(({ href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </nav>

      {/* Settings — pastda */}
      <div className="mt-auto flex flex-col items-center gap-2">
        <Link
          href="/settings"
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
            pathname === "/settings"
              ? "bg-accent text-white"
              : "text-muted-foreground hover:bg-background hover:text-foreground"
          }`}
        >
          <Settings size={18} />
        </Link>
      </div>
    </aside>
  );
}
