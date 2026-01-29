"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import TextInputForm from "../inputs/form/TextInputForm";
import TextAreaInputForm from "../inputs/form/TextAreaForm";
import { SprintFormData } from "@/tipos/sprintType";
import { sprintSchema } from "@/schemas/sprintSchema";
import DateInputForm from "../inputs/form/DateInputForm";
import ButtonForm from "../buttons/FormButton";
import Button from "../buttons/Button";

type Props = {
    defaultValues?: Partial<SprintFormData>
    onSubmit: (data: SprintFormData) => void
    onCancel: () => void
    textButton: string
    isSubmitting?: boolean; // Prop agregada
};

export default function SprintForm({
    onSubmit,
    defaultValues,
    textButton,
    onCancel,
    isSubmitting = false, // Valor por defecto
}: Props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SprintFormData>({
        resolver: zodResolver(sprintSchema),
        defaultValues,
    });

    return (
        <form
            className="grid grid-cols-2 gap-x-4 gap-y-1"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="col-span-2">
                <TextInputForm
                    label="Nombre"
                    id="nombre"
                    placeholder="Escriba el nombre del sprint (ej. Sprint 1)"
                    type="text"
                    register={register("nombre")}
                    error={errors.nombre}
                    required={true}
                    width="w-full"
                />
            </div>
            <DateInputForm
                label="Fecha de inicio"
                id="fecha_inicio"
                register={register("fecha_inicio")}
                error={errors.fecha_inicio}
                required={true}
                width="min-w-3xs max-w-3xs"
            />
            <DateInputForm
                label="Fecha de finalización"
                id="fecha_fin"
                register={register("fecha_fin")}
                error={errors.fecha_fin}
                required={true}
                width="min-w-3xs max-w-3xs"
            />
            <div className="col-span-2">
                <TextAreaInputForm
                    label="Objetivo"
                    id="objetivo"
                    placeholder="Describa el objetivo principal del sprint (ej. Implementar el módulo de autenticación)"
                    register={register("objetivo")}
                    error={errors.objetivo}
                    required={true}
                    width="w-full"
                />
            </div>
            <div className="col-span-2 flex justify-end gap-1 mt-4">
                <Button
                    onClick={onCancel}
                    label="Cancelar"
                    secondary
                    disabled={isSubmitting} // Bloquear cancelación si se está enviando
                />
                <ButtonForm
                    label={textButton}
                    loading={isSubmitting} // Spinner activado
                />
            </div>
        </form>
    );
}