import { QuoteCard } from "./QuoteCard";
import type { Quote } from "@/types";

interface QuoteGridProps {
  quotes: Quote[];
  emptyMessage?: string;
}

export function QuoteGrid({ quotes, emptyMessage = "Chưa có câu trích dẫn nào." }: QuoteGridProps) {
  if (quotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white/50">
        <span className="text-5xl mb-4">✦</span>
        <p className="text-lg font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </div>
  );
}
