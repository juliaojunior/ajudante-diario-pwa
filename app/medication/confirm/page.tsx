"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { NavigationBar } from "@/components/organisms/NavigationBar";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";
import { TimeDisplay } from "@/components/molecules/TimeDisplay";
import type { Medication } from "@/lib/types";

function ConfirmMedicationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const medId = searchParams.get("id");

  const { medications, confirmMedication } = useAppStore();
  const [medication, setMedication] = useState<Medication | null>(null);

  useEffect(() => {
    if (medId) {
      const med = medications.find((m) => m.id === medId);
      setMedication(med || null);
    }
  }, [medId, medications]);

  const handleConfirm = async () => {
    if (medication) {
      await confirmMedication(medication.id);
      router.push("/");
    }
  };

  if (!medication) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Text variant="heading" size="2xl" color="white">
          Medicamento não encontrado
        </Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar title="Confirmar Dose" onBackClick={() => router.back()} />

      <main className="flex-1 flex flex-col px-6 pt-8 pb-10 justify-between max-w-md mx-auto w-full">
        <div className="flex flex-col gap-8 flex-grow justify-center">
          {/* Card do medicamento */}
          <GlassContainer
            rounded="xl"
            opacity="high"
            className="p-6 bg-gradient-to-br from-senior-blue/40 to-senior-blue/20"
          >
            <div className="flex flex-col gap-6">
              {/* Imagem */}
              {medication.image && (
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <img
                    src={medication.image}
                    alt={medication.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}

              {/* Nome */}
              <Text variant="heading" size="4xl" color="white">
                {medication.name}
              </Text>

              {/* Horário */}
              <TimeDisplay time={medication.time} label="Horário da dose" />
            </div>
          </GlassContainer>

          {/* Mensagem */}
          <div className="text-center">
            <Text variant="body" size="xl" color="secondary">
              Você tomou este medicamento agora?
            </Text>
          </div>
        </div>

        {/* Botões de ação */}
        <footer className="flex flex-col gap-4 pb-4">
          <GlassContainer
            rounded="xl"
            opacity="high"
            className="w-full h-24 flex items-center justify-center cursor-pointer bg-green-600/40 hover:bg-green-600/60 transition-all gap-4"
            onClick={handleConfirm}
          >
            <Icon name="check_circle" size={40} className="text-white" />
            <Text variant="heading" size="2xl" color="white">
              Sim, tomei!
            </Text>
          </GlassContainer>

          <GlassContainer
            rounded="xl"
            opacity="medium"
            className="w-full h-16 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all"
            onClick={() => router.back()}
          >
            <Text variant="label" size="lg" color="white">
              Não, ainda não
            </Text>
          </GlassContainer>
        </footer>
      </main>
    </div>
  );
}

export default function ConfirmMedicationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    }>
      <ConfirmMedicationContent />
    </Suspense>
  );
}
