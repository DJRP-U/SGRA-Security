'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function TestPage() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('categoria', term);
        } else {
            params.delete('categoria');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex gap-2">
            <button onClick={() => handleFilter('tecnologia')}>Tecnología</button>
            <button onClick={() => handleFilter('hogar')}>Hogar</button>
            <button onClick={() => handleFilter('')}>Limpiar</button>
        </div>
    );
}