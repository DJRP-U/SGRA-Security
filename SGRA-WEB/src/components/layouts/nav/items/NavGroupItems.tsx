"use client";
import Arrow from "@/components/icons/Arrow";
import { ComponentType, useState } from "react";
import { ComponentVariant } from "@/enums/componets";
import { IconProps } from "@/components/icons/props/propsIcons";
import NavItem from "./NavItem";

type SubItem = {
    label: string;
    href: string;
    IconComponent: ComponentType<IconProps>;
};

type Props = {
    title: string;
    subItems: SubItem[];
    defaultOpen?: boolean;
    IconComponent: ComponentType<IconProps>;
    width?: number;
    height?: number;
};

export default function NavGroupItems({
    title,
    subItems,
    defaultOpen,
    IconComponent,
    width = 24,
    height = 24,
}: Props) {
    const [isOpen, setIsOpen] = useState(
        defaultOpen ?? subItems.length > 0
    );

    const toggleAccordion = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div>
            <div
                className="group flex justify-between hover:bg-neutral-200 items-center w-full pr-1 rounded-sm cursor-pointer transition-colors"
                onClick={toggleAccordion}
            >
                <NavItem label={title} IconComponent={IconComponent} />
                <Arrow isOpen={isOpen} />
            </div>

            {isOpen && (
                <div className="overflow-hidden transition-all duration-300 ease-in-out">
                    <div>
                        {subItems.map((item) => (
                            <NavItem
                                key={item.label}
                                href={item.href}
                                label={item.label}
                                variant={ComponentVariant.SECONDARY}
                                IconComponent={item.IconComponent}
                                width={width}
                                height={height}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
