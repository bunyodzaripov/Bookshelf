"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check } from "lucide-react";
import Link from "next/link";
import { mockBooks } from "@/lib/mockData";
import { GENRES, LANGUAGES, CITIES, CONDITIONS, TYPES } from "@/lib/mockData";
import { Book } from "@/@types";

export default function EditBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const book = mockBooks.find((b) => b.id === id);

  const [form, setForm] = useState({
    title: book?.title ?? "",
    author: book?.author ?? "",
    genre: book?.genre ?? "",
    language: book?.language ?? "",
    publishedYear: book?.publishedYear?.toString() ?? "",
    pages: book?.pages?.toString() ?? "",
    description: book?.description ?? "",
    condition: (book?.condition ?? "") as Book["condition"] | "",
    type: (book?.type ?? "") as Book["type"] | "",
    price: book?.price?.toString() ?? "",
    city: book?.city ?? "",
  });

  const [saved, setSaved] = useState(false);

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    // TODO: real save
    setSaved(true);
    setTimeout(() => router.push("/my-books"), 1500);
  };

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-muted-foreground">Book not found.</p>
        <Link
          href="/my-books"
          className="text-accent hover:underline text-sm mt-2"
        >
          Back to My Books
        </Link>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mb-4">
          <Check size={28} className="text-green-600" />
        </div>
        <h2 className="font-serif text-2xl text-foreground mb-2">
          Changes saved!
        </h2>
        <p className="text-muted-foreground text-sm">
          Redirecting to your books...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Back */}
      <Link
        href="/my-books"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        My Books
      </Link>

      <div className="flex flex-col gap-5">
        {/* Book info */}
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="font-medium text-foreground">Book information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Author *
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Genre
              </label>
              <select
                value={form.genre}
                onChange={(e) => set("genre", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Language
              </label>
              <select
                value={form.language}
                onChange={(e) => set("language", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Published year
              </label>
              <input
                type="number"
                value={form.publishedYear}
                onChange={(e) => set("publishedYear", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Pages
              </label>
              <input
                type="number"
                value={form.pages}
                onChange={(e) => set("pages", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Condition & type */}
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
          <h3 className="font-medium text-foreground">
            Condition & listing type
          </h3>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block">
              Condition
            </label>
            <div className="grid grid-cols-2 gap-3">
              {CONDITIONS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => set("condition", c.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${
                    form.condition === c.value
                      ? "border-accent bg-accent/5"
                      : "border-border bg-background hover:border-accent/40"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${form.condition === c.value ? "border-accent" : "border-border"}`}
                  >
                    {form.condition === c.value && (
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {c.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block">
              Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => set("type", t.value)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${
                    form.type === t.value
                      ? "border-accent bg-accent/5"
                      : "border-border bg-background hover:border-accent/40"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${form.type === t.value ? "border-accent" : "border-border"}`}
                  >
                    {form.type === t.value && (
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {(form.type === "sell" || form.type === "both") && (
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Price (so`m)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">
              City
            </label>
            <select
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="border border-border text-muted-foreground px-5 py-2.5 rounded-xl text-sm hover:text-foreground hover:border-accent/40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
