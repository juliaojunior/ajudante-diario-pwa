"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { NavigationBar } from "@/components/organisms/NavigationBar";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";

export default function AddMedicationPage() {
  const router = useRouter();
  const addMedication = useAppStore((state) => state.addMedication);
  const [step, setStep] = useState(1);
  const [medData, setMedData] = useState({
    image: null as string | null,
    name: "",
    time: "08:00",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedData((prev) => ({ ...prev, image: reader.result as string }));
        setStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!medData.name || !medData.time) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    await addMedication({
      name: medData.name,
      time: medData.time,
      image: medData.image || undefined,
    });

    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar title="Adicionar Remédio" onBackClick={() => router.back()} />

      <main className="flex-1 flex flex-col px-6 pt-8 pb-10 justify-between max-w-md mx-auto w-full">
        {/* Header com indicador de passos */}
        <header className="flex flex-col items-center w-full gap-4 pt-4">
          <Text variant="label" size="xl" color="primary" className="tracking-wide">
            Passo {step} de 2
          </Text>
          <div className="flex flex-row items-center justify-center gap-3">
            <div
              className={`h-3 rounded-full transition-all ${
                step === 1 ? "w-12 bg-white" : "w-3 bg-white/30"
              }`}
            />
            <div
              className={`h-3 rounded-full transition-all ${
                step === 2 ? "w-12 bg-white" : "w-3 bg-white/30"
              }`}
            />
          </div>
        </header>

        {/* Passo 1: Tirar foto */}
        {step === 1 && (
          <>
            <div className="flex flex-col items-center justify-center flex-grow w-full gap-6 text-center my-8">
              <div className="relative flex items-center justify-center mb-4">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl opacity-60" />
                <GlassContainer
                  rounded="full"
                  className="relative p-8 ring-1 ring-white/20"
                >
                  <Icon name="medication" size={64} className="text-white" />
                </GlassContainer>
              </div>

              <div className="space-y-4">
                <Text variant="heading" size="4xl" color="white" className="leading-tight">
                  Cadastre seu remédio
                </Text>
                <Text
                  variant="body"
                  size="xl"
                  color="secondary"
                  className="max-w-xs mx-auto"
                >
                  Tire uma foto da caixa do remédio para começar.
                </Text>
              </div>
            </div>

            <footer className="flex flex-col items-center w-full gap-6 pb-4">
              <label className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <GlassContainer
                  rounded="xl"
                  opacity="high"
                  className="w-full h-24 flex items-center justify-center cursor-pointer bg-senior-blue/40 hover:bg-senior-blue/60 transition-all gap-4"
                >
                  <Icon name="photo_camera" size={40} className="text-white" />
                  <Text variant="heading" size="2xl" color="white">
                    Tirar Foto
                  </Text>
                </GlassContainer>
              </label>

              <Text variant="body" size="lg" color="primary" className="text-center max-w-[80%]">
                Toque no botão para abrir a câmera
              </Text>
            </footer>
          </>
        )}

        {/* Passo 2: Preencher dados */}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-6 flex-grow w-full my-8">
              {/* Preview da imagem */}
              {medData.image && (
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                  <img
                    src={medData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <Input
                label="Nome do Remédio"
                placeholder="Ex: Aspirina"
                value={medData.name}
                onChange={(e) =>
                  setMedData((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <Input
                label="Horário"
                type="time"
                value={medData.time}
                onChange={(e) =>
                  setMedData((prev) => ({ ...prev, time: e.target.value }))
                }
              />
            </div>

            <footer className="flex flex-col gap-4 pb-4">
              <GlassContainer
                rounded="xl"
                opacity="high"
                className="w-full h-20 flex items-center justify-center cursor-pointer bg-senior-blue/40 hover:bg-senior-blue/60 transition-all"
                onClick={handleSave}
              >
                <Text variant="heading" size="2xl" color="white">
                  Salvar Remédio
                </Text>
              </GlassContainer>

              <GlassContainer
                rounded="xl"
                opacity="medium"
                className="w-full h-16 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all"
                onClick={() => setStep(1)}
              >
                <Text variant="label" size="lg" color="white">
                  Tirar outra foto
                </Text>
              </GlassContainer>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
