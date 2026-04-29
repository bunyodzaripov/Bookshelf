"use client";

import { GENRES, LANGUAGES, CONDITIONS, TYPES, CITIES } from "@/lib/mockData";
import { Book } from "@/@types";

export interface FilterState {
  type: Book["type"][];
  genre: string[];
  language: string[];
  condition: Book["condition"][];
  city: string[];
  priceMin: string;
  priceMax: string;
}

interface BookFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export default function BookFilter({ filters, onChange }: BookFilterProps) {
  const toggle = <T extends string>(arr: T[], value: T): T[] =>
    arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

  return (
    <aside className="w-56 shrink-0">
      <div className="bg-background border border-border rounded-2xl p-5 sticky top-6">
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-medium text-foreground">Filters</span>
          <button
            onClick={() =>
              onChange({
                type: [],
                genre: [],
                language: [],
                condition: [],
                city: [],
                priceMin: "",
                priceMax: "",
              })
            }
            className="text-xs text-accent hover:underline"
          >
            Clear all
          </button>
        </div>

        {/* Type */}
        <div className="mb-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Type
          </p>
          <div className="flex flex-col gap-2">
            {TYPES.map((t) => (
              <label
                key={t.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.type.includes(t.value)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      type: toggle(filters.type, t.value),
                    })
                  }
                  className="accent-accent w-3.5 h-3.5"
                />
                <span className="text-sm text-foreground">{t.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-border my-4" />

        {/* Genre */}
        <div className="mb-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Genre
          </p>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
            {GENRES.map((g) => (
              <label key={g} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.genre.includes(g)}
                  onChange={() =>
                    onChange({ ...filters, genre: toggle(filters.genre, g) })
                  }
                  className="accent-accent w-3.5 h-3.5"
                />
                <span className="text-sm text-foreground">{g}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-border my-4" />

        {/* Language */}
        <div className="mb-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Language
          </p>
          <div className="flex flex-col gap-2">
            {LANGUAGES.map((l) => (
              <label key={l} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.language.includes(l)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      language: toggle(filters.language, l),
                    })
                  }
                  className="accent-accent w-3.5 h-3.5"
                />
                <span className="text-sm text-foreground">{l}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-border my-4" />

        {/* Condition */}
        <div className="mb-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Condition
          </p>
          <div className="flex flex-col gap-2">
            {CONDITIONS.map((c) => (
              <label
                key={c.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.condition.includes(c.value)}
                  onChange={() =>
                    onChange({
                      ...filters,
                      condition: toggle(filters.condition, c.value),
                    })
                  }
                  className="accent-accent w-3.5 h-3.5"
                />
                <span className="text-sm text-foreground">{c.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-border my-4" />

        {/* City */}
        <div className="mb-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            City
          </p>
          <div className="flex flex-col gap-2">
            {CITIES.map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.city.includes(c)}
                  onChange={() =>
                    onChange({ ...filters, city: toggle(filters.city, c) })
                  }
                  className="accent-accent w-3.5 h-3.5"
                />
                <span className="text-sm text-foreground">{c}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-border my-4" />

        {/* Price */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Price (so`m)
          </p>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceMin}
              onChange={(e) =>
                onChange({ ...filters, priceMin: e.target.value })
              }
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
            />
            <span className="text-muted-foreground text-sm">—</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceMax}
              onChange={(e) =>
                onChange({ ...filters, priceMax: e.target.value })
              }
              className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
