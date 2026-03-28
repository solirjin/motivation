"use client";

import { useEffect, useState } from "react";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { QuoteHero } from "@/components/quote/QuoteHero";
import { useDailyQuote } from "@/hooks/useDailyQuote";
import { useRandomQuote } from "@/hooks/useRandomQuote";
import { getQuoteById } from "@/lib/quotes";
import type { Quote } from "@/types";

export default function HomePage() {
  const daily = useDailyQuote();
  const [initialQuote, setInitialQuote] = useState<Quote>(daily);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qId = params.get("q");
    if (qId) {
      const found = getQuoteById(qId);
      if (found) setInitialQuote(found);
    }
  }, []);

  const { quote, refresh } = useRandomQuote(initialQuote);

  const dateLabel = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <GradientBackground category={quote.categories[0]}>
      <QuoteHero quote={quote} onRefresh={refresh} dateLabel={dateLabel} />
    </GradientBackground>
  );
}
