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

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const AUTHOR_IMAGES: Record<string, string> = {
  "albert-einstein":     `${BASE}/authors/albert-einstein.jpg`,
  "steve-jobs":          `${BASE}/authors/steve-jobs.jpg`,
  "nelson-mandela":      `${BASE}/authors/nelson-mandela.jpg`,
  "ho-chi-minh":         `${BASE}/authors/ho-chi-minh.jpg`,
  "winston-churchill":   `${BASE}/authors/winston-churchill.jpg`,
  "marie-curie":         `${BASE}/authors/marie-curie.jpg`,
  "martin-luther-king":  `${BASE}/authors/martin-luther-king.jpg`,
  "abraham-lincoln":     `${BASE}/authors/abraham-lincoln.jpg`,
  "mark-twain":          `${BASE}/authors/mark-twain.jpg`,
  "thomas-edison":       `${BASE}/authors/thomas-edison.jpg`,
  "helen-keller":        `${BASE}/authors/helen-keller.jpg`,
  "maya-angelou":        `${BASE}/authors/maya-angelou.jpg`,
  "oprah-winfrey":       `${BASE}/authors/oprah-winfrey.jpg`,
  "paulo-coelho":        `${BASE}/authors/paulo-coelho.jpg`,
  "anne-frank":          `${BASE}/authors/anne-frank.jpg`,
  "dalai-lama":          `${BASE}/authors/dalai-lama.jpg`,
  "theodore-roosevelt":  `${BASE}/authors/theodore-roosevelt.jpg`,
  confucius:             `${BASE}/authors/confucius.jpg`,
  socrates:              `${BASE}/authors/socrates.jpg`,
  "marcus-aurelius":     `${BASE}/authors/marcus-aurelius.jpg`,
  rumi:                  `${BASE}/authors/rumi.jpg`,
  "nguyen-du":           `${BASE}/authors/nguyen-du.jpg`,
  "duc-phat":            `${BASE}/authors/duc-phat.jpg`,
  "lao-tu":              `${BASE}/authors/lao-tu.jpg`,
  "ralph-waldo-emerson": `${BASE}/authors/ralph-waldo-emerson.jpg`,
  "oscar-wilde":         `${BASE}/authors/oscar-wilde.jpg`,
  "pablo-picasso":       `${BASE}/authors/pablo-picasso.jpg`,
  "henry-david-thoreau": `${BASE}/authors/henry-david-thoreau.jpg`,
  "vincent-van-gogh":    `${BASE}/authors/vincent-van-gogh.jpg`,
  "khalil-gibran":       `${BASE}/authors/khalil-gibran.jpg`,
  aristotle:             `${BASE}/authors/aristotle.jpg`,
  seneca:                `${BASE}/authors/seneca.jpg`,
  epictetus:             `${BASE}/authors/epictetus.jpg`,
  "albert-camus":        `${BASE}/authors/albert-camus.jpg`,
  plato:                 `${BASE}/authors/plato.jpg`,
  "tran-hung-dao":       `${BASE}/authors/tran-hung-dao.jpg`,
  "nguyen-cong-tru":     `${BASE}/authors/nguyen-cong-tru.jpg`,
  "richard-branson":     `${BASE}/authors/richard-branson.jpg`,
};

export function getAuthorImage(authorSlug: string): string | undefined {
  return AUTHOR_IMAGES[authorSlug];
}

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
