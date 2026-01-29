import {
    HistoryIcon, ArrowUpIcon, LoaderIcon, BlocksIcon,
    LinkIcon, CheckCircleIcon, TagIcon, ClockIcon,
    ShieldAlertIcon, FileTextIcon, MessageSquareIcon,
    FileIcon
} from "lucide-react";
import DetailCard from "../details/DetailCard";
import DetailItemCard from "../details/items/DetailItemCard";
import { requirementCategoryStyles, requirementPriorityStyles, requirementRiskStyles, requirementStatusStyles, requirementTypeStyles, requirementVerificationMethodStyles } from "@/styles/mappers/requirement";
import { RequirementCategory, RequirementRisk, RequirementStatus, RequirementType, RequirementVerificationMethod } from "@/enums/requirementEnum";
import { Priority } from "@/enums/baseEnum";
import DetailItemBlockCard from "../details/items/DetailItemBlockCard";
import { toTitleCase } from "@/utils/format";

export type RequirementHistoryDTO = {
    version: number;
    fecha: string;
    cambios: string[];
    requirement: {
        identificador: string
        nombre: string
        descripcion: string
        estado: RequirementStatus
        prioridad: Priority
        fuente: string
        tipo: RequirementType
        metodo_verificacion: RequirementVerificationMethod
        categoria: RequirementCategory
        horas_esfuerzo_estimado?: number
        riesgo: RequirementRisk
        comentarios?: string
        motivo_rechazo?: string
        razon_obsoleto?: string
    };
};

interface RequirementHistoryCardProps {
    history: RequirementHistoryDTO
    previousHistoryChanges?: string[]
}

