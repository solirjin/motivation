"use client";

import { useEffect, useState } from "react";
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

  // Auto-advance every 30 seconds
  useEffect(() => {
    const id = setInterval(refresh, 30_000);
    return () => clearInterval(id);
  }, [refresh]);

  const dateLabel = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return <QuoteHero quote={quote} onRefresh={refresh} dateLabel={dateLabel} />;
}
