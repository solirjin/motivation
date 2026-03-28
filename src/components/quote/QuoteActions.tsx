"use client";

import { IconButton } from "@/components/ui/IconButton";
import { Toast } from "@/components/ui/Toast";
import { useFavorites } from "@/hooks/useFavorites";
import { useClipboard } from "@/hooks/useClipboard";
import { useShare } from "@/hooks/useShare";
import type { Quote } from "@/types";

interface QuoteActionsProps {
  quote: Quote;
  onRefresh?: () => void;
  showRefresh?: boolean;
}

export function QuoteActions({ quote, onRefresh, showRefresh = false }: QuoteActionsProps) {
  const { toggle, isFavorited } = useFavorites();
  const { copy, copied } = useClipboard();
  const { share, shared } = useShare();

  const isFav = isFavorited(quote.id);

  const handleCopy = () => {
    copy(`"${quote.text}" — ${quote.author}`);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <IconButton
          label={isFav ? "Bỏ yêu thích" : "Yêu thích"}
          active={isFav}
          onClick={() => toggle(quote.id)}
          className={isFav ? "text-red-400 bg-red-400/20 hover:bg-red-400/30" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFav ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </IconButton>

        <IconButton label="Sao chép" onClick={handleCopy} active={copied}>
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
            </svg>
          )}
        </IconButton>

        <IconButton label="Chia sẻ" onClick={() => share(quote)} active={shared}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
        </IconButton>

        {showRefresh && onRefresh && (
          <IconButton label="Câu khác" onClick={onRefresh}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </IconButton>
        )}
      </div>

      <Toast message="✓ Đã sao chép!" visible={copied} />
      <Toast message="✓ Đã chia sẻ!" visible={shared} />
    </>
  );
}
