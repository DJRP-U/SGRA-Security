import { RequirementItem } from "@/tipos/table/requirement/requirementTablaItem";
import { RowAction } from "@/tipos/table/tableType";
import { toast } from "sonner";

export const createRequirementActions = (
    onEdit: (item: RequirementItem) => void,
): RowAction<RequirementItem>[] => [
        {
            key: "edit",
            label: () => "Editar",
            onClick: (item) => {
                onEdit(item);
            },
        },
        {
            key: "showDetails",
            label: () => "Ver detalles",
            onClick: (item) => {
                toast.info(`Detalle de: ${item.identifier}`);
            },
        },
    ];