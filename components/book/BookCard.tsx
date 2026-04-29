import Link from "next/link";
import { Book } from "@/@types";

const typeStyles: Record<Book["type"], { label: string; className: string }> = {
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

const conditionStyles: Record<Book["condition"], string> = {
  new: "text-green-600",
  good: "text-blue-600",
  fair: "text-yellow-600",
  worn: "text-red-500",
};

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const type = typeStyles[book.type];
  const conditionColor = conditionStyles[book.condition];

  return (
    <Link href={`/book/${book.id}`}>
      <div className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-sm transition-all">
        {/* Cover */}
        <div className="h-40 bg-card flex items-center justify-center text-5xl border-b border-border">
          📚
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium text-foreground text-sm leading-snug line-clamp-2 flex-1">
              {book.title}
            </h3>
          </div>

          <p className="text-xs text-muted-foreground mb-3">{book.author}</p>

          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${type.className}`}
            >
              {type.label}
            </span>
            <span className={`text-xs font-medium ${conditionColor}`}>
              {book.condition.charAt(0).toUpperCase() + book.condition.slice(1)}
            </span>
          </div>

          {book.price && (
            <div className="mt-2 text-sm font-medium text-foreground">
              {book.price.toLocaleString()} so`m
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center text-xs font-medium text-muted-foreground">
              {book.owner.name.charAt(0)}
            </div>
            <span className="text-xs text-muted-foreground truncate">
              {book.owner.name}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">
              {book.city}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
