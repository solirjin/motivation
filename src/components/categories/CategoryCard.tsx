import Link from "next/link";
import { CATEGORY_META, getQuoteCount } from "@/lib/quotes";
import type { QuoteCategory } from "@/types";

interface CategoryCardProps {
  category: QuoteCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const meta = CATEGORY_META[category];
  const count = getQuoteCount(category);

  return (
    <Link href={`/categories/${category}`}>
      <div
        className={`relative rounded-2xl p-6 bg-gradient-to-br ${meta.gradient} overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <span className="text-4xl block mb-3">{meta.icon}</span>
          <h3 className="text-white font-serif text-xl font-bold mb-1">{meta.labelVi}</h3>
          <p className="text-white/60 text-sm">{count} câu trích dẫn</p>
        </div>
        <div className="absolute -bottom-4 -right-4 text-white/10 text-8xl font-serif group-hover:text-white/15 transition-colors">
          "
        </div>
      </div>
    </Link>
  );
}
