import { Book, User, Post, Club, Trend } from "@/@types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Jasur Toshmatov",
    username: "jasur_reads",
    city: "Tashkent",
    rating: 4.9,
    booksCount: 23,
    exchangesCount: 18,
    joinedAt: "2023-03-15",
  },
  {
    id: "2",
    name: "Malika Nazarova",
    username: "malika_n",
    city: "Samarkand",
    rating: 4.7,
    booksCount: 15,
    exchangesCount: 12,
    joinedAt: "2023-07-22",
  },
  {
    id: "3",
    name: "Sarvar Rahimov",
    username: "sarvar_r",
    city: "Namangan",
    rating: 4.5,
    booksCount: 9,
    exchangesCount: 7,
    joinedAt: "2024-01-10",
  },
  {
    id: "4",
    name: "Dilnoza Yusupova",
    username: "dilnoza_y",
    city: "Tashkent",
    rating: 4.8,
    booksCount: 17,
    exchangesCount: 14,
    joinedAt: "2023-11-05",
  },
];

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "O'tkan Kunlar",
    author: "Abdulla Qodiriy",
    genre: "Novel",
    language: "Uzbek",
    publishedYear: 1925,
    pages: 384,
    description:
      "A masterpiece of Uzbek literature. The story of Otabek and Kumush's love, set against the backdrop of 19th century Central Asia.",
    condition: "good",
    type: "both",
    price: 25000,
    city: "Tashkent",
    owner: mockUsers[0],
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    language: "Uzbek",
    publishedYear: 2018,
    pages: 320,
    description:
      "A practical guide to building good habits and breaking bad ones. Small changes that lead to remarkable results.",
    condition: "good",
    type: "swap",
    city: "Tashkent",
    owner: mockUsers[0],
    createdAt: "2025-01-12",
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    language: "Russian",
    publishedYear: 2011,
    pages: 512,
    description:
      "A brief history of humankind. How Homo sapiens came to rule the world and what the future holds.",
    condition: "good",
    type: "sell",
    price: 50000,
    city: "Samarkand",
    owner: mockUsers[1],
    createdAt: "2025-01-14",
  },
  {
    id: "4",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Novel",
    language: "Uzbek",
    publishedYear: 1988,
    pages: 208,
    description:
      "A magical story about a young shepherd's journey to find his treasure and follow his dreams.",
    condition: "new",
    type: "swap",
    city: "Tashkent",
    owner: mockUsers[0],
    createdAt: "2025-01-15",
  },
  {
    id: "5",
    title: "1984",
    author: "George Orwell",
    genre: "Novel",
    language: "English",
    publishedYear: 1949,
    pages: 328,
    description:
      "A dystopian novel about a totalitarian society where Big Brother watches everyone.",
    condition: "fair",
    type: "both",
    price: 28000,
    city: "Tashkent",
    owner: mockUsers[1],
    createdAt: "2025-01-16",
  },
  {
    id: "6",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    genre: "Novel",
    language: "Uzbek",
    publishedYear: 1943,
    pages: 96,
    description:
      "A poetic tale about a little prince who travels the universe. Written for children but loved by adults.",
    condition: "good",
    type: "swap",
    city: "Namangan",
    owner: mockUsers[2],
    createdAt: "2025-01-17",
  },
  {
    id: "7",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    genre: "Finance",
    language: "Uzbek",
    publishedYear: 1997,
    pages: 272,
    description:
      "What the rich teach their kids about money that the poor and middle class do not.",
    condition: "good",
    type: "sell",
    price: 45000,
    city: "Tashkent",
    owner: mockUsers[1],
    createdAt: "2025-01-18",
  },
  {
    id: "8",
    title: "Sherlock Holmes",
    author: "Arthur Conan Doyle",
    genre: "Detective",
    language: "Uzbek",
    publishedYear: 1892,
    pages: 448,
    description:
      "A collection of the best adventures of the legendary detective Sherlock Holmes.",
    condition: "good",
    type: "swap",
    city: "Tashkent",
    owner: mockUsers[0],
    createdAt: "2025-01-19",
  },
  {
    id: "9",
    title: "Mehrobdan Chayon",
    author: "Abdulla Qodiriy",
    genre: "Novel",
    language: "Uzbek",
    publishedYear: 1929,
    pages: 296,
    description:
      "A classic Uzbek novel depicting the tragic love story and social struggles of the early 20th century.",
    condition: "fair",
    type: "free",
    city: "Samarkand",
    owner: mockUsers[1],
    createdAt: "2025-01-20",
  },
  {
    id: "10",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Psychology",
    language: "Russian",
    publishedYear: 2011,
    pages: 499,
    description:
      "How two systems of thinking shape our judgments and decisions in everyday life.",
    condition: "good",
    type: "both",
    price: 55000,
    city: "Tashkent",
    owner: mockUsers[3],
    createdAt: "2025-01-21",
  },
  {
    id: "11",
    title: "Daftar Hoshiyasida",
    author: "O'tkir Hoshimov",
    genre: "Novel",
    language: "Uzbek",
    publishedYear: 1994,
    pages: 248,
    description:
      "A touching story about life, love, and the human spirit written by one of the greatest Uzbek writers.",
    condition: "good",
    type: "swap",
    city: "Tashkent",
    owner: mockUsers[3],
    createdAt: "2025-01-22",
  },
  {
    id: "12",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    language: "English",
    publishedYear: 2020,
    pages: 256,
    description:
      "Timeless lessons on wealth, greed, and happiness. How to think about money in a smarter way.",
    condition: "new",
    type: "sell",
    price: 60000,
    city: "Tashkent",
    owner: mockUsers[0],
    createdAt: "2025-01-23",
  },
];

