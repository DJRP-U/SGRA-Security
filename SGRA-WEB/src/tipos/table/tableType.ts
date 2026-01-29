export type ColumnType = 'text' | 'number' | 'select' | 'date' | 'email';

export interface ColumnDefinition<T> {
    key: keyof T
    title: string
    type: ColumnType
    options?: { value: string; label: string; className?: string }[]
}

export interface RowAction<T> {
    key: string;
    label: (item: T) => React.ReactNode;
    icon?: React.ReactNode;
    show?: (item: T) => boolean;
    onClick: (item: T) => void;
}


export interface DataItem {
    uuid: string
    [key: string]: any
}
