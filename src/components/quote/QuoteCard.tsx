"use client";

import { Badge } from "@/components/ui/Badge";
import { QuoteAuthor } from "./QuoteAuthor";
import { QuoteActions } from "./QuoteActions";
import type { Quote } from "@/types";

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <div className="group relative rounded-2xl p-6 bg-white/8 backdrop-blur-sm border border-white/15 hover:bg-white/12 hover:border-white/25 transition-all duration-300">
      {/* Quote mark */}
      <span className="absolute top-4 left-5 text-5xl font-serif text-white/15 leading-none select-none">
        "
      </span>

      {/* Categories */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {quote.categories.slice(0, 2).map((cat) => (
          <Badge key={cat} category={cat} />
        ))}
      </div>

      {/* Quote text */}
      <blockquote className="font-serif text-white/95 text-base md:text-lg leading-relaxed mb-4 mt-1 line-clamp-4">
        {quote.text}
      </blockquote>

      {/* Translation */}
      {quote.translation && quote.language !== "vi" && (
        <p className="text-white/50 text-sm italic mb-4 line-clamp-2">
          {quote.translation}
        </p>
      )}

      {/* Author + Actions */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <QuoteAuthor author={quote.author} source={quote.source} size="sm" />
        <QuoteActions quote={quote} />
      </div>
    </div>
  );
}
