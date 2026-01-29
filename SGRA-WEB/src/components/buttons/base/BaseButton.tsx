import { ReactNode } from "react";

interface BaseButtonProps {
    children: ReactNode
    onClick?: () => void
    className?: string
    textSize?: string
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    secondary?: boolean
}

export default function BaseButton({
    children,
    onClick,
    className = "",
    textSize = "",
    disabled = false,
    type = "submit",
    secondary = false,
}: BaseButtonProps) {

    const text = textSize || "text-lg";

    const bgColors = secondary ? "bg-white text-neutral-500 hover:text-neutral-600 hover:bg-neutral-200" : "bg-blue-400 text-white hover:bg-blue-500";

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={!disabled ? onClick : undefined}
            className={`
                        inline-flex items-center justify-center
                        gap-1
                        tracking-tighter
                        font-medium
                        px-3 py-1
                        rounded-sm
                        ${bgColors}
                        ${text}
                        ${disabled
                    ? "cursor-not-allowed opacity-90"
                    : "cursor-pointer"}
                        ${className}
            `}
        >
            {children}
        </button>
    );
}
