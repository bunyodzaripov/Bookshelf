import Link from "next/link";
import Container from "@/components/ui/container";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-28 mt-16">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left */}
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block text-sm text-accent border border-accent/30 bg-accent/10 px-4 py-1.5 rounded-full mb-6">
              📚 Uzbekistan`s book exchange platform
            </span>

            <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-tight mb-6">
              Read, <span className="text-accent">swap</span>,<br />
              build community
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Exchange books with other readers, sell or buy at affordable
              prices. Join a growing community of book lovers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/auth/register"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors text-center"
              >
                Get started ↗
              </Link>
              <Link
                href="/catalog"
                className="border border-border text-foreground px-8 py-3 rounded-full text-sm hover:border-accent hover:text-accent transition-colors text-center"
              >
                Browse catalog
              </Link>
            </div>
          </div>

          {/* Right — book cards visual */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-72 h-72">
              {/* Card 1 */}
              <div className="absolute top-0 left-0 w-36 h-48 bg-card border border-border rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 -rotate-6">
                <span className="text-4xl">📘</span>
                <span className="text-xs text-muted-foreground text-center px-2">
                  O`tkan Kunlar
                </span>
                <span className="text-xs bg-card border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                  Swap
                </span>
              </div>
              {/* Card 2 */}
              <div className="absolute top-8 left-20 w-36 h-48 bg-card border border-border rounded-xl shadow-sm flex flex-col items-center justify-center gap-2">
                <span className="text-4xl">📗</span>
                <span className="text-xs text-muted-foreground text-center px-2">
                  Atomik Odatlar
                </span>
                <span className="text-xs bg-accent/10 border border-accent/30 text-accent px-2 py-0.5 rounded-full">
                  Sell
                </span>
              </div>
              {/* Card 3 */}
              <div className="absolute top-16 left-40 w-36 h-48 bg-card border border-border rounded-xl shadow-sm flex flex-col items-center justify-center gap-2 rotate-6">
                <span className="text-4xl">📕</span>
                <span className="text-xs text-muted-foreground text-center px-2">
                  Sapiens
                </span>
                <span className="text-xs bg-card border border-border px-2 py-0.5 rounded-full text-muted-foreground">
                  Swap
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
