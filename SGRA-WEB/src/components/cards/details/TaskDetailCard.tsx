import { toTitleCase } from "@/utils/format";
import DetailCard from "./DetailCard";
import DetailItemCard from "./items/DetailItemCard";
import DetailItemBlockCard from "./items/DetailItemBlockCard";
import { TaskDTO } from "@/tipos/DTOs/taskDTO";
import {
    ArrowUpIcon,
    CalendarIcon,
    ClipboardPenLineIcon,
    ClockIcon,
    FileTextIcon,
    LayoutListIcon,
    LoaderIcon,
    MessageSquareIcon,
    StarIcon,
    UserIcon,
} from "lucide-react";

// Estilos para los estados de la tarea (puedes ajustarlos según tus colores)
const taskStatusStyles: Record<string, string> = {
    PENDIENTE: "bg-gray-300",
    EN_PROGRESO: "bg-blue-300",
    EN_REVISION: "bg-purple-300",
    COMPLETADA: "bg-green-400",
    BLOQUEADA: "bg-red-300",
};

export default function TaskDetailCard({ task }: { task: TaskDTO | null }) {

    const formatDate = (date?: Date | string) =>
        date ? new Date(date).toLocaleDateString("es-EC") : "—";

    return (
        <DetailCard identifier={task?.identificador}>

            <DetailItemCard
                label="Estado"
                icon={<LoaderIcon size={16} />}
                contentClassName={task?.estado ? taskStatusStyles[task.estado] : ""}
                cols={2}
            >
                {toTitleCase(task?.estado || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Prioridad"
                icon={<ArrowUpIcon size={16} />}
                contentClassName="bg-amber-100"
                cols={2}
            >
                {toTitleCase(task?.prioridad || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Tipo"
                icon={<LayoutListIcon size={16} />}
                cols={2}
            >
                {toTitleCase(task?.tipo_tarea || "")}
            </DetailItemCard>

            <DetailItemCard
                label="Estimación"
                icon={<StarIcon size={16} />}
                cols={2}
            >
                {task?.estimacion_horas}
            </DetailItemCard>

            <DetailItemCard
                label="Fecha límite"
                icon={<CalendarIcon size={16} />}
                cols={2}
            >
                {formatDate(task?.fecha_limite)}
            </DetailItemCard>

            <DetailItemCard
                label="Responsable"
                icon={<UserIcon size={16} />}
                cols={2}
            >
                <span className="text-md truncate">
                    {task?.responsable
                        ? `${task.responsable.nombre} ${task.responsable.apellido}`
                        : "No asignado"}
                </span>
            </DetailItemCard>
            <DetailItemBlockCard icon={<ClipboardPenLineIcon size={16} />} label="Historia de usuario asociada">
                <span className="bg-emerald-200 px-2 rounded-sm text-base">
                    {task?.historia_usuario.identificador}
                </span>
            </DetailItemBlockCard>
            <DetailItemBlockCard
                label="Descripción"
                icon={<FileTextIcon size={16} />}
            >
                <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                    {task?.descripcion || "Sin descripción."}
                </p>
            </DetailItemBlockCard>

            <DetailItemBlockCard
                label="Criterios de Entrada"
                icon={<LayoutListIcon size={16} />}
            >
                <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                    {task?.criterios_entrada || "No definidos."}
                </p>
            </DetailItemBlockCard>

            <DetailItemBlockCard
                label="Criterios de Salida"
                icon={<LayoutListIcon size={16} />}
            >
                <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                    {task?.criterios_salida || "No definidos."}
                </p>
            </DetailItemBlockCard>
            {task?.comentario_para_ajustes?.trim() && (
                <DetailItemBlockCard
                    label="Ajustes a realizar"
                    icon={<MessageSquareIcon size={16} />}
                >
                    <p className="w-full border border-neutral-300 rounded-xs px-3 py-2 whitespace-pre-wrap break-words bg-white">
                        {task.comentario_para_ajustes.trim()}
                    </p>
                </DetailItemBlockCard>
            )}

        </DetailCard>
    );
}