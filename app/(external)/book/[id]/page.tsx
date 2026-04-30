"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  MapPin,
  Star,
  ArrowLeft,
  Bookmark,
  Share2,
} from "lucide-react";
import Container from "@/components/ui/container";
import BookCard from "@/components/book/BookCard";
import ExchangeModal from "@/components/book/ExchangeModal";
import { mockBooks } from "@/lib/mockData";
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

const conditionLabels: Record<Book["condition"], string> = {
  new: "New",
  good: "Good",
  fair: "Fair",
  worn: "Worn",
};

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const book = mockBooks.find((b) => b.id === id);
  if (!book) notFound();

  const similar = mockBooks
    .filter((b) => b.id !== book.id && b.genre === book.genre)
    .slice(0, 4);

  const type = typeStyles[book.type];

  return (
    <>
      <section className="py-10">
        <Container>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/catalog"
              className="hover:text-foreground transition-colors"
            >
              Catalog
            </Link>
            <span>/</span>
            <span className="text-foreground truncate">{book.title}</span>
          </div>

          {/* Back */}
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to catalog
          </Link>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Left — cover */}
            <div className="w-full md:w-64 shrink-0">
              <div className="aspect-3/4 bg-card border border-border rounded-2xl flex items-center justify-center text-8xl mb-4">
                📚
              </div>

              {/* Type & condition badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${type.className}`}
                >
                  {type.label}
                </span>
                <span className="text-xs px-3 py-1 rounded-full border border-border bg-card text-muted-foreground">
                  {conditionLabels[book.condition]}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-2">
                {(book.type === "swap" || book.type === "both") && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Request swap ↗
                  </button>
                )}
                {(book.type === "sell" || book.type === "both") &&
                  book.price && (
                    <button className="w-full border border-border text-foreground py-3 rounded-full text-sm hover:border-accent hover:text-accent transition-colors">
                      Buy for {book.price.toLocaleString()} so`m
                    </button>
                  )}
                {book.type === "free" && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors"
                  >
                    Request for free ↗
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border text-sm transition-colors ${
                      saved
                        ? "bg-accent/10 border-accent/30 text-accent"
                        : "border-border text-muted-foreground hover:border-accent/30"
                    }`}
                  >
                    <Bookmark size={15} />
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full border border-border text-muted-foreground hover:border-accent/30 text-sm transition-colors">
                    <Share2 size={15} />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Right — info */}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                {book.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {book.author}
              </p>

              {/* Rating row */}
              <div className="flex items-center gap-3 flex-wrap mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s <= 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">4.8</span>
                <span className="text-sm text-muted-foreground">
                  (24 reviews)
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-sm text-muted-foreground">
                  12 exchanges
                </span>
              </div>

              {/* Price */}
              {book.price && (
                <div className="flex items-baseline gap-3 bg-card border border-border rounded-2xl px-5 py-4 mb-6">
                  <span className="font-serif text-3xl text-foreground">
                    {book.price.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">so`m</span>
                  {book.type === "both" && (
                    <>
                      <span className="text-muted-foreground text-sm">or</span>
                      <span className="text-sm bg-green-50 text-green-700 border border-green-200 px-3 py-0.5 rounded-full">
                        Available for swap
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Book info grid */}
              <div className="grid grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden mb-6">
                {[
                  { label: "Genre", value: book.genre },
                  { label: "Language", value: book.language },
                  { label: "Published", value: book.publishedYear ?? "—" },
                  {
                    label: "Pages",
                    value: book.pages ? `${book.pages} pages` : "—",
                  },
                  {
                    label: "Condition",
                    value: conditionLabels[book.condition],
                  },
                  { label: "City", value: book.city },
                ].map((item) => (
                  <div key={item.label} className="bg-background px-4 py-3">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              {book.description && (
                <div className="mb-8">
                  <h2 className="font-medium text-foreground mb-3">
                    About this book
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Owner card */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Book owner
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-lg font-medium text-foreground">
                    {book.owner.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {book.owner.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={11} />
                        {book.owner.city}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star
                          size={11}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        {book.owner.rating}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BookOpen size={11} />
                        {book.owner.booksCount} books
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/profile/${book.owner.username}`}
                    className="text-sm border border-border text-foreground px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors shrink-0"
                  >
                    View profile
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border text-center">
                  <div>
                    <p className="font-medium text-foreground">
                      {book.owner.booksCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Books</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {book.owner.exchangesCount}
                    </p>
                    <p className="text-xs text-muted-foreground">Exchanges</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {book.owner.rating}
                    </p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Similar books */}
      {similar.length > 0 && (
        <section className="py-16 bg-card/40">
          <Container>
            <h2 className="font-serif text-2xl text-foreground mb-8">
              Similar books
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similar.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Exchange modal */}
      {showModal && (
        <ExchangeModal
          requestedBook={book}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
