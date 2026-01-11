"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAppStore, getNextDose } from "@/lib/store";
import { Button } from "@/components/ui/button";

const Header = () => (
  <header className="flex justify-between items-center px-2 py-1 flex-shrink-0">
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-foreground leading-tight">Bom dia</h1>
      <p className="text-sm font-medium text-muted-foreground capitalize">
        {format(new Date(), "EEEE, d 'de' MMM", { locale: ptBR })}
      </p>
    </div>
    <div className="h-10 w-10 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center dark:bg-slate-800">
      <span
        className="material-symbols-outlined text-muted-foreground"
        style={{ fontSize: "24px", fontVariationSettings: "'FILL' 0" }}
      >
        settings
      </span>
    </div>
  </header>
);

export default function Dashboard() {
  const router = useRouter();
  const { init, medications } = useAppStore();

  useEffect(() => {
    if (init && typeof init === "function") {
      init();
    }
  }, [init]);

  const nextMed = getNextDose(medications);
  const hasMed = !!nextMed;

  const handleMedClick = () => {
    if (hasMed) {
      router.push(`/medication/confirm?id=${nextMed.id}`);
    } else {
      router.push("/medication/add");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col p-4 gap-4 bg-background">
      <Header />

      <main className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Card de Medicamentos (maior) */}
        <Button
          variant="dashboard-blue"
          size="card"
          onClick={handleMedClick}
          className="flex-[1.3] group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="w-full flex justify-between items-start z-10">
            <div className="flex flex-col items-start gap-1">
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white/90 text-sm font-semibold tracking-wide border border-white/10">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px" }}
                >
                  medication
                </span>
                {hasMed ? "PRÓXIMA DOSE" : "NOVO"}
              </span>
              <h2 className="text-primary-foreground text-4xl font-bold mt-2 tracking-tight">
                {hasMed ? "Medicamentos" : "Adicionar Remédio"}
              </h2>
            </div>
            {/* Botões de ação */}
            {hasMed && (
              <>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/medication/add");
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-colors cursor-pointer border border-white/10 active:scale-95"
                >
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: "28px" }}
                  >
                    add
                  </span>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/medication/list");
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full transition-colors cursor-pointer border border-white/10 active:scale-95 ml-2"
                >
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: "28px" }}
                  >
                    list
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-row items-end justify-between w-full mt-4 gap-4 z-10">
            <div className="flex flex-col">
              <span className="text-blue-100 text-lg font-medium mb-1">
                Horário
              </span>
              <p className="text-white text-[5rem] leading-[0.9] font-bold tracking-tighter drop-shadow-sm">
                {hasMed ? nextMed.time : "--:--"}
              </p>
            </div>
            {hasMed && nextMed.image && (
              <div
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-white/10 border-2 border-white/20 shadow-inner shrink-0"
                style={{
                  backgroundImage: `url("${nextMed.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}
            {!hasMed && (
              <div className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white/10 border-2 border-dashed border-white/30 shrink-0">
                <span
                  className="material-symbols-outlined text-white/50"
                  style={{ fontSize: "48px" }}
                >
                  add
                </span>
              </div>
            )}
          </div>
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span
              className="material-symbols-outlined text-white/80"
              style={{ fontSize: "48px" }}
            >
              arrow_circle_right
            </span>
          </div>
        </Button>

        {/* Cards de Compras e Emergência (lado a lado) */}
        <div className="flex-1 flex gap-4 min-h-0">
          <Button
            variant="dashboard-yellow"
            size="card"
            onClick={() => router.push("/shopping")}
            className="w-1/2"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-yellow-900/10 rounded-full flex items-center justify-center mb-2">
              <span
                className="material-symbols-outlined text-foreground"
                style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}
              >
                shopping_basket
              </span>
            </div>
            <h2 className="text-foreground text-2xl md:text-3xl font-bold text-center leading-tight">
              Compras
            </h2>
            <div
              aria-label="Notificação"
              className="absolute top-4 right-4 h-3 w-3 bg-destructive rounded-full animate-pulse border border-white/40 shadow-sm"
            ></div>
          </Button>

          <Button
            variant="dashboard-red"
            size="card"
            onClick={() => window.open("tel:190")}
            className="w-1/2"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none"></div>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-full flex items-center justify-center mb-2 animate-[pulse_3s_ease-in-out_infinite]">
              <span
                className="material-symbols-outlined text-white"
                style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}
              >
                phone_in_talk
              </span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl font-bold text-center leading-tight uppercase tracking-wide">
              Emergência
            </h2>
          </Button>
        </div>
      </main>
    </div>
  );
}
