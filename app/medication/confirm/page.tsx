"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { medications, confirmMedication } = useAppStore();
  const med = medications.find((m) => m.id === id);

  if (!med) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-6">Medicamento não encontrado</p>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-4 bg-blue-600 text-white rounded-full text-xl font-bold"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const handleConfirm = async () => {
    await confirmMedication(id!);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-between p-6 pb-12">
      {/* Foto do medicamento */}
      <div className="w-full max-w-md mt-12">
        <div
          className="w-full aspect-square rounded-[60px] overflow-hidden shadow-2xl"
          style={{
            backgroundImage: `url("${med.image}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "8px solid #334155",
          }}
        ></div>
      </div>

      {/* Horário */}
      <div className="flex flex-col items-center gap-4 my-12">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span
              className="material-symbols-outlined text-gray-500"
              style={{ fontSize: "32px", fontVariationSettings: "'FILL' 1" }}
            >
              schedule
            </span>
          </div>
          <p
            className="text-gray-400 font-bold"
            style={{ fontSize: "80px", lineHeight: "1" }}
          >
            {med.time}
          </p>
        </div>
      </div>

      {/* Botão confirmar */}
      <button
        onClick={handleConfirm}
        className="w-full max-w-md py-6 rounded-full shadow-xl flex items-center justify-center gap-4 active:scale-[0.98] transition-transform"
        style={{
          background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
        }}
      >
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <span
            className="material-symbols-outlined text-green-700"
            style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
          >
            check
          </span>
        </div>
        <span className="text-white text-4xl font-bold tracking-wide uppercase">
          Já Tomei
        </span>
      </button>
    </div>
  );
}

export default function ConfirmMedicationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <p className="text-2xl text-gray-600">Carregando...</p>
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
