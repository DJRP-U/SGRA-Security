import Link from "next/link";

interface PageListProps {
    children?: React.ReactNode
    isActive?: boolean
}

export default function PageList({ children, isActive = false }: PageListProps) {

    const pages = Number(children);

    return (
        <Link
            href={`?page=${pages}`}
            className={`
                        px-2.5 py-1.5 rounded-sm text-sm font-semibold text-neutral-500
                        ${isActive
                        ? "bg-blue-400 text-white"
                        : "hover:bg-neutral-200"}
            `}
        >
            {children}
        </Link>
    );
}
