"use client";
import { toTitleCase } from "@/utils/format";
import DetailCard from "./DetailCard";
import DetailItemCard from "./items/DetailItemCard";
import DetailItemBlockCard from "./items/DetailItemBlockCard";
import { BugDTO } from "@/tipos/DTOs/bugDTO";
import {
    ArrowUpIcon,
    BlocksIcon,
    FileTextIcon,
    LoaderIcon,
    ShieldAlertIcon,
    CalendarIcon,
    ImageIcon,
    Loader2Icon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const bugSeverityStyles: Record<string, string> = {
    BAJO: "bg-green-300",
    MEDIO: "bg-yellow-300",
    ALTO: "bg-orange-300",
    SEVERO: "bg-red-300",
    CRITICO: "bg-red-400 text-neutral-700",
};

const bugStatusStyles: Record<string, string> = {
    PENDIENTE: "bg-gray-300",
    ASIGNADO: "bg-blue-200",
    EN_DESARROLLO: "bg-blue-400",
    EN_REVISION: "bg-purple-300",
    ATRASADO: "bg-red-300",
    RESUELTO: "bg-green-400",
    CANCELADO: "bg-neutral-400",
};

interface BugDetailCardProps {
    bug: BugDTO | null;
}

export default function BugDetailCard({ bug }: BugDetailCardProps) {
    const formatDate = (dateString?: string) =>
        dateString ? new Date(dateString).toLocaleDateString("es-EC") : "—";
    const [isLoading, setIsLoading] = useState(true);
    return (
        <DetailCard identifier={bug?.codigo}>

            <DetailItemCard
                label="Prioridad"
                icon={<ArrowUpIcon size={16} />}
                contentClassName="bg-amber-100"
                cols={2}
            >
                {toTitleCase(bug?.prioridad || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Estado"
                icon={<LoaderIcon size={16} />}
                contentClassName={bug?.estado ? bugStatusStyles[bug.estado] : ""}
                cols={2}
            >
                {toTitleCase(bug?.estado || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Severidad"
                icon={<ShieldAlertIcon size={16} />}
                contentClassName={bug?.severidad ? bugSeverityStyles[bug.severidad] : ""}
                cols={2}
            >
                {toTitleCase(bug?.severidad || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Tipo de defecto"
                icon={<BlocksIcon size={16} />}
                contentClassName="bg-neutral-200"
                cols={2}
            >
                {toTitleCase(bug?.tipo_defecto || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Fecha de creación"
                icon={<CalendarIcon size={16} />}
                cols={2}
            >
                {formatDate(bug?.fecha_creacion)}
            </DetailItemCard>

            <DetailItemCard
                label="Fecha límite"
                icon={<CalendarIcon size={16} />}
                cols={2}
            >
                {formatDate(bug?.fecha_limite)}
            </DetailItemCard>

            <DetailItemBlockCard
                label="Descripción"
                icon={<FileTextIcon size={16} />}
            >
                <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                    {bug?.descripcion_detallada || "Sin descripción proporcionada."}
                </p>
            </DetailItemBlockCard>

            {bug?.foto && (
                <DetailItemBlockCard
                    label="Evidencia / Foto"
                    icon={<ImageIcon size={16} />}
                >
                    <div className="w-full bg-white overflow-hidden flex flex-col items-center p-1">
                        <div className="relative w-full h-48 md:h-56 flex items-center justify-center bg-neutral-50">
                            {isLoading && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-100">
                                    <Loader2Icon className="animate-spin text-blue-500" size={32} />
                                </div>
                            )}
                            <Image
                                src={bug.foto}
                                alt="Evidencia del defecto"
                                fill
                                className={`object-contain transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'
                                    }`}
                                sizes="(max-width: 768px) 100vw, 350px"
                                onLoad={() => setIsLoading(false)}
                            />
                        </div>
                        <a
                            href={bug.foto}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:underline mt-1 self-end mr-2"
                        >
                            Ver imagen completa
                        </a>
                    </div>
                </DetailItemBlockCard>
            )}

        </DetailCard>
    );
}