import quotesData from "@/data/quotes.json";
import type { Quote, QuoteCategory, CategoryMeta } from "@/types";

export const QUOTES: Quote[] = quotesData.quotes as Quote[];

export const CATEGORY_META: Record<QuoteCategory, CategoryMeta> = {
  success: {
    slug: "success",
    labelVi: "Thành Công",
    labelEn: "Success",
    gradient: "from-emerald-900 via-teal-800 to-cyan-900",
    gradientFrom: "from-emerald-500",
    icon: "🏆",
  },
  life: {
    slug: "life",
    labelVi: "Cuộc Sống",
    labelEn: "Life",
    gradient: "from-violet-900 via-purple-800 to-fuchsia-900",
    gradientFrom: "from-violet-500",
    icon: "🌿",
  },
  perseverance: {
    slug: "perseverance",
    labelVi: "Kiên Trì",
    labelEn: "Perseverance",
    gradient: "from-orange-900 via-red-800 to-rose-900",
    gradientFrom: "from-orange-500",
    icon: "⚡",
  },
  happiness: {
    slug: "happiness",
    labelVi: "Hạnh Phúc",
    labelEn: "Happiness",
    gradient: "from-yellow-800 via-amber-700 to-orange-800",
    gradientFrom: "from-yellow-500",
    icon: "✨",
  },
  wisdom: {
    slug: "wisdom",
    labelVi: "Trí Tuệ",
    labelEn: "Wisdom",
    gradient: "from-blue-900 via-indigo-800 to-violet-900",
    gradientFrom: "from-blue-500",
    icon: "📖",
  },
  motivation: {
    slug: "motivation",
    labelVi: "Động Lực",
    labelEn: "Motivation",
    gradient: "from-pink-900 via-rose-800 to-red-900",
    gradientFrom: "from-pink-500",
    icon: "🔥",
  },
  love: {
    slug: "love",
    labelVi: "Tình Yêu",
    labelEn: "Love",
    gradient: "from-rose-900 via-pink-800 to-fuchsia-900",
    gradientFrom: "from-rose-500",
    icon: "💫",
  },
  courage: {
    slug: "courage",
    labelVi: "Can Đảm",
    labelEn: "Courage",
    gradient: "from-slate-900 via-zinc-800 to-neutral-900",
    gradientFrom: "from-slate-500",
    icon: "🦁",
  },
};

export function getDailyQuote(): Quote {
  const seed = Math.floor(Date.now() / 86_400_000);
  const index = seed % QUOTES.length;
  return QUOTES[index];
}

export function getRandomQuote(excludeId?: string): Quote {
  const pool = excludeId ? QUOTES.filter((q) => q.id !== excludeId) : QUOTES;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getQuoteById(id: string): Quote | undefined {
  return QUOTES.find((q) => q.id === id);
}

export function getByCategory(category: QuoteCategory): Quote[] {
  return QUOTES.filter((q) => q.categories.includes(category));
}

export function getQuoteCount(category: QuoteCategory): number {
  return getByCategory(category).length;
}

export function getFeaturedQuotes(): Quote[] {
  return QUOTES.filter((q) => q.featured);
}

export function getAllCategories(): QuoteCategory[] {
  return Object.keys(CATEGORY_META) as QuoteCategory[];
}
