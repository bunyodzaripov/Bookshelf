export type BookCondition = "new" | "good" | "fair" | "worn";
export type BookType = "swap" | "sell" | "both" | "free";

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
