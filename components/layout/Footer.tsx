import Link from "next/link";
import Container from "@/components/ui/container";

const footerLinks = {
  Platform: [
    { label: "Catalog", href: "/catalog" },
    { label: "Community", href: "/community" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Add a book", href: "/books/add" },
  ],
  Company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-primary-foreground/10">
      <Container className="py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-semibold font-serif text-background">
                Book<span className="text-accent">shelf</span>
              </span>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed max-w-xs">
              Uzbekistan`s book exchange platform. Share, swap, and discover
              books with fellow readers.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors text-muted-foreground"
                aria-label="Telegram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.56-.46.7-.92.44l-2.56-1.88-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.6 4.72-4.26c.2-.18-.04-.28-.32-.1L7.6 14.4l-2.52-.78c-.54-.18-.56-.54.12-.8l9.84-3.8c.46-.16.86.12.6.78z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors text-muted-foreground"
                aria-label="Instagram"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-medium text-background mb-4">
                {group}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background">
            © 2025 Bookshelf. All rights reserved.
          </p>
          <p className="text-sm text-background">
            Made with ❤️ for book lovers in Uzbekistan
          </p>
        </div>
      </Container>
    </footer>
  );
}
