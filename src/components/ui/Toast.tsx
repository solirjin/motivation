"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  className?: string;
}

export function Toast({ message, visible, className }: ToastProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) setMounted(true);
    else {
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium shadow-xl transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        className
      )}
    >
      {message}
    </div>
  );
}
