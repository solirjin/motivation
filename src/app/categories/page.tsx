import { GradientBackground } from "@/components/layout/GradientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { getAllCategories } from "@/lib/quotes";

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <GradientBackground>
      <Navbar />
      <main className="px-6 md:px-10 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 pt-4">
            <h1 className="font-serif text-3xl md:text-4xl text-white font-bold mb-2">
              Danh Mục
            </h1>
            <p className="text-white/60">
              Khám phá câu trích dẫn theo chủ đề bạn quan tâm
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <CategoryCard key={cat} category={cat} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </GradientBackground>
  );
}
