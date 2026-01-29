"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInputForm from "@/components/inputs/form/TextInputForm";
import TextAreaInputForm from "@/components/inputs/form/TextAreaForm";
import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton"; // Importado
import { taskStepOneSchema } from "@/schemas/taskSchema";
import { TaskFormData, TaskStepOneFormData } from "@/tipos/taskType";
import SelectInputForm from "@/components/inputs/form/SelectInputForm";
import { enumToOptions } from "@/utils/transform";
import { Priority } from "@/enums/baseEnum";
import { TaskType } from "@/enums/taskEnum";

const PRIORITY_TASK = enumToOptions(Priority);
const TASK_TYPE_OPTIONS = enumToOptions(TaskType);

interface TaskStepOneFormProps {
    onNext: (data: TaskStepOneFormData) => void;
    onSaveDirect?: (data: TaskStepOneFormData) => void;
    onCancel: () => void;
    defaultValues?: Partial<TaskFormData>;
    edition?: boolean;
    textButton: string;
    isSubmitting?: boolean; // Prop agregada
}

export default function TaskStepOneForm({
    onNext,
    onSaveDirect,
    onCancel,
    defaultValues,
    edition,
    textButton,
    isSubmitting = false, // Valor por defecto
}: TaskStepOneFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskStepOneFormData>({
        resolver: zodResolver(taskStepOneSchema),
        defaultValues,
    });

    return (
        <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <TextInputForm
                label="Título"
                id="titulo"
                placeholder="Escriba el título de la tarea (ej. Implementar autenticación)"
                register={register("titulo")}
                error={errors.titulo}
                required
                width="w-full"
            />
            <div className="grid grid-cols-2 gap-x-4">
                <SelectInputForm
                    label="Tipo de tarea"
                    id="tipo_tarea"
                    placeholder="Seleccione un tipo de tarea"
                    options={TASK_TYPE_OPTIONS}
                    register={register("tipo_tarea")}
                    error={errors.tipo_tarea}
                    width="w-3xs"
                    required
                    disabled={isSubmitting}
                />
                <SelectInputForm
                    label="Prioridad"
                    id="prioridad"
                    placeholder="Seleccione una opción"
                    options={PRIORITY_TASK}
                    register={register("prioridad")}
                    error={errors.prioridad}
                    width="w-3xs"
                    required
                    disabled={isSubmitting}
                />
            </div>
            <TextAreaInputForm
                label="Descripción"
                id="descripcion"
                placeholder="Describa la tarea a realizar (ej.: implementar el inicio de sesión con credenciales)"
                register={register("descripcion")}
                error={errors.descripcion}
                rows={4}
                required
                width="w-full"
            />
            <div className="flex justify-between gap-2 mt-2">
                <Button
                    label="Cancelar"
                    secondary
                    onClick={onCancel}
                    disabled={isSubmitting}
                />
                <div className="flex gap-1">
                    <Button
                        label="Siguiente"
                        type="button"
                        secondary
                        onClick={handleSubmit(onNext)}
                        disabled={isSubmitting}
                    />
                    {edition && onSaveDirect && (
                        <ButtonForm
                            label={textButton}
                            onClick={handleSubmit(onSaveDirect)}
                            loading={isSubmitting}
                        />
                    )}
                </div>
            </div>
        </form>
    );
}