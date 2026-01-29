"use client";

import Link from "next/link";

interface Props {
    label: string;
    href: string;
}

export default function LinkButtonForm({ label, href }: Props) {
    return (
        <Link href={href} className="block w-full" as={href}>
            <button
                type="button"
                className="w-full text-center tracking-tighter bg-neutral-600 text-white text-sm py-1 rounded-xs mt-4 cursor-pointer"
            >
                {label}
            </button>
        </Link>
    );
}
