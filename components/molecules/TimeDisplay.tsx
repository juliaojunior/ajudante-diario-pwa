import { cn } from "@/lib/utils";
import { Text } from "@/components/atoms/Text";

export interface TimeDisplayProps {
  time: string;
  label?: string;
  className?: string;
}

/**
 * Molécula: TimeDisplay
 * Display de horário grande com label
 */
export function TimeDisplay({ time, label = "Horário", className }: TimeDisplayProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Text
        as="span"
        variant="label"
        size="lg"
        color="secondary"
        className="mb-1"
      >
        {label}
      </Text>
      <Text
        as="p"
        variant="heading"
        size="5xl"
        color="white"
        className="leading-[0.9] tracking-tighter drop-shadow-sm"
      >
        {time || "--:--"}
      </Text>
    </div>
  );
}
