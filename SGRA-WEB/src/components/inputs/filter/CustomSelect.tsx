"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
    options: { label: string; value: string | null }[]
    value: string | null
    onChange: (value: string | null) => void
    placeholder?: string
}

export default function CustomSelect({
    options,
    value,
    onChange,
    placeholder,
}: CustomSelectProps) {

    const [isOpen, setIsOpen] = useState(false);

    const selectedLabel =
        value === null
            ? placeholder
            : options.find(o => o.value === value)?.label || placeholder;
    const isFiltered = typeof value === "string" && value.length > 0;

    return (
        <div className="relative w-48">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    inline-flex items-center justify-between
                    w-full
                    px-3 py-1
                    font-medium
                    tracking-tighter
                    text-lg
                    text-neutral-500
                    rounded-sm
                    outline
                    transition-[outline-color,outline-width]
                    cursor-pointer

                    ${isFiltered
                        ? "outline-2 outline-blue-400"
                        : isOpen
                            ? "outline-2 outline-blue-400"
                            : "outline-1 outline-neutral-400"
                    }

                    hover:outline-blue-400
                `}
            >
                <span className="truncate">{selectedLabel}</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <ul className="absolute z-20 w-full mt-2 bg-white shadow-xl max-h-60 overflow-auto rounded-sm outline outline-1 outline-neutral-200">
                        {options.map(opt => (
                            <li
                                key={opt.value ?? "all"}
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`
                                    px-4 py-2
                                    text-base
                                    cursor-pointer
                                    hover:bg-neutral-100
                                    ${value === opt.value
                                        ? "text-blue-500 font-medium"
                                        : "text-gray-700"}
                                `}
                            >
                                {opt.label}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
