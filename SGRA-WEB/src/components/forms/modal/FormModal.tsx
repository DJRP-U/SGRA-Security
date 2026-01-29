"use client";

import Title from "@/components/text/heading/Title";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
}

export default function FormModal({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true,
}: ModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center tracking-tighter">

            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-[0.1px]"
                onClick={onClose}
            />

            <div
                className="relative bg-white rounded-sm shadow-xs p-6 animate-fade-in flex flex-col gap-2"
            >
                <div className="flex justify-between items-center">
                    {title && (
                        <Title>
                            {title}
                        </Title>
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

                <div>
                    {children}
                </div>
            </div>
        </div>
    );
}
