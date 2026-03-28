"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuoteAuthor } from "./QuoteAuthor";
import { QuoteActions } from "./QuoteActions";
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
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [quote.id]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 md:px-12 py-12 text-center overflow-hidden">
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
          {/* Dark gradient overlay so text stays readable */}
          <div className="absolute inset-0 bg-black/65" />
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Date label */}
        <p
          className={`text-white/50 text-sm font-sans tracking-widest uppercase mb-6 transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {dateLabel}
        </p>

        {/* Categories */}
        <div
          className={`flex flex-wrap gap-2 justify-center mb-8 transition-all duration-500 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {quote.categories.map((cat) => (
            <Badge key={cat} category={cat} />
          ))}
        </div>

        {/* Quote text */}
        <div
          className={`max-w-3xl transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="block font-serif text-white/20 text-8xl md:text-9xl leading-none -mb-6 md:-mb-8 select-none">
            "
          </span>
          <blockquote className="font-serif text-white text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed tracking-wide">
            {quote.text}
          </blockquote>
          <span className="block font-serif text-white/20 text-8xl md:text-9xl leading-none -mt-8 md:-mt-10 select-none rotate-180">
            "
          </span>
        </div>

        {/* Translation */}
        {quote.translation && quote.language !== "vi" && (
          <p
            className={`max-w-2xl text-white/55 text-base md:text-lg italic mt-4 font-sans transition-all duration-500 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {quote.translation}
          </p>
        )}

        {/* Author */}
        <div
          className={`mt-8 transition-all duration-500 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <QuoteAuthor author={quote.author} authorSlug={quote.authorSlug} source={quote.source} size="lg" />
        </div>

        {/* Actions */}
        <div
          className={`mt-8 flex flex-col items-center gap-4 transition-all duration-500 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <QuoteActions quote={quote} onRefresh={onRefresh} showRefresh />

          <Button variant="ghost" size="sm" onClick={onRefresh} className="mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Câu trích dẫn khác
          </Button>
        </div>
      </div>
    </div>
  );
}
