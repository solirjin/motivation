import { getAuthorImage } from "@/lib/quotes";

interface QuoteAuthorProps {
  author: string;
  authorSlug?: string;
  source?: string;
  size?: "sm" | "md" | "lg";
}

export function QuoteAuthor({ author, authorSlug, source, size = "md" }: QuoteAuthorProps) {
  const imageUrl = authorSlug ? getAuthorImage(authorSlug) : undefined;
  const initial = author.charAt(0).toUpperCase();

  const sizeClasses = {
    sm: { avatar: "w-8 h-8 text-sm", name: "text-sm", source: "text-xs" },
    md: { avatar: "w-10 h-10 text-base", name: "text-base", source: "text-sm" },
    lg: { avatar: "w-12 h-12 text-lg", name: "text-lg", source: "text-sm" },
  }[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeClasses.avatar} rounded-full border border-white/30 shrink-0 overflow-hidden`}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={author}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-serif font-bold text-white">
            {initial}
          </div>
        )}
      </div>
      <div>
        <p className={`${sizeClasses.name} font-medium text-white font-sans tracking-wide`}>
          {author}
        </p>
        {source && (
          <p className={`${sizeClasses.source} text-white/60 italic`}>{source}</p>
        )}
      </div>
    </div>
  );
}
