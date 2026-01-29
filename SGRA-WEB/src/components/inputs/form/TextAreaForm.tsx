"use client";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { LabelForm } from "./parts/LabelForm";
import { ErrorForm } from "./parts/ErrorForn";

interface Props {
    label: string
    id: string
    placeholder?: string
    register: UseFormRegisterReturn
    error?: FieldError
    required?: boolean
    rows?: number
    width?: string
}

export default function TextAreaInputForm({
    label,
    id,
    placeholder,
    register,
    error,
    required = false,
    rows = 3,
    width = "min-w-sm max-w-sm"
}: Props) {
    const [hasValue, setHasValue] = useState(false);

    return (
        <div className={`${width} tracking-tighter scrollbar-hidden flex flex-col gap-1`}>
            <LabelForm
                htmlFor={id}
                label={label}
                required={required}
            />
            <textarea
                id={id}
                placeholder={placeholder}
                rows={rows}
                className={`w-full text-neutral-600 outline-none border rounded-sm text-lg px-3 py-2 transition-colors resize-none
                            ${hasValue ? "border-neutral-700" : "border-neutral-400"}
                            ${!!error ? "border-red-700" : ""}
                `}
                {...register}
                onChange={(e) => {
                    register.onChange(e);
                    setHasValue(e.target.value.trim() !== "");
                }}
            />

            <ErrorForm message={error?.message} />
        </div>
    );
}

