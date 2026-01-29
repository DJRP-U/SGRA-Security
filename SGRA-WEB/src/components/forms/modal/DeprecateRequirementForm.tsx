import Button from "@/components/buttons/Button";
import ButtonForm from "@/components/buttons/FormButton";
import TextAreaInputForm from "@/components/inputs/form/TextAreaForm";
import { deprecateRequirementSchema } from "@/schemas/requirementSchema";
import { deprecateRequirementFormData } from "@/tipos/requirementType"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface DeprecateRequirementFormProps {
    onSubmit: (data: deprecateRequirementFormData) => void
    textButton: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isSubmitting?: boolean
}

export default function DeprecateRequirementForm({
    onSubmit,
    textButton,
    setOpen,
    isSubmitting = false
}: DeprecateRequirementFormProps) {

    const [currentAction, setCurrentAction] = useState<string | null>(null);

    const { register, handleSubmit, clearErrors, formState: { errors }, setValue } = useForm<deprecateRequirementFormData>({
        resolver: zodResolver(deprecateRequirementSchema),
    });

    const onCancel = () => {
        if (isSubmitting) return;
        clearErrors();
        setOpen(false);
    }

    const handleActionClick = (action: "APPROVE" | "REJECT" | "OBSOLETE") => {
        setCurrentAction(action);
        setValue("action", action);
    };

    return (
        <form
            className="flex flex-col items-center gap-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col w-full">
                <TextAreaInputForm
                    label="Motivo de la acción"
                    id="deprecatedReaasonID"
                    placeholder="Describa el motivo por el cual este requisito se rechaza o descarta"
                    register={register("reason")}
                    error={errors.reason}
                    width="w-full"
                    required
                />
            </div>

            <div className="w-full flex justify-between gap-1 mt-2">
                <Button
                    onClick={onCancel}
                    secondary
                    label="Cancelar"
                    disabled={isSubmitting}
                />

                <div className="flex gap-1">

                    <ButtonForm
                        label={textButton}
                        onClick={() => handleActionClick("OBSOLETE")}
                        loading={isSubmitting && currentAction === "OBSOLETE"}
                        disabled={isSubmitting && currentAction !== "OBSOLETE"}
                    />
                    <ButtonForm
                        label="Rechazar"
                        className="bg-red-400 hover:bg-red-600 text-white"
                        onClick={() => handleActionClick("REJECT")}
                        loading={isSubmitting && currentAction === "REJECT"}
                        disabled={isSubmitting && currentAction !== "REJECT"}
                    />
                    <ButtonForm
                        label="Aprobar"
                        className="bg-emerald-400 hover:bg-emerald-600 text-white"
                        onClick={() => handleActionClick("APPROVE")}
                        loading={isSubmitting && currentAction === "APPROVE"}
                        disabled={isSubmitting && currentAction !== "APPROVE"}
                    />
                </div>
            </div>
        </form>
    );
}