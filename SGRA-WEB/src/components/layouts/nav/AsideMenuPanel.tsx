"use client";
import { ReactNode } from "react";

type AsideMenuPanelProps = {
    header?: ReactNode
    children: ReactNode
    footer: ReactNode
};

export default function AsideMenuPanel({ header, children, footer }: AsideMenuPanelProps) {
    return (
        <aside
            className="
                flex flex-col justify-between
                px-2 pt-2
                min-h-[94vh] w-[225px]
                text-sm
                border-r border-neutral-300
                select-none
            "
        >
            <div>
                {header}
            </div>

            <div className="flex-1">
                {children}
            </div>

            <div className="border-t border-neutral-300 py-2">
                {footer}
            </div>
        </aside>
    );
}
