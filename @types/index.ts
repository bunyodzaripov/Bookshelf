export type BookCondition = "new" | "good" | "fair" | "worn";
export type BookType = "swap" | "sell" | "both" | "free";

// user interface
export interface User {
  id: string;
  name: string;
  username: string;
  city: string;
  rating: number;
  booksCount: number;
  exchangesCount: number;
  joinedAt: string;
  avatar?: string; // Ixtiyoriy profil rasmi uchun
}

// book interface
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  publishedYear: number;
  pages: number;
  description: string;
  condition: BookCondition;
  type: BookType;
  price?: number; // Faqat 'sell' yoki 'both' bo'lsa kerak bo'ladi
  city: string;
  owner: User;
  createdAt: string;
  image?: string; // Kitob muqovasi uchun
}

export interface GenreOption {
  label: string;
  value: string;
}

export interface SelectOption<T> {
  value: T;
  label: string;
}

export interface ExchangeRequest {
  id: string;
  from: User;
  to: User;
  offeredBook: Book;
  requestedBook: Book;
  message?: string;
  meetingPlace?: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

// post interface
export interface Review {
  id: string;
  author: User;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: User;
  category: "Recommendations" | "Questions" | "Discussions" | "News" | "Clubs";
  content: string;
  book?: { title: string; author: string };
  likesCount: number;
  commentsCount: number;
  comments?: Comment[];
  createdAt: string;
}

export interface Club {
  id: string;
  name: string;
  icon: string;
  membersCount: number;
  description?: string;
}

export interface Trend {
  tag: string;
  count: number;
}
