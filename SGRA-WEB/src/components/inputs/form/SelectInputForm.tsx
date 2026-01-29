"use client";

import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { LabelForm } from "./parts/LabelForm";
import { ErrorForm } from "./parts/ErrorForn";

type Option = {
    label: string
    value: string
}

type Props = {
    label: string
    id: string
    options: Option[]
    placeholder?: string
    register: UseFormRegisterReturn
    error?: FieldError
    required?: boolean
    width?: string
    disabled?: boolean
}

export default function SelectInputForm({
    label,
    id,
    options,
    placeholder = "Selecciona una opción",
    register,
    error,
    required = false,
    width = "min-w-xs max-w-xs",
    disabled = false,
}: Props) {
    const [hasValue, setHasValue] = useState(false);

    return (
        <div className={`${width} tracking-tighter flex flex-col`}>
            <LabelForm
                htmlFor={id}
                label={label}
                required={required}
            />
            <select
                id={id}
                defaultValue={""}
                className={`
                    w-full text-neutral-600 outline-none border rounded-sm text-lg px-3 py-2 transition-colors
                    appearance-none bg-no-repeat bg-right
                    ${hasValue ? "border-neutral-700" : "border-neutral-400"}
                    ${!!error ? "border-red-700" : ""}
                    ${disabled ? "bg-neutral-50" : "cursor-pointer"}
                `}

                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234b5563'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundSize: '1em',
                    backgroundPosition: 'right 0.75rem center',
                }}
                {...register}
                onChange={(e) => {
                    register.onChange(e);
                    setHasValue(e.target.value.trim() !== "");
                }}
                disabled={disabled} // <-- pasamos la prop
            >
                <option value="" disabled hidden>
                    {placeholder}
                </option>

                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <ErrorForm message={error?.message} />
        </div>
    );
}
