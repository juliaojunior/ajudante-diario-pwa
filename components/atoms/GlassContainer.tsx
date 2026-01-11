import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const glassVariants = cva(
  "backdrop-blur-[10px] transition-all duration-200",
  {
    variants: {
      blur: {
        none: "backdrop-blur-none",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl",
      },
      opacity: {
        low: "bg-white/5",
        medium: "bg-white/10",
        high: "bg-white/20",
      },
      border: {
        none: "border-0",
        subtle: "border border-white/10",
        normal: "border border-white/20",
        strong: "border-2 border-white/30",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      blur: "md",
      opacity: "medium",
      border: "normal",
      rounded: "xl",
    },
  }
);

export interface GlassContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassVariants> {
  as?: React.ElementType;
}

/**
 * Átomo: GlassContainer
 * Container com efeito glassmorphism
 */
export function GlassContainer({
  as: Component = "div",
  blur,
  opacity,
  border,
  rounded,
  className,
  children,
  ...props
}: GlassContainerProps) {
  return (
    <Component
      className={cn(
        glassVariants({ blur, opacity, border, rounded }),
        "shadow-glass",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
