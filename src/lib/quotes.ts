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

export const AUTHOR_IMAGES: Record<string, string> = {
  "albert-einstein":
    "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
  "steve-jobs":
    "https://upload.wikimedia.org/wikipedia/commons/b/b9/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
  "nelson-mandela":
    "https://upload.wikimedia.org/wikipedia/commons/0/02/Nelson_Mandela_1994.jpg",
  "ho-chi-minh":
    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Ho_Chi_Minh_1946.jpg",
  "winston-churchill":
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Sir_Winston_Churchill_-_19086236948.jpg",
  "marie-curie":
    "https://upload.wikimedia.org/wikipedia/commons/7/7e/Marie_Curie_c1920.jpg",
  "martin-luther-king":
    "https://upload.wikimedia.org/wikipedia/commons/0/05/Martin_Luther_King%2C_Jr..jpg",
  "abraham-lincoln":
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg",
  "mark-twain":
    "https://upload.wikimedia.org/wikipedia/commons/0/0c/Mark_Twain_by_AF_Bradley.jpg",
  "thomas-edison":
    "https://upload.wikimedia.org/wikipedia/commons/9/9d/Thomas_Edison2.jpg",
  "helen-keller":
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Anne_Sullivan_and_Helen_Keller.jpg",
  "maya-angelou":
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/MayaAngelou-2013.jpg",
  "oprah-winfrey":
    "https://upload.wikimedia.org/wikipedia/commons/b/bf/Oprah_in_2014.jpg",
  "paulo-coelho":
    "https://upload.wikimedia.org/wikipedia/commons/1/10/Paulo_Coelho.jpg",
  "anne-frank":
    "https://upload.wikimedia.org/wikipedia/commons/b/be/Anne_Frank_1940.jpg",
  "dalai-lama":
    "https://upload.wikimedia.org/wikipedia/commons/6/64/Dalailama1_20121014_4639.jpg",
  "theodore-roosevelt":
    "https://upload.wikimedia.org/wikipedia/commons/1/19/President_Theodore_Roosevelt%2C_1904.jpg",
  confucius:
    "https://upload.wikimedia.org/wikipedia/commons/2/23/Confucius_Tang_Dynasty.jpg",
  socrates:
    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Socrates_Louvre.jpg",
  "marcus-aurelius":
    "https://upload.wikimedia.org/wikipedia/commons/e/ec/MSR-ra-1-1-della_colonna_di_marco_aurelio.jpg",
  rumi: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Mevlana_%28cropped%29.jpg",
  "nguyen-du":
    "https://upload.wikimedia.org/wikipedia/vi/0/00/Nguyen_Du.jpg",
  "van-cao":
    "https://upload.wikimedia.org/wikipedia/vi/e/e3/Composer_Van_Cao.jpg",
  "duc-phat":
    "https://upload.wikimedia.org/wikipedia/commons/f/f9/Buddhamurti.jpg",
  "lao-tu":
    "https://upload.wikimedia.org/wikipedia/commons/e/ee/Lao_Tzu_-_Project_Gutenberg_eText_15250.jpg",
  "ralph-waldo-emerson":
    "https://upload.wikimedia.org/wikipedia/commons/d/d5/Ralph_Waldo_Emerson_ca1857_retouched.jpg",
  "oscar-wilde":
    "https://upload.wikimedia.org/wikipedia/commons/a/a2/Oscar_Wilde_portrait.jpg",
  "pablo-picasso":
    "https://upload.wikimedia.org/wikipedia/commons/9/98/Pablo_picasso_1.jpg",
  "henry-david-thoreau":
    "https://upload.wikimedia.org/wikipedia/commons/a/a2/Henry_David_Thoreau.jpg",
  "vincent-van-gogh":
    "https://upload.wikimedia.org/wikipedia/commons/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg",
  "khalil-gibran":
    "https://upload.wikimedia.org/wikipedia/commons/7/72/Kahlil_Gibran_1913.jpg",
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
