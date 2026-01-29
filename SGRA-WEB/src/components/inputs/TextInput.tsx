"use client"
import { useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface TextInputProps {
    id: string
    type?: string
    placeholder?: string
    register: UseFormRegisterReturn
    hasError?: boolean
    readonly?: boolean
}

export function TextInput({
    id,
    type = "text",
    placeholder,
    register,
    hasError,
    readonly = false
}: TextInputProps) {
    const [hasValue, setHasValue] = useState(false)

    let styleInput = "";

    if (!readonly) {
        styleInput = `
                  w-full text-neutral-600 outline-none border rounded-sm text-lg px-3 py-2 transition-colors
                  ${hasValue ? "border-neutral-700" : "border-neutral-400"}
                  ${hasError ? "border-red-700" : ""}
        `;
    } else {
        styleInput = `
                w-full outline-none rounded-sm px-3 py-2 transition-colors
                text-lg
                ${readonly
                ? "bg-neutral-50 text-neutral-500 border border-neutral-300 cursor-default"
                : "bg-white text-neutral-700 border border-neutral-400 focus:border-neutral-700"
            }
                ${hasError && !readonly ? "border-red-700" : ""}
        `;
    }

    return (
        <input
            id={id}
            type={type}
            readOnly={readonly}
            placeholder={placeholder}
            className={styleInput}
            {...register}
            onKeyDown={(e) => {
                if (type === "number" && ["e", "E", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                }
            }}
            onChange={(e) => {
                register.onChange(e)
                setHasValue(e.target.value.trim() !== "")
            }}
        />
    )
}
