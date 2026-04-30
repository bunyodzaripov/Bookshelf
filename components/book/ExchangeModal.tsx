"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Book } from "@/@types";
import { mockBooks, mockUsers } from "@/lib/mockData";

interface ExchangeModalProps {
  requestedBook: Book;
  onClose: () => void;
}

const MEETING_PLACES = [
  "Chilonzor metro",
  "Yunusobod",
  "Pochtamt",
  "Mustaqillik maydoni",
];

// TODO: replace with real logged in user's books
const myBooks = mockBooks.filter((b) => b.owner.id === mockUsers[0].id);

export default function ExchangeModal({
  requestedBook,
  onClose,
}: ExchangeModalProps) {
  const [selectedBookId, setSelectedBookId] = useState<string>(
    myBooks[0]?.id ?? "",
  );
  const [message, setMessage] = useState("");
  const [meetingPlace, setMeetingPlace] = useState(MEETING_PLACES[0]);

  const selectedBook = myBooks.find((b) => b.id === selectedBookId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-background border border-border rounded-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div>
            <h2 className="font-medium text-foreground">Exchange request</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              Which book would you like to offer?
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-card transition-colors"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Requested book */}
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
            <div className="w-12 h-16 bg-background border border-border rounded-lg flex items-center justify-center text-2xl shrink-0">
              📚
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                You are requesting
              </p>
              <p className="text-sm font-medium text-foreground">
                {requestedBook.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {requestedBook.author}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Owner: {requestedBook.owner.name}
              </p>
            </div>
          </div>

          {/* My books */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Select your book to offer
            </p>
            <div className="grid grid-cols-2 gap-2">
              {myBooks.map((book) => (
                <button
                  key={book.id}
                  onClick={() => setSelectedBookId(book.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-colors ${
                    selectedBookId === book.id
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card hover:border-accent/40"
                  }`}
                >
                  <div className="w-9 h-12 bg-background border border-border rounded flex items-center justify-center text-lg shrink-0">
                    📚
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {book.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {book.author}
                    </p>
                  </div>
                  <div
                    className={`ml-auto w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                      selectedBookId === book.id
                        ? "bg-accent border-accent"
                        : "border-border"
                    }`}
                  >
                    {selectedBookId === book.id && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Exchange preview */}
          {selectedBook && (
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xl">📚</span>
                <div>
                  <p className="text-xs text-muted-foreground">Your book</p>
                  <p className="text-xs font-medium text-foreground">
                    {selectedBook.title}
                  </p>
                </div>
              </div>
              <span className="text-accent font-medium text-lg">⇄</span>
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xl">📚</span>
                <div>
                  <p className="text-xs text-muted-foreground">Their book</p>
                  <p className="text-xs font-medium text-foreground">
                    {requestedBook.title}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Write a message to ${requestedBook.owner.name}...`}
              rows={3}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent resize-none"
            />
          </div>

          {/* Meeting place */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
              Meeting place
            </label>
            <div className="flex flex-wrap gap-2">
              {MEETING_PLACES.map((place) => (
                <button
                  key={place}
                  onClick={() => setMeetingPlace(place)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    meetingPlace === place
                      ? "bg-accent text-white border-accent"
                      : "bg-card border-border text-foreground hover:border-accent/40"
                  }`}
                >
                  {place}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <span className="text-green-600 text-sm mt-0.5">ℹ</span>
            <p className="text-xs text-green-700 leading-relaxed">
              After sending, {requestedBook.owner.name} has 48 hours to respond.
              You will be notified when they reply.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-card/50">
          <span className="text-xs text-muted-foreground">
            Free · No payment required
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button className="bg-accent text-white text-sm px-5 py-2 rounded-full hover:bg-accent/90 transition-colors font-medium">
              Send request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
