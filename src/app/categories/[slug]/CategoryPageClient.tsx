"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuoteGrid } from "@/components/quote/QuoteGrid";
import { CategoryFilter } from "@/components/categories/CategoryFilter";
import { getByCategory, CATEGORY_META } from "@/lib/quotes";
import type { QuoteCategory } from "@/types";

type LangFilter = "all" | "vi" | "en";

interface CategoryPageClientProps {
  category: QuoteCategory;
}

export function CategoryPageClient({ category }: CategoryPageClientProps) {
  const [langFilter, setLangFilter] = useState<LangFilter>("all");

  const meta = CATEGORY_META[category];
  const allQuotes = getByCategory(category);

  const filtered = useMemo(() => {
    if (langFilter === "all") return allQuotes;
    return allQuotes.filter((q) => q.language === langFilter);
  }, [allQuotes, langFilter]);

  return (
    <GradientBackground category={category}>
      <Navbar />
      <main className="px-6 md:px-10 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 pt-4">
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              Tất cả danh mục
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{meta.icon}</span>
              <h1 className="font-serif text-3xl md:text-4xl text-white font-bold">
                {meta.labelVi}
              </h1>
            </div>
            <p className="text-white/60">{allQuotes.length} câu trích dẫn</p>
          </div>

          <div className="mb-6">
            <CategoryFilter active={langFilter} onChange={setLangFilter} />
          </div>

          <QuoteGrid
            quotes={filtered}
            emptyMessage={`Không có câu trích dẫn ${langFilter === "vi" ? "tiếng Việt" : "tiếng Anh"} trong danh mục này.`}
          />
        </div>
      </main>
      <Footer />
    </GradientBackground>
  );
}
