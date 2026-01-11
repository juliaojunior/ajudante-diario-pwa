import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Átomo: Input
 * Campo de entrada com estilo glassmorphism
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-text-primary text-lg font-medium mb-2">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-14 w-full rounded-xl border border-white/20 bg-white/10",
            "backdrop-blur-md px-4 py-3 text-lg text-text-primary",
            "placeholder:text-text-secondary/50",
            "focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
