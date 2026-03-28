"use client";

import { useMemo, useState } from "react";
import { GradientBackground } from "@/components/layout/GradientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QuoteGrid } from "@/components/quote/QuoteGrid";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/hooks/useFavorites";
import { getQuoteById } from "@/lib/quotes";

export default function FavoritesPage() {
  const { ids, clear } = useFavorites();
  const [confirming, setConfirming] = useState(false);

  const quotes = useMemo(
    () => ids.map((id) => getQuoteById(id)).filter(Boolean) as ReturnType<typeof getQuoteById>[],
    [ids]
  ) as NonNullable<ReturnType<typeof getQuoteById>>[];

  const handleClear = () => {
    if (confirming) {
      clear();
      setConfirming(false);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
    }
  };

  return (
    <GradientBackground>
      <Navbar />
      <main className="px-6 md:px-10 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8 pt-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-white font-bold">
                ♥ Yêu Thích
              </h1>
              <p className="text-white/60 mt-1">
                {quotes.length} câu trích dẫn đã lưu
              </p>
            </div>
            {quotes.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className={confirming ? "bg-red-500/30 text-red-200 hover:bg-red-500/40" : ""}
              >
                {confirming ? "Xác nhận xóa tất cả?" : "Xóa tất cả"}
              </Button>
            )}
          </div>

          <QuoteGrid
            quotes={quotes}
            emptyMessage="Bạn chưa yêu thích câu nào. Hãy bắt đầu khám phá!"
          />
        </div>
      </main>
      <Footer />
    </GradientBackground>
  );
}
