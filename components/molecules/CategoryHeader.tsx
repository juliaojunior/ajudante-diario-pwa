import { cn } from "@/lib/utils";
import { Text } from "@/components/atoms/Text";

export interface CategoryHeaderProps {
  label: string;
  color?: string;
  className?: string;
}

/**
 * Molécula: CategoryHeader
 * Cabeçalho de categoria com barra colorida
 */
export function CategoryHeader({
  label,
  color = "bg-white",
  className,
}: CategoryHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3 mb-4 pl-2", className)}>
      <div className={cn("w-2 h-8 rounded-full", color)} />
      <Text
        as="h2"
        variant="heading"
        size="2xl"
        color="white"
        className="uppercase tracking-wide"
      >
        {label}
      </Text>
    </div>
  );
}
