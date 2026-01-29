"use client";
import { IconProps } from "@/components/icons/props/propsIcons";
import { colorMapBacklogItems } from "@/styles/mappers/navBacklog";
import isPathActive, { isBacklogPathActive } from "@/utils/path/path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType } from "react";

const WIDTH_ICON = 20;
const HEIGHT_ICON = 20;

type BacklogNavItemProps = {
    href: string
    width?: number
    height?: number
    color?: string
    IconComponent: ComponentType<IconProps>
    title?: string
    label?: string
}

export default function BacklogNavItem({
    href,
    width = WIDTH_ICON,
    height = HEIGHT_ICON,
    color = "blue",
    IconComponent,
    title,
    label,
}: BacklogNavItemProps) {

    const pathname = usePathname();

    const isActive = isBacklogPathActive(pathname, href);

    const selectedColor = colorMapBacklogItems[color];

    const colorClasses = selectedColor.textColor;

    const borderClasses = isActive ? "border-2 border-current" : "border-2 border-transparent hover:border-current";

    const hoverClasses = isActive
        ? `${selectedColor.hoverActiveText}`
        : `${selectedColor.hoverText}`;

    const baseClasses = "flex items-center p-1 px-2 text-lg font-medium tracking-tighter w-full rounded-sm cursor-pointer transition-colors";

    const itemClasses = `${baseClasses} ${colorClasses} ${hoverClasses} ${borderClasses}`;

    return (
        <Link
            href={href}
            title={title}
        >
            <div className={itemClasses} >
                <IconComponent
                    width={width}
                    height={height}
                />
                {label && <span>{label}</span>}
            </div>
        </Link>
    );
}