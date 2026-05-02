"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";
import { CITIES } from "@/lib/mockData";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    city: "",
    agreed: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    // TODO: connect real auth
    console.log("register", form);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="inline-block mb-10">
            <span className="font-serif text-2xl font-semibold text-foreground">
              Book<span className="text-accent">shelf</span>
            </span>
          </Link>

          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-8">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}
            >
              {step > 1 ? <Check size={12} /> : "1"}
            </div>
            <div
              className={`flex-1 h-px ${step > 1 ? "bg-primary" : "bg-border"}`}
            />
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground"}`}
            >
              2
            </div>
          </div>

          <h1 className="font-serif text-3xl text-foreground mb-2">
            {step === 1 ? "Create account" : "Almost done!"}
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            {step === 1
              ? "Join thousands of readers in Uzbekistan"
              : "Just a few more details"}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 1 ? (
              <>
                {/* Name */}
                <div>
                  <label className="text-sm text-foreground mb-1.5 block">
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Jasur Toshmatov"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm text-foreground mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-sm text-foreground mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                      minLength={8}
                      className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {/* Password strength */}
                  {form.password && (
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            form.password.length >= level * 4
                              ? level === 1
                                ? "bg-red-400"
                                : level === 2
                                  ? "bg-yellow-400"
                                  : "bg-green-400"
                              : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Username */}
                <div>
                  <label className="text-sm text-foreground mb-1.5 block">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      placeholder="jasur_reads"
                      value={form.username}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          username: e.target.value
                            .toLowerCase()
                            .replace(/\s/g, "_"),
                        })
                      }
                      required
                      className="w-full bg-card border border-border rounded-xl pl-8 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your public profile link: book-shelf.uz/@
                    {form.username || "username"}
                  </p>
                </div>

                {/* City */}
                <div>
                  <label className="text-sm text-foreground mb-1.5 block">
                    Your city
                  </label>
                  <select
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    required
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="">Select city</option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={`w-4 h-4 rounded border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                      form.agreed
                        ? "bg-accent border-accent"
                        : "border-border bg-card"
                    }`}
                    onClick={() => setForm({ ...form, agreed: !form.agreed })}
                  >
                    {form.agreed && <Check size={10} className="text-white" />}
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-accent hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-accent hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </>
            )}

            <button
              type="submit"
              disabled={step === 2 && !form.agreed}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 1 ? "Continue →" : "Create account"}
            </button>

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                ← Back
              </button>
            )}
          </form>

          {step === 1 && (
            <>
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <button className="w-full flex items-center justify-center gap-3 bg-card border border-border rounded-xl py-3 text-sm text-foreground hover:border-accent/40 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </>
          )}

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right — visual */}
      <div className="hidden lg:flex flex-1 bg-card border-l border-border items-center justify-center p-12">
        <div className="max-w-md">
          <h2 className="font-serif text-2xl text-foreground mb-8">
            Why join Bookshelf?
          </h2>
          <div className="flex flex-col gap-5">
            {[
              {
                icon: "🔄",
                title: "Free exchanges",
                desc: "Swap books with other readers at no cost.",
              },
              {
                icon: "💰",
                title: "Sell affordably",
                desc: "List your books and earn money from them.",
              },
              {
                icon: "🌟",
                title: "Discover new books",
                desc: "Find books recommended by real readers.",
              },
              {
                icon: "🤝",
                title: "Build community",
                desc: "Connect with book lovers across Uzbekistan.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-background border border-border rounded-xl flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">
                    {item.title}
                  </p>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
