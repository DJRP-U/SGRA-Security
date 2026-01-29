"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentVariant } from '@/enums/componets';
import { ComponentType } from 'react';
import { IconProps } from '@/components/icons/props/propsIcons';
import isPathActive from '@/utils/path/path';
import { UrlObject } from 'url';

const WIDTH_ICON = 18;
const HEIGHT_ICON = 18;

type Props = {
    label: string;
    href?: string | UrlObject;
    width?: number;
    height?: number;
    variant?: ComponentVariant;
    IconComponent: ComponentType<IconProps>;
}

export default function NavItem({
    label,
    href,
    width = WIDTH_ICON,
    height = HEIGHT_ICON,
    variant = ComponentVariant.PRIMARY,
    IconComponent,
}: Props) {

    const pathname = usePathname();

    const isActive = isPathActive(pathname, href);

    const baseClasses = "flex items-center w-full rounded-sm tracking-tighter px-2 py-1 cursor-pointer transition-colors";

    const colorClasses =
        variant === ComponentVariant.SECONDARY
            ? "text-base ml-4"
            : "text-lg font-medium";

    const activeClass = isActive
        ? "text-neutral-800 font-medium bg-neutral-150"
        : "text-neutral-500";

    const hoverClasses = "hover:bg-neutral-200 hover:text-neutral-800";

    const itemClasses = `${baseClasses} ${hoverClasses} ${colorClasses} ${activeClass}`;

    const itemContent = (
        <div className={itemClasses} >
            <IconComponent
                width={width}
                height={height}
            />
            <span className="ml-2 truncate flex-1">
                {label}
            </span>
        </div>
    );

    if (href) {
        return (
            <Link
                href={href}
                passHref
            >
                {itemContent}
            </Link>
        );
    }

    return itemContent;
};