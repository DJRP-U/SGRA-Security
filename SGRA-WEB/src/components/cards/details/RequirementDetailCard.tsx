import { toTitleCase } from "@/utils/format";
import DetailCard from "./DetailCard";
import DetailItemCard from "./items/DetailItemCard";
import DetailItemBlockCard from "./items/DetailItemBlockCard";
import { RequirementDTO } from "@/tipos/DTOs/requirementDTO";
import {
    requirementPriorityStyles,
    requirementStatusStyles,
    requirementTypeStyles,
    requirementVerificationMethodStyles,
    requirementCategoryStyles,
    requirementRiskStyles,
} from "@/styles/mappers/requirement";
import {
    ArrowUpIcon,
    BlocksIcon,
    FileTextIcon,
    HistoryIcon,
    LoaderIcon,
    ShieldAlertIcon,
    TagIcon,
    CheckCircleIcon,
    ClockIcon,
    MessageSquareIcon,
    CalendarIcon,
    LinkIcon,
} from "lucide-react";
import { RequirementStatus } from "@/enums/requirementEnum";

export default function RequirementDetailCard({
    requirement,
}: {
    requirement: RequirementDTO | null;
}) {

    const formatDate = (date?: Date) => {
        if (!date) return "—";

        return new Date(date).toLocaleString("es-EC", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    };

    return (
        <DetailCard identifier={requirement?.identificador}>

            <DetailItemCard label="Versión" icon={<HistoryIcon size={16} />} cols={2}>
                {requirement?.versionActual}
            </DetailItemCard>

            <DetailItemCard
                label="Prioridad"
                icon={<ArrowUpIcon size={16} />}
                contentClassName={
                    requirement?.prioridad
                        ? requirementPriorityStyles[requirement.prioridad]
                        : ""
                }
                cols={2}
            >
                {toTitleCase(requirement?.prioridad || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Estado"
                icon={<LoaderIcon size={16} />}
                contentClassName={
                    requirement?.estado
                        ? requirementStatusStyles[requirement.estado]
                        : ""
                }
                cols={2}
            >
                {toTitleCase(requirement?.estado || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Tipo"
                icon={<BlocksIcon size={16} />}
                contentClassName={
                    requirement?.tipo
                        ? requirementTypeStyles[requirement.tipo]
                        : ""
                }
                cols={2}
            >
                {toTitleCase(requirement?.tipo || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Fuente"
                icon={<LinkIcon size={16} />}
                cols={2}
            >
                {toTitleCase(requirement?.fuente || "—")}
            </DetailItemCard>

            <DetailItemCard
                label="Método de verificación"
                icon={<CheckCircleIcon size={16} />}
                contentClassName={
                    requirement?.metodo_verificacion
                        ? requirementVerificationMethodStyles[
                        requirement.metodo_verificacion
                        ]
                        : ""
                }
                cols={2}
            >
                {toTitleCase(requirement?.metodo_verificacion || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Categoría"
                icon={<TagIcon size={16} />}
                contentClassName={
                    requirement?.categoria
                        ? requirementCategoryStyles[requirement.categoria]
                        : ""
                }
                cols={2}
            >
                {toTitleCase(requirement?.categoria || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Horas estimadas"
                icon={<ClockIcon size={16} />}
                cols={2}
            >
                {requirement?.horas_esfuerzo_estimado} h
            </DetailItemCard>

            <DetailItemCard
                label="Riesgo"
                icon={<ShieldAlertIcon size={16} />}
                contentClassName={
                    requirement?.riesgo
                        ? requirementRiskStyles[requirement.riesgo]
                        : ""
                }
                cols={2}
            >
                {toTitleCase(requirement?.riesgo || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Fecha de creación"
                icon={<CalendarIcon size={16} />}
                cols={2}
            >
                {formatDate(requirement?.fecha_creacion)}
            </DetailItemCard>
            
            <DetailItemCard
                label={requirement?.estado === RequirementStatus.OBSOLETE ? "Fecha de eliminación" : "Última modificación"}
                icon={<CalendarIcon size={16} />}
                cols={2}
            >
                {formatDate(requirement?.fecha_ultima_modificacion)}
            </DetailItemCard>

            <DetailItemBlockCard
                label="Descripción"
                icon={<FileTextIcon size={16} />}
            >
                <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                    {requirement?.descripcion ?? ""}
                </p>
            </DetailItemBlockCard>

            {requirement?.comentarios?.trim() && (
                <DetailItemBlockCard
                    label="Comentarios"
                    icon={<MessageSquareIcon size={16} />}
                >
                    <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                        {requirement.comentarios.trim()}
                    </p>
                </DetailItemBlockCard>
            )}

            {requirement?.motivo_rechazo?.trim() && (
                <DetailItemBlockCard
                    label="Motivo de rechazo"
                    icon={<MessageSquareIcon size={16} />}
                >
                    <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                        {requirement.motivo_rechazo.trim()}
                    </p>
                </DetailItemBlockCard>
            )}

            {requirement?.razon_obsoleto?.trim() && (
                <DetailItemBlockCard
                    label="Motivo de ser descartado"
                    icon={<MessageSquareIcon size={16} />}
                >
                    <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                        {requirement.razon_obsoleto.trim()}
                    </p>
                </DetailItemBlockCard>
            )}

        </DetailCard>
    );
}
