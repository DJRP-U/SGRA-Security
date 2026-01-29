"use client";
import { useEffect, useState } from "react";
import { TaskStatus } from "@/enums/taskEnum";
import { Priority } from "@/enums/baseEnum";
import { mapEnumToOptions } from "@/utils/transform";
import CustomSelect from "@/components/inputs/filter/CustomSelect";
import { UserStoryService } from "@/service/useStoryService";
import { Loader2 } from "lucide-react"; // Importamos el icono de carga

interface TaskFiltersProps {
    projectId: string;
    currentPrioridad: string | null;
    currentEstado: string | null;
    currentHU: string | null;
    onFilterChange: (filters: {
        prioridad?: string | null;
        estado?: string | null;
        historia_usuario_uuid?: string | null;
    }) => void;
}

export default function TaskFilters({
    projectId,
    currentPrioridad,
    currentEstado,
    currentHU,
    onFilterChange,
}: TaskFiltersProps) {
    const [huOptions, setHuOptions] = useState<{ label: string, value: string | null }[]>([]);
    const [isLoadingHUs, setIsLoadingHUs] = useState(true); // Nuevo estado de carga

    useEffect(() => {
        const loadHUs = async () => {
            setIsLoadingHUs(true); // Iniciamos la carga
            try {
                const response = await UserStoryService.listByProject(projectId, 1, 100);
                const formatted = (response.data.historias || []).map((hu: any) => ({
                    label: hu.identificador,
                    value: hu.uuid
                }));
                setHuOptions([{ label: "Todas las Historias", value: null }, ...formatted]);
            } catch (error: any) {
                console.error(error.detail);
            } finally {
                setIsLoadingHUs(false); // Finalizamos la carga
            }
        };
        if (projectId) loadHUs();
    }, [projectId]);

    return (
        <div className="flex flex-wrap items-center gap-2">
            <CustomSelect
                options={mapEnumToOptions(Priority)}
                value={currentPrioridad}
                onChange={(val) => onFilterChange({ prioridad: val })}
                placeholder="Prioridad"
            />
            <CustomSelect
                options={mapEnumToOptions(TaskStatus)}
                value={currentEstado}
                onChange={(val) => onFilterChange({ estado: val })}
                placeholder="Estado"
            />

            <div className="min-w-[220px] relative">
                {isLoadingHUs ? (
                    <div className="
                        flex items-center justify-between
                        w-full px-3 py-1
                        rounded-sm outline outline-1 outline-neutral-400
                        bg-neutral-50 animate-pulse
                    ">
                        <span className="text-lg tracking-tighter text-neutral-400 truncate font-medium">
                            Cargando HU...
                        </span>
                        <Loader2 size={16} className="text-neutral-400 animate-spin" />
                    </div>
                ) : (
                    <CustomSelect
                        options={huOptions}
                        value={currentHU}
                        onChange={(val) => onFilterChange({ historia_usuario_uuid: val })}
                        placeholder="Filtrar por Historia"
                    />
                )}
            </div>
        </div>
    );
}