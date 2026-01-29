"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import TextInputForm from "../inputs/form/TextInputForm";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "@/tipos/projectType";
import { projectSchema } from "@/schemas/projectSchema";
import SelectInputForm from "../inputs/form/SelectInputForm";
import { enumToOptions } from "@/utils/transform";
import { ProjectType } from "@/enums/projectEnum";
import DateInputForm from "../inputs/form/DateInputForm";
import { useEffect } from "react";
import ButtonForm from "../buttons/FormButton";
import TextAreaInputForm from "../inputs/form/TextAreaForm";
import InfoFormText from "../text/content/InfoFormText";
import { InfoIcon } from "lucide-react";
import Button from "../buttons/Button";
import { useRouter } from "next/navigation";

type ProjectFormProps = {
    defaultValues?: Partial<ProjectFormData>
    buttonText: string
    onSubmit: (data: ProjectFormData) => void
    loading: boolean
    codeNumber?: number
}

const PROJECT_TYPES = enumToOptions(ProjectType);


export default function ProjectForm({ defaultValues, buttonText, onSubmit, loading, codeNumber }: ProjectFormProps) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: defaultValues,
    });

    const tipo = watch("tipo");
    const router = useRouter();

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    useEffect(() => {
        if (!tipo) return;

        let currentNumber = codeNumber;

        if (defaultValues?.codigo) {
            const match = defaultValues.codigo.match(/\d+$/);
            currentNumber = match ? parseInt(match[0]) : codeNumber;
        }

        if (currentNumber === undefined || currentNumber === null) return;

        const year = new Date().getFullYear();
        const base = `${year}P`;
        const typeInitial = tipo.charAt(0).toUpperCase();
        const numberStr = String(currentNumber).padStart(3, "0");

        const generatedCode = `${base}${typeInitial}${numberStr}`;

        setValue("codigo", generatedCode, {
            shouldValidate: true,
            shouldDirty: true,
        });

    }, [tipo, codeNumber, setValue, defaultValues]);

    const back = () => {
        router.back()
    }

    const isEditMode = !!defaultValues;

    return (
        <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="col-span-2 flex gap-2 items-center">
                <InfoIcon size={16} className="text-neutral-600" />
                <InfoFormText>
                    El código se genera automáticamente al crear el proyecto.
                </InfoFormText>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div className="col-span-2">
                    <TextInputForm
                        label="Nombre"
                        id="nameProject"
                        placeholder="Escriba el nombre del proyecto. Ej: Sistema de gestión académica"
                        type="text"
                        register={register("nombre")}
                        error={errors.nombre}
                        required
                        width="w-full"
                    />
                </div>

                <TextInputForm
                    label="Código"
                    id="codeProject"
                    type="text"
                    register={register("codigo")}
                    width="w-full"
                    readOnly
                    required
                />

                <SelectInputForm
                    label="Tipo de proyecto"
                    id="typeProject"
                    placeholder="Selecciona una opción"
                    options={PROJECT_TYPES}
                    register={register("tipo")}
                    error={errors.tipo}
                    required
                />

                <DateInputForm
                    label="Fecha de inicio"
                    id="startDateProject"
                    register={register("fecha_inicio")}
                    error={errors.fecha_inicio}
                />

                <DateInputForm
                    label="Fecha de finalización"
                    id="endDateProject"
                    register={register("fecha_fin")}
                    error={errors.fecha_fin}
                />

                <div className="col-span-2">
                    <TextAreaInputForm
                        label="Descripción"
                        id="descriptionProject"
                        placeholder="Describa el objetivo y alcance del proyecto"
                        register={register("descripcion")}
                        error={errors.descripcion}
                        width="w-full"
                        rows={5}
                    />
                </div>
            </div>
            <div className="col-span-2 flex justify-end gap-1">
                {!isEditMode && (
                    <Button
                        label="Cancelar"
                        onClick={back}
                        secondary
                    />
                )}
                <ButtonForm
                    label={buttonText}
                    loading={loading}
                />
            </div>
        </form>

    );
}