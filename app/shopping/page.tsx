"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

const categories = [
  { id: "food", label: "ALIMENTOS", color: "bg-blue-600" },
  { id: "cleaning", label: "LIMPEZA", color: "bg-blue-600" },
  { id: "hygiene", label: "HIGIENE", color: "bg-blue-600" },
  { id: "health", label: "FARMÁCIA", color: "bg-blue-600" },
  { id: "home", label: "CASA", color: "bg-blue-600" },
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
    <div className="bg-slate-100 min-h-screen flex flex-col pb-32">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-100 px-4 py-6">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => router.push("/")}
            aria-label="Voltar"
            className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md active:scale-95 transition-transform shrink-0"
          >
            <span
              className="material-symbols-outlined text-blue-600 font-bold"
              style={{ fontSize: "32px", fontVariationSettings: "'FILL' 0" }}
            >
              arrow_back
            </span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 text-center leading-tight flex-1">
            Minha Lista<br />de Compras
          </h1>
          <button
            aria-label="Acessibilidade"
            className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md active:scale-95 transition-transform shrink-0"
          >
            <span
              className="material-symbols-outlined text-blue-600"
              style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}
            >
              accessibility
            </span>
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full flex flex-col gap-8">
        {categories.map((cat) => {
          const items = getItemsByCategory(cat.id);
          if (items.length === 0) return null;

          return (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
              {/* Cabeçalho da categoria */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-1.5 h-10 rounded-full ${cat.color}`}></div>
                <h2
                  className="text-3xl font-black text-gray-900 uppercase tracking-tight"
                  id={`cat-${cat.id}`}
                >
                  {cat.label}
                </h2>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    {/* Container do item */}
                    <div className="flex-1 flex items-center gap-4 bg-white p-5 rounded-[32px] shadow-md">
                      <span className="text-5xl" role="img" aria-label={item.label}>
                        {item.emoji}
                      </span>
                      <span
                        className={`text-2xl font-bold flex-1 ${
                          item.checked
                            ? "line-through text-gray-400"
                            : "text-gray-900"
                        }`}
                      >
                        {item.label}
                      </span>
                      <button
                        onClick={() => toggleShoppingItem(item.id)}
                        className="shrink-0"
                        aria-label={item.checked ? "Desmarcar" : "Marcar como comprado"}
                      >
                        <div
                          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all ${
                            item.checked
                              ? "bg-blue-600 border-blue-600"
                              : "bg-white border-blue-600"
                          }`}
                        >
                          {item.checked && (
                            <span
                              className="material-symbols-outlined text-white"
                              style={{ fontSize: "28px", fontVariationSettings: "'FILL' 1" }}
                            >
                              check
                            </span>
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Botão delete */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Apagar "${item.label}"?`)) {
                          deleteShoppingItem(item.id);
                        }
                      }}
                      className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full shrink-0 shadow-md active:scale-95 transition-transform"
                      aria-label="Apagar item"
                    >
                      <span
                        className="material-symbols-outlined text-red-600"
                        style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}
                      >
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

      {/* Botão adicionar fixo */}
      <div className="fixed bottom-0 left-0 w-full p-4 pb-8">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => router.push("/shopping/add")}
            className="w-full flex items-center justify-center gap-4 py-6 rounded-full shadow-2xl transform active:scale-[0.98] transition-all"
            style={{
              background: "linear-gradient(135deg, #F9A825 0%, #F57F17 100%)",
              border: "4px solid #F57F17",
            }}
          >
            <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
              <span
                className="material-symbols-outlined text-yellow-400"
                style={{ fontSize: "36px", fontVariationSettings: "'FILL' 1" }}
              >
                add
              </span>
            </div>
            <span className="text-black text-2xl font-bold">
              Adicionar Item
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
