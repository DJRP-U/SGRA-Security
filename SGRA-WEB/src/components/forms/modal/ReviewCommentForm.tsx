"use client";

import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton";
import TextAreaInputForm from "@/components/inputs/form/TextAreaForm";
import { reviewCommentSchema } from "@/schemas/taskSchema";
import { ReviewCommentFormData } from "@/tipos/taskType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ReviewCommentFormProps {
    onSubmit: (data: ReviewCommentFormData) => void;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isSubmitting?: boolean; // Nueva prop agregada
}

export default function ReviewCommentForm({
    onSubmit,
    setOpen,
    isSubmitting = false, // Valor por defecto
}: ReviewCommentFormProps) {

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm<ReviewCommentFormData>({
        resolver: zodResolver(reviewCommentSchema),
    });

    const onCancel = () => {
        if (isSubmitting) return; // Evitar cierre si está enviando
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
                id="reviewComment"
                placeholder="Escriba el comentario para corregir la tarea"
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
                    disabled={isSubmitting} // Bloquear navegación
                />
                <ButtonForm
                    label="Solicitar ajustes"
                    loading={isSubmitting} // Spinner activado
                />
            </div>
        </form>
    );
}