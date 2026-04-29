"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import Container from "@/components/ui/container";
import BookCard from "@/components/book/BookCard";
import BookFilter, { FilterState } from "@/components/book/BookFilter";
import { mockBooks } from "@/lib/mockData";
import { Book } from "@/@types";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

const TYPE_TABS: { value: Book["type"] | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "swap", label: "Swap" },
  { value: "sell", label: "Sell" },
  { value: "free", label: "Free" },
];

const defaultFilters: FilterState = {
  type: [],
  genre: [],
  language: [],
  condition: [],
  city: [],
  priceMin: "",
  priceMax: "",
};

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [activeTab, setActiveTab] = useState<Book["type"] | "all">("all");
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    let books = [...mockBooks];

    // Tab filter
    if (activeTab !== "all") {
      books = books.filter((b) => b.type === activeTab || b.type === "both");
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.genre.toLowerCase().includes(q),
      );
    }

    // Filters
    if (filters.type.length) {
      books = books.filter((b) => filters.type.includes(b.type));
    }
    if (filters.genre.length) {
      books = books.filter((b) => filters.genre.includes(b.genre));
    }
    if (filters.language.length) {
      books = books.filter((b) => filters.language.includes(b.language));
    }
    if (filters.condition.length) {
      books = books.filter((b) => filters.condition.includes(b.condition));
    }
    if (filters.city.length) {
      books = books.filter((b) => filters.city.includes(b.city));
    }
    if (filters.priceMin) {
      books = books.filter((b) => (b.price ?? 0) >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      books = books.filter((b) => (b.price ?? 0) <= Number(filters.priceMax));
    }

    // Sort
    if (sort === "newest")
      books.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "oldest")
      books.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    if (sort === "price_asc")
      books.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === "price_desc")
      books.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));

    return books;
  }, [search, sort, activeTab, filters]);

  // Active filter tags
  const activeTags = [
    ...filters.type.map((v) => ({ key: "type", value: v, label: v })),
    ...filters.genre.map((v) => ({ key: "genre", value: v, label: v })),
    ...filters.language.map((v) => ({ key: "language", value: v, label: v })),
    ...filters.condition.map((v) => ({ key: "condition", value: v, label: v })),
    ...filters.city.map((v) => ({ key: "city", value: v, label: v })),
  ];

  const removeTag = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: (prev[key as keyof FilterState] as string[]).filter(
        (v) => v !== value,
      ),
    }));
  };

  return (
    <section className="py-10">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-foreground mb-2">
            Book catalog
          </h1>
          <p className="text-muted-foreground">
            {filtered.length} books available — swap, sell or get for free
          </p>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex items-center gap-2 flex-1 bg-card border border-border rounded-full px-4 py-2.5">
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search by title, author or genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X
                  size={14}
                  className="text-muted-foreground hover:text-foreground"
                />
              </button>
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-card border border-border rounded-full px-4 py-2.5 text-sm text-foreground outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="md:hidden flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2.5 text-sm text-foreground"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 border-b border-border">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
                activeTab === tab.value
                  ? "text-accent border-accent font-medium"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active filter tags */}
        {activeTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {activeTags.map((tag) => (
              <span
                key={`${tag.key}-${tag.value}`}
                className="flex items-center gap-1.5 text-xs bg-card border border-border px-3 py-1 rounded-full text-foreground"
              >
                {tag.label}
                <button onClick={() => removeTag(tag.key, tag.value)}>
                  <X
                    size={12}
                    className="text-muted-foreground hover:text-accent"
                  />
                </button>
              </span>
            ))}
            <button
              onClick={() => setFilters(defaultFilters)}
              className="text-xs text-accent hover:underline px-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex gap-8">
          {/* Filter sidebar — desktop */}
          <div className="hidden md:block">
            <BookFilter filters={filters} onChange={setFilters} />
          </div>

          {/* Filter sidebar — mobile */}
          {showMobileFilter && (
            <div className="md:hidden fixed inset-0 z-50 bg-black/40 flex">
              <div className="bg-background w-72 h-full overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium text-foreground">Filters</span>
                  <button onClick={() => setShowMobileFilter(false)}>
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>
                <BookFilter filters={filters} onChange={setFilters} />
              </div>
            </div>
          )}

          {/* Books grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">📭</div>
                <p className="text-muted-foreground">
                  No books found. Try changing filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