export default function RequirementHistoryCard({
    history,
    previousHistoryChanges = []
}: RequirementHistoryCardProps) {

    const isOldValue = (field: string) => history?.cambios.includes(field);

    const isNewValue = (field: string) => previousHistoryChanges.includes(field);

    const getHighlightClass = (field: string) => {
        if (isOldValue(field)) return "border border-red-200 bg-red-100 rounded-sm transition-all";
        if (isNewValue(field)) return "border border-green-200 bg-green-100 rounded-sm transition-all";
        return "";
    };

    const getBlockHighlightClass = (field: string) => {
        if (isOldValue(field)) return "border-red-200 bg-red-100";
        if (isNewValue(field)) return "border-green-200 bg-green-100";
        return "border-neutral-300 bg-white";
    };

    return (
        <DetailCard className="border border-neutral-300 rounded-sm p-4" width="min-w-sm" identifier={history?.requirement.identificador}>

            {/* Versión */}
            <div className={getHighlightClass("version")}>
                <DetailItemCard label="Versión" icon={<HistoryIcon size={16} />} cols={2}>
                    {history?.version ?? "—"}
                </DetailItemCard>
            </div>

            <div className={getHighlightClass("nombre")}>
                <DetailItemCard label="Nombre" icon={<FileIcon size={16} />} cols={2}>
                    {history?.requirement.nombre ?? "—"}
                </DetailItemCard>
            </div>

            {/* Prioridad */}
            <div className={getHighlightClass("prioridad")}>
                <DetailItemCard
                    label="Prioridad"
                    icon={<ArrowUpIcon size={16} />}
                    contentClassName={
                        history?.requirement.prioridad ? requirementPriorityStyles[history.requirement.prioridad] : ""
                    }
                    cols={2}
                >
                    {toTitleCase(history.requirement?.prioridad || "")}
                </DetailItemCard>
            </div>

            {/* Estado */}
            <div className={getHighlightClass("estado")}>
                <DetailItemCard
                    label="Estado"
                    icon={<LoaderIcon size={16} />}
                    contentClassName={
                        history?.requirement.estado ? requirementStatusStyles[history.requirement.estado] : ""
                    }
                    cols={2}
                >
                    {toTitleCase(history.requirement?.estado || "")}
                </DetailItemCard>
            </div>

            {/* Tipo */}
            <div className={getHighlightClass("tipo")}>
                <DetailItemCard
                    label="Tipo"
                    icon={<BlocksIcon size={16} />}
                    contentClassName={
                        history?.requirement.tipo ? requirementTypeStyles[history.requirement.tipo] : ""
                    }
                    cols={2}
                >
                    {toTitleCase(history.requirement?.tipo || "")}
                </DetailItemCard>
            </div>

            {/* Fuente */}
            <div className={getHighlightClass("fuente")}>
                <DetailItemCard label="Fuente" icon={<LinkIcon size={16} />} cols={2}>
                    {toTitleCase(history.requirement?.fuente || "—")}
                </DetailItemCard>
            </div>

            {/* Método de verificación */}
            <div className={getHighlightClass("metodo_verificacion")}>
                <DetailItemCard
                    label="Método de verificación"
                    icon={<CheckCircleIcon size={16} />}
                    contentClassName={
                        history?.requirement.metodo_verificacion
                            ? requirementVerificationMethodStyles[history.requirement.metodo_verificacion]
                            : ""
                    }
                    cols={2}
                >
                    {toTitleCase(history.requirement?.metodo_verificacion || "")}
                </DetailItemCard>
            </div>

            {/* Categoría */}
            <div className={getHighlightClass("categoria")}>
                <DetailItemCard
                    label="Categoría"
                    icon={<TagIcon size={16} />}
                    contentClassName={
                        history?.requirement.categoria ? requirementCategoryStyles[history.requirement.categoria] : ""
                    }
                    cols={2}
                >
                    {toTitleCase(history.requirement?.categoria || "")}
                </DetailItemCard>
            </div>

            {/* Horas estimadas */}
            <div className={getHighlightClass("horas_esfuerzo_estimado")}>
                <DetailItemCard label="Horas estimadas" icon={<ClockIcon size={16} />} cols={2}>
                    {history.requirement?.horas_esfuerzo_estimado ?? 0} h
                </DetailItemCard>
            </div>

            {/* Riesgo */}
            <div className={getHighlightClass("riesgo")}>
                <DetailItemCard
                    label="Riesgo"
                    icon={<ShieldAlertIcon size={16} />}
                    contentClassName={
                        history?.requirement.riesgo ? requirementRiskStyles[history.requirement.riesgo] : ""
                    }
                    cols={2}
                >
                    {toTitleCase(history.requirement?.riesgo || "")}
                </DetailItemCard>
            </div>

            {/* Descripción */}
            <DetailItemBlockCard label="Descripción" icon={<FileTextIcon size={16} />}>
                <p className={`w-full border rounded-xs px-3 py-2 whitespace-pre-wrap break-words transition-colors ${getBlockHighlightClass("descripcion")}`}>
                    {history.requirement?.descripcion ?? ""}
                </p>
            </DetailItemBlockCard>

            {/* Comentarios */}
            {history.requirement?.comentarios?.trim() && (
                <DetailItemBlockCard label="Comentarios" icon={<MessageSquareIcon size={16} />}>
                    <p className={`w-full border rounded-xs px-3 py-2 whitespace-pre-wrap break-words transition-colors ${getBlockHighlightClass("comentarios")}`}>
                        {history.requirement.comentarios.trim()}
                    </p>
                </DetailItemBlockCard>
            )}

            {history.requirement?.razon_obsoleto?.trim() && (
                <DetailItemBlockCard label="Motivo de ser descartado" icon={<MessageSquareIcon size={16} />}>
                    <p className={`w-full border rounded-xs px-3 py-2 whitespace-pre-wrap break-words transition-colors ${getBlockHighlightClass("razon_obsoleto")}`}>
                        {history.requirement.razon_obsoleto.trim()}
                    </p>
                </DetailItemBlockCard>
            )}

        </DetailCard>
    );
}