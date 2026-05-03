"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import Container from "@/components/ui/container";

const navLinks = [
  { label: "Catalog", href: "/catalog" },
  { label: "Community", href: "/community" },
  { label: "How it works", href: "/#how-it-works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // TODO: replace with real auth state
  const isLoggedIn = false;

  return (
    <header className="w-full z-50 sticky top-0 bg-primary border-b border-foreground/30">
      <Container className="h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-semibold text-background font-serif">
            Book<span className="text-accent">shelf</span>
          </span>
        </Link>

        {/* Search bar - desktop */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md border border-background/30 bg-background/20 rounded-full px-4 py-2">
          <Search size={16} className="text-background shrink-0" />
          <input
            type="text"
            placeholder="Search book name, author..."
            className="bg-transparent text-sm text-background placeholder:text-background focus:placeholder:text-transparent outline-none w-full"
          />
        </div>

        {/* Nav links - desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname === link.href
                  ? "text-accent font-medium"
                  : "text-background hover:text-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <button className="relative p-2 rounded-full hover:bg-card transition-colors">
                <Bell size={18} className="text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
              </button>
              <Link href="/profile">
                <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-sm font-medium text-foreground">
                  U
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-accent transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-card transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm py-1 ${
                pathname === link.href
                  ? "text-accent font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <Link href="/profile" className="text-sm text-foreground">
              My profile
            </Link>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Link
                href="/login"
                className="text-sm text-center text-muted-foreground py-2"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-sm text-center bg-primary text-primary-foreground px-4 py-2 rounded-full"
              >
                Get started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
