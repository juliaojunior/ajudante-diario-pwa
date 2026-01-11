/**
 * Types para o Ajudante Diário PWA
 */

export interface Medication {
  id: string;
  name: string;
  time: string; // HH:MM format
  image?: string; // Base64 ou URL
  history: string[]; // ISO timestamps
}

export interface ShoppingItem {
  id: string;
  label: string;
  emoji: string;
  checked: boolean;
  category: ShoppingCategory;
}

export type ShoppingCategory = 'food' | 'cleaning' | 'hygiene' | 'health' | 'home';

export interface CategoryInfo {
  id: ShoppingCategory;
  label: string;
  color: string;
}

export interface AppState {
  medications: Medication[];
  shoppingItems: ShoppingItem[];
  loading: boolean;
  init: () => Promise<void>;
  addMedication: (medication: Omit<Medication, 'id' | 'history'>) => Promise<void>;
  confirmMedication: (id: string) => Promise<void>;
  deleteMedication: (id: string) => Promise<void>;
  toggleShoppingItem: (id: string) => Promise<void>;
  addShoppingItem: (label: string, emoji: string, category: ShoppingCategory) => Promise<void>;
  deleteShoppingItem: (id: string) => Promise<void>;
}
