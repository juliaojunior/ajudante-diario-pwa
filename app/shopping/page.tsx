"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { NavigationBar } from "@/components/organisms/NavigationBar";
import { ShoppingCategory } from "@/components/organisms/ShoppingCategory";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";
import type { CategoryInfo } from "@/lib/types";

const categories: CategoryInfo[] = [
  { id: "food", label: "Alimentos", color: "bg-senior-yellow" },
  { id: "cleaning", label: "Limpeza", color: "bg-senior-blue" },
  { id: "hygiene", label: "Higiene", color: "bg-green-500" },
  { id: "health", label: "Farmácia", color: "bg-senior-red" },
  { id: "home", label: "Casa", color: "bg-purple-500" },
];

export default function ShoppingListPage() {
  const router = useRouter();
  const { shoppingItems, toggleShoppingItem, deleteShoppingItem, init } =
    useAppStore();

  useEffect(() => {
    if (init && typeof init === "function") {
      init();
    }
  }, [init]);

  const getItemsByCategory = (catId: string) =>
    shoppingItems.filter((i) => i.category === catId);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar
        title="Lista de Compras"
        onBackClick={() => router.back()}
      />

      <main className="flex-1 px-4 py-6 pb-32 max-w-md mx-auto w-full flex flex-col gap-8">
        {categories.map((cat) => {
          const items = getItemsByCategory(cat.id);
          return (
            <ShoppingCategory
              key={cat.id}
              categoryLabel={cat.label}
              categoryColor={cat.color}
              items={items}
              onToggle={toggleShoppingItem}
              onDelete={deleteShoppingItem}
            />
          );
        })}

        {shoppingItems.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-6 mt-20">
            <Icon name="shopping_basket" size={64} className="text-white/50" />
            <Text
              variant="body"
              size="xl"
              color="secondary"
              className="text-center"
            >
              Sua lista está vazia
            </Text>
          </div>
        )}
      </main>

      {/* FAB - Adicionar Item */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gradient-end via-gradient-end/80 to-transparent pb-8 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <GlassContainer
            rounded="full"
            opacity="high"
            className="w-full flex items-center justify-center gap-3 bg-senior-yellow/60 hover:bg-senior-yellow/80 cursor-pointer py-5 px-8 active:scale-95 transition-all border-4 border-yellow-600"
            onClick={() => router.push("/shopping/add")}
          >
            <Icon name="add_circle" size={40} className="text-gray-900" />
            <Text variant="heading" size="xl" className="text-gray-900">
              Adicionar Item
            </Text>
          </GlassContainer>
        </div>
      </div>
    </div>
  );
}
