"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { QuoteAuthor } from "./QuoteAuthor";
import { getAuthorImage } from "@/lib/quotes";
import type { Quote } from "@/types";

interface QuoteHeroProps {
  quote: Quote;
  onRefresh: () => void;
  dateLabel: string;
}

export function QuoteHero({ quote, onRefresh, dateLabel }: QuoteHeroProps) {
  const [visible, setVisible] = useState(false);
  const [bgError, setBgError] = useState(false);
  const imageUrl = getAuthorImage(quote.authorSlug);

  useEffect(() => {
    setVisible(false);
    setBgError(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [quote.id]);

  return (
    <div
      className="relative flex flex-col items-center justify-center h-[100dvh] px-6 md:px-12 text-center overflow-hidden cursor-pointer select-none"
      onClick={onRefresh}
      title="Nhấn để đổi câu"
    >
      {/* Author background image */}
      {imageUrl && !bgError && (
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-top"
            style={{ filter: "blur(8px)", transform: "scale(1.08)" }}
            onError={() => setBgError(true)}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-2xl">
        {/* Date */}
        <p
          className={`text-white/40 text-xs font-sans tracking-widest uppercase transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {dateLabel}
        </p>

        {/* Categories */}
        <div
          className={`flex flex-wrap gap-2 justify-center transition-all duration-500 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          {quote.categories.map((cat) => (
            <Badge key={cat} category={cat} />
          ))}
        </div>

        {/* Quote */}
        <div
          className={`transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <span className="block font-serif text-white/15 text-7xl leading-none -mb-4 select-none">"</span>
          <blockquote className="font-serif text-white text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
            {quote.text}
          </blockquote>
          <span className="block font-serif text-white/15 text-7xl leading-none -mt-6 select-none rotate-180">"</span>
        </div>

        {/* Translation */}
        {quote.translation && quote.language !== "vi" && (
          <p
            className={`text-white/50 text-sm md:text-base italic font-sans transition-all duration-500 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            {quote.translation}
          </p>
        )}

        {/* Author */}
        <div
          className={`mt-2 transition-all duration-500 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          <QuoteAuthor author={quote.author} authorSlug={quote.authorSlug} source={quote.source} size="md" />
        </div>

        {/* Tap hint */}
        <p
          className={`text-white/25 text-xs mt-4 transition-all duration-500 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          Nhấn để đổi câu
        </p>
      </div>
    </div>
  );
}
