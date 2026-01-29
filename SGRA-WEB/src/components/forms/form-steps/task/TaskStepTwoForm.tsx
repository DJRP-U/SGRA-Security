"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextAreaInputForm from "@/components/inputs/form/TextAreaForm";
import DateInputForm from "@/components/inputs/form/DateInputForm";
import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton";
import { taskStepTwoSchema } from "@/schemas/taskSchema";
import { TaskFormData, TaskStepTwoFormData } from "@/tipos/taskType";
import { enumToOptions } from "@/utils/transform";
import { EstimationPoints } from "@/enums/points";
import SelectInputForm from "@/components/inputs/form/SelectInputForm";

const ESTIMATION_POINTS_OPTIONS = enumToOptions(EstimationPoints);

interface TaskStepTwoFormProps {
    onSubmit: (data: TaskStepTwoFormData) => void;
    onCancel: () => void;
    onBack: (data: TaskStepTwoFormData) => void;
    defaultValues?: Partial<TaskFormData>;
    textButton: string;
    isSubmitting?: boolean; // Prop agregada
}

export default function TaskStepTwoForm({
    onSubmit,
    onCancel,
    onBack,
    defaultValues,
    textButton,
    isSubmitting = false, // Valor por defecto
}: TaskStepTwoFormProps) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<TaskStepTwoFormData>({
        resolver: zodResolver(taskStepTwoSchema),
        defaultValues,
    });

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-x-4">
                <SelectInputForm
                    label="Estimación (puntos)"
                    id="estimacion"
                    placeholder="Seleccione la estimación"
                    options={ESTIMATION_POINTS_OPTIONS}
                    register={register("estimacion")}
                    error={errors.estimacion}
                    width="w-3xs"
                    required
                    disabled={isSubmitting}
                />
                <DateInputForm
                    label="Fecha límite"
                    id="fecha_limite"
                    register={register("fecha_limite")}
                    error={errors.fecha_limite}
                    required
                    width="w-3xs"
                />
            </div>
            <TextAreaInputForm
                label="Criterios de entrada"
                id="criterios_entrada"
                placeholder="Describa las condiciones que deben cumplirse antes de iniciar la tarea"
                register={register("criterios_entrada")}
                error={errors.criterios_entrada}
                required
                rows={4}
                width="w-full"
            />
            <TextAreaInputForm
                label="Criterios de salida"
                id="criterios_salida"
                placeholder="Describa las condiciones que deben cumplirse para considerar la tarea como completada"
                register={register("criterios_salida")}
                error={errors.criterios_salida}
                required
                rows={4}
                width="w-full"
            />
            <div className="flex justify-between gap-2 mt-4">
                <Button
                    label="Atrás"
                    secondary
                    type="button"
                    onClick={() => onBack(getValues())}
                    disabled={isSubmitting}
                />
                <div className="flex justify-end gap-2">
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
            </div>
        </form>
    );
}