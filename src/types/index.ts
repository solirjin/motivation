export type QuoteCategory =
  | "success"
  | "life"
  | "perseverance"
  | "happiness"
  | "wisdom"
  | "motivation"
  | "love"
  | "courage";

export interface Quote {
  id: string;
  text: string;
  author: string;
  authorSlug: string;
  language: "vi" | "en";
  categories: QuoteCategory[];
  translation?: string;
  source?: string;
  featured?: boolean;
}

export interface CategoryMeta {
  slug: QuoteCategory;
  labelVi: string;
  labelEn: string;
  gradient: string;
  gradientFrom: string;
  icon: string;
}

export interface FavoritesStore {
  ids: string[];
  savedAt: Record<string, number>;
}
