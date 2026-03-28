import { cn } from "@/lib/utils";
import { CATEGORY_META } from "@/lib/quotes";
import type { QuoteCategory } from "@/types";

interface BadgeProps {
  category: QuoteCategory;
  className?: string;
}

export function Badge({ category, className }: BadgeProps) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/15 text-white/90 backdrop-blur-sm border border-white/20",
        className
      )}
    >
      <span>{meta.icon}</span>
      <span>{meta.labelVi}</span>
    </span>
  );
}
