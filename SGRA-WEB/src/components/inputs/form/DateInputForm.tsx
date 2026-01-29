"use client";

import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { LabelForm } from "./parts/LabelForm";
import { TextInput } from "../TextInput";
import { ErrorForm } from "./parts/ErrorForn";

interface Props {
  label: string
  id: string
  register: UseFormRegisterReturn
  error?: FieldError
  required?: boolean
  width?: string
}

export default function DateInputForm({
  label,
  id,
  register,
  error,
  required = false,
  width = "min-w-xs max-w-xs"
}: Props) {

  return (
    <div className={`${width} tracking-tighter`}>

      <LabelForm
        htmlFor={id}
        label={label}
        required={required}
      />

      <TextInput
        id={id}
        type="date"
        register={register}
        hasError={!!error}
      />

      <ErrorForm message={error?.message} />
    </div>
  );
}
