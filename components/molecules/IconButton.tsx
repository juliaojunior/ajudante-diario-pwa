import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Icon } from "@/components/atoms/Icon";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer active:scale-95 transition-transform duration-200",
  {
    variants: {
      variant: {
        glass: "hover:bg-white/30",
        solid: "bg-white/20 hover:bg-white/30",
        primary: "bg-senior-blue hover:bg-senior-blue/90",
        secondary: "bg-senior-yellow hover:bg-senior-yellow/90",
        destructive: "bg-senior-red hover:bg-senior-red/90",
      },
      size: {
        sm: "w-10 h-10",
        md: "w-14 h-14",
        lg: "w-16 h-16",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "md",
    },
  }
);

export interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  icon: string;
  iconSize?: number;
  iconFill?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
  [key: string]: any;
}

/**
 * Molécula: IconButton
 * Botão circular com ícone e efeito glass
 */
export function IconButton({
  icon,
  iconSize,
  iconFill = true,
  variant,
  size,
  className,
  onClick,
  ...props
}: IconButtonProps) {
  const defaultIconSize = size === "sm" ? 24 : size === "lg" ? 32 : 28;

  return (
    <GlassContainer
      as="button"
      rounded="full"
      opacity={variant === "glass" ? "medium" : "high"}
      className={cn(iconButtonVariants({ variant, size }), className)}
      onClick={onClick}
      {...props}
    >
      <Icon name={icon} size={iconSize || defaultIconSize} fill={iconFill} />
    </GlassContainer>
  );
}
