"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect real auth
    console.log("login", form);
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

          <h1 className="font-serif text-3xl text-foreground mb-2">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="text-sm text-foreground mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-foreground">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors mt-2"
            >
              Sign in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google */}
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

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don`t have an account?{" "}
            <Link href="/register" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right — visual */}
      <div className="hidden lg:flex flex-1 bg-card border-l border-border items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex justify-center gap-4 mb-10">
            {["📚", "📖", "📗", "📘", "📕"].map((emoji, i) => (
              <div
                key={i}
                className="w-14 h-20 bg-background border border-border rounded-xl flex items-center justify-center text-2xl"
                style={{ transform: `rotate(${(i - 2) * 5}deg)` }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <h2 className="font-serif text-2xl text-foreground mb-3">
            Thousands of books waiting for you
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Join Uzbekistan`s largest book exchange community. Swap, sell, and
            discover new books every day.
          </p>

          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="font-serif text-2xl text-foreground">2,400+</p>
              <p className="text-xs text-muted-foreground mt-1">Active books</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-foreground">850+</p>
              <p className="text-xs text-muted-foreground mt-1">Readers</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-foreground">1,200+</p>
              <p className="text-xs text-muted-foreground mt-1">Exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
