"use client";
import Image from "next/image";
import { toTitleCase } from "@/utils/format";
import { ColumnDefinition, DataItem, RowAction } from "@/tipos/table/tableType";

interface ListRowProps<T extends DataItem> {
    item: T;
    columns: ColumnDefinition<T>[];
    actions: RowAction<T>[];
    isMenuOpen: boolean;
    onToggleMenu: () => void;
    onActionClick: (action: RowAction<T>, item: T) => void;
    index: number;
}

export default function ListRow<T extends DataItem>({
    item,
    columns,
    actions,
    isMenuOpen,
    onToggleMenu,
    onActionClick,
    index
}: ListRowProps<T>) {
    const renderCell = (item: T, column: ColumnDefinition<T>) => {
        const value = item[column.key];

        switch (column.type) {
            case "text":
                return <span>{toTitleCase(String(value))}</span>;
            case "email":
                return <span>{String(value)}</span>;
            case "date": {
                const date = new Date(String(value));
                return (
                    <span>
                        {date.toLocaleString("es-EC", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </span>
                );
            }
            case "number":
                return <span className="w-full block">{Number(value).toFixed(0)}</span>;
            case "select": {
                const option = column.options?.find((opt) => opt.value === value);
                return (
                    <span className={`px-2 py-0.5 rounded-sm font-medium ${option?.className ?? ""}`}>
                        {option?.label || "N/A"}
                    </span>
                );
            }
            default:
                return <span>{String(value)}</span>;
        }
    };

    return (
        <tr className={`hover:bg-neutral-100 relative tracking-tighter ${isMenuOpen ? "z-50" : "z-10"}`}>
            {columns.map((column) => (
                <td key={column.key as string} className="px-6 tracking-tighter whitespace-nowrap text-lg text-neutral-600">
                    {renderCell(item, column)}
                </td>
            ))}

            <td className="px-6 py-1 whitespace-nowrap text-right text-sm font-medium">
                {actions.length > 0 && (
                    <div className="relative">
                        <button
                            onClick={onToggleMenu}
                            className={`inline-flex items-center p-1 rounded-md hover:bg-neutral-200 hover:text-neutral-700 focus:outline-none ${isMenuOpen ? "bg-gray-100 text-gray-700" : ""
                                }`}
                        >
                            <Image src="/menu-table.svg" width={24} height={24} alt="icon menu table" />
                        </button>

                        {isMenuOpen && (
                            <div
                                className={`absolute right-0 min-w-48 rounded-md shadow-lg border border-gray-200 bg-white focus:outline-none z-[100] 
                                    ${index > 5
                                        ? "bottom-full mb-2 origin-bottom-right"
                                        : "mt-2 origin-top-right"
                                    }`}
                            >
                                <div className="py-1">
                                    {actions
                                        .filter((action) => (action.show ? action.show(item) : true))
                                        .map((action) => (
                                            <button
                                                key={action.key}
                                                onClick={() => onActionClick(action, item)}
                                                className="flex items-center gap-2 text-neutral-700 w-full text-left px-4 py-1 text-lg hover:bg-neutral-100"
                                            >
                                                {action.icon && <span className="flex items-center justify-center">{action.icon}</span>}
                                                <span className="flex-1">{action.label(item)}</span>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </td>
        </tr>
    );
}