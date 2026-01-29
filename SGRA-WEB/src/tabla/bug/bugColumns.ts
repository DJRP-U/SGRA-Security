import { BugSeverity, BugStatus } from "@/enums/bugEnum";
import { BugDTO } from "@/tipos/DTOs/bugDTO";
import { ColumnDefinition } from "@/tipos/table/tableType";
import { toTitleCase } from "@/utils/format";

export const columnsBug: ColumnDefinition<BugDTO>[] = [
    {
        key: "codigo",
        title: "Código",
        type: "text",
    },
    {
        key: "titulo",
        title: "Título",
        type: "text",
    },
    {
        key: "fecha_creacion",
        title: "Fecha creación",
        type: "date",
    },
    {
        key: "fecha_limite",
        title: "Fecha límite",
        type: "date",
    },
    {
        key: "severidad",
        title: "Severidad",
        type: "select",
        options: [
            {
                value: BugSeverity.BAJO,
                label: toTitleCase(BugSeverity.BAJO),
                className: "bg-green-300",
            },
            {
                value: BugSeverity.MEDIO,
                label: toTitleCase(BugSeverity.MEDIO),
                className: "bg-yellow-300",
            },
            {
                value: BugSeverity.ALTO,
                label: toTitleCase(BugSeverity.ALTO),
                className: "bg-orange-300",
            },
            {
                value: BugSeverity.SEVERO,
                label: toTitleCase(BugSeverity.SEVERO),
                className: "bg-red-300",
            },
            {
                value: BugSeverity.CRITICO,
                label: toTitleCase(BugSeverity.CRITICO),
                className: "bg-red-400 text-neutral-700",
            },
        ],
    },
    {
        key: "estado",
        title: "Estado",
        type: "select",
        options: [
            {
                value: BugStatus.PENDIENTE,
                label: toTitleCase(BugStatus.PENDIENTE),
                className: "bg-gray-300",
            },
            {
                value: BugStatus.ASIGNADO,
                label: toTitleCase(BugStatus.ASIGNADO),
                className: "bg-blue-200",
            },
            {
                value: BugStatus.EN_DESARROLLO,
                label: toTitleCase(BugStatus.EN_DESARROLLO),
                className: "bg-blue-400",
            },
            {
                value: BugStatus.EN_REVISION,
                label: toTitleCase(BugStatus.EN_REVISION),
                className: "bg-purple-300",
            },
            {
                value: BugStatus.ATRASADO,
                label: toTitleCase(BugStatus.ATRASADO),
                className: "bg-red-300",
            },
            {
                value: BugStatus.RESUELTO,
                label: toTitleCase(BugStatus.RESUELTO),
                className: "bg-green-400",
            },
            {
                value: BugStatus.CANCELADO,
                label: toTitleCase(BugStatus.CANCELADO),
                className: "bg-neutral-400",
            },
        ],
    },
];