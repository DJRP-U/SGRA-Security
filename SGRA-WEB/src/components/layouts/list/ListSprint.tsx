"use client";
import List, { EmptyState } from "./List";
import { RowAction } from "@/tipos/table/tableType";
import { SprintDTO } from "@/tipos/DTOs/sprintDTO";
import { sprintColumns } from "@/tabla/sprint/sprintColumns";

interface ListSprintProps {
    sprints: SprintDTO[]
    actionsSprint?: RowAction<SprintDTO>[]
    isProductOwner?: boolean
    actionNotExistSprints: () => void
}

export default function ListSprint({ sprints, actionsSprint, isProductOwner = false, actionNotExistSprints }: ListSprintProps) {

    const emptyState : EmptyState = sprints ? "no-data" : "no-results";

    return (
        <List<SprintDTO>
            data={sprints}
            columns={sprintColumns}
            actions={actionsSprint}
            emptyState={emptyState}
            emptyTitle={
                isProductOwner
                    ? "No hay sprints creados."
                    : "No hay sprints disponibles."
            }
            emptyDescription={
                isProductOwner
                    ? "Crea un sprint para empezar a planificar."
                    : "Espera a que agreguen el primero."
            }
            emptyAction={
                isProductOwner
                    ? {
                        label: "Crear sprint",
                        onClick: actionNotExistSprints
                    }
                    : undefined
            }
        />
    );
}