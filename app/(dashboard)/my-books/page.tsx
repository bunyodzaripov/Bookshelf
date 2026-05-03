"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { mockBooks, mockUsers } from "@/lib/mockData";
import { Book } from "@/@types";

const currentUser = mockUsers[0];

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

const TABS = ["All", "Swap", "Sell", "Free"];

export default function MyBooksPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const myBooks = mockBooks.filter((b) => b.owner.id === currentUser.id);

  const filtered = myBooks.filter((b) => {
    if (activeTab === "All") return true;
    if (activeTab === "Swap") return b.type === "swap" || b.type === "both";
    if (activeTab === "Sell") return b.type === "sell" || b.type === "both";
    if (activeTab === "Free") return b.type === "free";
    return true;
  });

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-muted-foreground text-sm">
            {myBooks.length} books total
          </p>
        </div>
        <Link
          href="/my-books/add"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={16} />
          Add book
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "text-accent border-accent font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-4">
            <BookOpen size={28} className="text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">No books yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Add your first book to start swapping or selling with other readers.
          </p>
          <Link
            href="/my-books/add"
            className="flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            <Plus size={16} />
            Add your first book
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((book) => {
            const type = typeStyles[book.type];
            return (
              <div
                key={book.id}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-colors group"
              >
                {/* Cover */}
                <div className="h-36 bg-background flex items-center justify-center text-5xl border-b border-border relative">
                  📚
                  {/* Actions on hover */}
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                      href={`/my-books/${book.id}/edit`}
                      className="w-9 h-9 bg-background border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => setDeletingId(book.id)}
                      className="w-9 h-9 bg-background border border-border rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-300 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-medium text-foreground text-sm truncate mb-0.5">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {book.author}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${type.className}`}
                    >
                      {type.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {conditionLabels[book.condition]}
                    </span>
                  </div>

                  {book.price && (
                    <p className="text-sm font-medium text-foreground mt-2">
                      {book.price.toLocaleString()} so'm
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Add new card */}
          <Link href="/my-books/add">
            <div className="h-full min-h-48 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-xl border border-dashed border-current flex items-center justify-center">
                <Plus size={20} />
              </div>
              <span className="text-sm font-medium">Add book</span>
            </div>
          </Link>
        </div>
      )}

      {/* Delete confirm modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-background border border-border rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-medium text-foreground mb-2">Delete book?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This action cannot be undone. The book will be permanently
              removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 border border-border text-foreground py-2.5 rounded-xl text-sm hover:border-accent/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: real delete
                  setDeletingId(null);
                }}
                className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
