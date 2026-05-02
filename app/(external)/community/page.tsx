"use client";

import { useState } from "react";
import { Search, TrendingUp, Users, BookOpen } from "lucide-react";
import Container from "@/components/ui/container";
import PostCard from "@/components/community/PostCard";
import {
  mockPosts,
  mockClubs,
  mockTrends,
  mockTopReaders,
} from "@/lib/mockData";

const TABS = [
  "All",
  "Recommendations",
  "Questions",
  "Discussions",
  "News",
  "Clubs",
];

// TODO: replace with real auth state
const isLoggedIn = false;

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = mockPosts.filter((post) => {
    if (activeTab !== "All" && post.category !== activeTab) return false;
    if (search && !post.content.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <section className="py-10">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-foreground mb-2">
            Community
          </h1>
          <p className="text-muted-foreground">
            Share thoughts, ask questions, discover new books with fellow
            readers
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2.5 mb-5 max-w-lg">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-sm whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? "text-accent border-accent font-medium"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Feed */}
          <div className="flex-1 min-w-0">
            {/* New post box */}
            {isLoggedIn ? (
              <div className="bg-background border border-border rounded-2xl p-4 mb-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-sm font-medium text-foreground shrink-0">
                  U
                </div>
                <div className="flex-1 bg-card border border-border rounded-full px-4 py-2 text-sm text-muted-foreground cursor-pointer hover:border-accent/40 transition-colors">
                  Share your thoughts...
                </div>
                <button className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full hover:bg-accent transition-colors shrink-0">
                  Post
                </button>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-4 mb-5 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Sign in to share your thoughts and join discussions
                </p>
                <a
                  href="/login"
                  className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-accent transition-colors shrink-0 ml-4"
                >
                  Sign in
                </a>
              </div>
            )}

            {/* Posts */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">📭</div>
                <p className="text-muted-foreground">No posts found.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((post) => (
                  <PostCard key={post.id} post={post} isLoggedIn={isLoggedIn} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
            {/* Clubs */}
            <div className="bg-background border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users size={15} className="text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">
                  Book clubs
                </h3>
              </div>
              <div className="flex flex-col gap-1">
                {mockClubs.map((club) => (
                  <div
                    key={club.id}
                    className="flex items-center gap-3 py-2.5 border-b border-border last:border-none"
                  >
                    <div className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center text-lg shrink-0">
                      {club.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {club.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {club.membersCount} members
                      </p>
                    </div>
                    <button className="text-xs text-accent border border-accent/30 px-2.5 py-1 rounded-full hover:bg-accent/10 transition-colors shrink-0">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trends */}
            <div className="bg-background border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={15} className="text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">
                  Trending topics
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {mockTrends.map((trend) => (
                  <div
                    key={trend.tag}
                    className="flex items-center justify-between py-1.5 cursor-pointer hover:text-accent transition-colors"
                  >
                    <span className="text-sm text-accent">#{trend.tag}</span>
                    <span className="text-xs text-muted-foreground">
                      {trend.count} posts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top readers */}
            <div className="bg-background border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={15} className="text-muted-foreground" />
                <h3 className="text-sm font-medium text-foreground">
                  Top readers
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {mockTopReaders.map((reader, index) => (
                  <div key={reader.id} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-accent w-4">
                      {index + 1}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                      {reader.name.charAt(0)}
                    </div>
                    <span className="text-sm text-foreground flex-1 truncate">
                      {reader.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {reader.booksCount} 📚
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
