"use client";

import { cn } from "@/lib/utils";

type LangFilter = "all" | "vi" | "en";

interface CategoryFilterProps {
  active: LangFilter;
  onChange: (value: LangFilter) => void;
}

const options: { value: LangFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "en", label: "English" },
];

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            active === opt.value
              ? "bg-white text-gray-900"
              : "bg-white/15 text-white hover:bg-white/25"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
