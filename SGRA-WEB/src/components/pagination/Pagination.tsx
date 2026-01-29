"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    totalRecords: number;
    pageSize: number;
}

export default function Pagination({
    totalRecords,
    pageSize,
}: PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(totalRecords / pageSize);

    if (totalPages <= 1) return null;

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex justify-between items-center p-4">
            <div className="text-md text-neutral-500">
                Mostrando <span className="font-medium text-neutral-900">{currentPage * pageSize - pageSize + 1}</span> a{" "}
                <span className="font-medium text-neutral-900">
                    {Math.min(currentPage * pageSize, totalRecords)}
                </span>{" "}
                de <span className="font-medium text-neutral-900">{totalRecords}</span> resultados
            </div>

            <div className="flex items-center gap-2">
                <button
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-1 border rounded-md hover:bg-neutral-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    title="Anterior"
                >
                    <ChevronLeft size={20} className="text-neutral-600" strokeWidth={2.4} />
                </button>

                <div className="flex items-center gap-1">
                    <span className="text-base text-neutral-600 font-medium px-4 py-1">
                        Página {currentPage} de {totalPages}
                    </span>
                </div>

                <button
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-1 border rounded-md hover:bg-neutral-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    title="Siguiente"
                >
                    <ChevronRight size={20} className="text-neutral-600" strokeWidth={2.4} />
                </button>
            </div>
        </div>
    );
}