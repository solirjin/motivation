"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { QuoteAuthor } from "./QuoteAuthor";
import { getAuthorImage, CATEGORY_META } from "@/lib/quotes";
import type { Quote } from "@/types";

const BG_CROSSFADE_MS = 800; // background A→B crossfade duration
const TEXT_FADE_MS = 280;    // text fade-out duration before swap

interface QuoteHeroProps {
  quote: Quote;
  onRefresh: () => void;
  dateLabel: string;
}

export function QuoteHero({ quote, onRefresh, dateLabel }: QuoteHeroProps) {
  // Displayed content (updates after text fade-out)
  const [displayed, setDisplayed] = useState<Quote>(quote);
  const [textVisible, setTextVisible] = useState(true);

  // Two-layer background crossfade (ping-pong pattern)
  const initialUrl = getAuthorImage(quote.authorSlug) ?? "";
  const [layerA, setLayerA] = useState(initialUrl);
  const [layerB, setLayerB] = useState(initialUrl);
  const [topOpacity, setTopOpacity] = useState(1); // top = layerB
  // true  → layerB is on top (visible)
  // false → layerA is on top (layerB is fading out / hidden)
  const bIsTop = useRef(true);
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip on mount — already initialised above
    if (isFirst.current) { isFirst.current = false; return; }

    const newUrl = getAuthorImage(quote.authorSlug) ?? "";

    // --- Background: crossfade A → B (or B → A) ---
    if (bIsTop.current) {
      // B is currently showing → load new image into A (hidden below), then fade B out
      setLayerA(newUrl);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTopOpacity(0))
      );
      bIsTop.current = false;
    } else {
      // A is currently showing → load new image into B (hidden below), then fade B in
      setLayerB(newUrl);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTopOpacity(1))
      );
      bIsTop.current = true;
    }

    // --- Text: fade out → swap → fade in ---
    setTextVisible(false);
    const t = setTimeout(() => {
      setDisplayed(quote);
      setTextVisible(true);
    }, TEXT_FADE_MS + 40);

    return () => clearTimeout(t);
  }, [quote.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const gradient =
    CATEGORY_META[displayed.categories[0]]?.gradient ??
    "from-violet-900 via-purple-800 to-indigo-900";

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-[100dvh] px-6 md:px-12 text-center overflow-hidden cursor-pointer select-none bg-gradient-to-br ${gradient}`}
      onClick={onRefresh}
      title="Nhấn để đổi câu"
    >
      {/* Layer A — bottom */}
      <BgLayer url={layerA} opacity={topOpacity === 0 ? 1 : 0} zIndex={1} />

      {/* Layer B — top (crossfades over A) */}
      <BgLayer url={layerB} opacity={topOpacity} zIndex={2} crossfadeMs={BG_CROSSFADE_MS} />

      {/* Text content */}
      <div
        className="relative z-10 flex flex-col items-center gap-3 w-full max-w-2xl"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateY(0)" : "translateY(10px)",
          transition: `opacity ${TEXT_FADE_MS}ms ease, transform ${TEXT_FADE_MS}ms ease`,
        }}
      >
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

// ─── Sub-component: one background image layer ───────────────────────────────
function BgLayer({
  url,
  opacity,
  zIndex,
  crossfadeMs = BG_CROSSFADE_MS,
}: {
  url: string;
  opacity: number;
  zIndex: number;
  crossfadeMs?: number;
}) {
  if (!url) return null;
  return (
    <div
      className="absolute inset-0"
      style={{ opacity, zIndex, transition: `opacity ${crossfadeMs}ms ease` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt=""
        aria-hidden
        className="w-full h-full object-cover object-top"
        style={{ filter: "blur(8px)", transform: "scale(1.08)" }}
      />
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    </div>
  );
}
