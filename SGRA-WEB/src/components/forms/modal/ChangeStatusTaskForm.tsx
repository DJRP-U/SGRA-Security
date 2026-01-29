"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { enumToOptions } from "@/utils/transform";
import { TaskStatus } from "@/enums/taskEnum";
import { ChangeStatusTaskFormData } from "@/tipos/taskType";
import { changeStatusTaskSchema } from "@/schemas/taskSchema";
import SelectInputForm from "@/components/inputs/form/SelectInputForm";
import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton";

interface ChangeStatusTaskFormProps {
    defaultValues?: Partial<ChangeStatusTaskFormData>;
    onSubmit: (data: ChangeStatusTaskFormData) => void;
    onCancel: () => void;
    textButton: string;
    isSubmitting?: boolean; // Nueva prop
}

const TASK_STATUS = enumToOptions(TaskStatus);

export default function ChangeStatusTaskForm({
    defaultValues,
    textButton,
    onSubmit,
    onCancel,
    isSubmitting = false, // Valor por defecto
}: ChangeStatusTaskFormProps) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangeStatusTaskFormData>({
        resolver: zodResolver(changeStatusTaskSchema),
        defaultValues,
    });

    return (
        <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <SelectInputForm
                label="Estado"
                id="status"
                placeholder="Selecciona el estado de la tarea"
                options={TASK_STATUS}
                register={register("nuevo_estado")}
                error={errors.nuevo_estado}
                required
                disabled={isSubmitting} // Bloqueamos el select mientras se guarda
            />

            <div className="flex justify-end gap-1">
                <Button
                    label="Cancelar"
                    onClick={onCancel}
                    secondary
                    disabled={isSubmitting} // Evitamos cierre accidental
                />
                <ButtonForm
                    label={textButton}
                    loading={isSubmitting} // Activamos el spinner
                />
            </div>
        </form>
    );
}