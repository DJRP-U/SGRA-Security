"use client";
import { useState } from "react";
import { ColumnDefinition, DataItem, RowAction } from "@/tipos/table/tableType";
import ListRow from "./parts/ListRow";
import ListHeader from "./parts/ListHeader";
import ListEmpty from "./parts/ListEmpty";
import ListNoResults from "./parts/ListNoResults";

export type EmptyState = "no-data" | "no-results";

interface EmptyAction {
    label: string;
    onClick: () => void;
}

interface ListProps<T> {
    columns: ColumnDefinition<T>[];
    actions?: RowAction<T>[];
    data: T[];
    emptyState?: EmptyState;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: EmptyAction;
}

export default function List<T extends DataItem>({
    columns,
    actions = [],
    data,
    emptyTitle,
    emptyDescription,
    emptyAction,
    emptyState
}: ListProps<T>) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const handleToggleMenu = (uuid: string) => {
        setOpenMenuId((prev) => (prev === uuid ? null : uuid));
    };

    const handleActionClick = <TItem extends T>(
        action: RowAction<TItem>,
        item: TItem
    ) => {
        action.onClick(item);
        setOpenMenuId(null);
    };

    return (
        <div className="w-full flex flex-col">
            <div className="overflow-visible">
                <table className="min-w-full divide-y divide-neutral-200">
                    <ListHeader columns={columns} hasActions={actions.length > 0} />
                    <tbody className="bg-white divide-y divide-neutral-100">
                        {data.length === 0 && emptyState === "no-data" && (
                            <ListEmpty
                                columnsCount={columns.length}
                                hasActions={actions.length > 0}
                                title={emptyTitle}
                                description={emptyDescription}
                                action={emptyAction}
                            />
                        )}
                        {data.length === 0 && emptyState === "no-results" && (
                            <ListNoResults
                                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                                title="Sin resultados"
                                description="No se encontraron resultados"
                            />
                        )}
                        {data.length > 0 &&
                            data.map((item, index) => (
                                <ListRow
                                    key={item.uuid}
                                    item={item}
                                    columns={columns}
                                    actions={actions}
                                    isMenuOpen={openMenuId === item.uuid}
                                    onToggleMenu={() => handleToggleMenu(item.uuid)}
                                    onActionClick={handleActionClick}
                                    index={index}
                                />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}