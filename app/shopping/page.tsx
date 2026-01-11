"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

const categories = [
  { id: "food", label: "Alimentos", color: "bg-primary" },
  { id: "cleaning", label: "Limpeza", color: "bg-primary" },
  { id: "hygiene", label: "Higiene", color: "bg-primary" },
  { id: "health", label: "Farmácia", color: "bg-primary" },
  { id: "home", label: "Casa", color: "bg-primary" },
];

export default function ShoppingListPage() {
  const router = useRouter();
  const { shoppingItems = [], toggleShoppingItem, deleteShoppingItem, init } =
    useAppStore();

  useEffect(() => {
    if (init && typeof init === "function") {
      init();
    }
  }, [init]);

  const getItemsByCategory = (catId: string) =>
    shoppingItems.filter((i) => i.category === catId);

  return (
    <div className="bg-background font-sans antialiased min-h-screen flex flex-col">
      <header className="sticky top-0 z-20 bg-background border-b border-border shadow-sm transition-colors duration-200">
        <div className="px-4 py-6 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/")}
            aria-label="Voltar"
            className="flex items-center justify-center w-14 h-14 bg-card rounded-full border-2 border-border shadow-sm active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-3xl text-primary font-bold">
              arrow_back
            </span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight text-center leading-tight">
            Minha Lista de Compras
          </h1>
          <button
            aria-label="Configurações"
            className="flex items-center justify-center w-14 h-14 bg-card rounded-full border-2 border-border shadow-sm active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-3xl text-primary">
              settings_accessibility
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 pb-32 max-w-md mx-auto w-full flex flex-col gap-8">
        {categories.map((cat) => {
          const items = getItemsByCategory(cat.id);
          if (items.length === 0) return null;

          return (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
              <div className="flex items-center gap-3 mb-4 pl-2 mt-2">
                <div className={`w-2 h-8 rounded-full ${cat.color}`}></div>
                <h2
                  className="text-2xl font-bold text-foreground uppercase tracking-wide"
                  id={`cat-${cat.id}`}
                >
                  {cat.label}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    {/* CheckboxItem inline */}
                    <div className="flex-1 flex items-center gap-4 bg-card p-4 rounded-2xl border-2 border-border shadow-sm">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleShoppingItem(item.id)}
                        className="custom-checkbox"
                      />
                      <span className="text-4xl">{item.emoji}</span>
                      <span
                        className={`text-xl font-semibold ${
                          item.checked
                            ? "line-through text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm(`Apagar "${item.label}"?`)) {
                          deleteShoppingItem(item.id);
                        }
                      }}
                      className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full shrink-0 border border-red-200 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-3xl text-red-600">
                        delete
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background via-background to-transparent pb-8 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button
            onClick={() => router.push("/shopping/add")}
            className="w-full flex items-center justify-center gap-3 bg-secondary hover:bg-secondary/90 text-black font-bold text-xl py-5 px-8 rounded-full shadow-lg transform active:scale-[0.98] transition-all border-4 border-yellow-600"
          >
            <span className="material-symbols-outlined text-4xl font-bold">
              add_circle
            </span>
            <span>Adicionar Item</span>
          </button>
        </div>
      </div>
    </div>
  );
}
