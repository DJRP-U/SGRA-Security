"use client";
import { BugType, BugSeverity, BugStatus } from "@/enums/bugEnum";
import { Priority } from "@/enums/baseEnum";
import { mapEnumToOptions } from "@/utils/transform";
import CustomSelect from "@/components/inputs/filter/CustomSelect";

const TIPO_OPTIONS = mapEnumToOptions(BugType);
const PRIORIDAD_OPTIONS = mapEnumToOptions(Priority);
const SEVERIDAD_OPTIONS = mapEnumToOptions(BugSeverity);
const ESTADO_OPTIONS = mapEnumToOptions(BugStatus);

interface BugFiltersProps {
    currentTipo: string | null
    currentPrioridad: string | null
    currentSeveridad: string | null
    currentEstado: string | null
    onFilterChange: (filters: {
        tipo_defecto?: string | null
        prioridad?: string | null
        severidad?: string | null
        estado?: string | null
    }) => void
}

export default function BugFilters({
    currentTipo,
    currentPrioridad,
    currentSeveridad,
    currentEstado,
    onFilterChange,
}: BugFiltersProps) {
    return (
        <div className="flex items-center gap-2">
            <CustomSelect
                options={TIPO_OPTIONS}
                value={currentTipo}
                onChange={(val) => onFilterChange({ tipo_defecto: val })}
                placeholder="Tipo de defecto"
            />
            <CustomSelect
                options={PRIORIDAD_OPTIONS}
                value={currentPrioridad}
                onChange={(val) => onFilterChange({ prioridad: val })}
                placeholder="Prioridad"
            />
            <CustomSelect
                options={SEVERIDAD_OPTIONS}
                value={currentSeveridad}
                onChange={(val) => onFilterChange({ severidad: val })}
                placeholder="Severidad"
            />
            <CustomSelect
                options={ESTADO_OPTIONS}
                value={currentEstado}
                onChange={(val) => onFilterChange({ estado: val })}
                placeholder="Estado"
            />
        </div>
    );
}