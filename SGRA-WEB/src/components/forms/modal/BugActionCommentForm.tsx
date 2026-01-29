"use client";
import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton";
import TextAreaInputForm from "@/components/inputs/form/TextAreaForm";
import { reviewCommentSchema } from "@/schemas/taskSchema";
import { ReviewCommentFormData } from "@/tipos/taskType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface BugActionCommentFormProps {
    onSubmit: (data: ReviewCommentFormData) => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    actionLabel: string;
    isSubmitting?: boolean; // Prop agregada
}

export default function BugActionCommentForm({
    onSubmit,
    setOpen,
    actionLabel,
    isSubmitting = false, // Valor por defecto
}: BugActionCommentFormProps) {

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<ReviewCommentFormData>({
        resolver: zodResolver(reviewCommentSchema),
    });

    const onCancel = () => {
        if (isSubmitting) return; // Evitar cierre si se está enviando
        clearErrors();
        setOpen(false);
    };

    return (
        <form
            className="flex flex-col gap-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextAreaInputForm
                label="Comentario"
                id="bugActionComment"
                placeholder="Describa el motivo de la acción"
                register={register("comment")}
                error={errors.comment}
                width="w-full"
                required
            />

            <div className="flex justify-between mt-2">
                <Button
                    secondary
                    label="Cancelar"
                    onClick={onCancel}
                    disabled={isSubmitting} // Bloquear botón cancelar
                />
                <ButtonForm
                    label={actionLabel}
                    loading={isSubmitting} // Spinner dinámico en el botón de acción
                />
            </div>
        </form>
    );
}