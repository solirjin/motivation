"use client";

import { useState, useCallback } from "react";
import { getRandomQuote } from "@/lib/quotes";
import type { Quote } from "@/types";

export function useRandomQuote(initial: Quote) {
  const [quote, setQuote] = useState<Quote>(initial);

  const refresh = useCallback(() => {
    setQuote((current) => getRandomQuote(current.id));
  }, []);

  return { quote, refresh };
}
