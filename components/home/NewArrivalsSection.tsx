import Link from "next/link";
import Container from "@/components/ui/container";
import { mockBooks } from "@/lib/mockData";

const typeLabels: Record<string, { label: string; className: string }> = {
  swap: {
    label: "Swap",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  sell: {
    label: "Sell",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  both: {
    label: "Swap & Sell",
    className: "bg-accent/10 text-accent border-accent/20",
  },
  free: {
    label: "Free",
    className: "bg-card text-muted-foreground border-border",
  },
};

export default function NewArrivalsSection() {
  const books = mockBooks.slice(0, 6);

  return (
    <section className="py-20 bg-card/40">
      <Container>
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              New arrivals
            </h2>
            <p className="text-muted-foreground">Recently added books</p>
          </div>
          <Link
            href="/catalog"
            className="text-sm text-accent hover:underline hidden md:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {books.map((book) => {
            const genre = typeLabels[book.type];
            return (
              <Link key={book.id} href={`/book/${book.id}`}>
                <div className="group bg-background border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors">
                  {/* Cover */}
                  <div className="h-32 bg-card flex items-center justify-center text-4xl border-b border-border">
                    📚
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <div className="text-sm font-medium text-foreground truncate mb-0.5">
                      {book.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate mb-2">
                      {book.author}
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${genre?.className}`}
                    >
                      {genre?.label}
                    </span>
                    {book.price && (
                      <div className="text-xs font-medium text-foreground mt-1.5">
                        {book.price.toLocaleString()} so`m
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/catalog"
            className="text-sm text-accent border border-accent/30 px-6 py-2 rounded-full hover:bg-accent/10 transition-colors"
          >
            View all books →
          </Link>
        </div>
      </Container>
    </section>
  );
}
