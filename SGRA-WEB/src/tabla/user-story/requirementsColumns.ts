import { Priority } from "@/enums/baseEnum";
import { UserStoryStatus } from "@/enums/userStoryEnums";
import { colors, textColors } from "@/styles/colors";
import { UserStoryDTO } from "@/tipos/DTOs/userStoryDTO";
import { ColumnDefinition } from "@/tipos/table/tableType";
import { toTitleCase } from "@/utils/format";

export const userStoryColumns: ColumnDefinition<UserStoryDTO>[] = [
    {
        key: "identificador",
        title: "Identificador",
        type: "text"
    },
    {
        key: "titulo",
        title: "Titulo",
        type: "text"
    },
    {
        key: "creador",
        title: "Creado por",
        type: "text"
    },
    {
        key: "prioridad",
        title: "Prioridad",
        type: "select",
        options: [
            {
                value: Priority.HIGH,
                label: toTitleCase(Priority.HIGH),
                className: colors.danger + " " + textColors.label
            },
            {
                value: Priority.MEDIUM,
                label: toTitleCase(Priority.MEDIUM),
                className: colors.warning + " " + textColors.label
            },
            {
                value: Priority.LOW,
                label: toTitleCase(Priority.LOW),
                className: colors.success + " " + textColors.label
            },
        ]
    },
    {
        key: "estado",
        title: "Estado",
        type: "select",
        options: [
            {
                value: UserStoryStatus.PENDING,
                label: toTitleCase(UserStoryStatus.PENDING),
                className: colors.weird + " " + textColors.label
            },
            {
                value: UserStoryStatus.IN_PROGRESS,
                label: toTitleCase(UserStoryStatus.IN_PROGRESS),
                className: colors.primary + " " + textColors.label
            },
            {
                value: UserStoryStatus.COMPLETED,
                label: toTitleCase(UserStoryStatus.COMPLETED),
                className: colors.success + " " + textColors.label
            },
            {
                value: UserStoryStatus.DELAYED,
                label: toTitleCase(UserStoryStatus.DELAYED),
                className: colors.danger + " " + textColors.label
            },
            {
                value: UserStoryStatus.OBSOLETE,
                label: toTitleCase(UserStoryStatus.OBSOLETE),
                className: colors.neutral + " " + textColors.label
            }
        ]
    },
];