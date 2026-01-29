"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextInputForm from "../inputs/form/TextInputForm";
import TextAreaInputForm from "../inputs/form/TextAreaForm";
import ButtonForm from "../buttons/FormButton";
import Button from "../buttons/Button";
import { bugSchema } from "@/schemas/bugSchema";
import { BugFormData } from "@/tipos/bugType";
import { enumToOptions } from "@/utils/transform";
import { BugSeverity, BugType } from "@/enums/bugEnum";
import { Priority } from "@/enums/baseEnum";
import SelectInputForm from "../inputs/form/SelectInputForm";
import DateInputForm from "../inputs/form/DateInputForm";

interface BugFormProps {
    onSubmit: (data: BugFormData) => void
    onCancel: () => void
    defaultValues?: Partial<BugFormData>
    textButton: string
    isSubmitting?: boolean
}

const BUG_SEVERITY = enumToOptions(BugSeverity);
const BUG_TYPE = enumToOptions(BugType);
const BUG_PRIORITY = enumToOptions(Priority);

export default function BugForm({
    onSubmit,
    onCancel,
    defaultValues,
    textButton,
    isSubmitting = false,
}: BugFormProps) {

    const { register, handleSubmit, formState: { errors },
    } = useForm<BugFormData>({
        resolver: zodResolver(bugSchema),
        defaultValues,
    });

    return (
        <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextInputForm
                label="Título"
                id="titulo"
                placeholder="Escribe el título del bug"
                type="text"
                register={register("titulo")}
                error={errors.titulo}
                required
                width="w-full"
            />

            <TextAreaInputForm
                label="Descripción detallada"
                id="descripcion_detallada"
                placeholder="Describe el comportamiento erróneo..."
                register={register("descripcion_detallada")}
                error={errors.descripcion_detallada}
                required
                width="w-full"
                rows={4}
            />

            <TextInputForm
                label="URL de la Foto/Evidencia"
                id="foto"
                placeholder="Pegue el link de la imagen"
                register={register("foto")}
                error={errors.foto}
                required
                width="w-full"
            />
            <div className="grid grid-cols-2 gap-x-4">
                <SelectInputForm
                    label="Tipo de defecto"
                    id="tipo_defect"
                    options={BUG_TYPE}
                    register={register("tipo_defecto")}
                    error={errors.tipo_defecto}
                    required
                    width="w-3xs"
                />
                <DateInputForm
                    label="Fecha límite"
                    id="fecha_limite"
                    register={register("fecha_limite")}
                    error={errors.fecha_limite}
                    required={true}
                    width="w-3xs"
                />
            </div>

            <div className="grid grid-cols-2 gap-x-4">
                <SelectInputForm
                    label="Prioridad"
                    id="prioridad"
                    options={BUG_PRIORITY}
                    register={register("prioridad")}
                    error={errors.prioridad}
                    required
                    width="w-3xs"
                />
                <SelectInputForm
                    label="Severidad"
                    id="severidad"
                    options={BUG_SEVERITY}
                    register={register("severidad")}
                    error={errors.severidad}
                    required
                    width="w-3xs"
                />
            </div>




            <div className="flex justify-end gap-2 mt-4">
                <Button
                    label="Cancelar"
                    secondary
                    onClick={onCancel}
                    disabled={isSubmitting}
                />
                <ButtonForm
                    label={textButton}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
}