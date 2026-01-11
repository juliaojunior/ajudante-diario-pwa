import { cn } from "@/lib/utils";
import { Text } from "@/components/atoms/Text";
import { IconButton } from "@/components/molecules/IconButton";
import { GlassContainer } from "@/components/atoms/GlassContainer";

export interface NavigationBarProps {
  title: string;
  onBackClick?: () => void;
  onSettingsClick?: () => void;
  className?: string;
}

/**
 * Organismo: NavigationBar
 * Barra de navegação superior com botão voltar e título
 */
export function NavigationBar({
  title,
  onBackClick,
  onSettingsClick,
  className,
}: NavigationBarProps) {
  return (
    <GlassContainer
      rounded="none"
      opacity="medium"
      border="none"
      className={cn(
        "sticky top-0 z-20 border-b border-white/10 shadow-lg backdrop-blur-xl",
        className
      )}
    >
      <div className="px-4 py-6 flex items-center justify-between gap-4">
        <IconButton
          icon="arrow_back"
          size="md"
          variant="glass"
          onClick={onBackClick}
          aria-label="Voltar"
        />

        <Text
          as="h1"
          variant="heading"
          size="2xl"
          color="white"
          className="text-center leading-tight flex-1"
        >
          {title}
        </Text>

        <IconButton
          icon="settings_accessibility"
          size="md"
          variant="glass"
          onClick={onSettingsClick}
          aria-label="Configurações"
        />
      </div>
    </GlassContainer>
  );
}
