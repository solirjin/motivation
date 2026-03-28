import { cn } from "@/lib/utils";
import { CATEGORY_META } from "@/lib/quotes";
import type { QuoteCategory } from "@/types";

interface GradientBackgroundProps {
  category?: QuoteCategory;
  className?: string;
  children: React.ReactNode;
  animated?: boolean;
}

const DEFAULT_GRADIENT = "from-violet-900 via-purple-800 to-indigo-900";

export function GradientBackground({
  category,
  className,
  children,
  animated = true,
}: GradientBackgroundProps) {
  const gradient = category
    ? CATEGORY_META[category].gradient
    : DEFAULT_GRADIENT;

  return (
    <div
      className={cn(
        "relative min-h-screen bg-gradient-to-br",
        gradient,
        animated && "bg-[length:300%_300%] animate-gradient-shift",
        className
      )}
    >
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
