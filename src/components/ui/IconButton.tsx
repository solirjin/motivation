import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, active, label, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        title={label}
        className={cn(
          "inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-50",
          active
            ? "bg-white/25 text-white"
            : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white active:scale-90",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
export { IconButton };
