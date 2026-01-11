import { cn } from "@/lib/utils";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Text } from "@/components/atoms/Text";

export interface CheckboxItemProps {
  label: string;
  emoji: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

/**
 * Molécula: CheckboxItem
 * Item de lista de compras com checkbox customizado
 */
export function CheckboxItem({
  label,
  emoji,
  checked,
  onCheckedChange,
  className,
}: CheckboxItemProps) {
  return (
    <GlassContainer
      rounded="xl"
      opacity="medium"
      border="normal"
      className={cn(
        "flex items-center gap-4 p-4 cursor-pointer hover:bg-white/20 transition-all",
        checked && "opacity-60",
        className
      )}
      onClick={() => onCheckedChange(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="custom-checkbox shrink-0"
        onClick={(e) => e.stopPropagation()}
      />
      <Text
        as="span"
        variant="body"
        size="3xl"
        className="shrink-0"
      >
        {emoji}
      </Text>
      <Text
        as="span"
        variant="label"
        size="xl"
        color="white"
        className={cn(
          "flex-1 transition-all",
          checked && "line-through opacity-50"
        )}
      >
        {label}
      </Text>
    </GlassContainer>
  );
}