export const GENRES: string[] = [
  "Novel",
  "History",
  "Science",
  "Self-help",
  "Finance",
  "Psychology",
  "Detective",
  "Fantasy",
  "Biography",
  "Children",
  "Poetry",
];

export const LANGUAGES: string[] = ["Uzbek", "Russian", "English", "Other"];

export const CITIES: string[] = [
  "Tashkent",
  "Samarkand",
  "Bukhara",
  "Namangan",
  "Andijan",
  "Fergana",
  "Qarshi",
];

export const CONDITIONS: { value: Book["condition"]; label: string }[] = [
  { value: "new", label: "New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "worn", label: "Worn" },
];

export const TYPES: { value: Book["type"]; label: string }[] = [
  { value: "swap", label: "Swap" },
  { value: "sell", label: "Sell" },
  { value: "both", label: "Swap & Sell" },
  { value: "free", label: "Free" },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    author: mockUsers[0],
    category: "Recommendations",
    content:
      'Just finished "Sapiens" and it completely changed my perspective on human history! Highly recommend it to everyone. Has anyone read "Homo Deus" yet? Is it worth it?',
    book: { title: "Sapiens", author: "Yuval Noah Harari" },
    likesCount: 24,
    commentsCount: 8,
    comments: [
      {
        id: "c1",
        author: mockUsers[1],
        content: "Yes! Homo Deus is even more mind-blowing. Read it next!",
        createdAt: "2 hours ago",
      },
      {
        id: "c2",
        author: mockUsers[2],
        content: "Sapiens is on my list. Thanks for the push!",
        createdAt: "1 hour ago",
      },
    ],
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    author: mockUsers[3],
    category: "Questions",
    content:
      "Looking for good Uzbek-language books for kids aged 8-12. Preferably adventure or fantasy. Any recommendations from the community?",
    likesCount: 11,
    commentsCount: 15,
    comments: [
      {
        id: "c3",
        author: mockUsers[0],
        content:
          'Try "Kichkina Shahzoda" — timeless classic for that age group.',
        createdAt: "3 hours ago",
      },
    ],
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    author: mockUsers[2],
    category: "Discussions",
    content:
      '"O\'tkan Kunlar" vs "Mehrobdan Chayon" — which one is better? I personally lean towards O\'tkan Kunlar for its depth, but Mehrobdan Chayon hits harder emotionally. What do you think?',
    likesCount: 38,
    commentsCount: 22,
    comments: [
      {
        id: "c4",
        author: mockUsers[1],
        content:
          "O'tkan Kunlar for the historical richness. Mehrobdan Chayon for the drama!",
        createdAt: "1 day ago",
      },
    ],
    createdAt: "1 day ago",
  },
  {
    id: "4",
    author: mockUsers[1],
    category: "News",
    content:
      'Classic Literature Club monthly book is "Daftar Hoshiyasida" by O\'tkir Hoshimov. Discussion session will be held online on February 15th at 7:00 PM. All members are welcome!',
    book: { title: "Daftar Hoshiyasida", author: "O'tkir Hoshimov" },
    likesCount: 56,
    commentsCount: 14,
    createdAt: "2 days ago",
  },
  {
    id: "5",
    author: mockUsers[0],
    category: "Recommendations",
    content:
      "\"Atomic Habits\" by James Clear is an absolute game-changer. I've read it twice now and keep finding new insights. If you're trying to build better habits, this is the book.",
    book: { title: "Atomic Habits", author: "James Clear" },
    likesCount: 19,
    commentsCount: 6,
    createdAt: "3 days ago",
  },
];

export const mockClubs: Club[] = [
  { id: "1", name: "Classic Literature", icon: "📖", membersCount: 142 },
  { id: "2", name: "Science & History", icon: "🔬", membersCount: 89 },
  { id: "3", name: "Business & Finance", icon: "💼", membersCount: 214 },
  { id: "4", name: "Psychology", icon: "🧠", membersCount: 67 },
];

export const mockTrends: Trend[] = [
  { tag: "classiclit", count: 84 },
  { tag: "recommendations", count: 61 },
  { tag: "bookswap", count: 48 },
  { tag: "businessbooks", count: 37 },
  { tag: "monthlyread", count: 29 },
];

export const mockTopReaders: User[] = [
  { ...mockUsers[0], booksCount: 23 },
  { ...mockUsers[1], booksCount: 15 },
  { ...mockUsers[3], booksCount: 12 },
  { ...mockUsers[2], booksCount: 9 },
];
