"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { NavigationBar } from "@/components/organisms/NavigationBar";
import { GlassContainer } from "@/components/atoms/GlassContainer";
import { Text } from "@/components/atoms/Text";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/molecules/IconButton";

export default function MedicationListPage() {
  const router = useRouter();
  const { medications, deleteMedication } = useAppStore();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Apagar "${name}"?`)) {
      await deleteMedication(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar
        title="Meus Medicamentos"
        onBackClick={() => router.back()}
      />

      <main className="flex-1 px-4 py-6 pb-32 max-w-md mx-auto w-full">
        {medications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 mt-20">
            <Icon name="medication" size={64} className="text-white/50" />
            <Text variant="body" size="xl" color="secondary" className="text-center">
              Nenhum medicamento cadastrado
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {medications.map((med) => (
              <GlassContainer
                key={med.id}
                rounded="xl"
                opacity="medium"
                className="p-4 hover:bg-white/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Imagem ou placeholder */}
                  {med.image ? (
                    <div
                      className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0"
                      style={{ backgroundImage: `url("${med.image}")` }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <Icon name="medication" size={32} className="text-white/50" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 flex flex-col gap-1">
                    <Text variant="heading" size="xl" color="white">
                      {med.name}
                    </Text>
                    <Text variant="body" size="base" color="secondary">
                      Horário: {med.time}
                    </Text>
                    <Text variant="caption" size="sm" color="secondary">
                      Tomado {med.history?.length || 0} vezes
                    </Text>
                  </div>

                  {/* Botão deletar */}
                  <IconButton
                    icon="delete"
                    size="md"
                    variant="destructive"
                    onClick={() => handleDelete(med.id, med.name)}
                    className="bg-red-900/30 hover:bg-red-900/50 border border-red-800"
                  />
                </div>
              </GlassContainer>
            ))}
          </div>
        )}
      </main>

      {/* FAB - Adicionar */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gradient-end via-gradient-end/80 to-transparent pb-8 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <GlassContainer
            rounded="full"
            opacity="high"
            className="w-full flex items-center justify-center gap-3 bg-senior-blue/40 hover:bg-senior-blue/60 cursor-pointer py-5 px-8 active:scale-95 transition-all"
            onClick={() => router.push("/medication/add")}
          >
            <Icon name="add_circle" size={40} className="text-white" />
            <Text variant="heading" size="xl" color="white">
              Adicionar Medicamento
            </Text>
          </GlassContainer>
        </div>
      </div>
    </div>
  );
}
