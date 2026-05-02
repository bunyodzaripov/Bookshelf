"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Post } from "@/@types";

const categoryStyles: Record<string, string> = {
  Recommendations: "bg-green-50 text-green-700 border-green-200",
  Questions: "bg-blue-50 text-blue-700 border-blue-200",
  Discussions: "bg-accent/10 text-accent border-accent/20",
  News: "bg-pink-50 text-pink-700 border-pink-200",
  Clubs: "bg-purple-50 text-purple-700 border-purple-200",
};

interface PostCardProps {
  post: Post;
  isLoggedIn: boolean;
}

export default function PostCard({ post, isLoggedIn }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (!isLoggedIn) return;
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div className="bg-background border border-border rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-sm font-medium text-foreground shrink-0">
            {post.author.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-foreground">
                {post.author.name}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border ${
                  categoryStyles[post.category] ??
                  "bg-card text-muted-foreground border-border"
                }`}
              >
                {post.category}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">
                {post.author.city}
              </span>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-xs text-muted-foreground">
                {post.createdAt}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-foreground leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Attached book */}
      {post.book && (
        <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-3 mb-4 hover:border-accent/40 transition-colors cursor-pointer">
          <div className="w-10 h-14 bg-background border border-border rounded-lg flex items-center justify-center text-xl shrink-0">
            📚
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {post.book.title}
            </p>
            <p className="text-xs text-muted-foreground">{post.book.author}</p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-border">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            liked
              ? "text-red-500 bg-red-50"
              : "text-muted-foreground hover:bg-card"
          } ${!isLoggedIn ? "cursor-default" : "cursor-pointer"}`}
        >
          <Heart size={15} className={liked ? "fill-red-500" : ""} />
          {likesCount}
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-card transition-colors"
        >
          <MessageCircle size={15} />
          {post.commentsCount}
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-card transition-colors">
          <Share2 size={15} />
          Share
        </button>

        <button
          onClick={() => isLoggedIn && setSaved(!saved)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ml-auto ${
            saved ? "text-accent" : "text-muted-foreground hover:bg-card"
          }`}
        >
          <Bookmark size={15} className={saved ? "fill-accent" : ""} />
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
          {post.comments?.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                {comment.author.name.charAt(0)}
              </div>
              <div className="flex-1 bg-card rounded-xl rounded-tl-none px-3 py-2">
                <p className="text-xs font-medium text-foreground mb-1">
                  {comment.author.name}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}

          {isLoggedIn ? (
            <div className="flex gap-3 mt-1">
              <div className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-xs font-medium text-foreground shrink-0">
                U
              </div>
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-1 bg-card border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent transition-colors"
              />
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-1">
              <a href="/login" className="text-accent hover:underline">
                Sign in
              </a>{" "}
              to leave a comment
            </p>
          )}
        </div>
      )}
    </div>
  );
}
