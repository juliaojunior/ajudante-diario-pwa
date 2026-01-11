"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAppStore, getNextDose } from "@/lib/store";

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
    <div className="min-h-screen w-full flex flex-col p-4 gap-4 bg-slate-100">
      {/* Header */}
      <header className="flex justify-between items-start px-2 py-2">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Bom dia
          </h1>
          <p className="text-lg font-medium text-gray-500 capitalize">
            {format(new Date(), "EEEE, d 'De' MMM", { locale: ptBR })}
          </p>
        </div>
        <button className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
          <span
            className="material-symbols-outlined text-gray-600"
            style={{ fontSize: "32px", fontVariationSettings: "'FILL' 0" }}
          >
            settings
          </span>
        </button>
      </header>

      <main className="flex-1 flex flex-col gap-4 min-h-0 mt-4">
        {/* Card de Medicamentos (maior) */}
        <button
          onClick={handleMedClick}
          className="relative flex flex-col justify-between p-6 rounded-[40px] shadow-lg overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0056D2 0%, #003d99 100%)",
            minHeight: "420px",
          }}
        >
          {/* Círculos decorativos */}
          <div
            className="absolute rounded-full opacity-20"
            style={{
              background: "rgba(255,255,255,0.3)",
              width: "200px",
              height: "200px",
              top: "-50px",
              right: "-50px",
            }}
          ></div>
          <div
            className="absolute rounded-full opacity-15"
            style={{
              background: "rgba(255,255,255,0.2)",
              width: "300px",
              height: "300px",
              bottom: "-100px",
              left: "-100px",
            }}
          ></div>

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span
                  className="material-symbols-outlined text-blue-600"
                  style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}
                >
                  medication
                </span>
                <span className="text-blue-900 text-sm font-bold tracking-wide uppercase">
                  {hasMed ? "PRÓXIMA DOSE" : "NOVO"}
                </span>
              </div>
              {hasMed && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/medication/add");
                    }}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full transition-colors border border-white/20 active:scale-95"
                  >
                    <span
                      className="material-symbols-outlined text-white"
                      style={{ fontSize: "24px" }}
                    >
                      add
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push("/medication/list");
                    }}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full transition-colors border border-white/20 active:scale-95"
                  >
                    <span
                      className="material-symbols-outlined text-white"
                      style={{ fontSize: "24px" }}
                    >
                      list
                    </span>
                  </button>
                </div>
              )}
            </div>

            <h2 className="text-white text-5xl font-bold tracking-tight mt-2">
              Medicamentos
            </h2>
          </div>

          {/* Horário e Foto */}
          <div className="relative z-10 flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-white/80 text-xl font-medium mb-1">
                Horário
              </span>
              <p
                className="text-white font-bold tracking-tight"
                style={{ fontSize: "120px", lineHeight: "0.9" }}
              >
                {hasMed ? nextMed.time : "--:--"}
              </p>
            </div>
            {hasMed && nextMed.image && (
              <div
                className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl shrink-0"
                style={{
                  backgroundImage: `url("${nextMed.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            )}
          </div>
        </button>

        {/* Cards de Compras e Emergência (lado a lado) */}
        <div className="flex gap-4 min-h-[240px]">
          <button
            onClick={() => router.push("/shopping")}
            className="relative flex-1 flex flex-col items-center justify-center p-6 rounded-[40px] shadow-lg overflow-hidden"
            style={{ background: "#F9A825" }}
          >
            {/* Círculo decorativo */}
            <div
              className="absolute rounded-full"
              style={{
                background: "rgba(0,0,0,0.05)",
                width: "180px",
                height: "180px",
                top: "-60px",
                right: "-60px",
              }}
            ></div>
            <div
              className="absolute top-4 right-4 h-3 w-3 bg-red-500 rounded-full animate-pulse border-2 border-white shadow-sm"
              aria-label="Notificação"
            ></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-black/80 rounded-full flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-yellow-400"
                  style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}
                >
                  shopping_basket
                </span>
              </div>
              <h2 className="text-black text-3xl font-bold text-center leading-tight">
                Compras
              </h2>
            </div>
          </button>

          <button
            onClick={() => window.open("tel:190")}
            className="relative flex-1 flex flex-col items-center justify-center p-6 rounded-[40px] shadow-lg overflow-hidden"
            style={{ background: "#D32F2F" }}
          >
            {/* Círculo decorativo */}
            <div
              className="absolute rounded-full"
              style={{
                background: "rgba(255,255,255,0.1)",
                width: "180px",
                height: "180px",
                bottom: "-60px",
                left: "-60px",
              }}
            ></div>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite]">
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontSize: "48px", fontVariationSettings: "'FILL' 1" }}
                >
                  phone_in_talk
                </span>
              </div>
              <h2 className="text-white text-3xl font-bold text-center leading-tight uppercase tracking-wide">
                Emergência
              </h2>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
