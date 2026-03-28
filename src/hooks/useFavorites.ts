"use client";

import { useState, useEffect, useCallback } from "react";
import { storage } from "@/lib/storage";

const STORAGE_KEY = "mq:favorites";

interface FavoritesData {
  ids: string[];
  savedAt: Record<string, number>;
}

export function useFavorites() {
  const [data, setData] = useState<FavoritesData>({ ids: [], savedAt: {} });

  useEffect(() => {
    const raw = storage.get(STORAGE_KEY);
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch {
        // ignore corrupted data
      }
    }
  }, []);

  const persist = useCallback((next: FavoritesData) => {
    setData(next);
    storage.set(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      setData((current) => {
        const isFav = current.ids.includes(id);
        const next: FavoritesData = isFav
          ? {
              ids: current.ids.filter((i) => i !== id),
              savedAt: Object.fromEntries(
                Object.entries(current.savedAt).filter(([k]) => k !== id)
              ),
            }
          : {
              ids: [...current.ids, id],
              savedAt: { ...current.savedAt, [id]: Date.now() },
            };
        storage.set(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const isFavorited = useCallback(
    (id: string) => data.ids.includes(id),
    [data.ids]
  );

  const clear = useCallback(() => {
    persist({ ids: [], savedAt: {} });
  }, [persist]);

  return { ids: data.ids, toggle, isFavorited, clear };
}
