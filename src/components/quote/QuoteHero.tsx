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
  // `displayed` is what's actually rendered — updated only after fade-out
  const [displayed, setDisplayed] = useState<Quote>(quote);
  const [visible, setVisible] = useState(false);
  const [bgError, setBgError] = useState(false);

  useEffect(() => {
    // 1. Fade out everything
    setVisible(false);

    // 2. After fade-out completes, swap content + fade in
    const t = setTimeout(() => {
      setDisplayed(quote);
      setBgError(false);
      // Small tick so React paints with new src before fading in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }, 400); // matches fade-out duration below

    return () => clearTimeout(t);
  }, [quote.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const imageUrl = getAuthorImage(displayed.authorSlug);

  return (
    <div
      className="relative flex flex-col items-center justify-center h-[100dvh] px-6 md:px-12 text-center overflow-hidden cursor-pointer select-none"
      onClick={onRefresh}
      title="Nhấn để đổi câu"
    >
      {/* Author background image — fades with content */}
      {imageUrl && !bgError && (
        <div
          className="absolute inset-0"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 600ms ease",
          }}
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

      {/* Content — fades together with background */}
      <div
        className="relative z-10 flex flex-col items-center gap-3 w-full max-w-2xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 600ms ease, transform 600ms ease",
        }}
      >
        {/* Date */}
        <p className="text-white/40 text-xs font-sans tracking-widest uppercase">
          {dateLabel}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center">
          {displayed.categories.map((cat) => (
            <Badge key={cat} category={cat} />
          ))}
        </div>

        {/* Quote */}
        <div>
          <span className="block font-serif text-white/15 text-7xl leading-none -mb-4 select-none">"</span>
          <blockquote className="font-serif text-white text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
            {displayed.text}
          </blockquote>
          <span className="block font-serif text-white/15 text-7xl leading-none -mt-6 select-none rotate-180">"</span>
        </div>

        {/* Translation */}
        {displayed.translation && displayed.language !== "vi" && (
          <p className="text-white/50 text-sm md:text-base italic font-sans">
            {displayed.translation}
          </p>
        )}

        {/* Author */}
        <div className="mt-2">
          <QuoteAuthor
            author={displayed.author}
            authorSlug={displayed.authorSlug}
            source={displayed.source}
            size="md"
          />
        </div>

        {/* Tap hint */}
        <p className="text-white/25 text-xs mt-4">Nhấn để đổi câu</p>
      </div>
    </div>
  );
}
