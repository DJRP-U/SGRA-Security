"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { enumToOptions } from "@/utils/transform";
import { ChangeStatusBugFormData } from "@/tipos/bugType";
import { BugStatus } from "@/enums/bugEnum";
import { changeStatusBugSchema } from "@/schemas/bugSchema";
import SelectInputForm from "@/components/inputs/form/SelectInputForm";
import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton";

interface ChangeStatusBugFormProps {
    defaultValues?: Partial<ChangeStatusBugFormData>;
    onSubmit: (data: ChangeStatusBugFormData) => void;
    onCancel: () => void;
    textButton: string;
    isSubmitting?: boolean; // Prop agregada
}

const BUG_STATUS = enumToOptions(BugStatus);

export default function ChangeStatusBugForm({
    defaultValues,
    textButton,
    onSubmit,
    onCancel,
    isSubmitting = false, // Valor por defecto
}: ChangeStatusBugFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangeStatusBugFormData>({
        resolver: zodResolver(changeStatusBugSchema),
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
                placeholder="Selecciona el estado del bug"
                options={BUG_STATUS}
                register={register("estado")}
                error={errors.estado}
                required
                disabled={isSubmitting} // Bloquear select durante el envío
            />

            <div className="flex justify-end gap-1 mt-2">
                <Button
                    label="Cancelar"
                    onClick={onCancel}
                    secondary
                    disabled={isSubmitting} // Bloquear cancelar durante el envío
                />
                <ButtonForm
                    label={textButton}
                    loading={isSubmitting} // Spinner activado según el estado
                />
            </div>
        </form>
    );
}