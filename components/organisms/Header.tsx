"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Text } from "@/components/atoms/Text";
import { IconButton } from "@/components/molecules/IconButton";
import { getGreeting } from "@/lib/utils";

export interface HeaderProps {
  userName?: string;
  onSettingsClick?: () => void;
  className?: string;
}

/**
 * Organismo: Header
 * Cabeçalho do dashboard com saudação e data
 */
export function Header({ userName, onSettingsClick, className }: HeaderProps) {
  const greeting = getGreeting();
  const dateStr = format(new Date(), "EEEE, d 'de' MMM", { locale: ptBR });

  return (
    <header className={className}>
      <div className="flex justify-between items-center px-2 py-1">
        <div className="flex flex-col">
          <Text as="h1" variant="heading" size="xl" color="white">
            {greeting}
            {userName && `, ${userName}`}
          </Text>
          <Text
            as="p"
            variant="body"
            size="sm"
            color="secondary"
            className="capitalize"
          >
            {dateStr}
          </Text>
        </div>

        <IconButton
          icon="settings"
          size="md"
          variant="glass"
          onClick={onSettingsClick}
          aria-label="Configurações"
        />
      </div>
    </header>
  );
}
