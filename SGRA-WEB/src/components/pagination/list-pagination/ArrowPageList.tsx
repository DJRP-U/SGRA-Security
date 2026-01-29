import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type ArrowType = "next" | "previous";

interface ArrowPageListProps {
    type: ArrowType;
    page: number;
}

export default function ArrowPageList({ type, page }: ArrowPageListProps) {

    const isNext = type === "next";
    const sizeIcon = 20;

    return (
        <Link href={`?page=${page}`} className="flex px-0.5 py-0.5 text-neutral-500 bg-neutral-100 rounded-md">
            {isNext ? <ChevronRightIcon size={sizeIcon} /> : <ChevronLeftIcon size={sizeIcon} />}
        </Link>
    );
}
