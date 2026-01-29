"use client";
import { Priority } from "@/enums/baseEnum";
import { mapEnumToOptions } from "@/utils/transform";
import CustomSelect from "@/components/inputs/filter/CustomSelect";
import { UserStoryStatus } from "@/enums/userStoryEnums";

const ESTADO_HU_OPTIONS = mapEnumToOptions(UserStoryStatus);
const PRIORIDAD_OPTIONS = mapEnumToOptions(Priority);

interface UserStoryFiltersProps {
    currentPrioridad: string | null;
    currentEstado: string | null;
    onFilterChange: (filters: {
        prioridad?: string | null;
        estado?: string | null;
    }) => void;
}

export default function UserStoryFilters({
    currentPrioridad,
    currentEstado,
    onFilterChange,
}: UserStoryFiltersProps) {
    return (
        <div className="flex items-center gap-2">
            <CustomSelect
                options={PRIORIDAD_OPTIONS}
                value={currentPrioridad}
                onChange={(val) => onFilterChange({ prioridad: val })}
                placeholder="Prioridad"
            />
            <CustomSelect
                options={ESTADO_HU_OPTIONS}
                value={currentEstado}
                onChange={(val) => onFilterChange({ estado: val })}
                placeholder="Estado"
            />
        </div>
    );
}