"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { NavigationBar } from "@/components/organisms/NavigationBar";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Text } from "@/components/atoms/Text";
import { Input } from "@/components/atoms/Input";
import type { ShoppingCategory } from "@/lib/types";

const emojis = [
  "🍎", "🥛", "🍞", "🥚", "🧀", "🥩", "🐟", "🥦", "🥕", "🍌",
  "🧼", "🧽", "🧴", "🧻", "🧹", "🧺", "💊", "🩹", "🪥", "🧴",
];

const categoryOptions: { id: ShoppingCategory; label: string }[] = [
  { id: "food", label: "Alimentos" },
  { id: "cleaning", label: "Limpeza" },
  { id: "hygiene", label: "Higiene" },
  { id: "health", label: "Farmácia" },
  { id: "home", label: "Casa" },
];

export default function AddShoppingItemPage() {
  const router = useRouter();
  const addShoppingItem = useAppStore((state) => state.addShoppingItem);

  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState("🛒");
  const [category, setCategory] = useState<ShoppingCategory>("food");

  const handleSave = async () => {
    if (!label.trim()) {
      alert("Por favor, digite o nome do item");
      return;
    }

    await addShoppingItem(label, emoji, category);
    router.push("/shopping");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar title="Adicionar Item" onBackClick={() => router.back()} />

      <main className="flex-1 flex flex-col px-6 pt-8 pb-10 justify-between max-w-md mx-auto w-full">
        <div className="flex flex-col gap-6 flex-grow">
          {/* Preview do emoji selecionado */}
          <div className="flex flex-col items-center gap-4 py-8">
            <GlassContainer
              rounded="full"
              opacity="high"
              className="w-32 h-32 flex items-center justify-center"
            >
              <Text variant="body" className="text-6xl">
                {emoji}
              </Text>
            </GlassContainer>
            <Text variant="body" size="lg" color="secondary">
              Toque em um emoji abaixo
            </Text>
          </div>

          {/* Seletor de emoji */}
          <div className="grid grid-cols-5 gap-3">
            {emojis.map((e) => (
              <GlassContainer
                key={e}
                rounded="lg"
                opacity={emoji === e ? "high" : "medium"}
                className={`aspect-square flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all ${
                  emoji === e ? "ring-2 ring-white/50" : ""
                }`}
                onClick={() => setEmoji(e)}
              >
                <Text variant="body" className="text-3xl">
                  {e}
                </Text>
              </GlassContainer>
            ))}
          </div>

          {/* Nome do item */}
          <Input
            label="Nome do Item"
            placeholder="Ex: Maçã"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          {/* Categoria */}
          <div>
            <Text
              variant="label"
              size="lg"
              color="white"
              className="block mb-2"
            >
              Categoria
            </Text>
            <div className="grid grid-cols-2 gap-3">
              {categoryOptions.map((cat) => (
                <GlassContainer
                  key={cat.id}
                  rounded="lg"
                  opacity={category === cat.id ? "high" : "medium"}
                  className={`p-4 cursor-pointer hover:bg-white/20 transition-all text-center ${
                    category === cat.id ? "ring-2 ring-white/50" : ""
                  }`}
                  onClick={() => setCategory(cat.id)}
                >
                  <Text
                    variant="label"
                    size="base"
                    color="white"
                  >
                    {cat.label}
                  </Text>
                </GlassContainer>
              ))}
            </div>
          </div>
        </div>

        {/* Botão salvar */}
        <footer className="pb-4">
          <GlassContainer
            rounded="xl"
            opacity="high"
            className="w-full h-20 flex items-center justify-center cursor-pointer bg-senior-yellow/60 hover:bg-senior-yellow/80 transition-all"
            onClick={handleSave}
          >
            <Text variant="heading" size="2xl" className="text-gray-900">
              Adicionar à Lista
            </Text>
          </GlassContainer>
        </footer>
      </main>
    </div>
  );
}
