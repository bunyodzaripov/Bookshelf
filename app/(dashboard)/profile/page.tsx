"use client";

import { useState } from "react";
import {
  MapPin,
  Star,
  BookOpen,
  ArrowLeftRight,
  Pencil,
  Camera,
} from "lucide-react";
import BookCard from "@/components/book/BookCard";
import { mockBooks, mockUsers } from "@/lib/mockData";

const currentUser = mockUsers[0];

const TABS = ["My Books", "Activity", "Reviews"];

const mockReviews = [
  {
    id: "1",
    author: mockUsers[1],
    rating: 5,
    comment: "Great exchange! Book was in perfect condition. Highly recommend!",
    createdAt: "3 days ago",
  },
  {
    id: "2",
    author: mockUsers[2],
    rating: 5,
    comment: "Very friendly and punctual. Will definitely exchange again!",
    createdAt: "1 week ago",
  },
  {
    id: "3",
    author: mockUsers[3],
    rating: 4,
    comment: "Smooth exchange, good communication.",
    createdAt: "2 weeks ago",
  },
];

const mockActivity = [
  {
    id: "1",
    type: "exchange",
    text: "Exchange completed with Malika N.",
    detail: "Atomic Habits ↔ The Little Prince",
    time: "2 days ago",
  },
  {
    id: "2",
    type: "add",
    text: "Added a new book",
    detail: "1984 — George Orwell",
    time: "5 days ago",
  },
  {
    id: "3",
    type: "exchange",
    text: "Exchange completed with Sarvar R.",
    detail: "Sherlock Holmes ↔ Rich Dad Poor Dad",
    time: "1 week ago",
  },
  {
    id: "4",
    type: "add",
    text: "Added a new book",
    detail: "The Alchemist — Paulo Coelho",
    time: "2 weeks ago",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("My Books");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(
    "Book lover from Tashkent. I enjoy history, psychology and classic Uzbek literature. Always happy to swap!",
  );

  const myBooks = mockBooks.filter((b) => b.owner.id === currentUser.id);
  const avgRating = (
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length
  ).toFixed(1);

  return (
    <>
      {/* Profile header */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
        {/* Cover */}
        <div className="h-28 bg-linear-to-r from-accent/20 via-accent/10 to-background relative">
          <button className="absolute top-3 right-3 w-8 h-8 bg-background/80 border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Camera size={15} />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-accent border-4 border-card flex items-center justify-center text-2xl font-semibold text-white">
                {currentUser.name.charAt(0)}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-background border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent transition-colors">
                <Camera size={12} />
              </button>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 border border-border text-foreground px-4 py-2 rounded-xl text-sm hover:border-accent hover:text-accent transition-colors"
            >
              <Pencil size={14} />
              Edit profile
            </button>
          </div>

          {/* Info */}
          <div className="mb-4">
            <h2 className="font-serif text-2xl text-foreground mb-0.5">
              {currentUser.name}
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              @{currentUser.username}
            </p>

            {isEditing ? (
              <div className="flex flex-col gap-2">
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent resize-none max-w-lg"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-accent/90 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="border border-border text-muted-foreground px-4 py-2 rounded-xl text-sm hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                {bio}
              </p>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 flex-wrap mb-5">
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin size={14} />
              {currentUser.city}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              {avgRating} rating
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <BookOpen size={14} />
              Member since {currentUser.joinedAt.slice(0, 4)}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="font-serif text-2xl text-foreground">
                {currentUser.booksCount}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Books</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="font-serif text-2xl text-foreground">
                {currentUser.exchangesCount}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Exchanges</p>
            </div>
            <div className="text-center">
              <p className="font-serif text-2xl text-foreground">
                {mockReviews.length}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">Reviews</p>
            </div>
          </div>
        </div>
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

      {/* Tab content */}
      {activeTab === "My Books" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {myBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {activeTab === "Activity" && (
        <div className="flex flex-col gap-3 max-w-lg">
          {mockActivity.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-start bg-card border border-border rounded-2xl p-4"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === "exchange"
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-blue-50 text-blue-600 border border-blue-200"
                }`}
              >
                {item.type === "exchange" ? (
                  <ArrowLeftRight size={15} />
                ) : (
                  <BookOpen size={15} />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-foreground">{item.text}</p>
                <p className="text-xs text-accent mt-0.5">{item.detail}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Reviews" && (
        <div className="flex flex-col gap-4 max-w-lg">
          {/* Rating summary */}
          <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-6">
            <div className="text-center">
              <p className="font-serif text-4xl text-foreground">{avgRating}</p>
              <div className="flex items-center gap-0.5 justify-center mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={12}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {mockReviews.length} reviews
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = mockReviews.filter(
                  (r) => r.rating === star,
                ).length;
                const pct = (count / mockReviews.length) * 100;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-3">
                      {star}
                    </span>
                    <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-3">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Review list */}
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border border-border rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-sm font-medium text-foreground">
                  {review.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {review.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.createdAt}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className={
                        s <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-border"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
