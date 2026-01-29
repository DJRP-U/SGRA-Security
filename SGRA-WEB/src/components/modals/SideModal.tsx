"use client";
import { ReactNode } from "react";
import Subtitle from "../text/heading/Subtitle";

type SideModalProps = {
    isOpen: boolean;
    onClose: () => void
    title?: string
    children: ReactNode
    showCloseButton?: boolean
    widthClassName?: string
};

export default function SideModal({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
    widthClassName = "w-full max-w-lg",
}: SideModalProps) {
    return (
        <div
            className={`
                fixed inset-0 z-50 flex justify-end items-center tracking-tighter
                transition-opacity duration-300
                ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        >
            <div
                className={`
                    absolute inset-0 bg-black/10
                    transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "opacity-0"}
                `}
                onClick={onClose}
            />
            <aside
                className={`
                    relative mr-1 bg-white shadow-lg
                    ${widthClassName}
                    transform transition-transform duration-300 ease-out
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    max-h-screen overflow-y-auto
                    rounded-sm
                    px-8 py-8
                `}
            >
                <div className="flex items-center justify-between">
                    {title && (
                        <Subtitle>
                            {title}
                        </Subtitle>
                    )}

                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="text-neutral-600 hover:text-neutral-700 cursor-pointer"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </aside>
        </div>
    );
}
