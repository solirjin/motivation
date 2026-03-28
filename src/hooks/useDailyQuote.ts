"use client";

import { useMemo } from "react";
import { getDailyQuote } from "@/lib/quotes";
import type { Quote } from "@/types";

export function useDailyQuote(): Quote {
  return useMemo(() => getDailyQuote(), []);
}
