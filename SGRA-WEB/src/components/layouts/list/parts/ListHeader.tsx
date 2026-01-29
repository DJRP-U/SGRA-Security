import { ColumnDefinition } from "@/tipos/table/tableType";

interface ListHeaderProps<T> {
  columns: ColumnDefinition<T>[];
  hasActions: boolean;
}

export default function ListHeader<T>({ columns, hasActions }: ListHeaderProps<T>) {
  return (
    <thead className="border border-neutral-400 bg-neutral-50 tracking-tighter">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key as string}
            className={`
              px-6 py-3 text-left text-lg 
              text-neutral-500 border-neutral-400
              font-medium
            `}
          >
            {column.title}
        </th>
        ))}

        {hasActions && <th />}
      </tr>
    </thead>
  );
}
