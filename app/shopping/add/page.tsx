"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function ShoppingAddPage() {
  const router = useRouter();
  const { addShoppingItem } = useAppStore();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("food");

  const handleSave = async () => {
    if (!name.trim()) return;

    const categories: Record<string, string> = {
      food: "🍎",
      cleaning: "🧼",
      hygiene: "🧴",
      health: "💊",
      home: "🏠",
    };

    const emoji = categories[category] || "🛒";
    await addShoppingItem(name, emoji, category as any);
    router.push("/shopping");
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-sans antialiased">
      <header className="sticky top-0 z-20 bg-background border-b border-border shadow-sm transition-colors duration-200">
        <div className="px-4 py-6 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/shopping")}
            aria-label="Voltar"
            className="flex items-center justify-center w-14 h-14 bg-card rounded-full border-2 border-border shadow-sm active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-3xl text-primary font-bold">
              arrow_back
            </span>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-foreground tracking-tight text-center leading-tight">
            Novo Item
          </h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 w-full max-w-md mx-auto flex flex-col gap-8">
        <div className="space-y-4">
          <label htmlFor="item-name" className="text-2xl font-bold ml-1 text-foreground">
            O que precisa comprar?
          </label>
          <input
            id="item-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Leite, Sabão em pó..."
            className="w-full bg-card border-2 border-border rounded-3xl p-6 text-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all shadow-inner"
            autoFocus
          />
        </div>

        <div className="space-y-4">
          <span className="text-2xl font-bold ml-1 block text-foreground">
            Qual categoria?
          </span>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: "food", label: "Alimento", emoji: "🍎" },
              { id: "cleaning", label: "Limpeza", emoji: "🧼" },
              { id: "hygiene", label: "Higiene", emoji: "🧴" },
              { id: "health", label: "Farmácia", emoji: "💊" },
              { id: "home", label: "Casa", emoji: "🏠" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex flex-col items-center justify-center gap-4 p-4 rounded-3xl border-4 transition-all ${
                  category === cat.id
                    ? "bg-primary border-primary shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-[1.02] text-white"
                    : "bg-card border-border text-muted-foreground hover:bg-accent"
                }`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="text-lg font-bold">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="p-6 pb-12 w-full max-w-md mx-auto">
        <Button
          size="lg"
          className="w-full h-20 text-2xl rounded-full gap-3 shadow-xl"
          onClick={handleSave}
          disabled={!name.trim()}
          variant={name.trim() ? "default" : "secondary"}
        >
          <span className="material-symbols-outlined text-4xl">
            check_circle
          </span>
          Salvar Item
        </Button>
      </div>
    </div>
  );
}
