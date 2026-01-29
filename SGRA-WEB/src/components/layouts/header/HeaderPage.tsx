import { StoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderPage() {
    return (
        <header
            className="py-2 px-3  w-full flex-shrink-0 flex items-center justify-between tracking-tighter"
        >
            <Link className="flex items-center justify-center" href="/">
                <StoneIcon size={24} />
                <span className="flex font-semibold text-lg ml-1 text-neutral-800">SGRA</span>
            </Link>
            <Link href={"/auth/contact-us"}>
                <span className="flex font-medium text-base ml-1 text-white border px-4 py-1 rounded-md bg-neutral-600 hover:bg-neutral-800">Contactanos</span>
            </Link>
        </header>
    );
}