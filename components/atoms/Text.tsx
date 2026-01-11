import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      heading: "font-bold tracking-tight",
      body: "font-normal",
      label: "font-medium",
      caption: "font-normal opacity-70",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
    color: {
      primary: "text-text-primary",
      secondary: "text-text-secondary",
      white: "text-white",
      blue: "text-senior-blue",
      yellow: "text-senior-yellow",
      red: "text-senior-red",
    },
  },
  defaultVariants: {
    variant: "body",
    size: "base",
    color: "primary",
  },
});

export interface TextProps extends VariantProps<typeof textVariants> {
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

/**
 * Átomo: Text
 * Componente de texto com variantes semânticas
 */
export function Text({
  as: Component = "p",
  variant,
  size,
  color,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(textVariants({ variant, size, color }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
