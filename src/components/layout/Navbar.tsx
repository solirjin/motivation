import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-6 py-4 md:px-10",
        className
      )}
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-white font-serif text-xl font-bold hover:opacity-80 transition-opacity"
      >
        <span className="text-2xl">✦</span>
        <span>Động Lực</span>
      </Link>

      <div className="flex items-center gap-1 md:gap-2">
        <Link
          href="/categories"
          className="px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
        >
          Danh Mục
        </Link>
        <Link
          href="/favorites"
          className="px-3 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all text-sm font-medium flex items-center gap-1"
        >
          <span>♥</span>
          <span className="hidden sm:inline">Yêu Thích</span>
        </Link>
      </div>
    </nav>
  );
}
