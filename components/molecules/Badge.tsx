import { cn } from "@/lib/utils";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

export interface BadgeProps {
  icon?: string;
  label: string;
  variant?: "default" | "primary" | "secondary" | "destructive";
  className?: string;
}

/**
 * Molécula: Badge
 * Badge informativo com ícone e texto
 */
export function Badge({
  icon,
  label,
  variant = "default",
  className,
}: BadgeProps) {
  const variantStyles = {
    default: "bg-white/20",
    primary: "bg-senior-blue/30",
    secondary: "bg-senior-yellow/30",
    destructive: "bg-senior-red/30",
  };

  return (
    <GlassContainer
      rounded="full"
      opacity="high"
      border="subtle"
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1",
        variantStyles[variant],
        className
      )}
    >
      {icon && <Icon name={icon} size={18} />}
      <Text
        as="span"
        variant="label"
        size="sm"
        color="white"
        className="tracking-wide uppercase"
      >
        {label}
      </Text>
    </GlassContainer>
  );
}
