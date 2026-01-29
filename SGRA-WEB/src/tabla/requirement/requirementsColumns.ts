import { Priority } from "@/enums/baseEnum";
import { RequirementStatus, RequirementType } from "@/enums/requirementEnum";
import { colors, textColors } from "@/styles/colors";
import { RequirementDTO } from "@/tipos/DTOs/requirementDTO";
import { ColumnDefinition } from "@/tipos/table/tableType";
import { toTitleCase } from "@/utils/format";

export const requirementColumns: ColumnDefinition<RequirementDTO>[] = [
    {
        key: "identificador",
        title: "Identificador",
        type: "text"
    },
    {
        key: "nombre",
        title: "Nombre",
        type: "text"
    },
    {
        key: "versionActual",
        title: "Versión",
        type: "number"
    },
    {
        key: "tipo",
        title: "Tipo",
        type: "select",
        options: [
            {
                value: RequirementType.FUNCTIONAL,
                label: toTitleCase(RequirementType.FUNCTIONAL),
                className: colors.primary + " " + textColors.label
            },
            {
                value: RequirementType.NON_FUNCTIONAL,
                label: toTitleCase(RequirementType.NON_FUNCTIONAL),
                className: colors.dubious + " " + textColors.label
            }
        ]
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
            }
        ]
    },
    {
        key: "estado",
        title: "Estado",
        type: "select",
        options: [
            {
                value: RequirementStatus.PENDING,
                label: toTitleCase(RequirementStatus.PENDING),
                className: colors.neutral + " " + textColors.label
            },
            {
                value: RequirementStatus.REJECTED,
                label: toTitleCase(RequirementStatus.REJECTED),
                className: colors.dubious + " " + textColors.label
            },
            {
                value: RequirementStatus.APPROVED,
                label: toTitleCase(RequirementStatus.APPROVED),
                className: colors.info + " " + textColors.label
            },
            {
                value: RequirementStatus.IN_PROGRESS,
                label: toTitleCase(RequirementStatus.IN_PROGRESS),
                className: colors.warning + " " + textColors.label
            },
            {
                value: RequirementStatus.FINISHED,
                label: toTitleCase(RequirementStatus.FINISHED),
                className: colors.success + " " + textColors.label
            },
            {
                value: RequirementStatus.OBSOLETE,
                label: toTitleCase(RequirementStatus.OBSOLETE),
                className: colors.secondary + " " + textColors.label
            }
        ]
    }
];