import DetailCard from "./DetailCard";
import DetailItemCard from "./items/DetailItemCard";
import DetailItemBlockCard from "./items/DetailItemBlockCard";
import { toTitleCase } from "@/utils/format";
import { UserStoryDTO } from "@/tipos/DTOs/userStoryDTO";
import { userStoryPriorityStyles, userStoryStateStyles } from "@/styles/mappers/userStory";
import { ArrowUpIcon, CalendarIcon, CircleUserRoundIcon, ClipboardCheckIcon, ClipboardPenLineIcon, FileTextIcon, LoaderIcon, StarIcon } from "lucide-react";

type Props = {
    userStory?: UserStoryDTO;
};

export default function UserStoryDetailCard({ userStory }: Props) {

    const dateLastUpdate = new Date(userStory?.fecha_ultima_modificacion || "");
    const dateCreationDate = new Date(userStory?.fecha_creacion || "");

    const formattedLastUpdate = dateLastUpdate.toLocaleString("es-EC", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: false,
    });
    const formattedDateCreation = dateCreationDate.toLocaleString("es-EC", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: false,
    });

    return (
        <DetailCard identifier={userStory?.identificador || "HU_001"}>

            <DetailItemCard
                icon={<ArrowUpIcon size={16} />}
                label="Prioridad"
                contentClassName={
                    userStory?.prioridad
                        ? userStoryPriorityStyles[userStory.prioridad]
                        : ""
                } cols={2}
            >
                {toTitleCase(userStory?.prioridad || "")}
            </DetailItemCard>

            <DetailItemCard
                icon={<LoaderIcon strokeWidth={2.8} size={16} />}
                label="Estado"
                contentClassName={
                    userStory?.estado
                        ? userStoryStateStyles[userStory.estado]
                        : ""
                } cols={2}
            >
                {toTitleCase(userStory?.estado || "")}
            </DetailItemCard>

            <DetailItemCard icon={<StarIcon size={16} />} label="Estimación" cols={2}>
                {userStory?.estimacion}
            </DetailItemCard>

            <DetailItemCard icon={<CircleUserRoundIcon size={16} />} label="Creado por" cols={2}>
                {userStory?.creador}
            </DetailItemCard>

            <DetailItemCard icon={<CalendarIcon size={16} />} label="Fecha de creación" cols={2}>
                {userStory
                    ? formattedDateCreation
                    : ""}
            </DetailItemCard>

            <DetailItemCard icon={<CalendarIcon size={16} />} label="última actualización" cols={2}>
                {userStory
                    ? formattedLastUpdate
                    : ""}
            </DetailItemCard>

            <DetailItemBlockCard icon={<ClipboardPenLineIcon size={16} />} label="Requisito asociado">
                {userStory?.requisitos && userStory.requisitos.length > 0 ? (
                    <ul className="flex text-base ml-1 text-neutral-800">
                        {userStory.requisitos.map((req, index) => (
                            <li key={index} className="bg-neutral-200 px-2 rounded-sm">
                                {toTitleCase(req.identificador) ?? "Requisito"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-xs text-neutral-500">
                        Sin requisitos asociados.
                    </p>
                )}
            </DetailItemBlockCard>

            <DetailItemBlockCard icon={<FileTextIcon strokeWidth={1.9} size={16} />} label="Descripción">
                <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                    {userStory?.descripcion ?? ""}
                </p>
            </DetailItemBlockCard>

            <DetailItemBlockCard icon={<ClipboardCheckIcon size={16} />} label="Criterios de aceptación">
                <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                    {userStory?.criterios_aceptacion ?? ""}
                </p>
            </DetailItemBlockCard>
        </DetailCard>
    );
}
