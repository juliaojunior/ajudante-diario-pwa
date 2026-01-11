import { cn } from "@/lib/utils";

interface IconProps {
  name: string;
  size?: number;
  fill?: boolean;
  className?: string;
}

/**
 * Átomo: Icon
 * Ícone Material Symbols com variantes configuráveis
 */
export function Icon({ name, size = 24, fill = true, className }: IconProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 600, 'GRAD' 0, 'opsz' 48`,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
