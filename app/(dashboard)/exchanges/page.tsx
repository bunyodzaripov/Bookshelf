"use client";

import { useState } from "react";
import { ArrowLeftRight, Check, X, Clock } from "lucide-react";
import { mockBooks, mockUsers } from "@/lib/mockData";
import { ExchangeRequest } from "@/@types";

const currentUser = mockUsers[0];

// Mock exchange requests
const mockExchanges: ExchangeRequest[] = [
  {
    id: "1",
    from: mockUsers[1],
    to: currentUser,
    offeredBook: mockBooks[2], // Sapiens
    requestedBook: mockBooks[0], // O'tkan Kunlar
    message:
      "Hi! I'd love to swap Sapiens for O'tkan Kunlar. Both in good condition!",
    meetingPlace: "Chilonzor metro",
    status: "pending",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    from: mockUsers[2],
    to: currentUser,
    offeredBook: mockBooks[5], // The Little Prince
    requestedBook: mockBooks[1], // Atomic Habits
    message: "Would love to exchange The Little Prince for Atomic Habits!",
    meetingPlace: "Yunusobod",
    status: "pending",
    createdAt: "3 days ago",
  },
  {
    id: "3",
    from: currentUser,
    to: mockUsers[3],
    offeredBook: mockBooks[3], // The Alchemist
    requestedBook: mockBooks[9], // Thinking Fast and Slow
    message: "Hi Dilnoza! I have The Alchemist in great condition.",
    meetingPlace: "Pochtamt",
    status: "accepted",
    createdAt: "1 week ago",
  },
  {
    id: "4",
    from: currentUser,
    to: mockUsers[1],
    offeredBook: mockBooks[7], // Sherlock Holmes
    requestedBook: mockBooks[2], // Sapiens
    status: "rejected",
    createdAt: "2 weeks ago",
  },
];

const TABS = ["All", "Incoming", "Outgoing", "Accepted", "Rejected"];

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  accepted: {
    label: "Accepted",
    icon: Check,
    className: "bg-green-50 text-green-700 border-green-200",
  },
  rejected: {
    label: "Rejected",
    icon: X,
    className: "bg-red-50 text-red-500 border-red-200",
  },
};

export default function ExchangesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = mockExchanges.filter((ex) => {
    if (activeTab === "Incoming")
      return ex.to.id === currentUser.id && ex.status === "pending";
    if (activeTab === "Outgoing")
      return ex.from.id === currentUser.id && ex.status === "pending";
    if (activeTab === "Accepted") return ex.status === "accepted";
    if (activeTab === "Rejected") return ex.status === "rejected";
    return true;
  });

  const incomingCount = mockExchanges.filter(
    (ex) => ex.to.id === currentUser.id && ex.status === "pending",
  ).length;

  return (
    <>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Incoming requests",
            value: incomingCount,
            color: "text-yellow-600",
          },
          {
            label: "Completed",
            value: mockExchanges.filter((e) => e.status === "accepted").length,
            color: "text-green-600",
          },
          {
            label: "Total exchanges",
            value: mockExchanges.length,
            color: "text-foreground",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-2xl p-4"
          >
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`font-serif text-2xl font-medium ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-6">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px flex items-center gap-2 ${
              activeTab === tab
                ? "text-accent border-accent font-medium"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            {tab}
            {tab === "Incoming" && incomingCount > 0 && (
              <span className="bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {incomingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center mb-4">
            <ArrowLeftRight size={28} className="text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">No exchanges yet</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Browse the catalog and send exchange requests to other readers.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((ex) => {
            const isIncoming = ex.to.id === currentUser.id;
            const status = statusConfig[ex.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={ex.id}
                className="bg-card border border-border rounded-2xl p-5"
              >
                <div className="flex flex-col sm:flex-row gap-5">
                  {/* Books exchange visual */}
                  <div className="flex items-center gap-3 flex-1">
                    {/* Offered book */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-16 bg-background border border-border rounded-xl flex items-center justify-center text-2xl shrink-0">
                        📚
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {isIncoming ? `${ex.from.name} offers` : "You offer"}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {ex.offeredBook.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {ex.offeredBook.author}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="shrink-0 w-8 h-8 bg-background border border-border rounded-lg flex items-center justify-center">
                      <ArrowLeftRight
                        size={14}
                        className="text-muted-foreground"
                      />
                    </div>

                    {/* Requested book */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-12 h-16 bg-background border border-border rounded-xl flex items-center justify-center text-2xl shrink-0">
                        📚
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {isIncoming ? "Wants your" : `${ex.to.name}'s book`}
                        </p>
                        <p className="text-sm font-medium text-foreground truncate">
                          {ex.requestedBook.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {ex.requestedBook.author}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex flex-col justify-between gap-3 sm:w-48 shrink-0">
                    <div>
                      {/* Status */}
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${status.className}`}
                      >
                        <StatusIcon size={11} />
                        {status.label}
                      </span>

                      {/* Meta */}
                      <div className="mt-2 space-y-1">
                        <p className="text-xs text-muted-foreground">
                          {isIncoming ? "↙ Incoming" : "↗ Outgoing"} ·{" "}
                          {ex.createdAt}
                        </p>
                        {ex.meetingPlace && (
                          <p className="text-xs text-muted-foreground">
                            📍 {ex.meetingPlace}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {ex.status === "pending" && isIncoming && (
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 bg-accent text-white py-2 rounded-xl text-xs font-medium hover:bg-accent/90 transition-colors">
                          <Check size={13} />
                          Accept
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1.5 border border-border text-muted-foreground py-2 rounded-xl text-xs hover:border-red-300 hover:text-red-500 transition-colors">
                          <X size={13} />
                          Decline
                        </button>
                      </div>
                    )}

                    {ex.status === "pending" && !isIncoming && (
                      <button className="w-full border border-border text-muted-foreground py-2 rounded-xl text-xs hover:border-red-300 hover:text-red-500 transition-colors">
                        Cancel request
                      </button>
                    )}
                  </div>
                </div>

                {/* Message */}
                {ex.message && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground italic">
                      `{ex.message}`
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
