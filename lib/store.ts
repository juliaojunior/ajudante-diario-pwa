import { create } from "zustand";
import { get as dbGet, set as dbSet } from "idb-keyval";
import type { AppState, Medication, ShoppingItem, ShoppingCategory } from "./types";

const defaultShoppingItems: ShoppingItem[] = [
  { id: "apple", label: "Maçã", emoji: "🍎", checked: false, category: "food" },
  { id: "milk", label: "Leite", emoji: "🥛", checked: false, category: "food" },
  { id: "bread", label: "Pão", emoji: "🍞", checked: false, category: "food" },
  { id: "soap", label: "Sabão", emoji: "🧼", checked: false, category: "cleaning" },
];

export const useAppStore = create<AppState>((set, get) => ({
  medications: [],
  shoppingItems: defaultShoppingItems,
  loading: true,

  // Inicializar store do IndexedDB
  init: async () => {
    try {
      const [storedMeds, storedShopping] = await Promise.all([
        dbGet<Medication[]>("medications").catch(() => []),
        dbGet<ShoppingItem[]>("shoppingItems").catch(() => defaultShoppingItems),
      ]);

      set({
        medications: Array.isArray(storedMeds) ? storedMeds : [],
        shoppingItems: Array.isArray(storedShopping)
          ? storedShopping
          : defaultShoppingItems,
        loading: false,
      });
    } catch (error) {
      console.error("Store init error:", error);
      set({ loading: false });
    }
  },

  // Adicionar medicamento
  addMedication: async (medication) => {
    try {
      const currentMeds = get().medications || [];
      const newMed: Medication = {
        id: Date.now().toString(),
        ...medication,
        time: medication.time || "00:00",
        history: [],
      };

      const newMedsList = [...currentMeds, newMed];
      set({ medications: newMedsList });
      await dbSet("medications", newMedsList);
    } catch (error) {
      console.error("Add medication error:", error);
    }
  },

  // Confirmar medicamento (adicionar ao histórico)
  confirmMedication: async (id) => {
    try {
      const currentMeds = get().medications || [];
      const updatedMeds = currentMeds.map((med) => {
        if (med.id === id) {
          return {
            ...med,
            history: [...(med.history || []), new Date().toISOString()],
          };
        }
        return med;
      });

      set({ medications: updatedMeds });
      await dbSet("medications", updatedMeds);
    } catch (error) {
      console.error("Confirm medication error:", error);
    }
  },

  // Deletar medicamento
  deleteMedication: async (id) => {
    try {
      const currentMeds = get().medications || [];
      const updatedMeds = currentMeds.filter((med) => med.id !== id);

      set({ medications: updatedMeds });
      await dbSet("medications", updatedMeds);
    } catch (error) {
      console.error("Delete medication error:", error);
    }
  },

  // Toggle item de compras
  toggleShoppingItem: async (id) => {
    try {
      const currentItems = get().shoppingItems || [];
      const updatedItems = currentItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );

      set({ shoppingItems: updatedItems });
      await dbSet("shoppingItems", updatedItems);
    } catch (error) {
      console.error("Toggle item error:", error);
    }
  },

  // Adicionar item de compras
  addShoppingItem: async (label, emoji = "🛒", category = "food") => {
    try {
      const newItem: ShoppingItem = {
        id: Date.now().toString(),
        label,
        emoji,
        checked: false,
        category,
      };

      const currentItems = get().shoppingItems || [];
      const updatedItems = [...currentItems, newItem];

      set({ shoppingItems: updatedItems });
      await dbSet("shoppingItems", updatedItems);
    } catch (error) {
      console.error("Add item error:", error);
    }
  },

  // Deletar item de compras
  deleteShoppingItem: async (id) => {
    try {
      const currentItems = get().shoppingItems || [];
      const updatedItems = currentItems.filter((item) => item.id !== id);

      set({ shoppingItems: updatedItems });
      await dbSet("shoppingItems", updatedItems);
    } catch (error) {
      console.error("Delete item error:", error);
    }
  },
}));

/**
 * Helper: Obter próxima dose de medicamento
 */
export function getNextDose(medications: Medication[]): Medication | null {
  if (!Array.isArray(medications) || medications.length === 0) return null;

  const today = new Date().toISOString().split("T")[0];

  // Filtrar medicamentos não tomados hoje
  const pending = medications.filter((med) => {
    if (!Array.isArray(med.history)) return true;
    const takenToday = med.history.some((timestamp) =>
      timestamp.startsWith(today)
    );
    return !takenToday;
  });

  // Se todos foram tomados, mostrar o primeiro da lista
  const listToUse = pending.length > 0 ? pending : medications;

  // Ordenar por horário
  const sorted = [...listToUse].sort((a, b) => {
    const timeA = a.time || "23:59";
    const timeB = b.time || "23:59";
    return timeA.localeCompare(timeB);
  });

  return sorted[0];
}
