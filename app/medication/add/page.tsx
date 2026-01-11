"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";

export default function AddMedicationPage() {
  const router = useRouter();
  const addMedication = useAppStore((state) => state.addMedication);
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
        const image = reader.result as string;
        setMedData((prev) => ({ ...prev, image }));

        // Prompt para nome e horário
        const name = window.prompt("Qual o nome do remédio?", "Aspirina");
        const time = window.prompt("Qual o horário? (HH:MM)", "08:00");

        if (name && time) {
          handleSave(image, name, time);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (image: string, name: string, time: string) => {
    await addMedication({
      name,
      time,
      image,
    });
    router.push("/");
  };

  return (
    <div className="bg-background font-sans text-foreground antialiased overflow-x-hidden min-h-screen flex flex-col">
      <div className="relative flex h-full flex-1 w-full max-w-md mx-auto flex-col px-6 pt-8 pb-10 justify-between">
        <header className="flex flex-col items-center w-full gap-4 pt-4">
          <span
            aria-label="Passo 1 de 3"
            className="text-primary text-xl font-semibold tracking-wide"
          >
            Passo 1 de 3
          </span>
          <div
            aria-hidden="true"
            className="flex flex-row items-center justify-center gap-3"
          >
            <div className="h-3 w-12 rounded-full bg-primary transition-all"></div>
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30"></div>
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30"></div>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center flex-grow w-full gap-6 text-center my-8">
          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-60"></div>
            <div className="relative bg-card p-8 rounded-full shadow-sm ring-1 ring-border">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontSize: "64px" }}
              >
                medication
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="text-foreground tracking-tight text-[32px] md:text-[36px] font-bold leading-[1.15]">
              Cadastre seu remédio
            </h1>
            <p className="text-muted-foreground text-[20px] md:text-[22px] font-medium leading-relaxed max-w-xs mx-auto">
              Tire uma foto da caixa do remédio para começar.
            </p>
          </div>
        </main>

        <footer className="flex flex-col items-center w-full gap-6 pb-4">
          <label className="w-full">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button size="lg" className="w-full h-24 text-2xl gap-4 shadow-lg shadow-blue-900/20" asChild>
              <div className="flex items-center justify-center cursor-pointer">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "40px" }}
                >
                  photo_camera
                </span>
                <span className="font-bold leading-normal tracking-wide">
                  Tirar Foto
                </span>
              </div>
            </Button>
          </label>
          <p className="text-primary/80 text-lg font-medium leading-normal text-center max-w-[80%]">
            Toque no botão azul para abrir a câmera
          </p>
        </footer>
      </div>
    </div>
  );
}
