"use client";

import { useState, useCallback } from "react";
import type { Quote } from "@/types";

export function useShare() {
  const [shared, setShared] = useState(false);

  const share = useCallback(async (quote: Quote) => {
    const text = `"${quote.text}" — ${quote.author}`;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}?q=${quote.id}`
        : "";

    const resetShared = () => {
      setTimeout(() => setShared(false), 2000);
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: `Câu trích dẫn từ ${quote.author}`, text, url });
        setShared(true);
        resetShared();
        return;
      } catch {
        // User cancelled or error, fall through to clipboard
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setShared(true);
      resetShared();
    } catch {
      // ignore
    }
  }, []);

  return { share, shared };
}
