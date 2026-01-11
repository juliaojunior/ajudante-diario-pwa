import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS com Tailwind Merge para evitar conflitos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata horário para exibição (HH:MM)
 */
export function formatTime(time: string): string {
  if (!time) return "--:--";
  return time;
}

/**
 * Verifica se um medicamento foi tomado hoje
 */
export function wasTakenToday(history: string[]): boolean {
  if (!Array.isArray(history) || history.length === 0) return false;
  
  const today = new Date().toISOString().split('T')[0];
  return history.some(timestamp => timestamp.startsWith(today));
}

/**
 * Obtém a saudação baseada no horário
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return "Bom dia";
  if (hour >= 12 && hour < 18) return "Boa tarde";
  return "Boa noite";
}
