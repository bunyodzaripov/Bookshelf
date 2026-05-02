"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ArrowLeftRight,
  TrendingUp,
  Plus,
} from "lucide-react";
import BookCard from "@/components/book/BookCard";
import { mockBooks, mockUsers } from "@/lib/mockData";

// TODO: replace with real auth user
const currentUser = mockUsers[0];

const stats = [
  {
    label: "My books",
    value: currentUser.booksCount,
    icon: BookOpen,
    href: "/my-books",
  },
  {
    label: "Exchanges",
    value: currentUser.exchangesCount,
    icon: ArrowLeftRight,
    href: "/exchanges",
  },
  {
    label: "Rating",
    value: currentUser.rating,
    icon: TrendingUp,
    href: "/profile",
  },
];

const recentActivity = [
  {
    id: "1",
    type: "exchange",
    text: "Exchange completed with Malika N.",
    book: "Atomic Habits ↔ The Little Prince",
    time: "2 days ago",
  },
  {
    id: "2",
    type: "add",
    text: "New book added",
    book: "1984 — George Orwell",
    time: "5 days ago",
  },
  {
    id: "3",
    type: "exchange",
    text: "Exchange request received from Sarvar R.",
    book: "Sapiens",
    time: "1 week ago",
  },
];

const activityColors: Record<string, string> = {
  exchange: "bg-green-50 text-green-600 border-green-200",
  add: "bg-blue-50 text-blue-600 border-blue-200",
};

const activityIcons: Record<string, React.ReactNode> = {
  exchange: <ArrowLeftRight size={14} />,
  add: <Plus size={14} />,
};

export default function DashboardHomePage() {
  const recommendedBooks = mockBooks
    .filter((b) => b.owner.id !== currentUser.id)
    .slice(0, 6);

  return (
    <div>
      <div>
        {/* Greeting */}
        <div className="mb-8">
          <h2 className="font-serif text-3xl text-foreground mb-1">
            Happy reading, {currentUser.name.split(" ")[0]} 👋
          </h2>
          <p className="text-muted-foreground">
            Here`s what`s happening with your books today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, href }) => (
            <Link key={label} href={href}>
              <div className="bg-card border border-border rounded-2xl p-5 hover:border-accent/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <div className="w-8 h-8 bg-background border border-border rounded-lg flex items-center justify-center">
                    <Icon size={15} className="text-muted-foreground" />
                  </div>
                </div>
                <div className="font-serif text-3xl text-foreground">
                  {value}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommended books */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">
                Recommended for you
              </h3>
              <Link
                href="/catalog"
                className="text-sm text-accent hover:underline flex items-center gap-1"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {recommendedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Quick actions */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-medium text-foreground mb-4">
                Quick actions
              </h3>
              <div className="flex flex-col gap-2">
                <Link
                  href="/my-books/add"
                  className="flex items-center gap-3 px-4 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
                >
                  <Plus size={16} />
                  Add a new book
                </Link>
                <Link
                  href="/catalog"
                  className="flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground hover:border-accent/50 transition-colors"
                >
                  <BookOpen size={16} className="text-muted-foreground" />
                  Browse catalog
                </Link>
                <Link
                  href="/exchanges"
                  className="flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground hover:border-accent/50 transition-colors"
                >
                  <ArrowLeftRight size={16} className="text-muted-foreground" />
                  My exchanges
                </Link>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-medium text-foreground mb-4">
                Recent activity
              </h3>
              <div className="flex flex-col gap-3">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${activityColors[item.type]}`}
                    >
                      {activityIcons[item.type]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-foreground leading-snug">
                        {item.text}
                      </p>
                      <p className="text-xs text-accent mt-0.5 truncate">
                        {item.book}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
