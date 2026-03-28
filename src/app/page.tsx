"use client";

import { useEffect, useState } from "react";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuoteHero } from "@/components/quote/QuoteHero";
import { useDailyQuote } from "@/hooks/useDailyQuote";
import { useRandomQuote } from "@/hooks/useRandomQuote";
import { getQuoteById } from "@/lib/quotes";
import type { Quote } from "@/types";

export default function HomePage() {
  const daily = useDailyQuote();
  const [initialQuote, setInitialQuote] = useState<Quote>(daily);

  // Support deep link: ?q=<id>
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
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const primaryCategory = quote.categories[0];

  return (
    <GradientBackground category={primaryCategory}>
      <Navbar />
      <main>
        <QuoteHero quote={quote} onRefresh={refresh} dateLabel={dateLabel} />
      </main>
      <Footer />
    </GradientBackground>
  );
}
