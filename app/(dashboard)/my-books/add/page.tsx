"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { GENRES, LANGUAGES, CITIES, CONDITIONS, TYPES } from "@/lib/mockData";
import { Book } from "@/@types";

interface FormState {
  title: string;
  author: string;
  genre: string;
  language: string;
  publishedYear: string;
  pages: string;
  description: string;
  condition: Book["condition"] | "";
  type: Book["type"] | "";
  price: string;
  city: string;
}

const defaultForm: FormState = {
  title: "",
  author: "",
  genre: "",
  language: "",
  publishedYear: "",
  pages: "",
  description: "",
  condition: "",
  type: "",
  price: "",
  city: "",
};

const STEPS = ["Book info", "Condition & type", "Review"];

export default function AddBookPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 0)
      return form.title && form.author && form.genre && form.language;
    if (step === 1) return form.condition && form.type && form.city;
    return true;
  };

  const handleSubmit = () => {
    // TODO: real submit
    setSubmitted(true);
    setTimeout(() => router.push("/my-books"), 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center mb-4">
          <Check size={28} className="text-green-600" />
        </div>
        <h2 className="font-serif text-2xl text-foreground mb-2">
          Book added!
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

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  i < step
                    ? "bg-green-500 text-white"
                    : i === step
                      ? "bg-accent text-white"
                      : "bg-card border border-border text-muted-foreground"
                }`}
              >
                {i < step ? <Check size={12} /> : i + 1}
              </div>
              <span
                className={`text-sm hidden sm:block ${
                  i === step
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-8 h-px ${i < step ? "bg-green-400" : "bg-border"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 0 — Book info */}
      {step === 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="font-medium text-foreground">Book information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Title *
              </label>
              <input
                type="text"
                placeholder="e.g. O'tkan Kunlar"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Author *
              </label>
              <input
                type="text"
                placeholder="e.g. Abdulla Qodiriy"
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Genre *
              </label>
              <select
                value={form.genre}
                onChange={(e) => set("genre", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
              >
                <option value="">Select genre</option>
                {GENRES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Language *
              </label>
              <select
                value={form.language}
                onChange={(e) => set("language", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
              >
                <option value="">Select language</option>
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
                placeholder="e.g. 2020"
                value={form.publishedYear}
                onChange={(e) => set("publishedYear", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Pages
              </label>
              <input
                type="number"
                placeholder="e.g. 320"
                value={form.pages}
                onChange={(e) => set("pages", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Description
              </label>
              <textarea
                placeholder="A brief description of the book..."
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {/* Photo upload */}
            <div className="col-span-2">
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Cover photo
              </label>
              <div className="border border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 hover:border-accent/50 transition-colors cursor-pointer bg-background">
                <div className="w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center">
                  <Upload size={18} className="text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-foreground font-medium">
                    Upload photo
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 1 — Condition & type */}
      {step === 1 && (
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-6">
          <h3 className="font-medium text-foreground">
            Condition & listing type
          </h3>

          {/* Condition */}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block">
              Book condition *
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
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      form.condition === c.value
                        ? "border-accent"
                        : "border-border"
                    }`}
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

          {/* Type */}
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide mb-3 block">
              Listing type *
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
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      form.type === t.value ? "border-accent" : "border-border"
                    }`}
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

          {/* Price */}
          {(form.type === "sell" || form.type === "both") && (
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">
                Price (so`m)
              </label>
              <input
                type="number"
                placeholder="e.g. 25000"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>
          )}

          {/* City */}
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">
              Your city *
            </label>
            <select
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
            >
              <option value="">Select city</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Step 2 — Review */}
      {step === 2 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-medium text-foreground mb-5">
            Review your listing
          </h3>
          <div className="flex gap-5">
            <div className="w-24 h-32 bg-background border border-border rounded-xl flex items-center justify-center text-4xl shrink-0">
              📚
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-xl text-foreground mb-0.5">
                {form.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                {form.author}
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {[
                  { label: "Genre", value: form.genre },
                  { label: "Language", value: form.language },
                  { label: "Condition", value: form.condition },
                  { label: "Type", value: form.type },
                  { label: "City", value: form.city },
                  {
                    label: "Price",
                    value: form.price
                      ? `${Number(form.price).toLocaleString()} so'm`
                      : "—",
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm text-foreground font-medium capitalize">
                      {value || "—"}
                    </p>
                  </div>
                ))}
              </div>
              {form.description && (
                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {form.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => (step > 0 ? setStep(step - 1) : router.back())}
          className="flex items-center gap-2 border border-border text-muted-foreground px-5 py-2.5 rounded-xl text-sm hover:text-foreground hover:border-accent/40 transition-colors"
        >
          <ChevronLeft size={16} />
          {step === 0 ? "Cancel" : "Back"}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className="bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-accent text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
          >
            Publish book
          </button>
        )}
      </div>
    </div>
  );
}
