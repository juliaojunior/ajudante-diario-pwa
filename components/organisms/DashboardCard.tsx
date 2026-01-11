import { cn } from "@/lib/utils";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Badge } from "@/components/molecules/Badge";
import { TimeDisplay } from "@/components/molecules/TimeDisplay";
import { IconButton } from "@/components/molecules/IconButton";
import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";
import type { Medication } from "@/lib/types";

export interface DashboardCardProps {
  variant: "medication" | "shopping" | "emergency";
  medication?: Medication | null;
  onAddClick?: () => void;
  onListClick?: () => void;
  onClick?: () => void;
  className?: string;
}

/**
 * Organismo: DashboardCard
 * Card principal do dashboard com variantes para diferentes funcionalidades
 */
export function DashboardCard({
  variant,
  medication,
  onAddClick,
  onListClick,
  onClick,
  className,
}: DashboardCardProps) {
  // Variante: Medicamentos
  if (variant === "medication") {
    const hasMed = !!medication;

    return (
      <GlassContainer
        rounded="xl"
        opacity="high"
        border="normal"
        className={cn(
          "relative overflow-hidden cursor-pointer group p-6",
          "flex flex-col justify-between min-h-[400px]",
          "bg-gradient-to-br from-senior-blue/40 to-senior-blue/20",
          "hover:scale-[1.02] transition-all duration-300",
          className
        )}
        onClick={onClick}
      >
        {/* Efeito de luz de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        {/* Header com badge e botões */}
        <div className="w-full flex justify-between items-start z-10">
          <div className="flex flex-col items-start gap-2">
            <Badge
              icon="medication"
              label={hasMed ? "PRÓXIMA DOSE" : "NOVO"}
              variant="primary"
            />
            <Text
              as="h2"
              variant="heading"
              size="4xl"
              color="white"
              className="mt-2"
            >
              {hasMed ? "Medicamentos" : "Adicionar Remédio"}
            </Text>
          </div>

          {/* Botões de ação (apenas quando tem medicamento) */}
          {hasMed && (
            <div className="flex gap-2">
              <IconButton
                icon="add"
                size="md"
                variant="glass"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddClick?.();
                }}
                aria-label="Adicionar medicamento"
              />
              <IconButton
                icon="list"
                size="md"
                variant="glass"
                onClick={(e) => {
                  e.stopPropagation();
                  onListClick?.();
                }}
                aria-label="Ver lista"
              />
            </div>
          )}
        </div>

        {/* Footer com horário e imagem */}
        <div className="flex flex-row items-end justify-between w-full gap-4 z-10">
          <TimeDisplay time={hasMed ? medication.time : "--:--"} />

          {hasMed && medication.image ? (
            <div
              className="relative w-32 h-32 rounded-2xl overflow-hidden bg-white/10 border-2 border-white/20 shadow-inner shrink-0"
              style={{
                backgroundImage: `url("${medication.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-32 h-32 rounded-2xl bg-white/10 border-2 border-dashed border-white/30 shrink-0">
              <Icon name="add" size={48} className="text-white/50" />
            </div>
          )}
        </div>

        {/* Ícone de seta no hover */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <Icon name="arrow_circle_right" size={48} className="text-white/80" />
        </div>
      </GlassContainer>
    );
  }

  // Variante: Compras
  if (variant === "shopping") {
    return (
      <GlassContainer
        rounded="xl"
        opacity="high"
        border="normal"
        className={cn(
          "relative overflow-hidden cursor-pointer p-6",
          "flex flex-col items-center justify-center gap-4 h-full min-h-[200px]",
          "bg-gradient-to-br from-senior-yellow/40 to-senior-yellow/20",
          "hover:scale-[1.02] transition-all duration-300",
          className
        )}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
        
        <div className="w-20 h-20 bg-yellow-900/10 rounded-full flex items-center justify-center">
          <Icon name="shopping_basket" size={48} fill={true} />
        </div>
        
        <Text
          as="h2"
          variant="heading"
          size="3xl"
          className="text-center leading-tight text-gray-900"
        >
          Compras
        </Text>

        {/* Indicador de notificação */}
        <div
          aria-label="Notification"
          className="absolute top-4 right-4 h-3 w-3 bg-senior-red rounded-full animate-pulse border border-white/40 shadow-sm"
        />
      </GlassContainer>
    );
  }

  // Variante: Emergência
  if (variant === "emergency") {
    return (
      <GlassContainer
        rounded="xl"
        opacity="high"
        border="normal"
        className={cn(
          "relative overflow-hidden cursor-pointer p-6",
          "flex flex-col items-center justify-center gap-4 h-full min-h-[200px]",
          "bg-gradient-to-br from-senior-red/60 to-senior-red/30",
          "hover:scale-[1.02] transition-all duration-300",
          className
        )}
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />
        
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse-slow">
          <Icon name="phone_in_talk" size={48} fill={true} className="text-white" />
        </div>
        
        <Text
          as="h2"
          variant="heading"
          size="3xl"
          color="white"
          className="text-center leading-tight uppercase tracking-wide"
        >
          Emergência
        </Text>
      </GlassContainer>
    );
  }

  return null;
}
