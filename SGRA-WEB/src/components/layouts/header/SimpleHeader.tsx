import { StoneIcon } from "lucide-react";
import Link from "next/link";

type SimpleHeaderProps = {
    userName?: string;
    homeHref?: string; // Nueva prop para el enlace del icono
};

export default function SimpleHeader({ userName = "A M", homeHref = "/home" }: SimpleHeaderProps) {
    const initials = userName
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <header
            className="py-2 px-3 tracking-tighter w-full border-b border-t border-neutral-300 flex-shrink-0 flex items-center justify-between"
        >
            <Link
                className="flex items-center text-neutral-700 hover:bg-neutral-100 p-1 rounded-md"
                href={homeHref} // Usamos la prop aquí
            >
                <StoneIcon size={22} strokeWidth={2.3} />
                <span className="flex font-semibold text-base ml-1">SGRA</span>
            </Link>

            <div
                className="flex items-center justify-center 
                   w-8 h-8 rounded-full 
                   border
                   text-xs font-medium"
            >
                {initials}
            </div>
        </header>
    );
}
