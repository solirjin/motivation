"use client";

import { Badge } from "@/components/ui/Badge";
import { QuoteAuthor } from "./QuoteAuthor";
import { QuoteActions } from "./QuoteActions";
import { getAuthorImage } from "@/lib/quotes";
import type { Quote } from "@/types";

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const imageUrl = getAuthorImage(quote.authorSlug);

  return (
    <div className="group relative rounded-2xl p-6 bg-white/8 backdrop-blur-sm border border-white/15 hover:bg-white/12 hover:border-white/25 transition-all duration-300 overflow-hidden">
      {/* Author background image — faded portrait on right */}
      {imageUrl && (
        <div className="absolute right-0 top-0 h-full w-2/5 pointer-events-none select-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          {/* Fade left so it blends into the card */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Quote mark */}
        <span className="absolute top-0 left-1 text-5xl font-serif text-white/15 leading-none select-none">
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
          <QuoteAuthor author={quote.author} authorSlug={quote.authorSlug} source={quote.source} size="sm" />
          <QuoteActions quote={quote} />
        </div>
      </div>
    </div>
  );
}
