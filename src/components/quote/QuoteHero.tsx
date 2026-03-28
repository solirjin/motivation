"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { QuoteAuthor } from "./QuoteAuthor";
import { getAuthorImage, CATEGORY_META } from "@/lib/quotes";
import type { Quote } from "@/types";

const FADE_OUT_MS = 350;
const FADE_IN_MS = 600;

interface QuoteHeroProps {
  quote: Quote;
  onRefresh: () => void;
  dateLabel: string;
}

export function QuoteHero({ quote, onRefresh, dateLabel }: QuoteHeroProps) {
  const [displayed, setDisplayed] = useState<Quote>(quote);
  const [visible, setVisible] = useState(false);
  const [bgError, setBgError] = useState(false);

  useEffect(() => {
    // Step 1: fade everything out
    setVisible(false);

    // Step 2: once fully faded, swap content then fade in
    const t = setTimeout(() => {
      setDisplayed(quote);
      setBgError(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true))
      );
    }, FADE_OUT_MS);

    return () => clearTimeout(t);
  }, [quote.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const imageUrl = getAuthorImage(displayed.authorSlug);
  const gradient = CATEGORY_META[displayed.categories[0]]?.gradient ?? "from-violet-900 via-purple-800 to-indigo-900";

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-[100dvh] px-6 md:px-12 text-center overflow-hidden cursor-pointer select-none bg-gradient-to-br ${gradient}`}
      onClick={onRefresh}
      title="Nhấn để đổi câu"
    >
      {/* Black overlay — controls all fade via opacity */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-[1]"
        style={{
          opacity: visible ? 0 : 1,
          transition: `opacity ${visible ? FADE_IN_MS : FADE_OUT_MS}ms ease`,
        }}
      />

      {/* Author background image */}
      {imageUrl && !bgError && (
        <div className="absolute inset-0 z-0">
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
      <div className="relative z-[2] flex flex-col items-center gap-3 w-full max-w-2xl">
        <p className="text-white/40 text-xs font-sans tracking-widest uppercase">
          {dateLabel}
        </p>

        <div className="flex flex-wrap gap-2 justify-center">
          {displayed.categories.map((cat) => (
            <Badge key={cat} category={cat} />
          ))}
        </div>

        <div>
          <span className="block font-serif text-white/15 text-7xl leading-none -mb-4 select-none">"</span>
          <blockquote className="font-serif text-white text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed">
            {displayed.text}
          </blockquote>
          <span className="block font-serif text-white/15 text-7xl leading-none -mt-6 select-none rotate-180">"</span>
        </div>

        {displayed.translation && displayed.language !== "vi" && (
          <p className="text-white/50 text-sm md:text-base italic font-sans">
            {displayed.translation}
          </p>
        )}

        <div className="mt-2">
          <QuoteAuthor
            author={displayed.author}
            authorSlug={displayed.authorSlug}
            source={displayed.source}
            size="md"
          />
        </div>

        <p className="text-white/25 text-xs mt-4">Nhấn để đổi câu</p>
      </div>
    </div>
  );
}
