interface QuoteAuthorProps {
  author: string;
  source?: string;
  size?: "sm" | "md" | "lg";
}

export function QuoteAuthor({ author, source, size = "md" }: QuoteAuthorProps) {
  const initial = author.charAt(0).toUpperCase();

  const sizeClasses = {
    sm: { avatar: "w-8 h-8 text-sm", name: "text-sm", source: "text-xs" },
    md: { avatar: "w-10 h-10 text-base", name: "text-base", source: "text-sm" },
    lg: { avatar: "w-12 h-12 text-lg", name: "text-lg", source: "text-sm" },
  }[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className={`${sizeClasses.avatar} rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center font-serif font-bold text-white shrink-0`}
      >
        {initial}
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
