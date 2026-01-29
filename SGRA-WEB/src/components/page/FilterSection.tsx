import { FunnelIcon } from "lucide-react";
import FilterIcon from "../icons/FilterIcon";
import SearchInput from "../inputs/SearchInput";

type FilterSectionProps = {
    placeholder?: string
}

export default function FilterSection({ placeholder }: FilterSectionProps) {
    return (
        <section className="flex flex-1 justify-between items-center tracking-tighter">
            <SearchInput placeholder={placeholder} />
            <div className='flex items-center cursor-pointer text-neutral-600'>
                <FunnelIcon
                    size={16}
                    strokeWidth={2.4}
                />
                <span className="text-lg font-medium ml-1">Filtrar</span>
            </div>
        </section>
    );
}