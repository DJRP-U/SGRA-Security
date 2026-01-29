import { SIZE_PAGES } from "../page";
import ArrowPageList from "./ArrowPageList";
import PageList from "./PageList";

interface PaginationListProps {
    totalItems: number;
    currentPage: number;
}

export default function PaginationList({
    totalItems,
    currentPage,
}: PaginationListProps) {

    const totalPages = Math.ceil(totalItems / SIZE_PAGES);

    return (
        <ul className="w-full flex justify-center">
            <div className="flex gap-2">
                <li>
                    <ArrowPageList
                        page={currentPage <= 1 ? currentPage : currentPage - 1}
                        type="previous"
                    />
                </li>
                <div className="flex">
                    {Array.from({ length: totalPages }, (_, i) => {
                        const page = i + 1;
                        const isActive = page === currentPage;

                        return (
                            <li key={page}>
                                <PageList
                                    isActive={isActive}
                                >
                                    {page}
                                </PageList>
                            </li>
                        );
                    })}
                </div>
                <li>
                    <ArrowPageList
                        page={currentPage >= totalPages ? currentPage : currentPage + 1}
                        type="next"
                    />
                </li>
            </div>
        </ul>
    );
}
