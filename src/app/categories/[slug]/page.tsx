import { getAllCategories } from "@/lib/quotes";
import type { QuoteCategory } from "@/types";
import { CategoryPageClient } from "./CategoryPageClient";

export function generateStaticParams() {
  return getAllCategories().map((slug) => ({ slug }));
}

interface PageProps {
  params: { slug: string };
}

export default function CategoryPage({ params }: PageProps) {
  return <CategoryPageClient category={params.slug as QuoteCategory} />;
}
