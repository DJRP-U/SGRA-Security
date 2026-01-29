"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { RequirementStatus, RequirementType } from "@/enums/requirementEnum";
import { Priority } from "@/enums/baseEnum";
import { mapEnumToOptions } from "@/utils/transform";
import CustomSelect from "@/components/inputs/filter/CustomSelect";

const TIPO_OPTIONS = mapEnumToOptions(RequirementType);
const PRIORIDAD_OPTIONS = mapEnumToOptions(Priority);
const ESTADO_OPTIONS = mapEnumToOptions(RequirementStatus);

export default function RequirementFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentTipo = searchParams.get("tipo");
    const currentPrioridad = searchParams.get("prioridad");
    const currentEstado = searchParams.get("estado");

    const handleFilterChange = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <CustomSelect
                options={TIPO_OPTIONS}
                value={currentTipo}
                onChange={(val) => handleFilterChange("tipo", val)}
                placeholder="Tipo de requisito"
            />
            <CustomSelect
                options={PRIORIDAD_OPTIONS}
                value={currentPrioridad}
                onChange={(val) => handleFilterChange("prioridad", val)}
                placeholder="Prioridad"
            />
            <CustomSelect
                options={ESTADO_OPTIONS}
                value={currentEstado}
                onChange={(val) => handleFilterChange("estado", val)}
                placeholder="Estado"
            />
        </div>
    );
}