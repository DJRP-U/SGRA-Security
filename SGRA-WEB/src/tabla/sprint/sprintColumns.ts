import { SprintStatus } from "@/enums/sprintEnum";
import { colors, textColors } from "@/styles/colors";
import { SprintDTO } from "@/tipos/DTOs/sprintDTO";
import { ColumnDefinition } from "@/tipos/table/tableType";
import { toTitleCase } from "@/utils/format";

export const sprintColumns: ColumnDefinition<SprintDTO>[] = [
    {
        key: "nombre",
        title: "Nombre",
        type: "text"
    },
    {
        key: "fecha_inicio",
        title: "Fecha incio",
        type: "text"
    },
    {
        key: "fecha_fin",
        title: "Fecha fin",
        type: "text"
    },
    {
        key: "estado",
        title: "Estado",
        type: "select",
        options: [
            {
                value: SprintStatus.PLANNING,
                label: toTitleCase(SprintStatus.PLANNING),
                className: colors.warning + " " + textColors.label
            },
            {
                value: SprintStatus.IN_PROGRESS,
                label: toTitleCase(SprintStatus.IN_PROGRESS),
                className: colors.info + " " + textColors.label
            },
            {
                value: SprintStatus.DONE,
                label: toTitleCase(SprintStatus.DONE),
                className: colors.success + " " + textColors.label
            },
            {
                value: SprintStatus.CANCELED,
                label: toTitleCase(SprintStatus.CANCELED),
                className: colors.danger + " " + textColors.label
            },
        ]
    }
];