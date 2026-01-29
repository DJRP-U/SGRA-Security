"use client"

import { FieldError, UseFormRegisterReturn } from "react-hook-form"
import { LabelForm } from "./parts/LabelForm"
import { TextInput } from "../TextInput"
import { ErrorForm } from "./parts/ErrorForn"

interface Props {
    label: string
    id: string
    placeholder?: string
    type?: string
    register: UseFormRegisterReturn
    error?: FieldError
    required?: boolean
    width?: string
    readOnly?: boolean
}

export default function TextInputForm({
    label,
    id,
    placeholder,
    type = "text",
    register,
    error,
    required = false,
    width = "min-w-xs max-w-xs",
    readOnly = false
}: Props) {
    return (
        <div className={`${width} tracking-tighter flex flex-col`}>
            <LabelForm
                htmlFor={id}
                label={label}
                required={required}
            />
            <TextInput
                id={id}
                type={type}
                readonly={readOnly}
                placeholder={placeholder}
                register={register}
                hasError={!!error}
            />
            <ErrorForm message={error?.message} />
        </div>
    )
}
