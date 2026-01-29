import { Priority } from "@/enums/baseEnum";
import { TaskStatus } from "@/enums/taskEnum";
import { TaskDTO } from "@/tipos/DTOs/taskDTO";
import { ColumnDefinition } from "@/tipos/table/tableType";
import { toTitleCase } from "@/utils/format";

export const columnsTask: ColumnDefinition<TaskDTO>[] = [
    {
        key: "identificador",
        title: "identificador",
        type: "text",
    },
    {
        key: "titulo",
        title: "Título",
        type: "text",
    },
    {
        key: "responsable_nombre_completo",
        title: "Responsable",
        type: "text",
    },
    {
        key: "prioridad",
        title: "Prioridad",
        type: "select",
        options: [
            {
                value: Priority.HIGH,
                label: toTitleCase(Priority.HIGH),
                className: "bg-red-300",
            },
            {
                value: Priority.MEDIUM,
                label: toTitleCase(Priority.MEDIUM),
                className: "bg-yellow-300",
            },
            {
                value: Priority.LOW,
                label: toTitleCase(Priority.LOW),
                className: "bg-green-300",
            },
        ],
    }, {
        key: "estado",
        title: "Estado",
        type: "select",
        options: [
            {
                value: TaskStatus.PENDING,
                label: toTitleCase(TaskStatus.PENDING),
                className: "bg-sky-300",
            },
            {
                value: TaskStatus.ASSIGNED,
                label: toTitleCase(TaskStatus.ASSIGNED),
                className: "bg-indigo-300",
            },
            {
                value: TaskStatus.IN_PROGRESS,
                label: toTitleCase(TaskStatus.IN_PROGRESS),
                className: "bg-blue-300",
            },
            {
                value: TaskStatus.PENDING_REVIEW,
                label: toTitleCase(TaskStatus.PENDING_REVIEW),
                className: "bg-yellow-300",
            },
            {
                value: TaskStatus.CHANGES_REQUIRED,
                label: toTitleCase(TaskStatus.CHANGES_REQUIRED),
                className: "bg-orange-300",
            },
            {
                value: TaskStatus.COMPLETED,
                label: toTitleCase(TaskStatus.COMPLETED),
                className: "bg-green-300",
            },
        ],
    },

];
