"use client"
import { IconProps } from "@/components/icons/props/propsIcons";
import isPathActive from "@/utils/path/path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType } from "react";

const WIDTH_ICON = 18;
const HEIGHT_ICON = 18;

type ProjectNavItemProps = {
    label: string;
    href: string;
    width?: number;
    height?: number;
    IconComponent: ComponentType<IconProps>;
    iconSize?: number;
}

export default function ProjectNavItem({
    label,
    href,
    width = WIDTH_ICON,
    height = HEIGHT_ICON,
    IconComponent,
}: ProjectNavItemProps) {

    const pathname = usePathname();

    const isActive = isPathActive(pathname, href);

    const baseClasses = "flex items-center px-1 text-lg font-medium tracking-tighter w-full rounded-sm tracking-tighter py-1 pr-[8px] cursor-pointer transition-colors";

    const colorClasses = isActive
        ? "text-neutral-500 border-orange-500 border-b-2 text-neutral-800"
        : "text-neutral-500";

    const hoverClasses = "hover:bg-neutral-200 hover:text-neutral-800";

    const itemClasses = `${baseClasses} ${hoverClasses}`;

    const itemContent = (
        <Link
            href={href}
            className={`py-2 ${colorClasses}`}
        >
            <div className={itemClasses} >
                <IconComponent
                    width={width}
                    height={height}
                />
                <span className="ml-1">
                    {label}
                </span>
            </div>
        </Link>
    );

    return itemContent;
}