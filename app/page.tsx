"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, getNextDose } from "@/lib/store";
import { Header } from "@/components/organisms/Header";
import { DashboardCard } from "@/components/organisms/DashboardCard";

export default function DashboardPage() {
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
    <div className="h-screen w-full flex flex-col p-4 gap-4 md:p-6 md:gap-6">
      <Header />

      <main className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Card de Medicamentos (maior) */}
        <DashboardCard
          variant="medication"
          medication={nextMed}
          onClick={handleMedClick}
          onAddClick={() => router.push("/medication/add")}
          onListClick={() => router.push("/medication/list")}
          className="flex-[1.3]"
        />

        {/* Cards de Compras e Emergência (lado a lado) */}
        <div className="flex-1 flex gap-4 min-h-0">
          <DashboardCard
            variant="shopping"
            onClick={() => router.push("/shopping")}
            className="w-1/2"
          />

          <DashboardCard
            variant="emergency"
            onClick={() => window.open("tel:190")}
            className="w-1/2"
          />
        </div>
      </main>

      {/* Spacer para safe area */}
      <div className="h-1 w-full flex-shrink-0" />
    </div>
  );
}
